'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { audioManager } from '@/lib/audio-manager';
import { Sound, TimerDuration } from '@/types/sound';
import { SOUNDS } from '@/lib/sounds-data';

interface AudioContextType {
  currentSound: Sound | null;
  isPlaying: boolean;
  timerDuration: TimerDuration;
  timeElapsed: number; // en secondes
  playSound: (sound: Sound) => void;
  togglePlayPause: () => void;
  setTimer: (duration: TimerDuration) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // Default to "Pluie Douce" (rain sound)
  const defaultSound = SOUNDS.find(s => s.id === 'rain') || SOUNDS[0];
  const [currentSound, setCurrentSound] = useState<Sound | null>(defaultSound);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerDuration, setTimerDuration] = useState<TimerDuration>(null);
  const [timerTimeout, setTimerTimeout] = useState<NodeJS.Timeout | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // en secondes
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const playSound = useCallback((sound: Sound) => {
    audioManager.play(sound.audioUrl, sound.id);
    setCurrentSound(sound);
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioManager.pause();
      setIsPlaying(false);
    } else {
      if (currentSound) {
        audioManager.resume();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, currentSound]);

  const setTimer = useCallback((duration: TimerDuration) => {
    // Clear existing timer and interval
    if (timerTimeout) {
      clearTimeout(timerTimeout);
      setTimerTimeout(null);
    }
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    setTimerDuration(duration);
    setTimeElapsed(0);

    // Set new timer if not infinite
    if (duration !== null) {
      // Update elapsed time every second
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);

      // Stop after duration
      const timeout = setTimeout(() => {
        audioManager.pause();
        setIsPlaying(false);
        setTimerDuration(null);
        setTimeElapsed(0);
        if (interval) clearInterval(interval);
      }, duration * 60 * 1000);

      setTimerTimeout(timeout);
    }
  }, [timerTimeout, timerInterval]);

  return (
    <AudioContext.Provider
      value={{
        currentSound,
        isPlaying,
        timerDuration,
        timeElapsed,
        playSound,
        togglePlayPause,
        setTimer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

