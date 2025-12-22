export interface Sound {
  id: string;
  name: string;
  icon: string;
  audioUrl: string;
  isPremium: boolean;
}

export type TimerDuration = 15 | 30 | 60 | null; // null = infinite

