"use client";

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileAudio, AlertCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useTranscriptionStore } from '@/hooks/use-transcription-store';
import { useTranscription } from '@/lib/transcription/useTranscription';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_TYPES = {
  'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.aiff'],
  'video/mp4': ['.mp4'],
};

export default function TranscriptionUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { addTranscription, updateTranscription } = useTranscriptionStore();
  const { transcribeAudio, isTranscribing, progress } = useTranscription();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    setCurrentTranscription('');

    try {
      // Create audio URL for playback
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setSelectedFile(file);
      
      // Create audio element
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Clear interval after "upload"
      setTimeout(() => {
        clearInterval(progressInterval);
        setIsUploading(false);
        setUploadProgress(100);
        
        toast({
          title: "File Uploaded",
          description: "Click Play to start transcription",
        });
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setError(errorMessage);
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const togglePlayback = async () => {
    if (!selectedFile || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsPlaying(true);
        
        // Create initial transcription entry
        const transcriptionId = addTranscription({
          name: selectedFile.name,
          status: 'processing',
          progress: 0,
          duration: 0,
          created_at: new Date().toISOString(),
        });

        // Start audio playback
        audioRef.current.play();

        // Process the transcription
        const result = await transcribeAudio(selectedFile, (text) => {
          setCurrentTranscription(prev => prev + ' ' + text);
        });

        // Update the transcription with results
        updateTranscription(transcriptionId, {
          status: 'completed',
          progress: 100,
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
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    disabled: isUploading || isTranscribing,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const currentProgress = isUploading ? uploadProgress : isTranscribing ? progress : 0;

  return (
    <div className="space-y-4">
      <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />
      
      {!selectedFile ? (
        <Card
          {...getRootProps()}
          className={`p-12 text-center cursor-pointer border-dashed transition-colors duration-200 ${
            isDragActive ? 'border-primary bg-primary/5' : ''
          } ${isUploading ? 'pointer-events-none' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <Upload className={`mx-auto h-12 w-12 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
            <div>
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop the file here' : 'Drag & drop audio files here, or click to select'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports MP3, WAV, M4A, AAC, OGG, AIFF (max 500MB)
              </p>
            </div>
            <Button variant="outline" className="mt-4">
              Select File
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileAudio className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleMute}
                    className="shrink-0"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={togglePlayback}
                    disabled={isTranscribing && !isPlaying}
                    variant={isPlaying ? "secondary" : "default"}
                    className="w-[140px]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Transcription
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {(isUploading || isTranscribing) && (
                <div>
                  <Progress value={currentProgress} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentProgress}% {isUploading ? 'uploaded' : 'transcribed'}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {(isPlaying || currentTranscription) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Live Transcription</h3>
              <Textarea
                value={currentTranscription}
                readOnly
                className="min-h-[200px] font-mono"
                placeholder="Transcription will appear here as the audio plays..."
              />
            </Card>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}