import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface AccountCreationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planType: string;
  amount: string;
}

const AccountCreationModal: React.FC<AccountCreationModalProps> = ({
  open,
  onClose,
  onSuccess,
  planType,
  amount
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Auth attempt:', { isLogin, email });
      
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Login result:', { data: !!data.user, error });
        
        if (error) throw error;
        
        if (data.user) {
          console.log('Login successful');
          onSuccess();
        }
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        console.log('Signup result:', { data: !!data.user, error });
        
        if (error) throw error;
        
        if (data.user) {
          console.log('Signup successful');
          onSuccess();
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // If user is already authenticated, close modal and proceed
  React.useEffect(() => {
    if (user && open) {
      console.log('User already authenticated, proceeding');
      onSuccess();
    }
  }, [user, open, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? 'Sign In' : 'Create Account'} to Purchase {planType}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-gray-600 mb-4">
          Plan: {planType} - {amount}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 characters)'}
              required
            />
          </div>
          
          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isLogin ? 'Signing In...' : 'Creating Account...'}</>
            ) : (
              isLogin ? 'Sign In & Continue' : 'Create Account & Continue'
            )}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="w-full"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountCreationModal;