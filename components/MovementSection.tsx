"use client";

import React, { useState } from "react";
import { soundManager } from "@/lib/audio";
import { RotateCw, Sparkles, Compass, Eye } from "lucide-react";
import { Watch3DInteractive } from "./Watch3DInteractive";

export function MovementSection() {
  const [powerReserveHours, setPowerReserveHours] = useState<number>(42);
  const [isWinding, setIsWinding] = useState(false);
  const [movementAngle, setMovementAngle] = useState<"caseback" | "profile" | "macro">("caseback");

  const handleWind = () => {
    soundManager.playWindingClick();
    setIsWinding(true);
    setPowerReserveHours((prev) => {
      const next = Math.min(52, prev + 4);
      return next;
    });

    setTimeout(() => {
      setIsWinding(false);
    }, 600);
  };

  const handleResetWinding = () => {
    soundManager.playSoftClick();
    setPowerReserveHours(12);
  };

  return (
    <section id="craftsmanship-movement" className="relative w-full py-28 md:py-36 bg-black border-t border-white/10 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
              03 · MECHANICAL ARCHITECTURE
            </span>
            <span className="w-6 h-[1px] bg-white/40" />
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mb-4">
            CALIBRE V-101 MANUFACTURE
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-400 font-light max-w-2xl">
            A manual-wind movement designed and finished without compromise. 21 jewels, Glashütte ribbing, and 52 hours of pure chronometric autonomy.
          </p>
        </div>

        {/* Movement Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Movement Technical Pillar Highlights */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-2">
                01 · THE THREE-QUARTER PLATE
              </span>
              <h3 className="font-sans text-lg text-white mb-2 font-medium">
                Glashütte Lines & Traditional German Silver
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Milled from untreated German silver (Maillechort), the three-quarter plate stabilizes the wheel train with extreme torsional rigidity. Each stripe is hand-applied using Boxwood laps.
              </p>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-2">
                02 · ANGLAGE & HAND CHAMFERING
              </span>
              <h3 className="font-sans text-lg text-white mb-2 font-medium">
                Mirrored Internal Angles
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every steel bridge is hand-beveled with files, degussit stones, and gentian wood dipped in diamond pastes. A single bridge requires over twelve hours of artisanal hand-finishing.
              </p>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-2">
                03 · REGULATED IN FIVE POSITIONS
              </span>
              <h3 className="font-sans text-lg text-white mb-2 font-medium">
                Chronometric Precision
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Tested across varying temperatures and five distinct spatial positions in Paris to ensure strict timing within -2 / +4 seconds per day, well exceeding COSC criteria.
              </p>
            </div>
          </div>

          {/* Interactive 3D Movement Studio & Kinetic Winding Simulation */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full bg-[#0a0a0a] border border-white/10 p-6 md:p-8 shadow-2xl">
              
              {/* Header with 3D angle selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-time 3D Calibre Studio</span>
                  </div>
                  <h4 className="font-sans text-lg sm:text-xl text-white font-medium uppercase tracking-wide">
                    Exhibition Sapphire Caseback
                  </h4>
                </div>

                {/* 3D Movement Angle Presets */}
                <div className="flex items-center space-x-1 p-1 bg-white/[0.04] border border-white/10 rounded-full">
                  <button
                    onClick={() => { setMovementAngle("caseback"); soundManager.playSoftClick(); }}
                    className={`px-3 py-1 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                      movementAngle === "caseback"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    180° Calibre
                  </button>
                  <button
                    onClick={() => { setMovementAngle("profile"); soundManager.playSoftClick(); }}
                    className={`px-3 py-1 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                      movementAngle === "profile"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Crown Angle
                  </button>
                  <button
                    onClick={() => { setMovementAngle("macro"); soundManager.playSoftClick(); }}
                    className={`px-3 py-1 text-[9.5px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                      movementAngle === "macro"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Dial Face
                  </button>
                </div>
              </div>

              {/* Real-time 3D WebGL Movement Inspection Stage */}
              <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#101216] via-[#090b0e] to-[#040507] border border-white/10 rounded-sm overflow-hidden mb-6 shadow-inner">
                <Watch3DInteractive
                  dialType="blue"
                  strapType="cognac"
                  viewMode={movementAngle}
                  isWinding={isWinding}
                  autoRotate={true}
                  showControls={false}
                  className="w-full h-full"
                />

                {/* Floating 3D Micro Telemetry */}
                <div className="absolute top-3 left-3 pointer-events-none flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8.5px] uppercase tracking-[0.2em] text-zinc-300 font-mono">
                    {movementAngle === "caseback" ? "Calibre V-101 · 21 Jewels" : movementAngle === "profile" ? "Fluted 316L Crown" : "Galvanic Dial Face"}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <span className="text-[8.5px] uppercase tracking-[0.2em] text-zinc-400 font-mono bg-black/60 px-2 py-0.5 border border-white/10">
                    Drag to orbit 360°
                  </span>
                </div>
              </div>

              {/* Power Reserve Gauge */}
              <div className="space-y-3 mb-6 bg-black/50 p-4 border border-white/5">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em]">
                  <span className="text-zinc-400">Twin-Barrel Power Reserve</span>
                  <span className="text-white font-medium">
                    {powerReserveHours} <span className="text-zinc-400">/ 52 HRS</span>
                  </span>
                </div>

                <div className="w-full h-2 bg-black border border-white/10 p-0.5 relative overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 relative"
                    style={{ width: `${(powerReserveHours / 52) * 100}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#fff]" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9.5px] font-mono text-zinc-400">
                  <span>Frequency: 28,800 vph (4 Hz)</span>
                  <span>Escapement: Swiss Ancre Ligne Droite</span>
                </div>
              </div>

              {/* Interactive Winding Crown Action */}
              <div className="bg-black border border-white/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-1">
                    Manual Winding Crown
                  </h5>
                  <p className="text-[11px] text-zinc-400 font-light">
                    Click to spin the fluted crown in 3D and charge tension into the twin barrels.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleWind}
                    disabled={powerReserveHours >= 52}
                    className={`px-6 py-2.5 text-xs uppercase tracking-[0.25em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto ${
                      powerReserveHours >= 52
                        ? "bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed"
                        : "bg-white text-black hover:bg-zinc-200 active:scale-95"
                    }`}
                  >
                    <RotateCw
                      size={13}
                      className={isWinding ? "animate-spin text-black" : ""}
                    />
                    {powerReserveHours >= 52 ? "Fully Wound" : "Wind Crown"}
                  </button>

                  {powerReserveHours >= 52 && (
                    <button
                      onClick={handleResetWinding}
                      className="px-3 py-2.5 text-zinc-400 hover:text-white text-xs border border-white/10 cursor-pointer"
                      title="Reset tension"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Movement Macro Specifications */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10 text-center font-mono">
                <div>
                  <span className="block font-sans text-xl text-white">21</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">Rubies in Chatons</span>
                </div>
                <div>
                  <span className="block font-sans text-xl text-white">4 Hz</span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">28,800 Vibrations</span>
                </div>
                <div>
                  <span className="block font-sans text-xl text-white">3.9 mm</span>
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
