import Link from 'next/link';
import { getBlogPosts, Blog } from '@/data/blogs';

export default async function BlogPreview() {
  const blogs: Blog[] = await getBlogPosts();
  const latestBlogs = blogs.slice(0, 3);
  const hasBlogs = blogs.length > 0;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Blog</h2>
        </div>

        {hasBlogs ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-indigo-400 to-emerald-400 flex items-center justify-center overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-emerald-600 font-semibold mb-2">{blog.date}</p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.id}`} className="text-indigo-600 font-semibold hover:text-emerald-600 transition inline-flex items-center">
                      Devamını Oku <span className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog" className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-emerald-600 transition">
                Tüm Yazıları Görüntüle
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">📝</span>
            <p className="text-gray-600 mb-6">Henüz yazı eklenmemiş. Yakında heyecan verici içeriklerle dönüşeceğiz!</p>
            <Link href="/blog" className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-emerald-600 transition inline-block">
              Blog Sayfasını Ziyaret Et
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
