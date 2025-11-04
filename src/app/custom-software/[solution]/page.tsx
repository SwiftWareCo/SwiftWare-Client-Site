import { Metadata } from 'next';

interface SolutionPageProps {
  params: {
    solution: string;
  };
}

export function generateMetadata({ params }: SolutionPageProps): Metadata {
  const solutionTitles: Record<string, string> = {
    crm: 'Custom CRM & Field Service Software | SwiftWare',
    'ai-rag': 'AI & RAG Solutions | SwiftWare',
    golf: 'Golf Course Management Software | SwiftWare',
    'web-portals': 'Web & Client Portals | SwiftWare',
  };

  return {
    title: solutionTitles[params.solution] || 'Custom Software Solution | SwiftWare',
    description: 'Custom software solution tailored to your business needs.',
  };
}

export default function SolutionPage({ params }: SolutionPageProps) {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 capitalize">
          {params.solution.replace('-', ' ')}
        </h1>
        <p className="text-xl text-zinc-400">Coming soon...</p>
      </div>
    </main>
  );
}
