import { expose } from 'comlink';
import { pipeline } from '@xenova/transformers';

let transcriber = null;

const api = {
  async transcribeAudio(audioData: ArrayBuffer) {
    try {
      if (!transcriber) {
        transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
      }

      const result = await transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: true,
      });

      return {
        text: result.text,
        chunks: result.chunks,
      };
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error(error instanceof Error ? error.message : 'Transcription failed');
    }
  },

  async processRealTimeAudio(audioChunk: Float32Array) {
    try {
      if (!transcriber) {
        transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
      }

      const result = await transcriber(audioChunk, {
        chunk_length_s: 5,
        return_timestamps: true,
      });

      return {
        text: result.text,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Real-time transcription error:', error);
      throw new Error(error instanceof Error ? error.message : 'Real-time transcription failed');
    }
  }
};

expose(api);