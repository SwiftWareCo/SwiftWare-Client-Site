import Hero from "@/components/ClientWebsites/Hero";
import ContactDialog from "@/components/ClientWebsites/ContactDialog";
import ClientLogos from "@/components/ClientWebsites/ClientLogos";
import Timeline from "@/components/ClientWebsites/Timeline";
import CTASection from "@/components/ClientWebsites/CTASection";
import VideoShowcase from "@/components/ClientWebsites/VideoShowcase";
import { VideoShowcaseProvider } from "@/components/ClientWebsites/VideoShowcaseContext";

export default function ClientWebsitesHome() {
  return (
    <VideoShowcaseProvider>
      <div id="client-websites-home">
        <Hero />
        <ClientLogos />
        <VideoShowcase />
        <Timeline />
        <CTASection/>
        <ContactDialog />
      </div>
    </VideoShowcaseProvider>
  );
}