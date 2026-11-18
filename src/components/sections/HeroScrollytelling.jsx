"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/audio";
import { build3DWatch } from "@/lib/watch3d";
import { RotateCw, Compass, Sparkles, Box, RotateCcw } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroScrollytelling() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const textRef = useRef(null);

  // 3D Watch state
  const [activeDial, setActiveDial] = useState("blue");
  const [activeViewMode, setActiveViewMode] = useState("wrist");
  const [scrubProgress, setScrubProgress] = useState(0);
  const [telemetryTime, setTelemetryTime] = useState("00:01");
  const [telemetryLabel, setTelemetryLabel] = useState("3D ATELIER SHOWCASE");

  // Three.js internal references
  const watchRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Camera & Watch target transformations
  const rotRef = useRef({ x: 0.18, y: -0.22 });
  const targetRotRef = useRef({ x: 0.18, y: -0.22 });
  const zoomRef = useRef(7.8);
  const targetZoomRef = useRef(7.8);
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const bellRungRef = useRef(false);

  // Update target rotation & zoom based on viewMode & scrubProgress
  useEffect(() => {
    if (activeViewMode === "caseback") {
      targetRotRef.current = { x: 0.0, y: Math.PI };
      targetZoomRef.current = 8.2;
      return;
    }

    if (activeViewMode === "profile") {
      targetRotRef.current = { x: 0.02, y: Math.PI * 0.48 };
      targetZoomRef.current = 8.0;
      return;
    }

    if (activeViewMode === "macro") {
      targetRotRef.current = { x: 0.0, y: 0.0 };
      targetZoomRef.current = 5.2;
      return;
    }

    // Default "wrist" mode - blend with scroll choreography
    const sp = scrubProgress;
    if (sp < 0.3) {
      targetRotRef.current = { x: 0.22 - sp * 0.3, y: -0.28 + sp * 0.35 };
      targetZoomRef.current = 8.0 - sp * 3.5;
    } else if (sp < 0.7) {
      const sub = (sp - 0.3) / 0.4;
      targetRotRef.current = { x: 0.12 - sub * 0.12, y: 0.07 - sub * 0.07 };
      targetZoomRef.current = 6.95 - (1 - Math.abs(sub - 0.5) * 2) * 1.8;
    } else {
      const sub = (sp - 0.7) / 0.3;
      targetRotRef.current = { x: sub * 0.05, y: sub * Math.PI };
      targetZoomRef.current = 7.2 + sub * 1.0;
    }
  }, [activeViewMode, scrubProgress]);

  // Update dial texture when activeDial changes
  useEffect(() => {
    if (watchRef.current) {
      watchRef.current.updateDial(activeDial);
    }
  }, [activeDial]);

  // Setup Full-Screen Three.js 3D Master Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, zoomRef.current);
    cameraRef.current = camera;

    // 2. High-Precision WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Realistic HDR Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;

    // 4. Luxury Studio Lighting System
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.8); // Warm daylight
    keyLight.position.set(6, 9, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 2.8); // Cool sapphire rim
    rimLight.position.set(-7, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xf8fafc, 1.6);
    fillLight.position.set(0, -6, 5);
    scene.add(fillLight);

    const spotLight = new THREE.SpotLight(0xffeedd, 3.2, 25, Math.PI * 0.25, 0.5, 1.2);
    spotLight.position.set(0, 8, 8);
    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    scene.add(ambientLight);

    // 4. Atmospheric 3D Particle Constellation (Floating atelier dust)
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 22;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.065,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 5. Build 3D Watch Model
    const watch = build3DWatch(activeDial, "cognac");
    watchRef.current = watch;
    scene.add(watch.root);

    // 6. Interactive Mouse Drag & Parallax Orbit
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (isDraggingRef.current) {
        const deltaX = (e.clientX - prevMouseRef.current.x) * 0.007;
        const deltaY = (e.clientY - prevMouseRef.current.y) * 0.007;

        targetRotRef.current.y += deltaX;
        targetRotRef.current.x += deltaY;

        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseParallaxRef.current = { x: nx * 0.08, y: ny * 0.08 };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - prevMouseRef.current.x) * 0.007;
        const deltaY = (e.touches[0].clientY - prevMouseRef.current.y) * 0.007;

        targetRotRef.current.y += deltaX;
        targetRotRef.current.x += deltaY;

        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Three.js Animation Loop with Viewport Visibility Observer
    let isVisible = true;
    let animationFrameId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation interpolation
      rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.1;
      rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.1;

      // Subtle breathing float in 3D
      const floatY = Math.sin(elapsedTime * 0.8) * 0.04;
      const floatTilt = Math.cos(elapsedTime * 0.6) * 0.02;

      watch.root.rotation.x = rotRef.current.x + mouseParallaxRef.current.y + floatTilt;
      watch.root.rotation.y = rotRef.current.y + mouseParallaxRef.current.x;
      watch.root.position.y = floatY;

      // Smooth camera zoom
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.08;
      camera.position.z = zoomRef.current;

      // Tick mechanical movement (balance wheel, hands, sub-seconds)
      watch.tick(elapsedTime, false);

      // Rotate background particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03;
      }

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !animationFrameId) {
          clock.start();
          animate();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  // GSAP ScrollTrigger Scrollytelling Setup
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrubProgress(progress);

        // Update telemetry status based on progress
        if (progress < 0.35) {
          setTelemetryTime("00:01");
          setTelemetryLabel("HAUTE HORLOGERIE PARIS");
        } else if (progress < 0.7) {
          setTelemetryTime("00:04");
          setTelemetryLabel("GALVANIC SUNBURST & LEAF HANDS");
        } else {
          setTelemetryTime("00:07");
          setTelemetryLabel("CALIBRE V-101 180° EXPOSITION");
          if (!bellRungRef.current) {
            soundManager.playConciergeBell();
            bellRungRef.current = true;
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleSkipToSpecs = () => {
    soundManager.playSoftClick();
    const target = document.getElementById("product-breakdown");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrubBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    soundManager.playSoftClick();

    if (containerRef.current) {
      const scrollDist = window.innerHeight * 2.2 * ratio;
      window.scrollTo({
        top: containerRef.current.offsetTop + scrollDist,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#040507] overflow-hidden select-none"
    >
      {/* Radial luxury backdrop vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#121824]/40 via-[#070a10]/80 to-[#020305] z-0" />

      {/* Pure Three.js 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Hero Typography Overlay (Pans smoothly with 3D depth) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div
          ref={textRef}
          className="transition-transform duration-200 ease-out flex flex-col items-center select-none"
          style={{
            transform: `translateY(-90px) scale(${1 + scrubProgress * 0.05})`,
            opacity: Math.max(0.15, 1 - scrubProgress * 1.2),
          }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-zinc-400 font-medium">
              VÉRAN ATELIER · PLACE VENDÔME PARIS
            </span>
            <span className="w-6 h-[1px] bg-white/40" />
          </div>

          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] uppercase font-bold text-white/95 drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            LE VOYAGEUR
          </h1>

          <p className="mt-4 text-xs md:text-sm tracking-[0.32em] uppercase text-zinc-300 max-w-xl font-light">
            Steel 39 mm · Hand-Wound Manufacture Calibre · €9,800
          </p>
        </div>
      </div>

      {/* Top Center: Real-time 3D Three.js WebGL Badge */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center">
        <span className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-zinc-200 font-mono shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time Three.js WebGL · Drag 360°</span>
        </span>
      </div>

      {/* Top Right: 3D Dial Selector & 3D Angle Presets */}
      <div className="absolute top-20 right-6 md:right-12 z-30 pointer-events-auto flex flex-col items-end space-y-2.5">
        {/* Dial Switcher in 3D */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono">
          <button
            onClick={() => { setActiveDial("blue"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeDial === "blue" ? "bg-white text-black font-semibold shadow-md" : "text-zinc-400 hover:text-white"
            }`}
          >
            Bleu
          </button>
          <button
            onClick={() => { setActiveDial("silver"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeDial === "silver" ? "bg-white text-black font-semibold shadow-md" : "text-zinc-400 hover:text-white"
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => { setActiveDial("slate"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeDial === "slate" ? "bg-white text-black font-semibold shadow-md" : "text-zinc-400 hover:text-white"
            }`}
          >
            Slate
          </button>
          <button
            onClick={() => { setActiveDial("salmon"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeDial === "salmon" ? "bg-white text-black font-semibold shadow-md" : "text-zinc-400 hover:text-white"
            }`}
          >
            Saumon
          </button>
        </div>

        {/* 3D Camera Angle Presets */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono">
          <button
            onClick={() => { setActiveViewMode("wrist"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeViewMode === "wrist" ? "bg-white/30 text-white font-medium" : "text-zinc-400 hover:text-white"
            }`}
          >
            Wrist 3D
          </button>
          <button
            onClick={() => { setActiveViewMode("macro"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeViewMode === "macro" ? "bg-white/30 text-white font-medium" : "text-zinc-400 hover:text-white"
            }`}
          >
            Macro Dial
          </button>
          <button
            onClick={() => { setActiveViewMode("caseback"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeViewMode === "caseback" ? "bg-white/30 text-white font-medium" : "text-zinc-400 hover:text-white"
            }`}
          >
            180° Calibre
          </button>
          <button
            onClick={() => { setActiveViewMode("profile"); soundManager.playSoftClick(); }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeViewMode === "profile" ? "bg-white/30 text-white font-medium" : "text-zinc-400 hover:text-white"
            }`}
          >
            9.8mm
          </button>
        </div>
      </div>

      {/* Bottom Left: Micro Telemetry & Timeline Scrub Bar */}
      <div suppressHydrationWarning className="absolute bottom-8 left-8 md:bottom-12 md:left-14 z-30 pointer-events-auto flex flex-col space-y-3">
        <div suppressHydrationWarning className="flex items-center space-x-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-medium">{telemetryTime} / 00:07</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-300 tracking-[0.25em]">{telemetryLabel}</span>
        </div>

        {/* Clickable slider scrub bar indicator */}
        <div suppressHydrationWarning className="flex items-center space-x-3">
          <div
            onClick={handleScrubBarClick}
            title="Click anywhere to scrub 3D timeline"
            className="w-44 sm:w-64 h-3 flex items-center cursor-pointer group"
          >
            <div className="w-full h-[3px] bg-white/20 relative overflow-hidden group-hover:h-[4px] transition-all">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrubProgress * 100}%` }}
              />
            </div>
          </div>
          <span className="text-[9px] font-mono text-zinc-400">
            {Math.round(scrubProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Bottom Right CTA & Scroll Prompt */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-30 flex items-center space-x-4">
        <button
          onClick={handleSkipToSpecs}
          className="px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] bg-white text-black font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-xl flex items-center space-x-2"
        >
          <span>Explore Specs</span>
          <span>↓</span>
        </button>
        <div className="hidden sm:flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          <span>Scroll to scrub 3D</span>
          <div className="w-3.5 h-5 border border-white/20 rounded-full flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroScrollytelling;
