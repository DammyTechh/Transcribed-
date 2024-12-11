"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollText, Shield, Scale, Clock } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: ScrollText,
      title: "Service Terms",
      content: `By using D.Tech Transcribe, you agree to these terms. Our service provides audio transcription 
      capabilities with a free tier of 10 minutes and paid plans for additional usage. We reserve the right to 
      modify these terms at any time.`
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: `Users are responsible for maintaining their account security and the confidentiality of their 
      credentials. You agree not to use our service for any illegal purposes or to upload content that violates 
      any applicable laws.`
    },
    {
      icon: Scale,
      title: "Content Rights",
      content: `You retain all rights to your content. By using our service, you grant us the necessary rights 
      to process and store your audio files for transcription purposes. We do not claim ownership of your content.`
    },
    {
      icon: Clock,
      title: "Service Availability",
      content: `While we strive for 99.9% uptime, we cannot guarantee uninterrupted access to our services. 
      We may perform maintenance or updates that could temporarily affect service availability.`
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-xl text-muted-foreground">
          Please read these terms carefully before using our service.
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
          <h2 className="text-2xl font-bold">Additional Terms</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Terms</h3>
            <p className="text-muted-foreground">
              All payments are processed securely through our payment provider. Subscriptions are billed in 
              advance on a monthly basis. You can cancel your subscription at any time.
            </p>

            <h3 className="text-xl font-semibold">Refund Policy</h3>
            <p className="text-muted-foreground">
              We offer refunds on a case-by-case basis. Please contact our support team if you experience any 
              issues with our service.
            </p>

            <h3 className="text-xl font-semibold">Termination</h3>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend access to our service immediately, without prior 
              notice or liability, for any reason whatsoever.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 space-y-6"
        >
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms of Service, please contact us:
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
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground mt-12"
        >
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
      </div>
    </div>
  );
}