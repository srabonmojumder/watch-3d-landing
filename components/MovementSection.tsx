"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "@/lib/audio";
import { Zap, ShieldCheck, Clock, Award, RotateCw } from "lucide-react";

export function MovementSection() {
  const [powerReserveHours, setPowerReserveHours] = useState<number>(42);
  const [isWinding, setIsWinding] = useState(false);

  const handleWind = () => {
    soundManager.playWindingClick();
    setIsWinding(true);
    setPowerReserveHours((prev) => {
      const next = Math.min(52, prev + 4);
      return next;
    });

    setTimeout(() => {
      setIsWinding(false);
    }, 250);
  };

  const handleResetWinding = () => {
    soundManager.playSoftClick();
    setPowerReserveHours(12);
  };

  return (
    <section id="craftsmanship-movement" className="relative w-full py-28 md:py-36 bg-[#0b0c0e] border-t border-white/[0.08] px-6 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/6 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-medium">
              Haute Horlogerie Architecture
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mb-4">
            CALIBRE V-101 MANUFACTURE
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-400 font-light max-w-2xl">
            A manual-wind movement designed and finished without compromise. 21 jewels, Glashütte ribbing, and 52 hours of pure chronometric autonomy.
          </p>
        </div>

        {/* Movement Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Movement Technical Pillar Highlights */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-medium">
                01 · The Three-Quarter Plate
              </span>
              <h3 className="font-serif text-xl text-white mb-2">
                Glashütte Lines & Traditional German Silver
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Milled from untreated German silver (Maillechort), the three-quarter plate stabilizes the wheel train with extreme torsional rigidity. Each stripe is hand-applied using Boxwood laps.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-medium">
                02 · Anglage & Hand Chamfering
              </span>
              <h3 className="font-serif text-xl text-white mb-2">
                Mirrored Internal Angles
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every steel bridge is hand-beveled with files, degussit stones, and gentian wood dipped in diamond pastes. A single bridge requires over twelve hours of artisanal hand-finishing.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-medium">
                03 · Regulated In Five Positions
              </span>
              <h3 className="font-serif text-xl text-white mb-2">
                Chronometric Precision
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Tested across varying temperatures and five distinct spatial positions in Paris to ensure strict timing within -2 / +4 seconds per day, well exceeding COSC criteria.
              </p>
            </div>
          </div>

          {/* Interactive Movement Winding Simulation & Gauge */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-xl bg-gradient-to-b from-[#14171d] to-[#0c0e12] border border-white/10 p-8 md:p-10 shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-1">
                    Kinetic Simulation
                  </span>
                  <h4 className="font-serif text-2xl text-white font-light">
                    Twin-Barrel Mainspring Reserve
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">
                    Current Tension
                  </span>
                  <span className="font-serif text-2xl text-[#f3e5ab]">
                    {powerReserveHours} <span className="text-xs font-sans">/ 52 HRS</span>
                  </span>
                </div>
              </div>

              {/* Power Reserve Linear & Circular Gauge */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                  <span>Depleted (0h)</span>
                  <span className="text-[#d4af37]">Full Autonomy (52h)</span>
                </div>

                <div className="w-full h-3 bg-black/60 border border-white/10 p-0.5 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-700 via-[#d4af37] to-[#f3e5ab] transition-all duration-300 relative"
                    style={{ width: `${(powerReserveHours / 52) * 100}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_#fff]" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-zinc-400">
                  <span>Frequency: 28,800 vph (4 Hz)</span>
                  <span>Escapement: Swiss Ancre Ligne Droite</span>
                </div>
              </div>

              {/* Interactive Winding Crown Action */}
              <div className="bg-black/40 border border-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h5 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-1">
                    Manual Winding Crown
                  </h5>
                  <p className="text-[11px] text-zinc-400 font-light">
                    Click to rotate the fluted 316L crown and recharge tension into the twin barrels.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleWind}
                    disabled={powerReserveHours >= 52}
                    className={`px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto ${
                      powerReserveHours >= 52
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-[#d4af37] text-black hover:bg-[#f3e5ab] active:scale-95"
                    }`}
                  >
                    <RotateCw
                      size={14}
                      className={isWinding ? "animate-spin text-black" : ""}
                    />
                    {powerReserveHours >= 52 ? "Fully Wound" : "Wind Crown"}
                  </button>

                  {powerReserveHours >= 52 && (
                    <button
                      onClick={handleResetWinding}
                      className="px-3 py-3 text-zinc-400 hover:text-white text-xs border border-white/10 cursor-pointer"
                      title="Reset tension"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Movement Macro Specifications */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 text-center">
                <div>
                  <span className="block font-serif text-xl text-white">21</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">Rubies in Chatons</span>
                </div>
                <div>
                  <span className="block font-serif text-xl text-white">4 Hz</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">28,800 Vibrations</span>
                </div>
                <div>
                  <span className="block font-serif text-xl text-white">3.9 mm</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">Calibre Height</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

