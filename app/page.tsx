'use client';

import { useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { Play, Pause, Clock, Music } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-12 py-12">
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow rings */}
            <div
              className={`absolute inset-0 rounded-full bg-purple-500/20 blur-3xl ${
                isPlaying ? 'breathe' : ''
              }`}
              style={{ width: '400px', height: '400px' }}
            />
            <div
              className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl ${
                isPlaying ? 'breathe' : ''
              }`}
              style={{ width: '350px', height: '350px', animationDelay: '0.5s' }}
            />

            {/* Main circle */}
            <div
              className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 backdrop-blur-sm border border-purple-500/50 flex items-center justify-center ${
                isPlaying ? 'breathe' : ''
              }`}
            >
              <div className="w-56 h-56 rounded-full bg-[#1a1a24]/50 backdrop-blur-md border border-purple-500/30 flex items-center justify-center">
                <button
                  onClick={togglePlayPause}
                  className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 transition-all duration-300 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sound name */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">En cours de lecture</p>
            <h2 className="text-2xl font-semibold text-white">
              {currentSound?.name || 'Aucun son'}
            </h2>
            {timerDuration && (
              <p className="text-gray-400 text-sm mt-2">
                Minuteur : {timerDuration} min
              </p>
            )}
          </div>

          {/* Bottom controls */}
          <div className="flex gap-4 mt-4 w-full px-4">
            <button
              onClick={() => setScreen('timer')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a24] hover:bg-[#2d2d3a] text-white rounded-2xl border border-[#2d2d3a] transition-all"
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">Minuteur</span>
            </button>
            <button
              onClick={() => setScreen('sounds')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a24] hover:bg-[#2d2d3a] text-white rounded-2xl border border-[#2d2d3a] transition-all"
            >
              <Music className="w-5 h-5" />
              <span className="font-medium">Sons</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
