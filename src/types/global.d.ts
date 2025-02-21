export {};

declare global {
  interface Window {
    ImageDecoder: {
      new (config: { data: any; type: string }): {
        decode(options: { frameIndex: number }): Promise<any>;
        tracks: { selectedTrack: any };
        complete: boolean;
      };
    };
  }
}
