import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Hizmetlerimiz Hakkında Daha Fazlasını Öğrenmek İster misiniz?
        </h2>
        <p className="text-emerald-100 text-sm mb-4">
          Sizin için özel bir teklif hazırlayabiliriz
        </p>
        <Link href="/contact" className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition inline-block">
          İletişime Geçin
        </Link>
      </div>
    </section>
  );
}
