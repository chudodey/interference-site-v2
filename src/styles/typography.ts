/**
 * Единая типографическая система — 14 ролей.
 *
 * Каждая роль — полная строка классов Tailwind.
 * Цвет задаётся отдельно через text-* классы.
 */
export const t = {
  /** 1. Display — заглавие Hero */
  display:
    'font-mono text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-[0.9] tracking-tight',

  /** 1a. Display Small — бренд в Footer */
  displaySm: 'font-mono text-lg sm:text-xl font-bold uppercase leading-[0.95]',

  /** 2. H2 — заголовки секций */
  h2: 'font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide',

  /** 3. H3 — подзаголовки */
  h3: 'font-mono text-lg md:text-xl font-bold leading-snug',

  /** 4. Highlight — акцентные мелкие заголовки, жирные значения */
  highlight: 'font-mono text-sm font-bold',

  /** 5. Body / Primary — основной текст */
  bodyPrimary: 'font-mono text-sm md:text-base leading-relaxed',

  /** 6. Body / Secondary — вторичный текст (italic — опционально) */
  bodySecondary: 'font-mono text-sm leading-relaxed',

  /** 7. Caption — микро-текст, примечания */
  caption: 'font-mono text-xs leading-relaxed',

  /** 8. Label — мета-информация, uppercase микро */
  label: 'font-mono text-[10px] uppercase tracking-widest',

  /** 9. Badge — категории, роли, теги */
  badge: 'font-mono text-[10px] font-bold uppercase tracking-widest',

  /** 10. Button — CTA */
  button: 'font-mono text-xs font-bold uppercase tracking-wider',

  /** 11. Quote — цитаты */
  quote: 'font-mono text-base md:text-lg italic leading-relaxed',

  /** 12. Number — декоративные номера */
  number: 'font-mono text-2xl font-bold',

  /** 13. Nav / Link — навигация desktop, footer links */
  navLink: 'font-mono text-xs uppercase tracking-widest',

  /** 14. Nav / Link Large — мобильная навигация, accordion titles */
  navLinkLarge: 'font-mono text-xs md:text-sm font-bold uppercase tracking-wide',

  /** 15. Event Date — дата и место проведения в Hero */
  eventDate: 'font-mono text-xs md:text-sm uppercase tracking-[0.25em]',
} as const;
