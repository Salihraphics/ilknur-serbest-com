export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Kurumsal Eğitim Programları',
      description: 'Şirketinizin ihtiyaçlarına özel tasarlanmış eğitim programları',
      details: 'Her firma için özelleştirilebilir, kapsamlı eğitim çözümleri sunuyoruz.'
    },
    {
      id: 2,
      title: 'Profesyonel Satış Becerileri',
      description: 'Satış ekibinizin performansını artırmak için etkili eğitim',
      details: 'Modern satış teknikleri ve müşteri yönetimi konularında eğitim.'
    },
    {
      id: 3,
      title: 'Liderlik Geliştirme Programları',
      description: 'Liderlerinizi geliştirmek için kişiselleştirilmiş koçluk',
      details: 'Değer katan liderlik eğitim programlarımız ile liderlerinizi güçlendirin.'
    },
    {
      id: 4,
      title: 'İletişim ve İlişki Yönetimi',
      description: 'Etkili iletişim becerisi geliştirme eğitimleri',
      details: 'İçsel ve dışsal iletişimi güçlendirecek pratik yöntemler.'
    },
    {
      id: 5,
      title: 'Takım Dinamiği ve Takımdaşlık',
      description: 'Güçlü takım kültürü oluşturmak için eğitim',
      details: 'Takım bütünlüğünü sağlayacak interaktif workshop ve eğitimler.'
    },
    {
      id: 6,
      title: 'Müşteri İlişkileri Yönetimi',
      description: 'Müşteri memnuniyetini artırmak için stratejik yaklaşım',
      details: 'Müşteri sadakati ve memnuniyeti arttırmaya yönelik eğitimler.'
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-1">Hizmetler</h1>
          <p className="text-emerald-100 text-sm">
            İşletmenizin başarısı için sunduğumuz profesyonel hizmetler
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-gray-700">{service.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Size Uygun Hizmet Bulduğunuz mu?</h2>
          <p className="text-emerald-100 text-sm mb-4">
            Hemen iletişime geçin ve özel bir teklif alın
          </p>
          <a href="/contact" className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition inline-block">
            Teklif Al
          </a>
        </div>
      </section>
    </main>
  );
}
