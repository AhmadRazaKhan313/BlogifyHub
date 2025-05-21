import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Twitter, Github, Globe, Users, Edit, Mail } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';

// Mock user data for demonstration
const mockUser = {
  id: '1',
  username: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Tech enthusiast and coffee lover. I write about web development, programming, and tech trends.',
  location: 'San Francisco, CA',
  joinDate: 'January 2024',
  website: 'https://johndoe.com',
  twitter: '@johndoe',
  github: 'johndoe',
  followers: 243,
  following: 128,
};

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [userData, setUserData] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch user data
    setIsLoading(true);
    setTimeout(() => {
      setUserData(mockUser);
      
      // Get user posts from mock data
      const posts = mockPosts.filter(post => post.author.username === username);
      setUserPosts(posts);
      
      setIsLoading(false);
    }, 500);
  }, [username]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <p className="text-gray-600 dark:text-gray-400">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const isOwnProfile = user?.id === userData.id;
  
  const handleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-slate-700 to-slate-800"></div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-end">
            {/* Avatar */}
            <div className="md:-mt-20 mb-4 md:mb-0">
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>
            
            <div className="md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">@{userData.username}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <Link to="/settings" className="btn btn-ghost flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Link>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        className={`btn ${following ? 'btn-ghost border border-slate-300 dark:border-slate-600' : 'btn-primary'}`}
                        onClick={handleFollow}
                      >
                        {following ? 'Following' : 'Follow'}
                      </button>
                      <button className="btn btn-ghost">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Bio */}
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {userData.bio}
              </p>
              
              {/* User Info */}
              <div className="flex flex-wrap gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                {userData.location && (
                  <div className="flex items-center mr-6">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{userData.location}</span>
                  </div>
                )}
                
                <div className="flex items-center mr-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Joined {userData.joinDate}</span>
                </div>
                
                {userData.website && (
                  <div className="flex items-center mr-6">
                    <Globe className="w-4 h-4 mr-1" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {userData.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                
                {userData.twitter && (
                  <div className="flex items-center mr-6">
                    <Twitter className="w-4 h-4 mr-1" />
                    <a href={`https://twitter.com/${userData.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {userData.twitter}
                    </a>
                  </div>
                )}
                
                {userData.github && (
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-1" />
                    <a href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {userData.github}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4 text-sm">
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{userPosts.length}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{userData.followers}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{userData.following}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'posts'
              ? 'text-slate-800 dark:text-white border-b-2 border-slate-600 dark:border-slate-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'about'
              ? 'text-slate-800 dark:text-white border-b-2 border-slate-600 dark:border-slate-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' ? (
        <div>
          {userPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {isOwnProfile 
                  ? "You haven't published any posts yet. Start writing to share your thoughts with the world."
                  : "This user hasn't published any posts yet."}
              </p>
              {isOwnProfile && (
                <Link to="/create-post" className="btn btn-primary">
                  Create Your First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">About {userData.name}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bio</h3>
              <p className="text-gray-700 dark:text-gray-300">{userData.bio}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Web Development', 'JavaScript', 'React', 'Node.js', 'UI/UX Design'].map((topic, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Elsewhere</h3>
              <div className="space-y-2">
                {userData.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">
                      {userData.website}
                    </a>
                  </div>
                )}
                
                {userData.twitter && (
                  <div className="flex items-center">
                    <Twitter className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <a href={`https://twitter.com/${userData.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">
                      {userData.twitter}
                    </a>
                  </div>
                )}
                
                {userData.github && (
                  <div className="flex items-center">
                    <Github className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <a href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">
                      github.com/{userData.github}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Member Since</h3>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                {userData.joinDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;