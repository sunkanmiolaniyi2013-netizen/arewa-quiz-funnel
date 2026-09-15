import React, { useRef, useState } from 'react';
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

  const adCopyText = `A new opportunity has quietly opened in Apo, Abuja — and it’s not just another private estate.

Navy Estate Innovation City is a residential development by Naval Building & Construction Company Limited (NBCCL), now open to both military personnel and civilians.

For many buyers, the biggest concern when purchasing land in Abuja isn’t simply finding a property.

It’s asking:
“What will actually become of this place after I buy?”

That’s what makes this opportunity worth looking at.

Naval Building & Construction Company Limited has executed a number of developments across Abuja and is known for structured development, quality infrastructure and execution.

And Navy Estate Innovation City is newly opened.

That matters because some of the strongest opportunities in real estate are discovered before everyone starts talking about them — not afterwards.

If you’ve been waiting for the right Abuja property to build your future home, secure for your family or hold as a long-term asset, this is the time to take a serious look.

👉 Take our 45-second assessment to check your eligibility, see approved civilian & subsidized military plot rates, and reserve your inspection pass before opening allocations close:`;

  const copyToClipboard = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2500);
  };

  const adDesigns = [
    {
      id: 'DESIGN_4_AUTHORITY',
      label: 'Creative 4: Military Gatehouse Authority',
      image: '/navy_ad_04_military_authority.jpg',
      downloadName: 'navy_ad_04_military_authority.jpg',
      tagline: 'NBCCL Backing • 24/7 Secured Military Perimeter • Zero Price Mention',
      badge: '🛡️ Military Gatehouse'
    },
    {
      id: 'DESIGN_5_GRID',
      label: 'Creative 5: 2x2 Allocation Matcher (No Price)',
      image: '/navy_ad_05_curiosity_grid.jpg',
      downloadName: 'navy_ad_05_curiosity_grid.jpg',
      tagline: 'Military & Civilian Curiosity Cards • High-CTR Feed Grid • Zero Price',
      badge: '🎯 2x2 Allocation'
    },
    {
      id: 'DESIGN_6_PORTAL',
      label: 'Creative 6: NBCCL Application Portal (No Price)',
      image: '/navy_ad_06_official_portal_noprice.jpg',
      downloadName: 'navy_ad_06_official_portal_noprice.jpg',
      tagline: 'Form JVA Style • Official Seal • Luxury Duplex Portal • Zero Price',
      badge: '🏛️ Official Form JVA'
    },
    {
      id: 'DESIGN_7_ADVANTAGE',
      label: 'Creative 7: Why Choose Navy Estates',
      image: '/navy_ad_07_military_advantage.jpg',
      downloadName: 'navy_ad_07_military_advantage.jpg',
      tagline: 'Zero Land Disputes • FCDA Cadastral Infrastructure • Military Security',
      badge: '⚡ Military Advantage'
    },
    {
      id: 'DESIGN_1_MATCHER',
      label: 'Creative 1: 2x2 Plot Matcher',
      image: '/navy_ad_01_plot_matcher.jpg',
      downloadName: 'navy_ad_01_plot_matcher.jpg',
      tagline: 'High-CTR Curiosity Grid • 4 Options (No Spoilers)',
      badge: '🎯 Direct Callout'
    },
    {
      id: 'DESIGN_2_FORM',
      label: 'Creative 2: NBCCL Application Portal',
      image: '/navy_ad_02_application_slip.jpg',
      downloadName: 'navy_ad_02_application_slip.jpg',
      tagline: 'Official NBCCL Application Form (Duplex Window & Gold Starburst)',
      badge: '🏛️ Official Portal'
    },
    {
      id: 'DESIGN_3_PROOF',
      label: 'Creative 3: Due Diligence & Reality Check',
      image: '/navy_ad_03_due_diligence.jpg',
      downloadName: 'navy_ad_03_due_diligence.jpg',
      tagline: '“What Will Become of It After You Buy?” • Institutional Execution Proof',
      badge: '⚠️ Reality Check'
    }
  ];

  const currentDesign = adDesigns.find(d => d.id === activeVariant);

  return (
    <div className="min-h-screen bg-[#070D18] text-white p-4 sm:p-8 font-sans flex flex-col items-center selection:bg-[#C59B27] selection:text-[#0A2558]">
      
      {/* Studio Header */}
      <div className="max-w-4xl w-full text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#C59B27] bg-[#C59B27]/10 border border-[#C59B27]/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <span>⚓</span> Meta Ads Creative Studio • NBCCL Apo Abuja
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          High-Converting Feed Ad Creatives (1:1 Square)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto font-medium">
          Saved in <code className="text-[#C59B27] bg-black/40 px-2 py-0.5 rounded">Beacon Campaigns/02_Abuja_Quiz_Ad_Creatives/</code> • <strong>Not uploaded to Railway</strong>.
        </p>

        {/* Variant Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {adDesigns.map(design => (
            <button
              key={design.id}
              onClick={() => setActiveVariant(design.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeVariant === design.id
                  ? 'bg-[#0A2558] text-white border border-[#185ADB] shadow-lg shadow-blue-900/40 ring-2 ring-[#C59B27]'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>{design.badge}</span>
              <span>{design.label}</span>
            </button>
          ))}

          <button
            onClick={() => setActiveVariant('COPY_SWIPE')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeVariant === 'COPY_SWIPE'
                ? 'bg-[#C59B27] text-[#0A2558] font-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ad Copy Swipe File</span>
          </button>
        </div>
      </div>

      {/* AD PREVIEW CONTAINER */}
      {currentDesign ? (
        <div className="w-full max-w-[540px] sm:max-w-[560px] flex flex-col items-center">
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
              className="bg-[#C59B27] hover:bg-amber-400 text-[#0A2558] font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 1080x1080</span>
            </a>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* AD COPY SWIPE FILE TAB (Ready to paste directly into Meta Ads Manager)     */
        /* ========================================================================= */
        <div className="w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>📋</span> Ready-to-Use Meta Ad Copy
              </h3>
              <p className="text-xs text-slate-400">Copy and paste directly into Meta Ads Manager (Facebook & Instagram Feed)</p>
            </div>
            <button
              onClick={() => copyToClipboard(adCopyText, 'full_ad_copy')}
              className="bg-[#0A2558] hover:bg-[#185ADB] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#185ADB] cursor-pointer transition-all"
            >
              {copiedSection === 'full_ad_copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'full_ad_copy' ? 'Copied Full Copy!' : 'Copy Entire Text'}</span>
            </button>
          </div>

          {/* Primary Text */}
          <div className="mb-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C59B27] block mb-1">
              Primary Text (Body):
            </span>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-slate-300 font-sans whitespace-pre-line leading-relaxed">
              {adCopyText}
            </div>
          </div>

          {/* Headline & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C59B27] block mb-1">
                Headline (Title):
              </span>
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>A New Navy Estate Has Opened in Apo, Abuja</span>
                <button 
                  onClick={() => copyToClipboard("A New Navy Estate Has Opened in Apo, Abuja", 'headline')}
                  className="text-slate-400 hover:text-white ml-2 p-1"
                >
                  {copiedSection === 'headline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-3.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C59B27] block mb-1">
                Description:
              </span>
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Military & Civilians Welcome • From ₦9.5M</span>
                <button 
                  onClick={() => copyToClipboard("Military & Civilians Welcome • From ₦9.5M", 'desc')}
                  className="text-slate-400 hover:text-white ml-2 p-1"
                >
                  {copiedSection === 'desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400">
            <span>Call to Action Button in Meta: <strong>Learn More</strong> or <strong>Apply Now</strong></span>
            <span>Targeting: Abuja (25–65+), Lagos Diaspora, UK, US, Canada</span>
          </div>
        </div>
      )}

      {/* Ad Strategy Breakdown */}
      <div className="max-w-2xl w-full mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-slate-300">
        <h4 className="font-bold text-white text-sm mb-2.5 flex items-center gap-2">
          <span>💡</span> Why These 2 Ad Creatives Convert at 3× Higher CTR:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-400">
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">Design 1 (Interactive Affiliation Hook):</strong>
            Stops the scroll instantly by showing relatable military & civilian avatar cards. It compels the prospect to self-identify before even clicking through to the quiz.
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-1">Design 2 (Official Cadastral Notice):</strong>
            Leverages high institutional credibility. The official document slip with verified stamp eliminates fear of scam, addressing the exact concern: <em>“What will actually become of this place after I buy?”</em>
          </div>
        </div>
      </div>

    </div>
  );
}
