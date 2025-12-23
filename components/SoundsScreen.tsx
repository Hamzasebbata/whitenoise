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
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 animate-fade-slide-down">
            <button
              onClick={onBack}
              className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ 
                background: 'var(--surface-elevated)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ stroke: 'var(--text-primary)' }} />
            </button>
            <h1 
              className="text-2xl font-semibold"
              style={{ 
                color: 'var(--text-primary)',
                fontFamily: "'Quicksand', cursive",
                letterSpacing: '-0.3px'
              }}
            >
              Choisir un son
            </h1>
          </div>

          {/* Sounds list */}
          <div className="grid gap-3 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            {SOUNDS.map((sound, index) => {
              const IconComponent = soundIcons[sound.id] || Music;
              const isSelected = currentSound?.id === sound.id;

              return (
                <button
                  key={sound.id}
                  onClick={() => handleSoundSelect(sound)}
                  className="h-auto p-4 flex items-center gap-4 text-left rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-97 relative overflow-hidden group"
                  style={{ 
                    background: isSelected ? 'rgba(255, 232, 222, 0.3)' : 'var(--surface-elevated)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isSelected ? '1px solid var(--accent-peach-deep)' : '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-soft)',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(232, 168, 124, 0.1)' }}
                  >
                    <IconComponent 
                      className="w-5 h-5" 
                      style={{ 
                        stroke: 'var(--accent-terracotta)',
                        strokeWidth: 1.8
                      }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p 
                      className="font-semibold text-base mb-1"
                      style={{ 
                        color: 'var(--text-primary)',
                        fontFamily: "'Quicksand', sans-serif",
                        letterSpacing: '-0.2px'
                      }}
                    >
                      {sound.name}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                      {sound.isPremium ? 'Son premium' : 'Son gratuit'}
                    </p>
                  </div>
                  {isSelected && (
                    <Volume2 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ stroke: 'var(--accent-terracotta)' }} 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

