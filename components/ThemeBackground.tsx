'use client';

import { useEffect, useState } from 'react';

interface ThemeBackgroundProps {
  soundId: string;
  isPlaying: boolean;
}

export default function ThemeBackground({ soundId, isPlaying }: ThemeBackgroundProps) {
  const [currentTheme, setCurrentTheme] = useState<string>('');

  useEffect(() => {
    // Transition smooth entre thèmes
    document.body.classList.add('data-theme-transitioning');
    
    setTimeout(() => {
      setCurrentTheme(soundId);
      document.body.dataset.theme = soundId;
      document.body.classList.remove('data-theme-transitioning');
    }, 400);
  }, [soundId]);

  // Ne rendre les éléments que si le son est en lecture
  if (!isPlaying) return null;

  // RAIN THEME
  if (currentTheme === 'rain') {
    const raindrops = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: 20 + Math.random() * 20,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="raindrop theme-element"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
              opacity: drop.opacity
            }}
          />
        ))}
      </div>
    );
  }

  // HEARTBEAT THEME
  if (currentTheme === 'heartbeat') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="heartbeat-pulse theme-element" />
        <div 
          className="heartbeat-pulse theme-element" 
          style={{ animationDelay: '0.5s', opacity: 0.5 }}
        />
      </div>
    );
  }

  // WIND CHIMES THEME
  if (currentTheme === 'wind' || currentTheme === 'hairdryer') {
    const chimes = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 15 + i * 15,
      top: 10 + Math.random() * 20,
      color: ['#FFE8DE', '#B8C9B8', '#E3EDF7', '#FFCBB8', '#9BB59B', '#E8A87C'][i],
      duration: 3 + Math.random() * 2,
      delay: i * 0.5
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {chimes.map((chime) => (
          <div
            key={chime.id}
            className="wind-chime theme-element"
            style={{
              left: `${chime.left}%`,
              top: `${chime.top}%`,
              background: chime.color,
              animationDuration: `${chime.duration}s`,
              animationDelay: `${chime.delay}s`
            }}
          />
        ))}
      </div>
    );
  }

  // MOONLIGHT THEME (pour train, white-noise)
  if (currentTheme === 'train' || currentTheme === 'white-noise') {
    const stars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-twinkle theme-element"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>
    );
  }

  // OCEAN WAVES THEME (par défaut pour waves)
  if (currentTheme === 'waves') {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <svg className="ocean-wave theme-element" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q300,10 600,50 T1200,50 L1200,100 L0,100 Z"
            fill="rgba(184, 201, 184, 0.1)"
            style={{ animationDelay: '0s' }}
          />
        </svg>
        <svg className="ocean-wave theme-element" viewBox="0 0 1200 100" preserveAspectRatio="none" style={{ bottom: '50px' }}>
          <path
            d="M0,50 Q300,80 600,50 T1200,50 L1200,100 L0,100 Z"
            fill="rgba(255, 232, 222, 0.1)"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
    );
  }

  return null;
}

