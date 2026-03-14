import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const totalPosts = await prisma.blogPost.count();

    // Mock analytics data (later integrate with Google Analytics)
    return NextResponse.json({
      activeUsers: 24,
      monthlyTraffic: 3450,
      totalPosts,
    });
  } catch (error: any) {
    // Gracefully handle database connection errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'P1001') {
      console.warn('⚠️ Database unavailable for stats');
      return NextResponse.json(
        {
          activeUsers: 24,
          monthlyTraffic: 3450,
          totalPosts: 0,
        },
        { status: 200 }
      );
    }

    console.error('Stats endpoint error:', error?.message || error);
    return NextResponse.json(
      {
        activeUsers: 24,
        monthlyTraffic: 3450,
        totalPosts: 0,
      },
      { status: 200 }
    );
  }
}
