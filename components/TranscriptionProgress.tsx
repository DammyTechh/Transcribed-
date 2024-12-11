"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranscriptionStore } from "@/hooks/use-transcription-store";

export default function TranscriptionProgress() {
  const { usedMinutes, totalFreeMinutes } = useTranscriptionStore();
  const progressPercentage = (usedMinutes / totalFreeMinutes) * 100;
  const remainingMinutes = totalFreeMinutes - usedMinutes;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Free Trial Status</h3>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {remainingMinutes.toFixed(1)} minutes free transcription remaining
        </p>
        <Progress value={progressPercentage} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{usedMinutes.toFixed(1)} min used</span>
          <span>{totalFreeMinutes} min total</span>
        </div>
      </div>
    </Card>
  );
}