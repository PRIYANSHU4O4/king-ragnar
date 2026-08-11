// HTML5 Audio Player for Interactive Street Beats (/Ulтʀɑ Iиsтɨиcт  KONKRETE.mp3)
class KrumpAudioBeat {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      // Preserving exact filename with Unicode characters via encodeURI
      const audioUrl = encodeURI('/Ulтʀɑ Iиsтɨиcт  KONKRETE.mp3');
      this.audio = new Audio(audioUrl);
      this.audio.loop = false;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners(true);
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners(false);
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        if (this.audio) {
          this.audio.currentTime = 0;
        }
        this.notifyListeners(false);
      });

      this.audio.addEventListener('error', (e) => {
        console.error('Interactive Street Beats audio error:', e);
        this.isPlaying = false;
        this.notifyListeners(false);
      });
    }
    return this.audio;
  }

  public subscribe(callback: (playing: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach(fn => fn(playing));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    const audio = this.getAudio();
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch((err) => {
      console.error('Audio playback failed:', err);
      this.isPlaying = false;
    });
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    const audio = this.getAudio();
    if (!audio.paused && !audio.ended) {
      audio.pause();
      this.isPlaying = false;
      return false;
    } else {
      audio.play().then(() => {
        this.isPlaying = true;
      }).catch((err) => {
        console.error('Audio playback failed:', err);
        this.isPlaying = false;
      });
      return true;
    }
  }
}

export const krumpBeatPlayer = new KrumpAudioBeat();
