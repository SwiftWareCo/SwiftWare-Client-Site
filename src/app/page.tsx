import Hero from '@/components/Hero';
import ClientShowcase from '@/components/ClientShowcase';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div id="home" className="relative min-h-screen">
      <main className="relative">
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="clients" className="relative bg-white/80 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-slate-50/40 to-white/90"></div>
          <div className="relative z-10">
            <ClientShowcase />
          </div>
        </section>
        
        <section id="features" className="relative">
          <Features />
        </section>
      </main>
    </div>
  );
}
