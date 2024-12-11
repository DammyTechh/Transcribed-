import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // For now, we'll simulate a successful upload
    // Later, we'll implement the actual transcription service integration
    return NextResponse.json({
      id: 'mock-transcription-id',
      status: 'processing',
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Transcription error:', error);
    
    return NextResponse.json(
      { message: 'Error processing transcription request' },
      { status: 500 }
    );
  }
}