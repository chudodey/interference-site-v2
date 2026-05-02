import SectionTag from '../components/SectionTag';
import LayerCard from '../components/LayerCard';
import QuantumButton from '../components/QuantumButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { showDescription, showLead, showQuestion, layers, conceptQuote } from '../data/content';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

export default function About() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      id="about"
      className={`pt-12 md:pt-16 pb-20 md:pb-32 bg-bg-primary reveal`}
    >
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="01">О спектакле</SectionTag>

        <h2 className={`${t.h2} ${s.mbMd}`}>
          <span className="text-peach">Интерференция</span>{' '}
          <span className="text-text-primary">реальностей</span>
        </h2>

        <div className={`max-w-3xl ${s.mbLg}`}>
          <p className={`${t.bodyPrimary} text-text-primary ${s.mbSm}`}>{showDescription}</p>
          <p className={`${t.bodySecondary} text-text-muted ${s.mbSm}`}>{showLead}</p>
          <p className={`${t.bodySecondary} text-text-muted italic`}>{showQuestion}</p>
        </div>

        {/* Three Layers */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${s.gapMd} ${s.mbLg}`}>
          {layers.map((layer) => (
            <LayerCard
              key={layer.number}
              number={layer.number}
              title={layer.title}
              description={layer.description}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className={`border-l-2 border-accent-primary pl-6 ${s.mbLg}`}>
          <p className={`${t.quote} text-peach ${s.mbSm}`}>«{conceptQuote.text}»</p>
          <cite className={`${t.caption} text-text-muted not-italic`}>{conceptQuote.source}</cite>
        </blockquote>

        {/* CTA */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center ${s.gapMd}`}>
          <QuantumButton href="https://tsiolkovskiy-fest-event.timepad.ru/event/3937269/" external>
            Зарегистрироваться
          </QuantumButton>
          <span className={`${t.caption} text-text-muted`}>
            Вход свободный, по обязательной регистрации — места ограничены форматом эксперимента
          </span>
        </div>
      </div>
    </section>
  );
}
