import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, X, Check } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { OpenWhenLetter } from '../types/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface OpenWhenSceneProps {
  onContinue: () => void;
}

export const OpenWhenScene: React.FC<OpenWhenSceneProps> = ({ onContinue }) => {
  const { openWhenLetters, recipientName } = ANNIVERSARY_CONFIG;
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    romanticAudio.playEnvelopeOpenSound();
    if (!openedIds.includes(letter.id)) {
      setOpenedIds((prev) => [...prev, letter.id]);
    }
    setSelectedLetter(letter);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Breadcrumb Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>Chapter VII</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>Open When You Need Love</span>
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
            <Mail className="h-2.5 w-2.5 text-[#dfb285]" />
            <span>Digital Keepsake Letters</span>
            <Mail className="h-2.5 w-2.5 text-[#dfb285]" />
          </div>

          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#fce8ee]">
            Open When You Need Love 📬
          </h2>

          <p className="font-serif italic text-[11px] sm:text-xs text-[#e8b5c4] max-w-sm mx-auto">
            Letters to keep close to your heart, ready to bring you solace and reassurance, {recipientName}.
          </p>

          <div className="pt-0.5 text-[10px] sm:text-[11px] font-mono text-[#dfb285]">
            <span>{openedIds.length} of {openWhenLetters.length} envelopes opened</span>
          </div>
        </motion.div>

        {/* 5 Digital Envelopes List/Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-xl px-1">
          {openWhenLetters.map((letter, index) => {
            const isOpened = openedIds.includes(letter.id);

            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.45 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenLetter(letter)}
                className={`group relative cursor-pointer rounded-xl p-2.5 sm:p-3 text-left border transition-all duration-300 shadow-md ${
                  isOpened
                    ? 'bg-[#faf5ee]/95 border-[#e8ccd3] text-[#331422] shadow-[0_6px_20px_rgba(30,5,18,0.25)]'
                    : 'bg-[#2b0f1e]/85 border-[#e8a2b5]/25 text-[#fbebf0] hover:border-[#dfb285]/60 hover:bg-[#381427]'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Open letter: ${letter.title}`}
              >
                {/* Envelope Seal Accent */}
                <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-[#e8a2b5]/20">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#591b2c]/30 border border-[#e8a2b5]/30">
                      <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#dfb285]" />
                    </div>
                    <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#dfb285] truncate max-w-[80px]">
                      {letter.badge}
                    </span>
                  </div>

                  {isOpened ? (
                    <div className="flex items-center gap-0.5 text-[9px] font-sans font-medium text-[#7a2039] bg-[#fcedf1] px-1.5 py-0.5 rounded-full border border-[#e8a2b5]/40">
                      <Check className="h-2 w-2" />
                      <span>Read</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-sans tracking-widest uppercase text-[#e8b5c4]">
                      Sealed
                    </span>
                  )}
                </div>

                <div className="relative z-10 pt-1.5 space-y-0.5">
                  <h3
                    className={`font-serif text-xs sm:text-sm font-semibold tracking-wide truncate ${
                      isOpened ? 'text-[#4e1526]' : 'text-[#fce8ee]'
                    }`}
                  >
                    {letter.title}
                  </h3>

                  <p
                    className="font-bengali text-[10px] sm:text-[11px] text-[#d897aa] italic truncate"
                    style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
                  >
                    {letter.bengaliPrompt}
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
            Now, let's step into our grand 1st anniversary celebration!
          </p>

          <button
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>Our 1 Year Celebration 🎉</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Expanded Modal for Reading an Open-When Letter */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-md w-full rounded-2xl bg-[#fdfaf3] p-5 sm:p-6 text-[#2c131f] shadow-2xl border border-[#ebd5cc]"
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, rgba(247, 219, 224, 0.4) 0%, transparent 60%), linear-gradient(to bottom, #fffaf5, #f8f1e7)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a1c2d]/10 hover:bg-[#4a1c2d]/20 text-[#4a1c2d] transition-colors"
                aria-label="Close letter"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="space-y-2.5">
                <div className="text-center pb-2 border-b border-[#ebd0be]/70">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#8f495c] font-semibold">
                    {selectedLetter.badge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#591b2c] mt-0.5">
                    {selectedLetter.title}
                  </h3>
                  <p
                    className="font-bengali text-xs text-[#8f495c] italic mt-0.5"
                    style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif' }}
                  >
                    {selectedLetter.bengaliPrompt}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 border border-[#ecd5dc] text-left space-y-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
                  <p
                    className="font-bengali text-sm sm:text-base leading-relaxed text-[#3a1d29] font-medium"
                    style={{ fontFamily: '"Noto Serif Bengali", "Hind Siliguri", serif', lineHeight: '1.75' }}
                  >
                    "{selectedLetter.bengaliMessage}"
                  </p>

                  <p className="font-serif text-xs text-[#78283d] italic border-t border-[#ebd0be]/60 pt-2">
                    "{selectedLetter.englishMessage}"
                  </p>
                </div>

                <div className="pt-0.5 flex justify-center">
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="px-5 py-1.5 rounded-full bg-[#4a1628] text-white text-xs font-sans font-medium hover:bg-[#601c34] transition-colors"
                  >
                    Fold & Keep Safe ♡
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
        Always here for you, in every joy and every sorrow
      </motion.p>
    </div>
  );
};
