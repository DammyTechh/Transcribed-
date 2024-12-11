"use client";

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Upload, AlertCircle, Mic, MicOff } from 'lucide-react';
import { useTranscriptionStore } from '@/hooks/use-transcription-store';
import { TranscriptionManager } from '@/lib/transcription/core/transcription-manager';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_TYPES = {
  'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.aiff'],
  'video/mp4': ['.mp4'],
};

export default function TranscriptionComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const transcriptionManagerRef = useRef<TranscriptionManager | null>(null);
  const { toast } = useToast();
  const { addTranscription } = useTranscriptionStore();

  const initializeTranscriptionManager = useCallback(() => {
    if (!transcriptionManagerRef.current) {
      transcriptionManagerRef.current = new TranscriptionManager();
    }
    return transcriptionManagerRef.current;
  }, []);

  const handleRecording = async () => {
    try {
      if (isRecording) {
        if (transcriptionManagerRef.current) {
          await transcriptionManagerRef.current.stopRecording();
          setIsRecording(false);
          
          if (currentTranscription.trim()) {
            addTranscription({
              name: 'Voice Recording',
              status: 'completed',
              progress: 100,
              duration: 0,
              created_at: new Date().toISOString(),
              text: currentTranscription.trim()
            });

            toast({
              title: "Recording Saved",
              description: "Your recording has been transcribed and saved.",
            });
          }
        }
      } else {
        const manager = initializeTranscriptionManager();
        await manager.startRecording((text) => {
          setCurrentTranscription(text);
        });
        setIsRecording(true);
        setCurrentTranscription('');
        
        toast({
          title: "Recording Started",
          description: "Speak clearly into your microphone",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Recording failed';
      setError(errorMessage);
      setIsRecording(false);
      toast({
        title: "Recording Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleFileTranscription = async (file: File) => {
    try {
      setError(null);
      setIsProcessing(true);
      setCurrentTranscription('');

      const manager = initializeTranscriptionManager();
      const result = await manager.transcribeFile(file, (text) => {
        setCurrentTranscription(text);
      });

      addTranscription({
        name: file.name,
        status: 'completed',
        progress: 100,
        duration: 0,
        created_at: new Date().toISOString(),
        text: result.text,
      });

      toast({
        title: "Transcription Complete",
        description: "Your file has been successfully transcribed.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transcription failed';
      setError(errorMessage);
      toast({
        title: "Transcription Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    await handleFileTranscription(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    disabled: isProcessing || isRecording,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    noClick: true,
  });

  return (
    <div className="space-y-4" {...getRootProps()}>
      <Card className="p-6">
        <div className="relative">
          <Textarea
            value={currentTranscription}
            readOnly
            className="min-h-[200px] pr-24 font-mono"
            placeholder={
              isRecording 
                ? "Listening... Speak clearly into your microphone"
                : "Click the microphone to start recording or import an audio file..."
            }
          />
          <div className="absolute right-3 top-3 flex items-center gap-2">
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              onClick={handleRecording}
              disabled={isProcessing}
              className={isRecording ? "animate-pulse" : ""}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <div className="relative">
              <input {...getInputProps()} />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = Object.values(ACCEPTED_TYPES).flat().join(',');
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files?.length) onDrop([files[0]]);
                  };
                  input.click();
                }}
                disabled={isRecording || isProcessing}
                title="Import Audio File"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}