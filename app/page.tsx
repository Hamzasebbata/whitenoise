'use client';

import { useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { PlayCircle, PauseCircle, Clock } from 'lucide-react';
import TimerModal from '@/components/TimerModal';

export default function PlayerPage() {
  const { currentSound, isPlaying, togglePlayPause, timerDuration, setTimer } = useAudio();
  const [showTimerModal, setShowTimerModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-12">
        {/* Sound Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">
            {currentSound?.name || 'Aucun son'}
          </h1>
          <p className="text-slate-400">Bruit blanc apaisant</p>
        </div>

        {/* Breathing Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Outer pulsing ring */}
            <div
              className={`absolute inset-0 rounded-full bg-blue-500/20 ${
                isPlaying ? 'animate-ping-slow' : ''
              }`}
              style={{ width: '280px', height: '280px' }}
            />
            
            {/* Middle ring */}
            <div
              className={`absolute inset-0 rounded-full bg-blue-500/30 ${
                isPlaying ? 'animate-breathe' : ''
              }`}
              style={{
                width: '280px',
                height: '280px',
              }}
            />

            {/* Center circle with emoji */}
            <div className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/50"
              style={{ width: '280px', height: '280px' }}
            >
              <span className="text-8xl">{currentSound?.icon || '🌫️'}</span>
            </div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-center">
          <button
            onClick={togglePlayPause}
            className="group relative"
          >
            {isPlaying ? (
              <PauseCircle
                size={120}
                className="text-slate-100 hover:text-blue-400 transition-colors drop-shadow-2xl"
                strokeWidth={1.5}
              />
            ) : (
              <PlayCircle
                size={120}
                className="text-slate-100 hover:text-blue-400 transition-colors drop-shadow-2xl"
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>

        {/* Timer Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowTimerModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all"
          >
            <Clock size={24} />
            <span className="font-medium text-lg">
              {timerDuration ? `${timerDuration} min` : 'Minuteur'}
            </span>
          </button>
        </div>
      </div>

      {/* Timer Modal */}
      <TimerModal
        isOpen={showTimerModal}
        onClose={() => setShowTimerModal(false)}
        currentTimer={timerDuration}
        onSelectTimer={setTimer}
      />
    </div>
  );
}
