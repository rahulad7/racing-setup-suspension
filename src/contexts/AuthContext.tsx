import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const signOut = useCallback(async () => {
    try {
      localStorage.removeItem('admin_session');
      localStorage.removeItem('user_session');
      setIsAdmin(false);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setUser(null);
      setSession(null);
    }
  }, []);

  useEffect(() => {
    if (initialized) return;
    
    let mounted = true;
    
    const initAuth = async () => {
      try {
        // First check for real Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          setSession(session);
          setUser(session.user);
          setIsAdmin(false);
          setLoading(false);
          setInitialized(true);
          localStorage.setItem('user_session', JSON.stringify(session.user));
          return;
        }

        // Fallback to admin session if exists
        const adminSession = localStorage.getItem('admin_session');
        if (adminSession && mounted) {
          const adminUser = JSON.parse(adminSession);
          setUser(adminUser as User);
          setIsAdmin(true);
          setLoading(false);
          setInitialized(true);
          return;
        }

        // Clear any stale user session if no valid Supabase session
        localStorage.removeItem('user_session');
        if (mounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          setInitialized(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [initialized]);

  useEffect(() => {
    if (!initialized) return;
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!localStorage.getItem('admin_session') && !localStorage.getItem('user_session')) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAdmin(false);
        
        // Handle email verification success
        if (event === 'SIGNED_IN' && session?.user) {
          localStorage.setItem('user_session', JSON.stringify(session.user));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [initialized]);

  const value = {
    user,
    session,
    loading,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};