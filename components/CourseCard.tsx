'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Course } from '@/types';
import { Lock, Unlock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  const isUnlocked = user?.points >= course.pointsRequired;
  
  return (
    <div 
      className={`punk-card transition-all duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        <div className="absolute top-3 right-3 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold 
            ${isUnlocked 
              ? 'bg-green-900/60 text-green-400 border border-green-500/50' 
              : 'bg-gray-900/60 text-gray-400 border border-gray-500/50'}`
          }>
            {isUnlocked ? (
              <div className="flex items-center space-x-1">
                <Unlock size={12} />
                <span>Unlocked</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Lock size={12} />
                <span>{course.pointsRequired} points required</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-400 mb-4">{course.description}</p>
        
        {isUnlocked ? (
          <Link href={`/courses/${course.id}`}>
            <button className="punk-button w-full flex items-center justify-center space-x-2">
              <span>Start Learning</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button 
              className="w-full py-2 px-4 rounded-md bg-gray-800/80 text-gray-500 border border-gray-700/50 cursor-not-allowed"
              disabled
            >
              <div className="flex items-center justify-center space-x-2">
                <Lock size={16} />
                <span>Earn {course.pointsRequired - (user?.points || 0)} more points</span>
              </div>
            </button>
            
            <div className="progress-container mt-3">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${(user?.points ? Math.min(100, (user.points / course.pointsRequired) * 100) : 0)}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{user?.points || 0} points</span>
              <span>{course.pointsRequired} points</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}