import FooterSection from "@/components/main page/footerSection";
import HeroSection from "@/components/main page/heroSection";
import ServicesSection from "@/components/main page/servicesSection";

export default function Home() {

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-dark-2/50">
        <div className="mx-auto px-6 py-6">
          <HeroSection />
          <ServicesSection />
        </div>
        <FooterSection />
      </div>
    </div>

  );
}