export const SPEECH_CONFIG = {
  key: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY || '',
  key2: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY_2 || '',
  region: process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || '',
  endpoint: process.env.NEXT_PUBLIC_AZURE_SPEECH_ENDPOINT || '',
  language: 'en-US',
  outputFormat: 'detailed',
};

export const AUDIO_CONFIG = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
};