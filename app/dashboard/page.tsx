"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptionComponent from "@/components/TranscriptionComponent";
import TranscriptionHistory from "@/components/TranscriptionHistory";
import TranscriptionProgress from "@/components/TranscriptionProgress";
import PaymentButton from "@/components/PaymentButton";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transcription Dashboard</h1>
        </div>

        <Tabs defaultValue="transcribe" className="space-y-8">
          <TabsList>
            <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="transcribe" className="space-y-4">
            <TranscriptionComponent />
            <TranscriptionProgress />
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Upgrade to Pro</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get unlimited transcription minutes and advanced features
              </p>
              <PaymentButton 
                amount={5000}
                email="user@example.com"
                onSuccess={() => {
                  // Handle successful payment
                }}
              />
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <TranscriptionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}