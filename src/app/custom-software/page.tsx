import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Software Development | SwiftWare',
  description: 'Build custom software solutions tailored to your business needs - CRM, AI/RAG, Golf Management, and Web Portals.',
};

export default function CustomSoftwarePage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Custom Software Solutions</h1>
        <p className="text-xl text-zinc-400">Coming soon...</p>
      </div>
    </main>
  );
}
