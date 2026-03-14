'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminSession } from '@/utils/admin';
import { FormState } from '@/types/admin';

function BlogManagementForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormState({
          isLoading: false,
          isError: true,
          errorMessage: 'Lütfen bir resim dosyası seçiniz.',
          isSuccess: false,
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setFormState({
          isLoading: false,
          isError: true,
          errorMessage: 'Resim boyutu 5MB\'dan küçük olmalıdır.',
          isSuccess: false,
        });
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFormState({
        isLoading: false,
        isError: false,
        isSuccess: false,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setFormState({
        isLoading: false,
        isError: true,
        errorMessage: 'Başlık gerekli.',
        isSuccess: false,
      });
      return;
    }

    if (!formData.excerpt.trim()) {
      setFormState({
        isLoading: false,
        isError: true,
        errorMessage: 'Özet gerekli.',
        isSuccess: false,
      });
      return;
    }

    if (!formData.content.trim()) {
      setFormState({
        isLoading: false,
        isError: true,
        errorMessage: 'İçerik gerekli.',
        isSuccess: false,
      });
      return;
    }

    if (!formData.image) {
      setFormState({
        isLoading: false,
        isError: true,
        errorMessage: 'Resim gerekli.',
        isSuccess: false,
      });
      return;
    }

    setFormState({
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.image);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('excerpt', formData.excerpt);
      uploadFormData.append('content', formData.content);

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Blog yazısı eklenemedi.');
      }

      setFormState({
        isLoading: false,
        isError: false,
        isSuccess: true,
      });

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: null,
      });
      setPreviewUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Success message timeout
      setTimeout(() => {
        setFormState({
          isLoading: false,
          isError: false,
          isSuccess: false,
        });
      }, 3000);
    } catch (error) {
      setFormState({
        isLoading: false,
        isError: true,
        errorMessage:
          error instanceof Error ? error.message : 'Bir hata oluştu.',
        isSuccess: false,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Yeni Blog Yazısı Ekle</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">Yazı Fotoğrafı</label>
          <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer bg-indigo-50">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              {previewUrl ? 'Resmi Değiştir' : 'Resim Seçin'}
            </button>
            <p className="text-gray-600 text-sm mt-2">Veya sürükleyip bırakın</p>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm mb-2">Seçili Resim:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-xs max-h-48 rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Başlık</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Yazı başlığını giriniz"
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            maxLength={100}
          />
          <p className="text-gray-500 text-xs mt-1">
            {formData.title.length}/100
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Özet (Summary)</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Yazının kısa bir özeti"
            rows={2}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
            maxLength={200}
          />
          <p className="text-gray-500 text-xs mt-1">
            {formData.excerpt.length}/200
          </p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">İçerik</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Yazının tam içeriğini giriniz..."
            rows={12}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none font-mono text-sm"
          />
          <p className="text-gray-500 text-xs mt-1">
            En az 50 karakter
          </p>
        </div>

        {/* Error Message */}
        {formState.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {formState.errorMessage}
          </div>
        )}

        {/* Success Message */}
        {formState.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✓ Blog yazısı başarıyla eklendi!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formState.isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState.isLoading ? 'Ekleniyor...' : '📝 Blog Yazısı Ekle'}
        </button>
      </form>
    </div>
  );
}

export default function BlogManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = getAdminSession();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
      
      if (!isAuth) {
        router.push('/Y');
      }
    };

    // Small delay to ensure hydration is done
    const timer = setTimeout(checkAuth, 0);
    return () => clearTimeout(timer);
  }, [router]);

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Blog Yönetimi</h1>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Yükleniyor...</p>
            </div>
          </div>
        }
      >
        <BlogManagementForm />
      </Suspense>
    </div>
  );
}
