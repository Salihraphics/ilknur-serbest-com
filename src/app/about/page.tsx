import Image from 'next/image';

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-1">Hakkımda</h1>
          <p className="text-emerald-100 text-sm">
            Kurumsal eğitim ve finansal danışmanlıkta 20 yılı aşkın deneyime sahibim
          </p>
        </div>
      </section>

      {/* Main Content - İlknur Serbest Kimdir */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Left - Image */}
            <div className="md:col-span-1">
              <div className="relative w-full h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/assets/about.png"
                  alt="İlknur Serbest"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold mb-6 text-slate-900">İlknur Serbest Kimdir?</h2>
              
              <p className="text-gray-700 mb-4 leading-8">
                1981 yılında İstanbul'da doğdum. Mesleki disiplinimin ve iş hayatına bakış açımın temellerini, bugün hala hayatımızdaki yerini çok önemsediğim Ticaret Meslek Lisesi'nde attım. Eğitim yolculuğuma İstanbul Üniversitesi Bankacılık bölümü ile devam ettim ve ardından İşletme Fakültesi'nde lisans eğitimimi tamamladım.
              </p>

              <p className="text-gray-700 mb-4 leading-8">
                <strong>Okul Hayatım:</strong> Turizm Bakanlığı'nın ön lisans denklik programıyla "Turizm ve Otelcilik" alanında başlayan yüksek öğrenim hikâyem, Marmara Üniversitesi "Satış Yönetimi", Anadolu Üniversitesi "İşletme" ve İstanbul Üniversitesi "İnsan Kaynakları Yönetimi" dallarındaki mezuniyetlerimle devam etti. Yüksek lisansımı ise Yıldız Teknik Üniversitesi'nde "Hayat Boyu Öğrenme ve Yetişkin Eğitimi" üzerine tamamladım.
              </p>

              <p className="text-gray-700 leading-8">
                <strong>İş Hayatım:</strong> 26 yıl dolu dolu geçen iş hayatımda iki farklı ana meslek kolunda çalışma şansım oldu. Türk Hava Yolları ve Pegasus Airlines ile vardiya işletmeciliğine başlayıp, 13 senelik harika yolculuğumda kabiliyetleri değerlendirme, kariyer geliştirme ve departman kuruluşlarında rol almış oldum. Leras Tekstil, Seyidoğlu, Onur Marketler ve DEVA Holding kuruluşlarında ise eğitim yöneticiği ve eş zamanlı olarak eğitmen rollerini icra etti. Departman kuruluşları, eğitim ve öğrenme tasarımları, LMS yönetimi ve içerik geliştirmesi gibi işin muğlağında görev almanın yanı sıra eğitmenlik kasıyla da 10.000 saat üzerinde eğitim verme tecrübesine ulaştım.
              </p>
            </div>
          </div>

          {/* Full Width Text Section */}
          <div className="bg-gradient-to-r from-slate-50 to-amber-50 p-8 md:p-12 rounded-xl">
            <p className="text-gray-700 mb-6 leading-8">
              Çalışma hayatına oldukça erken yaşlarda atılan bir profesyonelim. Lise yıllarımda bir devlet bankasında yaptığım stajla başlayan bu yolculuk, üniversite yıllarımda tekstil sektöründeki satış ve mağaza yöneticiliği deneyimlerimle zenginleşti. Mezuniyetimin ardından, 12 yıl boyunca özel bir bankanın çeşitli departmanlarında görev alarak kurumsal yapının ve finansın mutfağında yetiştim. Bu yolda ilerlerken sayısız eğitimlerle donanarak güçlenmeye çalıştım. En güzel şey ise kendinin farklığını bir birey olarak bilerek, katılmış eğitimlerim paydaşlarına ve eğitmenlerine, katılmış sayısız eğitimlerim paydaşlarına ve eğitmenlerine bir birey olarak bilerek bir birey olarak bilerek kendimi gerçekleştirebilmem oldu. Bu gerçekleşmeye birlikte, ilerlerken, kendinin farklığını bir birey olarak bilerek bir birey olarak bilerek kendimi gerçekleştirebilmem oldu.
            </p>

            <p className="text-gray-700 mb-6 leading-8">
              Eğitme olan tutkum ve akademik yolculuğum: Bankacılık kariyerim sırasında verdiğim gönüllü eğitimler, hayatımın dönüm noktalarından biri oldu. Eğitimin dönüştürücü gücünü ve bu alandaki tutkumu keşfettiğimde, bu işi en profesyonel düzeyde yapabilmek adına kendimi geliştirmeye karar verdim. Bu amaçla Yıldız Teknik Üniversitesi Sosyal Bilimler Enstitüsü'nde "Hayat Boyu Öğrenme ve Yetişkin Eğitimi" üzerine yüksek lisans yaparak uzmanlığımı akademik bir zemine taşıdım.
            </p>

            <p className="text-gray-700 mb-6 leading-8">
              Girişimcilik ve danışmanlık deneyimim: 2015 yılında bankacılık kariyerimi noktalayarak kendi ithalat firmamı kurdum. Dört yıl boyunca bir işletmeyi sıfırdan yönetmenin, risk almanın ve finansal sürdürülebilirliği sağlamanın zorluklarını bizzat tecrübe ettim. Firmamı devrettikten sonra, edindiğim bu geniş perspektifi KOBİ'lerle paylaşmaya başladım.
            </p>

            <p className="text-gray-700 leading-8">
              Bugün ne yapıyorum?: Bugün, farklı sektörlerdeki firmalara finans danışmanlığı veriyor ve işletme verimliliğini artırmaya yönelik kurumsal eğitimler tasarlıyorum. Danışmanlık verdiğim kurumlarda sadece finansal yapıyı düzenlemekle kalmıyor; personelin bu yapıya katkısını artıracak, uygulanabilir ve sonuç odaklı eğitim programları hayata geçiriyorum. Sahadaki 20 yılı aşkın deneyimimi ve yetişkin eğitimi uzmanlığımı, kurumların finansal başarılarına katkı sağlamak için kullanmaya devam ediyorum.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">20+</h3>
              <p className="text-gray-300 text-lg">Yıllık Deneyim</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">10.000+</h3>
              <p className="text-gray-300 text-lg">Saatlik Eğitim</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">100+</h3>
              <p className="text-gray-300 text-lg">Danışman Verilen Firma</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
