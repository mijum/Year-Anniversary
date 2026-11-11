import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, X, Check } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { SpecialReason } from '../types/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface SpecialReasonsSceneProps {
  onContinue: () => void;
}

export const SpecialReasonsScene: React.FC<SpecialReasonsSceneProps> = ({ onContinue }) => {
  const { specialReasons, recipientName } = ANNIVERSARY_CONFIG;
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<SpecialReason | null>(null);

  const handleOpenHeart = (reason: SpecialReason) => {
    romanticAudio.playHeartNoteSound();
    if (!openedIds.includes(reason.id)) {
      setOpenedIds((prev) => [...prev, reason.id]);
    }
    setSelectedReason(reason);
  };

  const allOpened = openedIds.length === specialReasons.length;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Breadcrumb Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>Chapter IV</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>Why You're Special</span>
      </motion.div>

      {/* Main Content Area */}
      <div className="my-auto w-full max-w-2xl py-1 flex flex-col items-center shrink-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-0.5 mb-2 sm:mb-3"
        >
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#351224]/70 border border-[#e8a2b5]/30 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#dfb285] backdrop-blur-sm">
            <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
            <span>Little Origami Love Notes</span>
            <Sparkles className="h-2.5 w-2.5 text-[#dfb285]" />
          </div>

          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#fce8ee]">
            Why You Are So Precious to Me ♡
          </h2>

          <p className="font-serif italic text-[11px] sm:text-xs text-[#e8b5c4] max-w-sm mx-auto">
            A keepsake jar of folded paper hearts. Tap each one to unfold an appreciation written for you, {recipientName}.
          </p>

          {/* Discovery Progress Meter */}
          <div className="pt-0.5 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#dfb285]">
            <span>{openedIds.length} of {specialReasons.length} unfolded</span>
            <div className="h-1.5 w-20 bg-[#3d152a] rounded-full overflow-hidden border border-[#e8a2b5]/30">
              <div
                className="h-full bg-gradient-to-r from-[#dfb285] to-[#f48fb1] transition-all duration-500 rounded-full"
                style={{ width: `${(openedIds.length / specialReasons.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* 6 Folded Origami Heart Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-xl px-1">
          {specialReasons.map((reason, index) => {
            const isOpened = openedIds.includes(reason.id);

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.45 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenHeart(reason)}
                className={`group relative cursor-pointer rounded-xl p-2.5 sm:p-3 text-left border transition-all duration-300 shadow-md ${
                  isOpened
                    ? 'bg-[#faf5ee]/95 border-[#e8ccd3] text-[#331422] shadow-[0_6px_20px_rgba(30,5,18,0.2)]'
                    : 'bg-[#2b0f1e]/85 border-[#e8a2b5]/25 text-[#fbebf0] hover:border-[#dfb285]/60 hover:bg-[#381427]'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Unfold note about ${reason.title}`}
              >
                {/* Subtle Glow Aura */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm"
                  style={{ backgroundColor: reason.color }}
                />

                {/* Card Header / Folded Origami Heart Emblem */}
                <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-[#e8a2b5]/20">
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${reason.foldedHue}`}
                  >
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white fill-white" />
                  </div>

                  {isOpened ? (
                    <div className="flex items-center gap-0.5 text-[9px] font-sans font-medium text-[#7a2039] bg-[#fcedf1] px-1.5 py-0.5 rounded-full border border-[#e8a2b5]/40">
                      <Check className="h-2 w-2" />
                      <span>Read</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-sans tracking-wider uppercase text-[#dfb285]">
                      Open
                    </span>
                  )}
                </div>

                {/* Card Title & Snippet */}
                <div className="relative z-10 pt-1.5">
                  <h3
                    className={`font-serif text-xs sm:text-sm font-semibold tracking-wide truncate ${
                      isOpened ? 'text-[#4e1526]' : 'text-[#fce8ee]'
                    }`}
                  >
                    {reason.title}
                  </h3>

                  <p
                    className={`mt-0.5 font-serif text-[10px] sm:text-[11px] line-clamp-1 italic ${
                      isOpened ? 'text-[#6b2c3d]' : 'text-[#e8b5c4]'
                    }`}
                  >
                    "{reason.message}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-3 sm:mt-4 flex flex-col items-center space-y-1.5 shrink-0"
        >
          <p className="font-serif text-[11px] sm:text-xs text-[#f2cad6] italic">
            {allOpened
              ? 'Every piece of my heart belongs to you.'
              : 'Feel free to read them all or continue to our timeline...'}
          </p>

          <button
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>Our 365 Days Timeline</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Expanded Modal for Reading an Individual Unfolded Love Note */}
      <AnimatePresence>
        {selectedReason && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedReason(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-sm w-full rounded-2xl bg-[#fdfaf3] p-5 sm:p-6 text-[#2c131f] shadow-2xl border border-[#ebd5cc]"
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, rgba(247, 219, 224, 0.4) 0%, transparent 60%), linear-gradient(to bottom, #fffaf5, #f8f1e7)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedReason(null)}
                className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a1c2d]/10 hover:bg-[#4a1c2d]/20 text-[#4a1c2d] transition-colors"
                aria-label="Close note"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="text-center space-y-2.5">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-md bg-gradient-to-br ${selectedReason.foldedHue}`}
                >
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8f495c] font-semibold">
                    Unfolded Note for {recipientName}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#591b2c]">
                    {selectedReason.title}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-[#ecd5dc] text-left">
                  <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#3a1d29] italic">
                    "{selectedReason.message}"
                  </p>
                </div>

                <div className="pt-0.5 flex justify-center">
                  <button
                    onClick={() => setSelectedReason(null)}
                    className="px-5 py-1.5 rounded-full bg-[#4a1628] text-white text-xs font-sans font-medium hover:bg-[#601c34] transition-colors"
                  >
                    Keep in My Heart ♡
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiet Bottom Kicker */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.6 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/70 tracking-wider shrink-0"
      >
        Every reason is a reminder of why 365 days felt like a dream
      </motion.p>
    </div>
  );
};
