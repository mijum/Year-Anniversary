import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';

interface LoveLetterSceneProps {
  onContinue: () => void;
}

export const LoveLetterScene: React.FC<LoveLetterSceneProps> = ({ onContinue }) => {
  const { letter, recipientName } = ANNIVERSARY_CONFIG;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Breadcrumb Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>Chapter II</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>A Letter from My Heart</span>
      </motion.div>

      {/* Main Vintage Parchment Letter Container */}
      <div className="my-auto w-full max-w-lg py-1 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-[#faf5ee] p-3.5 sm:p-5 md:p-6 text-[#2c131f] shadow-[0_16px_45px_rgba(20,5,15,0.55),0_0_0_1px_rgba(235,190,195,0.5)] border border-[#ebd5cc]"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 0%, rgba(247, 219, 224, 0.35) 0%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(250, 230, 210, 0.35) 0%, transparent 60%), linear-gradient(to bottom, #fdfaf4, #f8f1e7)`,
          }}
        >
          {/* Decorative Vintage Golden Corners */}
          <div className="pointer-events-none absolute top-2.5 left-2.5 h-4 w-4 border-t-2 border-l-2 border-[#dfb285] rounded-tl-md" />
          <div className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 border-t-2 border-r-2 border-[#dfb285] rounded-tr-md" />
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-[#dfb285] rounded-bl-md" />
          <div className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-[#dfb285] rounded-br-md" />

          {/* Letter Inner Dashed Parchment Border */}
          <div className="pointer-events-none absolute inset-2 sm:inset-2.5 border border-dashed border-[#d8b79a]/40 rounded-xl" />

          {/* Letter Content */}
          <div className="relative z-10 space-y-2 sm:space-y-3">
            {/* Header: Heading & Subtitle */}
            <div className="text-center pb-1.5 border-b border-[#ebd0be]/70">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="inline-flex items-center justify-center mb-0.5"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fcedf1] text-[#9b2c4c] border border-[#e8a2b5]/40 shadow-sm">
                  <Heart className="h-3.5 w-3.5 fill-[#9b2c4c]" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="font-bengali text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#591b2c]"
                style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
              >
                {letter.heading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-0.5 font-bengali text-xs sm:text-sm font-medium text-[#8f495c] tracking-wide"
                style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
              >
                {letter.subtitle}
              </motion.p>
            </div>

            {/* Scrollable Letter Body in Accurate Bengali with responsive height constraint */}
            <div className="custom-scrollbar max-h-[28vh] sm:max-h-[32vh] md:max-h-[36vh] overflow-y-auto pr-1.5 sm:pr-2.5 space-y-2 text-left">
              {letter.paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08, duration: 0.45 }}
                  className={`font-bengali leading-relaxed text-[#351624] ${
                    idx === 0
                      ? 'text-sm sm:text-base font-bold text-[#782038]'
                      : idx === letter.paragraphs.length - 1
                      ? 'text-xs sm:text-sm font-semibold text-[#82223c] pt-0.5'
                      : 'text-xs sm:text-sm font-normal text-[#381a28]/95'
                  }`}
                  style={{
                    fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif',
                    lineHeight: '1.7',
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Sign-Off & Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + letter.paragraphs.length * 0.08 + 0.05 }}
                className="pt-1.5 border-t border-[#ebd0be]/70 text-right space-y-0.5"
              >
                <p
                  className="font-bengali text-xs italic text-[#6e2739]"
                  style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
                >
                  {letter.signOff}
                </p>
                <p
                  className="font-bengali text-xs sm:text-sm font-semibold text-[#862540]"
                  style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
                >
                  {letter.signature}
                </p>
              </motion.div>
            </div>

            {/* Continue Button — Integrated inside card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="pt-1.5 flex justify-center border-t border-[#ebd0be]/60"
            >
              <button
                onClick={onContinue}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2 sm:px-8 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#862540] via-[#ab3958] to-[#741c33] text-[#fff6f4] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(134,37,64,0.45)] hover:shadow-[0_6px_22px_rgba(134,37,64,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
              >
                <span>আমাদের ৩টি স্মৃতি দেখুন</span>
                <span className="text-[#ffd1dc] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.7 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/75 tracking-wider flex items-center gap-1 shrink-0"
      >
        <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
        <span>Dedicated to {recipientName} · 365 Days of Togetherness</span>
        <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
      </motion.div>
    </div>
  );
};
