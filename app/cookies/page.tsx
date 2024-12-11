"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Cookie, Shield, Clock, Settings } from "lucide-react";

export default function CookiesPage() {
  const sections = [
    {
      icon: Cookie,
      title: "Essential Cookies",
      content: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      content: "We use security cookies to authenticate users, prevent fraudulent use of login credentials, and protect user data from unauthorized parties."
    },
    {
      icon: Clock,
      title: "Session Management",
      content: "Session cookies help us recognize you and remember your preferences during your visit. They are deleted when you close your browser."
    },
    {
      icon: Settings,
      title: "Cookie Management",
      content: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed."
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
        <p className="text-xl text-muted-foreground">
          Understanding how and why we use cookies on our website
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
            If you have any questions about our cookie policy, please contact us:
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