# PROJECT_LOG

## 2026-05-05 — исправление запуска Expo LAN на Windows

**Что сломалось:** после замены `start:lan` на Node-скрипт команда `npm run start:lan` падала с ошибкой `spawn EINVAL`.

**Причина:** скрипт правильно выбирал LAN IP `192.168.1.101` на адаптере `Ethernet`, но Windows/Node v25 не смог напрямую запустить `npx.cmd` через `child_process.spawn` с `shell: false`.

**Что исправлено:** запуск Expo на Windows переведен на безопасный вызов через `cmd.exe /d /s /c npx.cmd ...` с аргументами массивом, `shell: false`, `stdio: "inherit"` и явным `env` с `REACT_NATIVE_PACKAGER_HOSTNAME`.

**Измененные файлы:**
- `scripts/start-lan.js`
- `AGENTS.md`
- `PROJECT_LOG.md`

**Как запускать проект:**

```bash
npm run start:lan
```

**Проверки:**
- `npm.cmd run lint` — прошел.
- `npm.cmd run start:lan` — Expo больше не падает с `spawn EINVAL`, Metro стартует и доходит до `Waiting on http://localhost:8081`. Во время проверки команда была остановлена таймаутом, чтобы не оставлять dev server запущенным.

**Примечание:** при проверке Expo вывел предупреждение `spawn EPERM` для установки React Native DevTools, но Metro Bundler продолжил запуск.
