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

    // 🎯 Tracking Google Analytics 4
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'play_sound', {
        sound_name: sound.name,
        sound_id: sound.id,
        sound_is_premium: sound.isPremium,
        event_category: 'engagement',
        event_label: `Play: ${sound.name}`,
      });
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioManager.pause();
      setIsPlaying(false);

      // 🎯 Tracking Google Analytics 4 - Pause
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined' && currentSound) {
        (window as any).gtag('event', 'pause_sound', {
          sound_name: currentSound.name,
          sound_id: currentSound.id,
          event_category: 'engagement',
          event_label: `Pause: ${currentSound.name}`,
        });
      }
    } else {
      if (currentSound) {
        // Si le son n'a jamais été joué, on le lance avec play()
        // Sinon on reprend avec resume()
        const currentHowl = audioManager.getCurrentHowl();
        const isCurrentSoundLoaded = currentHowl && audioManager.getCurrentSoundId() === currentSound.id;
        
        if (!isCurrentSoundLoaded) {
          audioManager.play(currentSound.audioUrl, currentSound.id);
        } else {
          audioManager.resume();
        }
        setIsPlaying(true);

        // 🎯 Tracking Google Analytics 4 - Play/Resume
        if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'resume_sound', {
            sound_name: currentSound.name,
            sound_id: currentSound.id,
            event_category: 'engagement',
            event_label: `Resume: ${currentSound.name}`,
          });
        }
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

    // 🎯 Tracking Google Analytics 4 - Timer
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'set_timer', {
        timer_duration: duration,
        timer_type: duration === null ? 'infinite' : 'custom',
        event_category: 'engagement',
        event_label: duration === null ? 'Infinite' : `${duration} minutes`,
      });
    }

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

        // 🎯 Tracking GA4 - Timer completed
        if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'timer_completed', {
            timer_duration: duration,
            event_category: 'engagement',
            event_label: `Timer completed: ${duration} minutes`,
          });
        }
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

