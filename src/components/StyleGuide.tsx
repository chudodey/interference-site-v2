import Divider from './Divider';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

// ── Цвета ──
const COLORS = [
  { name: 'bg-primary', bg: 'bg-bg-primary', text: 'text-text-primary', note: 'Фон страницы' },
  { name: 'bg-secondary', bg: 'bg-bg-secondary', text: 'text-text-primary', note: 'Фон секций' },
  { name: 'surface', bg: 'bg-surface', text: 'text-text-primary', note: 'Карточки' },
  {
    name: 'accent-primary',
    bg: 'bg-accent-primary',
    text: 'text-bg-primary',
    note: 'Главный акцент',
  },
  {
    name: 'accent-secondary',
    bg: 'bg-accent-secondary',
    text: 'text-text-primary',
    note: 'Вторичный акцент',
  },
  {
    name: 'accent-tertiary',
    bg: 'bg-accent-tertiary',
    text: 'text-text-primary',
    note: 'Третичный акцент',
  },
  { name: 'text-primary', bg: 'bg-text-primary', text: 'text-bg-primary', note: 'Основной текст' },
  { name: 'text-muted', bg: 'bg-text-muted', text: 'text-bg-primary', note: 'Вторичный текст' },
  { name: 'text-subtle', bg: 'bg-text-subtle', text: 'text-text-primary', note: 'Третичный текст' },
  { name: 'peach', bg: 'bg-peach', text: 'text-bg-primary', note: 'Тёплый акцент' },
  { name: 'warm-gray', bg: 'bg-warm-gray', text: 'text-bg-primary', note: 'Нейтральный' },
  { name: 'border', bg: 'bg-border', text: 'text-text-primary', note: 'Границы' },
];

// ── Типографика: 14 ролей ──
// Роль = размер + вес + трекинг + регистр. Цвет — отдельно.
const TYPE_ROLES = [
  {
    role: '01. Display',
    className: t.display,
    color: 'text-accent-primary',
    sample: 'ИНТЕРФЕРЕНЦИЯ',
    where: 'Hero title',
  },
  {
    role: '01a. Display Small',
    className: t.displaySm,
    color: 'text-accent-primary',
    sample: 'ИНТЕРФЕРЕНЦИЯ',
    where: 'Footer brand',
  },
  {
    role: '02. H2',
    className: t.h2,
    color: 'text-text-primary',
    sample: 'Заголовок секции',
    where: 'Section titles',
  },
  {
    role: '03. H3',
    className: t.h3,
    color: 'text-text-primary',
    sample: 'XIV Фестиваля Современного Искусства',
    where: 'Subsection titles',
  },
  {
    role: '04. Highlight',
    className: t.highlight,
    color: 'text-text-primary',
    sample: 'ИКЦ, ул. Октябрьская, 17а',
    where: 'Card titles, accent values',
  },
  {
    role: '05. Body / Primary',
    className: t.bodyPrimary,
    color: 'text-text-primary',
    sample: 'Основной текст абзаца. Когда две или более когерентных волны накладываются...',
    where: 'Main paragraphs',
  },
  {
    role: '06. Body / Secondary',
    className: t.bodySecondary,
    color: 'text-text-muted',
    sample: 'Вторичный текст. Этот феномен лежит в основе квантовой механики...',
    where: 'Secondary paragraphs',
  },
  {
    role: '07. Caption',
    className: t.caption,
    color: 'text-text-subtle',
    sample: 'Примечание или техническая деталь в самом малом размере.',
    where: 'Notes, formulas, hints',
  },
  {
    role: '08. Label',
    className: t.label,
    color: 'text-text-muted',
    sample: '16 мая 2026 · Калуга · 19:00',
    where: 'Meta info, scroll, section tags',
  },
  {
    role: '09. Badge',
    className: t.badge,
    color: 'text-accent-primary',
    sample: 'Режиссёр · Драматург',
    where: 'Roles, categories, tags',
  },
  {
    role: '10. Button',
    className: t.button,
    color: 'text-accent-primary',
    sample: 'Зарегистрироваться',
    where: 'CTAs',
  },
  {
    role: '11. Quote',
    className: t.quote,
    color: 'text-peach',
    sample: '«Коллективное внимание — как волновая функция...»',
    where: 'Blockquotes, flavour text',
  },
  {
    role: '12. Number',
    className: t.number,
    color: 'text-accent-primary/40',
    sample: '01',
    where: 'Decorative numbers',
  },
  {
    role: '13. Nav / Link',
    className: t.navLink,
    color: 'text-text-muted',
    sample: 'Программа',
    where: 'Desktop nav, footer links',
  },
  {
    role: '14. Nav / Link Large',
    className: t.navLinkLarge,
    color: 'text-text-primary',
    sample: 'Лаборатория',
    where: 'Mobile nav, accordion titles',
  },
  {
    role: '15. Event Date',
    className: t.eventDate,
    color: 'text-peach',
    sample: '16 мая 2026 · Калуга · 19:00',
    where: 'Hero date / venue',
  },
];

// ── Отступы по ролям ──
const SPACING_ROLES = [
  { role: 'section', className: s.section, px: '80 / 128px', where: 'Основные секции' },
  {
    role: 'sectionCompact',
    className: s.sectionCompact,
    px: '32 / 40px',
    where: 'Компактные секции',
  },
  { role: 'container', className: s.container, px: '16 / 32px', where: 'Горизонтальные отступы' },
  { role: 'containerWide', className: s.containerWide, px: '16 / 24px', where: 'Header' },
  { role: 'mbSm', className: s.mbSm, px: '16px', where: 'После заголовка / тега' },
  { role: 'mbMd', className: s.mbMd, px: '32px', where: 'Между блоками' },
  { role: 'mbLg', className: s.mbLg, px: '48px', where: 'Крупный блок (цитаты, гриды)' },
  { role: 'gapSm', className: s.gapSm, px: '12px', where: 'Мелкий gap (кнопки)' },
  { role: 'gapMd', className: s.gapMd, px: '16px', where: 'Стандартный gap (карточки)' },
  { role: 'gapLg', className: s.gapLg, px: '32px', where: 'Большой gap (группы)' },
  { role: 'stack', className: s.stack, px: '16px', where: 'Вертикальный стек' },
  { role: 'cardSm', className: s.cardSm, px: '16px', where: 'Мелкие карточки / Accordion' },
  { role: 'card', className: s.card, px: '20px', where: 'Стандартные карточки' },
  { role: 'cardLg', className: s.cardLg, px: '24 / 32px', where: 'Большие карточки' },
  { role: 'divider', className: s.divider, px: '32 / 48px', where: 'Divider' },
];

export default function StyleGuide() {
  return (
    <section className="py-12 bg-bg-primary border-b-2 border-dashed border-accent-primary/30">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className={`${t.h2} text-accent-primary mb-2`}>Style Guide (debug)</h2>
        <p className={`${t.caption} text-text-muted mb-10`}>
          Перед финальной сборкой установите SHOW_DEBUG_STYLE_GUIDE = false в App.tsx
        </p>

        {/* ── Цвета ── */}
        <div className="mb-10">
          <h3 className={`${t.label} text-text-muted mb-4`}>Цвета</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {COLORS.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div className={`w-full aspect-square ${c.bg} border border-border`} />
                <span className={`${t.label} text-text-muted text-center`}>{c.name}</span>
                <span className={`${t.label} text-text-subtle text-center`}>{c.note}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Типографика ── */}
        <div className="my-10">
          <h3 className={`${t.label} text-text-muted mb-4`}>Типографика — 14 ролей</h3>
          <div className="space-y-6">
            {TYPE_ROLES.map((item) => (
              <div
                key={item.role}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
              >
                <span className={`${t.label} text-text-subtle w-40 shrink-0 sm:text-right`}>
                  {item.role}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`${item.className} ${item.color}`}>{item.sample}</p>
                  <p className={`${t.caption} text-text-subtle mt-1`}>
                    {item.className.replace(/font-mono /g, '')}
                  </p>
                  <p className={`${t.label} text-text-subtle/60 mt-0.5`}>{item.where}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Отступы ── */}
        <div className="my-10">
          <h3 className={`${t.label} text-text-muted mb-4`}>Отступы — 19 ролей</h3>
          <div className="space-y-2">
            {SPACING_ROLES.map((item) => (
              <div key={item.role} className="flex items-center gap-4">
                <span className={`${t.label} text-text-subtle w-28 shrink-0 text-right`}>
                  {item.role}
                </span>
                <span className={`${t.label} text-text-subtle w-16 shrink-0 text-right`}>
                  {item.px}
                </span>
                <div
                  className={`flex-1 ${item.className.replace(/px-|py-/g, 'h-')} bg-accent-primary/60`}
                />
                <span
                  className={`${t.label} text-text-subtle/60 w-32 shrink-0 text-right hidden sm:block`}
                >
                  {item.where}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
