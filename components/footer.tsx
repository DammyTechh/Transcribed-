"use client";

import Link from "next/link";
import { Headphones, Mail, MapPin, Phone, Github as GitHubIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
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
    <motion.footer 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="border-t bg-background/95 backdrop-blur"
    >
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Headphones className="h-6 w-6" />
              <span className="text-xl font-bold">
                D.Tech <span className="text-primary">Transcribe</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              Professional audio transcription service powered by cutting-edge algorithms.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Ibadan, Oyo State Nigeria</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">+234 813 457 0370</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">petersdamilare5@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={item}
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} D.Tech Transcribe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link 
              href="https://github.com/dammy-key" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://www.linkedin.com/in/peters-damilare-9a9753330/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://web.facebook.com/profile.php?id=100092499165321" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Facebook
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}