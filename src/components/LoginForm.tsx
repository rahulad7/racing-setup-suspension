import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useLicense } from '@/contexts/LicenseContext';
import { EmailVerificationModal } from './EmailVerificationModal';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const { toast } = useToast();
  const { refreshLicense } = useLicense();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for administrator credentials
      if (email === 'racesetuppro@gmail.com' && password === 'Admin123!') {
        const adminUser = {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'racesetuppro@gmail.com',
          user_metadata: { plan: 'annual' }
        };
        
        localStorage.setItem('admin_session', JSON.stringify(adminUser));
        
        toast({
          title: "Administrator Access Granted",
          description: "Welcome, Administrator! You have Annual Pro plan privileges.",
        });
        
        // Force refresh to update authentication state
        setTimeout(() => {
          window.location.href = '/data-entry';
        }, 500);
        
        onSuccess?.();
        return;
      }

      if (isSignUp) {
        // Use Supabase auth for signup with email confirmation
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/data-entry`
          }
        });
        
        if (error) throw error;
        
        // Show verification modal instead of storing session immediately
        setSignupEmail(email);
        setShowVerificationModal(true);
        
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        // Use Supabase auth for login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Store user session
        if (data.user) {
          localStorage.setItem('user_session', JSON.stringify(data.user));
        }
        
        // Refresh license data after login
        await refreshLicense();
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        // Force refresh to update authentication state and redirect
        setTimeout(() => {
          window.location.href = '/data-entry';
        }, 500);
        
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
  };

  const handleVerificationModalClose = () => {
    setShowVerificationModal(false);
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-2xl border-4 border-blue-500 bg-white ring-2 ring-blue-300 ring-opacity-50">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-blue-300">
          <CardTitle className="text-3xl font-bold text-center text-gray-900">{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
          <CardDescription className="text-lg text-center text-gray-700 font-medium">
            {isSignUp ? 'Create a new account to get started' : 'Enter your credentials to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 bg-gray-50 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-semibold text-gray-800">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 text-lg border-4 border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 shadow-lg bg-white font-medium"
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-semibold text-gray-800">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-14 text-lg border-4 border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 shadow-lg bg-white font-medium"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold mt-6 bg-blue-600 hover:bg-blue-700 shadow-lg" disabled={isLoading}>
              {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={toggleMode}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={handleVerificationModalClose}
        userEmail={signupEmail}
      />
    </>
  );
}