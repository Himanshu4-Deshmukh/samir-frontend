'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Award, Home, BookOpen, User, Users, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    ...(isAuthenticated
      ? [
          { name: 'Dashboard', href: '/dashboard', icon: <Award size={18} /> },
          { name: 'Courses', href: '/courses', icon: <BookOpen size={18} /> },
          { name: 'Profile', href: '/profile', icon: <User size={18} /> },
          ...(user?.isAdmin
            ? [{ name: 'Admin', href: '/admin', icon: <Users size={18} /> }]
            : []),
        ]
      : [
          { name: 'Login', href: '/login', icon: <User size={18} /> },
          { name: 'Sign Up', href: '/signup', icon: <User size={18} /> },
        ]),
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg border-b border-primary/20 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight neon-text">
              InfoBuzz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-1 py-2 px-3 rounded-md transition-colors duration-200 
                  ${
                    pathname === link.href
                      ? 'bg-primary/20 text-primary border border-primary/40 neo-glow'
                      : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center space-x-1 py-2 px-3 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 bg-black/90 border border-primary/20 rounded-lg backdrop-blur-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 
                    ${
                      pathname === link.href
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 p-3 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}