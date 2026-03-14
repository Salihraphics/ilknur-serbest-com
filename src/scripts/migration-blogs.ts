import { prisma } from '@/lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';

async function migrate() {
  try {
    const jsonFile = join(process.cwd(), 'public', 'data', 'blogs-admin.json');
    const data = JSON.parse(readFileSync(jsonFile, 'utf-8'));

    console.log(`Migrating ${data.length} blog posts...`);

    for (const blog of data) {
      await prisma.blogPost.create({
        data: {
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          image: blog.image,
          date: blog.date,
          author: blog.author,
          createdAt: new Date(blog.createdAt),
        },
      });
      console.log(`✓ Migrated: ${blog.title}`);
    }

    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
