# Agent Guide — interference-site-v2

Инструкции для AI-агентов, работающих с кодовой базой проекта.

---

## Стек и версии

- **React** 19.2.5 (functional components, hooks)
- **TypeScript** ~6.0.2 (strict mode)
- **Vite** 8.0.10 (ESM, `type: "module"`)
- **Tailwind CSS** 3.4.19 (JIT, утилитарные классы)
- **PostCSS** 8.5.12 + **Autoprefixer** 10.5.0

## Критические правила

### 1. Tailwind классы — только полные строки

JIT-компилятор анализирует исходный код статически. **Нельзя** конкатенировать классы динамически:

```tsx
// ❌ НЕ РАБОТАЕТ — JIT не найдёт класс
const color = 'accent-primary';
<div className={`bg-${color}`} />;

// ✅ Правильно — полная строка
<div className="bg-accent-primary" />;

// ✅ Если нужно несколько вариантов — используй cn() или switch
const variantClasses = {
  primary: 'bg-accent-primary text-bg-primary',
  secondary: 'border-accent-secondary text-accent-secondary',
};
```

### 2. Кастомные цвета

Все цвета определены в `tailwind.config.js`. Не используй произвольные hex напрямую в className:

```tsx
// ❌ Плохо
<div className="text-[#c2659d]" />

// ✅ Хорошо
<div className="text-accent-primary" />
```

Если нужен inline-стиль (например, для динамического цвета из данных), используй `style`:

```tsx
<div style={{ backgroundColor: color.hex }} />
```

### 3. Шрифт

**Только JetBrains Mono.** Не добавляй другие шрифты. Все текстовые элементы используют `font-mono`.

### 4. Импорты

Используй абсолютные пути от `src/` через алиасы Vite:

```tsx
import Header from './components/Header';
import Hero from './sections/Hero';
```

### 5. Компоненты

- Каждый компонент — отдельный файл в `src/components/` или `src/sections/`
- Экспорт по умолчанию: `export default function ComponentName()`
- Props типизируй через interface
- Не используй `React.FC`

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function QuantumButton({ variant, children, onClick }: ButtonProps) {
  // ...
}
```

### 6. Стили

- **Только Tailwind** для компонентов
- Глобальные стили — только в `src/index.css` (сканлайны, виньетка, скроллбар, селекция)
- Не создавай CSS-модули, не используй styled-components

### 7. Форматирование и линтинг

Перед коммитом запускай:

```bash
npm run lint       # ESLint
npm run format     # Prettier
npm run build      # TypeScript + Vite
```

Все три команды должны проходить без ошибок.

### 8. Цветовая палитра

Если нужно добавить новый цвет — обнови:
1. `tailwind.config.js` — добавь в `theme.extend.colors`
2. `src/index.css` — добавь CSS-переменную в `:root`
3. `scripts/color-analysis.py` — если цвет из афиши, добавь кластер
4. `src/tokens.json` — перегенерируй скриптом

Не добавляй цвета «на глаз» — все должны быть из афиши.

## Архитектура

```
App.tsx
├── ScrollProgress      # Градиентный прогресс скролла
├── Header              # Sticky header + мобильное меню
└── main
    ├── Hero            # Полноэкранная секция с афишей
    └── About
        └── ColorSystem # Визуальная демо палитры
```

### Компоненты дизайн-системы (готовы, но не все используются)

| Компонент | Статус | Описание |
|-----------|--------|----------|
| `SectionTag` | ✅ Готов | Метка секции с точкой-индикатором |
| `QuantumCard` | ✅ Готов | Карточка с бордером и hover-эффектом |
| `QuantumButton` | ✅ Готов | Кнопка 3 вариантов: primary, secondary, ghost |
| `Divider` | ✅ Готов | Горизонтальная линия с градиентом |
| `StatusDot` | ✅ Готов | Пульсирующая точка статуса |
| `QuantumBadge` | ✅ Готов | Бейдж с бордером и полупрозрачным фоном |
| `ColorSystem` | ✅ Готов | Визуализация палитры + UI-примеры |

## Роадмап (12 этапов)

| Этап | Статус | Описание |
|------|--------|----------|
| 1 — Bootstrap | ✅ | Vite + Tailwind + шрифты + базовые стили |
| 2 — Layout + Navigation | ✅ | Header, ScrollProgress, Hero |
| 3 — Design System | ✅ | Цветовая палитра, компоненты, ColorSystem |
| 4 — Hero Particles | ⏳ | Анимированные частицы на Hero |
| 5 — Content Sections | ⏳ | Описание, программа, таймлайн |
| 6 — Registration | ⏳ | Форма регистрации |
| 7 — Accordion | ⏳ | FAQ / вопросы-ответы |
| 8 — Authors | ⏳ | Блок об авторах |
| 9 — Project Schrödinger | ⏳ | О проекте |
| 10 — Media Engine | ⏳ | Галерея, видео |
| 11 — Reviews + Footer | ⏳ | Отзывы, подвал |
| 12 — Polish | ⏳ | Анимации, performance, SEO |

## Полезные команды

```bash
# Анализ палитры афиши
python scripts/color-analysis.py public/poster-bg.webp

# Проверка сгенерированных классов в билде
grep -o '\.bg-[^}]*{[^}]*}' dist/assets/index-*.css
```

## Контакты

- Проект: ODA Dream
- Сайт: https://chudodey.github.io/interference-site-v2/
