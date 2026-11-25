import { Catalog } from "./catalog";
import { Features } from "./features";
import { Footer, ReservationCta } from "./footer-cta";
import { Hero } from "./hero";
import { Navbar, TopBar } from "./sections";
import { ScannerSection } from "./scanner";
import { RouteSection } from "./route-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar active="beranda" />
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
