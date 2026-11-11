import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Star, X } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface FinalSurpriseSceneProps {
  onRestart: () => void;
}

export const FinalSurpriseScene: React.FC<FinalSurpriseSceneProps> = ({ onRestart }) => {
  const { final, letter, recipientName } = ANNIVERSARY_CONFIG;
  const [showSecretNote, setShowSecretNote] = useState<boolean>(false);

  const handleRestartExperience = () => {
    romanticAudio.playSparkleSound();
    onRestart();
  };

  const handleOpenSecret = () => {
    romanticAudio.playSparkleSound();
    setShowSecretNote(true);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Editorial Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-[#e5a4b4]/90 shrink-0"
      >
        <span>অধ্যায় ০৯</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>চিরদিনের সূচনা</span>
      </motion.div>

      {/* Main Night Sky Romantic Message Container */}
      <div className="my-auto flex w-full max-w-lg flex-col items-center space-y-2.5 sm:space-y-3.5 py-1 text-center shrink-0">
        {/* Dreamy Final Animated Heart */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-gradient-to-tr from-[#521327] via-[#94314e] to-[#dfb285]/70 border border-[#f5c7d2]/50 shadow-[0_0_40px_rgba(214,125,138,0.45)]"
        >
          {/* Beating Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-7 w-7 sm:h-9 sm:w-9 text-[#fff0f4] fill-[#fff0f4]" />
          </motion.div>

          {/* Ethereal Halo Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#ffe0e8]"
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0.1, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-1.5 rounded-full border border-[#dfb285]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* The Two Main Story Messages */}
        <div className="space-y-1.5 px-2">
          {/* Message 1: "This is only the first chapter of our story..." */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif italic text-base sm:text-lg md:text-xl text-[#f5d7df] tracking-wide max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            "{final.message1}"
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center justify-center gap-2 py-0.5"
          >
            <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#dfb285]" />
            <Sparkles className="h-3 w-3 text-[#dfb285]" />
            <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#dfb285]" />
          </motion.div>

          {/* Message 2: "Forever to go, my love. ❤️" */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#ffffff] via-[#ffe3ea] to-[#dfb285] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {final.message2}
          </motion.h2>

          {/* Customizable Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="font-bengali text-sm sm:text-base text-[#dfb285] font-semibold pt-0.5"
            style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
          >
            {letter.signature}
          </motion.p>
        </div>

        {/* Action Buttons: Replay & Secret Easter Egg */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 shrink-0"
        >
          {/* Secret Easter Egg Starlight Note Button */}
          <button
            onClick={handleOpenSecret}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#391425]/80 text-[#fdeef2] border border-[#e2a8b8]/40 hover:bg-[#4d1a32] hover:border-[#dfb285] text-xs font-sans font-medium transition-all cursor-pointer backdrop-blur-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <Star className="h-3 w-3 text-[#dfb285] fill-[#dfb285]" />
            <span>গোপন তারার চিঠি ✨</span>
          </button>

          {/* Replay Button */}
          <button
            onClick={handleRestartExperience}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:-rotate-90 transition-transform" />
            <span>{final.replayButtonText}</span>
          </button>
        </motion.div>
      </div>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {showSecretNote && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md"
            onClick={() => setShowSecretNote(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-sm w-full rounded-2xl bg-[#fdfaf3] p-5 sm:p-6 text-[#2c131f] shadow-2xl border border-[#ebd5cc] text-center"
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, rgba(247, 219, 224, 0.45) 0%, transparent 60%), linear-gradient(to bottom, #fffaf5, #f8f1e7)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSecretNote(false)}
                className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a1c2d]/10 hover:bg-[#4a1c2d]/20 text-[#4a1c2d] transition-colors"
                aria-label="চিঠি বন্ধ করুন"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="space-y-2.5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#dfb285]/20 border border-[#dfb285]/50">
                  <Star className="h-5 w-5 text-[#dfb285] fill-[#dfb285]" />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8f495c] font-semibold">
                    একটি গোপন তারার বার্তা
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#591b2c]">
                    আমার প্রিয়তম {recipientName}-এর জন্য
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-[#ecd5dc] text-left">
                  <p
                    className="font-serif italic text-xs sm:text-sm leading-relaxed text-[#3a1d29]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    "{final.easterEggNote}"
                  </p>
                </div>

                <button
                  onClick={() => setShowSecretNote(false)}
                  className="px-5 py-1.5 rounded-full bg-[#4a1628] text-white text-xs font-sans font-medium hover:bg-[#601c34] transition-colors"
                >
                  মিষ্টি হাসিমুখে বন্ধ করো ♡
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiet Bottom Kicker */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.8 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/75 tracking-wider shrink-0"
      >
        শুভ ১ম বার্ষিকী, {recipientName} ♡ চিরকাল ও সবসময়
      </motion.p>
    </div>
  );
};
