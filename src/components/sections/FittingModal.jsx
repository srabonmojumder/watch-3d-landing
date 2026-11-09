"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/audio";
import { X, Check } from "lucide-react";
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
export function FittingModal({ isOpen, onClose, preselectedDial = "BLUE", }) {
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
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        soundManager.playConciergeBell();
        const ref = `VRN-${Math.floor(100000 + Math.random() * 900000)}`;
        setBookingRef(ref);
        setIsSubmitted(true);
        // Monochromatic & platinum celebratory confetti
        confetti({
            particleCount: 75,
            spread: 65,
            origin: { y: 0.6 },
            colors: ["#ffffff", "#cbd5e1", "#94a3b8", "#1e3a8a"],
        });
    };
    const handleClose = () => {
        soundManager.playSoftClick();
        setIsSubmitted(false);
        onClose();
    };
    const salonObj = SALONS.find((s) => s.id === selectedSalon) || SALONS[0];
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#090909] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,1)] overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white"/>
            <span className="font-mono text-xs tracking-[0.25em] text-white uppercase">
              VÉRAN · PRIVATE SALON FITTING
            </span>
          </div>
          <button onClick={handleClose} className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer" aria-label="Close modal">
            <X size={18}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {!isSubmitted ? (<form onSubmit={handleSubmit} className="space-y-8">
              
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono block mb-1">
                  Complimentary Horological Consultation
                </span>
                <h3 className="font-sans text-2xl font-light text-white uppercase tracking-wide">
                  Reserve Your Place
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  Experience Le Voyageur accompanied by private salon hospitality and our master watchmaker.
                </p>
              </div>

              {/* 1. Flagship Salon Selector */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-3">
                  1. Select Flagship Salon
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SALONS.map((salon) => (<button key={salon.id} type="button" onClick={() => setSelectedSalon(salon.id)} className={`p-3 text-left border transition-all cursor-pointer ${selectedSalon === salon.id
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/30 bg-black"}`}>
                      <span className="block font-sans text-xs text-white uppercase tracking-wider font-medium">
                        {salon.city}
                      </span>
                      <span className="block text-[9px] text-zinc-400 truncate mt-0.5 font-light">
                        {salon.address}
                      </span>
                    </button>))}
                </div>
              </div>

              {/* 2. Dial Preference */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-3">
                  2. Dial Variant To Present
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["BLUE", "SILVER", "SLATE", "ALL THREE"].map((d) => (<button key={d} type="button" onClick={() => setSelectedDial(d)} className={`p-2.5 text-center border text-[10px] uppercase tracking-wider transition-all cursor-pointer ${selectedDial === d
                    ? "border-white bg-white text-black font-semibold"
                    : "border-white/10 text-zinc-400 hover:border-white/30 bg-black"}`}>
                      {d}
                    </button>))}
                </div>
              </div>

              {/* 3. Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2">
                    Date
                  </label>
                  <input type="date" suppressHydrationWarning value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"/>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2">
                    Time Slot
                  </label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white">
                    {TIME_SLOTS.map((t) => (<option key={t} value={t} className="bg-black text-white">
                        {t}
                      </option>))}
                  </select>
                </div>
              </div>

              {/* 4. Complimentary Amenities */}
              <div className="space-y-3 pt-2">
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
                  Salon Hospitality (Complimentary)
                </span>
                <label className="flex items-center space-x-3 text-xs text-zinc-300 cursor-pointer">
                  <input type="checkbox" checked={champagnePairing} onChange={(e) => setChampagnePairing(e.target.checked)} className="accent-white w-4 h-4 rounded"/>
                  <span>Ruinart Blanc de Blancs Champagne Service on Arrival</span>
                </label>
                <label className="flex items-center space-x-3 text-xs text-zinc-300 cursor-pointer">
                  <input type="checkbox" checked={monogramConsultation} onChange={(e) => setMonogramConsultation(e.target.checked)} className="accent-white w-4 h-4 rounded"/>
                  <span>Personalized Caseback Monogramming Consultation</span>
                </label>
              </div>

              {/* 5. Guest Information */}
              <div className="space-y-4 pt-2">
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
                  Guest Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"/>
                  <input type="email" placeholder="Email Address *" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"/>
                </div>
                <input type="tel" placeholder="Telephone (with country code) *" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"/>
                <textarea placeholder="Special requests or preferred strap sizing..." rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-black border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white resize-none"/>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <button type="submit" className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-medium uppercase tracking-[0.25em] text-xs transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.99]">
                  Confirm Salon Fitting
                </button>
                <p className="text-[9px] text-zinc-400 text-center uppercase tracking-widest mt-3 font-mono">
                  No purchase obligation · Private salon room reserved for 90 minutes
                </p>
              </div>

            </form>) : (<div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-500">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white flex items-center justify-center mx-auto text-white">
                <Check size={28}/>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-mono block mb-2">
                  CONFIRMATION OF SALON INVITATION
                </span>
                <h3 className="font-sans text-2xl text-white font-light uppercase tracking-wider mb-2">
                  We Await Your Presence, {fullName || "Cher Invité"}
                </h3>
                <p className="text-xs text-zinc-400 font-light max-w-md mx-auto">
                  A formal concierge invitation has been dispatched to {email || "your email"}.
                </p>
              </div>

              {/* Pass Card */}
              <div className="bg-[#0f0f0f] border border-white/15 p-6 text-left max-w-md mx-auto relative overflow-hidden shadow-2xl">
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block">
                      Invitation Reference
                    </span>
                    <span className="font-mono text-sm text-white font-bold">
                      {bookingRef}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block">
                        Location
                      </span>
                      <span className="text-white font-sans">{salonObj.city} Flagship</span>
                      <span className="block text-[9px] text-zinc-400">{salonObj.address}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block">
                        Date & Time
                      </span>
                      <span className="text-white font-sans">{selectedDate}</span>
                      <span className="block text-[9px] text-zinc-400">{selectedTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block">
                      Timepiece To Present
                    </span>
                    <span className="text-white font-medium">
                      LE VOYAGEUR · {selectedDial} DIAL
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={handleClose} className="px-8 py-3 bg-white text-black font-medium uppercase tracking-[0.22em] text-xs hover:bg-zinc-200 cursor-pointer">
                Return to Timepiece
              </button>
            </div>)}
        </div>

      </div>
    </div>);
}
