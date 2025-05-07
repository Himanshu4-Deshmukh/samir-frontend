'use client';

import { useState, useEffect } from 'react';
import { Award, Zap } from 'lucide-react';

interface PointsBadgeProps {
  points: number;
  count: number;
}

export default function PointsBadge({ points, count }: PointsBadgeProps) {
  const [animate, setAnimate] = useState(false);
  const [prevPoints, setPrevPoints] = useState(points);
  
  useEffect(() => {
    if (points > prevPoints) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timer);
    }
    setPrevPoints(points);
  }, [points, prevPoints]);

  return (
    <div className="flex flex-col space-y-4">
      <div className={`punk-card p-4 ${animate ? 'neo-glow' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-full neo-glow">
            <Award className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Points</p>
            <div className="flex items-center">
              <p className={`text-xl font-bold ${animate ? 'neon-text' : 'text-white'}`}>
                {points}
              </p>
              {animate && (
                <span className="ml-2 text-primary animate-pulse">
                  <Zap size={16} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="punk-card p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary/20 p-2 rounded-full neo-glow">
            <Zap className="text-secondary" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Activities Completed</p>
            <p className="text-xl font-bold text-white">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}