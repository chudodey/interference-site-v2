import { useEffect, useRef, type RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T | null> {
  const { threshold = 0.05, rootMargin = '0px 0px -20px 0px', delay = 0 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                el.classList.add('is-visible');
              }, delay);
            } else {
              el.classList.add('is-visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  return ref;
}
