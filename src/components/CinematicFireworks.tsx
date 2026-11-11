import React, { useEffect, useRef } from 'react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface CinematicFireworksProps {
  active: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sprite: HTMLCanvasElement;
  alpha: number;
  decay: number;
  size: number;
  flickerSpeed: number;
  flickerPhase: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  sprite: HTMLCanvasElement;
  exploded: boolean;
}

const PALETTES = [
  ['#ffd166', '#ffe8a3', '#dfb285'], // Champagne Gold
  ['#f472b6', '#fbcfe8', '#fecdd3'], // Rose Quartz
  ['#dfb285', '#ffd166', '#ffffff'], // Warm Candlelight
  ['#fb7185', '#fda4af', '#fff0f3'], // Coral Blush
  ['#ffe49e', '#ffffff', '#ffd166'], // Golden Willow
];

/**
 * Pre-renders a soft glowing dot once so every frame only needs a cheap
 * drawImage() call instead of an expensive per-particle shadowBlur.
 */
const createGlowSprite = (color: string): HTMLCanvasElement => {
  const size = 32;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const g = sprite.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return sprite;
};

export const CinematicFireworks: React.FC<CinematicFireworksProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cap resolution: rendering at full devicePixelRatio is the main cost on laptops
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      height = canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
    };
    resize();
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) {
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        10,
        width * 0.5,
        height * 0.3,
        width * 0.4
      );
      gradient.addColorStop(0, 'rgba(255, 209, 102, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 209, 102, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      return () => window.removeEventListener('resize', resize);
    }

    // One glow sprite per palette colour
    const spriteCache = new Map<string, HTMLCanvasElement>();
    const getSprite = (color: string) => {
      let s = spriteCache.get(color);
      if (!s) {
        s = createGlowSprite(color);
        spriteCache.set(color, s);
      }
      return s;
    };

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];
    const MAX_SPARKS = 320;

    const createBurst = (originX: number, originY: number, paletteIndex: number) => {
      romanticAudio.playDistantFireworkPop();
      const colors = PALETTES[paletteIndex % PALETTES.length];
      const count = 34;

      for (let i = 0; i < count; i++) {
        if (sparks.length >= MAX_SPARKS) break;
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        const speed = (2.2 + Math.random() * 3.6) * dpr;
        const color = colors[Math.floor(Math.random() * colors.length)];

        sparks.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          sprite: getSprite(color),
          alpha: 1,
          decay: 0.012 + Math.random() * 0.008,
          size: (7 + Math.random() * 7) * dpr,
          flickerSpeed: 0.15 + Math.random() * 0.2,
          flickerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const launchRocket = (targetXPercent: number, targetYPercent: number, paletteIndex: number) => {
      const targetX = width * targetXPercent;
      const targetY = height * targetYPercent;
      const startX = targetX + (Math.random() - 0.5) * 40;
      const startY = height * 0.95;
      const vy = -((startY - targetY) / 36);

      rockets.push({
        x: startX,
        y: startY,
        targetY,
        vy,
        sprite: getSprite(PALETTES[paletteIndex % PALETTES.length][0]),
        exploded: false,
      });
    };

    const schedule = [
      { delay: 150, x: 0.22, y: 0.22, palette: 0 },
      { delay: 950, x: 0.78, y: 0.26, palette: 1 },
      { delay: 1900, x: 0.64, y: 0.18, palette: 2 },
      { delay: 2850, x: 0.35, y: 0.17, palette: 3 },
      { delay: 3900, x: 0.5, y: 0.19, palette: 4 }, // Grand center golden peony
      { delay: 5100, x: 0.82, y: 0.2, palette: 0 },
    ];

    const timers: number[] = [];
    schedule.forEach((s) => {
      timers.push(
        window.setTimeout(() => launchRocket(s.x, s.y, s.palette), s.delay)
      );
    });

    let running = true;
    let animationFrameId = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!running) return;

      // Delta-time keeps motion identical on 60Hz / 120Hz and absorbs dropped frames
      const delta = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      // Soft trail fade
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.35, 0.15 * delta)})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 1;

      // Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * delta;

        const headSize = 14 * dpr;
        ctx.drawImage(r.sprite, r.x - headSize / 2, r.y - headSize / 2, headSize, headSize);
        const tailSize = 8 * dpr;
        ctx.globalAlpha = 0.6;
        ctx.drawImage(
          r.sprite,
          r.x - tailSize / 2,
          r.y - r.vy * 0.8 - tailSize / 2,
          tailSize,
          tailSize
        );
        ctx.globalAlpha = 1;

        if (r.y <= r.targetY && !r.exploded) {
          r.exploded = true;
          createBurst(r.x, r.y, i % PALETTES.length);
          rockets.splice(i, 1);
        }
      }

      // Sparks
      const drag = Math.pow(0.965, delta);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.vx *= drag;
        s.vy *= drag;
        s.vy += 0.045 * dpr * delta;
        s.alpha -= s.decay * delta;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        s.flickerPhase += s.flickerSpeed * delta;
        ctx.globalAlpha = Math.max(0, s.alpha * (0.8 + 0.2 * Math.sin(s.flickerPhase)));
        ctx.drawImage(s.sprite, s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!running) {
        running = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      timers.forEach((t) => clearTimeout(t));
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};
