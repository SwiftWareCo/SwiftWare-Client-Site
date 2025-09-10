import FocusHero from "@/components/FocusHero";
import ContactDialog from "@/components/ContactDialog";
import FocusAwareHome from "@/components/FocusAwareHome";

export default function Home() {
  return (
    <div id="home" >
      <FocusHero />
      <FocusAwareHome />
      <ContactDialog />
    </div>
  );
}