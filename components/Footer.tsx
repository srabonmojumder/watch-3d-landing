"use client";

import React, { useState } from "react";
import { soundManager } from "@/lib/audio";
import { ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundManager.playSoftClick();
    setSubscribed(true);
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/10 px-6 md:px-14 py-20 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-sans text-2xl tracking-[0.35em] text-white uppercase block font-normal">
              VÉRAN
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-zinc-400 block font-mono">
              PARIS · PLACE VENDÔME
            </span>
            <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed pt-2">
              Haute Horlogerie Française. Independent chronometer manufacture uniting classical Paris design with hand-finished mechanical architectures.
            </p>
          </div>

          {/* Boutique Salons */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white block">
              Salons & Boutiques
            </span>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li className="hover:text-white transition-colors">12, Place Vendôme, Paris</li>
              <li className="hover:text-white transition-colors">42, Rue du Rhône, Genève</li>
              <li className="hover:text-white transition-colors">14, New Bond Street, London</li>
              <li className="hover:text-white transition-colors">645 Madison Avenue, New York</li>
              <li className="hover:text-white transition-colors">Ginza Six, Ginza, Tokyo</li>
            </ul>
          </div>

          {/* Allocation Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white block">
              Allocation Ledger
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Register for notification prior to each numbered annual series of 150 timepieces.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0a0a0a] border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white grow font-light"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="text-xs text-white flex items-center gap-1.5 py-2 font-mono">
                <Check size={14} /> Registered for the 2026 Ledger.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 gap-4">
          <p>© 2026 VÉRAN HORLOGERIE PARIS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Terms & Warranty</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white transition-colors cursor-pointer">Certificate Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
