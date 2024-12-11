"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";

export default function CareersPage() {
  const positions = [
    {
      title: "Senior AI Engineer",
      location: "Ibadan, Nigeria (Hybrid)",
      type: "Full-time",
      department: "Engineering",
      description: "Lead the development of our AI-powered transcription engine.",
      requirements: [
        "5+ years of experience in ML/AI",
        "Strong Python skills",
        "Experience with speech recognition",
        "MSc/PhD in Computer Science or related field"
      ]
    },
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description: "Build beautiful, responsive user interfaces for our transcription platform.",
      requirements: [
        "3+ years of React experience",
        "Experience with Next.js",
        "Strong TypeScript skills",
        "Eye for design and user experience"
      ]
    },
    {
      title: "Product Manager",
      location: "Ibadan, Nigeria",
      type: "Full-time",
      department: "Product",
      description: "Shape the future of our transcription products.",
      requirements: [
        "4+ years of product management experience",
        "Experience with AI/ML products",
        "Strong analytical skills",
        "Excellent communication abilities"
      ]
    }
  ];

  const benefits = [
    "Competitive salary",
    "Health insurance",
    "Remote work options",
    "Professional development",
    "Stock options",
    "Paid time off"
  ];

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Join Our Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Help us revolutionize speech-to-text technology in Africa
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
        <div className="space-y-6">
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{position.title}</h3>
                      <Badge variant="secondary">{position.department}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {position.type}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{position.description}</p>
                    <div className="space-y-1">
                      <p className="font-medium">Requirements:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {position.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button className="md:self-start" asChild>
                    <a href={`mailto:petersdamilare5@gmail.com?subject=Application for ${position.title}`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">Benefits & Perks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{benefit}</span>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}