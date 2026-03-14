'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearAdminSession } from '@/utils/admin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    clearAdminSession();
    router.push('/Y');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">İlknur Serbest Admin</h1>
              <div className="hidden md:flex gap-4">
                <Link
                  href="/Y/dashboard"
                  className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/Y/blog"
                  className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Blog Yönetimi
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
