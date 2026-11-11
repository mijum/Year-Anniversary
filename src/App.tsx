/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSceneManager } from './hooks/useSceneManager';
import { FloatingPetals } from './components/FloatingPetals';
import { GlowingParticles } from './components/GlowingParticles';
import { AudioControls } from './components/AudioControls';
import { WelcomeScene } from './scenes/WelcomeScene';
import { LoveLetterScene } from './scenes/LoveLetterScene';
import { PhotoMemoriesScene } from './scenes/PhotoMemoriesScene';
import { SpecialReasonsScene } from './scenes/SpecialReasonsScene';
import { TimelineScene } from './scenes/TimelineScene';
import { WishesGardenScene } from './scenes/WishesGardenScene';
import { OpenWhenScene } from './scenes/OpenWhenScene';
import { AnniversaryRevealScene } from './scenes/AnniversaryRevealScene';
import { FinalSurpriseScene } from './scenes/FinalSurpriseScene';
import { romanticAudio } from './utils/audioSynthesizer';
import { ANNIVERSARY_CONFIG } from './config/anniversary';

export default function App() {
  const {
    currentScene,
    nextScene,
    prevScene,
    goToScene,
    restartExperience,
  } = useSceneManager('WELCOME');

  const [musicStarted, setMusicStarted] = useState<boolean>(false);
  const [experienceKey, setExperienceKey] = useState<number>(0);

  const handleStartMusic = useCallback(() => {
    setMusicStarted(true);
    romanticAudio.startMusic(ANNIVERSARY_CONFIG.audio.backgroundMusicUrl);
  }, []);

  const handleRestart = useCallback(() => {
    setExperienceKey((prev) => prev + 1);
    restartExperience();
  }, [restartExperience]);

  // Start music upon the first user interaction
  useEffect(() => {
    const triggerAudio = () => {
      handleStartMusic();
    };

    window.addEventListener('pointerdown', triggerAudio, { passive: true, once: true });
    window.addEventListener('touchstart', triggerAudio, { passive: true, once: true });
    window.addEventListener('click', triggerAudio, { passive: true, once: true });
    window.addEventListener('keydown', triggerAudio, { passive: true, once: true });

    return () => {
      romanticAudio.stopMusic();
      window.removeEventListener('pointerdown', triggerAudio);
      window.removeEventListener('touchstart', triggerAudio);
      window.removeEventListener('click', triggerAudio);
      window.removeEventListener('keydown', triggerAudio);
    };
  }, [handleStartMusic]);

  // Dynamic atmospheric gradient reflecting each scene's mood
  const getSceneGradient = () => {
    switch (currentScene) {
      case 'ANNIVERSARY_REVEAL':
        return 'radial-gradient(circle at 50% 45%, rgba(68,18,40,0.88) 0%, rgba(32,7,19,0.94) 60%, rgba(17,3,9,0.98) 100%)';
      case 'TIMELINE':
        // Celestial starlight ambiance
        return 'radial-gradient(circle at 50% 35%, rgba(38,15,48,0.92) 0%, rgba(20,7,28,0.95) 55%, rgba(12,3,18,0.99) 100%)';
      case 'WISHES_GARDEN':
        // Soft blooming garden tones
        return 'radial-gradient(circle at 50% 40%, rgba(70,20,45,0.85) 0%, rgba(42,12,30,0.92) 55%, rgba(20,5,15,0.98) 100%)';
      case 'SPECIAL_REASONS':
        // Pastel origami heart warmth
        return 'radial-gradient(circle at 50% 35%, rgba(65,18,38,0.85) 0%, rgba(36,10,24,0.92) 55%, rgba(18,4,13,0.98) 100%)';
      case 'OPEN_WHEN':
        // Deep purple & rose twilight
        return 'radial-gradient(circle at 50% 30%, rgba(55,16,42,0.88) 0%, rgba(30,8,22,0.94) 55%, rgba(16,4,12,0.98) 100%)';
      case 'LOVE_LETTER':
      case 'FINAL_SURPRISE':
        return 'radial-gradient(circle at 50% 30%, rgba(74,21,42,0.85) 0%, rgba(39,11,24,0.92) 55%, rgba(21,5,14,0.98) 100%)';
      default:
        return 'radial-gradient(circle at 50% 40%, rgba(82,22,48,0.80) 0%, rgba(46,13,29,0.90) 50%, rgba(22,4,13,0.97) 100%)';
    }
  };

  return (
    <div className="relative h-[100dvh] min-h-[100dvh] w-full bg-[#1b0a15] text-[#faf5ee] overflow-x-hidden overflow-y-auto font-sans selection:bg-[#dfb285] selection:text-[#270b16]">
      {/* Visual Image Layer 1: background.jpg (dreamy blush bokeh and floating petals) */}
      <img
        src="/background.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-30"
      />

      {/* Cinematic Romantic Gradient Overlay tailored for each chapter */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{ background: getSceneGradient() }}
      />

      {/* Visual Image Layer 2: bottom.jpg (bed of pink rose petals anchored at the bottom) */}
      <div className="pointer-events-none fixed bottom-0 inset-x-0 z-0 h-28 sm:h-40 overflow-hidden [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] opacity-35">
        <img
          src="/bottom.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Subtle Filmic Vignette (gradient — much cheaper than a large inset box-shadow) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Rose Petals & Glowing Bokeh */}
      <FloatingPetals />
      <GlowingParticles count={14} />

      {/* Persistent Audio & 9-Chapter Navigation Controls */}
      <AudioControls
        currentScene={currentScene}
        onNavigateToScene={(scene) => {
          handleStartMusic();
          goToScene(scene);
        }}
        onPrevScene={() => {
          handleStartMusic();
          prevScene();
        }}
        onNextScene={() => {
          handleStartMusic();
          nextScene();
        }}
        musicStarted={musicStarted}
        onStartMusic={handleStartMusic}
      />

      {/* Central Interactive Story Scenes (9 Chapters) */}
      <main className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentScene}-${experienceKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex min-h-[100dvh] w-full flex-col items-center justify-center"
          >
            {/* Chapter 1: A Little Surprise */}
            {currentScene === 'WELCOME' && (
              <WelcomeScene
                onContinue={nextScene}
                onUserInteraction={handleStartMusic}
              />
            )}

            {/* Chapter 2: A Letter from My Heart */}
            {currentScene === 'LOVE_LETTER' && (
              <LoveLetterScene onContinue={nextScene} />
            )}

            {/* Chapter 3: Beautiful Memories */}
            {currentScene === 'PHOTOGRAPHS' && (
              <PhotoMemoriesScene onContinue={nextScene} />
            )}

            {/* Chapter 4: Why You're Special */}
            {currentScene === 'SPECIAL_REASONS' && (
              <SpecialReasonsScene onContinue={nextScene} />
            )}

            {/* Chapter 5: 365 Days Together */}
            {currentScene === 'TIMELINE' && (
              <TimelineScene onContinue={nextScene} />
            )}

            {/* Chapter 6: A Garden of Wishes */}
            {currentScene === 'WISHES_GARDEN' && (
              <WishesGardenScene onContinue={nextScene} />
            )}

            {/* Chapter 7: Open When You Need Love */}
            {currentScene === 'OPEN_WHEN' && (
              <OpenWhenScene onContinue={nextScene} />
            )}

            {/* Chapter 8: Our First Anniversary */}
            {currentScene === 'ANNIVERSARY_REVEAL' && (
              <AnniversaryRevealScene onContinue={nextScene} />
            )}

            {/* Chapter 9: Forever Starts Here */}
            {currentScene === 'FINAL_SURPRISE' && (
              <FinalSurpriseScene onRestart={handleRestart} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
