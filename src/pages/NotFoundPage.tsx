import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-xl">
      <AlertTriangle className="w-20 h-20 text-amber-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-y-4 w-full">
        <Link to="/" className="btn btn-primary w-full">
          Go to Homepage
        </Link>
        <Link to="/blog" className="btn btn-ghost w-full">
          Browse Blog Posts
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;