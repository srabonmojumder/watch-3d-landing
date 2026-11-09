"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/audio";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Wine,
  Sparkles,
  Check,
  ShieldCheck,
  Award,
} from "lucide-react";

interface FittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDial?: string;
}

const SALONS = [
  {
    id: "paris",
    city: "Paris",
    address: "12, Place Vendôme, 75001 Paris",
    country: "France",
  },
  {
    id: "geneva",
    city: "Genève",
    address: "42, Rue du Rhône, 1204 Genève",
    country: "Switzerland",
  },
  {
    id: "london",
    city: "London",
    address: "14, New Bond Street, Mayfair W1S",
    country: "United Kingdom",
  },
  {
    id: "newyork",
    city: "New York",
    address: "645 Madison Avenue, New York, NY 10022",
    country: "United States",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    address: "Ginza Six, 6-10-1 Ginza, Chuo-ku",
    country: "Japan",
  },
];

const TIME_SLOTS = [
  "10:30 · Morning Salon",
  "14:00 · Afternoon Fitting",
  "16:30 · Tea & Horology",
  "18:30 · Twilight Degustation",
];

export function FittingModal({
  isOpen,
  onClose,
  preselectedDial = "BLUE",
}: FittingModalProps) {
  const [selectedSalon, setSelectedSalon] = useState("paris");
  const [selectedDial, setSelectedDial] = useState(preselectedDial);
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [champagnePairing, setChampagnePairing] = useState(true);
  const [monogramConsultation, setMonogramConsultation] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playConciergeBell();

    const ref = `VRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);

    // Luxury celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#ffffff", "#1e3a8a"],
    });
  };

  const handleClose = () => {
    soundManager.playSoftClick();
    setIsSubmitted(false);
    onClose();
  };

  const salonObj = SALONS.find((s) => s.id === selectedSalon) || SALONS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0f1115] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="font-serif text-lg tracking-[0.2em] text-white uppercase">
              VÉRAN · PRIVATE SALON FITTING
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Introduction */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-1">
                  Complimentary Horological Consultation
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white uppercase tracking-wide">
                  Reserve Your Place
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  Experience Le Voyageur on your wrist accompanied by Ruinart champagne and our master horologist.
                </p>
              </div>

              {/* 1. Flagship Salon Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-3">
                  1. Select Flagship Salon
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SALONS.map((salon) => (
                    <button
                      key={salon.id}
                      type="button"
                      onClick={() => setSelectedSalon(salon.id)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedSalon === salon.id
                          ? "border-[#d4af37] bg-[#d4af37]/10"
                          : "border-white/10 hover:border-white/30 bg-black/40"
                      }`}
                    >
                      <span className="block font-serif text-sm text-white font-medium">
                        {salon.city}
                      </span>
                      <span className="block text-[9.5px] text-zinc-400 truncate mt-0.5">
                        {salon.address}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Dial Preference */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-3">
                  2. Dial Variant To Present
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["BLUE", "SILVER", "SLATE", "ALL THREE"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDial(d)}
                      className={`p-2.5 text-center border text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                        selectedDial === d
                          ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f3e5ab] font-semibold"
                          : "border-white/10 text-zinc-400 hover:border-white/30 bg-black/40"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full bg-black/60 border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-2">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#111418] border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-[#111418] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Complimentary Amenities Checkboxes */}
              <div className="space-y-3 pt-2">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300">
                  Salon Hospitality (Complimentary)
                </span>
                <label className="flex items-center space-x-3 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={champagnePairing}
                    onChange={(e) => setChampagnePairing(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span>Ruinart Blanc de Blancs Champagne Service on Arrival</span>
                </label>
                <label className="flex items-center space-x-3 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={monogramConsultation}
                    onChange={(e) => setMonogramConsultation(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span>Personalized Caseback Monogramming Consultation</span>
                </label>
              </div>

              {/* 5. Guest Information */}
              <div className="space-y-4 pt-2">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-zinc-300">
                  Guest Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telephone (with country code) *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
                <textarea
                  placeholder="Special requests or preferred strap sizing..."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-semibold uppercase tracking-[0.25em] text-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  Confirm Salon Fitting
                </button>
                <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest mt-3">
                  No purchase obligation · Private salon room reserved for 90 minutes
                </p>
              </div>

            </form>
          ) : (
            /* Confirmation Pass */
            <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                <Check size={32} />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block mb-2">
                  CONFIRMATION OF SALON INVITATION
                </span>
                <h3 className="font-serif text-3xl text-white font-light mb-2">
                  We Await Your Presence, {fullName || "Cher Invité"}
                </h3>
                <p className="text-xs text-zinc-400 font-light max-w-md mx-auto">
                  A formal concierge invitation has been dispatched to {email || "your email"}.
                </p>
              </div>

              {/* Admission Pass Card */}
              <div className="bg-[#14171d] border border-white/15 p-6 text-left max-w-md mx-auto relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#d4af37] text-black text-[9px] uppercase tracking-widest font-semibold">
                  CONFIRMED
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                      Invitation Reference
                    </span>
                    <span className="font-mono text-sm text-[#f3e5ab] font-bold">
                      {bookingRef}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                        Location
                      </span>
                      <span className="text-white font-serif">{salonObj.city} Flagship</span>
                      <span className="block text-[9px] text-zinc-400">{salonObj.address}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                        Date & Time
                      </span>
                      <span className="text-white font-serif">{selectedDate}</span>
                      <span className="block text-[9px] text-zinc-400">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                      Timepiece To Present
                    </span>
                    <span className="text-white font-medium">
                      LE VOYAGEUR · {selectedDial} DIAL
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#d4af37] text-black font-semibold uppercase tracking-[0.22em] text-xs hover:bg-[#f3e5ab] cursor-pointer"
              >
                Return to Timepiece
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

