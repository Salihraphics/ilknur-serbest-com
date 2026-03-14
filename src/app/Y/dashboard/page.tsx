'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession } from '@/utils/admin';
import { AdminStats } from '@/types/admin';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAdminSession()) {
      router.push('/Y');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Stats yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [router]);

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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Monthly Traffic */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Aylık Trafik</p>
              <h2 className="text-4xl font-bold text-emerald-600">
                {stats?.monthlyTraffic?.toLocaleString('tr-TR') || 0}
              </h2>
            </div>
            <div className="text-5xl opacity-20">📊</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Bu ay ziyaretçi</p>
        </div>

        {/* Total Posts */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">Toplam Blog Yazısı</p>
              <h2 className="text-4xl font-bold text-blue-600">
                {stats?.totalPosts || 0}
              </h2>
            </div>
            <div className="text-5xl opacity-20">📝</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Sitede yayınlı yazılar</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/Y/blog"
            className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-emerald-600 transition inline-block text-center"
          >
            📝 Yeni Blog Yazısı Ekle
          </a>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition inline-block text-center"
          >
            👁️ Blog Sayfasını Görüntüle
          </a>
        </div>
      </div>
    </div>
  );
}
