"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { build3DWatch, DialType, StrapType, Watch3DComponents } from "@/lib/watch3d";
import { RotateCcw, Sparkles } from "lucide-react";

interface Watch3DInteractiveProps {
  dialType?: DialType;
  strapType?: StrapType;
  viewMode?: "wrist" | "macro" | "caseback" | "profile";
  scrollProgress?: number;
  autoRotate?: boolean;
  showControls?: boolean;
  isWinding?: boolean;
  className?: string;
}

export function Watch3DInteractive({
  dialType = "blue",
  strapType = "cognac",
  viewMode = "wrist",
  scrollProgress,
  autoRotate = true,
  showControls = true,
  isWinding = false,
  className = "",
}: Watch3DInteractiveProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<Watch3DComponents | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Interaction state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const initialRot = scrollProgress !== undefined ? { x: 0.28, y: -0.35 } : { x: 0.18, y: -0.22 };
  const rotRef = useRef(initialRot);
  const targetRotRef = useRef(initialRot);
  const initialZoom = scrollProgress !== undefined ? 13.2 - Math.max(0, Math.min(1, scrollProgress)) * 6.8 : 7.8;
  const targetZoomRef = useRef(initialZoom);
  const currentZoomRef = useRef(initialZoom);
  const [isHovered, setIsHovered] = useState(false);
  const isWindingRef = useRef(isWinding);

  useEffect(() => {
    isWindingRef.current = isWinding;
  }, [isWinding]);

  // Update target rotation when viewMode or scrollProgress changes
  useEffect(() => {
    if (viewMode === "caseback") {
      targetRotRef.current = { x: 0.0, y: Math.PI };
      targetZoomRef.current = 8.5;
      return;
    }

    if (viewMode === "profile") {
      targetRotRef.current = { x: 0.04, y: Math.PI * 0.48 }; // 9.8mm slim profile angle
      targetZoomRef.current = 8.2;
      return;
    }

    if (scrollProgress !== undefined) {
      // Dynamic scroll choreography: pans in from angle to straight macro view
      const sp = Math.max(0, Math.min(1, scrollProgress));
      targetRotRef.current.x = 0.28 - sp * 0.28;
      targetRotRef.current.y = -0.35 + sp * 0.35;
      targetZoomRef.current = 13.2 - sp * 6.8; // sp=0: 13.2 (full watch, elegant proportion); sp=1: 6.4 (macro dial)
    } else {
      if (viewMode === "wrist") {
        targetRotRef.current = { x: 0.18, y: -0.22 };
        targetZoomRef.current = 7.8;
      } else if (viewMode === "macro") {
        targetRotRef.current = { x: 0.0, y: 0.0 };
        targetZoomRef.current = 5.2; // Deep macro zoom
      }
    }
  }, [viewMode, scrollProgress]);

  // Update dial texture when dialType prop changes
  useEffect(() => {
    if (watchRef.current) {
      watchRef.current.updateDial(dialType);
    }
  }, [dialType]);

  // Update strap when strapType prop changes
  useEffect(() => {
    if (watchRef.current) {
      watchRef.current.updateStrap(strapType);
    }
  }, [strapType]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 750;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, currentZoomRef.current);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Luxury Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2); // Warm daylight
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 2.5); // Cool blue sapphire rim
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xf8fafc, 1.8);
    fillLight.position.set(0, -6, 5);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    // 4. Build 3D Watch Model
    const watch = build3DWatch();
    watch.updateDial(dialType);
    watch.updateStrap(strapType);
    watchRef.current = watch;
    scene.add(watch.root);

    // 5. Mouse / Touch Orbit Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = (e.clientX - prevMouseRef.current.x) * 0.008;
        const deltaY = (e.clientY - prevMouseRef.current.y) * 0.008;

        targetRotRef.current.y += deltaX;
        targetRotRef.current.x += deltaY;

        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle mouse parallax tilt when hovering
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        watch.root.position.x = nx * 0.25;
        watch.root.position.y = ny * 0.25;
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - prevMouseRef.current.x) * 0.008;
        const deltaY = (e.touches[0].clientY - prevMouseRef.current.y) * 0.008;

        targetRotRef.current.y += deltaX;
        targetRotRef.current.x += deltaY;

        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Render Loop with smooth inertia damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation
      rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.12;
      rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.12;

      // Auto gentle hover rotation when idle
      if (!isDraggingRef.current && autoRotate) {
        const floatX = Math.sin(elapsedTime * 0.7) * 0.022;
        const floatY = Math.cos(elapsedTime * 0.5) * 0.032;
        watch.root.rotation.x = rotRef.current.x + floatX;
        watch.root.rotation.y = rotRef.current.y + floatY;
      } else {
        watch.root.rotation.x = rotRef.current.x;
        watch.root.rotation.y = rotRef.current.y;
      }

      // Smooth camera zoom
      currentZoomRef.current += (targetZoomRef.current - currentZoomRef.current) * 0.08;
      camera.position.z = currentZoomRef.current;

      // Mechanical tick & kinetic winding
      watch.tick(elapsedTime, isWindingRef.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate, dialType, strapType]);

  const handleResetOrientation = () => {
    targetRotRef.current = { x: -0.35, y: 0.25 };
    targetZoomRef.current = 8.5;
  };

  return (
    <div
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full block" />

      {/* Luxury Horology 3D Interactive Badges */}
      {showControls && (
        <>
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center space-x-2">
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-[0.25em] text-zinc-300 font-mono">
              <Sparkles size={11} className="text-amber-400" />
              <span>Real-time 3D WebGL</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-400 font-mono bg-black/60 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
              Drag to Orbit 360°
            </span>

            <button
              onClick={handleResetOrientation}
              className="pointer-events-auto flex items-center space-x-1 text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white bg-black/70 hover:bg-black/90 px-3 py-1.5 rounded border border-white/10 transition-colors cursor-pointer"
              title="Reset 3D camera angle"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

