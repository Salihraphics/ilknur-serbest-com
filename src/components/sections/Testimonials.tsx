const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    company: 'ABC Şirketi',
    text: 'Harika bir deneyim yaşadık. Profesyonel yaklaşım ve yüksek kalite hizmet.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatma Özdemir',
    company: 'XYZ Ltd.',
    text: 'Ekibimizin performansı önemli ölçüde arttı. Çok memnun kaldık.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    company: 'DEF İnşaat',
    text: 'Beklenimin üstünde sonuçlar. Kesinlikle tekrar çalışacağız.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 via-emerald-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Müşteri Referansları</h2>
          <p className="text-gray-600 text-lg">
            Bizimle çalışan müşterilerimizin deneyimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
