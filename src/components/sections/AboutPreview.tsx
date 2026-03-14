import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Hakkımızda</h2>
            
            <p className="text-gray-700 mb-4 leading-8">
              Kurumsal eğitim ve finansal danışmanlıkta 20 yılı aşkın deneyime sahibim. İstanbul Üniversitesi ve Marmara Üniversitesi'nde eğitimimi tamamladıktan sonra, Türk Hava Yolları ve Pegasus Airlines'da operasyonel rol alarak kariyer hayatımı başlattım.
            </p>

            <p className="text-gray-700 mb-6 leading-8">
              Bugün, farklı sektörlerdeki firmalara finans danışmanlığı veriyor ve işletme verimliliğini artırmaya yönelik kurumsal eğitimler tasarlıyorum. Sahadaki deneyimimi ve yetişkin eğitimi uzmanlığımı, kurumların başarılarına katkı sağlamak için kullanıyorum.
            </p>

            <div className="flex gap-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-emerald-500 mb-1">20+</h3>
                <p className="text-gray-600 text-sm">Yıllık Deneyim</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-emerald-500 mb-1">10K+</h3>
                <p className="text-gray-600 text-sm">Saatlik Eğitim</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-emerald-500 mb-1">100+</h3>
                <p className="text-gray-600 text-sm">Danışman Verilen Firma</p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/about" className="text-indigo-600 font-semibold hover:text-emerald-600 transition inline-flex items-center">
                Detaylı Hakkında <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Right - Stats/Visual */}
          <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-8 rounded-xl">
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Eğitim</h3>
                <p className="text-gray-600 text-sm">İstanbul Üniversitesi Bankacılık, İşletme, ve Yıldız Teknik Üniversitesi Yüksek Lisans</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Deneyim</h3>
                <p className="text-gray-600 text-sm">Türk Hava Yolları, Pegasus Airlines, ve çeşitli KOBİ'lerde finans danışmanlığı</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Uzmanlık</h3>
                <p className="text-gray-600 text-sm">Kurumsal eğitim tasarımı, finansal danışmanlık, ve işletme verimliliği</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
