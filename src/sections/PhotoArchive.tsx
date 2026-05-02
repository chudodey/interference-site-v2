import { useRef, useState, useEffect } from 'react';
import SectionTag from '../components/SectionTag';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

const PHOTOS = [
  { src: '/photos/8.webp', alt: 'Сцена из спектакля «Проект Шрёдингер»' },
  { src: '/photos/3.webp', alt: 'Актриса с нейроинтерфейсом' },
  { src: '/photos/6.webp', alt: 'Визуализация нейроданных на экране' },
  { src: '/photos/2.webp', alt: 'Актеры на сцене' },
  { src: '/photos/5.webp', alt: 'Танцор с нейроободком' },
  { src: '/photos/7.webp', alt: 'Нейрохудожник на сцене' },
  { src: '/photos/1.webp', alt: 'Выступление на сцене' },
  { src: '/photos/4.webp', alt: 'Нейроинтерфейсы Muse' },
];

const BASE = import.meta.env.BASE_URL;

export default function PhotoArchive() {
  const revealRef = useScrollReveal<HTMLElement>();
  const stripRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const items = strip.querySelectorAll<HTMLDivElement>('[data-photo-index]');
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.photoIndex);
            setActiveIndex(idx);
          }
        });
      },
      { root: strip, threshold: 0.6 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = stripRef.current;
    if (!el) return;
    const amount = dir === 'left' ? -el.clientWidth * 0.6 : el.clientWidth * 0.6;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = stripRef.current;
    if (!el) return;
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.scrollLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = stripRef.current;
    if (!el || !dragRef.current.isDragging) return;
    e.preventDefault();
    const delta = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.scrollLeft - delta * 1.5;
  };

  const handleMouseUp = () => {
    const el = stripRef.current;
    if (!el) return;
    dragRef.current.isDragging = false;
    el.style.cursor = 'grab';
    el.style.scrollSnapType = '';
  };

  return (
    <section ref={revealRef} id="archive" className={`${s.sectionCompact} reveal`}>
      {/* Header */}
      <div className={`max-w-5xl mx-auto ${s.container} ${s.mbMd}`}>
        <SectionTag number="00">Фотоархив</SectionTag>
      </div>

      {/* Full-bleed photo strip */}
      <div className="relative">
        {/* Nav arrows */}
        <button
          onClick={() => scroll('left')}
          className="flex items-center justify-center absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/60 text-text-muted hover:border-accent-primary hover:text-accent-primary transition-colors bg-bg-primary/80 backdrop-blur-sm"
          aria-label="Предыдущее фото"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="flex items-center justify-center absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/60 text-text-muted hover:border-accent-primary hover:text-accent-primary transition-colors bg-bg-primary/80 backdrop-blur-sm"
          aria-label="Следующее фото"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <div
          ref={stripRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-4 scrollbar-none px-4 md:px-8 cursor-grab select-none"
          style={{ touchAction: 'pan-x' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              data-photo-index={i}
              className="snap-center snap-always shrink-0 h-72 md:h-96 relative group"
              style={{ scrollSnapStop: 'always' }}
            >
              <img
                src={`${BASE}${photo.src.slice(1)}`}
                alt={photo.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                draggable={false}
                className="h-full w-auto object-cover rounded-sm saturate-[0.85] group-hover:saturate-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots + caption */}
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const strip = stripRef.current;
                if (!strip) return;
                const item = strip.querySelector(`[data-photo-index="${i}"]`) as HTMLElement;
                if (item) {
                  item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? 'bg-accent-primary' : 'bg-border'
              }`}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>

        <p className={`${t.caption} text-text-muted text-center mt-3`}>
          Спектакль «Проект Шрёдингер» · XIII Фестиваль современного искусства «
          <a
            href="https://t-fest.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:underline"
          >
            Циолковский Фест
          </a>
          » · Калуга, 2025
        </p>
      </div>
    </section>
  );
}
