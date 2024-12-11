"use client";

import { AudioProcessor } from '../audio-processor';
import { SpeechRecognitionService } from '../speech-recognition';
import { TranscriptionResult } from '../types';
import { AudioContextManager } from './audio-context';

export class TranscriptionManager {
  private audioProcessor: AudioProcessor;
  private speechRecognition: SpeechRecognitionService;
  private onProgressCallback: ((progress: number) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private currentText: string = '';

  constructor() {
    this.audioProcessor = new AudioProcessor();
    this.speechRecognition = new SpeechRecognitionService();
  }

  public onProgress(callback: (progress: number) => void): void {
    this.onProgressCallback = callback;
  }

  public onError(callback: (error: string) => void): void {
    this.onErrorCallback = callback;
  }

  public async startRecording(onInterimResult?: (text: string) => void): Promise<void> {
    try {
      const hasPermission = await AudioContextManager.requestPermissions();
      if (!hasPermission) {
        throw new Error('Microphone permission denied');
      }

      const stream = await AudioContextManager.createMediaStream();
      if (!stream) {
        throw new Error('Failed to create media stream');
      }

      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.currentText = '';

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000); // Collect data every second

      // Initialize speech recognition
      if (this.speechRecognition.isSupported()) {
        this.speechRecognition.start();
        this.speechRecognition.onResult((text, isFinal) => {
          if (isFinal) {
            this.currentText += ' ' + text;
            if (onInterimResult) {
              onInterimResult(this.currentText.trim());
            }
          } else if (onInterimResult) {
            onInterimResult(this.currentText + ' ' + text);
          }
        });
      } else {
        throw new Error('Speech recognition is not supported in this browser');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      this.handleError(errorMessage);
      throw error;
    }
  }

  public async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioChunks = [];
        this.currentText = '';
        
        if (this.speechRecognition.isSupported()) {
          this.speechRecognition.stop();
        }
        
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
      const tracks = this.mediaRecorder.stream.getTracks();
      tracks.forEach(track => track.stop());
    });
  }

  public async transcribeFile(
    file: File,
    onInterimResult?: (text: string) => void
  ): Promise<TranscriptionResult> {
    try {
      this.updateProgress(0);
      
      if (!file) {
        throw new Error('No file provided');
      }

      if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
        throw new Error('Invalid file type. Please upload an audio or video file.');
      }

      const text = await this.audioProcessor.transcribeFromFile(file);
      this.updateProgress(100);

      if (onInterimResult) {
        onInterimResult(text);
      }

      return {
        text,
        confidence: 0.95,
        segments: [{
          start: 0,
          end: 0,
          text
        }]
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transcription failed';
      this.handleError(errorMessage);
      throw error;
    }
  }

  private updateProgress(progress: number): void {
    if (this.onProgressCallback) {
      this.onProgressCallback(progress);
    }
  }

  private handleError(error: string): void {
    if (this.onErrorCallback) {
      this.onErrorCallback(error);
    }
  }
}