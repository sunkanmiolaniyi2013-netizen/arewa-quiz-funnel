import { useState, useEffect } from 'react';
import { Play, Rocket } from 'lucide-react';

export default function RocketshipOutcome() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar logic */}
      <div className="bg-gold text-[#0F1B2D] text-center py-2 text-sm font-bold flex justify-center items-center gap-4 tracking-widest px-4">
        <span className="hidden md:inline">🎯 Your personalised result is available now. Read this before you close the tab.</span>
        <span className="md:hidden">EXPIRES IN...</span>
        
        {timeLeft > 0 ? (
          <span className="text-xl ml-2 whitespace-nowrap">
            {minutes.toString().padStart(2, '0')} <span className="text-[10px] font-normal opacity-80 mr-1 uppercase">MINS</span> 
            {seconds.toString().padStart(2, '0')} <span className="text-[10px] font-normal opacity-80 uppercase">SECONDS</span>
          </span>
        ) : (
            <span className="text-xl tracking-widest text-[#a8251e] bg-white px-2 py-0.5 rounded shadow-sm opacity-90 ml-2">EXPIRED</span>
        )}
      </div>

      <section className="pt-10 pb-6 md:pt-14 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F1B2D] mb-6">Your Lead Reactivation Profile:</h1>
        
        <div className="flex items-center justify-center gap-3 mb-6 flex-col md:flex-row">
          <div className="relative w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#34D399] to-[#10B981] shadow-sm border border-black/5">
              <div className="relative z-30 flex items-center justify-center scale-75">
                <Rocket className="w-6 h-6 text-white drop-shadow-md" strokeWidth={2.5} fill="currentColor" />
              </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2D]">RR: The Ready Rocketship</h2>
        </div>
        
        <p className="text-gray-500 font-medium mb-6 text-sm">Here's What That Means</p>
        
        {/* Video Mockup Area */}
        <div className="relative w-full aspect-video bg-primary-dark rounded-xl shadow-2xl mb-8 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7...%3E%3C/svg%3E")' }}></div>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" className="w-[90%] md:w-[700px] h-auto object-cover absolute shadow-2xl border-2 border-white/20 z-10 rounded" alt="Video thumbnail" />
            <div className="absolute w-16 h-16 bg-white/95 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-20 hover:scale-110 transition-transform duration-300 group">
              <Play className="text-primary ml-1 group-hover:text-gold transition-colors" fill="currentColor" size={28} />
            </div>
        </div>

        <p className="font-bold text-lg md:text-xl text-[#1E90FF] mb-6 leading-tight max-w-lg mx-auto">
          NEXT STEPS: Click the Button Below to Book Your<br/>
          Free 15-Minute Coffee Date
        </p>

        <button className="bg-gold hover:bg-[#e6b800] text-white font-bold py-3.5 px-8 md:px-12 rounded mx-auto text-sm md:text-base tracking-widest uppercase transition-all hover:-translate-y-1 block shadow-lg">
          BOOK MY FREE COFFEE DATE
        </button>
        <p className="text-[11px] md:text-xs text-gray-400 mt-2 font-medium">Click The Button Above to Continue</p>
      </section>

      {/* Modeled Lower Block Layout (Single Colored Frame, Centered Aesthetics) */}
      <section className="bg-[#eef5fc] py-20 px-6 border-t border-[#b7d8ff] text-[#0F1B2D]">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          <div className="text-center w-full mb-10 space-y-4">
            <p className="italic text-gray-500 font-medium">Before You Go...</p>
            <p className="font-black text-[#1E90FF] text-xl">We have an incredible opportunity for you...</p>
          </div>

          <div className="w-full text-center space-y-4 mb-4 text-base md:text-lg">
            <p className="font-medium">Thanks for taking the time to answer the quiz. Your personalised <strong className="text-primary">AI Lead Recovery Report</strong> is being prepared right now and will hit your inbox within the next 30 minutes.</p>
            <p>In the meantime — let's talk about your results. Because what we found tells us something important about where your business is right now, and where a significant chunk of your missing revenue is hiding.</p>
          </div>

          <h3 className="text-2xl font-black text-[#1E90FF] mb-2 mt-8 text-center">Here Are Your Results</h3>
          <p className="text-center text-lg mb-8">Based on the answers you shared — your business's #1 dead lead killer is what's known as <strong className="font-bold uppercase text-[#0F1B2D] block mt-1">The Ready Rocketship.</strong></p>

          <h3 className="text-2xl font-black text-[#1E90FF] mb-4 mt-4 text-center">Here's What That Means</h3>
          
          {/* We format the deep dive text centered but contained */}
          <div className="text-center space-y-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto flex flex-col items-center">

              <p>The Ready Rocketship is actually a position of strength. You're already doing the hard things: generating leads, running a sales team, maintaining a CRM or pipeline, following up consistently. You're ahead of the vast majority of businesses in your sector.</p>
              <p>But here's the gap: everything you're doing is still <em>human-dependent.</em> Your results are capped by your team's working hours, their energy levels, and the volume they can physically manage. Every time a lead is missed — because the phone wasn't answered, because a call-back was forgotten, because the follow-up fell between the cracks — that's revenue that slips through a crack that shouldn't exist.</p>
              <p className="font-semibold italic mb-10">The Ready Rocketship is a business that has built the body of the rocket. What it's missing is the engine — the AI layer that removes the human ceiling and turns a great manual machine into an automatic one.</p>

              <h3 className="text-xl md:text-2xl font-bold mb-4">Here Are the Mistakes People Make</h3>
              <p>The most common mistake at this stage is <strong>spending more on acquiring new leads before squeezing the full value out of existing ones.</strong></p>
              <p>Most businesses at the Ready Rocketship stage, when they want to grow, instinctively increase their ad budget. More leads in, more revenue out — in theory. But the leak is already there: of every 10 leads coming in, somewhere between 4 and 7 are not converting. Not because they weren't good leads. Because they weren't followed up with fast enough, or persistently enough, or through the right channel.</p>
              <p className="font-bold mb-10">Adding more leads to a leaky process just creates a bigger leak. The smart move — and the most profitable move per pound or dollar spent — is to first maximise the value of the leads already in the system.</p>

              <h3 className="text-xl md:text-2xl font-bold mb-4">Agitate Those Mistakes</h3>
              <p>Here's what the numbers look like in practice.</p>
              <p>If your business generates 200 leads a month and your conversion rate is 30%, you're closing 60 and leaving 140 behind. Increasing your ad budget by 50% might bring in 300 leads and close 90 — but now you're leaving 210 on the table, and your ad costs have grown.</p>
              <p>Now flip that. You add an AI layer that reactivates just 15% of those 140 unconverted leads per month. That's 21 extra conversations. If your close rate on warm, re-engaged leads is 25%, that's 5 extra sales per month. 60 extra sales per year. At no additional ad cost.</p>
              <p className="font-semibold mb-10">For most businesses at this stage, that's a significant revenue line — recovered from leads that were already being generated. And the AI that makes it happen doesn't get sick, doesn't take weekends off, and works every lead in the database every single day.</p>

              <h3 className="text-xl md:text-2xl font-bold mb-4">Here's What You Can Do About It</h3>
              <p>The move for a Ready Rocketship business is to install an <strong>AI layer on top of your existing system</strong> — not instead of it.</p>
              <p>Your sales team keeps doing what they do. Your CRM keeps doing what it does. The AI Sales Android runs quietly in the background, picking up every lead that falls through — past enquiries, 48-hour drop-offs, no-shows, lapsed customers — and having intelligent SMS conversations that bring them back to the table.</p>
              <p>Your team only gets involved when a lead is pre-qualified and ready to talk. No wasted calls. No chasing cold leads. Just warm, receptive prospects arriving in the calendar.</p>
              <p>Dan Wardrope's framework for this is what he calls becoming a full <strong>AI Partner</strong> for your business — starting with database reactivation as the foot in the door, then expanding to speed-to-lead (AI picks up fresh enquiries within 60 seconds), out-of-hours support, and full pipeline automation.</p>
              <p className="font-bold mb-10">The businesses doing this right now are operating at a level their competitors simply can't match — because they've combined human expertise with machine consistency.</p>

              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 pt-6">Next Steps</h3>
              <p className="italic mb-6">You're already close. You've got the foundation. All we're doing is adding the engine.</p>
              <p>In a free 15-minute Coffee Date, I'll show you a live demo of the <strong>AI Sales Android</strong> working on leads in real time. You'll see it handling an SMS conversation, qualifying a lead, and booking an appointment — without any human involvement. Most people at your stage watch this and immediately understand the ROI.</p>
              <p className="font-bold underline mb-4">The commercial model is 100% performance: you pay nothing until we generate you a sale.</p>
              <p>We typically start with a test batch of your existing unconverted leads — showing you results within the first week — before expanding to a full implementation.</p>
              <p>Book a free 15-minute Coffee Date below. For a Ready Rocketship like yours, the demo usually turns into a plan within 20 minutes.</p>
    
          </div>

        </div>
        
        <div className="text-center mt-12 mb-8">
            <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3.5 px-10 rounded-full tracking-widest text-sm uppercase transition-all shadow-sm">
                BOOK MY COFFEE DATE
            </button>
            <p className="text-[11px] text-gray-500 mt-3 font-medium px-4">Your AI Lead Recovery Report arrives in 30 minutes.</p>
        </div>

      </section>

      <footer className="bg-primary text-center py-8 text-xs text-white/50 border-t border-primary-dark">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <span>Copyright © 2026. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
