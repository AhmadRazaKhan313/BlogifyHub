import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image, X, Tag, Trash2, AlertTriangle } from 'lucide-react';
import { mockPosts } from '../data/mockData';
import { Post } from '../types/Post';

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const availableCategories = [
    'Technology', 'Programming', 'Design', 'Business', 
    'Health', 'Lifestyle', 'Travel', 'Food'
  ];

  useEffect(() => {
    // Simulate API call to fetch post data
    setIsLoading(true);
    
    setTimeout(() => {
      const foundPost = mockPosts.find(post => post.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost.title);
        setContent(foundPost.content);
        setCoverImage(foundPost.coverImage);
        setCategory(foundPost.category);
        setTags(foundPost.tags);
        setExcerpt(foundPost.excerpt);
      } else {
        setError('Post not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the updated post data to an API
    console.log({
      id,
      title,
      content,
      coverImage,
      category,
      tags,
      excerpt
    });
    
    // Redirect to the post
    navigate(`/blog/${id}`);
  };

  const handleDelete = () => {
    // In a real app, this would send a delete request to the API
    console.log(`Deleting post with id: ${id}`);
    navigate('/dashboard');
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
        <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're trying to edit doesn't exist or has been removed.</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => navigate('/create-post')}
            className="btn btn-ghost"
          >
            Create New Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-ghost text-error-500 flex items-center"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete Post
          </button>
        </div>
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
              <div className="flex items-start mb-4">
                <AlertTriangle className="w-6 h-6 text-error-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Delete Post</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete "{title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn bg-error-500 hover:bg-error-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleUpdatePost} className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              className="input text-xl font-bold"
              required
            />
          </div>
          
          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="label">
              Cover Image URL
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  id="coverImage"
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Enter an image URL"
                  className="input"
                />
              </div>
              <button type="button" className="btn btn-ghost p-2">
                <Image className="w-5 h-5" />
              </button>
            </div>
            
            {coverImage && (
              <div className="mt-4">
                <img 
                  src={coverImage} 
                  alt="Cover preview" 
                  className="max-h-56 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="label">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief summary of your post"
              className="input min-h-24"
              maxLength={200}
            ></textarea>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {excerpt.length}/200 characters
            </p>
          </div>
          
          {/* Content */}
          <div>
            <label htmlFor="content" className="label">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="input min-h-96"
              required
            ></textarea>
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              required
            >
              <option value="" disabled>Select a category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  id="tags"
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag and press Enter"
                  className="input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(e);
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-ghost p-2"
              >
                <Tag className="w-5 h-5" />
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Publication Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Publication Settings</h3>
            
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Published on {post.date}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="btn btn-ghost"
            >
              Preview
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/blog/${id}`)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Update Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;