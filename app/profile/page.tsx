'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import PointsBadge from '@/components/PointsBadge';
import { User, Mail, Award, Clock } from 'lucide-react';

export default function ProfilePage() {
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
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 neon-text">Your Profile</h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse neon-text text-xl">Loading profile...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Info */}
            <div className="lg:col-span-1">
              <div className="punk-card p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mb-4 neo-glow">
                    <User size={48} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{user?.username}</h2>
                  <p className="text-gray-400">
                    {user?.isAdmin ? 'Administrator' : 'Member'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primary h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Award className="text-primary h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-400">Points</p>
                      <p>{user?.points}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="text-primary h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p>June 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Stats and More */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-8">
                {/* Points & Activities */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PointsBadge 
                      points={user?.points || 0} 
                      count={user?.count || 0} 
                    />
                    
                    <div className="punk-card p-6">
                      <h3 className="text-lg font-semibold mb-4">Achievement Level</h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Level</span>
                          <span className="text-primary">
                            {user?.points && user.points >= 100 
                              ? 'Expert' 
                              : user?.points && user.points >= 50 
                                ? 'Intermediate' 
                                : 'Beginner'}
                          </span>
                        </div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${user?.points ? Math.min(100, user.points / 150 * 100) : 0}%` 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-gray-500">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        {user?.points && user.points >= 100 
                          ? 'You are an expert level user!' 
                          : user?.points && user.points >= 50 
                            ? 'You are making great progress!' 
                            : 'Keep completing activities to level up!'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="punk-card">
                    <div className="divide-y divide-primary/10">
                      <div className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary/20 p-2 rounded-full">
                            <Award className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Completed Login Activity</p>
                            <p className="text-sm text-gray-400">Today at 10:30 AM</p>
                          </div>
                          <div className="ml-auto text-primary font-medium">+10 pts</div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-secondary/20 p-2 rounded-full">
                            <User className="text-secondary h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Updated Profile Information</p>
                            <p className="text-sm text-gray-400">Yesterday at 3:45 PM</p>
                          </div>
                          <div className="ml-auto text-secondary font-medium">+5 pts</div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-accent/20 p-2 rounded-full">
                            <Award className="text-accent h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Completed Weekly Challenge</p>
                            <p className="text-sm text-gray-400">3 days ago</p>
                          </div>
                          <div className="ml-auto text-accent font-medium">+15 pts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}