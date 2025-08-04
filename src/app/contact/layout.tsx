import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SwiftWare - Get in Touch",
  description: "Contact SwiftWare for enterprise software solutions. Get in touch with our team to discuss your business needs and digital transformation goals.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 