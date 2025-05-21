export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: Author;
  category: string;
  tags: string[];
  readTime: number;
  likes: number;
  comments: number;
  featured?: boolean;
}