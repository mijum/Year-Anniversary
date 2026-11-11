import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface WelcomeSceneProps {
  onContinue: () => void;
  onUserInteraction: () => void;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({
  onContinue,
  onUserInteraction,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    onUserInteraction();
    setIsOpening(true);
    romanticAudio.playEnvelopeOpenSound();

    setTimeout(() => {
      onContinue();
    }, 850);
  };

  return (
    <div
      onClick={onUserInteraction}
      className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col items-center justify-between px-3 pt-12 pb-2 sm:pt-14 sm:pb-3 text-center select-none overflow-hidden"
    >
      {/* Top Editorial Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>অধ্যায় ০১</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>{ANNIVERSARY_CONFIG.recipientName}-এর জন্য একটি মিষ্টি সারপ্রাইজ</span>
      </motion.div>

      {/* Main Centerpiece: Message + Floating Animated Envelope */}
      <div className="flex w-full max-w-sm flex-col items-center space-y-2 sm:space-y-3 my-auto shrink-0">
        {/* Intro Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-0.5"
        >
          <div className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#dfb285]">
            <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
            <span>একটি বিশেষ চিঠি</span>
            <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
          </div>
          <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-[#fdf0f4] text-balance max-w-xs mx-auto leading-snug">
            {ANNIVERSARY_CONFIG.welcomeMessage}
          </h1>
        </motion.div>

        {/* Floating Animated Sealed Envelope — Scaled to 100% fit on short laptop screens */}
        <motion.div
          animate={
            !isOpening
              ? {
                  y: [0, -4, 0],
                  rotate: [-0.3, 0.4, -0.3],
                }
              : {
                  scale: [1, 1.04, 0.96],
                }
          }
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative h-[22vh] min-h-[115px] max-h-[160px] aspect-[16/11] cursor-pointer shrink-0"
          onClick={handleOpenSurprise}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenSurprise();
            }
          }}
          aria-label="চিঠি খুলুন"
        >
          {/* Subtle Outer Glow Halo */}
          <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-[#dfb285]/20 via-[#d67d8a]/25 to-[#dfb285]/20 blur-md opacity-70" />

          {/* Envelope Body Container */}
          <div className="relative h-full w-full rounded-xl sm:rounded-2xl bg-[#faf5ee] shadow-[0_12px_32px_rgba(20,5,15,0.55),0_0_0_1px_rgba(235,190,195,0.4)] overflow-hidden border border-[#ead8dc] transition-transform duration-300 hover:scale-[1.02]">
            {/* Elegant Flatlay Envelope Texture */}
            <img
              src="/letter.jpg"
              alt="একটি সুন্দর খাম"
              className={`h-full w-full object-cover transition-all duration-700 ${
                isOpening ? 'scale-110 filter blur-[1px] opacity-75' : 'scale-100'
              }`}
            />

            {/* Tinted Warm Scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#200814]/75 via-transparent to-[#200814]/30" />

            {/* Letter Paper Sliding Out Animation on Open */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: -8, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-3 top-3 bottom-3 rounded-lg bg-[#fdfaf4] shadow-2xl p-3 border border-[#e5ccd3] flex flex-col justify-center space-y-1.5 z-30"
                >
                  <div className="h-2 w-20 bg-[#94314e]/40 rounded-full mx-auto" />
                  <div className="h-1.5 w-full bg-[#94314e]/20 rounded-full" />
                  <div className="h-1.5 w-5/6 bg-[#94314e]/20 rounded-full mx-auto" />
                  <div className="h-1.5 w-4/6 bg-[#94314e]/20 rounded-full mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Heart Wax Seal (Centered) */}
            {!isOpening && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#dfb285] via-[#d67d8a] to-[#862540] shadow-[0_3px_15px_rgba(214,125,138,0.7),inset_0_2px_3px_rgba(255,255,255,0.5)] border-2 border-[#fff0f4]"
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-[#fff0f4] fill-[#fff0f4]" />

                  {/* Pulsing Aura */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#ffe4eb]"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                <span className="mt-1 text-[9px] sm:text-[10px] font-sans font-semibold tracking-widest uppercase text-[#fff0f4] bg-[#220712]/85 px-2.5 py-0.5 rounded-full border border-[#e8a2b5]/40 shadow-md backdrop-blur-sm">
                  ট্যাপ করে খোলো
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Primary Action Button — 100% visible, perfectly scaled */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-0.5 shrink-0"
        >
          <button
            onClick={handleOpenSurprise}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 min-h-[42px] sm:min-h-[46px] min-w-[200px] sm:min-w-[220px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>{isOpening ? 'চিঠিটি খোলা হচ্ছে...' : ANNIVERSARY_CONFIG.welcomeButtonText}</span>
            {!isOpening && (
              <Heart className="h-3.5 w-3.5 text-[#ffd1dc] fill-[#ffd1dc] group-hover:scale-110 transition-transform" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Quiet Bottom Attribution */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.4 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/70 tracking-wider shrink-0"
      >
        হৃদয়ের গভীর ভালোবাসা দিয়ে তৈরি আমাদের ১ম বার্ষিকীর গল্প
      </motion.p>
    </div>
  );
};
