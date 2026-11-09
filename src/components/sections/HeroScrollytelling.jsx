"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/audio";
import { Watch3DInteractive } from "./Watch3DInteractive";
// Register ScrollTrigger globally on client
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
export function HeroScrollytelling() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);
    // 3D watch states in Hero
    const [activeDial, setActiveDial] = useState("blue");
    const [activeViewMode, setActiveViewMode] = useState("wrist");
    // Micro Telemetry states
    const [telemetryTime, setTelemetryTime] = useState("00:01");
    const [telemetryLabel, setTelemetryLabel] = useState("THE FIRST STEPS");
    const [scrubProgress, setScrubProgress] = useState(0);
    const bellRungRef = useRef(false);
    const rafIdRef = useRef(null);
    const progressRef = useRef(0);
    // Direct, ultra-fast 2D canvas scene renderer (executes in < 0.5ms per frame)
    const drawScene = useCallback((ctx, progress, width, height) => {
        const t = Math.max(0, Math.min(1, progress));
        ctx.clearRect(0, 0, width, height);
        // Monochromatic dark backdrop with rich cinematic lighting transitions
        const bgGrad = ctx.createRadialGradient(width * 0.5, height * (0.35 + t * 0.15), width * 0.05, width * 0.5, height * 0.5, width * 0.95);
        if (t < 0.55) {
            bgGrad.addColorStop(0, "#2c241c"); // Warm Paris dusk glow
            bgGrad.addColorStop(0.35, "#171411");
            bgGrad.addColorStop(0.7, "#0c0a09");
            bgGrad.addColorStop(1, "#040404");
        }
        else if (t < 0.75) {
            bgGrad.addColorStop(0, "#1a212d"); // Terrace overcast slate
            bgGrad.addColorStop(0.5, "#0d1017");
            bgGrad.addColorStop(1, "#030406");
        }
        else {
            bgGrad.addColorStop(0, "#101d33"); // Deep sapphire studio vignette
            bgGrad.addColorStop(0.5, "#080c14");
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
            // Classical Parisian Hotel Haussmann facade (limestone with warm ambient lighting)
            const facadeGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
            facadeGrad.addColorStop(0, "#2c2723");
            facadeGrad.addColorStop(0.5, "#201c19");
            facadeGrad.addColorStop(1, "#151311");
            ctx.fillStyle = facadeGrad;
            ctx.fillRect(0, 0, width, height * 0.72);
            // Ashlar limestone block grooves
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 1;
            for (let y = height * 0.08; y < height * 0.72; y += 38) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            // Upper floor French Windows with warm glowing chandeliers
            const winW = width * 0.1;
            const winH = height * 0.18;
            const winY = height * 0.12;
            const windowXs = [width * 0.14, width * 0.32, width * 0.68, width * 0.86];
            windowXs.forEach((wx) => {
                // Warm interior light
                const winLight = ctx.createRadialGradient(wx, winY + winH * 0.5, 5, wx, winY + winH * 0.5, winW * 0.8);
                winLight.addColorStop(0, "rgba(254, 240, 138, 0.85)");
                winLight.addColorStop(0.6, "rgba(234, 179, 8, 0.45)");
                winLight.addColorStop(1, "rgba(20, 15, 10, 0.9)");
                ctx.fillStyle = winLight;
                ctx.beginPath();
                ctx.roundRect(wx - winW / 2, winY, winW, winH, [10, 10, 0, 0]);
                ctx.fill();
                // Black mullion bars
                ctx.strokeStyle = "#09090b";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(wx, winY);
                ctx.lineTo(wx, winY + winH);
                ctx.moveTo(wx - winW / 2, winY + winH * 0.5);
                ctx.lineTo(wx + winW / 2, winY + winH * 0.5);
                ctx.stroke();
                // Ornate balcony railing
                ctx.strokeStyle = "#18181b";
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(wx - winW * 0.65, winY + winH);
                ctx.lineTo(wx + winW * 0.65, winY + winH);
                ctx.moveTo(wx - winW * 0.65, winY + winH - 16);
                ctx.lineTo(wx + winW * 0.65, winY + winH - 16);
                ctx.stroke();
            });
            // Grand Parisian Arched Carriage Entrance
            const archW = Math.max(280, width * 0.36);
            const archH = height * 0.54;
            const archX = width * 0.5 - archW / 2;
            const archY = height * 0.18;
            // Molded Stone Arch Surround
            ctx.fillStyle = "#1e1a17";
            ctx.beginPath();
            ctx.moveTo(archX - 16, archY + archH);
            ctx.lineTo(archX - 16, archY + archW / 2);
            ctx.bezierCurveTo(archX - 16, archY - 20, archX + archW + 16, archY - 20, archX + archW + 16, archY + archW / 2);
            ctx.lineTo(archX + archW + 16, archY + archH);
            ctx.closePath();
            ctx.fill();
            // Arch Interior (Luminous Grand Lobby Portal)
            ctx.fillStyle = "#0a0806";
            ctx.beginPath();
            ctx.moveTo(archX, archY + archH);
            ctx.lineTo(archX, archY + archW / 2);
            ctx.bezierCurveTo(archX, archY, archX + archW, archY, archX + archW, archY + archW / 2);
            ctx.lineTo(archX + archW, archY + archH);
            ctx.closePath();
            ctx.fill();
            // Warm interior lobby glow pouring onto street
            const portalGlow = ctx.createRadialGradient(width * 0.5, archY + archH * 0.55, 20, width * 0.5, archY + archH * 0.55, archW * 0.85);
            portalGlow.addColorStop(0, "rgba(254, 240, 138, 0.45)");
            portalGlow.addColorStop(0.4, "rgba(234, 179, 8, 0.22)");
            portalGlow.addColorStop(0.8, "rgba(180, 83, 9, 0.08)");
            portalGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = portalGlow;
            ctx.fill();
            // Hotel Signage above Entrance
            ctx.save();
            ctx.fillStyle = "#d4af37";
            ctx.font = "bold 13px serif";
            ctx.textAlign = "center";
            ctx.letterSpacing = "6px";
            ctx.fillText("HÔTEL DE VÉRAN · PARIS", width * 0.5, archY - 30);
            ctx.restore();
            // Parisian Brass Carriage Lanterns flanking entrance
            [-1, 1].forEach((dir) => {
                const lampX = width * 0.5 + dir * (archW / 2 + 28);
                const lampY = archY + archH * 0.45;
                // Lantern radial warm glow
                const lampGlow = ctx.createRadialGradient(lampX, lampY, 3, lampX, lampY, 110);
                lampGlow.addColorStop(0, "rgba(254, 240, 138, 0.7)");
                lampGlow.addColorStop(0.3, "rgba(234, 179, 8, 0.3)");
                lampGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = lampGlow;
                ctx.beginPath();
                ctx.arc(lampX, lampY, 110, 0, Math.PI * 2);
                ctx.fill();
                // Brass lamp housing
                ctx.fillStyle = "#d4af37";
                ctx.fillRect(lampX - 7, lampY - 14, 14, 28);
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(lampX - 3, lampY - 10, 6, 20);
            });
            // Cobblestone street with warm lighting reflection
            const streetGrad = ctx.createLinearGradient(0, height * 0.72, 0, height);
            streetGrad.addColorStop(0, "#161311");
            streetGrad.addColorStop(1, "#070605");
            ctx.fillStyle = streetGrad;
            ctx.fillRect(0, height * 0.72, width, height * 0.28);
            // Cobblestone reflection pool under doorway
            const streetReflection = ctx.createRadialGradient(width * 0.5, height * 0.78, 10, width * 0.5, height * 0.78, archW * 0.8);
            streetReflection.addColorStop(0, "rgba(234, 179, 8, 0.18)");
            streetReflection.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = streetReflection;
            ctx.beginPath();
            ctx.ellipse(width * 0.5, height * 0.78, archW * 0.75, 45, 0, 0, Math.PI * 2);
            ctx.fill();
            // Sharp-dressed traveler walking towards hotel
            const walkProgress = Math.min(1, t / 0.35);
            const travelerScale = 0.85 + walkProgress * 0.45;
            const travelerX = width * (0.42 + walkProgress * 0.08);
            const travelerY = height * (0.72 + walkProgress * 0.05);
            ctx.save();
            ctx.translate(travelerX, travelerY);
            ctx.scale(travelerScale, travelerScale);
            // Ground contact shadow
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.beginPath();
            ctx.ellipse(0, 10, 85, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            // Tailored Charcoal Overcoat
            const coatGrad = ctx.createLinearGradient(-40, -200, 40, 0);
            coatGrad.addColorStop(0, "#2d333b");
            coatGrad.addColorStop(0.5, "#1c2128");
            coatGrad.addColorStop(1, "#0f1217");
            ctx.fillStyle = coatGrad;
            ctx.beginPath();
            ctx.moveTo(-32, -150);
            ctx.bezierCurveTo(-40, -110, -48, -40, -50, 0);
            ctx.lineTo(40, 0);
            ctx.bezierCurveTo(36, -40, 32, -110, 24, -150);
            ctx.closePath();
            ctx.fill();
            // Rim lighting on coat from hotel lanterns
            ctx.strokeStyle = "rgba(254, 240, 138, 0.35)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-32, -150);
            ctx.bezierCurveTo(-40, -110, -48, -40, -50, 0);
            ctx.stroke();
            // Head silhouette in cashmere collar
            ctx.fillStyle = "#1e232a";
            ctx.beginPath();
            ctx.arc(-4, -180, 22, 0, Math.PI * 2);
            ctx.fill();
            // Left Arm & Wrist Watch Reveal
            ctx.save();
            ctx.translate(28, -60);
            // Cashmere cuff
            ctx.fillStyle = "#181a1f";
            ctx.fillRect(-6, -10, 12, 24);
            // Steel watch case glint on wrist
            ctx.fillStyle = "#e2e8f0";
            ctx.beginPath();
            ctx.arc(0, 8, 8, 0, Math.PI * 2);
            ctx.fill();
            // Blue dial glint
            ctx.fillStyle = "#1d4ed8";
            ctx.beginPath();
            ctx.arc(0, 8, 6, 0, Math.PI * 2);
            ctx.fill();
            // Specular glint
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(-2, 6, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            // Luxury Cognac Patina Leather Weekend Bag in Hand
            ctx.save();
            ctx.translate(-58, -35);
            const bagGrad = ctx.createLinearGradient(-35, -20, 35, 20);
            bagGrad.addColorStop(0, "#b45309"); // Rich cognac leather
            bagGrad.addColorStop(0.4, "#92400e");
            bagGrad.addColorStop(0.8, "#78350f");
            bagGrad.addColorStop(1, "#451a03");
            ctx.fillStyle = bagGrad;
            ctx.beginPath();
            ctx.roundRect(-34, -20, 68, 42, [12, 12, 16, 16]);
            ctx.fill();
            // Saddle stitching
            ctx.strokeStyle = "rgba(254, 215, 170, 0.8)";
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
            // Brass buckles & leather straps
            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(-22, -18, 4, 38);
            ctx.fillRect(18, -18, 4, 38);
            // Brass rivets
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(-20, -14, 2, 0, Math.PI * 2);
            ctx.arc(20, -14, 2, 0, Math.PI * 2);
            ctx.fill();
            // Rolled leather handle
            ctx.strokeStyle = "#5a270b";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, -22, 15, Math.PI, 0);
            ctx.stroke();
            ctx.restore(); // bag
            ctx.restore(); // traveler
            ctx.restore(); // act 1
        }
        // -------------------------------------------------------------
        // ACT 2: CONCIERGE DESK, BRASS BELL & WRIST WATCH (t: 0.20 - 0.72)
        // -------------------------------------------------------------
        if (t >= 0.20 && t < 0.72) {
            const act2Alpha = Math.min(1, (t - 0.20) / 0.12) * Math.max(0, 1 - (t - 0.58) / 0.14);
            ctx.save();
            ctx.globalAlpha = act2Alpha;
            // Polished Mahogany Reception Counter
            const deskY = height * 0.68;
            const deskGrad = ctx.createLinearGradient(0, deskY, 0, height);
            deskGrad.addColorStop(0, "#2c150c");
            deskGrad.addColorStop(0.2, "#1d0e08");
            deskGrad.addColorStop(1, "#0d0603");
            ctx.fillStyle = deskGrad;
            ctx.fillRect(0, deskY, width, height - deskY);
            // Polished Brass trim on counter edge
            const trimGrad = ctx.createLinearGradient(0, deskY, width, deskY);
            trimGrad.addColorStop(0, "#854d0e");
            trimGrad.addColorStop(0.5, "#fef08a");
            trimGrad.addColorStop(1, "#854d0e");
            ctx.fillStyle = trimGrad;
            ctx.fillRect(0, deskY, width, 4);
            // Patina leather weekend bag placed on reception counter
            ctx.save();
            const deskBagX = width * 0.35;
            const deskBagY = deskY - 45;
            ctx.translate(deskBagX, deskBagY);
            const bagDeskGrad = ctx.createLinearGradient(-75, -45, 75, 45);
            bagDeskGrad.addColorStop(0, "#b45309");
            bagDeskGrad.addColorStop(0.4, "#92400e");
            bagDeskGrad.addColorStop(0.8, "#78350f");
            bagDeskGrad.addColorStop(1, "#451a03");
            ctx.fillStyle = bagDeskGrad;
            ctx.beginPath();
            ctx.roundRect(-80, -45, 160, 90, 20);
            ctx.fill();
            // Brass buckles & strap bands
            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(-50, -42, 6, 84);
            ctx.fillRect(44, -42, 6, 84);
            // Leather luggage tag with "VÉRAN - PARIS"
            ctx.save();
            ctx.translate(20, -10);
            ctx.rotate(0.2);
            ctx.fillStyle = "#fef3c7";
            ctx.roundRect(-15, -25, 30, 50, 4);
            ctx.fill();
            ctx.fillStyle = "#78350f";
            ctx.font = "bold 6px sans-serif";
            ctx.fillText("VÉRAN", -10, 0);
            ctx.restore();
            ctx.restore(); // bag on desk
            // Solid Polished Brass Concierge Bell
            const bellX = width * 0.64;
            const bellY = deskY - 32;
            ctx.save();
            ctx.translate(bellX, bellY);
            // Bell base shadow
            ctx.fillStyle = "rgba(0,0,0,0.65)";
            ctx.beginPath();
            ctx.ellipse(0, 22, 45, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            // Bell Brass Flange
            ctx.fillStyle = "#92400e";
            ctx.beginPath();
            ctx.roundRect(-36, 12, 72, 14, 4);
            ctx.fill();
            // Bell Domed Clapper Body
            const bellGrad = ctx.createRadialGradient(-10, -6, 2, 0, 6, 40);
            bellGrad.addColorStop(0, "#ffffff");
            bellGrad.addColorStop(0.25, "#fef08a");
            bellGrad.addColorStop(0.65, "#eab308");
            bellGrad.addColorStop(1, "#78350f");
            ctx.fillStyle = bellGrad;
            ctx.beginPath();
            ctx.moveTo(-34, 12);
            ctx.bezierCurveTo(-34, -22, 34, -22, 34, 12);
            ctx.closePath();
            ctx.fill();
            // Top Brass Push Button
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.roundRect(-5, -30, 10, 10, 3);
            ctx.fill();
            // Sound waves when bell rings
            if (t >= 0.45 && t <= 0.60) {
                ctx.strokeStyle = "rgba(254, 240, 138, 0.4)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(0, -25, 25, -Math.PI * 0.8, -Math.PI * 0.2);
                ctx.arc(0, -25, 40, -Math.PI * 0.8, -Math.PI * 0.2);
                ctx.stroke();
            }
            ctx.restore(); // bell
            // Traveler's Hand Reaching to Ring the Bell, Revealing Watch on Wrist
            ctx.save();
            const handX = bellX - 45;
            const handY = bellY - 15;
            ctx.translate(handX, handY);
            // Charcoal suit cuff
            ctx.fillStyle = "#1e2328";
            ctx.beginPath();
            ctx.roundRect(-70, -20, 65, 40, 6);
            ctx.fill();
            // White bespoke shirt cuff
            ctx.fillStyle = "#f8fafc";
            ctx.fillRect(-12, -18, 12, 36);
            // Stainless Steel Watch on Wrist: Ultra-visible Blue Dial
            ctx.save();
            ctx.translate(-42, 0);
            // 316L Stainless Steel Case
            const wristCaseGrad = ctx.createLinearGradient(-18, -18, 18, 18);
            wristCaseGrad.addColorStop(0, "#f8fafc");
            wristCaseGrad.addColorStop(0.5, "#cbd5e1");
            wristCaseGrad.addColorStop(1, "#64748b");
            ctx.fillStyle = wristCaseGrad;
            ctx.beginPath();
            ctx.arc(0, 0, 19, 0, Math.PI * 2);
            ctx.fill();
            // Bleu de Paris sunburst dial
            const wristDialGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 15);
            wristDialGrad.addColorStop(0, "#60a5fa");
            wristDialGrad.addColorStop(0.5, "#1d4ed8");
            wristDialGrad.addColorStop(1, "#0f172a");
            ctx.fillStyle = wristDialGrad;
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            // Rhodium faceted hands
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -10);
            ctx.moveTo(0, 0);
            ctx.lineTo(7, 3);
            ctx.stroke();
            ctx.restore(); // wrist watch
            // Hand fingers reaching toward bell button
            ctx.fillStyle = "#d1a080"; // Natural skin tone
            ctx.beginPath();
            ctx.roundRect(0, -14, 40, 28, [10, 14, 14, 10]);
            ctx.fill();
            ctx.restore(); // hand reaching
            ctx.restore(); // act 2
        }
        // -------------------------------------------------------------
        // ACT 3: PARISIAN TERRACE SUITE, BALCONY & BAG (t: 0.45 - 0.88)
        // -------------------------------------------------------------
        if (t >= 0.45 && t < 0.88) {
            const act3Alpha = Math.min(1, (t - 0.45) / 0.12) * Math.max(0, 1 - (t - 0.74) / 0.14);
            ctx.save();
            ctx.globalAlpha = act3Alpha;
            // Parisian Overcast Morning Sky
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
            skyGrad.addColorStop(0, "#1e293b");
            skyGrad.addColorStop(0.5, "#0f172a");
            skyGrad.addColorStop(1, "#020617");
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height * 0.6);
            // Distant Haussmann Mansard Zinc Rooflines & Chimney pots
            ctx.fillStyle = "#1e293b";
            ctx.beginPath();
            ctx.moveTo(0, height * 0.42);
            ctx.lineTo(width * 0.18, height * 0.35);
            ctx.lineTo(width * 0.32, height * 0.40);
            ctx.lineTo(width * 0.55, height * 0.32);
            ctx.lineTo(width * 0.78, height * 0.38);
            ctx.lineTo(width, height * 0.34);
            ctx.lineTo(width, height * 0.6);
            ctx.lineTo(0, height * 0.6);
            ctx.closePath();
            ctx.fill();
            // French Balcony Wrought-Iron Railing
            const railY = height * 0.54;
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, railY);
            ctx.lineTo(width, railY);
            ctx.moveTo(0, railY + 60);
            ctx.lineTo(width, railY + 60);
            ctx.stroke();
            // Terrace Marble Bistro Table
            const tableGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
            tableGrad.addColorStop(0, "#cbd5e1");
            tableGrad.addColorStop(0.3, "#94a3b8");
            tableGrad.addColorStop(1, "#1e293b");
            ctx.fillStyle = tableGrad;
            ctx.fillRect(0, height * 0.65, width, height * 0.35);
            // Zooming in dynamically toward the leather weekend bag on terrace
            const zoomProg = (t - 0.45) / 0.35;
            const bagScale = 1 + zoomProg * 1.5;
            const bagX = width * 0.5;
            const bagY = height * 0.75;
            ctx.save();
            ctx.translate(bagX, bagY);
            ctx.scale(bagScale, bagScale);
            // Rich Patina Leather Duffle Bag resting on table
            const duffleGrad = ctx.createLinearGradient(-110, -60, 110, 60);
            duffleGrad.addColorStop(0, "#b45309");
            duffleGrad.addColorStop(0.35, "#92400e");
            duffleGrad.addColorStop(0.75, "#78350f");
            duffleGrad.addColorStop(1, "#451a03");
            ctx.fillStyle = duffleGrad;
            ctx.beginPath();
            ctx.roundRect(-120, -60, 240, 120, 25);
            ctx.fill();
            // Saddle stitching
            ctx.strokeStyle = "rgba(254, 215, 170, 0.7)";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
            // Watch resting on the leather bag!
            ctx.save();
            ctx.translate(15, -15);
            // Watch strap
            ctx.fillStyle = "#1e3a8a";
            ctx.fillRect(-12, -45, 24, 90);
            // Steel Case
            ctx.fillStyle = "#e2e8f0";
            ctx.beginPath();
            ctx.arc(0, 0, 26, 0, Math.PI * 2);
            ctx.fill();
            // Blue Dial
            ctx.fillStyle = "#1d4ed8";
            ctx.beginPath();
            ctx.arc(0, 0, 21, 0, Math.PI * 2);
            ctx.fill();
            // Specular glint
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(-4, -4, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.restore(); // bag
            ctx.restore(); // act 3
        }
        // -------------------------------------------------------------
        // ACT 4: ULTRA-SHARP MACRO CLOSE-UP OF THE WATCH DIAL (t: 0.65 - 1.0)
        // -------------------------------------------------------------
        if (t >= 0.62) {
            const act4Alpha = Math.min(1, (t - 0.62) / 0.16);
            ctx.save();
            ctx.globalAlpha = act4Alpha;
            // Macro camera zoom transition
            const macroProg = (t - 0.62) / 0.38;
            const cx = width * 0.5;
            const cy = height * 0.5;
            const maxR = Math.min(width, height) * 0.36;
            const dialR = maxR * (0.8 + macroProg * 0.2);
            // Vintage Patina Leather texture underneath watch
            const leatherBgGrad = ctx.createRadialGradient(cx, cy, dialR * 0.8, cx, cy, width * 0.8);
            leatherBgGrad.addColorStop(0, "#451a03");
            leatherBgGrad.addColorStop(0.5, "#291004");
            leatherBgGrad.addColorStop(1, "#0a0401");
            ctx.fillStyle = leatherBgGrad;
            ctx.fillRect(0, 0, width, height);
            // Hand-stitched saddle thread in background
            ctx.strokeStyle = "rgba(254, 215, 170, 0.4)";
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(0, height * 0.82);
            ctx.bezierCurveTo(width * 0.3, height * 0.78, width * 0.7, height * 0.86, width, height * 0.82);
            ctx.stroke();
            ctx.setLineDash([]);
            // Watch shadow on leather
            ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
            ctx.beginPath();
            ctx.arc(cx + 10, cy + 18, dialR * 1.06, 0, Math.PI * 2);
            ctx.fill();
            ctx.save();
            ctx.translate(cx, cy);
            // 316L Surgical Grade Stainless Steel Case (Step Bezel & Coin Edge)
            const caseGrad = ctx.createRadialGradient(-dialR * 0.3, -dialR * 0.3, 20, 0, 0, dialR * 1.08);
            caseGrad.addColorStop(0, "#ffffff");
            caseGrad.addColorStop(0.2, "#f1f5f9");
            caseGrad.addColorStop(0.45, "#cbd5e1");
            caseGrad.addColorStop(0.7, "#64748b");
            caseGrad.addColorStop(0.9, "#334155");
            caseGrad.addColorStop(1, "#0f172a");
            ctx.fillStyle = caseGrad;
            ctx.beginPath();
            ctx.arc(0, 0, dialR * 1.06, 0, Math.PI * 2);
            ctx.fill();
            // Polished Mirror Chamfer Bezel
            const chamferGrad = ctx.createLinearGradient(-dialR, -dialR, dialR, dialR);
            chamferGrad.addColorStop(0, "rgba(255,255,255,0.95)");
            chamferGrad.addColorStop(0.5, "rgba(100,116,139,0.3)");
            chamferGrad.addColorStop(1, "rgba(255,255,255,0.85)");
            ctx.strokeStyle = chamferGrad;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, dialR * 1.01, 0, Math.PI * 2);
            ctx.stroke();
            // Deep "Bleu de Paris" Sunburst Galvanic Dial Plate
            const dialGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, dialR * 0.98);
            dialGrad.addColorStop(0, "#2563eb"); // Royal twilight blue center
            dialGrad.addColorStop(0.45, "#1d4ed8");
            dialGrad.addColorStop(0.8, "#1e3a8a");
            dialGrad.addColorStop(1, "#090d16"); // Deep midnight perimeter
            ctx.fillStyle = dialGrad;
            ctx.beginPath();
            ctx.arc(0, 0, dialR * 0.98, 0, Math.PI * 2);
            ctx.fill();
            // Galvanic Sunburst Guilloché Rays (36 fine lines)
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 1;
            for (let i = 0; i < 36; i++) {
                const angle = (i * Math.PI) / 18;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * dialR * 0.96, Math.sin(angle) * dialR * 0.96);
                ctx.stroke();
            }
            ctx.restore();
            // Railway Minute Track & 12 Diamond-Faceted Hour Indices
            for (let hIdx = 0; hIdx < 12; hIdx++) {
                const angle = (hIdx * Math.PI) / 6 - Math.PI / 2;
                const outerX = Math.cos(angle) * (dialR * 0.88);
                const outerY = Math.sin(angle) * (dialR * 0.88);
                const innerX = Math.cos(angle) * (dialR * 0.76);
                const innerY = Math.sin(angle) * (dialR * 0.76);
                // Faceted rhodium indices
                ctx.strokeStyle = "#f8fafc";
                ctx.lineWidth = hIdx % 3 === 0 ? 3.5 : 2;
                ctx.beginPath();
                ctx.moveTo(innerX, innerY);
                ctx.lineTo(outerX, outerY);
                ctx.stroke();
            }
            // Sub-seconds dial at 6 o'clock (Petite Seconde)
            const subSecY = dialR * 0.42;
            const subSecR = dialR * 0.24;
            ctx.save();
            ctx.translate(0, subSecY);
            // Snails concentric circular brushing
            const subSecGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, subSecR);
            subSecGrad.addColorStop(0, "#1e3a8a");
            subSecGrad.addColorStop(1, "#0f172a");
            ctx.fillStyle = subSecGrad;
            ctx.beginPath();
            ctx.arc(0, 0, subSecR, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
            ctx.lineWidth = 1;
            ctx.stroke();
            // Sub-seconds hand (ticking smoothly)
            const subSecAngle = (t * Math.PI * 8) - Math.PI / 2;
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(subSecAngle) * subSecR * 0.8, Math.sin(subSecAngle) * subSecR * 0.8);
            ctx.stroke();
            ctx.restore();
            // Brandmark on Dial: "VÉRAN - PARIS"
            ctx.fillStyle = "#ffffff";
            ctx.font = `600 ${Math.max(12, dialR * 0.085)}px sans-serif`;
            ctx.textAlign = "center";
            ctx.letterSpacing = "4px";
            ctx.fillText("VÉRAN", 0, -dialR * 0.38);
            ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
            ctx.font = `400 ${Math.max(8, dialR * 0.045)}px sans-serif`;
            ctx.letterSpacing = "3px";
            ctx.fillText("PARIS", 0, -dialR * 0.28);
            // "CHRONOMÈTRE · GLASHÜTTE" text
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.font = `300 ${Math.max(7, dialR * 0.038)}px sans-serif`;
            ctx.fillText("CHRONOMÈTRE", 0, dialR * 0.12);
            // Flame-blued Feuille (Leaf) Hands
            const hourAngle = (Math.PI * 0.65) - Math.PI / 2;
            const minuteAngle = (Math.PI * 1.85) - Math.PI / 2;
            // Hour Hand
            ctx.save();
            ctx.rotate(hourAngle);
            ctx.fillStyle = "#93c5fd";
            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.bezierCurveTo(-4, dialR * 0.25, -2, dialR * 0.45, 0, dialR * 0.52);
            ctx.bezierCurveTo(2, dialR * 0.45, 4, dialR * 0.25, 3, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            // Minute Hand
            ctx.save();
            ctx.rotate(minuteAngle);
            ctx.fillStyle = "#bfdbfe";
            ctx.beginPath();
            ctx.moveTo(-2.5, 0);
            ctx.bezierCurveTo(-3.5, dialR * 0.35, -2, dialR * 0.7, 0, dialR * 0.78);
            ctx.bezierCurveTo(2, dialR * 0.7, 3.5, dialR * 0.35, 2.5, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            // Center pinion with rhodium cap
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, dialR * 0.04, 0, Math.PI * 2);
            ctx.fill();
            // Double-Domed Sapphire Crystal Glint Arc
            const sapphireGlint = ctx.createLinearGradient(-dialR * 0.8, -dialR * 0.8, dialR * 0.8, dialR * 0.8);
            sapphireGlint.addColorStop(0, "rgba(255, 255, 255, 0.35)");
            sapphireGlint.addColorStop(0.3, "rgba(255, 255, 255, 0.08)");
            sapphireGlint.addColorStop(0.7, "rgba(255, 255, 255, 0)");
            sapphireGlint.addColorStop(1, "rgba(255, 255, 255, 0.15)");
            ctx.fillStyle = sapphireGlint;
            ctx.beginPath();
            ctx.arc(0, 0, dialR * 0.96, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore(); // macro watch
        }
    }, []);
    // Synchronize canvas scrub with GSAP ScrollTrigger
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current)
            return;
        // Explicit plugin registration
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = rect.width > 50 ? rect.width : window.innerWidth;
            const h = rect.height > 50 ? rect.height : window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
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
                id: "hero-trigger",
                trigger: containerRef.current,
                start: "top top",
                end: "+=120%", // Fast, responsive 1.2-viewport scroll sequence (no endless scrolling!)
                pin: true,
                scrub: 0.35,
                onUpdate: (self) => {
                    const progress = self.progress;
                    progressRef.current = progress;
                    setScrubProgress(progress);
                    // Update Micro Telemetry: "00:01 / 00:07 · THE FIRST STEPS"
                    const totalSeconds = 7;
                    const currentSecond = Math.min(totalSeconds, Math.max(1, Math.ceil(progress * totalSeconds)));
                    setTelemetryTime(`00:0${currentSecond}`);
                    if (progress < 0.28) {
                        setTelemetryLabel("THE FIRST STEPS");
                    }
                    else if (progress < 0.52) {
                        setTelemetryLabel("CONCIERGE & BRASS BELL");
                    }
                    else if (progress < 0.74) {
                        setTelemetryLabel("TERRACE & PATINA LEATHER");
                    }
                    else {
                        setTelemetryLabel("MACRO LE VOYAGEUR");
                    }
                    // Service bell chime trigger at concierge desk
                    if (progress >= 0.40 && progress <= 0.60) {
                        if (!bellRungRef.current) {
                            bellRungRef.current = true;
                            soundManager.playConciergeBell();
                        }
                    }
                    else if (progress < 0.30 || progress > 0.70) {
                        bellRungRef.current = false;
                    }
                    // Render frame directly via RAF (smooth 60-120fps)
                    if (rafIdRef.current) {
                        cancelAnimationFrame(rafIdRef.current);
                    }
                    rafIdRef.current = requestAnimationFrame(() => {
                        drawScene(ctx, progress, canvas.width, canvas.height);
                    });
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
    const handleScrubBarClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        const trigger = ScrollTrigger.getById("hero-trigger");
        if (trigger) {
            const targetScroll = trigger.start + ratio * (trigger.end - trigger.start);
            window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
    };
    return (<section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* HTML5 Zero-Stutter Direct Atmospheric Canvas */}
      <canvas ref={canvasRef} className="w-full h-full object-cover block" style={{ width: "100%", height: "100%" }}/>

      {/* Monochromatic editorial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/70"/>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"/>

      {/* Hero Typography: Editorial "LE VOYAGEUR" positioned in z-10 directly behind 3D Watch */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div ref={textRef} className="transition-transform duration-200 ease-out flex flex-col items-center select-none" style={{
            transform: `translateY(-70px) scale(${1 + scrubProgress * 0.04})`,
        }}>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-zinc-400 font-medium block mb-3">
            VÉRAN ATELIER · PARIS
          </span>
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] uppercase font-bold text-white/90 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            LE VOYAGEUR
          </h1>
          <p className="mt-4 text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-400 max-w-xl font-light">
            Steel 39 mm · Hand-Wound Manufacture Calibre · €9,800
          </p>
        </div>
      </div>

      {/* Real-time 3D WebGL Timepiece Overlay: Instantly visible from frame 0 with dynamic zoom */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-5xl max-h-[82vh] relative pointer-events-auto flex items-center justify-center">
          <Watch3DInteractive dialType={activeDial} strapType="cognac" viewMode={activeViewMode} scrollProgress={activeViewMode === "caseback" ? undefined : scrubProgress} autoRotate={true} showControls={false} className="w-full h-full"/>
        </div>
      </div>

      {/* Top Center: Real-time 3D WebGL & Drag Orbit Badge */}
      <div className="absolute top-18 md:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center">
        <span className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-mono shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
          <span>Real-time 3D WebGL · Drag to Rotate 360°</span>
        </span>
      </div>

      {/* Top Right: Quick Dial Selector & 180° Flip Calibre Switcher */}
      <div className="absolute top-18 md:top-20 right-6 md:right-12 z-30 pointer-events-auto flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono">
          <button onClick={() => { setActiveDial("blue"); soundManager.playSoftClick(); }} className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${activeDial === "blue" ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"}`}>
            Bleu
          </button>
          <button onClick={() => { setActiveDial("silver"); soundManager.playSoftClick(); }} className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${activeDial === "silver" ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"}`}>
            Silver
          </button>
          <button onClick={() => { setActiveDial("slate"); soundManager.playSoftClick(); }} className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${activeDial === "slate" ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"}`}>
            Slate
          </button>
        </div>

        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono">
          <button onClick={() => { setActiveViewMode("wrist"); soundManager.playSoftClick(); }} className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${activeViewMode === "wrist" ? "bg-white/25 text-white font-medium" : "text-zinc-400 hover:text-white"}`}>
            Dial 3D
          </button>
          <button onClick={() => { setActiveViewMode("caseback"); soundManager.playSoftClick(); }} className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${activeViewMode === "caseback" ? "bg-white/25 text-white font-medium" : "text-zinc-400 hover:text-white"}`}>
            180° Calibre
          </button>
        </div>
      </div>

      {/* Micro Telemetry Overlay during scrub: Bottom Left */}
      <div suppressHydrationWarning className="absolute bottom-8 left-8 md:bottom-12 md:left-14 z-30 pointer-events-auto flex flex-col space-y-3">
        <div suppressHydrationWarning className="flex items-center space-x-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>
          <span className="text-white font-medium">{telemetryTime} / 00:07</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-300 tracking-[0.25em]">{telemetryLabel}</span>
        </div>

        {/* Clickable slider scrub bar indicator */}
        <div suppressHydrationWarning className="flex items-center space-x-3">
          <div onClick={handleScrubBarClick} title="Click anywhere to scrub timeline" className="w-44 sm:w-64 h-3 flex items-center cursor-pointer group">
            <div className="w-full h-[3px] bg-white/20 relative overflow-hidden group-hover:h-[4px] transition-all">
              <div className="h-full bg-white transition-all duration-75" style={{ width: `${scrubProgress * 100}%` }}/>
            </div>
          </div>
          <span className="text-[9px] font-mono text-zinc-400">
            {Math.round(scrubProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Bottom Right CTA & Scroll Prompt */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-30 flex items-center space-x-4">
        <button onClick={handleSkipToSpecs} className="px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] bg-white text-black font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-xl flex items-center space-x-2">
          <span>Explore Specs</span>
          <span>↓</span>
        </button>
        <div className="hidden sm:flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          <span>Scroll to scrub</span>
          <div className="w-3.5 h-5 border border-white/20 rounded-full flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce"/>
          </div>
        </div>
      </div>
    </section>);
}
