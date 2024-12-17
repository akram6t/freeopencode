'use client'

import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement signup logic here
    console.log('Signup submitted', formData);
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
        <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-300">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <Input 
            id="name" 
            type="text" 
            placeholder="Enter your full name" 
            className="pl-10 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            className="pl-10 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password" className="text-neutral-700 dark:text-neutral-300">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Create a strong password" 
            className="pl-10 pr-10 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword" className="text-neutral-700 dark:text-neutral-300">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <Input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm your password" 
            className="pl-10 pr-10 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required 
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-800">Create Account</Button>
      <Button 
        type="button" 
        className="w-full bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-600"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        Sign up with Google
      </Button>
      <div className="text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account? {' '}
          <Link href="/login" className="text-neutral-800 dark:text-neutral-200 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;

