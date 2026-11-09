"use client";

import React, { useEffect, useRef } from "react";

interface TerraceWristViewProps {
  strapType: "cognac" | "blue" | "steel";
  viewMode: "wrist" | "macro" | "caseback";
}

export function TerraceWristView({ strapType, viewMode }: TerraceWristViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI Retina scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 600;
    const height = 750;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    if (viewMode === "wrist") {
      // -----------------------------------------------------------
      // 1. PARISIAN TERRACE BACKGROUND (Haussmann architecture, morning light)
      // -----------------------------------------------------------
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      skyGrad.addColorStop(0, "#cbd5e1"); // Soft Parisian morning sky
      skyGrad.addColorStop(0.5, "#e2e8f0");
      skyGrad.addColorStop(1, "#f1f5f9");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant zinc rooftops of Paris
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.28);
      ctx.lineTo(width * 0.2, height * 0.22);
      ctx.lineTo(width * 0.35, height * 0.27);
      ctx.lineTo(width * 0.6, height * 0.20);
      ctx.lineTo(width * 0.85, height * 0.26);
      ctx.lineTo(width, height * 0.23);
      ctx.lineTo(width, height * 0.45);
      ctx.lineTo(0, height * 0.45);
      ctx.closePath();
      ctx.fill();

      // Haussmann stone facade in soft focus (cream limestone)
      const stoneGrad = ctx.createLinearGradient(0, height * 0.25, 0, height * 0.7);
      stoneGrad.addColorStop(0, "#e7dfd5");
      stoneGrad.addColorStop(1, "#d6cbbe");
      ctx.fillStyle = stoneGrad;
      ctx.fillRect(0, height * 0.28, width, height * 0.42);

      // French balcony wrought-iron black railing in foreground
      ctx.strokeStyle = "#1c1917";
      ctx.lineWidth = 3;
      const railY = height * 0.48;
      ctx.beginPath();
      ctx.moveTo(0, railY);
      ctx.lineTo(width, railY);
      ctx.moveTo(0, railY + 70);
      ctx.lineTo(width, railY + 70);
      ctx.stroke();

      // Ornate baluster scrolls
      for (let bx = 30; bx < width; bx += 70) {
        ctx.beginPath();
        ctx.arc(bx, railY + 35, 18, 0, Math.PI * 2);
        ctx.moveTo(bx, railY);
        ctx.lineTo(bx, railY + 70);
        ctx.stroke();
      }

      // Bistro marble table corner
      const tableGrad = ctx.createRadialGradient(width * 0.15, height * 0.85, 20, width * 0.15, height * 0.85, 220);
      tableGrad.addColorStop(0, "#f8fafc");
      tableGrad.addColorStop(0.7, "#e2e8f0");
      tableGrad.addColorStop(1, "#94a3b8");
      ctx.fillStyle = tableGrad;
      ctx.beginPath();
      ctx.ellipse(width * 0.15, height * 0.88, 160, 90, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Espresso cup on saucer
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(width * 0.22, height * 0.82, 35, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3e2723"; // Coffee crema
      ctx.beginPath();
      ctx.ellipse(width * 0.22, height * 0.81, 20, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // -----------------------------------------------------------
      // 2. THE WRIST IN CASHMERE CUFF & DOUBLE CUFF SHIRT
      // -----------------------------------------------------------
      const armCenterX = width * 0.58;
      const armCenterY = height * 0.62;

      // Forearm angle
      ctx.save();
      ctx.translate(armCenterX, armCenterY);
      ctx.rotate(-0.32);

      // Charcoal cashmere sweater sleeve
      const sleeveGrad = ctx.createLinearGradient(-160, -90, -40, 90);
      sleeveGrad.addColorStop(0, "#1e2124");
      sleeveGrad.addColorStop(0.5, "#2d3238");
      sleeveGrad.addColorStop(1, "#181a1d");
      ctx.fillStyle = sleeveGrad;
      ctx.beginPath();
      ctx.roundRect(-220, -75, 180, 150, [20, 8, 8, 20]);
      ctx.fill();

      // White crisp shirt cuff
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(-50, -68, 22, 136, 4);
      ctx.fill();

      // Mother of pearl cufflink glint
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(-40, 25, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Wrist Skin
      const skinGrad = ctx.createLinearGradient(-35, -55, 110, 55);
      skinGrad.addColorStop(0, "#e8beac");
      skinGrad.addColorStop(0.5, "#dfb09b");
      skinGrad.addColorStop(1, "#cb9b86");
      ctx.fillStyle = skinGrad;
      ctx.beginPath();
      ctx.roundRect(-35, -58, 140, 116, [10, 16, 16, 10]);
      ctx.fill();

      // -----------------------------------------------------------
      // 3. THE WATCH ON WRIST WITH LIVE STRAP SELECTION
      // -----------------------------------------------------------
      // Strap Top & Bottom
      const strapWidth = 68;
      const strapLength = 120;

      let strapFill: CanvasGradient | string;
      if (strapType === "cognac") {
        const cg = ctx.createLinearGradient(-strapWidth / 2, 0, strapWidth / 2, 0);
        cg.addColorStop(0, "#854316");
        cg.addColorStop(0.5, "#a65922");
        cg.addColorStop(1, "#66320d");
        strapFill = cg;
      } else if (strapType === "blue") {
        const bg = ctx.createLinearGradient(-strapWidth / 2, 0, strapWidth / 2, 0);
        bg.addColorStop(0, "#102347");
        bg.addColorStop(0.5, "#1e3a8a");
        bg.addColorStop(1, "#0d1b38");
        strapFill = bg;
      } else {
        // Steel beads-of-rice bracelet
        const sg = ctx.createLinearGradient(-strapWidth / 2, 0, strapWidth / 2, 0);
        sg.addColorStop(0, "#94a3b8");
        sg.addColorStop(0.2, "#cbd5e1");
        sg.addColorStop(0.5, "#f1f5f9");
        sg.addColorStop(0.8, "#cbd5e1");
        sg.addColorStop(1, "#64748b");
        strapFill = sg;
      }

      // Draw Strap underneath watch
      ctx.fillStyle = strapFill;
      ctx.beginPath();
      ctx.roundRect(-strapWidth / 2, -strapLength, strapWidth, strapLength * 2, 6);
      ctx.fill();

      // Strap details
      if (strapType !== "steel") {
        // Saddle stitching
        ctx.strokeStyle = strapType === "cognac" ? "#e59f5a" : "#60a5fa";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(-strapWidth / 2 + 5, -strapLength);
        ctx.lineTo(-strapWidth / 2 + 5, strapLength);
        ctx.moveTo(strapWidth / 2 - 5, -strapLength);
        ctx.lineTo(strapWidth / 2 - 5, strapLength);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Bracelet link lines
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1;
        for (let l = -strapLength; l <= strapLength; l += 14) {
          ctx.beginPath();
          ctx.moveTo(-strapWidth / 2, l);
          ctx.lineTo(strapWidth / 2, l);
          ctx.stroke();
        }
      }

      // Watch Case & Bezel (39mm proportion)
      const wRad = 74;

      // Watch shadow on wrist
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.beginPath();
      ctx.arc(4, 4, wRad + 4, 0, Math.PI * 2);
      ctx.fill();

      // Steel Bezel Ring
      const bezelGrad = ctx.createConicGradient(Math.PI * 0.3, 0, 0);
      bezelGrad.addColorStop(0, "#ffffff");
      bezelGrad.addColorStop(0.25, "#94a3b8");
      bezelGrad.addColorStop(0.5, "#334155");
      bezelGrad.addColorStop(0.75, "#e2e8f0");
      bezelGrad.addColorStop(1, "#94a3b8");
      ctx.fillStyle = bezelGrad;
      ctx.beginPath();
      ctx.arc(0, 0, wRad, 0, Math.PI * 2);
      ctx.fill();

      // Winding Crown at 3 o'clock
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(wRad - 2, -10, 10, 20);
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      for (let cr = -8; cr <= 8; cr += 3) {
        ctx.beginPath();
        ctx.moveTo(wRad - 2, cr);
        ctx.lineTo(wRad + 8, cr);
        ctx.stroke();
      }

      // Dial: Bleu de Paris Sunburst
      const dialGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, wRad * 0.88);
      dialGrad.addColorStop(0, "#2563eb");
      dialGrad.addColorStop(0.4, "#1d4ed8");
      dialGrad.addColorStop(0.8, "#172554");
      dialGrad.addColorStop(1, "#0a1122");
      ctx.fillStyle = dialGrad;
      ctx.beginPath();
      ctx.arc(0, 0, wRad * 0.88, 0, Math.PI * 2);
      ctx.fill();

      // Applied Rhodium Indices
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        ctx.save();
        ctx.rotate(ang);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(wRad * 0.62, -1.8, wRad * 0.18, 3.6);
        ctx.restore();
      }

      // VÉRAN Text
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 9px serif";
      ctx.fillText("VÉRAN", 0, -wRad * 0.35);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "400 5.5px sans-serif";
      ctx.fillText("PARIS", 0, -wRad * 0.22);

      // Hands at 10:10
      ctx.save();
      ctx.rotate(-0.85); // 10 o'clock
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, -2, wRad * 0.48, 4);
      ctx.restore();

      ctx.save();
      ctx.rotate(0.55); // 10 past
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, -1.5, wRad * 0.72, 3);
      ctx.restore();

      // Blued seconds hand
      ctx.save();
      ctx.rotate(1.9);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(wRad * 0.76, 0);
      ctx.stroke();
      ctx.restore();

      // Center pinion
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Domed Sapphire reflection
      const reflGrad = ctx.createLinearGradient(-wRad * 0.6, -wRad * 0.6, wRad * 0.6, wRad * 0.6);
      reflGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      reflGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.05)");
      reflGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = reflGrad;
      ctx.beginPath();
      ctx.arc(0, 0, wRad * 0.88, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // arm rotate
    } else if (viewMode === "macro") {
      // -----------------------------------------------------------
      // MACRO STUDIO VIEW OF BLEU DE PARIS DIAL
      // -----------------------------------------------------------
      ctx.fillStyle = "#090b0e";
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const r = 240;

      // Outer steel case
      const caseGrad = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.15);
      caseGrad.addColorStop(0, "#cbd5e1");
      caseGrad.addColorStop(0.5, "#64748b");
      caseGrad.addColorStop(1, "#1e293b");
      ctx.fillStyle = caseGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.12, 0, Math.PI * 2);
      ctx.fill();

      // Dial
      const dGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      dGrad.addColorStop(0, "#2563eb");
      dGrad.addColorStop(0.5, "#1d4ed8");
      dGrad.addColorStop(0.85, "#172554");
      dGrad.addColorStop(1, "#0c1322");
      ctx.fillStyle = dGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Sunray lines
      for (let i = 0; i < 360; i += 1.5) {
        const rad = (i * Math.PI) / 180;
        const a = Math.abs(Math.sin(rad * 3 + 0.5)) * 0.14;
        ctx.strokeStyle = `rgba(255, 255, 255, ${a})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r);
        ctx.stroke();
      }

      // Applied indices & typography
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "300 24px serif";
      ctx.fillText("VÉRAN", cx, cy - 85);
      ctx.font = "500 11px sans-serif";
      ctx.fillStyle = "#d4af37";
      ctx.fillText("PARIS", cx, cy - 60);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "400 9px sans-serif";
      ctx.fillText("CHRONOMÈTRE À REMONTAGE MANUEL", cx, cy + 90);
      ctx.fillText("52 HEURES · 28,800 VPH", cx, cy + 110);
    } else {
      // -----------------------------------------------------------
      // SAPPHIRE EXHIBITION CASEBACK: CALIBRE V-101
      // -----------------------------------------------------------
      ctx.fillStyle = "#090b0e";
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const r = 240;

      // Steel Caseback ring with engraved text
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Exhibition glass opening
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
      ctx.fill();

      // Glashütte 3/4 Plate with stripes
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.9, -0.3, Math.PI * 1.2);
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.clip();

      const plateGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      plateGrad.addColorStop(0, "#e2e8f0");
      plateGrad.addColorStop(0.5, "#cbd5e1");
      plateGrad.addColorStop(1, "#94a3b8");
      ctx.fillStyle = plateGrad;
      ctx.fill();

      // Glashütte Ribbing (Geneva stripes)
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 14;
      for (let s = -r; s < r; s += 24) {
        ctx.beginPath();
        ctx.moveTo(cx + s - 100, cy - r);
        ctx.lineTo(cx + s + 100, cy + r);
        ctx.stroke();
      }

      // Gold chatons & rubies
      const chatons = [
        { x: cx - 60, y: cy - 40 },
        { x: cx + 45, y: cy - 70 },
        { x: cx - 20, y: cy + 40 },
      ];

      chatons.forEach((pos) => {
        // Gold chaton ring
        ctx.fillStyle = "#d4af37";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
        ctx.fill();
        // Ruby jewel
        ctx.fillStyle = "#e11d48";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 7, 0, Math.PI * 2);
        ctx.fill();
        // Blued screws around chaton
        ctx.fillStyle = "#2563eb";
        ctx.beginPath();
        ctx.arc(pos.x - 12, pos.y, 2.5, 0, Math.PI * 2);
        ctx.arc(pos.x + 12, pos.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Balance Wheel opening at bottom right
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx + 60, cy + 60, 55, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#0f172a"; // Deep movement recess
      ctx.fill();

      // Golden Balance Wheel
      ctx.strokeStyle = "#eab308";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx + 60, cy + 60, 42, 0, Math.PI * 2);
      ctx.stroke();

      // Balance bridge with hand anglage
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.roundRect(cx + 10, cy + 50, 70, 20, 4);
      ctx.fill();

      // Ruby endstone
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.arc(cx + 60, cy + 60, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Calibre engraving
      ctx.textAlign = "center";
      ctx.fillStyle = "#1e293b";
      ctx.font = "600 12px serif";
      ctx.fillText("CALIBRE V-101 · 21 JEWELS", cx, cy - 110);
      ctx.font = "500 9px sans-serif";
      ctx.fillText("AJUSTÉ EN CINQ POSITIONS", cx, cy - 92);
    }
  }, [strapType, viewMode]);

  return (
    <div className="relative w-full aspect-[4/5] max-w-[540px] mx-auto rounded-none overflow-hidden border border-white/10 bg-[#121418] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
      <canvas ref={canvasRef} className="w-full h-full object-cover block" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-400 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/5">
        <span>{viewMode === "wrist" ? "Terrasse Parisienne · 75001" : viewMode === "macro" ? "Macro Studio Specimen" : "Calibre V-101 Manufacture"}</span>
        <span className="text-[#d4af37]">{strapType.toUpperCase()}</span>
      </div>
    </div>
  );
}

