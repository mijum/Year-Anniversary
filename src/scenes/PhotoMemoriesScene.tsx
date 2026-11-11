import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, ZoomIn, ArrowRight } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { PhotographItem } from '../types/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface PhotoMemoriesSceneProps {
  onContinue: () => void;
}

export const PhotoMemoriesScene: React.FC<PhotoMemoriesSceneProps> = ({ onContinue }) => {
  const { photographs } = ANNIVERSARY_CONFIG;
  const [selectedPhoto, setSelectedPhoto] = useState<PhotographItem | null>(null);

  const handleOpenPhoto = (photo: PhotographItem) => {
    romanticAudio.playSparkleSound();
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Editorial Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>অধ্যায় ০৩</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>সুন্দর কিছু স্মৃতি</span>
      </motion.div>

      {/* Main Photographic Scrapbook Presentation */}
      <div className="my-auto w-full max-w-3xl py-1 flex flex-col items-center shrink-0">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-0.5 mb-2 sm:mb-3"
        >
          <div className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#dfb285]">
            <Sparkles className="h-2.5 w-2.5" />
            <span>প্রিয় মুহূর্তসমূহ</span>
            <Sparkles className="h-2.5 w-2.5" />
          </div>
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#fce8ee]">
            তিনটি অমূল্য স্মৃতিচ্ছবি ♡
          </h2>
          <p className="font-serif italic text-[11px] sm:text-xs text-[#e8b5c4] max-w-sm mx-auto">
            আমাদের প্রথম বছরের ভালোবাসায় ঘেরা স্মরণীয় কিছু সুন্দর মুহূর্ত।
          </p>
        </motion.div>

        {/* 3 Polaroids Scrapbook Layout (Responsive side-by-side or stacked on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-2xl px-1">
          {photographs.map((photo, index) => {
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15, rotate: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: photo.rotation,
                }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 20,
                  transition: { duration: 0.2 },
                }}
                className="group relative cursor-pointer"
                onClick={() => handleOpenPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenPhoto(photo);
                  }
                }}
                aria-label={`ছবি দেখুন: ${photo.label}`}
              >
                {/* Washi Tape Accent at Top of Polaroid */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-3.5 bg-[#dfb285]/60 backdrop-blur-sm rounded-sm shadow-sm rotate-[-2deg] border border-[#f5d9c2]/40" />

                {/* Classic Polaroid Frame */}
                <div className="relative rounded-xl sm:rounded-2xl bg-[#faf5ee] p-2 sm:p-2.5 pb-3 sm:pb-3.5 shadow-[0_10px_26px_rgba(10,2,8,0.45),0_0_0_1px_rgba(255,255,255,0.25)] border border-[#ebd8d0] transition-shadow duration-300 group-hover:shadow-[0_14px_32px_rgba(182,75,103,0.35)]">
                  {/* Photo Container with responsive height limit */}
                  <div className="relative aspect-[4/3] w-full max-h-[125px] sm:max-h-[145px] overflow-hidden rounded-lg bg-[#2a0e1b]">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      loading="eager"
                      onError={(e) => {
                        if (photo.fallbackSrc && (e.currentTarget.src !== photo.fallbackSrc)) {
                          e.currentTarget.src = photo.fallbackSrc;
                        }
                      }}
                      style={{ objectPosition: photo.objectPosition ?? '50% 35%' }}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Subtle warm photo overlay gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

                    {/* Hover Zoom Icon Badge */}
                    <div className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-[#fff0f4] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Polaroid Handwritten Label */}
                  <div className="mt-1.5 flex items-center justify-between px-0.5">
                    <span className="font-serif italic text-xs sm:text-sm font-medium text-[#4a1828] tracking-wide">
                      {photo.label}
                    </span>
                    <Heart className="h-3 w-3 text-[#d67d8a] fill-[#d67d8a]/40 group-hover:scale-115 transition-transform" />
                  </div>
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
            পরবর্তী: তুমি কেন আমার জীবনে এত বিশেষ ও প্রিয়...
          </p>
          <button
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>তুমি কেন এত বিশেষ 💖</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Lightbox Modal for High-Resolution Photo Viewing */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-lg w-full rounded-2xl bg-[#faf5ee] p-3.5 sm:p-4 shadow-2xl text-[#3a1d29] border border-[#ebd8d0]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="ছবি বন্ধ করুন"
                className="absolute top-2.5 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a1c2d]/10 hover:bg-[#4a1c2d]/25 text-[#4a1c2d] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="relative flex h-[58vh] w-full items-center justify-center overflow-hidden rounded-xl bg-[#2a0e1b] shadow-inner mb-2.5">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.label}
                  onError={(e) => {
                    if (selectedPhoto.fallbackSrc && (e.currentTarget.src !== selectedPhoto.fallbackSrc)) {
                      e.currentTarget.src = selectedPhoto.fallbackSrc;
                    }
                  }}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#541629]">
                    {selectedPhoto.label}
                  </h3>
                  <p className="font-serif italic text-[11px] text-[#823247]">
                    সময়ের ফ্রেমে বন্দি সুন্দর এক মুহূর্ত
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-sans text-[#9b3a52] bg-[#fcedf1] px-2 py-0.5 rounded-full border border-[#e8a2b5]/30">
                  <Heart className="h-2.5 w-2.5 fill-[#9b3a52]" />
                  <span>{ANNIVERSARY_CONFIG.recipientName} ❤️</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiet Bottom Kicker */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/70 tracking-wider shrink-0"
      >
        সম্পূর্ণ ছবিটি দেখতে যেকোনো স্মৃতিতে ট্যাপ করুন
      </motion.p>
    </div>
  );
};
