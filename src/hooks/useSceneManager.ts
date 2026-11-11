import { useState, useCallback } from 'react';
import { AnniversarySceneId, ChapterMeta } from '../types/anniversary';

export const SCENE_ORDER: readonly AnniversarySceneId[] = [
  'WELCOME',
  'LOVE_LETTER',
  'PHOTOGRAPHS',
  'SPECIAL_REASONS',
  'TIMELINE',
  'WISHES_GARDEN',
  'OPEN_WHEN',
  'ANNIVERSARY_REVEAL',
  'FINAL_SURPRISE',
] as const;

export const CHAPTER_METAS: ChapterMeta[] = [
  { id: 'WELCOME', chapterNumber: '০১', title: 'একটি মিষ্টি চিঠি', subtitle: 'সারপ্রাইজ আমন্ত্রণ', icon: '💌' },
  { id: 'LOVE_LETTER', chapterNumber: '০২', title: 'হৃদয় থেকে চিঠি', subtitle: 'ভালোবাসার বার্তা', icon: '📜' },
  { id: 'PHOTOGRAPHS', chapterNumber: '০৩', title: 'সুন্দর কিছু স্মৃতি', subtitle: 'মূল্যবান স্মৃতিচ্ছবি', icon: '📷' },
  { id: 'SPECIAL_REASONS', chapterNumber: '০৪', title: 'তুমি কেন এত বিশেষ', subtitle: 'ভালোবাসার ওরিগামি চিঠি', icon: '💖' },
  { id: 'TIMELINE', chapterNumber: '০৫', title: '৩৬৫ দিনের পথচলা', subtitle: 'সময়ের নক্ষত্রমালা', icon: '✨' },
  { id: 'WISHES_GARDEN', chapterNumber: '০৬', title: 'প্রার্থনার স্নিগ্ধ বাগান', subtitle: 'ফোটা ফুলের দোয়া', icon: '🌸' },
  { id: 'OPEN_WHEN', chapterNumber: '০৭', title: 'যখন ভালোবাসা চাইবে', subtitle: 'স্মৃতিমধুর ৫টি চিঠি', icon: '📬' },
  { id: 'ANNIVERSARY_REVEAL', chapterNumber: '০৮', title: 'আমাদের ১ম বার্ষিকী', subtitle: '১ বছর পূর্তির আনন্দ', icon: '🎉' },
  { id: 'FINAL_SURPRISE', chapterNumber: '০৯', title: 'চিরদিনের সূচনা', subtitle: 'অনন্তকালের গল্প', icon: '🌌' },
];

export function useSceneManager(initialScene: AnniversarySceneId = 'WELCOME') {
  const [currentScene, setCurrentScene] = useState<AnniversarySceneId>(initialScene);

  const currentIndex = SCENE_ORDER.indexOf(currentScene);
  const totalScenes = SCENE_ORDER.length;
  const isFirstScene = currentIndex === 0;
  const isLastScene = currentIndex === totalScenes - 1;

  // Moves to the next scene in the story
  const nextScene = useCallback(() => {
    setCurrentScene((prev) => {
      const idx = SCENE_ORDER.indexOf(prev);
      if (idx === -1) return SCENE_ORDER[0];
      const nextIdx = (idx + 1) % SCENE_ORDER.length;
      return SCENE_ORDER[nextIdx];
    });
  }, []);

  // Moves to the previous scene
  const prevScene = useCallback(() => {
    setCurrentScene((prev) => {
      const idx = SCENE_ORDER.indexOf(prev);
      if (idx <= 0) return SCENE_ORDER[0];
      return SCENE_ORDER[idx - 1];
    });
  }, []);

  // Directly sets a specific target scene
  const goToScene = useCallback((targetScene: AnniversarySceneId) => {
    setCurrentScene(targetScene);
  }, []);

  // Resets cleanly back to the first scene (WELCOME)
  const restartExperience = useCallback(() => {
    setCurrentScene(SCENE_ORDER[0]);
  }, []);

  return {
    currentScene,
    currentIndex,
    totalScenes,
    isFirstScene,
    isLastScene,
    nextScene,
    prevScene,
    goToScene,
    restartExperience,
  };
}
