"use client";

import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/audio";
import { build3DWatch } from "@/lib/watch3d";
import { ChevronLeft, ChevronRight, Check, RotateCcw, Box, Compass, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EDITIONS = [
  {
    id: "silver-pure",
    editionNumber: "01 / 06",
    name: "ARGENT BROSSÉ",
    subtitle: "Pure Chronomètre · €9,800",
    dialType: "silver",
    strapType: "cognac",
    finish: "Argent brossé vertical · Hand-brushed",
    caseDesc: "316L Stainless Steel · 39 mm",
    price: "€9,800",
    editionTag: "Chronomètre Classique",
    colorDot: "#e2e8f0",
    description:
      "Hand-brushed argent satiné dial capturing the soft morning light over Place Vendôme. Flame-blued steel leaf hands with a minimalist railway minute chapter.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
  {
    id: "blue-paris",
    editionNumber: "02 / 06",
    name: "BLEU DE PARIS",
    subtitle: "Signature Cobalt Sunburst · €9,800",
    dialType: "blue",
    strapType: "blue",
    finish: "Galvanique soleil 120-ray · Cobalt",
    caseDesc: "316L Stainless Steel · 39 mm",
    price: "€9,800",
    editionTag: "Signature Édition",
    colorDot: "#2563eb",
    description:
      "Exclusive galvanic cobalt blue sunburst dial inspired by twilight reflections along the Seine. Diamond-faceted rhodium indices with deep midnight perimeter vignette.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
  {
    id: "slate-guilloche",
    editionNumber: "03 / 06",
    name: "ARDOISE GUILLOCHÉ",
    subtitle: "Clous de Paris · €9,800",
    dialType: "slate",
    strapType: "black",
    finish: "Ardoise guilloché · Clous de Paris",
    caseDesc: "316L Stainless Steel · 39 mm",
    price: "€9,800",
    editionTag: "Atelier Métiers d'Art",
    colorDot: "#475569",
    description:
      "Traditional hand-turned Clous de Paris hobnail guilloché engraved on solid slate brass plate, framed by an anthracite satin chapter ring.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
  {
    id: "salmon-vendome",
    editionNumber: "04 / 06",
    name: "SAUMON VENDÔME",
    subtitle: "Salon Vendôme Atelier · €10,200",
    dialType: "salmon",
    strapType: "cognac",
    finish: "Saumon cuivré rayonnant · Sunray",
    caseDesc: "316L Stainless Steel · 39 mm",
    price: "€10,200",
    editionTag: "Collector's Reserve",
    colorDot: "#e07a5f",
    description:
      "Warm Parisian salmon-copper dial with high-frequency sunray brushing, paired with heat-blued steel hands and an amber-toned sub-seconds counter.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
  {
    id: "noir-obsidienne",
    editionNumber: "05 / 06",
    name: "NOIR OBSIDIENNE",
    subtitle: "Midnight Obsidian · €9,800",
    dialType: "noir",
    strapType: "black",
    finish: "Noir obsidienne galvanique · Circular grain",
    caseDesc: "316L Stainless Steel · 39 mm",
    price: "€9,800",
    editionTag: "Monochrome Édition",
    colorDot: "#18181b",
    description:
      "Deep light-absorbing galvanic noir dial with fine concentric micro-grooving and mirror-polished rhodium markers that gleam under pinpoint light.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
  {
    id: "milanese-steel",
    editionNumber: "06 / 06",
    name: "ÉDITION MILANAISE",
    subtitle: "316L Milanese Mesh · €10,400",
    dialType: "silver",
    strapType: "steel",
    finish: "Argent givré · Milanese 316L Bracelet",
    caseDesc: "Integrated Mesh Steel · 39 mm",
    price: "€10,400",
    editionTag: "All-Steel Integrated",
    colorDot: "#cbd5e1",
    description:
      "Full stainless steel horological architecture featuring an integrated Milanese mesh bracelet and a frosted silver dial with blued hands.",
    specs: {
      calibre: "Calibre V-101 Manufacture",
      vibration: "28,800 vph (4 Hz)",
      powerReserve: "52 Hours Reserve",
      dimensions: "39 mm × 9.8 mm",
    },
  },
];

export function WatchRollShowcase({ onSelectDialForBooking }) {
  const sectionRef = useRef(null);
  const mountRef = useRef(null);
  const triggerRef = useRef(null);

  // Active edition index
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [viewAngle, setViewAngle] = useState("wrist");
  const [isOrbiting, setIsOrbiting] = useState(false);

  // 3D references
  const watchesRef = useRef([]);
  const targetScrubRef = useRef(0);
  const currentScrubRef = useRef(0);

  // Mouse drag orbit state for the active watch
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const dragRotRef = useRef({ x: 0.16, y: -0.22 });
  const targetDragRotRef = useRef({ x: 0.16, y: -0.22 });

  // Update target drag rotation when viewAngle changes
  useEffect(() => {
    if (viewAngle === "dial") {
      targetDragRotRef.current = { x: 0.0, y: 0.0 };
    } else if (viewAngle === "wrist") {
      targetDragRotRef.current = { x: 0.18, y: -0.25 };
    } else if (viewAngle === "profile") {
      targetDragRotRef.current = { x: 0.02, y: Math.PI * 0.48 };
    } else if (viewAngle === "calibre") {
      targetDragRotRef.current = { x: 0.0, y: Math.PI };
    }
  }, [viewAngle]);

  // Jump to specific edition
  const jumpToEdition = (index) => {
    soundManager.playSoftClick();
    if (!triggerRef.current) return;
    const progress = index / (EDITIONS.length - 1);
    const scrollPos = triggerRef.current.start + progress * (triggerRef.current.end - triggerRef.current.start);
    window.scrollTo({
      top: scrollPos,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    jumpToEdition(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(EDITIONS.length - 1, activeIndex + 1);
    jumpToEdition(nextIdx);
  };

  // Setup Three.js WebGL Scene with 6 procedural 3D watches
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // 2. High-Fidelity WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Haute Horlogerie Lighting Studio
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.4);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef08a, 1.8);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // 4. Build all 6 3D Watches and add to Scene
    const watches = EDITIONS.map((edition) => {
      const watch = build3DWatch(edition.dialType, edition.strapType);
      scene.add(watch.root);
      return watch;
    });
    watchesRef.current = watches;

    // 5. Setup GSAP ScrollTrigger Pinning
    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(EDITIONS.length - 1) * 90}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const scrub = self.progress * (EDITIONS.length - 1);
          targetScrubRef.current = scrub;
          setScrollFraction(self.progress);
          const currentIdx = Math.min(
            EDITIONS.length - 1,
            Math.max(0, Math.round(scrub))
          );
          setActiveIndex(currentIdx);
        },
      });
    }, sectionRef);

    // 6. Interactive Mouse & Touch Drag Controls for 360° Orbit
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      setIsOrbiting(true);
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      targetDragRotRef.current.y += deltaX * 0.009;
      targetDragRotRef.current.x += deltaY * 0.009;

      targetDragRotRef.current.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, targetDragRotRef.current.x));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsOrbiting(false);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Animation Loop with continuous 3D carousel transformations
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      currentScrubRef.current += (targetScrubRef.current - currentScrubRef.current) * 0.12;

      dragRotRef.current.x += (targetDragRotRef.current.x - dragRotRef.current.x) * 0.1;
      dragRotRef.current.y += (targetDragRotRef.current.y - dragRotRef.current.y) * 0.1;

      const isMobile = window.innerWidth < 768;
      const spacing = isMobile ? 3.8 : 4.6;

      watches.forEach((watch, i) => {
        const offset = i - currentScrubRef.current;
        const absOffset = Math.abs(offset);

        const x = offset * spacing;
        const z = -Math.pow(absOffset, 1.25) * 2.4;

        const inwardRotY = -offset * 0.38;
        const rotY = inwardRotY + (absOffset < 0.8 ? dragRotRef.current.y * (1 - absOffset * 0.8) : 0);
        const rotX = dragRotRef.current.x * (1 - Math.min(1, absOffset * 0.7));

        const scale = Math.max(0.38, 1.0 - Math.min(1, absOffset * 0.22));

        watch.root.position.set(x, 0, z);
        watch.root.rotation.set(rotX, rotY, 0);
        watch.root.scale.setScalar(scale);

        watch.tick(time);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = w < 768 ? 9.8 : 8.8;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      ctx.revert();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const activeEdition = EDITIONS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="dials-roll"
      className="relative w-full h-screen bg-[#040507] text-white overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,17,10,0.45)_0%,rgba(4,5,7,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* TOP HEADER */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-12 pt-8 sm:pt-10 flex items-start justify-between pointer-events-none">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
              02 · THE MANUFACTURE ARCHIVE · 6 EDITIONS
            </span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl font-light text-white uppercase tracking-wider">
            THREE DIALS, ONE CASE
          </h2>
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
            Scroll mouse wheel to glide through 3D editions
          </p>
        </div>

        {/* Edition Counter & Live Progress */}
        <div className="flex flex-col items-end pointer-events-auto">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-white font-medium">
              {activeEdition.editionNumber}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border border-white/15 bg-black/40 text-amber-300">
              {activeEdition.editionTag}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full border border-white/15 transition-all cursor-pointer ${
                activeIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:border-white hover:bg-white/10 active:scale-95"
              }`}
              aria-label="Previous edition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === EDITIONS.length - 1}
              className={`p-2 rounded-full border border-white/15 transition-all cursor-pointer ${
                activeIndex === EDITIONS.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:border-white hover:bg-white/10 active:scale-95"
              }`}
              aria-label="Next edition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN 3D WEBGL TIMEPIECE STAGE */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Orbit Help Indicator */}
      <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center space-x-2 text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
        <Compass size={12} className={isOrbiting ? "text-amber-400 animate-spin" : "text-zinc-400"} />
        <span>{isOrbiting ? "Orbiting Active Timepiece" : "Drag to orbit 360° · Scroll to navigate"}</span>
      </div>

      {/* 3D PERSPECTIVE ANGLE CONTROLLER */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-2 pointer-events-auto">
        <span className="text-[8.5px] font-mono uppercase tracking-[0.25em] text-zinc-400 mb-1">
          3D Perspective
        </span>
        <button
          onClick={() => { setViewAngle("dial"); soundManager.playSoftClick(); }}
          className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-sm border text-left flex items-center justify-between min-w-[110px] ${
            viewAngle === "dial"
              ? "bg-white text-black border-white font-medium shadow-md"
              : "bg-black/60 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
          }`}
        >
          <span>Frontal</span>
          <span className="text-[8px] font-mono opacity-60">0°</span>
        </button>
        <button
          onClick={() => { setViewAngle("wrist"); soundManager.playSoftClick(); }}
          className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-sm border text-left flex items-center justify-between min-w-[110px] ${
            viewAngle === "wrist"
              ? "bg-white text-black border-white font-medium shadow-md"
              : "bg-black/60 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
          }`}
        >
          <span>Wrist 3D</span>
          <span className="text-[8px] font-mono opacity-60">35°</span>
        </button>
        <button
          onClick={() => { setViewAngle("profile"); soundManager.playSoftClick(); }}
          className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-sm border text-left flex items-center justify-between min-w-[110px] ${
            viewAngle === "profile"
              ? "bg-white text-black border-white font-medium shadow-md"
              : "bg-black/60 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
          }`}
        >
          <span>9.8mm Flank</span>
          <span className="text-[8px] font-mono opacity-60">90°</span>
        </button>
        <button
          onClick={() => { setViewAngle("calibre"); soundManager.playSoftClick(); }}
          className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-all cursor-pointer rounded-sm border text-left flex items-center justify-between min-w-[110px] ${
            viewAngle === "calibre"
              ? "bg-white text-black border-white font-medium shadow-md"
              : "bg-black/60 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
          }`}
        >
          <span>Calibre V-101</span>
          <span className="text-[8px] font-mono opacity-60">180°</span>
        </button>
      </div>

      {/* SYNCHRONIZED METADATA CARD & ORDER CTA */}
      <div className="absolute right-6 sm:right-12 bottom-24 sm:bottom-28 z-20 max-w-sm w-full bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] pointer-events-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: activeEdition.colorDot }}
            />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400">
              {activeEdition.editionNumber}
            </span>
          </div>
          <span className="text-sm font-sans text-white font-light">
            {activeEdition.price}
          </span>
        </div>

        <h3 className="font-sans text-xl sm:text-2xl text-white font-normal uppercase tracking-wider mb-1">
          {activeEdition.name}
        </h3>
        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">
          {activeEdition.finish}
        </p>

        <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
          {activeEdition.description}
        </p>

        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-white/10 text-[9px] font-mono text-zinc-400 mb-4">
          <div>
            <span className="text-zinc-400 block">Calibre</span>
            <span className="text-white">V-101 (28,800 vph)</span>
          </div>
          <div>
            <span className="text-zinc-400 block">Dimensions</span>
            <span className="text-white">39 mm × 9.8 mm</span>
          </div>
        </div>

        <button
          onClick={() => onSelectDialForBooking(activeEdition.dialType)}
          className="w-full py-3 px-4 bg-white text-black text-[10px] font-medium uppercase tracking-[0.22em] hover:bg-zinc-200 transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2 active:scale-[0.98]"
        >
          <Check size={14} />
          <span>Select & Order This Edition</span>
        </button>
      </div>

      {/* BOTTOM CAROUSEL TRACK */}
      <div className="absolute bottom-4 left-6 right-6 sm:left-12 sm:right-12 z-20 pointer-events-auto">
        <div className="w-full h-[2px] bg-white/10 relative mb-3 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-white transition-all duration-150"
            style={{ width: `${Math.round(scrollFraction * 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {EDITIONS.map((ed, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={ed.id}
                onClick={() => jumpToEdition(idx)}
                className={`py-2 px-2 text-left border rounded-sm transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-white bg-white/15 text-white shadow-md scale-[1.02]"
                    : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/30 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: ed.colorDot }}
                  />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-400">
                    {ed.editionNumber.split("/")[0].trim()}
                  </span>
                </div>
                <span className="text-[9.5px] uppercase font-sans tracking-wider truncate text-white">
                  {ed.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default WatchRollShowcase;
