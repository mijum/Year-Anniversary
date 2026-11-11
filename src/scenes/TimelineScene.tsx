import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../config/anniversary';
import { romanticAudio } from '../utils/audioSynthesizer';

interface TimelineSceneProps {
  onContinue: () => void;
}

export const TimelineScene: React.FC<TimelineSceneProps> = ({ onContinue }) => {
  const { timelineMilestones, recipientName } = ANNIVERSARY_CONFIG;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSelectMilestone = (index: number) => {
    romanticAudio.playSparkleSound();
    setActiveIndex(index);
  };

  const activeMilestone = timelineMilestones[activeIndex];

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between px-3 sm:px-6 pt-12 pb-2 sm:pt-14 sm:pb-3 select-none overflow-y-auto">
      {/* Top Breadcrumb Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#e5a4b4]/85 shrink-0"
      >
        <span>Chapter V</span>
        <span aria-hidden="true" className="text-[#dfb285]">·</span>
        <span>365 Days Together</span>
      </motion.div>

      {/* Main Content Area */}
      <div className="my-auto w-full max-w-3xl py-1 flex flex-col items-center shrink-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-0.5 mb-2 sm:mb-3"
        >
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#351224]/70 border border-[#e8a2b5]/30 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#dfb285] backdrop-blur-sm">
            <Star className="h-2.5 w-2.5 text-[#dfb285] fill-[#dfb285]" />
            <span>Our Celestial Starmap</span>
            <Star className="h-2.5 w-2.5 text-[#dfb285] fill-[#dfb285]" />
          </div>

          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#fce8ee]">
            Our First 365 Days Across the Stars ✨
          </h2>

          <p className="font-serif italic text-[11px] sm:text-xs text-[#e8b5c4] max-w-sm mx-auto">
            From our quiet beginning to this milestone moment. Tap each node to journey through our first year.
          </p>
        </motion.div>

        {/* Milestone Node Track (Constellation Bar) */}
        <div className="w-full max-w-lg px-2 mb-2 sm:mb-3">
          <div className="relative flex items-center justify-between">
            {/* Background Constellation Line */}
            <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#dfb285]/20 via-[#f48fb1]/40 to-[#dfb285]/20" />

            {timelineMilestones.map((milestone, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={milestone.id}
                  onClick={() => handleSelectMilestone(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285] rounded-full"
                  aria-label={`Select ${milestone.period}`}
                >
                  <motion.div
                    animate={
                      isActive
                        ? { scale: [1, 1.2, 1], boxShadow: '0 0 16px rgba(223,178,133,0.8)' }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#dfb285] to-[#f48fb1] border-[#fff0f4] text-[#2c0f1c] shadow-md'
                        : 'bg-[#280c1b] border-[#e8a2b5]/30 text-[#e8b5c4] hover:border-[#dfb285]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{milestone.icon}</span>
                  </motion.div>

                  <span
                    className={`mt-1 text-[9px] sm:text-[10px] font-sans tracking-wider whitespace-nowrap transition-colors ${
                      isActive ? 'text-[#dfb285] font-semibold' : 'text-[#e8b5c4]/70 group-hover:text-white'
                    }`}
                  >
                    {milestone.period.split('·')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Highlight Card */}
        <div className="w-full max-w-lg px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl bg-[#faf5ee] p-3.5 sm:p-5 text-[#2c131f] shadow-[0_12px_32px_rgba(20,5,15,0.4)] border border-[#ebd5cc] text-left"
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0%, rgba(247, 219, 224, 0.35) 0%, transparent 60%), linear-gradient(to bottom, #fffaf5, #f8f1e7)`,
              }}
            >
              {/* Golden Corner Accents */}
              <div className="pointer-events-none absolute top-2.5 left-2.5 h-4 w-4 border-t-2 border-l-2 border-[#dfb285] rounded-tl-md" />
              <div className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 border-t-2 border-r-2 border-[#dfb285] rounded-tr-md" />
              <div className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-[#dfb285] rounded-bl-md" />
              <div className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-[#dfb285] rounded-br-md" />

              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#ebd0be]/70">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase text-[#8f495c]">
                    <Calendar className="h-3.5 w-3.5 text-[#dfb285]" />
                    <span>{activeMilestone.period}</span>
                  </div>

                  <span className="text-[10px] font-mono text-[#dfb285] bg-[#3a1325] px-2 py-0.5 rounded-full border border-[#e8a2b5]/30">
                    Step {activeIndex + 1} of {timelineMilestones.length}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#591b2c] tracking-tight">
                    {activeMilestone.title}
                  </h3>

                  <p className="mt-1 font-serif text-xs sm:text-sm leading-relaxed text-[#3a1d29]/95">
                    {activeMilestone.description}
                  </p>
                </div>

                {activeMilestone.quote && (
                  <div className="mt-1.5 p-2 sm:p-2.5 rounded-xl bg-[#fdf5f7] border-l-3 border-[#dfb285] text-left">
                    <p className="font-serif italic text-xs text-[#78283d]">
                      "{activeMilestone.quote}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Continue Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-3 sm:mt-4 flex flex-col items-center space-y-1.5 shrink-0"
        >
          <p className="font-serif text-[11px] sm:text-xs text-[#f2cad6] italic">
            Next, step into a magical garden blooming with heartfelt prayers...
          </p>

          <button
            onClick={onContinue}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-full bg-gradient-to-r from-[#94314e] via-[#b64b67] to-[#862540] text-[#fff5f7] font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(148,49,78,0.45)] hover:shadow-[0_6px_22px_rgba(148,49,78,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation border border-[#f5c7d2]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span>A Garden of Wishes 🌸</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#ffd1dc] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Quiet Bottom Kicker */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.6 }}
        className="text-[9px] sm:text-[11px] font-sans text-[#e5a4b4]/70 tracking-wider shrink-0"
      >
        Every day of these 365 days has been a blessing with {recipientName}
      </motion.p>
    </div>
  );
};
