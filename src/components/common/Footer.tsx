import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Şirket Bilgisi */}
          <div>
            <Image
              src="/assets/logo/logo.png"
              alt="İlknur Serbest Logo"
              width={300}
              height={120}
              className="h-auto w-56 mb-4"
            />
            <p className="text-sm text-gray-400">Kurumsal Eğitim • Eğitim Tasarımı</p>
            <p className="text-sm mt-2">Organizasyonunuzun potansiyelini ortaya çıkarmak için tasarlanmış, modern ve etkili eğitim çözümleri.</p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-emerald-400 transition">Ana Sayfa</Link></li>
              <li><Link href="/gallery" className="hover:text-emerald-400 transition">Galeri</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">Hakkımızda</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition">Blog</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 <a href="tel:+905308220816" className="hover:text-emerald-400">+90 530 822 08 16</a></li>
              <li>✉️ <a href="mailto:info@example.com" className="hover:text-emerald-400">info@example.com</a></li>
              <li>📍 İstanbul, Türkiye</li>
              <li>⏰ Pazartesi-Cuma: 09:00-20:00</li>
            </ul>
          </div>

          {/* Politikalar */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Politikalar</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-emerald-400">Gizlilik Politikası</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400">Çerez Politikası</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400">Kullanım Şartları</Link></li>
            </ul>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <p className="text-sm">© 2026 İlknur Serbest. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-emerald-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-emerald-400 transition">Facebook</a>
              <a href="#" className="hover:text-emerald-400 transition">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
