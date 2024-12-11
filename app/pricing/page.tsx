"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free Trial",
    price: "₦0",
    description: "Perfect for trying out our service",
    features: [
      "10 minutes of transcription",
      "Basic export formats",
      "Standard accuracy",
      "Email support",
    ],
    cta: "Start Free",
    href: "/register",
  },
  {
    name: "Professional",
    price: "₦5,000",
    period: "/month",
    description: "For individuals and small teams",
    features: [
      "5 hours of transcription",
      "All export formats",
      "High accuracy",
      "Priority support",
      "Real-time transcription",
    ],
    cta: "Get Started",
    href: "/register?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₦20,000",
    period: "/month",
    description: "For large organizations",
    features: [
      "Unlimited transcription",
      "All export formats",
      "Highest accuracy",
      "24/7 priority support",
      "Real-time transcription",
      "API access",
      "Custom integration",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Choose the perfect plan for your transcription needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`p-8 relative ${plan.popular ? "border-primary" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
                <ul className="space-y-2 pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
        <p className="text-muted-foreground mb-8">
          Contact us for custom pricing tailored to your specific needs
        </p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}