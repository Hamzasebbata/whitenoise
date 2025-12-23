'use client';

import { useEffect, useRef } from 'react';

export default function RainTheme() {
  const rainContainerRef = useRef<HTMLDivElement>(null);
  const numberOfDrops = 100;
  const splashChance = 0.3;

  useEffect(() => {
    if (!rainContainerRef.current) return;

    const rainContainer = rainContainerRef.current;
    const drops: HTMLDivElement[] = [];

    function createSingleDrop() {
      const drop = document.createElement('div');
      drop.className = 'raindrop theme-element';
      
      const sizes = ['small', 'medium', 'large'];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      drop.classList.add(randomSize);
      
      // Zones des nuages pour un effet réaliste
      const cloudZones = [
        { min: 0, max: 30 },
        { min: 35, max: 55 },
        { min: 60, max: 80 }
      ];
      
      const zone = cloudZones[Math.floor(Math.random() * cloudZones.length)];
      const randomLeft = zone.min + Math.random() * (zone.max - zone.min);
      drop.style.left = randomLeft + '%';
      drop.style.top = (5 + Math.random() * 15) + '%';
      drop.style.animationDelay = Math.random() * 2 + 's';
      
      rainContainer.appendChild(drop);
      drops.push(drop);
      
      const duration = parseFloat(getComputedStyle(drop).animationDuration) * 1000;
      
      // Créer un splash aléatoirement
      if (Math.random() < splashChance) {
        setTimeout(() => {
          createSplash(drop.style.left);
        }, duration * 0.95);
      }
      
      // Recycler la goutte
      setTimeout(() => {
        drop.remove();
        const index = drops.indexOf(drop);
        if (index > -1) drops.splice(index, 1);
        createSingleDrop();
      }, duration + 2000);
    }

    function createSplash(leftPosition: string) {
      const splash = document.createElement('div');
      splash.className = 'splash';
      splash.style.left = leftPosition;
      splash.style.bottom = Math.random() * 15 + 10 + '%';
      rainContainer.appendChild(splash);
      
      setTimeout(() => {
        splash.remove();
      }, 800);
    }

    function createRaindrops() {
      for (let i = 0; i < numberOfDrops; i++) {
        setTimeout(() => {
          createSingleDrop();
        }, i * 50);
      }
    }

    createRaindrops();

    // Cleanup
    return () => {
      drops.forEach(drop => drop.remove());
    };
  }, []);

  return (
    <div ref={rainContainerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Nuages réalistes */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      
      {/* Flaques d'eau */}
      <div className="puddle puddle-1" />
      <div className="puddle puddle-2" />
      <div className="puddle puddle-3" />
    </div>
  );
}

