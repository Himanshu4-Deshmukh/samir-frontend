import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-primary/20 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 neon-text">InfoBuzz</h3>
            <p className="text-gray-400 text-sm">
              Complete activities, earn points, and unlock exclusive courses to enhance your knowledge.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-primary transition-colors">Courses</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} InfoBuzz. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed with 💙 by Studio Fusion
          </p>
        </div>
      </div>
    </footer>
  );
}