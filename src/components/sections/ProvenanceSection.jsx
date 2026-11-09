"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Watch3DInteractive } from "./Watch3DInteractive";
import { soundManager } from "@/lib/audio";
export function ProvenanceSection() {
    const [atelierAngle, setAtelierAngle] = useState("wrist");
    const handleAngleChange = (angle) => {
        soundManager.playSoftClick();
        setAtelierAngle(angle);
    };
    return (<section className="relative w-full py-28 md:py-36 bg-black border-t border-white/10 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Atelier Exhibition Pedestal */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-[460px] mx-auto bg-[#0a0a0a] border border-white/15 p-6 flex flex-col justify-between shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-400 block mb-1">
                    Maison VÉRAN · Fondée à Paris
                  </span>
                  <h3 className="font-sans text-xl text-white font-normal uppercase tracking-wider">
                    12, Place Vendôme
                  </h3>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[8.5px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span>3D Atelier Stage</span>
                </div>
              </div>

              {/* 3D WebGL Timepiece Atelier Stage */}
              <div className="relative w-full aspect-[4/4] bg-gradient-to-b from-[#12141a] via-[#090b0e] to-[#040507] border border-white/10 rounded-sm overflow-hidden mb-4 shadow-inner">
                <Watch3DInteractive dialType="blue" strapType="cognac" viewMode={atelierAngle} autoRotate={true} showControls={false} className="w-full h-full"/>

                <div className="absolute top-2.5 left-2.5 pointer-events-none">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-mono bg-black/60 px-2 py-0.5 border border-white/10">
                    Piece No. 042 / 150
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-mono bg-black/60 px-2 py-0.5 border border-white/10">
                    Drag 360°
                  </span>
                </div>
              </div>

              {/* 3D Atelier Perspective Selector */}
              <div className="grid grid-cols-4 gap-1.5 mb-5 p-1 bg-white/[0.03] border border-white/10 rounded-full">
                <button onClick={() => handleAngleChange("wrist")} className={`py-1 text-[8.5px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${atelierAngle === "wrist" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                  Gallery
                </button>
                <button onClick={() => handleAngleChange("macro")} className={`py-1 text-[8.5px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${atelierAngle === "macro" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                  Dial
                </button>
                <button onClick={() => handleAngleChange("profile")} className={`py-1 text-[8.5px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${atelierAngle === "profile" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                  316L Flank
                </button>
                <button onClick={() => handleAngleChange("caseback")} className={`py-1 text-[8.5px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${atelierAngle === "caseback" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                  Glashütte
                </button>
              </div>

              {/* Plaque Footer */}
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-zinc-400 pt-3 border-t border-white/10">
                <span>Certificat d’Authenticité</span>
                <span className="text-white">Édition Limitée</span>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Narrative */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="w-6 h-[1px] bg-white/40"/>
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
                  04 · PROVENANCE
                </span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight uppercase mb-6">
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
                <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5"/>
                <span className="text-zinc-300">
                  Zero tool strap swap with patented dual spring-bar levers.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5"/>
                <span className="text-zinc-300">
                  Hand-turned Clous de Paris guilloché by French master engravers.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5"/>
                <span className="text-zinc-300">
                  52-hour chronometer reserve adjusted across 5 positions.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5"/>
                <span className="text-zinc-300">
                  Individually numbered caseback with archival ledger entry.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>);
}
