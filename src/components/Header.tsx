import { t } from '../styles/typography';
import { s } from '../styles/spacing';
import { SHOW_MEDIA } from '../data/features';

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onNavigate: (id: string) => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Спектакль', hideBelow: 'none' as const },
  { id: 'about', label: 'О проекте', hideBelow: 'none' as const },
  { id: 'program', label: 'Программа', hideBelow: 'none' as const },
  { id: 'context', label: 'Контекст', hideBelow: 'xl' as const },
  { id: 'interference', label: 'Лаборатория', hideBelow: 'lg' as const },
  { id: 'faq', label: 'FAQ', hideBelow: 'xl' as const },
  { id: 'authors', label: 'Авторы', hideBelow: 'none' as const },
  ...(SHOW_MEDIA ? [{ id: 'materials', label: 'Медиа', hideBelow: 'lg' as const }] : []),
];

export default function Header({ menuOpen, setMenuOpen, onNavigate }: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div
          className={`max-w-6xl mx-auto ${s.containerWide} h-14 flex items-center justify-between`}
        >
          <button
            onClick={() => onNavigate('hero')}
            className={`${t.navLinkLarge} text-text-primary hover:text-accent-primary transition-colors whitespace-nowrap`}
          >
            ИР{' '}
            <span className={`${t.caption} text-text-muted font-normal`}>
              · 16 МАЯ · 19:00 · ИКЦ · КАЛУГА
            </span>
          </button>

          <nav className={`hidden md:flex items-center ${s.gapLg}`}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`${t.navLink} text-text-muted hover:text-accent-primary transition-colors whitespace-nowrap ${
                  link.hideBelow === 'lg'
                    ? 'hidden lg:inline'
                    : link.hideBelow === 'xl'
                      ? 'hidden xl:inline'
                      : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className={`flex flex-col items-center justify-center h-full ${s.gapLg}`}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`${t.navLinkLarge} text-text-primary hover:text-accent-primary transition-colors`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
