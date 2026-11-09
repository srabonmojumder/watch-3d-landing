"use client";
import React from "react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { HeroScrollytelling } from "@/components/sections/HeroScrollytelling";
import { ProductBreakdown } from "@/components/sections/ProductBreakdown";
import { WatchRollShowcase } from "@/components/sections/WatchRollShowcase";
import { MovementSection } from "@/components/sections/MovementSection";
import { ProvenanceSection } from "@/components/sections/ProvenanceSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { Footer } from "@/components/layout/Footer";
import { FittingModal } from "@/components/sections/FittingModal";
import { useWatch } from "@/context/WatchContext";
export default function Home() {
    const { selectedDial, setSelectedDial, isBookingOpen, setIsBookingOpen, scrollToOrder } = useWatch();
    const handleOpenBooking = (dialName = "BLUE") => {
        const dialNormalized = dialName.toLowerCase();
        setSelectedDial(dialNormalized);
        scrollToOrder(dialNormalized);
    };
    return (<SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#040507] text-[#f4f4f5] selection:bg-[#d4af37]/30 selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={() => handleOpenBooking("BLUE")}/>

        {/* Section 1 & 2: Cinematic Scrollytelling Video/Image-Scrub Hero */}
        <HeroScrollytelling />

        {/* Section 3: Product Breakdown Section */}
        <ProductBreakdown onOpenBooking={() => handleOpenBooking("BLUE")}/>

        {/* Section 4: "THREE DIALS, ONE CASE" Pinned 3D Scrollytelling Archive */}
        <WatchRollShowcase onSelectDialForBooking={(dial) => handleOpenBooking(dial)}/>

        {/* Calibre V-101 Manufacture Movement & Winding Simulation */}
        <MovementSection />

        {/* Provenance: Place Vendôme Paris Atelier */}
        <ProvenanceSection />

        {/* Dedicated 3D Configurator & Private Order Section */}
        <OrderSection initialDial={selectedDial}/>

        {/* Luxury Haute Horlogerie Footer */}
        <Footer />

        {/* Private Salon Fitting Modal */}
        <FittingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} preselectedDial={selectedDial.toUpperCase()}/>
      </main>
    </SmoothScrollProvider>);
}
