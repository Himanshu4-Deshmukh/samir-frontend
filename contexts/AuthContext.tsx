'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/types';
import { login as apiLogin, signup as apiSignup, getUserProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    // Check for saved token on component mount
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setAuthState({
        token: savedToken,
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await apiLogin(email, password);
      
      const user: User = {
        _id: data.userId,
        username: data.username,
        email: data.email,
        count: data.count,
        points: data.points,
        isAdmin: data.isAdmin,
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      await apiSignup(username, email, password);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      router.push('/login?registered=true');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    router.push('/login');
  };

  const refreshUserProfile = async () => {
    try {
      if (!authState.token) return;
      
      const userData = await getUserProfile(authState.token);
      const user: User = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        count: userData.count,
        points: userData.points,
        isAdmin: userData.isAdmin,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState(prev => ({
        ...prev,
        user,
      }));
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      // If token is expired, log the user out
      if (error instanceof Error && error.message.includes('Invalid or expired token')) {
        logout();
      }
    }
  };

  const value = {
    ...authState,
    login,
    signup,
    logout,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}