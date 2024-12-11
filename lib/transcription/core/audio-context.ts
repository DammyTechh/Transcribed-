"use client";

export class AudioContextManager {
  private static instance: AudioContext | null = null;

  static getInstance(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    
    if (!this.instance) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.instance = new AudioContextClass();
    }
    
    return this.instance;
  }

  static async requestPermissions(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  }

  static async createMediaStream(): Promise<MediaStream | null> {
    try {
      return await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
    } catch (error) {
      console.error('Failed to create media stream:', error);
      return null;
    }
  }
}