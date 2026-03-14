'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Statik galeri resimleri - assets/gallery klasöründen çekecek
  const galleryImages = [
    { id: 1, src: '/assets/gallery/image-1.jpg', alt: 'Eğitim Fotoğrafı 1' },
    { id: 2, src: '/assets/gallery/image-2.jpg', alt: 'Eğitim Fotoğrafı 2' },
    { id: 3, src: '/assets/gallery/image-3.jpg', alt: 'Eğitim Fotoğrafı 3' },
    { id: 4, src: '/assets/gallery/image-4.jpg', alt: 'Eğitim Fotoğrafı 4' },
    { id: 5, src: '/assets/gallery/image-5.jpg', alt: 'Eğitim Fotoğrafı 5' },
    { id: 6, src: '/assets/gallery/image-6.jpg', alt: 'Eğitim Fotoğrafı 6' },
    { id: 7, src: '/assets/gallery/image-7.jpg', alt: 'Eğitim Fotoğrafı 7' },
    { id: 8, src: '/assets/gallery/image-8.jpg', alt: 'Eğitim Fotoğrafı 8' },
    { id: 9, src: '/assets/gallery/image-9.jpg', alt: 'Eğitim Fotoğrafı 9' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-1">Galeri</h1>
          <p className="text-emerald-100 text-sm">
            Eğitim programlarından etkinliklere kadar tüm anlardan fotoğraflar
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.src)}
                className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition">
                    <span className="text-3xl">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-screen">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-emerald-400 transition"
            >
              ✕
            </button>
            <div className="bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-center max-h-[90vh] p-4">
                <Image
                  src={selectedImage}
                  alt="Büyütülmüş Görüntü"
                  width={1200}
                  height={900}
                  className="object-contain max-h-[90vh] w-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Eğitim Almak İstiyorum</h2>
          <p className="text-emerald-100 text-lg mb-8">
            Hemen iletişime geçin ve özel bir teklif alın
          </p>
          <a href="/contact" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition inline-block shadow-lg">
            Teklif Al
          </a>
        </div>
      </section>
    </main>
  );
}
