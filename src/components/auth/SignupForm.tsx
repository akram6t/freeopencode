"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { loginWithGoogle, signupWithCredentials } from "@/app/(auth)/auth-actions"; // Server actions for signup
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { z } from "zod";
import { signupSchema } from "@/lib/zod";
import { useToast } from "@/hooks/use-toast";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the form data using Zod schema
      signupSchema.parse({ fullName: name, email, password, confirmPassword });

      // If validation passes, proceed with signup
      const { error, success } = await signupWithCredentials({
        fullName: name,
        email: email,
        password: password,
      });

      console.log(error);      

      if(error){
        toast({
          variant: 'destructive',
          description: error as string,
        })
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message); // Set the first validation error message
      }
    }
  };

  const handleGoogleSignup = async () => {
    await loginWithGoogle();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join Us</CardTitle>
          <CardDescription>Sign up with your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} action={"#"}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignup}
      >
        <IconBrandGoogleFilled className="mr-2 h-5 w-5" />
        Sign up with Google
      </Button>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}