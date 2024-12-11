"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Loader2, Copy, Download, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranscriptionStore } from '@/hooks/use-transcription-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LiveTranscription() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptParts, setTranscriptParts] = useState<string[]>([]);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { addTranscription } = useTranscriptionStore();

  // Combine all transcript parts and interim transcript
  const fullTranscript = [...transcriptParts, interimTranscript].join('\n').trim();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcriptText + ' ';
          } else {
            interimText += transcriptText;
          }
        }

        if (finalText) {
          setTranscriptParts(prev => [...prev, finalText.trim()]);
          setInterimTranscript('');
        } else {
          setInterimTranscript(interimText);
        }

        // Scroll to bottom of textarea
        if (transcriptRef.current) {
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error('Recognition error:', event.error);
          toast({
            title: "Recognition Error",
            description: `Error: ${event.error}. Please try again.`,
            variant: "destructive",
          });
          stopRecording();
        }
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          // Automatically restart recognition
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.error('Failed to restart recognition:', error);
          }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, isRecording]);

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Please ensure you have granted microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript('');

      if (fullTranscript) {
        addTranscription({
          id: Date.now().toString(),
          name: 'Live Recording',
          status: 'completed',
          progress: 100,
          duration: 0,
          created_at: new Date().toISOString(),
          text: fullTranscript,
        });

        toast({
          title: "Recording Saved",
          description: "Your transcription has been saved to history.",
        });
      }
    }
  };

  const clearTranscript = () => {
    setTranscriptParts([]);
    setInterimTranscript('');
    toast({
      title: "Transcript Cleared",
      description: "The transcription has been cleared.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullTranscript);
      toast({
        title: "Copied!",
        description: "Transcription copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  const downloadTranscription = (format: 'txt' | 'docx') => {
    const text = fullTranscript;
    const blob = new Blob([text], { 
      type: format === 'docx' 
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: `Transcription downloaded as ${format.toUpperCase()}`,
    });
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Transcription</h3>
        <div className="flex gap-2">
          {fullTranscript && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Download transcription"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => downloadTranscription('txt')}>
                    Download as TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadTranscription('docx')}>
                    Download as DOCX
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={clearTranscript}
                title="Clear transcript"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            className="w-32"
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Record
              </>
            )}
          </Button>
        </div>
      </div>

      {isRecording && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Recording in progress...</span>
        </div>
      )}

      <Textarea
        ref={transcriptRef}
        value={fullTranscript}
        readOnly
        className="min-h-[300px] resize-none font-mono leading-relaxed whitespace-pre-wrap"
        placeholder={isRecording ? "Speak now..." : "Click Record to start transcribing"}
      />
    </Card>
  );
}