'use client'

import React, { useState, FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface ForgotPasswordFormData {
  email: string;
}

function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement forgot password logic here
    console.log('Forgot password submitted', formData);
    // You would typically make an API call to your backend here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your registered email" 
            className="pl-10 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-800">Reset Password</Button>
      <div className="text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Remember your password? {' '}
          <Link href="/login" className="text-neutral-800 dark:text-neutral-200 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;

