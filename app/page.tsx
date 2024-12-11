"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileAudio, Mic, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: FileAudio,
      title: "File Upload",
      description: "Drag & drop or import audio files for instant transcription",
    },
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "Live transcription for meetings and conversations",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export transcriptions to Word, PPT, or plain text",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="container flex flex-col items-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          >
            Transform Speech to Text with
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-primary"
            > Precision</motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Professional transcription service powered by advanced algorithms. Perfect for meetings,
            interviews, and content creation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Transcribing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow w-full">
                <feature.icon className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container flex flex-col items-center py-24 bg-muted/50 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Simple steps to get your transcription done quickly and accurately
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 max-w-5xl mx-auto"
        >
          {[
            {
              step: "1",
              title: "Upload Your Audio",
              description: "Drag & drop your file or record directly",
            },
            {
              step: "2",
              title: "Smart Processing",
              description: "Our algorithms transcribe your audio with high accuracy",
            },
            {
              step: "3",
              title: "Download Results",
              description: "Get your transcription in your preferred format",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex flex-col items-center text-center space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold"
              >
                {item.step}
              </motion.div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Preview */}
      <section className="container flex flex-col items-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Start Transcribing Today
          </h2>
          <p className="text-muted-foreground">
            Try it free for 10 minutes of audio. Upgrade for unlimited access.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" asChild>
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}