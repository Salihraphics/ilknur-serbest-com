import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      blogs.map((blog: any) => ({
        ...blog,
        createdAt: blog.createdAt.getTime(),
      }))
    );
  } catch (error: any) {
    // Gracefully handle database connection errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'P1001') {
      console.warn('⚠️ Database unavailable');
      return NextResponse.json([], { status: 200 });
    }
    
    console.error('Error fetching blogs:', error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}
