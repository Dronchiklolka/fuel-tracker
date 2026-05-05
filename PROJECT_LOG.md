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

## 2026-05-05 — полный onboarding flow на локальном состоянии

**Что реализовано:** добавлен полный UI-flow onboarding после Welcome screen: выбор пола, возраста, роста, текущего веса, уровня активности, цели и итоговый summary-экран.

**Figma:** через Figma MCP получены metadata по onboarding frames и точные параметры для основных экранов: светлый фон `#F7F8F5`, основной текст `#18181B`, вторичный текст `#6B7280`, brand green `#31D843`, progress bar, нижняя кнопка `358x56`, карточки выбора и числовые picker-экраны. Дополнительный программный поиск summary frame был остановлен лимитом Figma MCP Starter plan, поэтому summary сделан как временный экран в том же стиле с TODO в коде.

**Добавленные экраны:**
- `app/onboarding/gender.tsx`
- `app/onboarding/age.tsx`
- `app/onboarding/height.tsx`
- `app/onboarding/weight.tsx`
- `app/onboarding/activity.tsx`
- `app/onboarding/goal.tsx`
- `app/onboarding/summary.tsx`

**Созданные компоненты:**
- `components/onboarding/onboarding-layout.tsx`
- `components/onboarding/onboarding-progress.tsx`
- `components/onboarding/onboarding-button.tsx`
- `components/onboarding/onboarding-option-card.tsx`
- `components/onboarding/onboarding-number-picker.tsx`
- `components/onboarding/onboarding-theme.ts`

**Состояние:** добавлен `contexts/onboarding-context.tsx` с локальным React Context для `gender`, `age`, `height`, `weight`, `activityLevel`, `goal`. Backend, Supabase, RevenueCat, AI и авторизация не подключались.

**Измененные существующие файлы:**
- `app/_layout.tsx` — подключен `OnboardingProvider` и вложенный stack `onboarding`.
- `app/index.tsx` — кнопка `Начать` теперь ведет на `/onboarding/gender`.
- `app/onboarding-next.tsx` — обновлена как временная заглушка после завершения onboarding.
- `PROJECT_LOG.md`

**Как проверить:**

```bash
npm run start:lan
```

На телефоне пройти путь: Welcome → Gender → Age → Height → Weight → Activity → Goal → Summary → временная заглушка.

**Проверки:**
- `npm.cmd run lint` — прошел.

**Следующий шаг:** уточнить точный Figma summary frame, когда лимит Figma MCP снова позволит получить context, и затем аккуратно довести summary до полного соответствия макету.
