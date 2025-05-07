'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import PointsBadge from '@/components/PointsBadge';
import Link from 'next/link';
import { Layout, BookOpen, Zap, Award, ChevronRight, Star } from 'lucide-react';

export default function Dashboard() {
  const { user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        await refreshUserProfile();
      } catch (error) {
        console.error('Error refreshing profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [refreshUserProfile]);
  
  // Sample activities that can be replaced with real data from API
  const activities = [
    {
      id: 1,
      title: 'Daily Login',
      description: 'Log in to the platform daily',
      points: 5,
      icon: <Zap size={20} className="text-primary" />,
    },
    {
      id: 2,
      title: 'Complete Profile',
      description: 'Fill out all profile information',
      points: 10,
      icon: <User size={20} className="text-secondary" />,
    },
    {
      id: 3,
      title: 'Take Weekly Quiz',
      description: 'Participate in weekly knowledge quizzes',
      points: 15,
      icon: <Award size={20} className="text-accent" />,
    },
    {
      id: 4,
      title: 'Read Documentation',
      description: 'Read through platform documentation',
      points: 10,
      icon: <BookOpen size={20} className="text-primary" />,
    },
  ];
  
  // Sample available courses
  const availableCourses = [
    {
      id: 'web-dev',
      title: 'Web Development Fundamentals',
      pointsRequired: 30,
      progress: user?.points ? Math.min(100, (user.points / 30) * 100) : 0,
    },
    {
      id: 'ai-basics',
      title: 'AI and Machine Learning Basics',
      pointsRequired: 50,
      progress: user?.points ? Math.min(100, (user.points / 50) * 100) : 0,
    },
    {
      id: 'data-science',
      title: 'Data Science Essentials',
      pointsRequired: 75,
      progress: user?.points ? Math.min(100, (user.points / 75) * 100) : 0,
    },
  ];
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 neon-text">Dashboard</h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse neon-text text-xl">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <PointsBadge 
                points={user?.points || 0} 
                count={user?.count || 0} 
              />
            </div>
            
            {/* Middle Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Available Activities</h2>
                <span className="text-sm text-gray-400">+10 points each</span>
              </div>
              
              <div className="punk-card">
                <div className="divide-y divide-primary/10">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-primary/5 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="bg-black/60 p-2 rounded-full neo-glow">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-400">{activity.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-primary font-semibold">+{activity.points}</span>
                          <ChevronRight size={16} className="text-gray-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Available Courses</h2>
                <Link href="/courses" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="punk-card">
                <div className="divide-y divide-primary/10">
                  {availableCourses.map((course) => (
                    <div key={course.id} className="p-4 hover:bg-primary/5 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="bg-black/60 p-2 rounded-full neo-glow">
                          <BookOpen size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{course.title}</h3>
                          <div className="mt-2">
                            <div className="progress-container h-2">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-primary">{user?.points || 0} pts</span>
                              <span className="text-gray-400">{course.pointsRequired} pts required</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

function User(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ""}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}