import { Sound } from '@/types/sound';

export const SOUNDS: Sound[] = [
  {
    id: 'white-noise',
    name: 'Bruit Blanc',
    icon: '🌫️',
    audioUrl: '/sounds/white-noise.mp3',
    isPremium: false,
    description: 'Son apaisant continu',
  },
  {
    id: 'rain',
    name: 'Pluie Douce',
    icon: '🌧️',
    audioUrl: '/sounds/rain.mp3',
    isPremium: false,
    description: 'Averse apaisante',
  },
  {
    id: 'hairdryer',
    name: 'Salon de Coiffure',
    icon: '💨',
    audioUrl: '/sounds/Salon_de_coiffure.wav',
    isPremium: false,
    description: 'Ambiance chaleureuse',
  },
  {
    id: 'waves',
    name: 'Vagues',
    icon: '🌊',
    audioUrl: '/sounds/waves.mp3',
    isPremium: true,
    description: 'Bercement océanique',
  },
  {
    id: 'heartbeat',
    name: 'Battements de Cœur',
    icon: '💗',
    audioUrl: '/sounds/Battements de coeur.wav',
    isPremium: false,
    description: 'Environnement utérin',
  },
  {
    id: 'wind',
    name: 'Vent',
    icon: '🍃',
    audioUrl: '/sounds/wind.mp3',
    isPremium: true,
    description: 'Brise légère',
  },
  {
    id: 'train',
    name: 'Train',
    icon: '🚂',
    audioUrl: '/sounds/train.mp3',
    isPremium: true,
    description: 'Roulement rythmique',
  },
];

