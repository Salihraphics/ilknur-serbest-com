import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Kurumsal Eğitim',
    description: 'Şirketinizin ihtiyaçlarına uygun özel eğitim programları',
    icon: '📚',
  },
  {
    id: 2,
    title: 'Satış Geliştirme',
    description: 'Satış ekibinizin performansını arttırmak için eğitimler',
    icon: '📈',
  },
  {
    id: 3,
    title: 'Liderlik Koçluğu',
    description: 'Liderinizi geliştirecek kişisel koçluk programları',
    icon: '👔',
  },
  {
    id: 4,
    title: 'İletişim Becerisi',
    description: 'Etkili iletişim ve müzakere eğitimleri',
    icon: '💬',
  },
  {
    id: 5,
    title: 'Takım Geliştirme',
    description: 'Ekip dinamiğini güçlendirecek çalışmalar',
    icon: '👥',
  },
  {
    id: 6,
    title: 'Müşteri İlişkileri',
    description: 'Müşteri memnuniyeti ve ilişki yönetimi eğitimleri',
    icon: '⭐',
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Hizmetlerimiz</h2>
          <p className="text-gray-600 text-lg">
            İşletmenizin başarısı için sunduğumuz kapsamlı hizmetleri keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:scale-105">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link href={`/services/${service.id}`} className="text-indigo-600 font-semibold hover:text-emerald-600 transition inline-flex items-center">
                Detayları Gör <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-emerald-600 transition">
            Tüm Hizmetleri Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}
