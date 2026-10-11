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
  const [activeVariant, setActiveVariant] = useState('DESIGN_1_SPILLOVER');
  const [copiedSection, setCopiedSection] = useState('');

  const copyToClipboard = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2500);
  };

  const adDesigns = [
    {
      id: 'DESIGN_1_SPILLOVER',
      label: 'Creative 1: Ungwan Rimi Spillover & Gatehouse',
      image: '/arewa_ad_01_spillover.jpg',
      downloadName: 'arewa_ad_01_spillover.jpg',
      tagline: 'High-Converting Gatehouse Visual • 50% Presale Equity • New Millennium City',
      badge: '🏛️ Estate Entrance',
      headline: 'Missed Ungwan Rimi 10 Years Ago? Don’t Miss This.',
      desc: '50% Early Bird Presale • Genuine C of O Title • New Millennium City',
      targeting: 'Kaduna Indigenes, Abuja Corporate Professionals, Business Owners (Ages 30–60)',
      copyText: `If you’ve tried buying land in Ungwan Rimi recently, you already know the story:

A plot now costs upwards of ₦40M to ₦60M+ — if you can even find anyone willing to sell.

That’s why the smart money in Kaduna is quietly moving across the bridge to New Millennium City. 

It is the natural expansion corridor of Kaduna’s elite — right next to Ungwan Rimi, but at a fraction of the cost.

And right now, Beacon Corporate Realty has opened presale allocations for Arewa Residences:

✅ Directly on a tarred road (smooth asphalt straight to your plot)
✅ 100% C of O Title (fully verifiable at KADGIS)
✅ Surrounded by top security & landmarks (Navy Base, Police Housing, New General Hospital)
✅ 50% Off Presale Entry before public launch:
   • 170 SQM (Terrace Duplex): ₦4.55M (Launch: ₦7M)
   • 250 SQM (Semi-Detached): ₦7.15M (Launch: ₦11M)
   • 450 SQM (Executive Detached): ₦11.7M (Launch: ₦18M)
   • 900 SQM (Commercial / Rental Flats): ₦23.4M (Launch: ₦36M)

Only 25 presale plots are being released at these early-bird rates.

👉 Take our 45-second assessment to check plot availability and claim your 50% presale allocation before slots run out:`
    },
    {
      id: 'DESIGN_2_TARREDROAD',
      label: 'Creative 2: Buy & Build on Asphalt Tarred Road',
      image: '/arewa_ad_02_tarredroad.jpg',
      downloadName: 'arewa_ad_02_tarredroad.jpg',
      tagline: 'Directly on Tarred Road • Verified KADGIS C of O • Zero Bush Paths',
      badge: '🛣️ Tarred Road',
      headline: 'Zero Disputes. 100% Tarred Road. Genuine C of O.',
      desc: 'Verified at KADGIS • Start Building Immediately • New Millennium City',
      targeting: 'Kaduna Civil Servants, Doctors, Engineers, Married Couples looking to build (Ages 30–55)',
      copyText: `The biggest mistake people make when buying land in Kaduna isn’t paying too much.

It’s buying land inside thick bushes with no tarred road access, or worse — dealing with customary community disputes that stall your building for years.

If your dream is to build a peaceful, secure family home, here is what genuine peace of mind looks like:

Introducing Arewa Residences — New Millennium City, Kaduna.

Here is what is guaranteed the moment you secure your allocation:

1️⃣ 100% C of O Title — clean, clear, government-backed, and verifiable at KADGIS before you commit.
2️⃣ Directly on an asphalt-tarred road — zero rugged bush paths or mud access.
3️⃣ 100% Dry, Solid Ground — ready for immediate foundation laying.
4️⃣ Elite Neighborhood Security — stone's throw from the Nigerian Navy Base and Police Housing Estate.

Presale allocations are officially open with 50% early-bird pricing and flexible 3-month payment plans:

🏡 250 SQM (Semi-Detached Duplex): ₦7.15M (Launch: ₦11M)
🏛️ 170 SQM (Terrace Duplex): ₦4.55M (Launch: ₦7M)
💎 450 SQM (Executive Detached): ₦11.7M (Launch: ₦18M)

Don’t wait until the estate is fully built and prices double. 

👉 Click below to complete our 45-second assessment and book a verified private site inspection this week:`
    },
    {
      id: 'DESIGN_3_PLOTGRID',
      label: 'Creative 3: 4-Quadrant Plot Matcher (High CTR)',
      image: '/arewa_ad_03_plotgrid.jpg',
      downloadName: 'arewa_ad_03_plotgrid.jpg',
      tagline: '2x2 Social Feed Matcher • 4 Housing Archetypes • Drives High Quiz Completion',
      badge: '🎯 2x2 Plot Matcher',
      headline: 'Check Which Plot Matches Your Budget (45 Seconds)',
      desc: 'Millennium City Kaduna • 50% Presale Discount • 4 Plot Sizes',
      targeting: 'Broad Real Estate Interest, Kaduna & Abuja Investors, First-Time Land Buyers',
      copyText: `Are you planning to build a home, generate rental income, or land bank in Kaduna this year?

Before you commit your hard-earned money, take our 45-second plot allocation assessment.

Answer 4 quick questions to find out:
📍 Which plot size fits your building plans (Terrace, Semi-Detached, Detached Duplex, or Rental Flats)
💰 How to lock in 50% early-bird presale savings (starting from ₦4.55M)
📑 How to verify our genuine C of O title with KADGIS
📅 How to reserve a VIP site inspection slot with our development team

Arewa Residences is located in New Millennium City, directly on a tarred road and bordered by elite institutions.

Only 25 early allocations are approved for this opening batch.

👉 Tap the link below to take the 45-second assessment and see available plots now:`
    },
    {
      id: 'DESIGN_4_LEGACY',
      label: 'Creative 4: Diaspora & Generational Legacy Home',
      image: '/arewa_ad_04_diaspora_legacy.jpg',
      downloadName: 'arewa_ad_04_diaspora_legacy.jpg',
      tagline: 'Aspirational Villa Twilight • Pride of Homecoming • Stress-Free Remote Buying',
      badge: '👑 Diaspora Legacy',
      headline: 'Build in Kaduna from Abuja, Lagos, or Abroad',
      desc: 'Verified C of O • Tarred Road • Trusted Developer: Beacon Corporate Realty',
      targeting: 'Kaduna Diaspora (UK, US, Canada, Saudi Arabia, UAE, Lagos & Abuja Executives)',
      copyText: `To every Kaduna indigene living in Abuja, Lagos, or abroad:

You’ve worked hard, and you’ve always wanted a dignified, secure home of your own in Kaduna — for holidays, for your family, or for retirement.

The challenge? 
Sending money to relatives or unverified agents who end up buying disputed land without documents or road access.

Beacon Corporate Realty is changing that with Arewa Residences (New Millennium City).

We provide institutional transparency from start to finish:
✔️ KADGIS-verifiable Certificate of Occupancy (C of O) in your name.
✔️ Prime tarred-road frontage in Kaduna’s most organized master plan.
✔️ Proximity to the Nigerian Navy Base, General Hospital, and NNPC quarters.
✔️ Direct virtual or physical inspection protocols with our corporate legal team.

Presale Tier 1 Outright Rates (Limited to 25 allocations):
• 170 SQM: ₦4.55M (Launch: ₦7M)
• 250 SQM: ₦7.15M (Launch: ₦11M)
• 450 SQM: ₦11.7M (Launch: ₦18M)
• 900 SQM: ₦23.4M (Launch: ₦36M)

Lock in your 50% presale equity today with our flexible 3-month payment plans.

👉 Take the 45-second assessment to request your developer information pack and book your private inspection slot:`
    }
  ];

  const currentDesign = adDesigns.find(d => d.id === activeVariant);

  return (
    <div className="min-h-screen bg-[#070D18] text-white p-4 sm:p-8 font-sans flex flex-col items-center selection:bg-[#B8001F] selection:text-white">
      
      {/* Studio Header */}
      <div className="max-w-4xl w-full text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#B8001F] bg-red-950/60 border border-red-500/30 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <span>🔥</span> Meta Ads Creative Studio • Arewa Residences Kaduna
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          High-Converting Feed Ad Creatives (1:1 Square)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xl mx-auto font-medium">
          Ready-to-launch visual assets &amp; direct-response copy swipe files for Beacon Corporate Realty.
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
                <p className="text-[11px] text-slate-400">Optimized for Meta Ads Manager (Feed &amp; Reels)</p>
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
              <div>🔘 <strong>Recommended CTA Button:</strong> <em>Apply Now</em> or <em>Learn More</em></div>
            </div>
          </div>

        </div>
      )}

      {/* Ad Strategy Breakdown */}
      <div className="max-w-4xl w-full mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-slate-300">
        <h4 className="font-bold text-white text-sm mb-2.5 flex items-center gap-2">
          <span>💡</span> Why These 4 Ad Visuals &amp; Angles Convert at Scale:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-400">
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">1. Gatehouse Authority:</strong>
            Establishes instant institutional permanence and elite location credibility in New Millennium City.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">2. Tarred Road Proof:</strong>
            Kills the #1 Kaduna objection: inaccessible bush paths and lack of infrastructure.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">3. 2x2 Plot Matcher:</strong>
            High-CTR curiosity driver that prompts prospects to test which plot matches their exact budget.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">4. Diaspora Pride:</strong>
            Triggers high emotional connection with indigenes wanting an honorable home back in Kaduna.
          </div>
        </div>
      </div>

    </div>
  );
}
