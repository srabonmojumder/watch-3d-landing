"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { HeroScrollytelling } from "@/components/HeroScrollytelling";
import { ProductBreakdown } from "@/components/ProductBreakdown";
import { WatchRollShowcase } from "@/components/WatchRollShowcase";
import { MovementSection } from "@/components/MovementSection";
import { ProvenanceSection } from "@/components/ProvenanceSection";
import { Footer } from "@/components/Footer";
import { FittingModal } from "@/components/FittingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDialForBooking, setSelectedDialForBooking] = useState("BLUE");

  const handleOpenBooking = (dialName: string = "BLUE") => {
    setSelectedDialForBooking(dialName);
    setBookingOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#0b0c0e] text-[#f4f4f5] selection:bg-[#d4af37]/30 selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={() => handleOpenBooking("BLUE")} />

        {/* Section 1 & 2: Cinematic Scrollytelling Video/Image-Scrub Hero */}
        <HeroScrollytelling />

        {/* Section 3: Product Breakdown Section */}
        <ProductBreakdown onOpenBooking={() => handleOpenBooking("BLUE")} />

        {/* Section 4: "THREE DIALS, ONE CASE" Leather Watch Roll Showcase */}
        <WatchRollShowcase
          onSelectDialForBooking={(dial) => handleOpenBooking(dial)}
        />

        {/* Calibre V-101 Manufacture Movement & Winding Simulation */}
        <MovementSection />

        {/* Provenance: Place Vendôme Paris Atelier */}
        <ProvenanceSection />

        {/* Luxury Haute Horlogerie Footer */}
        <Footer />

        {/* Private Salon Fitting Modal */}
        <FittingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          preselectedDial={selectedDialForBooking}
        />
      </main>
    </SmoothScrollProvider>
  );
}
