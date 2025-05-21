import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search } from 'lucide-react';
import PostCard from '../components/PostCard';
import { mockPosts } from '../data/mockData';
import { Post } from '../types/Post';

const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sorting, setSorting] = useState<'latest' | 'popular' | 'trending'>('latest');

  // Get category and search from URL
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    // Initialize with mock data
    setPosts(mockPosts);
    
    // Set initial filter values from URL
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  useEffect(() => {
    // Apply filters
    let result = [...posts];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply sorting
    if (sorting === 'latest') {
      // Assuming dates are in MM/DD/YYYY format
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sorting === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sorting === 'trending') {
      result.sort((a, b) => b.comments - a.comments);
    }
    
    setFilteredPosts(result);
  }, [posts, searchQuery, selectedCategory, sorting]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search params
    searchParams.set('search', searchQuery);
    if (selectedCategory) {
      searchParams.set('category', selectedCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    
    if (newCategory) {
      searchParams.set('category', newCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (sort: 'latest' | 'popular' | 'trending') => {
    setSorting(sort);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const categories = Array.from(new Set(posts.map(post => post.category)));

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">The BlogifyHub Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 py-3 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              <span>Filters</span>
            </button>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sorting}
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Filters Panel (Toggleable) */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 animate-slide-up">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <h3 className="font-semibold mb-2">Sort By</h3>
              <select
                value={sorting}
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="mb-8">
        {searchQuery || selectedCategory ? (
          <h2 className="text-xl font-semibold mb-4">
            {filteredPosts.length} results {selectedCategory && `in "${selectedCategory}"`} 
            {searchQuery && `for "${searchQuery}"`}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        )}
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No posts found</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                searchParams.delete('search');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, 9).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              3
            </button>
            <span className="text-gray-600 dark:text-gray-400">...</span>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              10
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BlogPage;