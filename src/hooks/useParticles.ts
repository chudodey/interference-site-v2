import { useEffect, useRef, type RefObject } from 'react';

interface ParticleOptions {
  count?: number;
  colors?: string[];
  speed?: number;
  obstacleRef?: RefObject<HTMLElement | null>;
  behavior?: 'float' | 'updraft';
}

const DEFAULT_COLORS = [
  'rgba(194, 101, 157, 0.6)',
  'rgba(141, 78, 121, 0.5)',
  'rgba(210, 170, 152, 0.5)',
  'rgba(136, 128, 146, 0.4)',
  'rgba(194, 101, 157, 0.35)',
  'rgba(210, 170, 152, 0.35)',
];

interface ObstacleRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  twinkleSpeed: number;
  driftPhase: number;
  driftAmp: number;
  behavior: 'float' | 'updraft';

  constructor(width: number, height: number, colors: string[], behavior: 'float' | 'updraft') {
    this.behavior = behavior;
    if (behavior === 'updraft') {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(Math.random() * 0.8 + 0.6);
    } else {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -(Math.random() * 0.35 + 0.2);
    }
    this.radius = Math.random() * 2 + 0.8;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.phase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.03 + 0.008;
    this.driftPhase = Math.random() * Math.PI * 2;
    this.driftAmp = Math.random() * 0.2 + 0.05;
  }

  update(width: number, height: number, speed: number, obstacle: ObstacleRect | null) {
    this.driftPhase += 0.016 * speed;
    const drift = Math.sin(this.driftPhase) * this.driftAmp * speed;

    this.x += (this.vx + drift) * speed;
    this.y += this.vy * speed;
    this.phase += this.twinkleSpeed * speed;

    if (this.behavior === 'updraft' && obstacle) {
      const cx = obstacle.x + obstacle.w / 2;
      const halfW = obstacle.w / 2;
      const bottomY = obstacle.y + obstacle.h;

      if (Math.abs(this.x - cx) < halfW + 30) {
        if (this.y > bottomY && this.y < bottomY + 60) {
          const pushDir = this.x < cx ? -1 : 1;
          this.x += pushDir * 0.6 * speed;
        }
      }
    }

    if (this.behavior === 'float' && obstacle) {
      const cx = obstacle.x + obstacle.w / 2;
      const cy = obstacle.y + obstacle.h / 2;
      const halfW = obstacle.w / 2 + 20;
      const halfH = obstacle.h / 2 + 20;

      const dx = this.x - cx;
      const dy = this.y - cy;

      if (Math.abs(dx) < halfW && Math.abs(dy) < halfH) {
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (1 - dist / Math.max(halfW, halfH)) * 0.8;
        const pushX = (dx / dist) * force * 2.5;
        const pushY = (dy / dist) * force * 0.5;
        this.x += pushX * speed;
        this.y += pushY * speed;
      }
    }

    if (this.y < -20) {
      this.y = height + 20;
      this.x = Math.random() * width;
    }
    if (this.x < -15) {
      this.x = width + 15;
    } else if (this.x > width + 15) {
      this.x = -15;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const opacity = 0.4 + Math.sin(this.phase) * 0.6;
    const a = Math.max(0, Math.min(1, opacity));
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.radius > 1.8) {
      ctx.globalAlpha = Math.max(0, Math.min(0.3, a * 0.3));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}

export function useParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: ParticleOptions = {}
) {
  const {
    count = 150,
    colors = DEFAULT_COLORS,
    speed = 1.2,
    obstacleRef,
    behavior = 'float',
  } = options;
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotionRef = useRef(false);
  const obstacleCacheRef = useRef<ObstacleRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const area = width * height;
      const maxArea = 1920 * 1080; // ~2 MP
      const dpr = area > maxArea ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getObstacle = (): ObstacleRect | null => {
      if (!obstacleRef?.current) return null;
      const rect = obstacleRef.current.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      return {
        x: rect.left - canvasRect.left,
        y: rect.top - canvasRect.top,
        w: rect.width,
        h: rect.height,
      };
    };

    const updateObstacle = () => {
      obstacleCacheRef.current = getObstacle();
    };

    const init = () => {
      resize();
      updateObstacle();
      particlesRef.current = Array.from(
        { length: count },
        () => new Particle(width, height, colors, behavior)
      );
      if (reducedMotionRef.current) {
        draw();
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(init);

    const observer = new ResizeObserver(() => {
      resize();
      updateObstacle();
    });
    observer.observe(canvas);

    // Update obstacle position periodically (scroll / layout changes)
    const obstacleInterval = setInterval(updateObstacle, 200);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        p.draw(ctx);
      }
    };

    const animate = () => {
      if (reducedMotionRef.current) {
        draw();
        return;
      }
      const obstacle = obstacleCacheRef.current;
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        p.update(width, height, speed, obstacle);
        p.draw(ctx);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (!reducedMotionRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      reducedMotionRef.current = e.matches;
      cancelAnimationFrame(rafRef.current);
      if (reducedMotionRef.current) {
        draw();
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    mql.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      clearInterval(obstacleInterval);
      document.removeEventListener('visibilitychange', handleVisibility);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, [canvasRef, count, colors, speed, obstacleRef, behavior]);
}
