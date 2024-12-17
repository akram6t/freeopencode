'use client';

import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

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
    console.log('Signup submitted', formData);
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
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full">Create Account</Button>
      <Button
        type="button"
        className="w-full bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 dark:bg-black dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800"
      // onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <IconBrandGoogleFilled /> Sign in with Google
      </Button>
      <div className="text-center">
        <p className="text-sm">
          Already have an account? {' '}
          <Link href="/login" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;