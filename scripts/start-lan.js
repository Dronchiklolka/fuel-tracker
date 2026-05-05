const { spawn } = require('child_process');
const os = require('os');

const IGNORED_INTERFACE_PATTERNS = [
  /radmin/i,
  /outline/i,
  /wsl/i,
  /vethernet/i,
  /hyper-v/i,
  /vpn/i,
  /\btap\b/i,
  /\btun\b/i,
  /teredo/i,
  /loopback/i,
  /docker/i,
];

const PREFERRED_INTERFACE_PATTERNS = [
  { pattern: /^ethernet$/i, score: 120 },
  { pattern: /^wi-?fi$/i, score: 115 },
  { pattern: /^wlan$/i, score: 110 },
  { pattern: /ethernet/i, score: 95 },
  { pattern: /wi-?fi/i, score: 90 },
  { pattern: /wlan/i, score: 85 },
];

function isIpv4Address(address) {
  return address.family === 'IPv4' || address.family === 4;
}

function isUsableIpv4(address) {
  if (!address || address.internal || !isIpv4Address(address)) {
    return false;
  }

  const ip = address.address;

  return (
    ip &&
    ip !== '0.0.0.0' &&
    !ip.startsWith('127.') &&
    !ip.startsWith('169.254.')
  );
}

function isPrivateIpv4(ip) {
  const parts = ip.split('.').map(Number);

  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }

  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
}

function isIgnoredInterface(name) {
  return IGNORED_INTERFACE_PATTERNS.some((pattern) => pattern.test(name));
}

function scoreCandidate(name, ip) {
  let score = 0;

  for (const preferred of PREFERRED_INTERFACE_PATTERNS) {
    if (preferred.pattern.test(name)) {
      score += preferred.score;
      break;
    }
  }

  if (isPrivateIpv4(ip)) {
    score += 30;
  }

  if (ip.startsWith('192.168.')) {
    score += 20;
  } else if (ip.startsWith('10.')) {
    score += 12;
  } else if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) {
    score += 10;
  }

  return score;
}

function listLanCandidates() {
  const interfaces = os.networkInterfaces();
  const candidates = [];

  for (const [name, addresses] of Object.entries(interfaces)) {
    if (isIgnoredInterface(name)) {
      continue;
    }

    for (const address of addresses ?? []) {
      if (!isUsableIpv4(address)) {
        continue;
      }

      candidates.push({
        interfaceName: name,
        address: address.address,
        score: scoreCandidate(name, address.address),
      });
    }
  }

  return candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.interfaceName.localeCompare(b.interfaceName);
  });
}

function getManualIpOverride() {
  const manualIp = process.env.EXPO_LAN_IP;

  if (!manualIp) {
    return null;
  }

  return {
    interfaceName: 'EXPO_LAN_IP',
    address: manualIp,
    score: Number.MAX_SAFE_INTEGER,
  };
}

function selectLanAddress() {
  const manualOverride = getManualIpOverride();

  if (manualOverride) {
    return manualOverride;
  }

  return listLanCandidates()[0] ?? null;
}

function startExpo() {
  const selected = selectLanAddress();

  if (!selected) {
    console.error('[start:lan] Could not find a usable LAN IPv4 address.');
    console.error('[start:lan] Set EXPO_LAN_IP manually, for example: EXPO_LAN_IP=192.168.1.101 npm run start:lan');
    process.exit(1);
  }

  const selectedIp = selected.address;
  const env = {
    ...process.env,
    REACT_NATIVE_PACKAGER_HOSTNAME: selectedIp,
  };
  const isWindows = process.platform === 'win32';
  const expoCommand = isWindows ? 'npx.cmd' : 'npx';
  const expoArgs = ['expo', 'start', '--host', 'lan', '-c'];
  const command = isWindows ? process.env.ComSpec || 'cmd.exe' : expoCommand;
  const args = isWindows ? ['/d', '/s', '/c', expoCommand, ...expoArgs] : expoArgs;
  const displayCommand = `${expoCommand} ${expoArgs.join(' ')}`;

  console.log(`[start:lan] Selected LAN IP: ${selectedIp} (${selected.interfaceName})`);
  console.log(`[start:lan] REACT_NATIVE_PACKAGER_HOSTNAME=${selectedIp}`);
  console.log(`[start:lan] Running: ${displayCommand}`);

  let child;

  try {
    child = spawn(command, args, {
      stdio: 'inherit',
      env,
      shell: false,
    });
  } catch (error) {
    console.error(`[start:lan] Failed to spawn Expo command "${displayCommand}".`);
    console.error(`[start:lan] ${error.message}`);
    process.exit(1);
  }

  child.on('error', (error) => {
    console.error(`[start:lan] Failed to start Expo command "${displayCommand}".`);
    console.error(`[start:lan] ${error.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

if (require.main === module) {
  startExpo();
}

module.exports = {
  listLanCandidates,
  selectLanAddress,
};
