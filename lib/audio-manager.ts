import { Howl } from 'howler';

class AudioManager {
  private currentSound: Howl | null = null;
  private currentSoundId: string | null = null;

  play(audioUrl: string, soundId: string) {
    // Stop current sound if playing
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound.unload();
    }

    // Create new Howl instance
    this.currentSound = new Howl({
      src: [audioUrl],
      loop: true,
      volume: 0.7,
      html5: true, // Better for streaming
    });

    this.currentSoundId = soundId;
    this.currentSound.play();
  }

  pause() {
    if (this.currentSound) {
      this.currentSound.pause();
    }
  }

  resume() {
    if (this.currentSound) {
      this.currentSound.play();
    }
  }

  stop() {
    if (this.currentSound) {
      this.currentSound.stop();
    }
  }

  setVolume(volume: number) {
    if (this.currentSound) {
      this.currentSound.volume(volume);
    }
  }

  isPlaying(): boolean {
    return this.currentSound ? this.currentSound.playing() : false;
  }

  getCurrentSoundId(): string | null {
    return this.currentSoundId;
  }

  getCurrentHowl(): Howl | null {
    return this.currentSound;
  }
}

// Singleton instance
export const audioManager = new AudioManager();

