declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      loop?: boolean;
      volume?: number;
      html5?: boolean;
      onload?: () => void;
      onloaderror?: (id: number, error: any) => void;
      onplay?: () => void;
      onend?: () => void;
    });

    play(): number;
    pause(): this;
    stop(): this;
    volume(vol?: number): number | this;
    playing(): boolean;
    unload(): void;
  }
}

