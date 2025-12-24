export interface Sound {
  id: string;
  name: string;
  icon: string;
  audioUrl: string;
  isPremium: boolean;
  description: string;
}

export type TimerDuration = 15 | 30 | 45 | 60 | 90 | 120 | null; // null = infinite

