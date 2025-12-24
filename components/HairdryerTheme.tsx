'use client';

import React from 'react';

interface HairdryerThemeProps {
  isPlaying: boolean;
}

export default function HairdryerTheme({ isPlaying }: HairdryerThemeProps) {
  if (!isPlaying) return null;

  return (
    <div className="hairdryer-container">
      {/* Halo central lumineux */}
      <div className="central-glow"></div>
      
      {/* Cercles lumineux pulsants */}
      <div className="light-ring"></div>
      <div className="light-ring"></div>
      <div className="light-ring"></div>
      
      {/* Vagues de chaleur horizontales */}
      <div className="heat-wave"></div>
      <div className="heat-wave"></div>
      <div className="heat-wave"></div>
      
      {/* Lignes ondulantes sonores */}
      <div className="sound-line"></div>
      <div className="sound-line"></div>
      <div className="sound-line"></div>
      
      {/* Particules dorées flottantes */}
      <div className="golden-particle"></div>
      <div className="golden-particle"></div>
      <div className="golden-particle"></div>
      <div className="golden-particle"></div>
      <div className="golden-particle"></div>
      <div className="golden-particle"></div>
    </div>
  );
}

