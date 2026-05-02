import SectionTag from '../components/SectionTag';
import StatusDot from '../components/StatusDot';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

const PLACEHOLDER_ITEMS = [
  { label: 'Фото с репетиций', status: 'soon' as const },
  { label: 'Видео-трейлер', status: 'soon' as const },
  { label: 'Фото с премьеры', status: 'soon' as const },
  { label: 'Видео-отчёт', status: 'soon' as const },
  { label: 'Интервью с авторами', status: 'soon' as const },
  { label: 'Запись спектакля', status: 'soon' as const },
];

export default function Media() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="materials" className={`${s.section} bg-bg-secondary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="07">Медиа</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-text-primary">Архив</span>{' '}
          <span className="text-peach">материалов</span>
        </h2>

        <p className={`${t.bodySecondary} text-text-muted ${s.mbLg} max-w-xl`}>
          Фото, видео и документы появятся здесь после премьеры 16 мая 2026. Следите за обновлениями
          во{' '}
          <a
            href="https://vk.com/tsiolkovsky_fest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:underline"
          >
            ВКонтакте фестиваля
          </a>
          .
        </p>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${s.gapMd}`}>
          {PLACEHOLDER_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`relative aspect-video border border-border bg-bg-primary/50 flex flex-col items-center justify-center ${s.gapSm} ${s.cardLg}`}
            >
              <StatusDot />
              <span className={`${t.caption} text-text-muted text-center`}>{item.label}</span>
              <span className={`${t.label} text-text-subtle`}>Скоро</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
