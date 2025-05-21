import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2, Calendar, Clock, Eye, ChevronLeft, Edit, AlertTriangle } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types/Post';

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate API loading delay
    setIsLoading(true);
    
    setTimeout(() => {
      const foundPost = mockPosts.find(post => post.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get related posts (same category, excluding current post)
        const related = mockPosts
          .filter(p => p.category === foundPost.category && p.id !== id)
          .slice(0, 3);
        
        setRelatedPosts(related);
      } else {
        setError('Post not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Reset scroll position when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleEdit = () => {
    if (post) {
      navigate(`/edit-post/${post.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-[50vh]">
        <AlertTriangle className="w-16 h-16 text-error-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn btn-primary">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="w-full bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-6 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Blog
            </Link>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="badge badge-secondary">{post.category}</span>
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="badge badge-primary">{tag}</span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-teal-500"
                />
                <div>
                  <Link to={`/profile/${post.author.username}`} className="font-medium text-white hover:text-teal-300 transition-colors">
                    {post.author.name}
                  </Link>
                  <div className="flex items-center mt-1 text-sm text-gray-300">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {user && user.id === post.author.id && (
                <button 
                  onClick={handleEdit}
                  className="btn btn-ghost text-white hover:text-teal-300"
                >
                  <Edit className="w-5 h-5 mr-1" />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full rounded-lg shadow-lg object-cover h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Floating Share Bar (Desktop) */}
          <div className="hidden lg:flex flex-col items-center sticky top-24 h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center space-y-5">
              <button 
                onClick={handleLike}
                className={`transition-colors flex flex-col items-center ${
                  liked 
                    ? 'text-error-500 dark:text-error-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm mt-1">{liked ? post.likes + 1 : post.likes}</span>
              </button>
              
              <a 
                href="#comments"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm mt-1">{post.comments}</span>
              </a>
              
              <button 
                onClick={handleBookmark}
                className={`transition-colors flex flex-col items-center ${
                  bookmarked 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-current' : ''}`} />
                <span className="text-sm mt-1">Save</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center transition-colors"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm mt-1">Share</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <article className="flex-1 max-w-3xl mx-auto">
            <div className="prose dark:prose-invert lg:prose-lg prose-slate mx-auto">
              <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">
                {post.excerpt}
              </p>
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Mobile Action Bar */}
            <div className="flex lg:hidden justify-around items-center mt-10 py-4 border-t border-b border-gray-100 dark:border-gray-700">
              <button 
                onClick={handleLike}
                className={`flex items-center ${
                  liked 
                    ? 'text-error-500 dark:text-error-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? post.likes + 1 : post.likes}</span>
              </button>
              
              <a 
                href="#comments"
                className="flex items-center text-gray-500 dark:text-gray-400"
              >
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>{post.comments}</span>
              </a>
              
              <button 
                onClick={handleBookmark}
                className={`flex items-center ${
                  bookmarked 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Bookmark className={`w-5 h-5 mr-1 ${bookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center text-gray-500 dark:text-gray-400"
              >
                <Share2 className="w-5 h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>
            
            {/* Author Box */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-16 h-16 rounded-full mr-6 border-2 border-teal-500"
                />
                <div>
                  <Link to={`/profile/${post.author.username}`} className="font-bold text-lg text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {post.author.name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{post.author.bio}</p>
                  <div className="mt-4">
                    <Link to={`/profile/${post.author.username}`} className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
                      View all posts by this author
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments Section Placeholder */}
            <div id="comments" className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments ({post.comments})</h3>
              
              {/* Comment Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
                <form>
                  <textarea 
                    placeholder="Join the discussion..." 
                    className="input min-h-24 mb-4"
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    Post Comment
                  </button>
                </form>
              </div>
              
              {/* Sample Comments (in a real app, these would come from the API) */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/22.jpg" 
                      alt="Commenter" 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h5 className="font-semibold">Sarah Johnson</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">March 15, 2025</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    This article was exactly what I needed! I've been struggling with this topic for a while, and your clear explanations have really helped me understand it better.
                  </p>
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center mr-4">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>12</span>
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      Reply
                    </button>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Commenter" 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h5 className="font-semibold">Michael Chen</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">March 14, 2025</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    I have a different perspective on this. While I agree with most of your points, I think there's also value in considering the alternative approach of...
                  </p>
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center mr-4">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>8</span>
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="btn btn-ghost">
                  Load More Comments
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="card">
                  <img 
                    src={relatedPost.coverImage} 
                    alt={relatedPost.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <Link to={`/blog/${relatedPost.id}`} className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;