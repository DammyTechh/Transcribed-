"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: `We take the protection of your data seriously. All audio files and transcriptions are encrypted 
      using industry-standard protocols. We implement appropriate technical and organizational measures to ensure 
      a level of security appropriate to the risk.`
    },
    {
      icon: Lock,
      title: "Information Security",
      content: `Your audio files and transcriptions are stored securely and are only accessible to you. 
      We use advanced encryption methods to protect your data during transmission and storage. Our servers 
      are protected by enterprise-grade security measures.`
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: `We only collect and use information that's necessary to provide our transcription services. 
      This includes your account information, uploaded audio files, and resulting transcriptions. We never 
      share or sell your personal information to third parties.`
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: `You have the right to access, correct, or delete your personal data at any time. You can also 
      request a copy of your data or ask us to restrict its processing. Contact us at petersdamilare5@gmail.com 
      to exercise these rights.`
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground">
          Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
        </p>
      </motion.div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 space-y-6"
        >
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our privacy policy or how we handle your data, 
            please contact us at:
          </p>
          <div className="space-y-2">
            <p>Email: petersdamilare5@gmail.com</p>
            <p>Phone: +234 813 457 0370</p>
            <p>Address: Ibadan, Oyo State Nigeria</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground mt-12"
        >
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
      </div>
    </div>
  );
}