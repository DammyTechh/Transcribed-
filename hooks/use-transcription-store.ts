"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Transcription {
  id: string;
  name: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  duration: number;
  created_at: string;
  text?: string;
  error?: string;
}

interface TranscriptionState {
  transcriptions: Transcription[];
  usedMinutes: number;
  totalFreeMinutes: number;
  isProcessing: boolean;
  addTranscription: (transcription: Omit<Transcription, "id">) => string;
  updateTranscription: (id: string, updates: Partial<Transcription>) => void;
  removeTranscription: (id: string) => void;
  addUsedMinutes: (minutes: number) => void;
  setProcessing: (status: boolean) => void;
}

export const useTranscriptionStore = create<TranscriptionState>()(
  persist(
    (set, get) => ({
      transcriptions: [],
      usedMinutes: 0,
      totalFreeMinutes: 10,
      isProcessing: false,

      addTranscription: (transcription) => {
        const id = uuidv4();
        set((state) => ({
          transcriptions: [
            { ...transcription, id },
            ...state.transcriptions,
          ],
        }));
        return id;
      },

      updateTranscription: (id, updates) =>
        set((state) => ({
          transcriptions: state.transcriptions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      removeTranscription: (id) =>
        set((state) => ({
          transcriptions: state.transcriptions.filter((t) => t.id !== id),
        })),

      addUsedMinutes: (minutes) =>
        set((state) => ({
          usedMinutes: state.usedMinutes + minutes,
        })),

      setProcessing: (status) =>
        set(() => ({
          isProcessing: status,
        })),
    }),
    {
      name: 'transcription-storage',
    }
  )
);