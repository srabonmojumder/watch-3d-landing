"use client";
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/audio";
import { Watch3DInteractive } from "./Watch3DInteractive";
import { ShieldCheck, Truck, Award, Check, CreditCard, Building2, FileText, Printer, ChevronRight, RotateCcw, } from "lucide-react";
const SALONS = [
    { id: "paris", name: "12, Place Vendôme, Paris", city: "Paris" },
    { id: "geneve", name: "42, Rue du Rhône, Genève", city: "Genève" },
    { id: "london", name: "14, New Bond Street, Mayfair", city: "London" },
    { id: "newyork", name: "645 Madison Avenue, New York", city: "New York" },
    { id: "tokyo", name: "Ginza Six, Chuo-ku, Tokyo", city: "Tokyo" },
];
export function OrderSection({ initialDial = "blue", initialStrap = "cognac", }) {
    // Configurator states
    const [dial, setDial] = useState(initialDial);
    const [strap, setStrap] = useState(initialStrap);
    const [caseSize, setCaseSize] = useState("39mm");
    const [viewMode, setViewMode] = useState("wrist");
    const [engraving, setEngraving] = useState("");
    // Sync when initialDial prop updates from external selection
    React.useEffect(() => {
        if (initialDial) {
            setDial(initialDial);
        }
    }, [initialDial]);
    // Customer credentials
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryType, setDeliveryType] = useState("courier");
    const [selectedSalon, setSelectedSalon] = useState("paris");
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("France");
    const [wristSize, setWristSize] = useState("170 mm · Standard Men's");
    const [specialNotes, setSpecialNotes] = useState("");
    // Payment states
    const [paymentOption, setPaymentOption] = useState("full");
    const [paymentMethod, setPaymentMethod] = useState("card");
    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [orderCertificate, setOrderCertificate] = useState(null);
    const basePrice = 9800;
    const depositAmount = 1960; // 20%
    const totalCalculated = paymentOption === "full" ? basePrice : depositAmount;
    const handleDialChange = (newDial) => {
        soundManager.playSoftClick();
        setDial(newDial);
    };
    const handleStrapChange = (newStrap) => {
        soundManager.playSoftClick();
        setStrap(newStrap);
    };
    const handleCaseSizeChange = (size) => {
        soundManager.playSoftClick();
        setCaseSize(size);
    };
    const handleViewModeChange = (mode) => {
        soundManager.playSoftClick();
        setViewMode(mode);
    };
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (!fullName || !email || !phone) {
            alert("Please enter your name, email, and contact number.");
            return;
        }
        setIsSubmitting(true);
        soundManager.playConciergeBell();
        setTimeout(() => {
            const orderId = `VRN-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            const pieceNumber = Math.floor(1 + Math.random() * 150);
            const timestamp = new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            setOrderCertificate({
                orderId,
                pieceNumber,
                timestamp,
                totalAmount: `€${totalCalculated.toLocaleString()}`,
            });
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Monochromatic luxury celebration confetti
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#ffffff", "#d4af37", "#94a3b8", "#1e3a8a"],
            });
        }, 700);
    };
    const handleResetOrder = () => {
        soundManager.playSoftClick();
        setIsSubmitted(false);
        setOrderCertificate(null);
    };
    const handlePrint = () => {
        window.print();
    };
    return (<section id="order-section" className="relative w-full py-28 md:py-36 bg-[#040507] border-t border-white/10 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-6 h-[1px] bg-white/40"/>
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
              05 · PRIVATE ORDER & BESPOKE ACQUISITION
            </span>
            <span className="w-6 h-[1px] bg-white/40"/>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mb-4">
            ACQUIRE LE VOYAGEUR
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400 font-light max-w-2xl">
            Place Vendôme Atelier, Paris · Handcrafted to your exact wrist specifications · Limited Edition of 150 Numbered Pieces
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SUCCESS CERTIFICATE SCREEN (WHEN ORDER IS CONFIRMED)           */}
        {/* ------------------------------------------------------------- */}
        {isSubmitted && orderCertificate ? (<div className="max-w-4xl mx-auto bg-[#0a0a0c] border border-white/20 p-8 md:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-500">
            {/* Certificate Header */}
            <div className="text-center pb-8 border-b border-white/10 relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Check size={28}/>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-400 block mb-2">
                Official Atelier Confirmation · Maison VÉRAN Paris
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl text-white uppercase tracking-wider font-normal">
                ACQUISITION CONFIRMED
              </h3>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">
                Order Reference: <span className="text-white font-mono">{orderCertificate.orderId}</span>
              </p>
            </div>

            {/* Certificate Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-white/10 text-xs font-mono">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                  Timepiece Specifications
                </span>
                <div className="space-y-1.5 text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Model:</span>
                    <span className="text-white font-medium">LE VOYAGEUR (VRN-01)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Allocated Number:</span>
                    <span className="text-emerald-400 font-medium">#{orderCertificate.pieceNumber} / 150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Dial Finish:</span>
                    <span className="text-white uppercase">{dial === "blue" ? "Bleu de Paris (Soleil)" : dial === "silver" ? "Argent brossé" : "Ardoise guilloché"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Case Diameter:</span>
                    <span className="text-white">{caseSize} (316L Steel · 9.8mm)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Strap:</span>
                    <span className="text-white uppercase">{strap === "cognac" ? "Baranil Cognac Calfskin" : strap === "blue" ? "Bleu Nuit Calfskin" : "Milanese 316L Mesh"}</span>
                  </div>
                  {engraving && (<div className="flex justify-between">
                      <span className="text-zinc-400">Custom Engraving:</span>
                      <span className="text-amber-400 italic font-serif text-sm">“{engraving}”</span>
                    </div>)}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block">
                  Client & Dispatch Details
                </span>
                <div className="space-y-1.5 text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Client:</span>
                    <span className="text-white font-medium">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Contact:</span>
                    <span className="text-white">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Dispatch Type:</span>
                    <span className="text-white">{deliveryType === "courier" ? "White-Glove Armored Courier" : `Private Salon Fitting (${SALONS.find((s) => s.id === selectedSalon)?.city})`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Payment Status:</span>
                    <span className="text-white">{paymentOption === "full" ? "Paid in Full (€9,800)" : `20% Deposit (€1,960)`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Order Date:</span>
                    <span className="text-white">{orderCertificate.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Footer Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                Atelier Place Vendôme · Certified Chronomètre
              </span>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button onClick={handlePrint} className="px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto">
                  <Printer size={13}/>
                  <span>Print Certificate</span>
                </button>
                <button onClick={handleResetOrder} className="px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                  <RotateCcw size={13}/>
                  <span>Configure Another</span>
                </button>
              </div>
            </div>
          </div>) : (
        /* ------------------------------------------------------------- */
        /* TWO-COLUMN ORDER SUITE: 3D CONFIGURATOR + ORDER FORM          */
        /* ------------------------------------------------------------- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: LIVE 3D TIMEPIECE CONFIGURATOR STAGE */}
            <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#0a0a0c] border border-white/15 p-6 shadow-2xl relative">
                
                {/* 3D Stage Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                    <span className="text-[9.5px] font-mono uppercase tracking-[0.25em] text-zinc-300">
                      Live 3D WebGL Configurator
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    360° Drag Orbit
                  </span>
                </div>

                {/* 3D Viewport */}
                <div className="relative w-full aspect-[4/4] bg-gradient-to-b from-[#13161c] via-[#090b0e] to-[#040507] border border-white/10 rounded-sm overflow-hidden mb-4 shadow-inner">
                  <Watch3DInteractive dialType={dial} strapType={strap} viewMode={viewMode} autoRotate={true} showControls={false} className="w-full h-full"/>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8.5px] uppercase tracking-[0.2em] text-zinc-300 font-mono">
                      {dial === "blue" ? "Bleu de Paris" : dial === "silver" ? "Argent brossé" : "Ardoise guilloché"} · {caseSize}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <span className="text-[8.5px] uppercase tracking-[0.2em] text-zinc-400 font-mono bg-black/60 px-2 py-0.5 border border-white/10">
                      Drag to orbit 360°
                    </span>
                  </div>
                </div>

                {/* 3D Angle Presets */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-full mb-6">
                  <button onClick={() => handleViewModeChange("wrist")} className={`py-1.5 text-[9px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${viewMode === "wrist" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                    Wrist 3D
                  </button>
                  <button onClick={() => handleViewModeChange("macro")} className={`py-1.5 text-[9px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${viewMode === "macro" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                    Macro Dial
                  </button>
                  <button onClick={() => handleViewModeChange("profile")} className={`py-1.5 text-[9px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${viewMode === "profile" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                    9.8mm Flank
                  </button>
                  <button onClick={() => handleViewModeChange("caseback")} className={`py-1.5 text-[9px] uppercase tracking-[0.16em] transition-all cursor-pointer rounded-full text-center ${viewMode === "caseback" ? "bg-white text-black font-semibold shadow-sm" : "text-zinc-400 hover:text-white"}`}>
                    180° Calibre
                  </button>
                </div>

                {/* Live Order Summary Metadata Box */}
                <div className="p-4 bg-black/60 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px]">Reference:</span>
                    <span className="text-white font-medium">VRN-01 LE VOYAGEUR</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px]">Series Allocation:</span>
                    <span className="text-emerald-400 font-medium">Numbered Piece of 150</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px]">Total Price:</span>
                    <span className="text-white font-sans text-lg font-normal">€9,800</span>
                  </div>
                </div>

                {/* Heritage Guarantees */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-[9px] text-zinc-400 text-center font-mono uppercase tracking-wider">
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={14} className="text-white"/>
                    <span>Armored Courier</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={14} className="text-white"/>
                    <span>5-Yr Guarantee</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Award size={14} className="text-white"/>
                    <span>Numbered Piece</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: LUXURY ORDER & CHECKOUT FORM */}
            <div className="lg:col-span-6 bg-[#0a0a0c] border border-white/15 p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                
                {/* STEP 1: TIMEPIECE CUSTOMIZATION */}
                <div className="space-y-5 pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                    <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px]">1</span>
                    <span>Customize Your Timepiece</span>
                  </div>

                  {/* Dial Finish Options */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                      Dial Variant:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <button type="button" onClick={() => handleDialChange("blue")} className={`p-2.5 text-left border rounded-sm transition-all cursor-pointer ${dial === "blue" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-1 shadow-sm"/>
                        <span className="block text-[11px] uppercase font-medium text-white">Bleu</span>
                        <span className="text-[8px] font-mono text-zinc-400">Soleil</span>
                      </button>

                      <button type="button" onClick={() => handleDialChange("silver")} className={`p-2.5 text-left border rounded-sm transition-all cursor-pointer ${dial === "silver" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mb-1 shadow-sm"/>
                        <span className="block text-[11px] uppercase font-medium text-white">Silver</span>
                        <span className="text-[8px] font-mono text-zinc-400">Argent</span>
                      </button>

                      <button type="button" onClick={() => handleDialChange("slate")} className={`p-2.5 text-left border rounded-sm transition-all cursor-pointer ${dial === "slate" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 mb-1 shadow-sm"/>
                        <span className="block text-[11px] uppercase font-medium text-white">Slate</span>
                        <span className="text-[8px] font-mono text-zinc-400">Guilloché</span>
                      </button>

                      <button type="button" onClick={() => handleDialChange("salmon")} className={`p-2.5 text-left border rounded-sm transition-all cursor-pointer ${dial === "salmon" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#e07a5f] mb-1 shadow-sm"/>
                        <span className="block text-[11px] uppercase font-medium text-white">Saumon</span>
                        <span className="text-[8px] font-mono text-zinc-400">Vendôme</span>
                      </button>

                      <button type="button" onClick={() => handleDialChange("noir")} className={`p-2.5 text-left border rounded-sm transition-all cursor-pointer ${dial === "noir" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-white/30 mb-1 shadow-sm"/>
                        <span className="block text-[11px] uppercase font-medium text-white">Noir</span>
                        <span className="text-[8px] font-mono text-zinc-400">Obsidienne</span>
                      </button>
                    </div>
                  </div>

                  {/* Strap Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                      Quick-Release Strap (Zero-Tool Swap):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button type="button" onClick={() => handleStrapChange("cognac")} className={`p-2.5 text-center border rounded-sm transition-all cursor-pointer ${strap === "cognac" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <span className="block text-xs uppercase font-medium text-white">Cognac</span>
                        <span className="text-[9px] font-mono text-zinc-400">Baranil Calf</span>
                      </button>

                      <button type="button" onClick={() => handleStrapChange("blue")} className={`p-2.5 text-center border rounded-sm transition-all cursor-pointer ${strap === "blue" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <span className="block text-xs uppercase font-medium text-white">Bleu Nuit</span>
                        <span className="text-[9px] font-mono text-zinc-400">Baranil Calf</span>
                      </button>

                      <button type="button" onClick={() => handleStrapChange("black")} className={`p-2.5 text-center border rounded-sm transition-all cursor-pointer ${strap === "black" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <span className="block text-xs uppercase font-medium text-white">Matte Noir</span>
                        <span className="text-[9px] font-mono text-zinc-400">Alligator</span>
                      </button>

                      <button type="button" onClick={() => handleStrapChange("steel")} className={`p-2.5 text-center border rounded-sm transition-all cursor-pointer ${strap === "steel" ? "border-white bg-white/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                        <span className="block text-xs uppercase font-medium text-white">Milanese</span>
                        <span className="text-[9px] font-mono text-zinc-400">316L Steel Mesh</span>
                      </button>
                    </div>
                  </div>

                  {/* Case Diameter & Custom Engraving */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                        Case Diameter:
                      </label>
                      <div className="flex space-x-2">
                        <button type="button" onClick={() => handleCaseSizeChange("39mm")} className={`flex-1 py-2 text-xs uppercase font-medium border rounded-sm transition-all cursor-pointer ${caseSize === "39mm" ? "border-white bg-white text-black" : "border-white/15 text-zinc-400 hover:border-white"}`}>
                          39 MM (Standard)
                        </button>
                        <button type="button" onClick={() => handleCaseSizeChange("38mm")} className={`flex-1 py-2 text-xs uppercase font-medium border rounded-sm transition-all cursor-pointer ${caseSize === "38mm" ? "border-white bg-white text-black" : "border-white/15 text-zinc-400 hover:border-white"}`}>
                          38 MM (Tailored)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                        Caseback Hand-Engraving:
                      </label>
                      <input type="text" value={engraving} onChange={(e) => setEngraving(e.target.value)} placeholder="Initials or date (e.g. S.M. 2026)" maxLength={20} className="w-full bg-black/60 border border-white/20 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                    </div>
                  </div>
                </div>

                {/* STEP 2: CLIENT CREDENTIALS & DISPATCH */}
                <div className="space-y-4 pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                    <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px]">2</span>
                    <span>Client Credentials & Dispatch</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Full Name *
                      </label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Monsieur / Madame" className="w-full bg-black/60 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Email Address *
                      </label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@atelier-veran.com" className="w-full bg-black/60 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 1 42 68 00 00" className="w-full bg-black/60 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Approximate Wrist Circumference
                      </label>
                      <input type="text" value={wristSize} onChange={(e) => setWristSize(e.target.value)} placeholder="e.g. 170 mm / 6.7 inches" className="w-full bg-black/60 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                    </div>
                  </div>

                  {/* Delivery Preference */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                      Fulfillment Method:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setDeliveryType("courier")} className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${deliveryType === "courier" ? "border-white bg-white/10 text-white" : "border-white/15 text-zinc-400 hover:border-white/30"}`}>
                        <Truck size={14} className="mb-1 text-white"/>
                        <span className="block text-xs font-medium text-white">Armored Courier</span>
                        <span className="text-[9px] font-mono text-zinc-400">Direct to your residence</span>
                      </button>

                      <button type="button" onClick={() => setDeliveryType("salon")} className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${deliveryType === "salon" ? "border-white bg-white/10 text-white" : "border-white/15 text-zinc-400 hover:border-white/30"}`}>
                        <Building2 size={14} className="mb-1 text-white"/>
                        <span className="block text-xs font-medium text-white">Private Salon Fitting</span>
                        <span className="text-[9px] font-mono text-zinc-400">Champagne & watchmaker</span>
                      </button>
                    </div>
                  </div>

                  {deliveryType === "courier" ? (<div className="space-y-3 pt-2">
                      <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                          Delivery Street Address
                        </label>
                        <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Street, Residence or Villa" className="w-full bg-black/60 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full bg-black/60 border border-white/20 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="w-full bg-black/60 border border-white/20 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="w-full bg-black/60 border border-white/20 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"/>
                      </div>
                    </div>) : (<div className="pt-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Select Private Salon Location:
                      </label>
                      <select value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)} className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white">
                        {SALONS.map((s) => (<option key={s.id} value={s.id}>
                            {s.city} · {s.name}
                          </option>))}
                      </select>
                    </div>)}
                </div>

                {/* STEP 3: PAYMENT & CONFIRMATION */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                    <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px]">3</span>
                    <span>Acquisition & Payment Preference</span>
                  </div>

                  {/* Full vs Deposit */}
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPaymentOption("full")} className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${paymentOption === "full" ? "border-white bg-white/10 text-white" : "border-white/15 text-zinc-400 hover:border-white/30"}`}>
                      <span className="block text-xs font-medium text-white">Full Payment</span>
                      <span className="text-base font-sans font-normal text-white">€9,800</span>
                      <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Complimentary express shipping</span>
                    </button>

                    <button type="button" onClick={() => setPaymentOption("deposit")} className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${paymentOption === "deposit" ? "border-white bg-white/10 text-white" : "border-white/15 text-zinc-400 hover:border-white/30"}`}>
                      <span className="block text-xs font-medium text-white">20% Deposit</span>
                      <span className="text-base font-sans font-normal text-emerald-400">€1,960</span>
                      <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Balance due on atelier dispatch</span>
                    </button>
                  </div>

                  {/* Payment Method Pills */}
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-300">
                    <button type="button" onClick={() => setPaymentMethod("card")} className={`flex-1 py-2 px-3 border rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "card" ? "border-white bg-white/15 text-white" : "border-white/10 text-zinc-400 hover:border-white"}`}>
                      <CreditCard size={12}/>
                      <span>Card / Amex</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod("wire")} className={`flex-1 py-2 px-3 border rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "wire" ? "border-white bg-white/15 text-white" : "border-white/10 text-zinc-400 hover:border-white"}`}>
                      <Building2 size={12}/>
                      <span>Bank Wire</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod("concierge")} className={`flex-1 py-2 px-3 border rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "concierge" ? "border-white bg-white/15 text-white" : "border-white/10 text-zinc-400 hover:border-white"}`}>
                      <FileText size={12}/>
                      <span>Concierge Invoice</span>
                    </button>
                  </div>

                  {/* Submission CTA Button */}
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 text-xs uppercase tracking-[0.28em] font-semibold bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all cursor-pointer shadow-2xl flex items-center justify-center space-x-2 mt-4">
                    <span>{isSubmitting ? "PROCESSING ACQUISITION..." : `CONFIRM ORDER · €${totalCalculated.toLocaleString()}`}</span>
                    <ChevronRight size={14}/>
                  </button>

                  <p className="text-[10px] text-zinc-500 text-center font-mono uppercase tracking-wider">
                    Secured by 256-bit Swiss Banking Encryption · Certified Place Vendôme Paris
                  </p>
                </div>

              </form>
            </div>

          </div>)}

      </div>
    </section>);
}
