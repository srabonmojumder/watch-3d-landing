"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/audio";

export function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  // Micro Telemetry states
  const [telemetryTime, setTelemetryTime] = useState("00:01");
  const [telemetryLabel, setTelemetryLabel] = useState("THE FIRST STEPS");
  const [scrubProgress, setScrubProgress] = useState(0);

  const bellRungRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  // Direct, ultra-fast 2D canvas scene renderer (executes in < 0.5ms per frame)
  const drawScene = useCallback(
    (ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) => {
      const t = Math.max(0, Math.min(1, progress));

      ctx.clearRect(0, 0, width, height);

      // Monochromatic dark backdrop with subtle lighting transition
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * (0.35 + t * 0.15),
        width * 0.05,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );

      if (t < 0.55) {
        bgGrad.addColorStop(0, "#181410"); // Muted warm architectural glow
        bgGrad.addColorStop(0.4, "#0c0b09");
        bgGrad.addColorStop(1, "#000000");
      } else if (t < 0.75) {
        bgGrad.addColorStop(0, "#13161c"); // Terrace overcast slate
        bgGrad.addColorStop(0.5, "#090b0e");
        bgGrad.addColorStop(1, "#000000");
      } else {
        bgGrad.addColorStop(0, "#0b1320"); // Deep sapphire studio vignette
        bgGrad.addColorStop(0.5, "#07090d");
        bgGrad.addColorStop(1, "#000000");
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // ACT 1: PARISIAN HOTEL FACADE & SHARP-DRESSED TRAVELER (t: 0.0 - 0.35)
      // -------------------------------------------------------------
      if (t < 0.55) {
        const act1Alpha = Math.max(0, 1 - (t - 0.25) / 0.25);
        ctx.save();
        ctx.globalAlpha = act1Alpha;

        // Classical Parisian Hotel Haussmann facade
        ctx.fillStyle = "#121110";
        ctx.fillRect(0, 0, width, height * 0.72);

        // Ashlar limestone grooves
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        for (let y = height * 0.1; y < height * 0.72; y += 38) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Grand Parisian Arched Carriage Entrance
        const archW = width * 0.38;
        const archH = height * 0.58;
        const archX = width * 0.5 - archW / 2;
        const archY = height * 0.15;

        ctx.fillStyle = "#050505";
        ctx.beginPath();
        ctx.moveTo(archX, archY + archH);
        ctx.lineTo(archX, archY + archW / 2);
        ctx.bezierCurveTo(archX, archY, archX + archW, archY, archX + archW, archY + archW / 2);
        ctx.lineTo(archX + archW, archY + archH);
        ctx.closePath();
        ctx.fill();

        // Warm interior glow
        const portalGlow = ctx.createRadialGradient(
          width * 0.5,
          archY + archH * 0.6,
          10,
          width * 0.5,
          archY + archH * 0.6,
          archW * 0.7
        );
        portalGlow.addColorStop(0, "rgba(225, 185, 120, 0.22)");
        portalGlow.addColorStop(0.6, "rgba(225, 185, 120, 0.05)");
        portalGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = portalGlow;
        ctx.fill();

        // Cobblestone ground
        ctx.fillStyle = "#090909";
        ctx.fillRect(0, height * 0.72, width, height * 0.28);

        // Sharp-dressed traveler walking towards hotel
        const walkProgress = Math.min(1, t / 0.35);
        const travelerScale = 0.78 + walkProgress * 0.45;
        const travelerX = width * (0.38 + walkProgress * 0.12);
        const travelerY = height * (0.70 + walkProgress * 0.06);

        ctx.save();
        ctx.translate(travelerX, travelerY);
        ctx.scale(travelerScale, travelerScale);

        // Floor shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.beginPath();
        ctx.ellipse(0, 10, 85, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tailored Charcoal Overcoat
        const coatGrad = ctx.createLinearGradient(-40, -200, 40, 0);
        coatGrad.addColorStop(0, "#1c1e22");
        coatGrad.addColorStop(0.6, "#111316");
        coatGrad.addColorStop(1, "#090a0d");
        ctx.fillStyle = coatGrad;
        ctx.beginPath();
        ctx.moveTo(-32, -150);
        ctx.bezierCurveTo(-40, -110, -48, -40, -50, 0);
        ctx.lineTo(40, 0);
        ctx.bezierCurveTo(36, -40, 32, -110, 24, -150);
        ctx.closePath();
        ctx.fill();

        // Head silhouette
        ctx.fillStyle = "#14161a";
        ctx.beginPath();
        ctx.arc(-4, -180, 22, 0, Math.PI * 2);
        ctx.fill();

        // Luxury Patina Leather Weekend Bag in Hand
        ctx.save();
        ctx.translate(-58, -35);

        const bagGrad = ctx.createLinearGradient(-35, -20, 35, 20);
        bagGrad.addColorStop(0, "#733d1b");
        bagGrad.addColorStop(0.4, "#542a10");
        bagGrad.addColorStop(1, "#361908");
        ctx.fillStyle = bagGrad;
        ctx.beginPath();
        ctx.roundRect(-32, -18, 64, 38, [12, 12, 16, 16]);
        ctx.fill();

        // Saddle stitching
        ctx.strokeStyle = "rgba(229, 168, 106, 0.7)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 2]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Brass buckles
        ctx.fillStyle = "#d4af37";
        ctx.fillRect(-20, -15, 3.5, 34);
        ctx.fillRect(16, -15, 3.5, 34);

        // Rolled handle
        ctx.strokeStyle = "#381c0c";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, -20, 14, Math.PI, 0);
        ctx.stroke();
        ctx.restore(); // bag

        ctx.restore(); // traveler
        ctx.restore(); // act 1
      }

      // -------------------------------------------------------------
      // ACT 2: CONCIERGE DESK, BRASS BELL & WRIST WATCH (t: 0.22 - 0.68)
      // -------------------------------------------------------------
      if (t >= 0.20 && t < 0.72) {
        const act2Alpha =
          Math.min(1, (t - 0.20) / 0.12) * Math.max(0, 1 - (t - 0.58) / 0.14);
        ctx.save();
        ctx.globalAlpha = act2Alpha;

        // Mahogany reception counter
        const deskY = height * 0.68;
        ctx.fillStyle = "#150d09";
        ctx.fillRect(0, deskY, width, height - deskY);

        ctx.fillStyle = "#997a2f";
        ctx.fillRect(0, deskY, width, 3.5);

        // Patina leather bag placed on counter
        ctx.save();
        const deskBagX = width * 0.35;
        const deskBagY = deskY - 35;
        ctx.translate(deskBagX, deskBagY);

        const bagDeskGrad = ctx.createLinearGradient(-60, -35, 60, 35);
        bagDeskGrad.addColorStop(0, "#7a421e");
        bagDeskGrad.addColorStop(0.5, "#522910");
        bagDeskGrad.addColorStop(1, "#2f1506");
        ctx.fillStyle = bagDeskGrad;
        ctx.beginPath();
        ctx.roundRect(-65, -35, 130, 70, 18);
        ctx.fill();

        ctx.fillStyle = "#d4af37";
        ctx.fillRect(-40, -32, 5, 64);
        ctx.fillRect(35, -32, 5, 64);
        ctx.restore();

        // Solid Brass Concierge Bell
        const bellX = width * 0.62;
        const bellY = deskY - 24;

        ctx.save();
        ctx.translate(bellX, bellY);

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(0, 18, 36, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#80631c";
        ctx.beginPath();
        ctx.roundRect(-30, 8, 60, 12, 3);
        ctx.fill();

        const bellGrad = ctx.createRadialGradient(-8, -4, 2, 0, 4, 32);
        bellGrad.addColorStop(0, "#fff8db");
        bellGrad.addColorStop(0.35, "#e5c378");
        bellGrad.addColorStop(0.7, "#a87f22");
        bellGrad.addColorStop(1, "#543c0c");
        ctx.fillStyle = bellGrad;
        ctx.beginPath();
        ctx.moveTo(-28, 8);
        ctx.bezierCurveTo(-28, -16, 28, -16, 28, 8);
        ctx.closePath();
        ctx.fill();

        const depress = t >= 0.44 && t <= 0.52 ? 3 : 0;
        ctx.fillStyle = "#d4af37";
        ctx.fillRect(-3, -22 + depress, 6, 8);
        ctx.beginPath();
        ctx.arc(0, -22 + depress, 6, 0, Math.PI * 2);
        ctx.fill();

        if (t >= 0.45 && t <= 0.62) {
          const ringProg = (t - 0.45) / 0.17;
          ctx.strokeStyle = `rgba(243, 229, 171, ${Math.max(0, 0.7 - ringProg * 0.7)})`;
          ctx.lineWidth = 2 - ringProg;
          ctx.beginPath();
          ctx.ellipse(0, -18, 30 + ringProg * 140, 16 + ringProg * 75, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore(); // bell

        // Hand reaching toward bell with Blue-Dial watch on wrist
        const armProg = Math.max(0, (t - 0.30) / 0.22);
        const armX = width * (0.85 - armProg * 0.22);
        const armY = deskY - 10 - armProg * 12;

        ctx.save();
        ctx.translate(armX, armY);

        ctx.fillStyle = "#16181d";
        ctx.beginPath();
        ctx.roundRect(0, -14, 110, 28, 6);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-8, -11, 8, 22);

        ctx.fillStyle = "#dcb19c";
        ctx.beginPath();
        ctx.roundRect(-24, -9, 18, 18, 4);
        ctx.fill();

        // Blue dial watch on wrist
        ctx.save();
        ctx.translate(-15, 0);

        ctx.fillStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#1d4ed8";
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-6, -6);
        ctx.lineTo(6, 6);
        ctx.stroke();

        ctx.restore(); // watch
        ctx.restore(); // arm
        ctx.restore(); // act 2
      }

      // -------------------------------------------------------------
      // ACT 3: TERRACE SUITE WITH HAUSSMANN BALCONIES (t: 0.48 - 0.82)
      // -------------------------------------------------------------
      if (t >= 0.46 && t < 0.85) {
        const act3Alpha =
          Math.min(1, (t - 0.46) / 0.12) * Math.max(0, 1 - (t - 0.74) / 0.11);
        ctx.save();
        ctx.globalAlpha = act3Alpha;

        // Overcast Parisian morning sky & Haussmann balcony skyline
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
        skyGrad.addColorStop(0, "#475569");
        skyGrad.addColorStop(0.5, "#64748b");
        skyGrad.addColorStop(1, "#94a3b8");
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height * 0.6);

        // Zinc rooftops & Haussmann stone facade
        ctx.fillStyle = "#334155";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.35);
        ctx.lineTo(width * 0.25, height * 0.28);
        ctx.lineTo(width * 0.5, height * 0.34);
        ctx.lineTo(width * 0.75, height * 0.29);
        ctx.lineTo(width, height * 0.36);
        ctx.lineTo(width, height * 0.6);
        ctx.lineTo(0, height * 0.6);
        ctx.closePath();
        ctx.fill();

        // Wrought-iron balcony railing
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 3;
        const bY = height * 0.52;
        ctx.beginPath();
        ctx.moveTo(0, bY);
        ctx.lineTo(width, bY);
        ctx.moveTo(0, bY + 60);
        ctx.lineTo(width, bY + 60);
        ctx.stroke();

        for (let rx = 20; rx < width; rx += 50) {
          ctx.beginPath();
          ctx.moveTo(rx, bY);
          ctx.lineTo(rx, bY + 60);
          ctx.stroke();
        }

        // Bistro marble table on terrace
        const tableGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.82,
          30,
          width * 0.5,
          height * 0.82,
          380
        );
        tableGrad.addColorStop(0, "#f8fafc");
        tableGrad.addColorStop(0.7, "#cbd5e1");
        tableGrad.addColorStop(1, "#475569");
        ctx.fillStyle = tableGrad;
        ctx.beginPath();
        ctx.ellipse(width * 0.5, height * 0.86, width * 0.45, height * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();

        // The Patina Leather Bag resting on the terrace table
        const zoomProgress = (t - 0.48) / 0.34;
        const bagScale = 1.0 + zoomProgress * 0.8;
        ctx.save();
        ctx.translate(width * 0.5, height * 0.76);
        ctx.scale(bagScale, bagScale);

        const bagTerraceGrad = ctx.createLinearGradient(-90, -50, 90, 50);
        bagTerraceGrad.addColorStop(0, "#80451e");
        bagTerraceGrad.addColorStop(0.5, "#572b11");
        bagTerraceGrad.addColorStop(1, "#331606");
        ctx.fillStyle = bagTerraceGrad;
        ctx.beginPath();
        ctx.roundRect(-90, -45, 180, 90, 22);
        ctx.fill();

        // Watch resting horizontally on the leather bag
        ctx.fillStyle = "#cbd5e1";
        ctx.beginPath();
        ctx.arc(0, -6, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#1e40af";
        ctx.beginPath();
        ctx.arc(0, -6, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // bag scale
        ctx.restore(); // act 3
      }

      // -------------------------------------------------------------
      // ACT 4: MACRO HERO SHOT OF WATCH DIAL ON LEATHER PATINA (t: 0.65 - 1.0)
      // -------------------------------------------------------------
      if (t >= 0.62) {
        const act4Alpha = Math.min(1, (t - 0.62) / 0.18);
        ctx.save();
        ctx.globalAlpha = act4Alpha;

        const macroProgress = Math.min(1, (t - 0.68) / 0.32);
        const cx = width * 0.5;
        const cy = height * 0.5;

        // Distressed brown patina leather background
        const leatherBg = ctx.createRadialGradient(cx, cy, 50, cx, cy, width * 0.7);
        leatherBg.addColorStop(0, "#3d2110");
        leatherBg.addColorStop(0.5, "#261308");
        leatherBg.addColorStop(1, "#0d0603");
        ctx.fillStyle = leatherBg;
        ctx.fillRect(0, 0, width, height);

        // Saddle stitching lines
        ctx.strokeStyle = "rgba(217, 149, 89, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, height * 0.15);
        ctx.lineTo(width, height * 0.15);
        ctx.moveTo(0, height * 0.85);
        ctx.lineTo(width, height * 0.85);
        ctx.stroke();
        ctx.setLineDash([]);

        // Scaled macro watch
        const startR = Math.min(width, height) * 0.22;
        const targetR = Math.min(width, height) * 0.44;
        const watchR = startR + (targetR - startR) * Math.pow(macroProgress, 1.1);

        ctx.translate(cx, cy);

        // Case shadow
        const wShadow = ctx.createRadialGradient(0, 0, watchR * 0.9, 0, 0, watchR * 1.45);
        wShadow.addColorStop(0, "rgba(0, 0, 0, 0.9)");
        wShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = wShadow;
        ctx.beginPath();
        ctx.arc(0, 0, watchR * 1.45, 0, Math.PI * 2);
        ctx.fill();

        // 316L Lugs
        const drawLug = (sx: number, sy: number) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(sx * (watchR * 0.72), sy * (watchR * 0.65));
          ctx.lineTo(sx * (watchR * 0.8), sy * (watchR * 1.25));
          ctx.lineTo(sx * (watchR * 0.55), sy * (watchR * 1.25));
          ctx.lineTo(sx * (watchR * 0.48), sy * (watchR * 0.85));
          ctx.closePath();

          const lGrad = ctx.createLinearGradient(sx * (watchR * 0.5), 0, sx * (watchR * 0.8), 0);
          lGrad.addColorStop(0, "#ffffff");
          lGrad.addColorStop(0.3, "#cbd5e1");
          lGrad.addColorStop(0.7, "#64748b");
          lGrad.addColorStop(1, "#1e293b");
          ctx.fillStyle = lGrad;
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();
        };

        drawLug(-1, -1);
        drawLug(1, -1);
        drawLug(-1, 1);
        drawLug(1, 1);

        // 39mm Bezel
        const bezelGrad = ctx.createConicGradient(Math.PI * 0.25, 0, 0);
        bezelGrad.addColorStop(0, "#ffffff");
        bezelGrad.addColorStop(0.2, "#94a3b8");
        bezelGrad.addColorStop(0.4, "#334155");
        bezelGrad.addColorStop(0.6, "#e2e8f0");
        bezelGrad.addColorStop(0.8, "#64748b");
        bezelGrad.addColorStop(1, "#f8fafc");

        ctx.fillStyle = bezelGrad;
        ctx.beginPath();
        ctx.arc(0, 0, watchR * 1.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Sunburst Bleu de Paris Dial
        const dialR = watchR * 0.92;
        const dialGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, dialR);
        dialGrad.addColorStop(0, "#2563eb");
        dialGrad.addColorStop(0.4, "#1d4ed8");
        dialGrad.addColorStop(0.75, "#172554");
        dialGrad.addColorStop(1, "#0a1122");
        ctx.fillStyle = dialGrad;
        ctx.beginPath();
        ctx.arc(0, 0, dialR, 0, Math.PI * 2);
        ctx.fill();

        // Radial rays
        ctx.save();
        const numRays = 180;
        for (let r = 0; r < numRays; r++) {
          const ang = (r / numRays) * Math.PI * 2;
          const a = Math.abs(Math.sin(ang * 2.5 + 0.3)) * 0.14;
          ctx.strokeStyle = `rgba(255, 255, 255, ${a})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(ang) * dialR, Math.sin(ang) * dialR);
          ctx.stroke();
        }
        ctx.restore();

        // Minute Track
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, dialR * 0.85, 0, Math.PI * 2);
        ctx.stroke();

        for (let m = 0; m < 60; m++) {
          const mAng = (m / 60) * Math.PI * 2 - Math.PI / 2;
          const isHour = m % 5 === 0;
          const oR = dialR * 0.85;
          const iR = isHour ? dialR * 0.77 : dialR * 0.81;

          ctx.strokeStyle = isHour ? "#ffffff" : "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = isHour ? 2 : 1;
          ctx.beginPath();
          ctx.moveTo(Math.cos(mAng) * iR, Math.sin(mAng) * iR);
          ctx.lineTo(Math.cos(mAng) * oR, Math.sin(mAng) * oR);
          ctx.stroke();
        }

        // Applied hour markers
        for (let h = 1; h <= 12; h++) {
          const hAng = (h / 12) * Math.PI * 2 - Math.PI / 2;
          ctx.save();
          ctx.rotate(hAng);
          const dist = dialR * 0.68;
          const len = h % 3 === 0 ? dialR * 0.18 : dialR * 0.14;
          const mWidth = h % 3 === 0 ? 5.5 : 4;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(dist, -mWidth / 2, len, mWidth);

          if (h === 12) {
            ctx.fillRect(dist, -mWidth - 3, len, mWidth);
          }
          ctx.restore();
        }

        // Typography: VÉRAN · PARIS
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font = `400 ${Math.round(watchR * 0.088)}px var(--font-sans), sans-serif`;
        ctx.fillText("VÉRAN", 0, -watchR * 0.36);

        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.font = `400 ${Math.round(watchR * 0.035)}px var(--font-sans), sans-serif`;
        ctx.fillText("PARIS", 0, -watchR * 0.26);

        ctx.font = `300 ${Math.round(watchR * 0.030)}px var(--font-sans), sans-serif`;
        ctx.fillText("CHRONOMÈTRE · 52H", 0, watchR * 0.36);
        ctx.fillText("MADE IN PARIS", 0, watchR * 0.74);

        // Hands at 10:10
        ctx.save();
        ctx.rotate(-0.85);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, -3, watchR * 0.52, 6);
        ctx.restore();

        ctx.save();
        ctx.rotate(0.55);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, -2.5, watchR * 0.76, 5);
        ctx.restore();

        // Blued seconds hand
        ctx.save();
        ctx.rotate(2.0 + t * 4);
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-watchR * 0.2, 0);
        ctx.lineTo(watchR * 0.82, 0);
        ctx.stroke();
        ctx.restore();

        // Pinion
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Anti-reflective light sweep
        const glareGrad = ctx.createLinearGradient(-dialR, -dialR, dialR, dialR);
        glareGrad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
        glareGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.05)");
        glareGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glareGrad;
        ctx.beginPath();
        ctx.arc(0, 0, dialR, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // macro watch
      }
    },
    []
  );

  // Synchronize canvas scrub with GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      // Re-render current frame immediately on resize
      drawScene(ctx, progressRef.current, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial instant frame render (0.0ms delay, no buffering screen)
    drawScene(ctx, 0, canvas.width, canvas.height);

    // GSAP context scoping for clean teardown and zero memory leaks
    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          progressRef.current = progress;
          setScrubProgress(progress);

          // Update Micro Telemetry: "00:01 / 00:07 · THE FIRST STEPS"
          const totalSeconds = 7;
          const currentSecond = Math.min(
            totalSeconds,
            Math.max(1, Math.ceil(progress * totalSeconds))
          );
          setTelemetryTime(`00:0${currentSecond}`);

          if (progress < 0.28) {
            setTelemetryLabel("THE FIRST STEPS");
          } else if (progress < 0.52) {
            setTelemetryLabel("CONCIERGE & BRASS BELL");
          } else if (progress < 0.74) {
            setTelemetryLabel("TERRACE & PATINA LEATHER");
          } else {
            setTelemetryLabel("MACRO LE VOYAGEUR");
          }

          // Service bell chime trigger at concierge desk
          if (progress >= 0.45 && progress <= 0.55) {
            if (!bellRungRef.current) {
              bellRungRef.current = true;
              soundManager.playConciergeBell();
            }
          } else if (progress < 0.38 || progress > 0.65) {
            bellRungRef.current = false;
          }

          // Render frame directly via RAF (smooth 60-120fps)
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
          }
          rafIdRef.current = requestAnimationFrame(() => {
            drawScene(ctx, progress, canvas.width, canvas.height);
          });

          // Hero Typography Reveal: "LE VOYAGEUR"
          if (textRef.current && subtextRef.current) {
            if (progress > 0.70) {
              const textAlpha = Math.min(1, (progress - 0.70) / 0.18);
              const textY = (1 - textAlpha) * 35;
              textRef.current.style.opacity = `${textAlpha}`;
              textRef.current.style.transform = `translateY(${textY}px)`;
              subtextRef.current.style.opacity = `${textAlpha}`;
              subtextRef.current.style.transform = `translateY(${textY * 0.6}px)`;
            } else {
              textRef.current.style.opacity = "0";
              subtextRef.current.style.opacity = "0";
            }
          }
        },
      });
    }, containerRef);

    return () => {
      gsapCtx.revert();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [drawScene]);

  const handleSkipToSpecs = () => {
    const el = document.getElementById("product-breakdown");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* HTML5 Zero-Stutter Direct Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Monochromatic editorial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Micro Telemetry Overlay during scrub: Bottom Left */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-14 z-30 pointer-events-auto flex flex-col space-y-3">
        <div className="flex items-center space-x-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-medium">{telemetryTime} / 00:07</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-300 tracking-[0.25em]">{telemetryLabel}</span>
        </div>

        {/* Slider scrub bar indicator */}
        <div className="flex items-center space-x-3">
          <div className="w-44 sm:w-56 h-[2px] bg-white/15 relative overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${scrubProgress * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-zinc-400">
            {Math.round(scrubProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Hero Typography Reveal: Massive Bold "LE VOYAGEUR" */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div
          ref={textRef}
          style={{ opacity: 0, transform: "translateY(35px)" }}
          className="transition-all duration-300 ease-out flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-zinc-400 font-medium block mb-4">
            VÉRAN ATELIER · PARIS
          </span>
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] uppercase font-bold text-white drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
            LE VOYAGEUR
          </h1>
        </div>

        <div
          ref={subtextRef}
          style={{ opacity: 0, transform: "translateY(25px)" }}
          className="mt-6 flex flex-col items-center space-y-4 transition-all duration-300 ease-out pointer-events-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-300 max-w-xl font-light">
            Steel 39 mm · Hand-Wound Manufacture Calibre · €9,800
          </p>
          <button
            onClick={handleSkipToSpecs}
            className="px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] bg-white text-black font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            Explore Specifications
          </button>
        </div>
      </div>

      {/* Bottom Right Scroll Prompt */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-30 hidden sm:flex items-center space-x-3 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
        <span>Scroll to scrub</span>
        <div className="w-4 h-6 border border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
