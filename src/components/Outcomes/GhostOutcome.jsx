import { useState, useEffect } from 'react';
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';

export default function GhostOutcome() {
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

  const openCalendar = () => {
    window.open("https://api.leadconnectorhq.com/widget/bookings/coffee-date-with-david-olaniyi", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#8B5CF6]/30 text-[#0F172A]">
      
      {/* Top Countdown & Open Loop Inoculation Banner */}
      <div className="bg-[#0F172A] text-white py-3 px-4 sticky top-0 z-50 shadow-md border-b border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#8B5CF6] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Report Dispatching</span>
            <span className="text-white/90">Your customized 12-Step AI Lead Recovery Diagnostic Report arrives in your email inbox in ~30 mins.</span>
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
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#0F172A] font-extrabold text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>CRM Revenue Recovery Diagnostic Result</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6">
            Your Business's #1 Dead Lead Killer: <br />
            <span className="text-[#8B5CF6] underline decoration-[#8B5CF6]/40">THE VANISHING GHOST</span>
          </h1>

          {/* Bucket Badge Row */}
          <div className="inline-flex items-center gap-4 bg-white p-3 px-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#8B5CF6] shadow-sm bg-white shrink-0">
              <img src="/icon-vanishing-ghost.png" alt="Vanishing Ghost" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Diagnosed Category</span>
              <span className="text-2xl font-black text-[#0F172A]">Profile VG: The Vanishing Ghost</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Warm prospects who attended initial calls, requested proposals or quotes, then vanished into complete radio silence without a 14-day follow-up sequence.
          </p>
        </div>
      </header>

      {/* Detailed Written Outcome Body Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-12">

        {/* STEP 1: Introduction */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#8B5CF6]">01.</span> Welcome to Your Diagnostic Breakdown
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Thank you for completing the <strong>#1 Lead Killer Audit</strong>. My name is <strong>David Olaniyi</strong>, Founder of <strong>STRATAVIN LLC</strong>, where we help business owners revive ghosted deals and reclaim lost revenue sitting stranded in their sales pipeline.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            Before your complete 12-step PDF report arrives in your inbox, let's examine your exact audit results right here on this page.
          </p>
        </section>

        {/* STEP 2 & 3: What Being in Bucket 3 Means */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#8B5CF6]">02.</span> What "The Vanishing Ghost" Means For Your Pipeline
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Based on the information you shared in your assessment, having <strong>The Vanishing Ghost</strong> in your sales funnel means something deeply frustrating:
          </p>
          <p className="text-slate-700 leading-relaxed text-base font-semibold text-[#0F172A] bg-[#8B5CF6]/10 p-4 rounded-xl border-l-4 border-[#8B5CF6]">
            Prospects enquired, attended an initial call, requested a proposal or quote, and expressed high interest. They said, <em>"Sounds great, send me the details and I'll think about it!"</em> Then... complete radio silence.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            Your team sent 1 or 2 polite check-in emails or texts. When the prospect didn't reply immediately, the deal stalled in the middle of your funnel and vanished into thin air, leaving your pipeline filled with warm prospects who were 80% ready to buy.
          </p>
        </section>

        {/* STEP 4: The Mistakes People Make */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <span>03. The #1 Mistake Business Owners Make</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            The single biggest mistake business owners make with <strong>The Vanishing Ghost</strong> is assuming that ghosting equals "No," or sending weak follow-ups like <em>"Just checking in!"</em> or <em>"Did you get my email?"</em>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">1. "Checking In" Creates Guilt</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Busy prospects feel guilty for not replying earlier, so receiving a generic "checking in" text makes them feel pressured and ignore you even longer.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">2. Lack of Structured 14-Day Nurture</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Without a strategic multi-touch sequence addressing hidden objections (price, timing, authority), prospects get swallowed by daily fires.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 5: Agitating the Math */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-8 md:p-10 rounded-2xl shadow-xl space-y-5">
          <h2 className="text-2xl font-extrabold text-[#FFCC00] border-b border-white/10 pb-3 flex items-center gap-2">
            <span>04. The Math of Your Ghosted Pipeline</span>
          </h2>
          <p className="text-white/90 leading-relaxed text-base">
            Middle-of-funnel leads are your <strong>highest-value prospects</strong> because you already invested time, sales effort, and ad budget getting them to the proposal stage!
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15 space-y-3 font-mono text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Ghosted Proposals / Quotes:</span>
              <span className="font-bold text-white">30 Prospects / month</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Modest AI Recovery Rate (20%):</span>
              <span className="font-bold text-[#FFCC00]">6 Closed Deals / month</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Average Deal Profit ($1,500):</span>
              <span className="font-bold text-white">$1,500 / deal</span>
            </div>
            <div className="flex justify-between pt-1 text-base">
              <span className="font-sans font-bold text-white">Lost Annual Ghosted Profit:</span>
              <span className="font-sans font-black text-[#FFCC00] text-lg">$9,000 / mo ($108,000 / yr)</span>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed italic">
            That represents $108,000 in lost annual profit left stranded in your pipeline simply because of missing middle-of-funnel follow-up!
          </p>
        </section>

        {/* STEP 6: The Quick Win (Magic 9-Word Ghost Buster Text Script) */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-2 border-[#8B5CF6]/30 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#8B5CF6] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
            Free Quick Win
          </div>

          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#8B5CF6]" />
            <span>05. The Magic 9-Word "Ghost Buster" Text Script</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            Thankfully, you can break the ghosting cycle today. Pick 20 prospects who ghosted you after receiving a quote or proposal, and text them this exact 9-word message:
          </p>

          {/* Script Highlight Box */}
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-3 relative shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFCC00] block">
              📋 Copy & Paste Magic 9-Word Ghost Buster Script:
            </span>
            <p className="text-sm md:text-base font-mono leading-relaxed text-white/95 bg-white/5 p-4 rounded-lg border border-white/10">
              "Hi [First_Name], it's David from STRATAVIN LLC. Have you given up on [Project/Service]?"
            </p>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic">
            <strong>Why this works:</strong> It triggers psychological loss aversion. Humans naturally hate "giving up" on something they wanted, provoking an immediate reply rate of over 85% within 15 minutes!
          </p>
        </section>

        {/* STEP 7: The Cure & DFY 14-Day AI Follow-Up Engine */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#FFCC00]" />
            <span>06. The Cure: 14-Day Intelligent AI Follow-Up Engine</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            Now you might ask: <em>"How can we automatically nurture every ghosted prospect with personalized 14-day sequences without our team spending hours crafting manual texts?"</em>
          </p>
          
          <p className="text-slate-700 leading-relaxed text-base">
            We install our <strong>Done-For-You (DFY) 14-Day Intelligent Follow-Up AI Android</strong> directly into your GoHighLevel or CRM pipeline:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Intelligent Objection Handling:</strong>
                <span className="text-xs text-slate-600">Detects why prospects ghosted (price, timing, competitor) and responds with tailored conversational scripts via SMS & WhatsApp.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">24/7 Automated Nurture:</strong>
                <span className="text-xs text-slate-600">Maintains multi-turn human-sounding dialogue for 14 straight days until the prospect books a call.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Re-booking Engine:</strong>
                <span className="text-xs text-slate-600">Converts stalled leads back into booked sales calls on your team's calendar automatically!</span>
              </div>
            </div>
          </div>

          {/* 100% Performance Guarantee Banner */}
          <div className="bg-[#8B5CF6]/10 p-6 rounded-xl border border-[#8B5CF6]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#8B5CF6] font-black text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Our 100% Performance Risk-Reversal Guarantee</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-semibold pl-1">
              <li>• <strong>$0 Setup Fee</strong> for initial qualifying performance pilots.</li>
              <li>• <strong>$0 Monthly Retainer</strong> for your initial pilot deployment.</li>
              <li>• <strong>100% Performance Basis:</strong> We only take a performance share on closed deals recovered from ghosted leads. If we don't recover sales for you, you pay us nothing.</li>
            </ul>
          </div>
        </section>

        {/* PRIMARY CTA SECTION */}
        <section id="booking-cta-section" className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-6 border border-white/10">
          
          <div className="inline-block bg-[#FFCC00] text-[#0F172A] font-black text-xs uppercase px-4 py-1.5 rounded-full tracking-widest">
            3 Performance Pilot Spots Remaining
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Claim Your 15-Minute Coffee Date Zoom Demo
          </h2>

          <p className="text-white/85 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Because setting up the 14-Day AI Follow-Up Android requires custom objection script mapping, <strong>STRATAVIN LLC can only accept 3 new Performance Pilot clients this month</strong>.
          </p>

          <div className="pt-2 pb-4">
            <button 
              onClick={openCalendar} 
              className="bg-[#FFCC00] hover:bg-[#E6B800] text-[#0F172A] font-black py-4 px-8 sm:px-12 rounded-xl text-base sm:text-lg tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 w-full sm:w-auto inline-flex items-center justify-center gap-3 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>👉 CLICK HERE TO BOOK YOUR 15-MINUTE COFFEE DATE DEMO NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-white/60 font-medium mt-3">
              🔒 100% Risk-Free. Zero Sales Pressure. See the Live Interactive AI Demo.
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
