export interface TranscriptionResult {
  text: string;
  confidence?: number;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface TranscriptionError {
  error: string;
}

export type TranscriptionResponse = TranscriptionResult | TranscriptionError;

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}