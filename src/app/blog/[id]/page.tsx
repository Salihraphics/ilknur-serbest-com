import Link from 'next/link';
import { getBlogPosts } from '@/data/blogs';

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogs = await getBlogPosts();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <main>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Yazı Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız yazı mevcut değil.</p>
            <Link href="/blog" className="text-indigo-600 font-semibold hover:text-emerald-600">
              Blog'a Dön
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-emerald-100 hover:text-white mb-1 inline-flex items-center text-xs">
            ← Blog'a Dön
          </Link>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="text-emerald-100">
            <span>{blog.date}</span> • <span>Yazar: {blog.author}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.image && (
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-8 whitespace-pre-line">
              {blog.content}
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">İlginizi Çeken Bir Programa Mı Var?</h2>
          <p className="text-emerald-100 text-sm mb-4">
            Hemen iletişime geçin ve özel bir teklif alın
          </p>
          <Link href="/contact" className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition inline-block">
            Teklif Al
          </Link>
        </div>
      </section>
    </main>
  );
}
