import { Catalog } from "@/components/catalog";
import { Features } from "@/components/features";
import { Footer, ReservationCta } from "@/components/footer-cta";
import { Hero } from "@/components/hero";
import { Navbar, TopBar } from "@/components/sections";
import { ScannerSection } from "@/components/scanner";
import { RouteSection } from "@/components/route-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <ScannerSection />
      <Catalog />
      <RouteSection />
      <ReservationCta />
      <Footer />
    </main>
  );
}
