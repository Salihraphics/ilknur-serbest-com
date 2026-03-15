'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession } from '@/utils/admin';
import { AdminStats } from '@/types/admin';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  createdAt: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!getAdminSession()) {
      router.push('/Y');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, blogsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/blog'),
        ]);
        const statsData = await statsRes.json();
        const blogsData = await blogsRes.json();
        setStats(statsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error('Veri yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" başlıklı blog yazısını silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || 'Silme işlemi başarısız');
      }

      setDeleteMessage({ type: 'success', text: 'Blog yazısı silindi!' });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      setTimeout(() => setDeleteMessage(null), 3000);
    } catch (error) {
      setDeleteMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Silme işlemi başarısız',
      });
      setTimeout(() => setDeleteMessage(null), 3000);
    }
  };

  if (!getAdminSession()) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Quick Actions - Top */}
      <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-white text-xl font-bold mb-4">⚡ Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/Y/blog')}
            className="bg-white text-indigo-600 px-4 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            📝 Yeni Blog Yazısı
          </button>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-600 px-4 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition text-center"
          >
            👁️ Blog Sayfası
          </a>
          <button
            onClick={() => {
              localStorage.removeItem('adminSession');
              router.push('/Y');
            }}
            className="bg-white text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            🚪 Oturumu Kapat
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Active Users */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Aktif Kişi Sayısı</p>
              <h2 className="text-4xl font-bold text-indigo-600">
                {stats?.activeUsers || 0}
              </h2>
            </div>
            <div className="text-5xl opacity-20">👥</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Son 24 saat içinde</p>
        </div>

        {/* Total Posts */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Toplam Blog Yazısı</p>
              <h2 className="text-4xl font-bold text-emerald-600">
                {stats?.totalPosts || 0}
              </h2>
            </div>
            <div className="text-5xl opacity-20">📝</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Sitede yayınlı yazılar</p>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Yazı Yönetimi ({blogs.length})</h2>

        {deleteMessage && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg border ${
              deleteMessage.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {deleteMessage.type === 'success' ? '✓' : '✗'} {deleteMessage.text}
          </div>
        )}

        {blogs.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Henüz blog yazısı yok.</p>
        ) : (
          <div className="space-y-4 overflow-x-auto">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                  <p className="text-xs text-gray-500 mt-2">{blog.date}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={`/blog/${blog.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition text-sm"
                  >
                    👁️
                  </a>
                  <button
                    onClick={() => handleDeleteBlog(blog.id, blog.title)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold transition text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
