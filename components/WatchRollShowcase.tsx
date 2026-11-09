"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { soundManager } from "@/lib/audio";
import { Check, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface WatchRollShowcaseProps {
  onSelectDialForBooking: (dialName: string) => void;
}

interface DialVariant {
  id: "silver" | "blue" | "slate";
  name: "SILVER" | "BLUE" | "SLATE";
  subtitle: string;
  price: string;
  description: string;
  strapDesc: string;
  colorHex: string;
  finishing: string;
}

const DIALS: DialVariant[] = [
  {
    id: "silver",
    name: "SILVER",
    subtitle: "Argent brossé · €9,800",
    price: "€9,800",
    description: "Hand-brushed rhodium silver dial that catches soft European daylight. Paired with flame-tempered blued steel leaf hands and minimalist railway track.",
    strapDesc: "Baranil Cognac Calfskin",
    colorHex: "#e2e8f0",
    finishing: "Brossage Satiné Vertical",
  },
  {
    id: "blue",
    name: "BLUE",
    subtitle: "Bleu de Paris exclusive · €9,800",
    price: "€9,800",
    description: "An exclusive galvanic cobalt blue sunburst dial inspired by the twilight hour over the Seine. Diamond-faceted rhodium hands and crisp silvery accents.",
    strapDesc: "Bleu Nuit Baranil Calfskin",
    colorHex: "#1e3a8a",
    finishing: "Galvanique Soleil Parisien",
  },
  {
    id: "slate",
    name: "SLATE",
    subtitle: "Ardoise guilloché · €9,800",
    price: "€9,800",
    description: "Traditional hand-turned Clous de Paris hobnail guilloché engraved on solid slate brass plate, framed by an anthracite brushed chapter ring.",
    strapDesc: "Ardoise Matte Alligator",
    colorHex: "#334155",
    finishing: "Guilloché Clous de Paris",
  },
];

export function WatchRollShowcase({ onSelectDialForBooking }: WatchRollShowcaseProps) {
  const [activeSlot, setActiveSlot] = useState<number>(1); // Default to Slot 2: BLUE
  const [inspectingDial, setInspectingDial] = useState<DialVariant | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasRef0 = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  // Render high-fidelity canvas for each of the 3 dials
  const drawWatch = (
    canvas: HTMLCanvasElement | null,
    variant: DialVariant,
    isActive: boolean
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 340;
    const h = 480;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.52;
    const r = 90;

    // 1. WATCH ROLL CUSHION & SUEDE COMPARTMENT
    // Velvet pillow
    const pillowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
    pillowGrad.addColorStop(0, "#2c1d11");
    pillowGrad.addColorStop(0.7, "#1c120a");
    pillowGrad.addColorStop(1, "#0d0804");
    ctx.fillStyle = pillowGrad;
    ctx.beginPath();
    ctx.roundRect(cx - 95, cy - 180, 190, 360, 24);
    ctx.fill();

    // Cushion side shadows
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 2. STRAP UNDERNEATH WATCH
    const strapW = 48;
    const strapH = 150;
    let sGrad = ctx.createLinearGradient(cx - strapW / 2, 0, cx + strapW / 2, 0);

    if (variant.id === "silver") {
      sGrad.addColorStop(0, "#8a481e");
      sGrad.addColorStop(0.5, "#a65922");
      sGrad.addColorStop(1, "#5c2e10");
    } else if (variant.id === "blue") {
      sGrad.addColorStop(0, "#13233e");
      sGrad.addColorStop(0.5, "#1e3a8a");
      sGrad.addColorStop(1, "#0d182b");
    } else {
      sGrad.addColorStop(0, "#252b33");
      sGrad.addColorStop(0.5, "#334155");
      sGrad.addColorStop(1, "#181d24");
    }

    ctx.fillStyle = sGrad;
    ctx.beginPath();
    ctx.roundRect(cx - strapW / 2, cy - strapH, strapW, strapH * 2, 4);
    ctx.fill();

    // Saddle stitching on strap
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

    // 3. WATCH CASE & 39MM BEZEL
    // Steel shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.arc(cx, cy + 4, r + 5, 0, Math.PI * 2);
    ctx.fill();

    // Steel bezel
    const bezel = ctx.createConicGradient(Math.PI * 0.2, cx, cy);
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

    // Crown
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(cx + r - 2, cy - 9, 8, 18);

    // 4. DIAL SPECIFICS FOR EACH VARIANT
    const dialR = r * 0.88;

    if (variant.id === "silver") {
      // SILVER: Argent brossé with vertical satin grain
      const silverGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dialR);
      silverGrad.addColorStop(0, "#ffffff");
      silverGrad.addColorStop(0.7, "#e2e8f0");
      silverGrad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = silverGrad;
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
      // BLUE: Bleu de Paris sunburst galvanic dial
      const blueGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dialR);
      blueGrad.addColorStop(0, "#2563eb");
      blueGrad.addColorStop(0.4, "#1d4ed8");
      blueGrad.addColorStop(0.8, "#172554");
      blueGrad.addColorStop(1, "#0c1322");
      ctx.fillStyle = blueGrad;
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
      // SLATE: Ardoise guilloché (Clous de Paris pattern)
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

      const cellSize = 6;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
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

      // Outer chapter ring for Slate
      ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, dialR * 0.65, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 5. APPLIED INDICES
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);

      if (variant.id === "silver") {
        ctx.fillStyle = "#1e293b";
      } else {
        ctx.fillStyle = "#f8fafc";
      }

      const idxLen = i % 3 === 0 ? 15 : 10;
      ctx.fillRect(dialR * 0.68, -1.8, idxLen, 3.6);
      ctx.restore();
    }

    // 6. BRAND TEXT
    ctx.textAlign = "center";
    ctx.font = "600 11px serif";
    ctx.fillStyle = variant.id === "silver" ? "#0f172a" : "#ffffff";
    ctx.fillText("VÉRAN", cx, cy - 35);
    ctx.font = "500 6.5px sans-serif";
    ctx.fillStyle = variant.id === "silver" ? "#475569" : "#d4af37";
    ctx.fillText("PARIS", cx, cy - 24);

    // 7. HANDS AT 10:10
    ctx.save();
    ctx.translate(cx, cy);

    // Flame blued hands for Silver, Rhodium for Blue & Slate
    const handColor = variant.id === "silver" ? "#0284c7" : "#ffffff";

    // Hour hand
    ctx.save();
    ctx.rotate(-0.85);
    ctx.fillStyle = handColor;
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.lineTo(dialR * 0.52, 0);
    ctx.lineTo(0, 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Minute hand
    ctx.save();
    ctx.rotate(0.55);
    ctx.fillStyle = handColor;
    ctx.beginPath();
    ctx.moveTo(0, -2.5);
    ctx.lineTo(dialR * 0.76, 0);
    ctx.lineTo(0, 2.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Center jewel pinion
    ctx.fillStyle = variant.id === "silver" ? "#0f172a" : "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // translate

    // 8. SAPPHIRE GLARE / SHEEN
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
    drawWatch(canvasRef0.current, DIALS[0], activeSlot === 0);
    drawWatch(canvasRef1.current, DIALS[1], activeSlot === 1);
    drawWatch(canvasRef2.current, DIALS[2], activeSlot === 2);
  }, [activeSlot]);

  const handleSelectSlot = (idx: number) => {
    soundManager.playSoftClick();
    setActiveSlot(idx);
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
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-[#08090b] border-t border-white/[0.08] px-6 md:px-12 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d4af37]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-medium">
              Horological Trinity
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mb-4">
            “THREE DIALS, ONE CASE”
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-zinc-400 font-light max-w-xl">
            A single 39 mm hand-wound architectural case. Three distinct French artisanal dial expressions.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VINTAGE DISTRESSED BROWN LEATHER WATCH ROLL CONTAINER         */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full max-w-5xl mx-auto rounded-none border border-[#4a2e18]/60 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Distressed Brown Leather Header Trim & Saddle Stitching */}
          <div className="w-full bg-gradient-to-r from-[#2b170a] via-[#4a2e18] to-[#241307] px-6 py-4 border-b border-[#5c371d] flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Brass rivet */}
              <div className="w-3 h-3 rounded-full bg-[#d4af37] shadow-inner border border-[#8a681c] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#4a360d] rounded-full" />
              </div>
              <span className="text-[11px] font-serif uppercase tracking-[0.28em] text-[#e8c692]">
                VÉRAN ATELIER · ÉCRIN VOYAGEUR EN CUIR PATINÉ
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-black/40 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37] transition-colors cursor-pointer"
                aria-label="Previous watch"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-black/40 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d4af37] transition-colors cursor-pointer"
                aria-label="Next watch"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Suede Velvet Interior Roll Compartments */}
          <div className="relative w-full bg-[#140e09] bg-[radial-gradient(#1f150e_1px,transparent_1px)] [background-size:16px_16px] p-6 md:p-12">
            
            {/* The 3 Watch Slots Laid Horizontally */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
              
              {/* SLOT 1: SILVER */}
              <div
                onClick={() => handleSelectSlot(0)}
                className={`relative group cursor-pointer transition-all duration-700 rounded-none flex flex-col items-center ${
                  activeSlot === 0
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-40 hover:opacity-75 blur-[0.4px] md:grayscale-[25%]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef0} className="w-full h-full object-contain" />
                  {activeSlot === 0 && (
                    <div className="absolute inset-0 rounded-none ring-1 ring-[#d4af37]/40 pointer-events-none" />
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
                    Slot 01
                  </span>
                  <h3 className="font-serif text-xl tracking-[0.2em] text-white uppercase">
                    SILVER
                  </h3>
                  <p className="text-xs text-zinc-400 font-light tracking-wider mt-1">
                    Argent brossé · €9,800
                  </p>
                </div>
              </div>

              {/* SLOT 2: BLUE */}
              <div
                onClick={() => handleSelectSlot(1)}
                className={`relative group cursor-pointer transition-all duration-700 rounded-none flex flex-col items-center ${
                  activeSlot === 1
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-40 hover:opacity-75 blur-[0.4px] md:grayscale-[25%]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef1} className="w-full h-full object-contain" />
                  {activeSlot === 1 && (
                    <div className="absolute inset-0 rounded-none ring-1 ring-[#d4af37]/40 pointer-events-none" />
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
                    Slot 02 · Signature
                  </span>
                  <h3 className="font-serif text-xl tracking-[0.2em] text-white uppercase">
                    BLUE
                  </h3>
                  <p className="text-xs text-zinc-400 font-light tracking-wider mt-1">
                    Bleu de Paris exclusive · €9,800
                  </p>
                </div>
              </div>

              {/* SLOT 3: SLATE */}
              <div
                onClick={() => handleSelectSlot(2)}
                className={`relative group cursor-pointer transition-all duration-700 rounded-none flex flex-col items-center ${
                  activeSlot === 2
                    ? "scale-105 z-20 opacity-100"
                    : "scale-95 opacity-40 hover:opacity-75 blur-[0.4px] md:grayscale-[25%]"
                }`}
              >
                <div className="w-full aspect-[3/4] relative flex items-center justify-center">
                  <canvas ref={canvasRef2} className="w-full h-full object-contain" />
                  {activeSlot === 2 && (
                    <div className="absolute inset-0 rounded-none ring-1 ring-[#d4af37]/40 pointer-events-none" />
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
                    Slot 03
                  </span>
                  <h3 className="font-serif text-xl tracking-[0.2em] text-white uppercase">
                    SLATE
                  </h3>
                  <p className="text-xs text-zinc-400 font-light tracking-wider mt-1">
                    Ardoise guilloché · €9,800
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Saddle Stitching Trim */}
            <div className="w-full mt-10 pt-6 border-t border-[#422814] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#c7a477] uppercase tracking-[0.2em]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span>Selected: {selectedDial.name} ({selectedDial.finishing})</span>
              </div>
              <span className="italic font-serif normal-case text-xs text-zinc-400">
                Click any slot to bring into central focus
              </span>
            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* ACTIVE DIAL DETAILS CARD & CALL-TO-ACTIONS                    */}
        {/* ------------------------------------------------------------- */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/[0.02] border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in duration-500">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 bg-[#d4af37]/20 text-[#f3e5ab] text-[10px] uppercase tracking-widest font-semibold border border-[#d4af37]/30">
                {selectedDial.name} DIAL SPECIFICATION
              </span>
              <span className="text-xs text-zinc-400">{selectedDial.strapDesc}</span>
            </div>
            <h4 className="font-serif text-2xl text-white font-light">
              {selectedDial.name} — {selectedDial.finishing}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {selectedDial.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setInspectingDial(selectedDial)}
              className="w-full sm:w-auto px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-300 border border-white/20 hover:border-white/50 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye size={13} className="text-[#d4af37]" />
              Macro Loupe
            </button>
            <button
              onClick={() => onSelectDialForBooking(selectedDial.name)}
              className="w-full sm:w-auto px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold bg-[#d4af37] text-black hover:bg-[#f3e5ab] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Check size={14} />
              Book This Variant
            </button>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MACRO LOUPE INSPECTION MODAL                                  */}
      {/* ------------------------------------------------------------- */}
      {inspectingDial && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="relative max-w-2xl w-full bg-[#111418] border border-white/20 p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-1">
                  4× Optical Magnification Loupe
                </span>
                <h3 className="font-serif text-2xl text-white">
                  {inspectingDial.name} · {inspectingDial.finishing}
                </h3>
              </div>
              <button
                onClick={() => setInspectingDial(null)}
                className="text-zinc-400 hover:text-white text-xs uppercase tracking-widest px-3 py-1 border border-white/10 hover:border-white/30 cursor-pointer"
              >
                Close ×
              </button>
            </div>

            <div className="relative w-full aspect-square max-h-[380px] mx-auto rounded-full overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.2)] mb-6 flex items-center justify-center bg-black">
              {/* Simulated high magnification macro view */}
              <div
                className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                style={{
                  background:
                    inspectingDial.id === "silver"
                      ? "radial-gradient(circle, #f8fafc 0%, #cbd5e1 70%, #94a3b8 100%)"
                      : inspectingDial.id === "blue"
                      ? "radial-gradient(circle, #2563eb 0%, #1e3a8a 60%, #0f172a 100%)"
                      : "radial-gradient(circle, #334155 0%, #1e293b 60%, #0f172a 100%)",
                }}
              >
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/20 max-w-sm">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">
                    Micro-Surface Analysis
                  </span>
                  <p className="text-xs text-white leading-relaxed font-light mb-3">
                    {inspectingDial.id === "slate"
                      ? "Individual Clous de Paris guilloché pyramids cut at 45-degree opposing angles with a single-point diamond burin on a manual rose engine."
                      : inspectingDial.id === "blue"
                      ? "Microscopic galvanic cobalt deposition over fine brass wire radial polishing. Light wavelengths refract dynamically as your angle alters."
                      : "Hand-applied emery paper horizontal drawing, finished with micro-crystalline silver salts to reflect soft neutral white illumination."}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-300">
                    Tolerance: ±0.002 mm · Hand Finished in Paris
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-xs text-zinc-400">
                Calibre V-101 Compatibility: 100%
              </span>
              <button
                onClick={() => {
                  setInspectingDial(null);
                  onSelectDialForBooking(inspectingDial.name);
                }}
                className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#d4af37] text-black font-semibold hover:bg-[#f3e5ab] cursor-pointer"
              >
                Proceed With This Dial
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

