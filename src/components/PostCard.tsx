import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, BookmarkPlus, Share2 } from 'lucide-react';
import { Post } from '../types/Post';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'featured';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="card group hover:shadow-lg transition-all duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-60 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="badge badge-secondary">{post.category}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime} min read</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex space-x-4">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="card group p-4 hover:shadow-md">
        <div className="flex space-x-4">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="badge badge-primary text-xs">{post.category}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
            </div>
            <h3 className="text-base font-semibold mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Heart className="w-3.5 h-3.5 mr-1" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="badge badge-secondary">{post.category}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime} min read</span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
          </div>
          <div className="flex space-x-3">
            <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center">
              <Heart className="w-5 h-5 mr-1" />
              <span>{post.likes}</span>
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;