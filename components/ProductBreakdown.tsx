"use client";

import React, { useState } from "react";
import { TerraceWristView } from "./TerraceWristView";
import { soundManager } from "@/lib/audio";
import { Check, Sparkles, RefreshCw, Eye, Shield, Sliders } from "lucide-react";

interface ProductBreakdownProps {
  onOpenBooking: () => void;
}

export function ProductBreakdown({ onOpenBooking }: ProductBreakdownProps) {
  const [strap, setStrap] = useState<"cognac" | "blue" | "steel">("cognac");
  const [viewMode, setViewMode] = useState<"wrist" | "macro" | "caseback">("wrist");

  const handleStrapChange = (newStrap: "cognac" | "blue" | "steel") => {
    soundManager.playSoftClick();
    setStrap(newStrap);
  };

  const handleViewModeChange = (newMode: "wrist" | "macro" | "caseback") => {
    soundManager.playSoftClick();
    setViewMode(newMode);
  };

  return (
    <section id="product-breakdown" className="relative w-full py-28 md:py-36 bg-[#0b0c0e] border-t border-white/[0.08] px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563eb]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Micro-badge */}
        <div className="flex items-center space-x-3 mb-12">
          <span className="w-8 h-[1px] bg-[#d4af37]" />
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-medium">
            Le Garde-Temps · Masterpiece Breakdown
          </span>
        </div>

        {/* 3-Column Split View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Bold Luxury Typography & Artisan Description */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:pr-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium block mb-3">
                Reference VRN-01 · 2026 Edition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.12] tracking-tight uppercase mb-6">
                STEEL, 39 MM,<br />
                <span className="italic font-normal text-[#f3e5ab]">HAND-WOUND.</span>
              </h2>

              <div className="relative pl-5 border-l border-[#d4af37]/40 mb-8">
                <p className="text-base sm:text-lg text-zinc-200 font-serif italic leading-relaxed">
                  “Made by VÉRAN in Paris. Glashütte lines, guilloché slate, and a strap you change without tools.”
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                <p>
                  Conceived in our Place Vendôme studio and brought to life through five hundred hours of hand execution, Le Voyageur captures the classical proportion of Mid-Century French chronometers.
                </p>
                <p>
                  Its 39.0 mm surgical-grade 316L stainless steel case measures just 9.8 mm in profile, allowing it to slide gracefully beneath a tailored cuff, while its curved lugs follow the natural contours of the wrist.
                </p>
                <p>
                  The bevels on every lug flank are manually drawn with diamond paste on wooden laps to achieve an undistorted optical mirror finish.
                </p>
              </div>
            </div>

            {/* Artisan Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">
                  Provenance
                </span>
                <span className="text-sm font-serif text-white">Paris & Vallée de Joux</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">
                  Annual Allocation
                </span>
                <span className="text-sm font-serif text-[#d4af37]">150 Numbered Pieces</span>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Crisp Portrait Image of the Watch on Wrist on Parisian Terrace */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center space-x-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-full mb-6">
              <button
                onClick={() => handleViewModeChange("wrist")}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                  viewMode === "wrist"
                    ? "bg-[#d4af37] text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Terrace Wrist
              </button>
              <button
                onClick={() => handleViewModeChange("macro")}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                  viewMode === "macro"
                    ? "bg-[#d4af37] text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Macro Dial
              </button>
              <button
                onClick={() => handleViewModeChange("caseback")}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                  viewMode === "caseback"
                    ? "bg-[#d4af37] text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Calibre V-101
              </button>
            </div>

            {/* High-Resolution Interactive Canvas */}
            <TerraceWristView strapType={strap} viewMode={viewMode} />

            {/* Quick-Release "Strap You Change Without Tools" Selector */}
            <div className="w-full max-w-[540px] mt-6 bg-white/[0.02] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300 flex items-center gap-1.5">
                  <RefreshCw size={12} className="text-[#d4af37]" />
                  Tool-Free Interchangeable Straps
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
                  Quick-Release Spring Bar
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStrapChange("cognac")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "cognac"
                      ? "border-[#d4af37] bg-[#d4af37]/10"
                      : "border-white/10 hover:border-white/30 bg-black/40"
                  }`}
                >
                  <div className="w-full h-3 bg-[#854316] rounded-xs mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Baranil Cognac</span>
                  <span className="block text-[9px] text-zinc-400">French Calf</span>
                </button>

                <button
                  onClick={() => handleStrapChange("blue")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "blue"
                      ? "border-[#d4af37] bg-[#d4af37]/10"
                      : "border-white/10 hover:border-white/30 bg-black/40"
                  }`}
                >
                  <div className="w-full h-3 bg-[#1e3a8a] rounded-xs mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Bleu Nuit</span>
                  <span className="block text-[9px] text-zinc-400">Matte Alligator</span>
                </button>

                <button
                  onClick={() => handleStrapChange("steel")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "steel"
                      ? "border-[#d4af37] bg-[#d4af37]/10"
                      : "border-white/10 hover:border-white/30 bg-black/40"
                  }`}
                >
                  <div className="w-full h-3 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 rounded-xs mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Beads of Rice</span>
                  <span className="block text-[9px] text-zinc-400">316L Steel</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Technical Specs Table, Price & Book a Fitting */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:pl-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
                Technical Specifications
              </span>
              <h3 className="font-serif text-2xl font-light text-white uppercase tracking-wider mb-6">
                SPECIFICATIONS
              </h3>

              {/* Specs Table */}
              <div className="divide-y divide-white/10 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Case Diameter</span>
                  <span className="text-zinc-100 font-medium">39.0 mm</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Thickness</span>
                  <span className="text-zinc-100 font-medium">9.8 mm (sapphire included)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Lug-to-Lug</span>
                  <span className="text-zinc-100 font-medium">46.2 mm</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Case Material</span>
                  <span className="text-zinc-100 font-medium">316L Stainless Steel</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Movement</span>
                  <span className="text-zinc-100 font-medium">Calibre V-101 Manufacture</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Winding</span>
                  <span className="text-zinc-100 font-medium">Manual Wind (52h Reserve)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Frequency</span>
                  <span className="text-zinc-100 font-medium">28,800 vph (4 Hz)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Jewels</span>
                  <span className="text-zinc-100 font-medium">21 Rubies in Gold Chatons</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Water Resistance</span>
                  <span className="text-zinc-100 font-medium">5 ATM (50 meters)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Crystal</span>
                  <span className="text-zinc-100 font-medium">Box-domed Sapphire AR</span>
                </div>
              </div>
            </div>

            {/* Price Indicator & Interactive Book a Fitting CTA */}
            <div className="bg-[#14171c] border border-white/10 p-6 space-y-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                    Direct Atelier Price
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-3xl sm:text-4xl font-light text-white">
                      €9,800
                    </span>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-widest">
                      EUR
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium flex items-center gap-1">
                  <Check size={12} /> In Production
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                Taxes included. Includes bespoke presentation box, warranty certificate registered in Paris, and two interchangeable straps.
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-semibold uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.99] cursor-pointer"
              >
                Book a fitting
              </button>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-[#d4af37]" /> 5-Year Guarantee
                </span>
                <span>Worldwide Insured Courier</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

