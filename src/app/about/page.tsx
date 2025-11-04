import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SwiftWare | Our Story',
  description: 'Learn about SwiftWare - a team of specialists solving complex business challenges.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">About SwiftWare</h1>
        <p className="text-xl text-zinc-400">Coming soon...</p>
      </div>
    </main>
  );
}
