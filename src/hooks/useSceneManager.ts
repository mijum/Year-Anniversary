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
  { id: 'WELCOME', chapterNumber: '01', title: 'A Little Surprise', subtitle: 'The Invitation', icon: '💌' },
  { id: 'LOVE_LETTER', chapterNumber: '02', title: 'A Letter from My Heart', subtitle: 'Bengali Love Letter', icon: '📜' },
  { id: 'PHOTOGRAPHS', chapterNumber: '03', title: 'Beautiful Memories', subtitle: 'Cherished Moments', icon: '📷' },
  { id: 'SPECIAL_REASONS', chapterNumber: '04', title: "Why You're Special", subtitle: 'Love Notes & Hearts', icon: '💖' },
  { id: 'TIMELINE', chapterNumber: '05', title: '365 Days Together', subtitle: 'Constellation of Time', icon: '✨' },
  { id: 'WISHES_GARDEN', chapterNumber: '06', title: 'A Garden of Wishes', subtitle: 'Blooming Prayers', icon: '🌸' },
  { id: 'OPEN_WHEN', chapterNumber: '07', title: 'Open When You Need Love', subtitle: 'Keepsake Letters', icon: '📬' },
  { id: 'ANNIVERSARY_REVEAL', chapterNumber: '08', title: 'Our First Anniversary', subtitle: 'Grand 1 Year Celebration', icon: '🎉' },
  { id: 'FINAL_SURPRISE', chapterNumber: '09', title: 'Forever Starts Here', subtitle: 'The Next Chapter', icon: '🌌' },
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
