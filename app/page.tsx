'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronRight, Star, Award, BookOpen, Zap } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Award className="text-primary" size={32} />,
      title: 'Complete Activities',
      description: 'Participate in various activities to increase your count and earn points.',
    },
    {
      icon: <Star className="text-accent" size={32} />,
      title: 'Earn Points',
      description: 'Accumulate points by completing activities and engaging with the platform.',
    },
    {
      icon: <BookOpen className="text-secondary" size={32} />,
      title: 'Unlock Courses',
      description: 'Use your earned points to unlock premium courses and expand your knowledge.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        
        {/* Glowing orbs background effect */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent/20 filter blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-secondary/20 filter blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 pt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
                Learn, Earn <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  & Unlock Knowledge
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Complete activities, earn points, and unlock exclusive courses to enhance your skills.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="punk-button"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <Link href="/signup">
                      <button className="punk-button">
                        Get Started
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="px-6 py-2 bg-transparent text-primary border border-primary/30 rounded-md font-medium transition-all duration-300 hover:bg-primary/10">
                        Sign In
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className={`hidden lg:block transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
                <div className="punk-card p-6 relative">
                  <div className="bg-black/60 rounded-lg p-8">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-gray-400">Current Level</div>
                        <div className="text-2xl font-bold text-white">Pro Learner</div>
                      </div>
                      <div className="bg-primary/20 h-16 w-16 rounded-full flex items-center justify-center">
                        <Zap size={32} className="text-primary" />
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-primary font-medium">240/500 pts</span>
                      </div>
                      <div className="progress-container">
                        <div className="progress-bar" style={{ width: '48%' }} />
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <div className="bg-black/40 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <Award size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-white font-medium">AI Ethics Course</div>
                            <div className="text-gray-400 text-sm">500 pts required</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      
                      <div className="bg-black/40 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center">
                            <BookOpen size={20} className="text-secondary" />
                          </div>
                          <div>
                            <div className="text-white font-medium">Web Development</div>
                            <div className="text-gray-400 text-sm">300 pts required</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold neon-text mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform rewards you for your engagement and helps you gain access to premium learning resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="punk-card p-8 transition-all duration-500"
              >
                <div className="mb-6 bg-black/40 w-16 h-16 rounded-lg flex items-center justify-center neo-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="punk-card p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Level Up</span> Your Skills?
                </h2>
                <p className="text-gray-300 mb-8">
                  Join our platform today and start earning points to unlock premium courses. The more you engage, the more you learn!
                </p>
                {!isAuthenticated && (
                  <Link href="/signup">
                    <button className="punk-button">
                      Create Your Account
                    </button>
                  </Link>
                )}
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full filter blur-[60px]" />
                  <div className="relative bg-black/60 rounded-lg p-6 border border-primary/30">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                          <Star className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="text-gray-400">Complete Daily Challenge</p>
                          <p className="text-sm text-primary">+10 points</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="bg-secondary/20 p-3 rounded-full">
                          <Award className="text-secondary" size={24} />
                        </div>
                        <div>
                          <p className="text-gray-400">Finish Weekly Quiz</p>
                          <p className="text-sm text-secondary">+30 points</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="bg-accent/20 p-3 rounded-full">
                          <BookOpen className="text-accent" size={24} />
                        </div>
                        <div>
                          <p className="text-gray-400">Share Knowledge</p>
                          <p className="text-sm text-accent">+20 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}