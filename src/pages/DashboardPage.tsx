import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, BarChart2, Edit, Trash2, Eye, BookmarkPlus, Heart, MessageCircle, Filter } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { Post } from '../types/Post';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'drafts' | 'stats' | 'bookmarks'>('posts');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Filter posts for the current user (in a real app this would come from an API)
  const userPosts = mockPosts.filter(post => post.author.id === user?.id).slice(0, 5);
  
  // Simulate drafts
  const userDrafts = [
    {
      id: 'draft-1',
      title: 'The Future of Remote Work Post-Pandemic',
      excerpt: 'An analysis of how remote work trends will evolve in the coming years.',
      lastUpdated: '2 days ago',
      category: 'Business',
    },
    {
      id: 'draft-2',
      title: 'Beginner\'s Guide to Sustainable Living',
      excerpt: 'Simple steps anyone can take to reduce their environmental impact.',
      lastUpdated: '1 week ago',
      category: 'Lifestyle',
    },
  ];
  
  // Simulate bookmarked posts
  const bookmarkedPosts = mockPosts.slice(2, 6);

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Posts</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <button className="btn btn-ghost flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    <span>Filter</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filter === 'all' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filter === 'published' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      onClick={() => setFilter('published')}
                    >
                      Published
                    </button>
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filter === 'draft' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      onClick={() => setFilter('draft')}
                    >
                      Drafts
                    </button>
                  </div>
                </div>
                <Link to="/create-post" className="btn btn-primary flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  <span>New Post</span>
                </Link>
              </div>
            </div>
            
            {userPosts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">You haven't published any posts yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start sharing your thoughts with the world by creating your first post.
                </p>
                <Link to="/create-post" className="btn btn-primary">
                  Create Your First Post
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="badge badge-secondary">{post.category}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Published on {post.date}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            <Link to={`/blog/${post.id}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex space-x-6">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Eye className="w-5 h-5 mr-1" />
                              <span>{1200 + Math.floor(Math.random() * 3000)}</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Heart className="w-5 h-5 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <MessageCircle className="w-5 h-5 mr-1" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link to={`/edit-post/${post.id}`} className="btn btn-ghost p-2">
                              <Edit className="w-5 h-5" />
                            </Link>
                            <Link to={`/blog/${post.id}`} className="btn btn-ghost p-2">
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button className="btn btn-ghost p-2 text-error-500">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center mt-8">
                  <button className="btn btn-ghost">
                    Load More Posts
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'drafts':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Drafts</h2>
              <Link to="/create-post" className="btn btn-primary flex items-center">
                <PlusCircle className="w-5 h-5 mr-2" />
                <span>New Draft</span>
              </Link>
            </div>
            
            {userDrafts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">You don't have any drafts</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start writing and save drafts to continue later.
                </p>
                <Link to="/create-post" className="btn btn-primary">
                  Create New Draft
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userDrafts.map((draft) => (
                  <div key={draft.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="badge badge-primary mr-2">{draft.category}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: {draft.lastUpdated}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          <Link to={`/edit-post/${draft.id}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            {draft.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {draft.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Link to={`/edit-post/${draft.id}`} className="btn btn-ghost p-2">
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button className="btn btn-ghost p-2 text-error-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'stats':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">Views This Month</h3>
                <p className="text-3xl font-bold">12,584</p>
                <p className="text-success-500 flex items-center mt-2">
                  <span className="text-sm">↑ 23.5% from last month</span>
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">Total Engagement</h3>
                <p className="text-3xl font-bold">4,396</p>
                <p className="text-success-500 flex items-center mt-2">
                  <span className="text-sm">↑ 12.1% from last month</span>
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">New Followers</h3>
                <p className="text-3xl font-bold">237</p>
                <p className="text-success-500 flex items-center mt-2">
                  <span className="text-sm">↑ 8.3% from last month</span>
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-6">Traffic Overview</h3>
              <div className="h-64 w-full bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Traffic graph visualization</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Top Performing Posts</h3>
                <div className="space-y-4">
                  {userPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">
                          <Link to={`/blog/${post.id}`} className="hover:text-teal-600 dark:hover:text-teal-400">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-4">
                            {1200 + Math.floor(Math.random() * 3000)} views
                          </span>
                          <span>
                            {post.likes} likes
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Traffic Sources</h3>
                <div className="space-y-4">
                  {[
                    { source: 'Organic Search', percentage: 42 },
                    { source: 'Direct', percentage: 28 },
                    { source: 'Social Media', percentage: 18 },
                    { source: 'Referrals', percentage: 12 },
                  ].map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <span>{item.source}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-teal-600 h-2.5 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'bookmarks':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Bookmarks</h2>
            
            {bookmarkedPosts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">No bookmarks yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Save posts you want to read later by clicking the bookmark icon.
                </p>
                <Link to="/blog" className="btn btn-primary">
                  Browse Posts
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {bookmarkedPosts.map((post: Post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="badge badge-secondary">{post.category}</span>
                        <button className="text-teal-600 dark:text-teal-400">
                          <BookmarkPlus className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        <Link to={`/blog/${post.id}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-sm font-medium">{post.author.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      {/* Dashboard Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your posts, see your stats, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <img 
                src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.username} 
                alt={user?.username} 
                className="w-16 h-16 rounded-full mr-4 border-2 border-teal-500" 
              />
              <div>
                <h3 className="font-bold text-lg">{user?.username}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <Link to={`/profile/${user?.username}`} className="btn btn-ghost w-full mb-4">
              View Profile
            </Link>
            <Link to="/settings" className="btn btn-ghost w-full">
              Account Settings
            </Link>
          </div>
          
          <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <button
              className={`w-full text-left px-6 py-4 font-medium flex items-center ${
                activeTab === 'posts' 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white border-l-4 border-slate-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <Edit className="w-5 h-5 mr-3" />
              Your Posts
            </button>
            
            <button
              className={`w-full text-left px-6 py-4 font-medium flex items-center ${
                activeTab === 'drafts' 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white border-l-4 border-slate-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('drafts')}
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              Drafts
            </button>
            
            <button
              className={`w-full text-left px-6 py-4 font-medium flex items-center ${
                activeTab === 'stats' 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white border-l-4 border-slate-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Stats
            </button>
            
            <button
              className={`w-full text-left px-6 py-4 font-medium flex items-center ${
                activeTab === 'bookmarks' 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white border-l-4 border-slate-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('bookmarks')}
            >
              <BookmarkPlus className="w-5 h-5 mr-3" />
              Bookmarks
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;