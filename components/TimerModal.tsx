'use client';

import { X, Clock } from 'lucide-react';
import { TimerDuration } from '@/types/sound';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTimer: TimerDuration;
  onSelectTimer: (duration: TimerDuration) => void;
}

export default function TimerModal({
  isOpen,
  onClose,
  currentTimer,
  onSelectTimer,
}: TimerModalProps) {
  if (!isOpen) return null;

  const timerOptions: { label: string; value: TimerDuration }[] = [
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
    { label: '60 minutes', value: 60 },
    { label: 'Infini', value: null },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-50 pb-24">
      <div className="bg-slate-900 rounded-t-3xl w-full max-w-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-slate-100">Minuteur</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="space-y-3">
          {timerOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                onSelectTimer(option.value);
                onClose();
              }}
              className={`w-full p-5 rounded-2xl text-left font-medium transition-all ${
                currentTimer === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

