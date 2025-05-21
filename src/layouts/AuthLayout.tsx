import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="p-4">
        <Link to="/" className="text-xl font-bold text-slate-800 dark:text-white">
          BlogifyHub
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;