'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/logo.png"
              alt="İlknur Serbest Logo"
              width={300}
              height={120}
              className="h-auto w-64"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">
              Ana Sayfa
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-emerald-600 transition">
              Galeri
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition">
              Hakkımızda
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition">
              İletişim
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-emerald-600 transition">
              Teklif Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">
              Ana Sayfa
            </Link>
            <Link href="/gallery" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">
              Galeri
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">
              Hakkımızda
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">
              Blog
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">
              İletişim
            </Link>
            <Link href="/contact" className="block w-full text-center bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-3 py-2 rounded-lg">
              Teklif Al
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
