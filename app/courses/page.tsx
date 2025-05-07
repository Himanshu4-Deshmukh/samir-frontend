'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types';
import { BookOpen, Search } from 'lucide-react';

// Sample courses data - would typically come from an API
const COURSES_DATA: Course[] = [
  {
    id: 'web-dev',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build interactive websites.',
    pointsRequired: 30,
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  },
  {
    id: 'ai-basics',
    title: 'AI and Machine Learning Basics',
    description: 'Introduction to artificial intelligence and machine learning concepts.',
    pointsRequired: 50,
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  },
  {
    id: 'data-science',
    title: 'Data Science Essentials',
    description: 'Learn data analysis, visualization, and interpretation techniques.',
    pointsRequired: 75,
    imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using modern frameworks.',
    pointsRequired: 100,
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  },
  {
    id: 'ux-design',
    title: 'UX/UI Design Principles',
    description: 'Create user-friendly interfaces and improve user experience.',
    pointsRequired: 120,
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Understand blockchain technology and develop decentralized applications.',
    pointsRequired: 150,
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Course content here...'
  }
];

export default function CoursesPage() {
  const { user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        setCourses(COURSES_DATA);
        setFilteredCourses(COURSES_DATA);
        await refreshUserProfile();
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [refreshUserProfile]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold neon-text">Courses</h1>
            <p className="text-gray-400 mt-2">Unlock knowledge with your earned points</p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 py-2 bg-black/50 border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
              />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse neon-text text-xl">Loading courses...</div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center punk-card p-8">
            <BookOpen className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="text-gray-400">
              We couldn't find any courses matching your search criteria.
            </p>
          </div>
        )}
        
        {user && (
          <div className="mt-12 punk-card p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Points Balance</h3>
                <p className="text-gray-400">You currently have <span className="text-primary font-semibold">{user.points} points</span></p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Complete more activities to earn points</span>
                  <div className="text-primary bg-primary/10 p-2 rounded-full">
                    <BookOpen size={20} />
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