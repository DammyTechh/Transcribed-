"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileAudio, Download, RefreshCw, MoreVertical, Trash2 } from "lucide-react";
import { useTranscriptionStore, Transcription } from "@/hooks/use-transcription-store";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useTranscription } from "@/lib/transcription/useTranscription";

const exportFormats = ["txt", "docx"] as const;
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export default function TranscriptionHistory() {
  const { transcriptions, removeTranscription } = useTranscriptionStore();
  const { toast } = useToast();
  const { exportTranscription } = useTranscription();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "processing":
        return "text-blue-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleExport = async (transcription: Transcription, format: typeof exportFormats[number]) => {
    try {
      if (!transcription.text) {
        throw new Error('No transcription text available');
      }

      const content = await exportTranscription({ text: transcription.text }, format);
      
      // Create blob and trigger download
      const blob = new Blob([content], { 
        type: format === 'docx' 
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcription-${transcription.name}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Transcription exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export transcription",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    removeTranscription(id);
    toast({
      title: "Transcription Deleted",
      description: "The transcription has been removed from history",
    });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {transcriptions.map((transcription) => (
          <motion.div
            key={transcription.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <Card className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <FileAudio className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{transcription.name}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={getStatusColor(transcription.status)}>
                        {transcription.status.charAt(0).toUpperCase() + transcription.status.slice(1)}
                      </span>
                      <span className="text-muted-foreground">
                        {formatDistanceToNow(new Date(transcription.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>

                {transcription.status === "processing" && (
                  <div className="w-full md:w-1/3">
                    <Progress value={transcription.progress} />
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {transcription.progress}% processed
                    </p>
                  </div>
                )}

                {transcription.status === "completed" && (
                  <div className="flex items-center gap-2">
                    <Select onValueChange={(lang) => console.log("Selected language:", lang)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Translate to..." />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {exportFormats.map((format) => (
                          <DropdownMenuItem 
                            key={format}
                            onClick={() => handleExport(transcription, format)}
                          >
                            Export as {format.toUpperCase()}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          if (transcription.text) {
                            navigator.clipboard.writeText(transcription.text);
                            toast({
                              title: "Copied!",
                              description: "Transcription copied to clipboard",
                            });
                          }
                        }}>
                          Copy Text
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(transcription.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {transcription.status === "failed" && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-red-500">{transcription.error}</p>
                  </div>
                )}
              </div>

              {transcription.status === "completed" && transcription.text && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{transcription.text}</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}

        {transcriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileAudio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transcriptions yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start recording or upload an audio file to begin
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}