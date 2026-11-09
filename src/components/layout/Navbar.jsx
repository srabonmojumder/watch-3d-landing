"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = mounted && scrolled;

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playSoftClick();
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-black/75 backdrop-blur-xl border-white/10 py-4 shadow-2xl"
            : "bg-black/40 backdrop-blur-md border-white/10 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left menu items: "The watch", "Process", "Fittings", "Order Form" */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-[0.25em] text-zinc-300 font-medium">
            <button
              onClick={() => scrollToSection("product-breakdown")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              The watch
            </button>
            <button
              onClick={() => scrollToSection("craftsmanship-movement")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("dials-roll")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Fittings
            </button>
            <button
              onClick={() => scrollToSection("order-section")}
              className="text-white hover:text-zinc-300 font-semibold transition-colors duration-200 cursor-pointer flex items-center space-x-1.5"
            >
              <span>Order Form</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center brandmark: "VÉRAN" (elegant tracking and weight) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center select-none cursor-pointer group"
          >
            <span className="font-sans text-xl md:text-2xl font-normal tracking-[0.35em] text-white uppercase transition-opacity duration-300 group-hover:opacity-85">
              VÉRAN
            </span>
            <span className="text-[8px] uppercase tracking-[0.45em] text-zinc-400 font-sans mt-0.5">
              PARIS
            </span>
          </div>

          {/* Right action: "Order Now" pill button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSound}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title={isMuted ? "Sound muted" : "Audio active"}
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <button
              onClick={() => scrollToSection("order-section")}
              className="rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.22em] font-medium text-white border border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm hover:border-white"
            >
              Order Now · €9,800
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-8 py-7 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-5 text-xs uppercase tracking-[0.25em] text-zinc-300">
              <button
                onClick={() => scrollToSection("product-breakdown")}
                className="text-left hover:text-white py-1 transition-colors"
              >
                The watch
              </button>
              <button
                onClick={() => scrollToSection("craftsmanship-movement")}
                className="text-left hover:text-white py-1 transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("dials-roll")}
                className="text-left hover:text-white py-1 transition-colors"
              >
                Fittings
              </button>
              <button
                onClick={() => scrollToSection("order-section")}
                className="text-left text-white font-medium py-1 transition-colors flex items-center space-x-2"
              >
                <span>Order Form</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-zinc-400">
                <span>Sound Ambience</span>
                <button onClick={toggleSound} className="text-white uppercase tracking-widest">
                  {isMuted ? "Muted" : "Active"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export default Navbar;
