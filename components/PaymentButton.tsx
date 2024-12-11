"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PaymentButtonProps {
  amount: number;
  email: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function PaymentButton({
  amount,
  email,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Mock payment success for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Your account has been upgraded.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      onError?.();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full mt-4"
    >
      {isProcessing ? "Processing..." : `Upgrade Now - ₦${amount.toLocaleString()}`}
    </Button>
  );
}