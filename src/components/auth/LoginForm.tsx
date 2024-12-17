'use client';

import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      callbackUrl: '/dashboard'
    });
    // Handle the result (e.g., show error message if login failed)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your password"
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="mr-2 rounded"
          />
          <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
        </div>
        <Link href="/forgot-password" className="text-sm hover:underline">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" className="w-full">Sign In</Button>
      {/* <Button 
        type="button" 
        className="w-full"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <IconBrandGoogleFilled/> Sign in with Google
      </Button> */}
      <Button
        type="button"
        className="w-full bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 dark:bg-black dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800"
        // onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <IconBrandGoogleFilled /> Sign in with Google
      </Button>
      <div className="text-center">
        <p className="text-sm">
          Don't have an account? {' '}
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;