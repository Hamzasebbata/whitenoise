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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#2d2d3a] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-semibold text-white">Minuteur de sommeil</h1>
          </div>

          {/* Timer options */}
          <div className="grid grid-cols-2 gap-4">
            {timerOptions.map((minutes) => {
              const isSelected = timerDuration === minutes;
              
              return (
                <button
                  key={minutes}
                  onClick={() => handleTimerSet(minutes)}
                  className={`h-24 text-lg font-semibold relative rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white hover:bg-purple-500 border-purple-600'
                      : 'bg-[#1a1a24] text-white hover:bg-[#2d2d3a] border-[#2d2d3a]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{minutes}</span>
                    <span className="text-sm font-normal">minutes</span>
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
            className={`h-16 text-lg font-semibold rounded-2xl border transition-all ${
              timerDuration === null
                ? 'bg-purple-600 text-white hover:bg-purple-500 border-purple-600'
                : 'bg-[#1a1a24] text-white hover:bg-[#2d2d3a] border-[#2d2d3a]'
            }`}
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

