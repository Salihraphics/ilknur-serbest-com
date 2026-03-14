'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateAdminPassword, setAdminSession } from '@/utils/admin';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for security
    setTimeout(() => {
      if (validateAdminPassword(password)) {
        setAdminSession();
        router.push('/Y/dashboard');
      } else {
        setError('Şifre yanlış. Lütfen tekrar deneyin.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-emerald-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Admin Panel</h1>
          <p className="text-gray-600">İlknur Serbest</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Şifrenizi giriniz"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            Test Şifresi: <span className="font-mono text-gray-800">ilknurserbest</span>
          </p>
        </div>
      </div>
    </div>
  );
}
