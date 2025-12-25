'use client';

import { useAudio } from '@/contexts/AudioContext';
import { SOUNDS } from '@/lib/sounds-data';

interface SoundsScreenProps {
  onBack: () => void;
}

// Custom SVG icons for each sound
const soundIcons: Record<string, React.FC<{ className?: string }>> = {
  'white-noise': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'rain': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 13v6M12 11v8M16 13v6M20 6a4 4 0 01-4 4H8a4 4 0 110-8h8a4 4 0 014 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'hairdryer': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V3M12 21v-6M15 12h6M3 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'waves': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'heartbeat': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'wind': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'train': ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 11h16M9 19l-2 2M15 19l2 2M9 4v3M15 4v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function SoundsScreen({ onBack }: SoundsScreenProps) {
  const { currentSound, playSound } = useAudio();

  const handleSoundSelect = (sound: typeof SOUNDS[0]) => {
    // Empêcher la lecture des sons premium
    if (sound.isPremium) {
      // 🎯 Tracking Google Analytics 4 - Premium Click
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'premium_click', {
          sound_name: sound.name,
          sound_id: sound.id,
          event_category: 'conversion',
          event_label: `Premium Click: ${sound.name}`,
        });
      }

      alert('🔒 Ce son est réservé aux membres Premium.\n\nMettez à niveau votre compte pour accéder à tous les sons !');
      return;
    }
    playSound(sound);
    onBack();
  };

  const DefaultIcon = soundIcons['white-noise'];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 animate-fade-slide-down">
            <button
              onClick={onBack}
              className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-[400ms] hover:scale-105 active:scale-95"
              style={{ 
                background: 'var(--surface-elevated)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--text-primary)', strokeWidth: 1.8 }}>
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
              const IconComponent = soundIcons[sound.id] || DefaultIcon;
              const isSelected = currentSound?.id === sound.id;

              return (
                <button
                  key={sound.id}
                  onClick={() => handleSoundSelect(sound)}
                  className="h-auto p-4 flex items-center gap-4 text-left rounded-2xl border transition-all duration-[400ms] hover:-translate-y-1 hover:rotate-[-1deg] active:scale-[0.96] relative overflow-hidden group"
                  style={{ 
                    background: isSelected ? 'rgba(255, 232, 222, 0.3)' : 'var(--surface-elevated)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isSelected ? '1px solid var(--accent-peach-deep)' : '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-soft)',
                    animationDelay: `${index * 0.05}s`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-[400ms] group-hover:scale-[1.08] group-hover:rotate-[5deg]"
                    style={{ 
                      background: 'rgba(232, 168, 124, 0.1)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      color: 'var(--accent-terracotta)'
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
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
                  {sound.isPremium ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--text-tertiary)', strokeWidth: 1.8 }}>
                      <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : isSelected && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--accent-terracotta)', strokeWidth: 1.8 }}>
                      <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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

