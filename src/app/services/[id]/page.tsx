import Link from 'next/link';

const serviceDetails: Record<string, any> = {
  '1': {
    title: 'Kurumsal Eğitim Programları',
    description: 'Şirketinizin ihtiyaçlarına özel tasarlanmış eğitim programları',
    details: `
    Kurumsal eğitim programlarımız, her şirketin benzersiz ihtiyaçlarına göre özelleştirilir.

    ## Neden Kurumsal Eğitim?

    - Çalışan performansını artırır
    - Şirkete katma değer sağlar  
    - Çalışan memnuniyetini artırır
    - İçsel iletişimi güçlendirir

    ## Program Özellikleri

    - Profesyonel eğitmenleri
    - Etkili metodoloji
    - Pratik uygulamalar
    - Katılımcı yaklaşım
    - Sonuç odaklılık
    `,
  },
  '2': {
    title: 'Profesyonel Satış Becerileri',
    description: 'Satış ekibinizin performansını artırmak için etkili eğitim',
    details: `
    Satış ekibinizin performansını arttıracak modern satış teknikleri eğitimi.

    ## Eğitim İçeriği

    - Modern Satış Teknikleri
    - Müşteri İhtiyaç Analizi
    - Görüşme Teknikleri
    - İtiraz Yönetimi
    - Satış Kapatma Teknikleri

    ## Hedefler

    - Satış kabiliyetini artırma
    - Müşteri memnuniyetini sağlama
    - Satış rakamlarını yükseltme
    `,
  },
  '3': {
    title: 'Liderlik Geliştirme Programları',
    description: 'Liderlerinizi geliştirmek için kişiselleştirilmiş koçluk',
    details: `
    Liderlerinizi geliştirmek ve onların potansiyelini maksimize etmek için tasarlanan program.

    ## Program Aşamaları

    1. Kişisel Değerlendirme
    2. Gelişim Planı Oluşturma
    3. Koçluk Seansları
    4. Pratik Uygulamalar
    5. Sonuç Değerlendirmesi

    ## Beklenen Sonuçlar

    - Liderlik becerilerinde gelişim
    - Ekibi etkileme yeteneğini artırma
    - Karar verme yeteneğinde iyileştirme
    `,
  },
};

export default async function ServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = serviceDetails[id];

  if (!service) {
    return (
      <main>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Hizmet Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız hizmet mevcut değil.</p>
            <Link href="/services" className="text-indigo-600 font-semibold hover:text-emerald-600">
              Hizmetlere Dön
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="text-emerald-100 hover:text-white mb-1 inline-flex items-center text-xs">
            ← Hizmetlere Dön
          </Link>
          <h2 className="text-2xl font-bold mb-1">{service.title}</h2>
          <p className="text-emerald-100 text-sm">{service.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="text-gray-700 leading-8 whitespace-pre-line">
            {service.details}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Bu Hizmet Sizin İçin Mi?</h2>
          <p className="text-emerald-100 text-sm mb-4">
            Şirketinizin ihtiyaçlarını konuşmak için bize ulaşın
          </p>
          <Link href="/contact" className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition inline-block">
            Teklif Al
          </Link>
        </div>
      </section>
    </main>
  );
}
