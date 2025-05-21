import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Edit, Users, Search, Tag } from 'lucide-react';
import { mockPosts } from '../data/mockData';

const HomePage: React.FC = () => {
  // Get featured and recent posts from mock data
  const featuredPosts = mockPosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = mockPosts.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Share Your Stories With The World
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            BlogifyHub is the platform where ideas come to life. 
            Write, read, and connect with thousands of readers and writers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn btn-accent px-8 py-3 text-lg">
              Get Started
            </Link>
            <Link to="/blog" className="btn btn-ghost px-8 py-3 text-lg border border-white/20">
              Explore Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BlogifyHub?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 dark:bg-teal-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy to Use Editor</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our rich text editor makes it simple to create beautiful, engaging blog posts.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-slate-100 dark:bg-slate-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growing Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with like-minded individuals and grow your audience with our active community.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-amber-100 dark:bg-amber-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Discover Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find posts on topics you care about with our powerful search and recommendation system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Posts</h2>
            <Link to="/blog" className="text-teal-600 dark:text-teal-400 flex items-center hover:underline">
              View all posts 
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <div key={post.id} className="card group">
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
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Recent Posts</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <div key={post.id} className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/blog/${post.id}`} className="block">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="badge badge-primary">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/blog" className="btn btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Explore Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business'].map((category, index) => (
              <Link
                key={index}
                to={`/blog?category=${category.toLowerCase()}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-medium">{category}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.floor(Math.random() * 100) + 10} posts
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Blogging?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers on BlogifyHub today. Share your voice with the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-teal-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Create Account
            </Link>
            <Link to="/login" className="btn bg-transparent border border-white hover:bg-teal-700 px-8 py-3 text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;