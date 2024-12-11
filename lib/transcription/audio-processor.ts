"use client";

import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { SPEECH_CONFIG } from './config';

export class AudioProcessor {
  private speechConfig: sdk.SpeechConfig;
  private audioConfig: sdk.AudioConfig | null = null;

  constructor() {
    if (!SPEECH_CONFIG.key || !SPEECH_CONFIG.region) {
      throw new Error('Speech configuration is missing required values');
    }

    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      SPEECH_CONFIG.key,
      SPEECH_CONFIG.region
    );
    this.speechConfig.speechRecognitionLanguage = SPEECH_CONFIG.language;
  }

  public async transcribeFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          if (!event.target?.result) {
            throw new Error('Failed to read file');
          }

          const arrayBuffer = event.target.result as ArrayBuffer;
          const pushStream = sdk.AudioInputStream.createPushStream();
          
          // Convert ArrayBuffer to Uint8Array and push to stream
          const audioData = new Uint8Array(arrayBuffer);
          pushStream.write(audioData);
          pushStream.close();
          
          this.audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
          const recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
          
          let transcription = '';
          
          recognizer.recognized = (s, e) => {
            if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
              transcription += e.result.text + ' ';
            }
          };

          recognizer.recognizing = (s, e) => {
            if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
              console.log(`RECOGNIZING: ${e.result.text}`);
            }
          };
          
          recognizer.canceled = (s, e) => {
            if (e.reason === sdk.CancellationReason.Error) {
              reject(new Error(`Error: ${e.errorDetails}`));
            }
          };
          
          recognizer.sessionStarted = () => {
            console.log('Session started');
          };

          recognizer.sessionStopped = () => {
            console.log('Session stopped');
            recognizer.close();
          };
          
          recognizer.startContinuousRecognitionAsync(
            () => console.log('Recognition started'),
            error => {
              console.error('Recognition error:', error);
              reject(error);
            }
          );

          // Stop after processing the file
          setTimeout(() => {
            recognizer.stopContinuousRecognitionAsync(
              () => {
                resolve(transcription.trim());
              },
              error => {
                console.error('Stop recognition error:', error);
                reject(error);
              }
            );
          }, Math.min(file.size / 16000, 300000)); // 5 minutes max
        } catch (error) {
          console.error('Transcription error:', error);
          reject(error);
        }
      };
      
      reader.onerror = error => {
        console.error('File reading error:', error);
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }
}