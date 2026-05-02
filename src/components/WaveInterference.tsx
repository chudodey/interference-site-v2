import { useRef, useEffect, useState, useCallback } from 'react';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';
import InlineMath from './InlineMath';

interface Source {
  x: number;
  y: number;
  wavelength: number;
  active: boolean;
}

const GRID_RES = 240;
const LAMBDA = 1.2;
const PHASE_SPEED = 0.05;

const DEFAULT_SOURCES: Source[] = [
  { x: 0.35, y: 0.5, wavelength: 1.0, active: true },
  { x: 0.65, y: 0.5, wavelength: 1.0, active: true },
];

function colormap(val: number, out: Uint8ClampedArray, i4: number) {
  const t = (val + 1) * 0.5;
  if (t < 0.2) {
    const f = t * 5;
    out[i4] = 14 + (67 - 14) * f;
    out[i4 + 1] = 15 + (57 - 15) * f;
    out[i4 + 2] = 21 + (104 - 21) * f;
  } else if (t < 0.4) {
    const f = (t - 0.2) * 5;
    out[i4] = 67 + (141 - 67) * f;
    out[i4 + 1] = 57 + (78 - 57) * f;
    out[i4 + 2] = 104 + (121 - 104) * f;
  } else if (t < 0.6) {
    const f = (t - 0.4) * 5;
    out[i4] = 141 + (194 - 141) * f;
    out[i4 + 1] = 78 + (101 - 78) * f;
    out[i4 + 2] = 121 + (157 - 121) * f;
  } else if (t < 0.8) {
    const f = (t - 0.6) * 5;
    out[i4] = 194 + (210 - 194) * f;
    out[i4 + 1] = 101 + (170 - 101) * f;
    out[i4 + 2] = 157 + (152 - 157) * f;
  } else {
    const f = (t - 0.8) * 5;
    out[i4] = 210 + (233 - 210) * f;
    out[i4 + 1] = 170 + (208 - 170) * f;
    out[i4 + 2] = 152 + (197 - 152) * f;
  }
  out[i4 + 3] = 255;
}

export default function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const draggingRef = useRef<number>(-1);
  const offCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgDataRef = useRef<ImageData | null>(null);
  const dataBufRef = useRef<Float32Array | null>(null);
  const sizeRef = useRef({ cssW: 0, cssH: 0 });

  const [sources, setSources] = useState<Source[]>(DEFAULT_SOURCES.map((s) => ({ ...s })));
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [showHint, setShowHint] = useState(true);

  const activeSrcRef = useRef<Source[]>([]);
  useEffect(() => {
    activeSrcRef.current = sources.filter((s) => s.active);
  }, [sources]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return false;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.floor(rect.width);
    const cssH = Math.floor(rect.height);

    if (sizeRef.current.cssW !== cssW || sizeRef.current.cssH !== cssH) {
      sizeRef.current.cssW = cssW;
      sizeRef.current.cssH = cssH;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      return true;
    }
    return false;
  }, []);

  const computeAndRender = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = sizeRef.current.cssW;
    const H = sizeRef.current.cssH;
    if (W === 0 || H === 0) return;

    const N = GRID_RES;
    const scale = 18;
    const aspect = W / Math.max(1, H);
    const scaleX = scale * aspect;

    if (
      !offCanvasRef.current ||
      offCanvasRef.current.width !== N ||
      offCanvasRef.current.height !== N
    ) {
      offCanvasRef.current = document.createElement('canvas');
      offCanvasRef.current.width = N;
      offCanvasRef.current.height = N;
      const offCtx = offCanvasRef.current.getContext('2d');
      if (offCtx) {
        imgDataRef.current = offCtx.createImageData(N, N);
      }
      dataBufRef.current = new Float32Array(N * N);
    }

    const data = dataBufRef.current!;
    const imgData = imgDataRef.current!;
    const pixels = imgData.data;
    const activeSrc = activeSrcRef.current;
    const n = activeSrc.length;
    const t = phaseRef.current;

    if (n === 0) {
      ctx.fillStyle = '#0e0f15';
      ctx.fillRect(0, 0, W, H);
      return;
    }

    // Precompute source positions in simulation units
    const srcX = new Float64Array(n);
    const srcY = new Float64Array(n);
    const srcK = new Float64Array(n);
    const srcPhi = new Float64Array(n);
    for (let s = 0; s < n; s++) {
      const src = activeSrc[s];
      srcX[s] = src.x * scaleX - scaleX * 0.5;
      srcY[s] = src.y * scale - scale * 0.5;
      srcK[s] = (2 * Math.PI) / (LAMBDA * src.wavelength);
      srcPhi[s] = 0;
    }

    for (let j = 0; j < N; j++) {
      const py = (j / N) * scale - scale * 0.5;
      const rowOff = j * N;
      for (let i = 0; i < N; i++) {
        const px = (i / N) * scaleX - scaleX * 0.5;
        let sum = 0;
        for (let s = 0; s < n; s++) {
          const dx = px - srcX[s];
          const dy = py - srcY[s];
          const r = Math.sqrt(dx * dx + dy * dy) + 1e-9;
          sum += Math.cos(srcK[s] * r - t + srcPhi[s]);
        }
        data[rowOff + i] = sum / n;
      }
    }

    for (let i = 0; i < N * N; i++) {
      colormap(Math.max(-1, Math.min(1, data[i])), pixels, i * 4);
    }

    const offCtx = offCanvasRef.current.getContext('2d');
    if (offCtx) {
      offCtx.putImageData(imgData, 0, 0);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(offCanvasRef.current, 0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(194, 101, 157, 0.05)';
    ctx.lineWidth = 1;
    const gs = W / 8;
    for (let i = 1; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gs, 0);
      ctx.lineTo(i * gs, H);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * gs);
      ctx.lineTo(W, i * gs);
      ctx.stroke();
    }

    // Sources
    for (let i = 0; i < sources.length; i++) {
      const s = sources[i];
      if (!s.active) continue;
      const px = s.x * W;
      const py = s.y * H;
      const r = 10;

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#c2659d' : '#8d4e79';
      ctx.fill();
      ctx.strokeStyle = '#0e0f15';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0e0f15';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), px, py);

      if (i === selectedIdx) {
        ctx.beginPath();
        ctx.arc(px, py, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#c2659d';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [sources, selectedIdx]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      resizeCanvas();
      computeAndRender();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    resizeCanvas();
    return () => ro.disconnect();
  }, [resizeCanvas, computeAndRender]);

  useEffect(() => {
    const loop = () => {
      if (!isPlaying) return;
      phaseRef.current += PHASE_SPEED;
      computeAndRender();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, computeAndRender]);

  useEffect(() => {
    if (!isPlaying) computeAndRender();
  }, [isPlaying, computeAndRender, sources, selectedIdx]);

  const getNormPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { nx: 0, ny: 0 };
    const r = canvas.getBoundingClientRect();
    return {
      nx: (clientX - r.left) / r.width,
      ny: (clientY - r.top) / r.height,
    };
  };

  const findHit = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const r = canvas.getBoundingClientRect();
    let hit = -1;
    const hitR = 32;
    sources.forEach((s, i) => {
      const sx = s.x * r.width;
      const sy = s.y * r.height;
      const dx = clientX - r.left - sx;
      const dy = clientY - r.top - sy;
      if (Math.sqrt(dx * dx + dy * dy) < hitR) hit = i;
    });
    return hit;
  };

  const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
    setShowHint(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const hit = findHit(clientX, clientY);
    if (hit >= 0) {
      setSelectedIdx(hit);
      draggingRef.current = hit;
    } else {
      setSelectedIdx(-1);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingRef.current < 0) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const { nx, ny } = getNormPos(clientX, clientY);
    setSources((prev) => {
      const next = [...prev];
      next[draggingRef.current] = {
        ...next[draggingRef.current],
        x: Math.max(0.02, Math.min(0.98, nx)),
        y: Math.max(0.02, Math.min(0.98, ny)),
      };
      return next;
    });
  };

  const handleUp = () => {
    draggingRef.current = -1;
  };

  const toggleSource = (idx: number) => {
    setSources((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], active: !next[idx].active };
      return next;
    });
  };

  const updateWl = (idx: number, val: number) => {
    setSources((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], wavelength: val };
      return next;
    });
  };

  const reset = () => {
    setSources(DEFAULT_SOURCES.map((s) => ({ ...s })));
    setSelectedIdx(-1);
  };

  return (
    <div className="border border-border bg-bg-secondary overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div
          ref={wrapRef}
          className="relative flex-1 aspect-square h-auto sm:h-[400px] lg:h-[520px] flex items-center justify-center bg-bg-primary cursor-crosshair select-none"
          style={{ touchAction: 'none' }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={(e) => {
            handleDown(e);
            // prevent page scroll while dragging sources
            if (draggingRef.current >= 0) e.preventDefault();
          }}
          onTouchMove={(e) => {
            handleMove(e);
            if (draggingRef.current >= 0) e.preventDefault();
          }}
          onTouchEnd={handleUp}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
          {showHint && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/50 backdrop-blur-[2px] z-20 pointer-events-none">
              <div className={`${t.caption} text-text-primary text-center px-4`}>
                <span className="block text-2xl mb-2">↔</span>
                Перетащите источники
                <span className="block text-text-muted mt-1">мышью или пальцем</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-border bg-bg-secondary flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-border">
            <span className={`${t.label} text-text-muted block`}>Управление</span>
          </div>

          <div className={`${s.cardSm} ${s.stack} flex-1 overflow-y-auto`}>
            <div className={`flex ${s.gapSm}`}>
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`flex-1 ${t.caption} py-2 border transition-colors ${
                  isPlaying
                    ? 'border-accent-primary/40 bg-accent-primary/10 text-accent-primary'
                    : 'border-border bg-bg-primary text-text-muted hover:border-accent-secondary/40'
                }`}
              >
                {isPlaying ? '⏸ Пауза' : '▶ Запуск'}
              </button>
              <button
                onClick={reset}
                className={`${t.caption} py-2 px-3 border border-border bg-bg-primary text-text-muted hover:border-accent-secondary/40 transition-colors`}
              >
                Сброс
              </button>
            </div>

            <div className="pt-2 border-t border-border">
              <span className={`${t.label} text-text-muted block mb-3`}>Источники</span>
              <div className={s.stack}>
                {sources.map((source, i) => (
                  <div
                    key={i}
                    className={`${s.cardSm} border transition-colors ${
                      selectedIdx === i
                        ? 'border-accent-primary/40 bg-accent-primary/5'
                        : 'border-border bg-bg-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: i === 0 ? '#c2659d' : '#8d4e79' }}
                      />
                      <span className={`${t.caption} text-text-primary flex-1`}>
                        Источник {i + 1}
                      </span>
                      <input
                        type="checkbox"
                        checked={source.active}
                        onChange={() => toggleSource(i)}
                        className="w-4 h-4 accent-accent-primary"
                      />
                    </div>

                    {source.active && (
                      <div className="flex items-center gap-2 min-w-0">
                        <label
                          className={`${t.label} text-text-muted w-auto shrink-0 whitespace-nowrap`}
                        >
                          <InlineMath tex="\lambda" /> factor
                        </label>
                        <input
                          type="range"
                          min="0.3"
                          max="2.5"
                          step="0.1"
                          value={source.wavelength}
                          onChange={(e) => updateWl(i, +e.target.value)}
                          className="flex-1 min-w-0 accent-accent-primary"
                        />
                        <span className={`${t.label} text-text-primary w-6 text-right`}>
                          {source.wavelength.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
