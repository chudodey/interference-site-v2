import SectionTag from '../components/SectionTag';
import Timeline from '../components/Timeline';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { programTimeline } from '../data/content';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

export default function Program() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="program" className={`${s.section} bg-bg-secondary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="02">Программа</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-text-primary">Ход</span> <span className="text-peach">вечера</span>
        </h2>

        <p className={`${t.bodySecondary} text-text-muted ${s.mbLg} max-w-xl`}>
          16 мая 2026,{' '}
          <a
            href="https://www.icc40.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:underline"
          >
            ИКЦ
          </a>
          , Калуга. Время указано приблизительно — спектакль-импровизация не привязана к минутам.
        </p>

        <Timeline items={programTimeline} />
      </div>
    </section>
  );
}
