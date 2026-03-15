import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { prisma } from '@/lib/db';

const BLOGS_DIR = join(process.cwd(), 'public', 'assets', 'blog');

function ensureDirectoryExists() {
  if (!existsSync(BLOGS_DIR)) {
    mkdirSync(BLOGS_DIR, { recursive: true });
  }
}

function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateFilename(originalName: string): string {
  const ext = originalName.split('.').pop();
  const timestamp = Date.now();
  const random = generateRandomString(9);
  return `${timestamp}-${random}.${ext}`;
}

async function saveUploadedFile(file: File): Promise<string> {
  try {
    ensureDirectoryExists();

    const filename = generateFilename(file.name);
    const filepath = join(BLOGS_DIR, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    writeFileSync(filepath, buffer);

    return `/assets/blog/${filename}`;
  } catch (error) {
    console.error('File save error:', error);
    throw new Error('Resim kaydedilirken hata oluştu.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;

    console.log('Form data received:', { 
      hasFile: !!file, 
      title: title?.slice(0, 20), 
      excerpt: excerpt?.slice(0, 20),
      contentLength: content?.length,
      fileSize: file?.size,
      fileType: file?.type
    });

    // Validation
    if (!file || !title || !excerpt || !content) {
      console.warn('Validation failed: missing fields', { file: !!file, title: !!title, excerpt: !!excerpt, content: !!content });
      return NextResponse.json(
        { error: 'Tüm alanlar gerekli' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      console.warn('Validation failed: not an image', { fileType: file.type });
      return NextResponse.json(
        { error: 'Lütfen bir resim dosyası seçiniz.' },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      console.warn('Validation failed: file too large', { fileSize: file.size });
      return NextResponse.json(
        { error: 'Resim boyutu 5MB\'dan küçük olmalıdır.' },
        { status: 400 }
      );
    }

    if (content.length < 50) {
      console.warn('Validation failed: content too short', { contentLength: content.length });
      return NextResponse.json(
        { error: 'İçerik en az 50 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // Save image file
    const imagePath = await saveUploadedFile(file);

    // Turkish date format
    const turkishDate = new Date().toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create blog post in PostgreSQL
    console.log('Creating blog post in database...');
    const blog = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: imagePath,
        date: turkishDate,
        author: 'İlknur Serbest',
      },
    });

    console.log('Blog post created successfully:', blog.id);
    return NextResponse.json(
      {
        success: true,
        message: 'Blog yazısı başarıyla eklendi',
        blog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Blog creation error:', error?.message || error);
    
    // Handle database connection errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı başarısız. Lütfen daha sonra deneyiniz.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Blog yazısı eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

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
      console.warn('⚠️ Database unavailable for blog retrieval');
      return NextResponse.json([], { status: 200 });
    }

    console.error('Get blogs error:', error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID gerekli' },
        { status: 400 }
      );
    }

    console.log('Deleting blog with ID:', id);

    // Find blog to get image path
    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      );
    }

    // Delete image file from filesystem
    if (blog.image) {
      try {
        const imagePath = join(process.cwd(), 'public', blog.image.substring(1));
        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
          console.log('Image file deleted:', imagePath);
        }
      } catch (fileError) {
        console.warn('Could not delete image file:', blog.image, fileError);
        // Continue with database deletion even if file deletion fails
      }
    }

    // Delete blog post from database
    await prisma.blogPost.delete({
      where: { id },
    });

    console.log('Blog post deleted successfully:', id);
    return NextResponse.json(
      { success: true, message: 'Blog yazısı silindi' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Blog deletion error:', error?.message || error);

    // Handle database connection errors
    if (error?.code === 'ECONNREFUSED' || error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı başarısız. Lütfen daha sonra deneyiniz.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Blog yazısı silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
