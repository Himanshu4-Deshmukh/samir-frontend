'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Course } from '@/types';
import { Lock, ArrowLeft, Award, Bookmark, CheckCircle } from 'lucide-react';

// Sample courses data - would typically come from an API
const COURSES_DATA: Course[] = [
  {
    id: 'web-dev',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build interactive websites.',
    pointsRequired: 30,
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `
# Web Development Fundamentals

## Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of web content.

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>
\`\`\`

## Introduction to CSS

CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.

\`\`\`css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: navy;
}

p {
  color: #333;
}
\`\`\`

## Introduction to JavaScript

JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.

\`\`\`javascript
// Variables
let message = "Hello, World!";

// Functions
function showMessage() {
  alert(message);
}

// Events
document.getElementById("myButton").addEventListener("click", showMessage);
\`\`\`
    `
  },
  {
    id: 'ai-basics',
    title: 'AI and Machine Learning Basics',
    description: 'Introduction to artificial intelligence and machine learning concepts.',
    pointsRequired: 50,
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'AI and Machine Learning course content...'
  },
  {
    id: 'data-science',
    title: 'Data Science Essentials',
    description: 'Learn data analysis, visualization, and interpretation techniques.',
    pointsRequired: 75,
    imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Data Science course content...'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using modern frameworks.',
    pointsRequired: 100,
    imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Mobile Development course content...'
  },
  {
    id: 'ux-design',
    title: 'UX/UI Design Principles',
    description: 'Create user-friendly interfaces and improve user experience.',
    pointsRequired: 120,
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'UX/UI Design course content...'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Understand blockchain technology and develop decentralized applications.',
    pointsRequired: 150,
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Blockchain course content...'
  }
];

export default function CoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, refreshUserProfile } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        await refreshUserProfile();
        
        // In a real app, this would be an API call
        const courseData = COURSES_DATA.find(c => c.id === id);
        setCourse(courseData || null);
        
        if (courseData && user) {
          setHasAccess(user.points >= courseData.pointsRequired);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, refreshUserProfile, user]);
  
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center py-12">
            <div className="animate-pulse neon-text text-xl">Loading course...</div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  if (!course) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center py-12 punk-card p-8">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="text-gray-400 mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => router.push('/courses')}
              className="punk-button"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <button 
          onClick={() => router.push('/courses')}
          className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to courses</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="punk-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-400 mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-2 text-sm mb-4">
                  <Award className="text-primary h-5 w-5" />
                  <span>{course.pointsRequired} points required</span>
                </div>
                
                {hasAccess ? (
                  <div className="bg-green-900/30 border border-green-500/30 rounded-md p-4 flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="text-green-400">You have access to this course</span>
                  </div>
                ) : (
                  <div className="bg-gray-900/30 border border-gray-700/30 rounded-md p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="text-gray-500 h-5 w-5" />
                      <span className="text-gray-400">
                        You need {course.pointsRequired - (user?.points || 0)} more points
                      </span>
                    </div>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${user?.points ? Math.min(100, (user.points / course.pointsRequired) * 100) : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black/40 rounded-md">
                    <span className="text-gray-400">Your points</span>
                    <span className="font-semibold">{user?.points || 0}</span>
                  </div>
                  
                  <button className="punk-button w-full flex items-center justify-center space-x-2">
                    <Bookmark size={16} />
                    <span>Save for later</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="punk-card p-8">
              {hasAccess ? (
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: course.content.replace(/\n/g, '<br />').replace(/```(.*?)```/gs, (match, code) => {
                      // Simple code block formatting
                      return `<pre><code>${code.replace(/^.*\n/, '')}</code></pre>`;
                    }).replace(/^## (.*?)$/gm, '<h2>$1</h2>')
                      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
                  }} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Course Locked</h2>
                  <p className="text-gray-400 mb-6">
                    You need {course.pointsRequired - (user?.points || 0)} more points to access this course.
                    Complete more activities to earn points!
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="punk-button"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}