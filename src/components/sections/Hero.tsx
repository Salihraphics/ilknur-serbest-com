import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Resmi - Boydan Boya */}
      <div className="relative w-full h-96 md:h-screen">
        <Image
          src="/assets/hero.png"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
