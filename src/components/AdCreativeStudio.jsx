import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Clock, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Home, 
  Download,
  Copy,
  Check,
  FileText,
  BadgePercent
} from 'lucide-react';
import { CONFIG } from '../quizConfig';

export default function AdCreativeStudio() {
  const [activeVariant, setActiveVariant] = useState('DESIGN_1_MATCHER');
  const [copiedSection, setCopiedSection] = useState('');

  const copyToClipboard = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2500);
  };

  const adDesigns = [
    {
      id: 'DESIGN_1_MATCHER',
      label: 'Creative 1: Kaduna Plot Matcher Grid',
      image: '/arewa_ad_01_matcher.jpg',
      downloadName: 'arewa_ad_01_matcher.jpg',
      tagline: 'High-CTR 2x2 Curiosity Grid • Navy Estate Matcher Template • New Millennium City',
      badge: '🎯 2x2 Plot Matcher',
      headline: 'Attention: Kaduna Land Buyers',
      desc: 'Take the 45-Second Arewa Residences Plot Matcher • 50% Presale Equity',
      targeting: 'Kaduna Land Buyers, Abuja Corporate Professionals with Northern Roots (Ages 28–60)',
      copyText: `ATTENTION: KADUNA LAND BUYERS

Are you planning to build a family home, develop rental apartments, or secure high-growth land in Kaduna this year?

Before committing your funds, take the 45-second Arewa Residences plot matcher.

Answer 4 quick questions to find out:
📍 Which plot size matches your building objective (170 SQM, 250 SQM, 450 SQM, or 900 SQM)
💰 How to lock in 50% early-bird presale savings before public launch
📑 How to verify our genuine C of O title with KADGIS
📅 How to reserve a priority VIP site inspection pass

Arewa Residences is situated in New Millennium City, Kaduna — directly on a tarred road and surrounded by elite security.

Only 25 early allocations are available in Batch 1.

👉 Tap "Find Your Plot Match" below to take the 45-second assessment:`
    },
    {
      id: 'DESIGN_2_MAITAMA',
      label: 'Creative 2: The Maitama of Kaduna Pre-Launch',
      image: '/arewa_ad_02_maitama.jpg',
      downloadName: 'arewa_ad_02_maitama.jpg',
      tagline: 'Beacon Official Branding • Neon Glow VIP Card • Ungwan Rimi Border Proof',
      badge: '🔥 Maitama Pre-Launch',
      headline: 'The Maitama of Kaduna Pre-Launch is Here',
      desc: 'Secret VIP Pre-Launch • Only 25 Plots • 100% KADGIS Verified Title',
      targeting: 'High-Net-Worth Kaduna Investors, Diaspora Returnees, Ungwan Rimi Neighbors',
      copyText: `If you’ve tried buying land in Ungwan Rimi recently, you already know the story:

A plot now costs upwards of ₦40M to ₦60M+ — if you can even find anyone willing to sell.

That’s why smart money in Kaduna is quietly moving across the bridge to New Millennium City.

It is the natural expansion corridor of Kaduna’s elite — right next to Ungwan Rimi, but at opening presale rates.

Beacon Corporate Realty Ltd has officially opened the Secret VIP Pre-Launch for Arewa Residences:

✔️ Border with Ungwan Rimi (Natural expansion corridor)
✔️ 100% KADGIS Verified C of O Title
✔️ Near Nigerian Navy Base & President Tinubu-commissioned General Hospital
✔️ Priority Pre-Launch Inspection Pass Included
✔️ 50% Presale Discount:
   • 170 SQM (Terrace): ₦4.55M (Launch: ₦7M)
   • 250 SQM (Semi-Detached): ₦7.15M (Launch: ₦11M)
   • 450 SQM (Executive Detached): ₦11.7M (Launch: ₦18M)
   • 900 SQM (Rental Flats): ₦23.4M (Launch: ₦36M)

Strictly limited to the first 25 allocations.

👉 Tap below to take our 45-second assessment and claim your presale plot:`
    },
    {
      id: 'DESIGN_3_AUTHORITY',
      label: 'Creative 3: Buy & Build Tarred Road Authority',
      image: '/arewa_ad_03_authority.jpg',
      downloadName: 'arewa_ad_03_authority.jpg',
      tagline: 'Job Closer/Executive Persona Style • Asphalt Road Frontage • Zero Bush Paths',
      badge: '🛣️ Tarred Road Authority',
      headline: 'Buy & Build Directly on a Tarred Road',
      desc: '100% KADGIS C of O Title • Presale Rates from ₦4.55M • New Millennium City',
      targeting: 'Civil Servants, Doctors, Engineers, Families Ready to Start Construction Immediately',
      copyText: `The biggest headache when buying land in Kaduna isn’t the price.

It’s buying inside unpaved bush paths where your car gets stuck in the rainy season, or fighting endless customary boundary claims.

Arewa Residences in New Millennium City gives you complete peace of mind:

✅ Directly on a smooth asphalt tarred road (zero rugged bush pathways)
✅ 100% C of O Title — verifiable directly at KADGIS
✅ Solid dry land ready for immediate foundation laying
✅ Neighboring the Nigerian Navy Base and Police Housing Estate

Presale rates are open with flexible 3-month payment plans:
🏡 250 SQM Semi-Detached: ₦7.15M (Launch: ₦11M)
🏛️ 170 SQM Terrace: ₦4.55M (Launch: ₦7M)
💎 450 SQM Detached Duplex: ₦11.7M (Launch: ₦18M)

Lock in your 50% early-bird equity today before public launch price adjustments.

👉 Tap below to take the 45-second assessment and book a verified site inspection this week:`
    },
    {
      id: 'DESIGN_4_PORTAL',
      label: 'Creative 4: Official Presale Portal & Gold Seal',
      image: '/arewa_ad_04_portal.jpg',
      downloadName: 'arewa_ad_04_portal.jpg',
      tagline: 'Navy Application Slip Template • Gold Starburst Seal • Marble Architectural Window',
      badge: '🏛️ Official Portal',
      headline: 'Arewa Residences: Presale Allocations Now Open',
      desc: 'Plots From ₦4.55M • 100% Verified KADGIS Title • New Millennium City, Kaduna',
      targeting: 'Broad Kaduna Audience, Investors Seeking Subsidized Presale Entries, Abuja Diaspora',
      copyText: `OFFICIAL PRESALE ALLOCATION NOTICE

Arewa Residences is now officially open for presale allocations in New Millennium City, Kaduna.

Developed by Beacon Corporate Realty Ltd, this development offers:
🏛️ 100% Verified KADGIS Certificate of Occupancy (C of O)
🛣️ Paved tarred road infrastructure straight to your plot gate
⚡ Underground power provisions and perimeter security
💰 50% Off Opening Presale Rates: Starting from ₦4.55M

Plots available on outright payment or structured 3-month installment plans.

Allocations in Batch 1 are capped at 25 plots.

👉 Tap "Check Your Eligibility & Allocation" to complete our 45-second screening and reserve your inspection pass:`
    }
  ];

  const currentDesign = adDesigns.find(d => d.id === activeVariant);

  return (
    <div className="min-h-screen bg-[#070D18] text-white p-4 sm:p-8 font-sans flex flex-col items-center selection:bg-[#B8001F] selection:text-white">
      
      {/* Studio Header */}
      <div className="max-w-4xl w-full text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-500/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <span>🏛️</span> Beacon Corporate Realty Ltd • Kaduna Meta Ads Studio
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          High-Converting Feed Ad Creatives (1:1 Square)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xl mx-auto font-medium">
          Branded specifically with the <strong>Beacon Logo</strong> and <strong>New Millennium City, Kaduna</strong> address.
        </p>

        {/* Variant Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {adDesigns.map(design => (
            <button
              key={design.id}
              onClick={() => setActiveVariant(design.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeVariant === design.id
                  ? 'bg-[#B8001F] text-white border border-red-400 shadow-lg shadow-red-900/40 ring-2 ring-red-300'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>{design.badge}</span>
              <span>{design.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AD PREVIEW CONTAINER */}
      {currentDesign && (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: IMAGE PREVIEW & DOWNLOAD */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 relative group">
              <img 
                src={currentDesign.image} 
                alt={currentDesign.label} 
                className="w-full h-full object-cover select-none"
              />
            </div>

            <div className="w-full flex items-center justify-between mt-4 bg-white/5 border border-white/10 rounded-2xl p-3.5 px-4 backdrop-blur-md">
              <div>
                <div className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <span>{currentDesign.badge}</span>
                  <span>{currentDesign.label}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {currentDesign.tagline}
                </div>
              </div>

              <a
                href={currentDesign.image}
                download={currentDesign.downloadName}
                className="bg-[#B8001F] hover:bg-red-700 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download (1080x1080)</span>
              </a>
            </div>
          </div>

          {/* RIGHT: AD COPY SWIPE CARD */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-white/10 rounded-2xl p-5 sm:p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>📋</span> Matching Ad Copy
                </h3>
                <p className="text-[11px] text-slate-400">Copy &amp; paste directly into Meta Ads Manager</p>
              </div>
              <button
                onClick={() => copyToClipboard(currentDesign.copyText, `copy_${currentDesign.id}`)}
                className="bg-[#B8001F] hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                {copiedSection === `copy_${currentDesign.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === `copy_${currentDesign.id}` ? 'Copied Full Copy!' : 'Copy Text'}</span>
              </button>
            </div>

            {/* Headline & Description */}
            <div className="grid grid-cols-1 gap-2.5 mb-3.5">
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#B8001F] block mb-1">
                  Headline:
                </span>
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{currentDesign.headline}</span>
                  <button 
                    onClick={() => copyToClipboard(currentDesign.headline, `h_${currentDesign.id}`)}
                    className="text-slate-400 hover:text-white ml-2 p-1"
                  >
                    {copiedSection === `h_${currentDesign.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                  Description:
                </span>
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{currentDesign.desc}</span>
                  <button 
                    onClick={() => copyToClipboard(currentDesign.desc, `d_${currentDesign.id}`)}
                    className="text-slate-400 hover:text-white ml-2 p-1"
                  >
                    {copiedSection === `d_${currentDesign.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Text */}
            <div className="mb-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Primary Text (Body):
              </span>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed max-h-[260px] overflow-y-auto">
                {currentDesign.copyText}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 flex flex-col gap-1">
              <div>🎯 <strong>Target Audience:</strong> {currentDesign.targeting}</div>
              <div>📍 <strong>Estate Location:</strong> New Millennium City, Kaduna</div>
              <div>🔘 <strong>Recommended CTA Button:</strong> <em>Apply Now</em> or <em>Learn More</em></div>
            </div>
          </div>

        </div>
      )}

      {/* Ad Strategy Breakdown */}
      <div className="max-w-4xl w-full mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-slate-300">
        <h4 className="font-bold text-white text-sm mb-2.5 flex items-center gap-2">
          <span>💡</span> Why These 4 Exact Layouts Deliver Massive ROAS:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-400">
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">1. Plot Matcher (Navy Model):</strong>
            Proven 2x2 grid that compels Kaduna land buyers to interact and click straight into the assessment quiz.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">2. Maitama Pre-Launch:</strong>
            Capitalizes on the prestigious Ungwan Rimi spillover hook with Beacon Corporate Realty VIP scarcity.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">3. Tarred Road Authority:</strong>
            Uses our proven Job Closer / High-Ticket executive format to show asphalt road reality and eliminate bush doubts.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">4. Official Portal &amp; Seal:</strong>
            Replicates our Navy Form JVA style with gold starburst seal for undeniable institutional trust.
          </div>
        </div>
      </div>

    </div>
  );
}
