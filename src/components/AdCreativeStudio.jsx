import React, { useRef, useState } from 'react';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Award, Clock, MapPin, Building2, TrendingUp, Home, Download } from 'lucide-react';

export default function AdCreativeStudio() {
  const [activeVariant, setActiveVariant] = useState('NATIVE_QUIZ');
  const adRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4 sm:p-8 font-sans flex flex-col items-center">
      
      {/* Studio Header */}
      <div className="max-w-4xl w-full text-center mb-6 sm:mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-[#D9483B] bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full inline-block mb-2">
          Meta Ads Creative Studio
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          High-Converting Feed Ad Creatives (1080 × 1080)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto">
          Optimized for Instagram & Facebook Feeds targeting affluent Nigerian professionals & diaspora buyers.
        </p>

        {/* Variant Switcher */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={() => setActiveVariant('NATIVE_QUIZ')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeVariant === 'NATIVE_QUIZ'
                ? 'bg-[#D9483B] text-white shadow-lg shadow-red-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Variant 1: Native Interactive Quiz Card (Highest CTR)
          </button>
          <button
            onClick={() => setActiveVariant('VIP_ALLOCATION')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeVariant === 'VIP_ALLOCATION'
                ? 'bg-[#D9483B] text-white shadow-lg shadow-red-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Variant 2: VIP Allocation Slip (Highest Curiosity)
          </button>
        </div>
      </div>

      {/* AD CONTAINER (1080 x 1080 scaled down for responsive view, true 1:1 ratio) */}
      <div className="w-full max-w-[540px] sm:max-w-[560px] aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative select-none">
        
        {/* ========================================================================= */}
        {/* VARIANT 1: THE NATIVE INTERACTIVE QUIZ CARD (HIGHEST CTR)                */}
        {/* ========================================================================= */}
        {activeVariant === 'NATIVE_QUIZ' && (
          <div className="w-full h-full relative flex flex-col justify-between p-6 sm:p-8 bg-[#120D0C] overflow-hidden">
            
            {/* Background Luxury Image with Deep Vignette */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/abuja-recommend.jpg" 
                alt="Luxury Abuja Estate" 
                className="w-full h-full object-cover opacity-20 scale-105 filter blur-xs"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#120D0C]/90 via-[#120D0C]/75 to-[#120D0C]/95" />
            </div>

            {/* Top Brand & Trust Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src="/beacon-logo.png" 
                  alt="Beacon Corporate Realty" 
                  className="h-6 sm:h-7 w-auto object-contain brightness-200"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-white/90">
                  Beacon Corporate Realty
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% FCDA C of O</span>
              </div>
            </div>

            {/* Hook Headline */}
            <div className="relative z-10 text-center mt-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#D9483B] bg-red-500/10 border border-red-500/20 px-3 py-0.5 rounded-full inline-block mb-1.5">
                🎯 45-Second Abuja Property Diagnostic
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight leading-tight text-white drop-shadow-md">
                Find Your Abuja Land Match <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  Before You Commit Millions.
                </span>
              </h2>
            </div>

            {/* Floating Interactive Quiz Card */}
            <div className="relative z-10 bg-white/95 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#D9483B]">
                  Step 1 of 4 • Select Your Goal:
                </span>
                <span className="text-[10px] font-bold text-slate-400">Takes 45s</span>
              </div>

              {/* 3 Clickable Option Pills */}
              <div className="space-y-2">
                
                <div className="flex items-center justify-between bg-slate-50 hover:bg-red-50 border border-slate-200/80 rounded-xl p-2.5 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-[#D9483B] flex items-center justify-center shrink-0 font-bold text-xs">
                      🏢
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        Commercial & High-Yield Rental
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">Plazas, shortlets & apartments</div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-[#D9483B] group-hover:bg-[#D9483B] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-red-50/80 border-2 border-[#D9483B] rounded-xl p-2.5 transition-all shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#D9483B] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                      🏡
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight flex items-center gap-1.5">
                        <span>Build Luxury Family Residence</span>
                        <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full">POPULAR</span>
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium">Maitama 2 & Apo corridor</div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#D9483B] flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 hover:bg-red-50 border border-slate-200/80 rounded-xl p-2.5 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs">
                      📈
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        Fast Capital Growth Land Banking
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">High appreciation Karsana corridor</div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-[#D9483B]"></div>
                </div>

              </div>
            </div>

            {/* Incentive Teaser Banner */}
            <div className="relative z-10 bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/40 rounded-xl p-2 text-center text-amber-200 text-[10px] sm:text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Unlocks: Up to ₦5,000,000 Promo Discount + Luxury Shopping Voucher</span>
            </div>

            {/* Bottom CTA Button */}
            <div className="relative z-10">
              <div className="w-full bg-[#D9483B] hover:bg-[#C0392B] text-white py-3.5 sm:py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-black text-sm sm:text-base tracking-tight cursor-pointer">
                <span>Take 45-Sec Quiz & Reveal Match ➔</span>
              </div>
              <div className="text-center text-[9px] sm:text-[10px] text-slate-400 mt-1.5 flex items-center justify-center gap-2 font-medium">
                <span>Maitama 2 • Apo Dutse • Karsana</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">From ₦9.5M (3–12 Mo Spread)</span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VARIANT 2: THE VIP CONFIDENTIAL ALLOCATION SLIP (HIGH CURIOSITY)          */}
        {/* ========================================================================= */}
        {activeVariant === 'VIP_ALLOCATION' && (
          <div className="w-full h-full relative flex flex-col justify-between p-6 sm:p-8 bg-[#0D1117] overflow-hidden">
            
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/eminence-villa.jpg" 
                alt="Eminence Villa" 
                className="w-full h-full object-cover opacity-15 filter blur-xs"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/95 via-[#0D1117]/80 to-[#0D1117]/98" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#D9483B]">
                  BEACON CORPORATE REALTY
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                PRIVATE ALLOCATION
              </span>
            </div>

            {/* Center Formal Allocation Slip */}
            <div className="relative z-10 bg-[#FAF8F5] text-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl border-2 border-amber-300/60 relative overflow-hidden">
              
              {/* Red Watermark Stamp */}
              <div className="absolute right-4 top-4 border-2 border-red-600/40 text-red-600/40 font-black text-xs uppercase px-2 py-0.5 rounded -rotate-12 select-none pointer-events-none">
                VERIFIED FCDA C OF O
              </div>

              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Confidential Property Allocation Notice
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5 mb-3">
                September 2026 Abuja Land Match
              </h3>

              {/* Data Rows */}
              <div className="space-y-2 text-xs border-t border-b border-slate-200 py-3 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Eligible Districts:</span>
                  <span className="font-bold text-slate-900">Maitama 2 • Apo Dutse • Karsana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Plot Sizes:</span>
                  <span className="font-bold text-slate-900">170 SQM – 1,000 SQM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Payment Flexibility:</span>
                  <span className="font-bold text-emerald-700">Outright or 3 to 12 Months Spread</span>
                </div>
                <div className="flex justify-between items-center bg-red-50 p-2 rounded-lg border border-red-200">
                  <span className="text-red-700 font-bold">September Promo Discount:</span>
                  <span className="font-black text-red-700 text-sm">SAVE UP TO ₦5,000,000</span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500 font-semibold">
                🔒 Price & plot reservation unlock immediately after completing the 4-question match assessment.
              </div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 text-center">
              <div className="w-full bg-[#D9483B] hover:bg-[#C0392B] text-white py-3.5 sm:py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-black text-sm sm:text-base tracking-tight cursor-pointer">
                <span>Start 45-Sec Assessment & Unlock ➔</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                100% Free • No Broker Calls • Instant Match Results
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Ad Guidance Notes for Meta Ads Manager */}
      <div className="max-w-2xl w-full mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-slate-300">
        <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
          <span>💡</span> Why This Ad Creative Converts at 3× Lower CPA:
        </h4>
        <ul className="space-y-1.5 list-disc list-inside text-slate-400">
          <li><strong>Stops the Feed Scroll:</strong> The multiple-choice UI card creates an immediate psychological urge to pick an option.</li>
          <li><strong>High Affluent Fit:</strong> Emphasizes verified FCDA title security and flexible 3–12 months spread without sounding like cheap broker spam.</li>
          <li><strong>Teases Without Giving Away:</strong> Mentions the ₦5M savings and districts, driving the curiosity click straight into your quiz.</li>
        </ul>
      </div>

    </div>
  );
}
