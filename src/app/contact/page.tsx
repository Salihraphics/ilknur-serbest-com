'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi buraya eklenecek
    console.log('Form submitted:', formData);
    alert('Form gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-1">İletişim</h1>
          <p className="text-emerald-100 text-sm">
            Bize ulaşın ve özel bir teklif alın
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">İletişim Bilgileri</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefon</h3>
                <a href="tel:+905308220816" className="text-indigo-600 hover:text-emerald-600 font-semibold">
                  +90 530 822 08 16
                </a>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">E-mail</h3>
                <a href="mailto:info@example.com" className="text-indigo-600 hover:text-emerald-600 font-semibold">
                  info@example.com
                </a>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Adres</h3>
                <p className="text-gray-700">
                  İstiklal Caddesi - Tünel Geçidi<br />
                  İş Hanı C Blok 432-433<br />
                  Beyoğlu / İstanbul
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hizmet Saatleri</h3>
                <p className="text-gray-700">
                  Pazartesi - Cuma: 09:00 - 20:00
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-indigo-600 hover:text-emerald-600 font-semibold">LinkedIn</a>
                  <a href="#" className="text-indigo-600 hover:text-emerald-600 font-semibold">Facebook</a>
                  <a href="#" className="text-indigo-600 hover:text-emerald-600 font-semibold">Instagram</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Mesaj Gönder</h2>
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-8 rounded-xl shadow-sm">
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Şirket Adı</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Mesajınız</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 h-32"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-emerald-600 transition"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
