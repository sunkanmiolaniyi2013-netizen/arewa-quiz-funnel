import { useState, useEffect } from 'react';
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';

export default function SleepingDatabaseOutcome() {
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#1E90FF]/30 text-[#0F172A]">
      
      {/* Top Countdown & Open Loop Inoculation Banner */}
      <div className="bg-[#0F172A] text-white py-3 px-4 sticky top-0 z-50 shadow-md border-b border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#1E90FF] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Report Dispatching</span>
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
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E90FF]/10 border border-[#1E90FF]/30 text-[#0F172A] font-extrabold text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4 text-[#1E90FF]" />
            <span>CRM Revenue Recovery Diagnostic Result</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6">
            Your Business's #1 Dead Lead Killer: <br />
            <span className="text-[#1E90FF] underline decoration-[#1E90FF]/40">THE SLEEPING DRAGON</span>
          </h1>

          {/* Bucket Badge Row */}
          <div className="inline-flex items-center gap-4 bg-white p-3 px-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#1E90FF] shadow-sm bg-white shrink-0">
              <img src="/icon-sleeping-dragon.png" alt="Sleeping Dragon" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Diagnosed Category</span>
              <span className="text-2xl font-black text-[#0F172A]">Profile SD: The Sleeping Dragon</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            1,000 to 5,000+ cold leads sitting dormant inside your CRM from the last 6 to 24 months — abandoned after Day 2 and write off as "dead forever".
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

        {/* STEP 2 & 3: What Being in Bucket 1 Means */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-[#1E90FF]">02.</span> What "The Sleeping Dragon" Means For Your Business
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Based on the information you shared in your assessment, you have <strong>1,000 or more past contacts, old quote requests, or unconverted leads</strong> sitting dormant inside your CRM, spreadsheets, or email database from the last 6 to 24 months.
          </p>
          <p className="text-slate-700 leading-relaxed text-base font-semibold text-[#0F172A] bg-[#1E90FF]/10 p-4 rounded-xl border-l-4 border-[#1E90FF]">
            When these leads originally enquired, your team called them a few times over 48 hours. When they didn't answer or buy immediately, your team moved on to fresh leads and wrote them off as "dead."
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            As a result, you are sitting on an un-extracted goldmine of people who had genuine buying intent, but got busy, got distracted, or simply weren't ready to buy on Day 1.
          </p>
        </section>

        {/* STEP 4: The Mistakes People Make */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <span>03. The #1 Mistake Business Owners Make</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            The single biggest mistake business owners make when dealing with <strong>The Sleeping Dragon</strong> is assuming that because a lead didn't buy 6 months ago, they are "dead forever."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">1. Doing Nothing At All</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Letting thousands of dollars in past ad acquisition costs sit idle forever in old CRM folders.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0F172A] text-sm mb-1">2. Spam Email Newsletters</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Blasting cold leads with generic promotional marketing emails that get marked as spam or deleted unread.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 5: Agitating the Math */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-8 md:p-10 rounded-2xl shadow-xl space-y-5">
          <h2 className="text-2xl font-extrabold text-[#FFCC00] border-b border-white/10 pb-3 flex items-center gap-2">
            <span>04. The Math of Your Hidden CRM Cash</span>
          </h2>
          <p className="text-white/90 leading-relaxed text-base">
            Here is why <strong>The Sleeping Dragon</strong> is holding tens of thousands of dollars in un-collected cash flow sitting right inside your business:
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15 space-y-3 font-mono text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Cold Leads Sitting in CRM:</span>
              <span className="font-bold text-white">2,000 Leads</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Modest AI Reactivation Rate (2% - 5%):</span>
              <span className="font-bold text-[#FFCC00]">40 to 100 Re-Engaged Buyers</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/70">Average Profit Per Sale ($1,500):</span>
              <span className="font-bold text-white">$1,500 / deal</span>
            </div>
            <div className="flex justify-between pt-1 text-base">
              <span className="font-sans font-bold text-white">Found CRM Cash Potential:</span>
              <span className="font-sans font-black text-[#FFCC00] text-lg">$60,000.00 – $150,000.00</span>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed italic">
            While you continue spending $40 to $100+ for every new ad lead on Facebook or Google, your existing CRM is leaking massive profit every single day!
          </p>
        </section>

        {/* STEP 6: The Quick Win (17-Word Prince Charming Text Script) */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-2 border-[#1E90FF]/30 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#1E90FF] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest">
            Free Quick Win
          </div>

          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#1E90FF]" />
            <span>05. The 17-Word "Prince Charming" Text Script</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            In fact, one of the most effective quick wins you can test right now is sending what we call the <strong>"Prince Charming SMS"</strong>. Pick 50 of your oldest leads today and text them this exact 17-word message:
          </p>

          {/* Script Highlight Box */}
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-3 relative shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFCC00] block">
              📋 Copy & Paste 17-Word Prince Charming Script:
            </span>
            <p className="text-sm md:text-base font-mono leading-relaxed text-white/95 bg-white/5 p-4 rounded-lg border border-white/10">
              "Hi [First_Name], it's David from STRATAVIN LLC. Is this still the same [First_Name] who enquired about [Service/Product] a while back?"
            </p>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic">
            <strong>Why this works:</strong> It reads 100% personal, informal, and non-salesy. Prospects assume a human friend is texting them from their personal phone and reply immediately.
          </p>
        </section>

        {/* STEP 7: The Cure & DFY 24/7 AI Revenue Engine */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#0F172A] border-b border-slate-100 pb-3 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#FFCC00]" />
            <span>06. The Cure: 24/7 AI Revenue Engine</span>
          </h2>
          
          <p className="text-slate-700 leading-relaxed text-base">
            Now you might ask: <em>"How do I send these messages, manage 2-way conversations, answer questions, handle objections, and book calls for 1,000+ leads without driving my team crazy?"</em>
          </p>
          
          <p className="text-slate-700 leading-relaxed text-base">
            That is precisely what we do all day, every day. We install our <strong>Done-For-You (DFY) 24/7 AI Revenue Engine</strong> directly into your GoHighLevel or CRM database:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Automated Database Reactivation:</strong>
                <span className="text-xs text-slate-600">Texts your dormant leads via SMS & WhatsApp in natural 2-way human-like dialogue.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">24/7 Objection Handling:</strong>
                <span className="text-xs text-slate-600">Answers FAQs and handles objection scripts 24 hours a day, 7 days a week.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#1E90FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 text-sm block">Direct Calendar Booking:</strong>
                <span className="text-xs text-slate-600">Qualifies interested prospects and books sales calls straight into your calendar!</span>
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
              <li>• <strong>100% Performance Basis:</strong> We only take a performance share on closed deals generated from your dead leads. If we don't make you money, you pay us nothing.</li>
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
            Because setting up an AI Sales Android requires custom prompt engineering and CRM mapping, <strong>STRATAVIN LLC can only accept 3 new Performance Pilot clients this month</strong>.
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
