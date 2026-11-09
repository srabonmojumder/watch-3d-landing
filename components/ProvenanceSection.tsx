"use client";

import React from "react";
import { Compass, Feather, MapPin, CheckCircle2 } from "lucide-react";

export function ProvenanceSection() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#08090b] border-t border-white/[0.08] px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Atelier Plaque */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-[460px] mx-auto bg-gradient-to-br from-[#181b20] via-[#101216] to-[#0a0b0d] border border-white/10 p-8 flex flex-col justify-between shadow-2xl">
              
              {/* Corner brass rosettes */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#d4af37]" />

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold">
                  Maison VÉRAN · Fondée à Paris
                </span>
                <h3 className="font-serif text-3xl text-white font-light">
                  12, Place Vendôme
                </h3>
                <p className="text-xs text-zinc-400 font-light">
                  75001 Paris, France
                </p>
              </div>

              {/* Hand engraving illustration badge */}
              <div className="py-8 my-auto flex flex-col items-center text-center border-y border-white/10">
                <div className="w-20 h-20 rounded-full border border-[#d4af37]/40 flex items-center justify-center mb-4 bg-black/40">
                  <Compass size={32} className="text-[#d4af37] stroke-[1.2]" />
                </div>
                <span className="font-serif text-xl text-white tracking-widest uppercase mb-1">
                  HORLOGERIE D’EXCEPTION
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  Design Parisien · Mécanique Glashütte
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-400">
                <span>Certificat Numéroté</span>
                <span className="text-[#d4af37]">Édition Limitée</span>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Narrative */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="w-8 h-[1px] bg-[#d4af37]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-medium">
                  Artisan Provenance
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight uppercase mb-6">
                “BORN FROM THE SILENCE OF THE ATELIER.”
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-serif italic leading-relaxed mb-6">
                “In an age of industrial excess, we deliberately chose patience. Le Voyageur is not assembled on a conveyor; it is brought to life by a dedicated master watchmaker whose signature accompanies every box.”
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                <p>
                  Every VÉRAN timepiece begins in our Place Vendôme atelier, where case proportions are sculpted with micrometer precision. We source 316L high-chromium surgical steel to withstand seawater and urban wear, while polishing the case flanks to mirror perfection.
                </p>
                <p>
                  The dials are treated in historic Parisian galvanic baths, creating an optical depth that changes hue from bright daylight in Montmartre to dim candlelit bistros along the Boulevard Saint-Germain.
                </p>
              </div>
            </div>

            {/* Checklist of Heritage Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-zinc-300">
                  Zero tool strap swap with patented dual spring-bar levers.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-zinc-300">
                  Hand-turned Clous de Paris guilloché by French master engravers.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-zinc-300">
                  52-hour chronometer reserve adjusted across 5 positions.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-zinc-300">
                  Individually numbered caseback with archival ledger entry.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

