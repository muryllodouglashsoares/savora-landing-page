import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { MenuSection } from "@/components/menu/MenuSection";
import { About } from "@/components/sections/About";
import { Specialties } from "@/components/sections/Specialties";
import { Ingredients } from "@/components/sections/Ingredients";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Reservation } from "@/components/sections/Reservation";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Toaster } from "@/components/ui/sonner";

const title = "Savora — Cozinha contemporânea nos Jardins, São Paulo";
const description =
  "Restaurante contemporâneo de fogo e precisão. Conheça o cardápio digital do Savora, reserve sua mesa e viva um jantar cinematográfico nos Jardins.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Savora",
          servesCuisine: ["Contemporânea", "Italiana"],
          priceRange: "$$$",
          telephone: "+55 11 4002-8922",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua das Oliveiras, 1287",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          openingHours: ["Tu-Th 18:00-23:00", "Fr-Sa 12:00-00:00", "Su 12:00-17:00"],
          acceptsReservations: true,
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <Specialties />
        <Ingredients />
        <Gallery />
        <Reviews />
        <Reservation />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
