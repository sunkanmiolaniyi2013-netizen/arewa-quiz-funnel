import { useState, useEffect } from 'react';
import { Download, Clock, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function VolcanoOutcome() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = timeLeft > 0 ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : 'EXPIRED';

  const downloadGuide = () => {
    window.open("https://assets.cdn.filesafe.space/ShmWKPtFl0vRgBAVTR4F/media/6a846ea862d4d706d4c99357.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#10B981]/30 text-[#0F172A]">
      
      {/* Top Countdown & Open Loop Inoculation Banner */}
      <div className="bg-[#0F172A] text-white py-3 px-4 sticky top-0 z-50 shadow-md border-b border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#10B981] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Instant Access</span>
            <span className="text-white/90">Your Free DIY Database Reactivation & List-Building Playbook is ready below.</span>
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-[#FFCC00] shrink-0">
            <Clock className="w-4 h-4 text-[#FFCC00]" />
            <span>SESSION EXPIRES: {timeDisplay}</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <header className="bg-gradient-to-b from-white to-[#F1F5F9] py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#0F172A] font-extrabold text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span>Small Business Growth Diagnostic Result</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6">
            Your Business Growth Stage: <br />
            <span className="text-[#10B981] underline decoration-[#10B981]/40">THE GROWTH INCUBATOR</span>
          </h1>

          {/* Bucket Badge Row */}
          <div className="inline-flex items-center gap-4 bg-white p-3 px-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#10B981] shadow-sm bg-white shrink-0">
              <img src="/icon-untapped-volcano.png" alt="Growth Incubator" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Diagnosed Stage</span>
              <span className="text-2xl font-black text-[#0F172A]">Profile GI: The Growth Incubator</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Early-stage database (under 1,000 leads) or offer under $100 price point. Your primary mission is list building, offer validation, and establishing cost-effective lead flow.
          </p>
        </div>
      </header>

      {/* Detailed Written Outcome Body Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-12">

        {/* STEP 1: Introduction */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#10B981]">01.</span> Welcome to Your Growth Roadmap
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Thank you for completing the <strong>#1 Lead Killer Audit</strong>. My name is <strong>David Olaniyi</strong>, Founder of <strong>STRATAVIN LLC</strong>.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            We created this assessment to give business owners absolute clarity on where their lead generation and follow-up pipelines stand right now—and exactly how to scale to the next level.
          </p>
        </section>

        {/* STEP 2 & 3: What Being in Bucket 4 Means */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#10B981]">02.</span> What "The Growth Incubator" Means For You
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Based on the information you shared, you are either in the early stages of building your business database (currently under 1,000 contacts), or you operate a product/service under the $100 price point.
          </p>
          <p className="text-slate-700 leading-relaxed text-base font-semibold text-[#0F172A] bg-[#10B981]/10 p-4 rounded-xl border-l-4 border-[#10B981]">
            At this foundation stage, your primary focus should be list building, offer validation, and establishing core lead flow. You don't need expensive sales reps or enterprise agency retainers yet—what you need is a simple, cost-effective DIY system to build your list to 1,000+ leads!
          </p>
        </section>

        {/* STEP 4 & 5: Mistakes to Avoid */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2 text-amber-600">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>03. Mistakes Early-Stage Businesses Must Avoid</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            The single biggest mistake business owners make in <strong>The Growth Incubator</strong> stage is trying to hire high-ticket DFY agencies or buying expensive software before their database is large enough.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">Premature Retainer Costs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When your list has fewer than 1,000 contacts, paying an agency $2,000/month produces zero ROI.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">Wasted Ad Capital</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capital is better spent testing lead hooks and scaling your database past 1,000 contacts first.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 6: Free DIY Playbook Toolkit */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-2 border-[#10B981]/30 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
            Free DIY Toolkit
          </div>

          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#10B981]" />
            <span>04. Your Free DIY Database & List-Building Playbook</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            We have compiled our exact step-by-step scripts, SMS templates, and list-building frameworks into a free resource: <strong>"The DIY Database Reactivation & List-Building Playbook (PDF)"</strong>.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>1. The 17-Word Prince Charming Script:</strong> How to convert your first 50 contacts into paying clients without pushy sales pitches.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>2. 60-Day List Expansion Strategy:</strong> 3 simple ad campaigns to grow your CRM database past 1,000 leads.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>3. Zero-Cost CRM Setup:</strong> How to set up basic automated follow-ups in GoHighLevel or Mailchimp.</span>
            </div>
          </div>
        </section>

        {/* STEP 7: Scaling Pathway & Free Download CTA */}
        <section id="booking-cta-section" className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-6 border border-white/10">
          
          <div className="inline-block bg-[#10B981] text-white font-black text-xs uppercase px-4 py-1.5 rounded-full tracking-widest">
            Free PDF Download
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Download Your DIY Playbook Now
          </h2>

          <p className="text-white/85 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Once your database reaches <strong>1,000+ mobile-reachable leads</strong> and your offer reaches <strong>$100+ per deal</strong>, you will qualify for our 100% Performance-Based DFY AI Revenue Engine!
          </p>

          <div className="pt-2 pb-4">
            <a 
              href="https://assets.cdn.filesafe.space/ShmWKPtFl0vRgBAVTR4F/media/6a846ea862d4d706d4c99357.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFCC00] hover:bg-[#E6B800] text-[#0F172A] font-black py-4 px-8 sm:px-12 rounded-xl text-base sm:text-lg tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 w-full sm:w-auto inline-flex items-center justify-center gap-3 transform hover:-translate-y-0.5 no-underline"
            >
              <Download className="w-5 h-5" />
              <span>👉 CLICK HERE TO DOWNLOAD YOUR FREE DIY PLAYBOOK (PDF) NOW</span>
            </a>
            <p className="text-xs text-white/60 font-medium mt-3">
              🔒 100% Free Instant Download. No Credit Card Required. Join our Growth VIP Newsletter.
            </p>
          </div>

        </section>

      </main>

      {/* Unified Footer */}
      <footer className="bg-[#0F172A] text-center py-8 text-white text-xs font-semibold tracking-wide border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="opacity-90 font-medium">
            © 2026 STRATAVIN LLC. All rights reserved. | David Olaniyi Performance Revenue Engines
          </div>
          <div className="flex gap-6 uppercase opacity-90 font-bold text-[11px] text-[#FFCC00]">
            <a href="#" className="hover:underline transition-all">About Us</a>
            <a href="#" className="hover:underline transition-all">Terms of Service</a>
            <a href="#" className="hover:underline transition-all">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
