import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing & SEO Services | SwiftWare',
  description:
    'Stop hoping for leads and start getting found. We turn your website into a 24/7 lead-generation engine with SEO, social media, and targeted ad campaigns.',
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
