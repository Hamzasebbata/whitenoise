'use client';

import { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import TimerScreen from '@/components/TimerScreen';
import SoundsScreen from '@/components/SoundsScreen';
import ThemeBackground from '@/components/ThemeBackground';

type Screen = 'player' | 'timer' | 'sounds';

export default function PlayerPage() {
  const { currentSound, isPlaying, togglePlayPause, timerDuration } = useAudio();
  const [screen, setScreen] = useState<Screen>('player');
  const [progress, setProgress] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Gestion du drag sur la progress bar
  const handleProgressDrag = (clientX: number) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleProgressDrag(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleProgressDrag(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleProgressDrag(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

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

        {/* Contrôles compacts */}
        <div className="player-compact">
          <div className="time-controls">
            <span className="time-display">12:34</span>
            <div 
              ref={progressBarRef}
              className="progress-bar"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className={`progress-handle ${isDragging ? 'dragging' : ''}`}></div>
              </div>
            </div>
            <span className="time-display">35:00</span>
          </div>
        </div>

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
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
          </svg>
          <span className="nav-label">Library</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4" strokeWidth="2"/>
          </svg>
          <span className="nav-label">Profile</span>
        </div>
      </nav>
    </>
  );
}
