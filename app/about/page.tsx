"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Headphones, Users, Award, Clock } from "lucide-react";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Users"
    },
    {
      icon: Clock,
      value: "1M+",
      label: "Minutes Transcribed"
    },
    {
      icon: Award,
      value: "99%",
      label: "Accuracy Rate"
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      {/* Hero Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="text-center space-y-6 mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About D.Tech <span className="text-primary">Transcribe</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transforming the way businesses and individuals handle audio transcription
          through cutting-edge AI technology.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="p-6 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission & Vision */}
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            To make accurate, efficient, and accessible transcription services available
            to everyone. We believe in breaking down language barriers and making
            content more accessible through innovative technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-muted-foreground">
            To become the leading transcription service provider in Africa,
            revolutionizing how businesses and individuals convert speech to text
            through AI-powered solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Advanced AI Technology",
                description: "State-of-the-art speech recognition for maximum accuracy"
              },
              {
                title: "Fast Turnaround",
                description: "Get your transcriptions in minutes, not hours"
              },
              {
                title: "Multiple Export Formats",
                description: "Download your transcripts in various formats"
              },
              {
                title: "Affordable Pricing",
                description: "Competitive rates with flexible payment options"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}