"use client";

import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SPEECH_CONFIG } from './config';

export class SpeechRecognitionService {
  private recognizer: sdk.SpeechRecognizer | null = null;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
          SPEECH_CONFIG.key,
          SPEECH_CONFIG.region
        );
        speechConfig.speechRecognitionLanguage = SPEECH_CONFIG.language;
        
        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        this.isInitialized = true;
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
      }
    }
  }

  public isSupported(): boolean {
    return this.isInitialized;
  }

  public start(): void {
    if (this.isInitialized && this.recognizer) {
      this.recognizer.startContinuousRecognitionAsync();
    }
  }

  public stop(): void {
    if (this.isInitialized && this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync();
    }
  }

  public onResult(callback: (text: string, isFinal: boolean) => void): void {
    if (this.isInitialized && this.recognizer) {
      this.recognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          callback(e.result.text, true);
        }
      };

      this.recognizer.recognizing = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
          callback(e.result.text, false);
        }
      };
    }
  }

  public onEnd(callback: () => void): void {
    if (this.isInitialized && this.recognizer) {
      this.recognizer.sessionStopped = callback;
    }
  }

  public onError(callback: (error: any) => void): void {
    if (this.isInitialized && this.recognizer) {
      this.recognizer.canceled = (s, e) => {
        if (e.reason === sdk.CancellationReason.Error) {
          callback(e.errorDetails);
        }
      };
    }
  }

  public dispose(): void {
    if (this.recognizer) {
      this.recognizer.close();
    }
  }
}