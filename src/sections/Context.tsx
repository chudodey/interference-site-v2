import SectionTag from '../components/SectionTag';
import Accordion from '../components/Accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { contextItems } from '../data/content';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

export default function Context() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="context" className={`${s.section} bg-bg-primary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="03">Контекст</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-peach">Теория</span>{' '}
          <span className="text-text-primary">и источники</span>
        </h2>

        <p className={`${t.bodySecondary} text-text-muted ${s.mbLg} max-w-xl`}>
          Спектакль стоит на пересечении квантовой физики, театральной антропологии и
          нейротехнологий. Каждый источник — не декорация, а рабочий инструмент.
        </p>

        <Accordion items={contextItems} />
      </div>
    </section>
  );
}
