"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Clock } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playSoftClick();
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0b0c0e]/85 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-2xl"
            : "bg-gradient-to-b from-[#0b0c0e]/80 via-[#0b0c0e]/40 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-xs uppercase tracking-[0.25em] text-zinc-300 font-medium">
            <button
              onClick={() => scrollToSection("product-breakdown")}
              className="hover:text-white hover:tracking-[0.28em] transition-all duration-300 cursor-pointer"
            >
              The watch
            </button>
            <button
              onClick={() => scrollToSection("craftsmanship-movement")}
              className="hover:text-white hover:tracking-[0.28em] transition-all duration-300 cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("dials-roll")}
              className="hover:text-white hover:tracking-[0.28em] transition-all duration-300 cursor-pointer"
            >
              Fittings
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Central Serif/Sans Logo "VÉRAN" */}
          <div className="flex flex-col items-center select-none cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.38em] text-white uppercase transition-colors duration-300 group-hover:text-[#f3e5ab]">
              VÉRAN
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.45em] text-zinc-400 font-sans mt-0.5 group-hover:text-zinc-200 transition-colors">
              PARIS
            </span>
          </div>

          {/* Right Actions: Sound & Book Fitting */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={toggleSound}
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-300 relative group"
              title={isMuted ? "Sound muted" : "Audio ambience active"}
              aria-label="Toggle sound"
            >
              {isMuted ? (
                <VolumeX size={17} className="text-zinc-500" />
              ) : (
                <div className="relative">
                  <Volume2 size={17} className="text-[#d4af37]" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-ping opacity-75" />
                </div>
              )}
            </button>

            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium text-white transition-all duration-500 rounded-none border border-white/20 bg-white/[0.03] backdrop-blur-sm hover:border-[#d4af37]/80 hover:bg-[#d4af37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] group cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Clock size={12} className="text-[#d4af37] opacity-80 group-hover:opacity-100 transition-opacity" />
                Book a fitting
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0b0c0e]/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-6 text-sm uppercase tracking-[0.25em] text-zinc-300">
              <button
                onClick={() => scrollToSection("product-breakdown")}
                className="text-left hover:text-white transition-colors"
              >
                The watch
              </button>
              <button
                onClick={() => scrollToSection("craftsmanship-movement")}
                className="text-left hover:text-white transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("dials-roll")}
                className="text-left hover:text-white transition-colors"
              >
                Fittings
              </button>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-zinc-400">Audio Experience</span>
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-2 text-xs text-[#d4af37]"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
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

