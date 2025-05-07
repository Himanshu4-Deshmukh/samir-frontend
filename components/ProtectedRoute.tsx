'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (adminOnly && !user?.isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, router, pathname, adminOnly, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse neon-text text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || (adminOnly && !user?.isAdmin)) {
    return null;
  }

  return <>{children}</>;
}