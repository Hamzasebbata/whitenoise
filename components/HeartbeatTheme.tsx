'use client';

import React, { useEffect, useRef } from 'react';

interface HeartbeatThemeProps {
  isPlaying: boolean;
}

export default function HeartbeatTheme({ isPlaying }: HeartbeatThemeProps) {
  const wombContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wombContainerRef.current) return;

    // Créer les anneaux sonores dynamiquement
    const soundRingsContainer = document.createElement('div');
    soundRingsContainer.className = 'sound-rings-container-heartbeat';
    
    for (let i = 0; i < 4; i++) {
      const ring = document.createElement('div');
      ring.className = 'sound-ring-heartbeat';
      ring.style.animationDelay = i === 3 ? '1.8s' : '0s';
      soundRingsContainer.appendChild(ring);
    }

    // Créer les particules de cœur
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-container-heartbeat';
    
    for (let i = 0; i < 5; i++) {
      const heartParticle = document.createElement('div');
      heartParticle.className = 'heart-particle-heartbeat';
      heartParticle.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `;
      
      // Calculer la direction pour chaque cœur
      const angle = (360 / 5) * i;
      const distance = 150;
      const x = Math.cos(angle * Math.PI / 180) * distance;
      const y = Math.sin(angle * Math.PI / 180) * distance;
      
      // Créer animation personnalisée pour chaque cœur
      const keyframes = `
        @keyframes heart-float-${i} {
          0% {
            transform: translate(0, 0) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          60% {
            transform: translate(${x * 0.7}px, ${y * 0.7}px) scale(1) rotate(${angle}deg);
            opacity: 0.5;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translate(${x}px, ${y}px) scale(0.3) rotate(${angle + 30}deg);
            opacity: 0;
          }
        }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);
      
      heartParticle.style.animation = `heart-float-${i} 6s cubic-bezier(0.4, 0, 0.2, 1) infinite`;
      heartParticle.style.animationDelay = `${i * 1.2}s`;
      
      heartsContainer.appendChild(heartParticle);
    }

    // Ajouter au conteneur si en lecture
    if (isPlaying) {
      const visualHero = document.querySelector('.audio-visual-hero');
      if (visualHero) {
        visualHero.appendChild(soundRingsContainer);
        visualHero.appendChild(heartsContainer);
      }
    }

    // Cleanup
    return () => {
      soundRingsContainer.remove();
      heartsContainer.remove();
    };
  }, [isPlaying]);

  return (
    <div className="womb-container" ref={wombContainerRef}>
      {/* Battements de cœur - pulsations visuelles */}
      <div className="heartbeat-pulse"></div>
      <div className="heartbeat-pulse-2"></div>
      <div className="heartbeat-pulse-3"></div>
      
      {/* Ondes de liquide */}
      <div className="wave-circle"></div>
      <div className="wave-circle"></div>
      <div className="wave-circle"></div>
      <div className="wave-circle"></div>
      
      {/* Particules fluides (liquide amniotique) */}
      <div className="fluid-particle"></div>
      <div className="fluid-particle"></div>
      <div className="fluid-particle"></div>
      <div className="fluid-particle"></div>
      <div className="fluid-particle"></div>
      <div className="fluid-particle"></div>
    </div>
  );
}

