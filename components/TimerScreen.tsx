'use client';

import { ArrowLeft, Check } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { TimerDuration } from '@/types/sound';

interface TimerScreenProps {
  onBack: () => void;
}

const timerOptions = [15, 30, 45, 60, 90, 120];

export default function TimerScreen({ onBack }: TimerScreenProps) {
  const { timerDuration, setTimer } = useAudio();

  const handleTimerSet = (minutes: number | null) => {
    setTimer(minutes as TimerDuration);
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
              Minuteur de sommeil
            </h1>
          </div>

          {/* Timer options */}
          <div className="grid grid-cols-2 gap-4 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            {timerOptions.map((minutes, index) => {
              const isSelected = timerDuration === minutes;
              
              return (
                <button
                  key={minutes}
                  onClick={() => handleTimerSet(minutes)}
                  className="h-24 text-lg font-semibold relative rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{ 
                    background: isSelected ? 'var(--accent-terracotta)' : 'var(--surface-elevated)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isSelected ? '1px solid var(--accent-terracotta-deep)' : '1px solid var(--border-subtle)',
                    color: isSelected ? 'white' : 'var(--text-primary)',
                    boxShadow: 'var(--shadow-soft)',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{minutes}</span>
                    <span className="text-sm font-normal opacity-80">minutes</span>
                  </div>
                  {isSelected && (
                    <Check className="w-5 h-5 absolute top-3 right-3" />
                  )}
                </button>
              );
            })}
          </div>

          {/* No timer option */}
          <button
            onClick={() => handleTimerSet(null)}
            className="h-16 text-lg font-semibold rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-95 animate-fade-slide-up"
            style={{ 
              background: timerDuration === null ? 'var(--accent-terracotta)' : 'var(--surface-elevated)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: timerDuration === null ? '1px solid var(--accent-terracotta-deep)' : '1px solid var(--border-subtle)',
              color: timerDuration === null ? 'white' : 'var(--text-primary)',
              boxShadow: 'var(--shadow-soft)',
              animationDelay: '0.4s'
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Lecture continue</span>
              {timerDuration === null && <Check className="w-5 h-5" />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

