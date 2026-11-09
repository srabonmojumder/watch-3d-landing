"use client";

import React, { useState } from "react";
import { TerraceWristView } from "./TerraceWristView";
import { Watch3DInteractive } from "./Watch3DInteractive";
import { soundManager } from "@/lib/audio";
import { RefreshCw, Shield, Check, Box, Image as ImageIcon } from "lucide-react";

interface ProductBreakdownProps {
  onOpenBooking: () => void;
}

export function ProductBreakdown({ onOpenBooking }: ProductBreakdownProps) {
  const [strap, setStrap] = useState<"cognac" | "blue" | "steel">("cognac");
  const [viewMode, setViewMode] = useState<"wrist" | "macro" | "caseback">("wrist");
  const [renderMode, setRenderMode] = useState<"3d" | "editorial">("3d");

  const handleStrapChange = (newStrap: "cognac" | "blue" | "steel") => {
    soundManager.playSoftClick();
    setStrap(newStrap);
  };

  const handleViewModeChange = (newMode: "wrist" | "macro" | "caseback") => {
    soundManager.playSoftClick();
    setViewMode(newMode);
  };

  const toggleRenderMode = (mode: "3d" | "editorial") => {
    soundManager.playSoftClick();
    setRenderMode(mode);
  };

  return (
    <section
      id="product-breakdown"
      className="relative w-full py-28 md:py-36 bg-[#000000] border-t border-white/10 px-6 md:px-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Monochromatic micro-header */}
        <div className="flex items-center space-x-3 mb-12">
          <span className="w-6 h-[1px] bg-white/40" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-mono">
            01 · SPECIFICATION & PURCHASE SHEET
          </span>
        </div>

        {/* 3-Column Structured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ----------------------------------------------------------- */}
          {/* LEFT COLUMN: Large Bold Headline & Artisan Body Copy        */}
          {/* ----------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:pr-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400 block mb-4">
                Reference VRN-01 · Edition Limitée
              </span>

              {/* Large bold headline: "STEEL, 39 MM, HAND-WOUND." */}
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.08] tracking-tight uppercase mb-6">
                STEEL, 39 MM,<br />
                <span className="text-zinc-400 font-light">HAND-WOUND.</span>
              </h2>

              {/* Body copy */}
              <div className="relative pl-5 border-l border-white/20 mb-8">
                <p className="text-base sm:text-lg text-white font-serif italic leading-relaxed">
                  “Made by VÉRAN in Paris. Glashütte lines, guilloché slate, and a strap you change without tools.”
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                <p>
                  Conceived in our Place Vendôme studio and brought to life through 500 hours of artisanal hand execution, Le Voyageur captures the classical balance of Mid-Century French chronometry.
                </p>
                <p>
                  Its 39.0 mm surgical-grade 316L stainless steel case measures just 9.8 mm in profile, engineered to slide effortlessly beneath bespoke cuffs, while curved lugs mirror the natural anatomy of the wrist.
                </p>
              </div>
            </div>

            {/* Atelier Details */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-zinc-400 mb-1 font-mono">
                  Atelier
                </span>
                <span className="text-xs font-sans text-white uppercase tracking-wider">
                  Place Vendôme, Paris
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-zinc-400 mb-1 font-mono">
                  Series Allocation
                </span>
                <span className="text-xs font-sans text-zinc-300 uppercase tracking-wider">
                  150 Numbered Pieces
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* CENTER COLUMN: 3D WebGL Interactive Timepiece               */}
          {/* ----------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* View switcher and Render engine toggles */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              {/* 3D Angle Presets */}
              <div className="flex items-center space-x-1 p-1 bg-white/[0.04] border border-white/10 rounded-full">
                <button
                  onClick={() => handleViewModeChange("wrist")}
                  className={`px-3 py-1.5 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                    viewMode === "wrist"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Wrist
                </button>
                <button
                  onClick={() => handleViewModeChange("macro")}
                  className={`px-3 py-1.5 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                    viewMode === "macro"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => handleViewModeChange("caseback")}
                  className={`px-3 py-1.5 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                    viewMode === "caseback"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Caseback
                </button>
              </div>

              {/* 3D vs 2D mode toggle */}
              <div className="flex items-center space-x-1 p-1 bg-white/[0.04] border border-white/10 rounded-full">
                <button
                  onClick={() => toggleRenderMode("3d")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                    renderMode === "3d"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Box size={11} />
                  <span>3D WebGL</span>
                </button>
                <button
                  onClick={() => toggleRenderMode("editorial")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                    renderMode === "editorial"
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <ImageIcon size={11} />
                  <span>Terrace</span>
                </button>
              </div>
            </div>

            {/* High-Resolution 3D WebGL Timepiece Canvas */}
            <div className="relative w-full max-w-[540px] aspect-[4/5] bg-gradient-to-b from-[#111317] via-[#090b0e] to-[#040507] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
              {renderMode === "3d" ? (
                <Watch3DInteractive
                  dialType="blue"
                  strapType={strap}
                  viewMode={viewMode}
                  className="w-full h-full"
                />
              ) : (
                <TerraceWristView strapType={strap} viewMode={viewMode} />
              )}
            </div>

            {/* Tool-Free Strap Selector */}
            <div className="w-full max-w-[540px] mt-6 bg-[#0a0a0a] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300 flex items-center gap-1.5">
                  <RefreshCw size={11} className="text-white" />
                  Tool-Free Interchangeable Straps
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-mono">
                  Quick-Release
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStrapChange("cognac")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "cognac"
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/30 bg-black"
                  }`}
                >
                  <div className="w-full h-2.5 bg-[#854316] mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Baranil Cognac</span>
                  <span className="block text-[9px] text-zinc-400">French Calfskin</span>
                </button>

                <button
                  onClick={() => handleStrapChange("blue")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "blue"
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/30 bg-black"
                  }`}
                >
                  <div className="w-full h-2.5 bg-[#1e3a8a] mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Bleu Nuit</span>
                  <span className="block text-[9px] text-zinc-400">Matte Alligator</span>
                </button>

                <button
                  onClick={() => handleStrapChange("steel")}
                  className={`p-2.5 text-left border transition-all cursor-pointer ${
                    strap === "steel"
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/30 bg-black"
                  }`}
                >
                  <div className="w-full h-2.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 mb-1.5" />
                  <span className="block text-[10px] font-medium text-white truncate">Milanese Mesh</span>
                  <span className="block text-[9px] text-zinc-400">316L Steel</span>
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT COLUMN: Detailed Specs List, Price & Dark CTA Button */}
          {/* ----------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:pl-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono block mb-2">
                Horological Datasheet
              </span>
              <h3 className="font-sans text-2xl font-normal text-white uppercase tracking-wider mb-6">
                SPECIFICATIONS
              </h3>

              {/* Detailed specs list */}
              <div className="divide-y divide-white/10 text-xs font-light">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Case</span>
                  <span className="text-white font-medium">Stainless steel 316L</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Diameter</span>
                  <span className="text-white font-medium">39 mm</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Movement</span>
                  <span className="text-white font-medium">Hand-wound caliber (V-101)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Glass</span>
                  <span className="text-white font-medium">Double domed sapphire</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Thickness</span>
                  <span className="text-white font-medium">9.8 mm (glass included)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Frequency</span>
                  <span className="text-white font-medium">28,800 vph (4 Hz)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Power Reserve</span>
                  <span className="text-white font-medium">52 Hours Autonomy</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-400 uppercase tracking-[0.18em]">Water Resistance</span>
                  <span className="text-white font-medium">5 ATM (50 meters)</span>
                </div>
              </div>
            </div>

            {/* Pricing & Dark CTA Button */}
            <div className="bg-[#0a0a0a] border border-white/10 p-6 space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-mono block mb-1">
                    Direct Atelier Price
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-3xl sm:text-4xl font-normal text-white">
                      €9,800
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                      EUR
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-1">
                  <Check size={12} className="text-white" /> In Production
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                Taxes included. Includes handmade patina presentation box, registered chronometer warranty, and two interchangeable straps.
              </p>

              {/* Dark CTA button: "Book a fitting" */}
              <button
                onClick={onOpenBooking}
                className="w-full py-4 bg-[#141414] hover:bg-white hover:text-black border border-white/20 text-white font-medium uppercase tracking-[0.25em] text-xs transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.99]"
              >
                Book a fitting
              </button>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider pt-2 border-t border-white/10 font-mono">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-white" /> 5-Year Guarantee
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
