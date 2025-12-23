'use client';

import { useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import TimerScreen from '@/components/TimerScreen';
import SoundsScreen from '@/components/SoundsScreen';

type Screen = 'player' | 'timer' | 'sounds';

export default function PlayerPage() {
  const { currentSound, isPlaying, togglePlayPause, timerDuration } = useAudio();
  const [screen, setScreen] = useState<Screen>('player');

  if (screen === 'timer') {
    return <TimerScreen onBack={() => setScreen('player')} />;
  }

  if (screen === 'sounds') {
    return <SoundsScreen onBack={() => setScreen('player')} />;
  }

  return (
    <>
      {/* Ambient Particles */}
      <div className="ambient-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        {/* Decorative Shapes */}
        <div className="decorative-shape shape-1"></div>
        <div className="decorative-shape shape-2"></div>
        <div className="decorative-shape shape-3"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Main Player Card */}
          <div 
            className="bg-[var(--surface)] backdrop-blur-[40px] rounded-[48px] p-12 pb-10 border border-[var(--border-subtle)] shadow-[var(--shadow-medium)] relative overflow-hidden animate-fade-scale-in"
            style={{ WebkitBackdropFilter: 'blur(40px)' }}
          >
            {/* Audio Visualization */}
            <div className="relative w-[200px] h-[200px] mx-auto mb-10">
              {/* Outer glow ring */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full ${
                  isPlaying ? 'animate-[pulse-glow_4s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
                }`}
                style={{ 
                  background: 'radial-gradient(circle, var(--glow-peach), transparent 70%)',
                  opacity: 0.5 
                }}
              />
              
              {/* Mid ring */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full ${
                  isPlaying ? 'animate-[pulse-glow_4s_cubic-bezier(0.4,0,0.6,1)_infinite_0.5s]' : ''
                }`}
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent-peach-deep) 0%, var(--accent-sage) 100%)',
                  opacity: 0.2 
                }}
              />

              {/* Inner circle with button */}
              <button
                onClick={togglePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center z-10 transition-all duration-[400ms] hover:scale-105 active:scale-[0.92]"
                style={{ 
                  boxShadow: '0 0 40px var(--glow-sage), inset 0 0 30px rgba(255, 232, 222, 0.15)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {isPlaying ? (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ 
                      filter: 'drop-shadow(0 2px 8px rgba(212, 145, 106, 0.2))',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="#D4916A"/>
                    <rect x="14" y="4" width="4" height="16" rx="1" fill="#D4916A"/>
                  </svg>
                ) : (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ 
                      filter: 'drop-shadow(0 2px 8px rgba(212, 145, 106, 0.2))',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <path d="M8 5v14l11-7z" fill="#D4916A"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Sound Info */}
            <div className="text-center mb-10">
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                En cours de lecture
              </p>
              <h1 className="text-3xl font-semibold mb-2" style={{ 
                color: 'var(--text-primary)',
                fontFamily: "'Quicksand', cursive",
                letterSpacing: '-0.3px'
              }}>
                {currentSound?.name || 'Aucun son'}
              </h1>
              {timerDuration && (
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Minuteur : {timerDuration} min
                </p>
              )}
            </div>

            {/* Time Controls */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm min-w-[42px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
                12:34
              </span>
              <div className="flex-1 h-[6px] rounded-full relative overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                <div 
                  className="h-full rounded-full relative transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(90deg, var(--accent-terracotta) 0%, var(--accent-peach-deep) 100%)',
                    width: '35%'
                  }}
                >
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-white rounded-full"
                    style={{ boxShadow: '0 2px 8px rgba(74, 69, 64, 0.15)' }}
                  />
                </div>
              </div>
              <span className="text-sm min-w-[42px] font-mono text-right" style={{ color: 'var(--text-tertiary)' }}>
                35:00
              </span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-5 pt-4">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{ stroke: 'var(--text-tertiary)', strokeWidth: 1.8 }}
              >
                <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex-1 h-[6px] rounded-full relative" style={{ background: 'var(--border-subtle)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(90deg, var(--accent-sage-deep) 0%, var(--accent-sage) 100%)',
                    width: '65%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex gap-4 mt-8 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setScreen('timer')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-[400ms] hover:scale-[1.02] active:scale-[0.96]"
              style={{ 
                background: 'var(--surface-elevated)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-soft)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: '#E8A87C', strokeWidth: 1.8 }}>
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Minuteur</span>
            </button>
            <button
              onClick={() => setScreen('sounds')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-[400ms] hover:scale-[1.02] active:scale-[0.96]"
              style={{ 
                background: 'var(--surface-elevated)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-soft)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: '#E8A87C', strokeWidth: 1.8 }}>
                <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM21 16c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Sons</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
