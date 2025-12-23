'use client';

import { ArrowLeft, Volume2, Waves, CloudRain, Music, Heart, Fan, Wind, Train, Radio } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { SOUNDS } from '@/lib/sounds-data';
import type { LucideIcon } from 'lucide-react';

interface SoundsScreenProps {
  onBack: () => void;
}

// Map sound IDs to Lucide icons
const soundIcons: Record<string, LucideIcon> = {
  'white-noise': Radio,
  'rain': CloudRain,
  'hairdryer': Fan,
  'waves': Waves,
  'heartbeat': Heart,
  'wind': Wind,
  'train': Train,
};

export default function SoundsScreen({ onBack }: SoundsScreenProps) {
  const { currentSound, playSound } = useAudio();

  const handleSoundSelect = (sound: typeof SOUNDS[0]) => {
    playSound(sound);
    onBack();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#2d2d3a] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-semibold text-white">Choisir un son</h1>
          </div>

          {/* Sounds list */}
          <div className="grid gap-3">
            {SOUNDS.map((sound) => {
              const IconComponent = soundIcons[sound.id] || Music;
              const isSelected = currentSound?.id === sound.id;

              return (
                <button
                  key={sound.id}
                  onClick={() => handleSoundSelect(sound)}
                  className={`h-auto p-4 flex items-center gap-4 text-left rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500 hover:bg-purple-500/30'
                      : 'bg-[#1a1a24] hover:bg-[#2d2d3a] border-[#2d2d3a]'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-base">{sound.name}</p>
                    <p className="text-sm text-gray-400">
                      {sound.isPremium ? 'Son premium' : 'Son gratuit'}
                    </p>
                  </div>
                  {isSelected && <Volume2 className="w-5 h-5 text-purple-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

