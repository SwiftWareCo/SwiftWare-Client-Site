import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientShowcase from '@/components/ClientShowcase';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div id="home" className="relative min-h-screen">
      <Navbar />
      <main className="relative">
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="clients" className="relative bg-white/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-slate-50/60 to-white/80"></div>
          <div className="relative z-10">
            <ClientShowcase />
          </div>
        </section>
        
        <section id="features" className="relative">
          <Features />
        </section>
      </main>
      <Footer />
    </div>
  );
}
