import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';
import { CinematicFireworks } from '../components/CinematicFireworks';

interface AnniversaryRevealSceneProps {
  onContinue: () => void;
}

export const AnniversaryRevealScene: React.FC<AnniversaryRevealSceneProps> = ({
  onContinue,
}) => {
  const { reveal, recipientName } = ANNIVERSARY_CONFIG;

  const triggerLuxuryConfetti = () => {
    romanticAudio.playCelebrationChime();

    // useWorker renders confetti in an OffscreenCanvas worker so the main thread stays smooth
    const base = { useWorker: true, disableForReducedMotion: true, ticks: 160, gravity: 0.9 };

    // Side cannon 1 (Left)
    confetti({
      ...base,
      particleCount: 28,
      angle: 60,
      spread: 50,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#dfb285', '#ffd166', '#f472b6', '#fff0f4', '#94314e'],
    });

    // Side cannon 2 (Right) — staggered one frame-burst later to avoid a main-thread spike
    setTimeout(() => {
      confetti({
        ...base,
        particleCount: 28,
        angle: 120,
        spread: 50,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#dfb285', '#ffd166', '#f472b6', '#fff0f4', '#94314e'],
      });
    }, 120);

    // Center luxury cascade
    setTimeout(() => {
      confetti({
        ...base,
        particleCount: 40,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#dfb285', '#ffe8a3', '#ffccd8', '#ffffff'],
      });
    }, 400);
  };

  useEffect(() => {
    triggerLuxuryConfetti();
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Background Cinematic Fireworks Canvas */}
      <CinematicFireworks active={true} />

      {/* Top Editorial Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-[#e5a4b4]/90 shrink-0"
      >
        <span>Chapter VIII</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>Our First Anniversary</span>
      </motion.div>

      {/* Main Centerpiece Celebration Block */}
      <div className="relative z-10 my-auto flex w-full max-w-xl flex-col items-center space-y-2.5 sm:space-y-3.5 py-1 text-center shrink-0">
        {/* Animated Glowing Heart Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-gradient-to-br from-[#dfb285] via-[#d67d8a] to-[#741c33] shadow-[0_0_35px_rgba(223,178,133,0.55)] border-2 border-[#fff0f4]"
        >
          {/* Beating Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.18, 1] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="h-7 w-7 sm:h-9 sm:w-9 text-[#fff0f4] fill-[#fff0f4]" />
          </motion.div>

          {/* Golden Pulse Halo 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#ffe5a3]"
            animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Golden Pulse Halo 2 */}
          <motion.div
            className="absolute -inset-1.5 rounded-full border border-[#f5b8c7]"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Grand Centerpiece: "1 YEAR" in Luxury Gold Typography */}
        <div className="space-y-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            {/* Static soft glow behind the gradient text (cheap radial gradient, not a filter) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(223,178,133,0.28) 0%, rgba(223,178,133,0) 65%)',
              }}
              aria-hidden="true"
            />
            <h1
              className="relative font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-[#fff3d4] via-[#dfb285] to-[#c5844e] bg-clip-text text-transparent"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {reveal.centerpiece}
            </h1>

            {/* Sparkle Badges around Centerpiece */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-4 text-[#ffd166]"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-1 -left-4 text-[#ffd166]"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* Supporting Text: "365 days of love, memories & togetherness ❤️" */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-serif text-base sm:text-xl md:text-2xl font-medium tracking-wide text-[#ffeef3] max-w-md mx-auto leading-snug"
          >
            {reveal.supportingText}
          </motion.p>

          {/* Subtle Elegance Descriptor */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-serif italic text-xs sm:text-sm text-[#e8b5c4] max-w-sm mx-auto pt-0.5"
          >
            {reveal.subtext}
          </motion.p>
        </div>

        {/* Interactive Actions: Re-sparkle Confetti + Continue to Final Scene */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1.5 shrink-0"
        >
          {/* Confetti Trigger Button */}
          <button
            onClick={triggerLuxuryConfetti}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#391425] text-[#fdeef2] border border-[#e2a8b8]/40 hover:bg-[#4d1a32] hover:border-[#f3c2ce]/60 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#dfb285]" />
            <span>Celebrate Again 🎉</span>
          </button>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>Our Final Chapter</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Quiet Bottom Kicker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/75 tracking-wider shrink-0"
      >
        <span>One Year Down · A Lifetime Together with {recipientName}</span>
      </motion.div>
    </div>
  );
};
