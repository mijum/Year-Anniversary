export type AnniversarySceneId =
  | 'WELCOME'
  | 'LOVE_LETTER'
  | 'PHOTOGRAPHS'
  | 'SPECIAL_REASONS'
  | 'TIMELINE'
  | 'WISHES_GARDEN'
  | 'OPEN_WHEN'
  | 'ANNIVERSARY_REVEAL'
  | 'FINAL_SURPRISE';

export interface PhotographItem {
  id: string;
  label: string;
  src: string;
  fallbackSrc?: string;
  rotation: number;
  caption?: string;
  /** CSS object-position used to frame the thumbnail crop (e.g. '50% 30%') */
  objectPosition?: string;
}

export interface SpecialReason {
  id: string;
  title: string;
  message: string;
  color: string;
  foldedHue: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
  quote?: string;
  icon: string;
}

export interface WishFlower {
  id: string;
  flowerName: string;
  symbolism: string;
  bengaliWish: string;
  englishMeaning: string;
  petalColor: string;
  glowColor: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  bengaliPrompt: string;
  badge: string;
  bengaliMessage: string;
  englishMessage: string;
  accentColor: string;
}

export interface ChapterMeta {
  id: AnniversarySceneId;
  chapterNumber: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface AnniversaryConfig {
  projectName: string;
  recipientName: string;
  anniversaryTitle: string;
  anniversarySubtitle: string;
  welcomeMessage: string;
  welcomeButtonText: string;
  letter: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
  };
  photographs: PhotographItem[];
  specialReasons: SpecialReason[];
  timelineMilestones: TimelineMilestone[];
  wishFlowers: WishFlower[];
  openWhenLetters: OpenWhenLetter[];
  reveal: {
    centerpiece: string;
    supportingText: string;
    subtext: string;
  };
  final: {
    heading: string;
    message1: string;
    message2: string;
    replayButtonText: string;
    easterEggNote: string;
  };
  audio: {
    backgroundMusicUrl?: string;
    enableSoundEffects: boolean;
  };
}
