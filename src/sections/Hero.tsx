import { useRef } from 'react';
import { useParticles } from '../hooks/useParticles';
import QuantumButton from '../components/QuantumButton';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

interface HeroProps {
  onNavigate: (id: string) => void;
}

function InterferenceTitle() {
  return (
    <div className="select-none">
      <div className={`${t.display} text-accent-primary`}>ИНТЕРФЕРЕНЦИ</div>
      <div className={t.display}>
        <span className="text-text-primary">РЕАЛЬНОСТЕЙ</span>
        <span className="text-accent-primary">Я</span>
      </div>
    </div>
  );
}

export default function Hero({ onNavigate }: HeroProps) {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background particles — flow around card
  useParticles(bgCanvasRef, {
    obstacleRef: cardRef,
    count: 140,
    speed: 1.6,
    colors: [
      'rgba(194, 101, 157, 0.75)',
      'rgba(141, 78, 121, 0.65)',
      'rgba(210, 170, 152, 0.65)',
      'rgba(233, 208, 197, 0.5)',
    ],
  });

  // Foreground particles — drift upward like poplar fluff, pass through card area
  useParticles(fgCanvasRef, {
    count: 60,
    speed: 1.2,
    behavior: 'updraft',
    colors: ['rgba(194, 101, 157, 0.45)', 'rgba(210, 170, 152, 0.4)', 'rgba(233, 208, 197, 0.35)'],
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}poster-bg.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-bg-primary/40" />

      {/* Background particles — behind card */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 w-full h-full z-[1] opacity-90 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-12">
        <div
          ref={cardRef}
          className={`bg-bg-primary/60 backdrop-blur-md ${s.cardLg} border border-border w-full`}
        >
          {/* 1. Festival name */}
          <div className={s.mbMd}>
            <span className={`${t.label} text-peach/80 block mb-1`}>
              XIV Фестиваль современного искусства
            </span>
            <a
              href="https://t-fest.online/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${t.navLinkLarge} text-peach hover:text-accent-primary transition-colors`}
            >
              «Циолковский Фест»
            </a>
          </div>

          {/* 2. Format */}
          <p className={`${t.label} text-text-muted mb-5`}>
            Нейроспектакль · Импровизация · Эксперимент
          </p>

          {/* 3. Title */}
          <InterferenceTitle />

          {/* 4. Date / location */}
          <p className={`${t.eventDate} text-peach mt-5 mb-5`}>16 мая 2026 · Калуга · 19:00</p>

          {/* 5. Flavour quote */}
          <p className={`${t.quote} text-text-primary/70 mb-6 max-w-md mx-auto`}>
            «Что если спектакль полностью рождается только в момент, когда вы направляете на него
            внимание?»
          </p>

          {/* 6. Entry + buttons */}
          <p className={`${t.label} text-text-muted mb-4`}>Вход свободный, по регистрации · 12+</p>

          <div className={`flex flex-col sm:flex-row items-center justify-center ${s.gapSm}`}>
            <QuantumButton
              href="https://tsiolkovskiy-fest-event.timepad.ru/event/3937269/"
              external
            >
              Зарегистрироваться
            </QuantumButton>
            <QuantumButton variant="ghost" onClick={() => onNavigate('about')}>
              Узнать больше
            </QuantumButton>
          </div>
        </div>
      </div>

      {/* Foreground particles — above card */}
      <canvas
        ref={fgCanvasRef}
        className="absolute inset-0 w-full h-full z-[11] opacity-70 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center ${s.gapSm} z-10`}
      >
        <span className={`${t.label} text-text-muted`}>Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-accent-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
}
