import { useState, useEffect } from 'react';
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';

export default function DropOffOutcome() {
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#FFCC00]/30 text-[#0F172A]">
      
      {/* Top Countdown & Open Loop Inoculation Banner */}
      <div className="bg-[#0F172A] text-white py-3 px-4 sticky top-0 z-50 shadow-md border-b border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#FFCC00] text-[#0F172A] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Report Dispatching</span>
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
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6B800]/10 border border-[#E6B800]/30 text-[#0F172A] font-extrabold text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4 text-[#E6B800]" />
            <span>CRM Revenue Recovery Diagnostic Result</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6">
            Your Business's #1 Dead Lead Killer: <br />
            <span className="text-[#E6B800] underline decoration-[#FFCC00]/50">THE 48-HOUR CLIFF</span>
          </h1>

          {/* Bucket Badge Row */}
          <div className="inline-flex items-center gap-4 bg-white p-3 px-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFCC00] shadow-sm bg-white shrink-0">
              <img src="/icon-48hr-cliff.png" alt="48-Hour Cliff" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Diagnosed Category</span>
              <span className="text-2xl font-black text-[#0F172A]">Profile 48H: The 48-Hour Cliff</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Leads dialled aggressively by sales reps for the first 2 days... then completely abandoned on Day 3 right when 80% of actual sales decisions take place.
          </p>
        </div>
      </header>

      {/* Detailed Written Outcome Body Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-12">

        {/* STEP 1: Introduction */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#1E90FF]">01.</span> Welcome to Your Diagnostic Breakdown
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Thank you for completing the <strong>#1 Lead Killer Audit</strong>. My name is <strong>David Olaniyi</strong>, Founder of <strong>STRATAVIN LLC</strong>, where we help business owners eliminate hidden revenue leaks and turn dormant sales pipelines into predictable cash flow.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            Before your complete 12-step PDF report arrives in your inbox, let's examine your exact audit results right here on this page.
          </p>
        </section>

        {/* STEP 2 & 3: What Being in Bucket 2 Means */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#1E90FF]">02.</span> What "The 48-Hour Cliff" Means For Your Pipeline
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Based on the information you shared in your assessment, your sales team (or appointment setters) does an incredible job at the top of your funnel. When a fresh lead opts in from your Facebook or Google ad campaigns, your reps dial hard for the first 24 to 48 hours. They call 2 or 3 times, send an initial email, and try to make contact.
          </p>
          <p className="text-slate-700 leading-relaxed text-base font-semibold text-[#0F172A] bg-[#FFCC00]/10 p-4 rounded-xl border-l-4 border-[#FFCC00]">
            However, if the prospect doesn't answer or book a call by Day 2, your reps stop calling. Because new leads are constantly pouring into your CRM, reps naturally prioritize today's fresh leads and abandon 3-day-old leads.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            As a result, <strong>over 70% of your paid ad leads fall right off the "48-Hour Cliff"</strong> and sit completely un-contacted from Day 3 onwards.
          </p>
        </section>

        {/* STEP 4: The Mistakes People Make */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <span>03. The #1 Mistake Business Owners Make</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            The single biggest mistake business owners make when facing <strong>The 48-Hour Cliff</strong> is assuming that leads unreached after 48 hours "aren't interested" or blaming reps for being lazy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">1. Prospects Are Busy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Industry sales benchmark data proves that 80% of sales require between <strong>5 to 12 touchpoints over 14 days</strong> to convert.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">2. Sales Rep Physical Limits</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reps physically cannot dial 300 old leads from last week while simultaneously trying to hit 5-minute speed-to-lead on today's new leads.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 5: Agitating the Math */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-8 md:p-10 rounded-2xl shadow-xl space-y-5">
          <h2 className="text-2xl font-extrabold text-[#FFCC00] border-b border-white/10 pb-3 flex items-center gap-2">
            <span>04. The Math of Your Abandoned Pipeline</span>
          </h2>
          <p className="text-white/90 leading-relaxed text-base">
            Here is why <strong>The 48-Hour Cliff</strong> is quietly draining tens of thousands of dollars from your business every single month:
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15 space-y-3 font-mono text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Monthly Lead Volume:</span>
              <span className="font-bold text-white">300 Leads / month</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Abandoned After Day 2 (70%):</span>
              <span className="font-bold text-[#FFCC00]">210 Leads / month (2,520/yr)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Delayed Conversion Rate (3%):</span>
              <span className="font-bold text-white">75 Recovered Deals</span>
            </div>
            <div className="flex justify-between pt-1 text-base">
              <span className="font-sans font-bold text-white">Lost Annual Pipeline Profit:</span>
              <span className="font-sans font-black text-[#FFCC00] text-lg">$113,400.00 / year</span>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed italic">
            You are literally paying Facebook and Google for leads, only to throw 70% of them away after 48 hours simple because no one is working your pipeline from Day 3 to Day 14!
          </p>
        </section>

        {/* STEP 6: The Quick Win (Day 3 Takeover Text Script) */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-2 border-[#1E90FF]/30 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#1E90FF] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
            Free Quick Win
          </div>

          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#1E90FF]" />
            <span>05. The Day 3 "Takeover Text" Script</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            Thankfully, you can stop leads from falling off the cliff today. A powerful quick win you can implement manually right now is what we call the <strong>Day 3 "Takeover Text"</strong>.
          </p>

          {/* Script Highlight Box */}
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-3 relative shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFCC00] block">
              📋 Copy & Paste Day 3 Takeover Text Script:
            </span>
            <p className="text-sm md:text-base font-mono leading-relaxed text-white/95 bg-white/5 p-4 rounded-lg border border-white/10">
              "Hi [First_Name], it's David from STRATAVIN LLC following up on [Service]. I know you've been super busy this week! Are you still looking to solve [Pain Point] this month?"
            </p>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic">
            <strong>Why this works:</strong> It acknowledges their busy schedule without sounding like a pushy sales pitch, dramatically lowering friction and reopening 2-way dialogue.
          </p>
        </section>

        {/* STEP 7: The Cure & DFY 48-Hour AI Sales Android */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#FFCC00]" />
            <span>06. The Cure: 24/7 AI Sales Android Takeover</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            Now you might ask: <em>"How can my team execute a multi-channel 14-day follow-up sequence for every lead after 48 hours without overwhelming my sales reps?"</em>
          </p>
          
          <p className="text-slate-700 leading-relaxed text-base">
            This is where <strong>David Olaniyi & the STRATAVIN LLC team</strong> come in. We install our <strong>Done-For-You (DFY) 48-Hour AI Android Engine</strong> directly into your GoHighLevel or CRM pipeline:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">100% Seamless Hand-off:</strong>
                <span className="text-xs text-slate-600">The moment your sales rep marks a lead as "unreached" on Day 2, our AI Sales Android automatically takes over on Day 3.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Human-Like 2-Way Dialogue:</strong>
                <span className="text-xs text-slate-600">The AI engages in natural SMS & WhatsApp conversations for 14 straight days, answering questions and handling objections.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Instant Calendar Bookings:</strong>
                <span className="text-xs text-slate-600">It books qualified appointments straight into your sales reps' calendar without adding staff headcount!</span>
              </div>
            </div>
          </div>

          {/* 100% Performance Guarantee Banner */}
          <div className="bg-[#1E90FF]/10 p-6 rounded-xl border border-[#1E90FF]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#1E90FF] font-black text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Our 100% Performance Risk-Reversal Guarantee</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-semibold pl-1">
              <li>• <strong>$0 Setup Fee</strong> for initial qualifying performance pilots.</li>
              <li>• <strong>$0 Monthly Retainer</strong> for your initial pilot deployment.</li>
              <li>• <strong>100% Performance Basis:</strong> We only take a performance share on closed deals generated after Day 2. If we don't recover sales for you, you pay us nothing.</li>
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
            Because setting up the 48-Hour AI Android Takeover requires custom pipeline integration, <strong>STRATAVIN LLC can only accept 3 new Performance Pilot clients this month</strong>.
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
