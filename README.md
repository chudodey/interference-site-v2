# Интерференция реальностей — сайт спектакля

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=github)](https://interference.odadream.art/)
[![Kimi CLI](https://img.shields.io/badge/Made%20with-Kimi%20CLI-ff69b4)](https://www.moonshot.cn/kimi)

> Лендинг нейроспектакля-импровизации «Интерференция реальностей», где зритель становится соавтором через нейроинтерфейсы. Сайт разработан с помощью [Kimi CLI](https://www.moonshot.cn/kimi).

**Дата:** 16 мая 2026, 19:00  
**Место:** ИКЦ, Калуга (ул. Октябрьская, 17а)  
**Сайт:** [interference.odadream.art](https://interference.odadream.art/)

![Превью](https://interference.odadream.art/og-image.webp)

---

## О проекте

«Интерференция реальностей» — спектакль-импровизация на стыке науки, технологий и перформанса. Зритель с нейрогарнитурой Neiry становится частью системы: его мозговые ритмы (альфа, бета, гамма) в реальном времени влияют на свет, звук и движение на сцене.

Сайт — полноценный лендинг с интерактивной лабораторией интерференции волн, где посетители могут поиграть с симулятором до спектакля.

## Стек

- **React 19** + **TypeScript 6** — UI
- **Vite 8** — сборка и HMR
- **Tailwind CSS v3** — утилитарные стили
- **KaTeX** — математические формулы (ленивая загрузка)
- **JetBrains Mono** — единый шрифт

## Ключевые фичи

- 🎨 **Палитра из афиши** — все цвета извлечены методом k-means кластеризации (`scripts/color-analysis.py`)
- 🌊 **Интерактивная лаборатория** — canvas-симулятор интерференции волн с draggable источниками
- 📸 **Фотоархив** — горизонтальная snap-лента с drag-to-scroll на десктопе и swipe на мобильных
- 📱 **Мобильный first** — от 375px до десктопа
- 🔍 **SEO** — Open Graph, Twitter Card, Schema.org `TheaterEvent`, robots.txt, sitemap.xml
- ⚡ **Performance** — dynamic import KaTeX (~260 KB основной бандл), WebP-фото, `decoding="async"`
- ♿ **Доступность** — `prefers-reduced-motion`, семантическая вёрстка

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Dev-сервер
npm run dev

# Production build
npm run build

# Превью билда
npm run preview
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер Vite |
| `npm run build` | TypeScript + Vite production build |
| `npm run preview` | Локальный превью билда |
| `npm run lint` | ESLint проверка |
| `npm run lint:fix` | ESLint автоисправление |
| `npm run format` | Prettier форматирование |
| `npm run format:check` | Prettier проверка формата |

## Структура проекта

```
├── public/                 # Статические ассеты
│   ├── og-image.webp       # OG-превью для соцсетей
│   ├── poster-bg.webp      # Афиша (источник палитры)
│   ├── favicon.svg
│   ├── icons.svg           # SVG-спрайт иконок
│   ├── photos/             # Фотоархив (WebP)
│   ├── partners/           # Логотипы партнёров (SVG)
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── color-analysis.py   # Анализ палитры афиши
├── src/
│   ├── components/         # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Accordion.tsx
│   │   ├── Timeline.tsx
│   │   ├── LayerCard.tsx
│   │   ├── TeamCard.tsx
│   │   ├── WaveInterference.tsx
│   │   ├── InlineMath.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionTag.tsx
│   │   ├── Divider.tsx
│   │   ├── QuantumBadge.tsx
│   │   ├── QuantumButton.tsx
│   │   ├── QuantumCard.tsx
│   │   ├── StatusDot.tsx
│   │   ├── PartnerLogos.tsx
│   │   └── StyleGuide.tsx  # DEV-only
│   ├── sections/           # Секции лендинга
│   │   ├── Hero.tsx
│   │   ├── PartnersStrip.tsx
│   │   ├── PhotoArchive.tsx
│   │   ├── About.tsx
│   │   ├── Program.tsx
│   │   ├── Context.tsx
│   │   ├── InterferenceLab.tsx
│   │   ├── FAQ.tsx
│   │   ├── Authors.tsx
│   │   └── Media.tsx
│   ├── data/
│   │   └── content.tsx     # Весь текстовый контент + интерфейсы
│   ├── hooks/
│   │   ├── useParticles.ts
│   │   └── useScrollReveal.ts
│   ├── styles/
│   │   ├── typography.ts   # Типографические токены
│   │   └── spacing.ts      # Токены отступов
│   ├── App.tsx
│   ├── index.css           # Глобальные стили, сканлайны, виньетка
│   ├── main.tsx
│   └── tokens.json         # Результат color-analysis.py
├── index.html
├── tailwind.config.js      # Кастомные цвета и токены
├── vite.config.ts
├── eslint.config.js
└── package.json
```

## Архитектура

```
App
├── ScrollProgress            # Градиентный индикатор скролла
├── Header                    # Sticky навигация + мобильное меню
└── main
    ├── Hero                  # Полноэкранная секция с афишей
    ├── PartnersStrip         # Логотипы партнёров
    ├── PhotoArchive          # Горизонтальная лента фото
    ├── About                 # Описание + цветовая система
    ├── Program               # Программа + таймлайн
    ├── Context               # Теория и источники (Accordion)
    ├── InterferenceLab       # Математика + симулятор волн
    ├── FAQ                   # Вопросы и ответы
    ├── Authors               # Команда проекта
    └── Media                 # Архив материалов (placeholder)
└── Footer                    # Навигация + внешние ссылки + контакты
```

## Дизайн-принципы

- **Только JetBrains Mono** — единый моноширинный шрифт для всего интерфейса
- **Постер как источник правды** — все цвета из афиши, ничего случайного
- **Минимум декора** — чистая типографика, строгая сетка, осознанные акценты
- **Мобильный first** — база 375px, breakpoints: `md` (768px), `lg` (1024px)
- **Доступность** — `prefers-reduced-motion`, контрастные цвета

## Лицензия

### Исходный код

Распространяется под лицензией [CC BY-NC-SA 4.0](LICENSE) (Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International).

- ✅ Можно копировать, модифицировать и распространять
- ❌ **Нельзя** использовать в коммерческих целях
- 🔄 Производные работы должны распространяться под той же лицензией (ShareAlike)

### Текст, медиа и торговые марки

Текстовый контент сайта, изображения, фото, видео, название проекта «Интерференция реальностей», логотипы и торговые марки **ODA.dream** являются интеллектуальной собственностью и защищены авторским правом.

> © 2026 ODA Dream. Все права защищены.
