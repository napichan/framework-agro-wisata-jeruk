import { Catalog } from "./landing/catalog";
import { Features } from "./landing/features";
import { Footer, ReservationCta } from "./landing/footer-cta";
import { Hero } from "./landing/hero";
import { Navbar, TopBar } from "./landing/sections";
import { ScannerSection } from "./landing/scanner";
import { RouteSection } from "./landing/route-section";
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
