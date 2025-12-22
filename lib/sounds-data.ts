import { Sound } from '@/types/sound';

export const SOUNDS: Sound[] = [
  {
    id: 'white-noise',
    name: 'Bruit Blanc',
    icon: '🌫️',
    audioUrl: '/sounds/white-noise.mp3',
    isPremium: false,
  },
  {
    id: 'rain',
    name: 'Pluie',
    icon: '🌧️',
    audioUrl: '/sounds/rain.mp3',
    isPremium: false,
  },
  {
    id: 'hairdryer',
    name: 'Sèche-cheveux',
    icon: '💨',
    audioUrl: '/sounds/hairdryer.mp3',
    isPremium: true,
  },
  {
    id: 'waves',
    name: 'Vagues',
    icon: '🌊',
    audioUrl: '/sounds/waves.mp3',
    isPremium: true,
  },
  {
    id: 'heartbeat',
    name: 'Battements de cœur',
    icon: '💗',
    audioUrl: '/sounds/heartbeat.mp3',
    isPremium: true,
  },
  {
    id: 'wind',
    name: 'Vent',
    icon: '🍃',
    audioUrl: '/sounds/wind.mp3',
    isPremium: true,
  },
  {
    id: 'train',
    name: 'Train',
    icon: '🚂',
    audioUrl: '/sounds/train.mp3',
    isPremium: true,
  },
];

