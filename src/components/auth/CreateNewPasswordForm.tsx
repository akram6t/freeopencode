'use client'
import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface CreateNewPasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}

function CreateNewPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateNewPasswordFormData>({
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement create new password logic here
    console.log('Create new password submitted', formData);
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
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Create a new password"
            className="pl-10 pr-10"
            value={formData.newPassword}
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
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          <Input
            id="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            className="pl-10 pr-10"
            value={formData.confirmNewPassword}
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
      <Button type="submit" className="w-full">Reset Password</Button>
      <div className="text-center">
        <p className="text-sm">
          <Link href="/login" className="hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default CreateNewPasswordForm;