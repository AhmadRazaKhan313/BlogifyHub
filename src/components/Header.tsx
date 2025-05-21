import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Moon, Sun, X, AlignJustify } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 text-slate-800 dark:text-white hover:text-slate-600 dark:hover:text-slate-300">
              <span className="font-bold text-2xl">BlogifyHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium">Home</Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium">Blog</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium">About</Link>
          </nav>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Toggle Button */}
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/create-post" className="btn btn-secondary">
                    Write Post
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2">
                      <img 
                        src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.username} 
                        alt={user?.username} 
                        className="w-8 h-8 rounded-full border-2 border-teal-500" 
                      />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                      <Link to={`/profile/${user?.username}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost">Sign In</Link>
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className="p-2 md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <AlignJustify className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
              <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Blog</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block p-2 text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                    <Link to={`/profile/${user?.username}`} className="block p-2 text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                    <Link to="/create-post" className="block p-2 text-teal-600 dark:text-teal-400 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Write Post</Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left p-2 text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/login" className="btn btn-ghost w-full">Sign In</Link>
                    <Link to="/register" className="btn btn-primary w-full">Sign Up</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-4 animate-slide-up">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for posts..."
                className="input flex-1"
                autoFocus
              />
              <button type="submit" className="btn btn-primary ml-2">
                Search
              </button>
              <button 
                type="button" 
                onClick={toggleSearch}
                className="btn btn-ghost ml-2"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;