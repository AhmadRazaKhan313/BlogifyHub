import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Image, X, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { slugify } from '../utils/slugify';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableCategories = [
    'Technology', 'Programming', 'Design', 'Business', 
    'Health', 'Lifestyle', 'Travel', 'Food'
  ];

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

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('You must be logged in to create a post');
      }

      const slug = slugify(title);
      
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          excerpt,
          slug,
          cover_image: coverImage,
          author_id: user.id,
          category,
          tags,
          status: 'published',
          published_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      navigate(`/blog/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('You must be logged in to create a post');
      }

      const slug = slugify(title);
      
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          excerpt,
          slug,
          cover_image: coverImage,
          author_id: user.id,
          category,
          tags,
          status: 'draft'
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
      console.error('Error saving draft:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        
        {error && (
          <div className="bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handlePublish} className="space-y-8">
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
            
            <div className="flex items-center mb-4">
              <input
                id="publish-now"
                type="radio"
                name="publish-option"
                className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                defaultChecked
              />
              <label htmlFor="publish-now" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Publish now
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="schedule"
                type="radio"
                name="publish-option"
                className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="schedule" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Schedule for later
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Save as Draft
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-ghost"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center"
                disabled={isSubmitting}
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;