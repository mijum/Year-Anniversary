import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const GlowingParticles: React.FC<{ count?: number }> = ({ count = 28 }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3.5 + 1.5,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size * 3}px`,
            height: `${p.size * 3}px`,
            // Radial-gradient glow instead of box-shadow: far cheaper to composite
            background:
              'radial-gradient(circle, rgba(255,232,214,0.95) 0%, rgba(255,220,195,0.45) 30%, rgba(255,220,195,0) 70%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 24, 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
