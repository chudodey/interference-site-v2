import SectionTag from '../components/SectionTag';
import Accordion from '../components/Accordion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { faqItems } from '../data/content';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

export default function FAQ() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="faq" className={`${s.section} bg-bg-secondary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="05">Вопросы и ответы</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-text-primary">Что</span>{' '}
          <span className="text-peach">полезно знать</span>
        </h2>

        <p className={`${t.bodySecondary} text-text-muted ${s.mbLg} max-w-xl`}>
          Если вы не нашли ответ на свой вопрос —{' '}
          <a href="mailto:hi@odadream.art" className="text-accent-primary hover:underline">
            hi@odadream.art
          </a>
          .
        </p>

        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
