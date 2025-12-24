'use client';

import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import TimerScreen from '@/components/TimerScreen';
import SoundsScreen from '@/components/SoundsScreen';
import ThemeBackground from '@/components/ThemeBackground';

type Screen = 'player' | 'timer' | 'sounds';

export default function PlayerPage() {
  const { currentSound, isPlaying, togglePlayPause, timerDuration, timeElapsed } = useAudio();
  const [screen, setScreen] = useState<Screen>('player');
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Calculer le pourcentage de progression basé sur le timer
  const progressPercentage = timerDuration 
    ? Math.min(100, (timeElapsed / (timerDuration * 60)) * 100)
    : 0;

  // Formater le temps restant
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeRemaining = timerDuration 
    ? Math.max(0, (timerDuration * 60) - timeElapsed)
    : 0;

  if (screen === 'timer') {
    return <TimerScreen onBack={() => setScreen('player')} />;
  }

  if (screen === 'sounds') {
    return <SoundsScreen onBack={() => setScreen('player')} />;
  }

  return (
    <>
      {/* Theme Background dynamique */}
      <ThemeBackground soundId={currentSound?.id || 'rain'} isPlaying={isPlaying} />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="logo">Lullaby</div>
          <button className="icon-btn" aria-label="Settings">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 1v6m0 6v6M23 12h-6m-6 0H5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </header>

        {/* Visualisation audio HERO */}
        <div className="audio-visual-hero">
          <div className="visual-circle visual-circle-outer"></div>
          <div className="visual-circle visual-circle-mid"></div>
          <div 
            className="visual-circle visual-circle-inner"
            onClick={togglePlayPause}
          >
            <svg className="play-icon" viewBox="0 0 24 24">
              {isPlaying ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </>
              ) : (
                <path d="M8 5v14l11-7z"/>
              )}
            </svg>
          </div>
        </div>

        {/* Info du son */}
        <div className="sound-info">
          <div className="sound-status">En cours de lecture</div>
          <h1 className="sound-title">{currentSound?.name || 'Pluie Douce'}</h1>
          <p className="sound-subtitle">Averse apaisante</p>
        </div>

        {/* Contrôles compacts - Slider discret */}
        {timerDuration && (
          <div className="player-compact-minimal">
            <div className="progress-bar-minimal" ref={progressBarRef}>
              <div className="progress-fill-minimal" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span className="time-remaining-minimal">{formatTime(timeRemaining)}</span>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setScreen('timer')}>
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Minuteur</span>
          </button>
          <button className="action-btn" onClick={() => setScreen('sounds')}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Sons</span>
          </button>
          <button className="action-btn">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2"/>
            </svg>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </>
  );
}
