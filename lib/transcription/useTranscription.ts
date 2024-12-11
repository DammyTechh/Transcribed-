"use client";

import { useState, useCallback, useRef } from 'react';
import { TranscriptionManager } from './core/transcription-manager';
import type { TranscriptionResult } from './types';

export function useTranscription() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const managerRef = useRef<TranscriptionManager | null>(null);

  const initializeManager = useCallback(() => {
    if (!managerRef.current) {
      managerRef.current = new TranscriptionManager();
      managerRef.current.onProgress(setProgress);
      managerRef.current.onError(setError);
    }
    return managerRef.current;
  }, []);

  const transcribeAudio = useCallback(async (
    audioFile: File,
    onInterimResult?: (text: string) => void
  ): Promise<TranscriptionResult> => {
    try {
      setIsTranscribing(true);
      setError(null);
      setProgress(0);

      const manager = initializeManager();
      return await manager.transcribeFile(audioFile, onInterimResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transcription failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsTranscribing(false);
    }
  }, [initializeManager]);

  const exportTranscription = useCallback(async (
    transcription: { text: string; segments?: any[] },
    format: 'txt' | 'docx'
  ): Promise<string> => {
    const manager = initializeManager();
    return manager.exportTranscription(transcription, format);
  }, [initializeManager]);

  return {
    transcribeAudio,
    exportTranscription,
    isTranscribing,
    progress,
    error
  };
}