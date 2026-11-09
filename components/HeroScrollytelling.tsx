"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/audio";
import { ChevronDown, Sparkles, Volume2, ShieldCheck, Compass } from "lucide-react";

export function HeroScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentNarrative, setCurrentNarrative] = useState("Arrival at Le Grand Hôtel, Paris");
  const bellRungRef = useRef(false);

  // Cached frame bitmaps
  const framesCacheRef = useRef<HTMLCanvasElement[]>([]);
  const totalFrames = 80;

  // Render a specific frame of the traveler -> hotel desk -> bell -> macro dial journey
  const renderFrameToCanvas = (index: number, width: number, height: number): HTMLCanvasElement => {
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return offscreen;

    const t = index / (totalFrames - 1); // 0.0 to 1.0

    // Background gradient - luxury moody atmospheric Parisian hotel lighting
    const bgGrad = ctx.createRadialGradient(
      width * 0.5,
      height * (0.35 + t * 0.15),
      width * 0.05,
      width * 0.5,
      height * 0.5,
      width * 0.8
    );

    // Warm hotel lighting transitioning to dark macro studio lighting
    if (t < 0.6) {
      bgGrad.addColorStop(0, "#2a1e12"); // Amber chandelier glow
      bgGrad.addColorStop(0.35, "#181310"); // Rich Parisian lobby darkness
      bgGrad.addColorStop(0.75, "#0d0b0a");
      bgGrad.addColorStop(1, "#070606");
    } else {
      const dialFocus = (t - 0.6) / 0.4;
      bgGrad.addColorStop(0, `rgba(${Math.round(20 - dialFocus * 10)}, ${Math.round(30 + dialFocus * 10)}, ${Math.round(55 + dialFocus * 25)}, 1)`);
      bgGrad.addColorStop(0.5, "#0d1117");
      bgGrad.addColorStop(1, "#07080a");
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // -------------------------------------------------------------
    // STAGE 1: HOTEL LOBBY ARCHITECTURE & WALKING TRAVELER (t: 0.0 - 0.35)
    // -------------------------------------------------------------
    if (t < 0.65) {
      const lobbyFade = Math.max(0, 1 - (t - 0.4) / 0.25);
      ctx.save();
      ctx.globalAlpha = lobbyFade;

      // Architectural arches & pillars
      ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
      ctx.lineWidth = 2;
      const colStep = width / 6;
      for (let i = 1; i <= 5; i++) {
        const cx = i * colStep;
        ctx.beginPath();
        ctx.moveTo(cx - 30, height * 0.8);
        ctx.lineTo(cx - 30, height * 0.18);
        ctx.bezierCurveTo(cx - 30, height * 0.08, cx + 30, height * 0.08, cx + 30, height * 0.18);
        ctx.lineTo(cx + 30, height * 0.8);
        ctx.stroke();
      }

      // Checkered marble floor perspective
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.fillStyle = "rgba(20, 18, 16, 0.7)";
      for (let row = 0; row < 12; row++) {
        const yTop = height * (0.65 + row * 0.03);
        const yBot = height * (0.65 + (row + 1) * 0.035);
        for (let col = 0; col < 14; col++) {
          if ((row + col) % 2 === 0) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
          } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
          }
          const x1 = (col / 14) * width * 1.4 - width * 0.2;
          const x2 = ((col + 1) / 14) * width * 1.4 - width * 0.2;
          ctx.beginPath();
          ctx.moveTo(x1, yTop);
          ctx.lineTo(x2, yTop);
          ctx.lineTo(x2 * 1.05, yBot);
          ctx.lineTo(x1 * 1.05, yBot);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Chandelier golden light rays
      const chandelierY = height * 0.12;
      const rayGrad = ctx.createRadialGradient(width * 0.5, chandelierY, 5, width * 0.5, chandelierY + 280, 400);
      rayGrad.addColorStop(0, "rgba(255, 225, 160, 0.35)");
      rayGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.08)");
      rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.arc(width * 0.5, chandelierY + 120, 350, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric dust particles in chandelier light
      ctx.fillStyle = "rgba(255, 235, 180, 0.4)";
      for (let p = 0; p < 25; p++) {
        const px = (Math.sin(p * 99 + index * 0.05) * 0.5 + 0.5) * width;
        const py = (Math.cos(p * 37 + index * 0.04) * 0.5 + 0.5) * height * 0.6 + height * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, (p % 3) + 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // -------------------------------------------------------------
    // STAGE 2 & 3: TRAVELER, LEATHER BAG, RECEPTION DESK & BELL (t: 0.0 - 0.65)
    // -------------------------------------------------------------
    if (t < 0.75) {
      const sceneFade = Math.max(0, 1 - (t - 0.55) / 0.2);
      ctx.save();
      ctx.globalAlpha = sceneFade;

      // Traveler walk progression
      const walkProg = Math.min(1, t / 0.55);
      const travelerScale = 0.85 + walkProg * 0.55;
      const travelerX = width * (0.35 + walkProg * 0.15);
      const travelerY = height * (0.62 + walkProg * 0.08);

      // Traveler silhouette in tailored charcoal coat
      ctx.save();
      ctx.translate(travelerX, travelerY);
      ctx.scale(travelerScale, travelerScale);

      // Shadow on floor
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.beginPath();
      ctx.ellipse(0, 15, 90, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Overcoat silhouette
      const coatGrad = ctx.createLinearGradient(-40, -220, 60, 0);
      coatGrad.addColorStop(0, "#1f2228");
      coatGrad.addColorStop(0.6, "#121417");
      coatGrad.addColorStop(1, "#0a0b0d");
      ctx.fillStyle = coatGrad;

      // Torso & overcoat body
      ctx.beginPath();
      ctx.moveTo(-35, -160);
      ctx.bezierCurveTo(-45, -120, -50, -40, -55, 0);
      ctx.lineTo(45, 0);
      ctx.bezierCurveTo(40, -40, 35, -120, 25, -160);
      ctx.closePath();
      ctx.fill();

      // High collar & lapel
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-15, -165);
      ctx.lineTo(-5, -110);
      ctx.lineTo(10, -165);
      ctx.stroke();

      // Head / refined profile
      ctx.fillStyle = "#16181d";
      ctx.beginPath();
      ctx.arc(-5, -190, 24, 0, Math.PI * 2);
      ctx.fill();

      // Vintage cognac leather weekend bag (heritage duffle)
      ctx.save();
      const bagX = -65;
      const bagY = -40;
      ctx.translate(bagX, bagY);

      // Bag leather body
      const leatherGrad = ctx.createLinearGradient(-35, -25, 35, 25);
      leatherGrad.addColorStop(0, "#8a481e");
      leatherGrad.addColorStop(0.5, "#663412");
      leatherGrad.addColorStop(1, "#3f1c07");
      ctx.fillStyle = leatherGrad;

      // Barrel bag shape
      ctx.beginPath();
      ctx.roundRect(-35, -20, 70, 42, [14, 14, 18, 18]);
      ctx.fill();

      // Saddle stitching line
      ctx.strokeStyle = "#e59f5a";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Brass buckles & strap
      ctx.fillStyle = "#d4af37";
      ctx.fillRect(-22, -18, 4, 38);
      ctx.fillRect(18, -18, 4, 38);

      // Leather top handle
      ctx.strokeStyle = "#4c240a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, -22, 16, Math.PI, 0);
      ctx.stroke();
      ctx.restore();

      // Arm reaching forward with VÉRAN blue dial on left wrist
      const armProg = Math.max(0, (t - 0.25) / 0.35); // 0 at walk, 1 at bell reach
      ctx.save();
      ctx.translate(20, -110);
      const armAngle = -0.2 + armProg * 0.45;
      ctx.rotate(armAngle);

      // Forearm sleeve
      ctx.fillStyle = "#181a1f";
      ctx.beginPath();
      ctx.roundRect(0, -10, 85 + armProg * 35, 22, 6);
      ctx.fill();

      // White shirt cuff edge
      ctx.fillStyle = "#f4f4f5";
      ctx.fillRect(78 + armProg * 35, -8, 6, 18);

      // Wrist position
      const wristX = 86 + armProg * 35;
      const wristY = 1;

      // WATCH ON WRIST: Stainless steel case + Bleu de Paris dial visible!
      ctx.save();
      ctx.translate(wristX, wristY);

      // Steel case
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      // Blue dial glint
      ctx.fillStyle = "#1e3a8a";
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Sapphire glint ray
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(5, 5);
      ctx.stroke();

      ctx.restore(); // wrist
      ctx.restore(); // arm
      ctx.restore(); // traveler

      // Reception Desk Counter (approaching in foreground)
      const deskProgress = Math.min(1, t / 0.55);
      const deskY = height * (0.78 - deskProgress * 0.08);
      ctx.fillStyle = "#1a0f0a"; // Polished mahogany
      ctx.fillRect(0, deskY, width, height - deskY);

      // Desk brass rim
      ctx.fillStyle = "#b38f38";
      ctx.fillRect(0, deskY, width, 4);

      // Desk reflection
      const deskRefGrad = ctx.createLinearGradient(0, deskY + 4, 0, deskY + 60);
      deskRefGrad.addColorStop(0, "rgba(212, 175, 55, 0.15)");
      deskRefGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = deskRefGrad;
      ctx.fillRect(0, deskY + 4, width, 60);

      // Concierge Solid Brass Service Bell on desk
      const bellX = width * 0.62;
      const bellY = deskY - 18;

      ctx.save();
      ctx.translate(bellX, bellY);

      // Bell shadow
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.beginPath();
      ctx.ellipse(0, 16, 32, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bell brass base pedestal
      ctx.fillStyle = "#8c6e26";
      ctx.beginPath();
      ctx.roundRect(-26, 8, 52, 10, 3);
      ctx.fill();

      // Bell polished brass dome
      const bellGrad = ctx.createRadialGradient(-6, -4, 2, 0, 4, 28);
      bellGrad.addColorStop(0, "#fff5cc");
      bellGrad.addColorStop(0.3, "#e5c378");
      bellGrad.addColorStop(0.7, "#b88c2b");
      bellGrad.addColorStop(1, "#594211");
      ctx.fillStyle = bellGrad;

      ctx.beginPath();
      ctx.moveTo(-24, 8);
      ctx.bezierCurveTo(-24, -14, 24, -14, 24, 8);
      ctx.closePath();
      ctx.fill();

      // Top strike plunger pin
      const plungerDepress = t >= 0.52 && t <= 0.65 ? 3 : 0;
      ctx.fillStyle = "#d4af37";
      ctx.fillRect(-2.5, -20 + plungerDepress, 5, 8);
      ctx.beginPath();
      ctx.arc(0, -20 + plungerDepress, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Acoustic chime shockwave rings if bell struck (t >= 0.54)
      if (t >= 0.53 && t <= 0.72) {
        const ringProg = (t - 0.53) / 0.19;
        ctx.strokeStyle = `rgba(243, 229, 171, ${Math.max(0, 0.8 - ringProg * 0.8)})`;
        ctx.lineWidth = 2.5 - ringProg * 1.5;
        ctx.beginPath();
        ctx.ellipse(0, -16, 25 + ringProg * 120, 14 + ringProg * 65, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0, 0.5 - ringProg * 0.5)})`;
        ctx.beginPath();
        ctx.ellipse(0, -16, 12 + ringProg * 80, 8 + ringProg * 45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore(); // bell
      ctx.restore(); // scene
    }

    // -------------------------------------------------------------
    // STAGE 4 & 5: ULTRA-SHARP MACRO DIAL SEAMLESS ZOOM (t: 0.50 - 1.0)
    // -------------------------------------------------------------
    if (t >= 0.45) {
      const dialAlpha = Math.min(1, (t - 0.45) / 0.25);
      const macroZoom = Math.min(1, (t - 0.50) / 0.50); // 0 at transition, 1 at full close-up

      ctx.save();
      ctx.globalAlpha = dialAlpha;

      // Center of dial
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Dynamic radius scaling: starts smaller and expands smoothly to heroic macro viewport size
      const startRadius = Math.min(width, height) * 0.18;
      const maxRadius = Math.min(width, height) * 0.42;
      const watchRadius = startRadius + (maxRadius - startRadius) * Math.pow(macroZoom, 1.2);

      ctx.translate(centerX, centerY);

      // Subtle dynamic wrist rotation that locks into straight 12-o'clock alignment
      const rotationAngle = (1 - macroZoom) * -0.22;
      ctx.rotate(rotationAngle);

      // 1. WATCH CASE SHADOW & VIGNETTE
      const shadowGrad = ctx.createRadialGradient(0, 0, watchRadius * 0.9, 0, 0, watchRadius * 1.45);
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.85)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // 2. STAINLESS STEEL LUGS (316L satin brushed with polished chamfers)
      ctx.fillStyle = "#8b949e";
      const lugWidth = watchRadius * 0.28;
      const lugLength = watchRadius * 1.22;

      // 4 Lugs
      const drawLug = (signX: number, signY: number) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(signX * (watchRadius * 0.72), signY * (watchRadius * 0.65));
        ctx.lineTo(signX * (watchRadius * 0.78), signY * lugLength);
        ctx.lineTo(signX * (watchRadius * 0.78 - lugWidth), signY * lugLength);
        ctx.lineTo(signX * (watchRadius * 0.5), signY * (watchRadius * 0.85));
        ctx.closePath();

        const lugGrad = ctx.createLinearGradient(
          signX * (watchRadius * 0.5),
          0,
          signX * (watchRadius * 0.85),
          0
        );
        lugGrad.addColorStop(0, "#e2e8f0");
        lugGrad.addColorStop(0.4, "#94a3b8");
        lugGrad.addColorStop(0.8, "#475569");
        lugGrad.addColorStop(1, "#1e293b");
        ctx.fillStyle = lugGrad;
        ctx.fill();

        // Polished chamfer edge
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      };

      drawLug(-1, -1);
      drawLug(1, -1);
      drawLug(-1, 1);
      drawLug(1, 1);

      // 3. BARANIL COGNAC / NAVY LEATHER STRAP EXTENSIONS (Top & Bottom)
      const strapGrad = ctx.createLinearGradient(-watchRadius * 0.45, 0, watchRadius * 0.45, 0);
      strapGrad.addColorStop(0, "#101e36");
      strapGrad.addColorStop(0.3, "#1b335a");
      strapGrad.addColorStop(0.7, "#152847");
      strapGrad.addColorStop(1, "#0c1729");

      // Top strap
      ctx.fillStyle = strapGrad;
      ctx.beginPath();
      ctx.rect(-watchRadius * 0.45, -watchRadius * 1.35, watchRadius * 0.9, watchRadius * 0.55);
      ctx.fill();

      // Bottom strap
      ctx.beginPath();
      ctx.rect(-watchRadius * 0.45, watchRadius * 0.8, watchRadius * 0.9, watchRadius * 0.55);
      ctx.fill();

      // Strap edge saddle stitching
      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(-watchRadius * 0.42, -watchRadius * 1.35);
      ctx.lineTo(-watchRadius * 0.42, -watchRadius * 0.8);
      ctx.moveTo(watchRadius * 0.42, -watchRadius * 1.35);
      ctx.lineTo(watchRadius * 0.42, -watchRadius * 0.8);
      ctx.moveTo(-watchRadius * 0.42, watchRadius * 0.8);
      ctx.lineTo(-watchRadius * 0.42, watchRadius * 1.35);
      ctx.moveTo(watchRadius * 0.42, watchRadius * 0.8);
      ctx.lineTo(watchRadius * 0.42, watchRadius * 1.35);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. WATCH BEZEL: 316L Stainless Steel 39mm ring with coin-edge & chamfers
      const bezelGrad = ctx.createConicGradient(Math.PI * 0.25, 0, 0);
      bezelGrad.addColorStop(0.0, "#f8fafc");
      bezelGrad.addColorStop(0.15, "#94a3b8");
      bezelGrad.addColorStop(0.3, "#334155");
      bezelGrad.addColorStop(0.5, "#cbd5e1");
      bezelGrad.addColorStop(0.65, "#475569");
      bezelGrad.addColorStop(0.85, "#f1f5f9");
      bezelGrad.addColorStop(1.0, "#94a3b8");

      ctx.fillStyle = bezelGrad;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 1.04, 0, Math.PI * 2);
      ctx.fill();

      // Outer bezel polished rim
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner bezel step
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // 5. BLUE DE PARIS GALVANIC SUNBURST DIAL
      const dialGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, watchRadius * 0.92);
      dialGrad.addColorStop(0.0, "#2563eb"); // Vivid cobalt center
      dialGrad.addColorStop(0.35, "#1d4ed8");
      dialGrad.addColorStop(0.65, "#1e3a8a");
      dialGrad.addColorStop(0.9, "#0f1e36"); // Deep Parisian midnight edge
      dialGrad.addColorStop(1.0, "#080e1a");

      ctx.fillStyle = dialGrad;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.92, 0, Math.PI * 2);
      ctx.fill();

      // 6. MICRO SUNBURST RADIAL TEXTURE (Rotational lines)
      ctx.save();
      const numRays = 180;
      for (let r = 0; r < numRays; r++) {
        const rayAngle = (r / numRays) * Math.PI * 2;
        const alpha = Math.abs(Math.sin(rayAngle * 2 + 0.4)) * 0.12;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rayAngle) * watchRadius * 0.92, Math.sin(rayAngle) * watchRadius * 0.92);
        ctx.stroke();
      }
      ctx.restore();

      // 7. RAILWAY TRACK & MINUTE TICKS
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.85, 0, Math.PI * 2);
      ctx.arc(0, 0, watchRadius * 0.81, 0, Math.PI * 2);
      ctx.stroke();

      for (let m = 0; m < 60; m++) {
        const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
        const isHour = m % 5 === 0;
        const outerR = watchRadius * 0.85;
        const innerR = isHour ? watchRadius * 0.77 : watchRadius * 0.81;

        ctx.strokeStyle = isHour ? "rgba(255, 255, 255, 0.85)" : "rgba(212, 175, 55, 0.35)";
        ctx.lineWidth = isHour ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
        ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
        ctx.stroke();
      }

      // 8. APPLIED FACETED RHODIUM HOUR MARKERS (3D Chamfered batons)
      for (let h = 1; h <= 12; h++) {
        const hAngle = (h / 12) * Math.PI * 2 - Math.PI / 2;
        ctx.save();
        ctx.rotate(hAngle);

        const markerDist = watchRadius * 0.68;
        const mLength = h % 3 === 0 ? watchRadius * 0.18 : watchRadius * 0.14;
        const mWidth = h % 3 === 0 ? 5.5 : 4;

        // Marker drop shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(markerDist - 1, -mWidth / 2 + 1, mLength, mWidth);

        // Marker body (rhodium gradient)
        const markerGrad = ctx.createLinearGradient(markerDist, -mWidth / 2, markerDist + mLength, mWidth / 2);
        markerGrad.addColorStop(0, "#ffffff");
        markerGrad.addColorStop(0.5, "#cbd5e1");
        markerGrad.addColorStop(1, "#64748b");

        ctx.fillStyle = markerGrad;
        ctx.beginPath();
        ctx.moveTo(markerDist, -mWidth / 2);
        ctx.lineTo(markerDist + mLength, -mWidth / 3);
        ctx.lineTo(markerDist + mLength, mWidth / 3);
        ctx.lineTo(markerDist, mWidth / 2);
        ctx.closePath();
        ctx.fill();

        // 12 o'clock double index
        if (h === 12) {
          ctx.beginPath();
          ctx.moveTo(markerDist, -mWidth - 2);
          ctx.lineTo(markerDist + mLength, -mWidth - 2);
          ctx.lineTo(markerDist + mLength, -2);
          ctx.lineTo(markerDist, -2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      // 9. DIAL TYPOGRAPHY & CHRONOMÈTRE MARKINGS
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // VÉRAN brand mark
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = `300 ${Math.round(watchRadius * 0.088)}px var(--font-serif), Georgia, serif`;
      ctx.fillText("VÉRAN", 0, -watchRadius * 0.38);

      // PARIS
      ctx.fillStyle = "rgba(212, 175, 55, 0.75)";
      ctx.font = `500 ${Math.round(watchRadius * 0.035)}px var(--font-sans), sans-serif`;
      ctx.fillText("PARIS", 0, -watchRadius * 0.28);

      // CHRONOMÈTRE / GLASHÜTTE CALIBRE
      ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
      ctx.font = `400 ${Math.round(watchRadius * 0.032)}px var(--font-sans), sans-serif`;
      ctx.fillText("CHRONOMÈTRE", 0, watchRadius * 0.34);
      ctx.fillText("52H POWER RESERVE", 0, watchRadius * 0.42);

      // MADE IN PARIS at 6 o'clock
      ctx.font = `400 ${Math.round(watchRadius * 0.024)}px var(--font-sans), sans-serif`;
      ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
      ctx.fillText("FABRIQUÉ À PARIS", 0, watchRadius * 0.76);

      // 10. WATCH HANDS: Faceted Dauphine Hour & Minute Hands, Heat-Blued Seconds
      const timeHours = 10;
      const timeMinutes = 10;
      const timeSeconds = 38 + t * 6; // subtle ticking progression

      const hourAngle = ((timeHours % 12) + timeMinutes / 60) * (Math.PI / 6) - Math.PI / 2;
      const minuteAngle = (timeMinutes + timeSeconds / 60) * (Math.PI / 30) - Math.PI / 2;
      const secondAngle = timeSeconds * (Math.PI / 30) - Math.PI / 2;

      // Draw Hour Hand
      ctx.save();
      ctx.rotate(hourAngle);
      const hLength = watchRadius * 0.52;
      const hWidth = watchRadius * 0.055;

      // Hand shadow
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.beginPath();
      ctx.moveTo(3, -hWidth * 0.6);
      ctx.lineTo(hLength + 4, 0);
      ctx.lineTo(3, hWidth * 0.6);
      ctx.closePath();
      ctx.fill();

      // Top faceted half (mirror light)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(hLength, 0);
      ctx.lineTo(0, -hWidth);
      ctx.closePath();
      ctx.fill();

      // Bottom faceted half (shaded rhodium)
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(hLength, 0);
      ctx.lineTo(0, hWidth);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Minute Hand
      ctx.save();
      ctx.rotate(minuteAngle);
      const mLength = watchRadius * 0.78;
      const mHandWidth = watchRadius * 0.045;

      // Hand shadow
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.beginPath();
      ctx.moveTo(4, -mHandWidth * 0.6);
      ctx.lineTo(mLength + 5, 0);
      ctx.lineTo(4, mHandWidth * 0.6);
      ctx.closePath();
      ctx.fill();

      // Light side
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(mLength, 0);
      ctx.lineTo(0, -mHandWidth);
      ctx.closePath();
      ctx.fill();

      // Shadow side
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(mLength, 0);
      ctx.lineTo(0, mHandWidth);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Flame-Blued Needle Seconds Hand
      ctx.save();
      ctx.rotate(secondAngle);
      const sLength = watchRadius * 0.82;
      const sTail = watchRadius * 0.22;

      ctx.strokeStyle = "#38bdf8"; // Vibrant thermal-blued steel
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-sTail, 0);
      ctx.lineTo(sLength, 0);
      ctx.stroke();

      // Counterweight circular teardrop
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.arc(-sTail * 0.65, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Center Pinion & Cannon Pinion Cap
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.038, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.016, 0, Math.PI * 2);
      ctx.fill();

      // 11. SAPPHIRE CRYSTAL SPECULAR ARCS & LIGHT SWEEP
      ctx.save();
      const sweepX = (t - 0.7) * 2.5 * watchRadius;
      const crystalGrad = ctx.createLinearGradient(
        -watchRadius + sweepX,
        -watchRadius,
        watchRadius + sweepX,
        watchRadius
      );
      crystalGrad.addColorStop(0.0, "rgba(255, 255, 255, 0)");
      crystalGrad.addColorStop(0.48, "rgba(255, 255, 255, 0.02)");
      crystalGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.38)");
      crystalGrad.addColorStop(0.52, "rgba(255, 255, 255, 0.04)");
      crystalGrad.addColorStop(1.0, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = crystalGrad;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.94, 0, Math.PI * 2);
      ctx.fill();

      // Edge box-sapphire refraction rim
      ctx.strokeStyle = "rgba(186, 230, 253, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, watchRadius * 0.92, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // macro dial
    }

    return offscreen;
  };

  // Pre-render the 80 cinematic frames into cache for 0-stutter performance
  useEffect(() => {
    let isCancelled = false;

    const buildCache = async () => {
      const targetWidth = 1440;
      const targetHeight = 900;
      const frames: HTMLCanvasElement[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (isCancelled) return;
        const frame = renderFrameToCanvas(i, targetWidth, targetHeight);
        frames.push(frame);

        if (i % 8 === 0 || i === totalFrames - 1) {
          setLoadProgress(Math.round(((i + 1) / totalFrames) * 100));
          // Yield to main thread to avoid frame hitching
          await new Promise((resolve) => setTimeout(resolve, 8));
        }
      }

      framesCacheRef.current = frames;
      setLoaded(true);

      // Initial draw on canvas
      if (canvasRef.current && frames[0]) {
        const mainCtx = canvasRef.current.getContext("2d");
        if (mainCtx) {
          mainCtx.drawImage(frames[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };

    buildCache();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Synchronize canvas scrub with GSAP ScrollTrigger
  useEffect(() => {
    if (!loaded || !containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI resize
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // GSAP ScrollTrigger pinning and sequence scrubbing
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=350%",
      pin: true,
      scrub: 0.35, // Buttery smooth easing on Lenis scrub
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(progress * totalFrames)
        );

        // Sound trigger for hotel bell chime at t: ~0.56
        if (progress >= 0.55 && progress <= 0.65) {
          if (!bellRungRef.current) {
            bellRungRef.current = true;
            soundManager.playConciergeBell();
          }
        } else if (progress < 0.45 || progress > 0.75) {
          bellRungRef.current = false;
        }

        // Narrative status updates
        if (progress < 0.28) {
          setCurrentNarrative("Paris, Place Vendôme · Grand Hôtel Entrance");
        } else if (progress < 0.52) {
          setCurrentNarrative("Approaching Concierge Desk · Heritage Leather Duffle");
        } else if (progress < 0.70) {
          setCurrentNarrative("Ringing the Service Bell · The Wrist Reveal");
        } else if (progress < 0.88) {
          setCurrentNarrative("Macro Transition · Steel 39mm Bezel & Domed Sapphire");
        } else {
          setCurrentNarrative("Full Focus · LE VOYAGEUR Chronomètre");
        }

        // Draw cached frame
        const cachedFrame = framesCacheRef.current[frameIndex];
        if (cachedFrame) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(cachedFrame, 0, 0, canvas.width, canvas.height);
        }

        // Text reveal when dial reaches full focus
        if (textRef.current && subtextRef.current) {
          if (progress > 0.75) {
            const textAlpha = Math.min(1, (progress - 0.75) / 0.18);
            const textY = (1 - textAlpha) * 40;
            textRef.current.style.opacity = `${textAlpha}`;
            textRef.current.style.transform = `translateY(${textY}px)`;
            subtextRef.current.style.opacity = `${textAlpha}`;
            subtextRef.current.style.transform = `translateY(${textY * 0.7}px)`;
          } else {
            textRef.current.style.opacity = "0";
            subtextRef.current.style.opacity = "0";
          }
        }

        // Fade out indicator on scroll
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = `${Math.max(0, 1 - progress * 4)}`;
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loaded]);

  const handleSkipToWatch = () => {
    const el = document.getElementById("product-breakdown");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0b0c0e] overflow-hidden select-none">
      {/* Loading overlay with Haute Horlogerie styling */}
      {!loaded && (
        <div className="absolute inset-0 z-40 bg-[#0b0c0e] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full border border-white/10 border-t-[#d4af37] animate-spin mb-6" />
          <h2 className="font-serif text-2xl tracking-[0.3em] text-white uppercase mb-2">VÉRAN</h2>
          <p className="text-[11px] tracking-[0.25em] text-zinc-400 uppercase mb-4">
            Loading Optical Sequence · {loadProgress}%
          </p>
          <div className="w-48 h-0.5 bg-zinc-800 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Zero-stutter HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Atmospheric vignette overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-[#0b0c0e]/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0c0e]/50 via-transparent to-[#0b0c0e]/50" />

      {/* Cinematic Scrollytelling Narrative Pill */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500">
        <div className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center space-x-3 text-[10px] md:text-xs tracking-[0.22em] uppercase text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span>{currentNarrative}</span>
        </div>
      </div>

      {/* Massive Bold Typography Overlay: "LE VOYAGEUR" */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div
          ref={textRef}
          style={{ opacity: 0, transform: "translateY(40px)" }}
          className="transition-all duration-300 ease-out"
        >
          <span className="text-[11px] md:text-xs uppercase tracking-[0.45em] text-[#d4af37] font-medium block mb-3 drop-shadow">
            VÉRAN ATELIER · PARIS
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] uppercase font-light text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            LE VOYAGEUR
          </h1>
        </div>

        <div
          ref={subtextRef}
          style={{ opacity: 0, transform: "translateY(30px)" }}
          className="mt-6 flex flex-col items-center space-y-4 transition-all duration-300 ease-out pointer-events-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-300 max-w-xl font-light">
            Steel 39 mm · Hand-Wound Manufacture Calibre · €9,800
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={handleSkipToWatch}
              className="px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] bg-[#d4af37] text-black font-semibold hover:bg-[#f3e5ab] transition-colors cursor-pointer shadow-lg"
            >
              Explore Timepiece
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-zinc-400 space-y-2 pointer-events-auto cursor-pointer"
        onClick={handleSkipToWatch}
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-zinc-400 hover:text-white transition-colors">
          Scroll to discover narrative
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

