import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | SwiftWare',
  description: 'See how we\'ve helped businesses transform with our services.',
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
        <p className="text-xl text-zinc-400">Coming soon...</p>
      </div>
    </main>
  );
}
