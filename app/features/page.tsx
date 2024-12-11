"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  FileAudio,
  Mic,
  Download,
  Gauge,
  Languages,
  Lock,
  Clock,
  Smartphone,
  Cloud,
  Zap
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: FileAudio,
      title: "Multiple File Formats",
      description: "Support for MP3, WAV, M4A, and AAC audio files"
    },
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "Live transcription for meetings and conversations"
    },
    {
      icon: Download,
      title: "Export Options",
      description: "Download transcripts in Word, PPT, or plain text formats"
    },
    {
      icon: Gauge,
      title: "High Accuracy",
      description: "Advanced AI ensuring 99% transcription accuracy"
    },
    {
      icon: Languages,
      title: "Multiple Languages",
      description: "Support for various languages and accents"
    },
    {
      icon: Lock,
      title: "Secure Processing",
      description: "End-to-end encryption for all your audio files"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick turnaround times for all file sizes"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Fully responsive design for all devices"
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Secure storage for your transcriptions"
    },
    {
      icon: Zap,
      title: "API Access",
      description: "Developer API for custom integrations"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Powerful Features for Perfect Transcription
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to convert speech to text efficiently and accurately
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Need More Features?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're constantly adding new features to improve your transcription experience.
          Contact us to request specific features or learn more about our enterprise solutions.
        </p>
      </motion.div>
    </div>
  );
}