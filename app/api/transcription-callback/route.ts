import { NextResponse } from 'next/server';
import { useTranscriptionStore } from '@/hooks/use-transcription-store';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { transcription_id, status, progress } = data;

    // Update transcription status in store
    useTranscriptionStore.getState().updateTranscription(transcription_id, {
      status,
      progress: progress || 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Transcription callback error:', error);
    return NextResponse.json(
      { message: 'Error processing callback' },
      { status: 500 }
    );
  }
}