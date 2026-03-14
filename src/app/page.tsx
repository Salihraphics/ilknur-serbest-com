import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <AboutPreview />
      <BlogPreview />
      <CTA />
    </main>
  );
}
