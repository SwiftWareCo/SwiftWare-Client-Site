import Hero from "@/components/Hero";
import ContactDialog from "@/components/ContactDialog";
import FocusAwareHome from "@/components/FocusAwareHome";

export default function Home() {
  return (
    <div id="home" >
      <Hero />
      <FocusAwareHome />
      <ContactDialog />
    </div>
  );
}