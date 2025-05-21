import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 pt-12 pb-8 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-slate-800 dark:text-white mb-4 block">
              BlogifyHub
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A modern platform for sharing stories, ideas, and knowledge with the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog?category=technology" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/blog?category=lifestyle" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Lifestyle</Link>
              </li>
              <li>
                <Link to="/blog?category=travel" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Travel</Link>
              </li>
              <li>
                <Link to="/blog?category=food" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Food</Link>
              </li>
              <li>
                <Link to="/blog?category=health" className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors">Health</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">contact@blogifyhub.com</span>
              </div>
              <form className="space-y-3">
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="input"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary w-full">
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} BlogifyHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-slate-800 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-slate-800 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-400 text-sm hover:text-slate-800 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;