"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundManager } from "@/lib/audio";
import { Check, Eye, ChevronLeft, ChevronRight, Box } from "lucide-react";
import { Watch3DInteractive } from "./Watch3DInteractive";

interface WatchRollShowcaseProps {
  onSelectDialForBooking: (dialName: string) => void;
}

interface DialVariant {
  id: "silver" | "blue" | "slate";
  slotLabel: string;
  name: "SILVER" | "BLUE" | "SLATE";
  subtitle: string;
  price: string;
  finish: string;
  edition: string;
  description: string;
  strapDesc: string;
}

const DIALS: DialVariant[] = [
  {
    id: "silver",
    slotLabel: "SLOT 01",
    name: "SILVER",
    subtitle: "Argent brossé · €9,800",
    price: "€9,800",
    finish: "Argent brossé vertical",
    edition: "Pure Chronomètre",
    description: "Hand-brushed silver dial capturing soft Parisian morning daylight. Flame-tempered blued steel leaf hands with minimalist railway track.",
    strapDesc: "Baranil Cognac Calfskin",
  },
  {
    id: "blue",
    slotLabel: "SLOT 02",
    name: "BLUE",
    subtitle: "Bleu de Paris exclusive · €9,800",
    price: "€9,800",
    finish: "Galvanique soleil",
    edition: "Bleu de Paris exclusive",
    description: "Exclusive galvanic cobalt blue sunburst dial inspired by twilight along the Seine. Diamond-faceted rhodium hands and crisp silvery accents.",
    strapDesc: "Bleu Nuit Baranil Calfskin",
  },
  {
    id: "slate",
    slotLabel: "SLOT 03",
    name: "SLATE",
    subtitle: "Ardoise guilloché · €9,800",
    price: "€9,800",
    finish: "Ardoise guilloché",
    edition: "Clous de Paris Atelier",
    description: "Traditional hand-turned Clous de Paris hobnail guilloché engraved on solid slate brass plate, framed by an anthracite brushed chapter ring.",
    strapDesc: "Ardoise Matte Alligator",
  },
];

export function WatchRollShowcase({ onSelectDialForBooking }: WatchRollShowcaseProps) {
  const [activeSlot, setActiveSlot] = useState<number>(1); // Default to Slot 2: BLUE
  const [inspectingDial, setInspectingDial] = useState<DialVariant | null>(null);

  const canvasRef0 = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  // Render high-fidelity canvas for each dial in the watch roll
  const drawWatch = (
    canvas: HTMLCanvasElement | null,
    variant: DialVariant
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 320;
    const h = 460;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.52;
    const r = 86;

    // Suede interior cushion
    const pillowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 130);
    pillowGrad.addColorStop(0, "#2a1b10");
    pillowGrad.addColorStop(0.7, "#1a1009");
    pillowGrad.addColorStop(1, "#0c0704");
    ctx.fillStyle = pillowGrad;
    ctx.beginPath();
    ctx.roundRect(cx - 90, cy - 170, 180, 340, 20);
    ctx.fill();

    // Strap underneath watch
    const strapW = 46;
    const strapH = 145;
    let sGrad = ctx.createLinearGradient(cx - strapW / 2, 0, cx + strapW / 2, 0);

    if (variant.id === "silver") {
      sGrad.addColorStop(0, "#854119");
      sGrad.addColorStop(0.5, "#9e521e");
      sGrad.addColorStop(1, "#59290d");
    } else if (variant.id === "blue") {
      sGrad.addColorStop(0, "#102038");
      sGrad.addColorStop(0.5, "#1e3a8a");
      sGrad.addColorStop(1, "#0d1729");
    } else {
      sGrad.addColorStop(0, "#22272e");
      sGrad.addColorStop(0.5, "#334155");
      sGrad.addColorStop(1, "#161a20");
    }

    ctx.fillStyle = sGrad;
    ctx.beginPath();
    ctx.roundRect(cx - strapW / 2, cy - strapH, strapW, strapH * 2, 4);
    ctx.fill();

    // Saddle stitching
    ctx.strokeStyle = variant.id === "silver" ? "#f3c299" : variant.id === "blue" ? "#60a5fa" : "#94a3b8";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx - strapW / 2 + 4, cy - strapH);
    ctx.lineTo(cx - strapW / 2 + 4, cy + strapH);
    ctx.moveTo(cx + strapW / 2 - 4, cy - strapH);
    ctx.lineTo(cx + strapW / 2 - 4, cy + strapH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Watch case shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.beginPath();
    ctx.arc(cx, cy + 3, r + 4, 0, Math.PI * 2);
    ctx.fill();

    // 316L Stainless Steel Bezel
    const bezel = ctx.createConicGradient(Math.PI * 0.25, cx, cy);
    bezel.addColorStop(0, "#ffffff");
    bezel.addColorStop(0.2, "#94a3b8");
    bezel.addColorStop(0.4, "#475569");
    bezel.addColorStop(0.6, "#e2e8f0");
    bezel.addColorStop(0.8, "#64748b");
    bezel.addColorStop(1, "#f8fafc");

    ctx.fillStyle = bezel;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fluted crown
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(cx + r - 2, cy - 8, 8, 16);

    // Dial Surface
    const dialR = r * 0.88;

    if (variant.id === "silver") {
      const sGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dialR);
      sGrad.addColorStop(0, "#ffffff");
      sGrad.addColorStop(0.7, "#e2e8f0");
      sGrad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
      ctx.fill();

      // Vertical satin brushing
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
      ctx.lineWidth = 0.8;
      for (let vx = cx - dialR; vx <= cx + dialR; vx += 2) {
        ctx.beginPath();
        ctx.moveTo(vx, cy - dialR);
        ctx.lineTo(vx, cy + dialR);
        ctx.stroke();
      }
      ctx.restore();
    } else if (variant.id === "blue") {
      const bGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dialR);
      bGrad.addColorStop(0, "#2563eb");
      bGrad.addColorStop(0.4, "#1d4ed8");
      bGrad.addColorStop(0.8, "#172554");
      bGrad.addColorStop(1, "#0a1122");
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
      ctx.fill();

      // Sunburst radial rays
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
      ctx.clip();
      for (let ang = 0; ang < Math.PI * 2; ang += 0.04) {
        const a = Math.abs(Math.sin(ang * 4)) * 0.16;
        ctx.strokeStyle = `rgba(255, 255, 255, ${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * dialR, cy + Math.sin(ang) * dialR);
        ctx.stroke();
      }
      ctx.restore();
    } else {
      const slateGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dialR);
      slateGrad.addColorStop(0, "#334155");
      slateGrad.addColorStop(0.65, "#1e293b");
      slateGrad.addColorStop(1, "#0f172a");
      ctx.fillStyle = slateGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
      ctx.fill();

      // Hand-turned guilloché hobnail grid
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, dialR * 0.65, 0, Math.PI * 2);
      ctx.clip();

      const cellSize = 5.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
      ctx.lineWidth = 0.8;
      for (let gx = cx - dialR; gx <= cx + dialR; gx += cellSize) {
        ctx.beginPath();
        ctx.moveTo(gx, cy - dialR);
        ctx.lineTo(gx, cy + dialR);
        ctx.stroke();
      }
      for (let gy = cy - dialR; gy <= cy + dialR; gy += cellSize) {
        ctx.beginPath();
        ctx.moveTo(cx - dialR, gy);
        ctx.lineTo(cx + dialR, gy);
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, dialR * 0.65, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Applied indices
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      ctx.fillStyle = variant.id === "silver" ? "#0f172a" : "#ffffff";
      const idxLen = i % 3 === 0 ? 14 : 9;
      ctx.fillRect(dialR * 0.68, -1.8, idxLen, 3.6);
      ctx.restore();
    }

    // Typography: VÉRAN · PARIS
    ctx.textAlign = "center";
    ctx.font = "400 10px sans-serif";
    ctx.fillStyle = variant.id === "silver" ? "#0f172a" : "#ffffff";
    ctx.fillText("VÉRAN", cx, cy - 32);
    ctx.font = "300 6px sans-serif";
    ctx.fillText("PARIS", cx, cy - 22);

    // Hands at 10:10
    ctx.save();
    ctx.translate(cx, cy);
    const handColor = variant.id === "silver" ? "#0284c7" : "#ffffff";

    ctx.save();
    ctx.rotate(-0.85);
    ctx.fillStyle = handColor;
    ctx.beginPath();
    ctx.moveTo(0, -2.5);
    ctx.lineTo(dialR * 0.52, 0);
    ctx.lineTo(0, 2.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.rotate(0.55);
    ctx.fillStyle = handColor;
    ctx.beginPath();
    ctx.moveTo(0, -2.2);
    ctx.lineTo(dialR * 0.74, 0);
    ctx.lineTo(0, 2.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = variant.id === "silver" ? "#0f172a" : "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sapphire crystal light glare
    const glare = ctx.createLinearGradient(cx - dialR, cy - dialR, cx + dialR, cy + dialR);
    glare.addColorStop(0, "rgba(255, 255, 255, 0.35)");
    glare.addColorStop(0.25, "rgba(255, 255, 255, 0.05)");
    glare.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = glare;
    ctx.beginPath();
    ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    drawWatch(canvasRef0.current, DIALS[0]);
    drawWatch(canvasRef1.current, DIALS[1]);
    drawWatch(canvasRef2.current, DIALS[2]);
  }, []);

  const handleSelectSlot = (idx: number) => {
    if (activeSlot !== idx) {
      soundManager.playSoftClick();
      setActiveSlot(idx);
    }
  };

  const handlePrev = () => {
    soundManager.playSoftClick();
    setActiveSlot((prev) => (prev > 0 ? prev - 1 : 2));
  };

  const handleNext = () => {
    soundManager.playSoftClick();
    setActiveSlot((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const selectedDial = DIALS[activeSlot];

  return (
    <section
      id="dials-roll"
      className="relative w-full py-28 md:py-36 bg-black border-t border-white/10 px-6 md:px-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: Subtitle on left, right-aligned tag "38MM & 39MM" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 block mb-2">
              HOROLOGICAL TRINITY
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-normal text-white uppercase tracking-wider">
              02 · THREE DIALS, ONE CASE
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 border border-white/15 px-3 py-1">
              38MM & 39MM
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* HORIZONTAL DISTRESSED BROWN VINTAGE LEATHER WATCH ROLL        */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full max-w-5xl mx-auto border border-[#4a2e18]/60 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* Distressed Brown Leather Header Trim & Brass Rivet */}
          <div className="w-full bg-gradient-to-r from-[#241307] via-[#432712] to-[#1f0f04] px-6 py-4 border-b border-[#5a341b] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37] border border-[#7a5711] shadow-inner" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d9a86c]">
                VÉRAN ATELIER · ÉCRIN VOYAGEUR EN CUIR PATINÉ
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-1 rounded-full bg-black/40 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Previous slot"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-full bg-black/40 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Next slot"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Suede Velvet Interior Roll Compartments */}
          <div className="relative w-full bg-[#0d0906] bg-[radial-gradient(#1a110a_1px,transparent_1px)] [background-size:16px_16px] p-6 md:p-12">
            
            {/* 3 Watch Slots Laid Horizontally */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
              
              {/* SLOT 1: SILVER */}
              <div
                onMouseEnter={() => handleSelectSlot(0)}
                onClick={() => handleSelectSlot(0)}
                className={`relative group cursor-pointer transition-all duration-500 flex flex-col items-center ${
                  activeSlot === 0
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-35 hover:opacity-75 blur-[0.4px]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef0} className="w-full h-full object-contain" />
                  {activeSlot === 0 && (
                    <div className="absolute inset-0 ring-1 ring-white/30 pointer-events-none" />
                  )}
                </div>

                {/* Clean metadata card below each watch */}
                <div className="w-full mt-4 bg-black/80 border border-white/10 p-4 text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block">
                    SLOT 1
                  </span>
                  <h3 className="font-sans text-base tracking-[0.2em] text-white uppercase font-medium">
                    SILVER
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light tracking-wide">
                    Argent brossé · €9,800
                  </p>
                </div>
              </div>

              {/* SLOT 2: BLUE */}
              <div
                onMouseEnter={() => handleSelectSlot(1)}
                onClick={() => handleSelectSlot(1)}
                className={`relative group cursor-pointer transition-all duration-500 flex flex-col items-center ${
                  activeSlot === 1
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-35 hover:opacity-75 blur-[0.4px]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef1} className="w-full h-full object-contain" />
                  {activeSlot === 1 && (
                    <div className="absolute inset-0 ring-1 ring-white/30 pointer-events-none" />
                  )}
                </div>

                {/* Clean metadata card below each watch */}
                <div className="w-full mt-4 bg-black/80 border border-white/10 p-4 text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block">
                    SLOT 2 · SIGNATURE
                  </span>
                  <h3 className="font-sans text-base tracking-[0.2em] text-white uppercase font-medium">
                    BLUE
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light tracking-wide">
                    Bleu de Paris exclusive · €9,800
                  </p>
                </div>
              </div>

              {/* SLOT 3: SLATE */}
              <div
                onMouseEnter={() => handleSelectSlot(2)}
                onClick={() => handleSelectSlot(2)}
                className={`relative group cursor-pointer transition-all duration-500 flex flex-col items-center ${
                  activeSlot === 2
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-35 hover:opacity-75 blur-[0.4px]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef2} className="w-full h-full object-contain" />
                  {activeSlot === 2 && (
                    <div className="absolute inset-0 ring-1 ring-white/30 pointer-events-none" />
                  )}
                </div>

                {/* Clean metadata card below each watch */}
                <div className="w-full mt-4 bg-black/80 border border-white/10 p-4 text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 block">
                    SLOT 3
                  </span>
                  <h3 className="font-sans text-base tracking-[0.2em] text-white uppercase font-medium">
                    SLATE
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light tracking-wide">
                    Ardoise guilloché · €9,800
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Saddle Stitching Trim */}
            <div className="w-full mt-10 pt-5 border-t border-[#3d2311] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#c49a6c] uppercase tracking-[0.2em] font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Selected: {selectedDial.name} ({selectedDial.finish})</span>
              </div>
              <span className="text-zinc-400 lowercase tracking-normal font-sans">
                hover or click to switch focus
              </span>
            </div>

          </div>

        </div>

        {/* Selected Dial Action Bar */}
        <div className="max-w-4xl mx-auto mt-10 bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
              <span>{selectedDial.slotLabel}</span>
              <span>·</span>
              <span className="text-white">{selectedDial.edition}</span>
            </div>
            <h4 className="font-sans text-xl text-white font-medium uppercase tracking-wide">
              {selectedDial.name} — {selectedDial.finish}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {selectedDial.description}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setInspectingDial(selectedDial)}
              className="w-full sm:w-auto px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-300 border border-white/20 hover:border-white hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/[0.03]"
            >
              <Box size={12} className="text-amber-400" />
              Inspect 3D Watch
            </button>
            <button
              onClick={() => onSelectDialForBooking(selectedDial.name)}
              className="w-full sm:w-auto px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Check size={12} />
              Select Dial
            </button>
          </div>
        </div>

      </div>

      {/* Optical Magnification Loupe & 3D Interactive Stage Modal */}
      {inspectingDial && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-[#0a0a0a] border border-white/20 p-6 sm:p-8 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-mono block mb-1">
                  3D Horology Stage · Real-Time WebGL
                </span>
                <h3 className="font-sans text-lg text-white uppercase tracking-wider font-medium">
                  {inspectingDial.name} · {inspectingDial.finish}
                </h3>
              </div>
              <button
                onClick={() => setInspectingDial(null)}
                className="text-zinc-400 hover:text-white text-xs uppercase tracking-widest px-3 py-1.5 border border-white/10 hover:border-white/30 cursor-pointer transition-colors"
              >
                Close ×
              </button>
            </div>

            {/* Real 3D Interactive Watch Viewport */}
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/20 shadow-2xl mb-4 bg-gradient-to-b from-[#14171d] via-[#0b0d10] to-[#040507]">
              <Watch3DInteractive
                dialType={inspectingDial.id}
                strapType={inspectingDial.id === "blue" ? "blue" : "cognac"}
                viewMode="wrist"
                autoRotate={true}
                showControls={true}
                className="w-full h-full"
              />
            </div>

            <p className="text-[11px] text-zinc-400 font-light leading-relaxed mb-4">
              {inspectingDial.id === "slate"
                ? "Traditional hand-turned Clous de Paris hobnail guilloché engraved on solid slate brass plate, framed by an anthracite brushed chapter ring."
                : inspectingDial.id === "blue"
                ? "Exclusive galvanic cobalt blue sunburst dial inspired by twilight along the Seine. Diamond-faceted rhodium hands and crisp silvery accents."
                : "Hand-brushed silver dial capturing soft Parisian morning daylight. Flame-tempered blued steel leaf hands with minimalist railway track."}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-zinc-400">
                Calibre V-101 · 39 mm
              </span>
              <button
                onClick={() => {
                  setInspectingDial(null);
                  onSelectDialForBooking(inspectingDial.name);
                }}
                className="px-5 py-2.5 text-[10px] uppercase tracking-widest bg-white text-black font-semibold hover:bg-zinc-200 cursor-pointer shadow-md"
              >
                Select For Fitting
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
