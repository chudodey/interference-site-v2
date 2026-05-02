import Divider from './Divider';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

const NAV_LINKS = [
  { id: 'hero', label: 'Спектакль' },
  { id: 'about', label: 'О проекте' },
  { id: 'program', label: 'Программа' },
  { id: 'context', label: 'Контекст' },
  { id: 'materials', label: 'Медиа' },
  { id: 'faq', label: 'FAQ' },
  { id: 'authors', label: 'Авторы' },
];

interface ExternalGroup {
  title: string;
  links: { label: string; href: string }[];
}

const EXTERNAL_GROUPS: ExternalGroup[] = [
  {
    title: 'Фестиваль',
    links: [
      { label: 'Сайт', href: 'https://t-fest.online/' },
      { label: 'ВКонтакте', href: 'https://vk.com/tsiolkovsky_fest' },
    ],
  },
  {
    title: 'Регистрация',
    links: [
      { label: 'Timepad', href: 'https://tsiolkovskiy-fest-event.timepad.ru/event/3937269/' },
    ],
  },
  {
    title: 'ODA.dream',
    links: [
      { label: 'Сайт', href: 'https://odadream.art/' },
      { label: 'Telegram', href: 'https://t.me/odadream' },
      { label: 'Dzen', href: 'https://dzen.ru/odadream' },
    ],
  },
  {
    title: 'Площадка',
    links: [{ label: 'ИКЦ', href: 'https://www.icc40.ru/' }],
  },
];

function InterferenceTitleSmall() {
  return (
    <div className="select-none">
      <div className={`flex justify-between ${t.displaySm}`}>
        {'ИНТЕРФЕРЕНЦИЯ'.split('').map((c, i) => (
          <span key={i} className="text-accent-primary">
            {c}
          </span>
        ))}
      </div>
      <div className={`flex justify-between ${t.displaySm}`}>
        {'РЕАЛЬНОСТЕЙ'.split('').map((c, i) => (
          <span key={i} className="text-text-primary">
            {c}
          </span>
        ))}
        <span className="text-accent-primary">Я</span>
      </div>
    </div>
  );
}

interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className={`max-w-5xl mx-auto ${s.container} py-12 md:py-16`}>
        {/* Main grid */}
        <div className={`grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-12 ${s.gapLg} ${s.mbLg}`}>
          {/* Brand */}
          <div className="col-span-3 sm:col-span-3 lg:col-span-5">
            <button onClick={() => onNavigate('hero')} className={`block ${s.mbSm}`}>
              <InterferenceTitleSmall />
            </button>
            <p className={`${t.caption} text-text-muted max-w-xs`}>
              Нейроспектакль-импровизация на стыке науки, технологий и перформанса.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <span className={`${t.highlight} text-text-primary mb-4 block`}>Навигация</span>
            <nav className={`flex flex-col ${s.stack}`}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`${t.navLink} text-text-muted hover:text-accent-primary transition-colors text-left`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* External groups */}
          {EXTERNAL_GROUPS.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <span className={`${t.highlight} text-text-primary mb-4 block`}>{group.title}</span>
              <div className={`flex flex-col ${s.stack}`}>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${t.caption} text-text-muted hover:text-accent-primary transition-colors`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Contacts */}
          <div className="lg:col-span-1">
            <span className={`${t.highlight} text-text-primary mb-4 block`}>Контакты</span>
            <div className={`flex flex-col ${s.stack}`}>
              <a
                href="mailto:hi@odadream.art"
                className={`${t.navLink} text-text-muted hover:text-accent-primary transition-colors break-all`}
              >
                hi@odadream.art
              </a>
            </div>
          </div>
        </div>

        <Divider />

        {/* Bottom bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between ${s.gapMd}`}>
          <p className={`${t.label} text-text-subtle`}>
            © {currentYear} ODA.dream. Все права защищены.
          </p>
          <p className={`${t.label} text-text-subtle`}>
            16 мая 2026 · ИКЦ Калуга · XIV Циолковский Фест
          </p>
        </div>

        {/* GitHub */}
        <div className="pt-4 flex justify-center">
          <a
            href="https://github.com/chudodey/interference-site-v2"
            target="_blank"
            rel="noopener noreferrer"
            className={`${t.navLink} text-text-muted hover:text-accent-primary transition-colors flex items-center gap-2`}
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Исходный код на GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
