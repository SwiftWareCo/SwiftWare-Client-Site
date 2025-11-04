import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swiftware — Software Development & Digital Services',
  description:
    'One partner. Four services. Brand Design, Digital Marketing & SEO, AI & Process Automation, and Custom Software Development.',
};

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          One Partner. Four Services.
        </h1>
        <p className="text-xl text-zinc-400">
          Coming soon - Homepage redesign...
        </p>
      </div>
    </main>
  );
}
