import { prisma } from '@/lib/db';

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  image: string;
  createdAt?: number;
}

export async function getBlogPosts(): Promise<Blog[]> {
  try {
    // Test connection first
    if (!prisma) {
      console.warn('Prisma client not available');
      return [];
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      date: post.date,
      author: post.author,
      createdAt: post.createdAt.getTime(),
    }));
  } catch (error: any) {
    // Gracefully handle database connection errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'P1001') {
      console.warn('⚠️ Database connection unavailable. Returning empty blog list.');
      console.warn('Make sure Docker/PostgreSQL is running: docker start ilknur-db');
      return [];
    }
    
    console.error('Failed to fetch blogs:', error?.message || error);
    return [];
  }
}

export const blogPosts: Blog[] = [];
