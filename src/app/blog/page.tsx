import Link from 'next/link';
import { getBlogPosts, type Blog } from '@/data/blogs';

export default async function Blog() {
  const blogs: Blog[] = await getBlogPosts();
  const hasBlog = blogs.length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-1">Blog</h1>
          <p className="text-emerald-100 text-sm">
            Çok yakında ilgi çekici içeriklerle dönüşeceğiz
          </p>
        </div>
      </section>

      {/* Blog Posts or Empty State */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasBlog ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
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
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="text-6xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Henüz İçerik Yok</h2>
              <p className="text-gray-600 mb-8">
                Blog bölümü yakında heyecan verici yazılarla dolacaktır. Bizi takip edin!
              </p>
              <Link href="/" className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:from-indigo-700 hover:to-emerald-600 transition inline-block">
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Güncellemeler İçin Bizi Takip Edin</h2>
          <p className="text-emerald-100 text-sm mb-4">
            Yeni blog yazıları ve faydalı içerikler için sosyal medya kanallarımızı takip edebilirsiniz
          </p>
          <div className="flex justify-center space-x-2 flex-wrap">
            <a href="#" className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-emerald-50 transition">
              LinkedIn
            </a>
            <a href="#" className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-emerald-50 transition">
              Facebook
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
