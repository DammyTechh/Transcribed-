"use client";

export const initializeAudioContext = () => {
  if (typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }
  return null;
};

export const checkBrowserSupport = () => {
  if (typeof window === 'undefined') return false;
  
  const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);
  const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  
  return hasAudioContext && hasGetUserMedia;
};

export const createAudioStream = async () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    return null;
  }
};