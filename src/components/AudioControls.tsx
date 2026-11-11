import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  X,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Music,
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { AnniversarySceneId } from '../types/anniversary';
import { CHAPTER_METAS, SCENE_ORDER } from '../hooks/useSceneManager';

interface AudioControlsProps {
  currentScene: AnniversarySceneId;
  onNavigateToScene: (scene: AnniversarySceneId) => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  musicStarted: boolean;
  onStartMusic: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  currentScene,
  onNavigateToScene,
  onPrevScene,
  onNextScene,
  musicStarted,
  onStartMusic,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const currentIndex = SCENE_ORDER.indexOf(currentScene);
  const totalChapters = SCENE_ORDER.length;
  const currentChapterMeta = CHAPTER_METAS[currentIndex] || CHAPTER_METAS[0];

  useEffect(() => {
    setIsPlaying(romanticAudio.isPlaying());
    setVolume(romanticAudio.getVolume());
    setIsMuted(romanticAudio.getMuted());
  }, [musicStarted]);

  const handleTogglePlay = () => {
    if (!musicStarted) {
      onStartMusic();
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      const playing = romanticAudio.togglePlayPause();
      setIsPlaying(playing);
    }
  };

  const handleToggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    romanticAudio.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      romanticAudio.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Top Header Bar: Progress + Navigation + Controls */}
      <header className="fixed top-2 inset-x-2 sm:top-3 sm:inset-x-5 z-50 flex items-center justify-between pointer-events-none">
        {/* Left Zone: Chapter Progress Indicator & Quick Nav */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5">
          {/* Previous Scene Button */}
          {currentIndex > 0 && (
            <button
              onClick={onPrevScene}
              aria-label="Previous Chapter"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#270e1b]/90 text-[#f6d7df] border border-[#e8a2b5]/30 shadow-md hover:bg-[#3d162b] hover:border-[#dfb285] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Current Chapter Badge / Open Drawer */}
          <button
            onClick={() => {
              setIsNavOpen(true);
              setIsVolumeOpen(false);
            }}
            className="group flex h-8 sm:h-9 items-center gap-1.5 rounded-full px-2.5 sm:px-3 bg-[#270e1b]/90 text-[#f6d7df] border border-[#e8a2b5]/30 shadow-md hover:bg-[#3d162b] hover:border-[#dfb285] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <span className="text-xs">{currentChapterMeta.icon}</span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-mono text-[#dfb285] leading-none">
                Ch. {currentChapterMeta.chapterNumber} of {totalChapters}
              </span>
              <span className="hidden sm:inline text-[11px] font-serif font-medium text-[#fce8ee] leading-tight truncate max-w-[120px]">
                {currentChapterMeta.title}
              </span>
            </div>
          </button>

          {/* Next Scene Button */}
          {currentIndex < totalChapters - 1 && (
            <button
              onClick={onNextScene}
              aria-label="Next Chapter"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#270e1b]/90 text-[#f6d7df] border border-[#e8a2b5]/30 shadow-md hover:bg-[#3d162b] hover:border-[#dfb285] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Right Zone: Chapter Menu & Audio Controls */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5">
          {/* Chapter Compass Navigation Drawer Button */}
          <button
            onClick={() => {
              setIsNavOpen(!isNavOpen);
              setIsVolumeOpen(false);
            }}
            aria-label="Story chapter navigation"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#270e1b]/90 text-[#f6d7df] border border-[#e8a2b5]/30 shadow-md hover:bg-[#3d162b] hover:border-[#dfb285] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            <Compass className="h-3.5 w-3.5 text-[#dfb285]" />
          </button>

          {/* Music Volume Panel Toggle */}
          <button
            onClick={() => {
              setIsVolumeOpen(!isVolumeOpen);
              setIsNavOpen(false);
            }}
            aria-label="Audio controls and volume"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#270e1b]/90 text-[#f6d7df] border border-[#e8a2b5]/30 shadow-md hover:bg-[#3d162b] hover:border-[#dfb285] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285]"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-3.5 w-3.5 text-[#d8a8b5]" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-[#dfb285]" />
            )}
          </button>

          {/* Music Play/Pause Quick Pill */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            className={`group flex h-8 sm:h-9 items-center gap-1.5 rounded-full px-2.5 sm:px-3 border transition-all duration-300 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb285] ${
              !isPlaying || isMuted
                ? 'bg-[#270e1b]/90 border-[#e8a2b5]/25 text-[#d8a8b5] hover:bg-[#3d162b]'
                : 'bg-[#4a162e]/90 border-[#f2b9c7]/45 text-[#fbebf0] hover:bg-[#591b38]'
            }`}
          >
            {isPlaying && !isMuted ? (
              <Pause className="h-3 w-3 text-[#dfb285] transition-transform group-hover:scale-110" />
            ) : (
              <Play className="h-3 w-3 text-[#fce8ee] transition-transform group-hover:scale-110 fill-current" />
            )}

            {/* Dancing Waveform Visualizer Bars */}
            <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isPlaying && !isMuted
                    ? 'h-3 bg-[#dfb285] animate-pulse'
                    : 'h-1 bg-[#d8a8b5]/40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isPlaying && !isMuted
                    ? 'h-1.5 bg-[#f2b9c7] animate-pulse delay-75'
                    : 'h-1 bg-[#d8a8b5]/40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isPlaying && !isMuted
                    ? 'h-3 bg-[#dfb285] animate-pulse delay-150'
                    : 'h-1 bg-[#d8a8b5]/40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isPlaying && !isMuted
                    ? 'h-2 bg-[#f2b9c7] animate-pulse delay-100'
                    : 'h-1 bg-[#d8a8b5]/40'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Floating Story Progress Thin Bar at Very Top of Screen */}
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-[#250d1a]/50">
        <div
          className="h-full bg-gradient-to-r from-[#dfb285] via-[#f48fb1] to-[#dfb285] transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / totalChapters) * 100}%` }}
        />
      </div>

      {/* Volume Control Dropdown Popover */}
      {isVolumeOpen && (
        <div className="fixed top-16 right-4 z-50 w-72 rounded-2xl bg-[#220c18]/95 border border-[#d97c92]/35 p-4 shadow-2xl backdrop-blur-xl text-[#f7eef2]">
          <div className="flex items-center justify-between pb-3 border-b border-[#d97c92]/20">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#dfb285]" />
              <span className="font-serif text-sm font-medium tracking-wide text-[#fce8ee]">
                Music Box Volume
              </span>
            </div>
            <button
              onClick={() => setIsVolumeOpen(false)}
              className="text-[#d8a8b5] hover:text-white p-1"
              aria-label="Close volume settings"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-sans text-[#e5a4b4]">
              <button
                onClick={handleToggleMute}
                className="hover:underline flex items-center gap-1"
              >
                {isMuted ? 'Muted' : `${Math.round(volume * 100)}% Volume`}
              </button>
              <span className="text-[10px] text-[#dfb285] font-mono">
                {isPlaying && !isMuted ? 'Playing' : 'Paused'}
              </span>
            </div>

            {/* Volume Range Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#dfb285] bg-[#3a1527] h-1.5 rounded-lg appearance-none cursor-pointer"
              aria-label="Adjust music volume"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3d162b] hover:bg-[#501a37] text-xs font-sans text-[#fce8ee] transition-colors"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={handleToggleMute}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3d162b] hover:bg-[#501a37] text-xs font-sans text-[#fce8ee] transition-colors"
              >
                {isMuted ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters Overlay Modal (9 Chapters) */}
      {isNavOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md transition-opacity"
          onClick={() => setIsNavOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#220c18] border border-[#d97c92]/35 p-6 shadow-2xl text-[#f7eef2] max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#d97c92]/20 shrink-0">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-[#dfb285]" />
                <h3 className="font-serif text-lg tracking-wide text-[#fce8ee]">
                  Our Story Chapters
                </h3>
              </div>
              <button
                onClick={() => setIsNavOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 text-[#d8a8b5] transition-colors"
                aria-label="Close story navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-3 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
              {CHAPTER_METAS.map((chapter) => {
                const isActive = chapter.id === currentScene;

                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      onNavigateToScene(chapter.id);
                      setIsNavOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                      isActive
                        ? 'bg-[#501732] text-white font-medium border border-[#e5a4b4]/40 shadow-sm'
                        : 'text-[#d8a8b5] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{chapter.icon}</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-[#dfb285]">
                            Ch. {chapter.chapterNumber}
                          </span>
                          <span className="text-sm font-sans font-medium text-[#fce8ee]">
                            {chapter.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#e8a2b5]/70">
                          {chapter.subtitle}
                        </span>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#dfb285] shadow-[0_0_8px_#dfb285]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#e8a2b5]/40" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
