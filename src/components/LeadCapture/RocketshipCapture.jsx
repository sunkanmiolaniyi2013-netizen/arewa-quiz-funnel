import { Rocket } from 'lucide-react';
import { CONFIG } from '../../quizConfig';

export default function RocketshipCapture({ leadData, setLeadData, agreed, setAgreed, handleLeadSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 md:p-10 bg-[#F9F9F9]">
      <div className="bg-white w-full max-w-[850px] z-10 shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-2xl relative mx-auto my-auto border border-[#E2E8F0] shadow-[0_20px_60px_-10px_rgba(30,144,255,0.1)]">
        
        {/* Left Form Column */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white relative z-10">
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F1B2D] mb-6 leading-tight tracking-tight">Your Quiz Results Are Ready</h2>
          
          <p className="text-lg font-bold text-gray-700 mb-2">Your lead reactivation profile is:</p>
          <div className="mb-8 flex flex-row items-center gap-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#34D399] to-[#10B981] shadow-md">
                <div className="relative z-30 flex items-center justify-center filter drop-shadow-sm scale-75 md:scale-90">
                  <Rocket className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" strokeWidth={2.5} fill="currentColor" />
                </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-[#1E90FF] uppercase tracking-tighter leading-none break-words text-left">
              RR
            </h3>
          </div>
          
          <p className="text-gray-800 font-bold text-[15px] mb-6 leading-snug w-full mx-auto md:mx-0">
            Where should we send your complete AI Lead Recovery Report?
          </p>
          
          

          <form onSubmit={handleLeadSubmit} className="space-y-4 w-full max-w-sm mx-auto md:mx-0">
            {CONFIG.leadCaptureConfig.fields.name.show && (
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full border border-gray-200 p-4 rounded bg-white text-sm outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
                  value={leadData.name}
                  onChange={e => setLeadData({...leadData, name: e.target.value})}
                  required={CONFIG.leadCaptureConfig.fields.name.required}
                />
              </div>
            )}
            
            {CONFIG.leadCaptureConfig.fields.email.show && (
              <div className="w-full">
                <input 
                  type="email" 
                  placeholder="Enter your best email address" 
                  className="w-full border border-gray-200 p-4 rounded bg-white text-sm outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
                  value={leadData.email}
                  onChange={e => setLeadData({...leadData, email: e.target.value})}
                  required={CONFIG.leadCaptureConfig.fields.email.required}
                />
              </div>
            )}

            {CONFIG.leadCaptureConfig.fields.phone.show && (
              <div className="w-full">
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className="w-full border border-gray-200 p-4 rounded bg-white text-sm outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
                  value={leadData.phone}
                  onChange={e => setLeadData({...leadData, phone: e.target.value})}
                  required={CONFIG.leadCaptureConfig.fields.phone.required}
                />
              </div>
            )}
            
            <label className="flex items-start gap-2 cursor-pointer pt-1 pb-2">
              <input 
                type="checkbox" 
                className="mt-0.5 w-4 h-4 accent-[#1E90FF] shrink-0" 
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
              />
              <span className="text-[10px] md:text-xs text-gray-500 font-medium leading-snug">
                I agree to receive my personalised report and relevant emails about AI lead recovery. I can unsubscribe at any time.
              </span>
            </label>

            <button type="submit" className="w-full bg-[#FFCC00] hover:bg-[#E6B800] text-[#0F1B2D] font-black py-4 rounded text-lg tracking-wider transition-colors shadow-sm flex flex-row items-center justify-center gap-2">
              <span>&rarr;</span> Send Me My Free Report
            </button>
            <p className="text-center text-[10px] text-gray-400 font-medium mt-2">🔒 We will not spam, rent, or sell your information. Unsubscribe anytime.</p>
          </form>
        </div>

        {/* Right Report Mockup Column */}
        <div className="w-full md:w-[45%] relative bg-white flex items-center justify-center p-8 md:p-10 border-l border-gray-100 z-10">
           <div className="w-full max-w-[340px] h-full min-h-[420px] border-[10px] md:border-[12px] border-[#1E90FF] rounded-3xl relative bg-white flex flex-col items-center pt-8 pb-14 shadow-[0_5px_15px_rgba(30,144,255,0.15)] overflow-hidden">
             
             <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.15em] mb-2 uppercase">Your Results</h4>
             <div className="flex flex-col items-center w-full px-6 mb-6">
                <span className="font-serif font-black text-lg md:text-xl text-[#0F1B2D] mb-1">David Olaniyi</span>
                <div className="w-full h-px bg-gray-200 my-2"></div>
                <p className="text-[9px] md:text-[10px] leading-tight text-gray-500 text-center font-medium">Here's Your #1<br/>Dead Lead Killer</p>
             </div>

             <div className="relative w-full flex-1 flex items-center justify-center">
               <img src={`/ready-rocketship-mockup.png`} alt={`Rocketship Report`} className="w-[85%] h-auto object-contain drop-shadow-xl" onError={(e)=>{e.target.src="/report-mockup.png"}} />
             </div>
             
             <div className="absolute grid grid-cols-4 gap-2 md:gap-3 bottom-14 px-4 w-[85%] max-w-[200px] z-10">
                <div className="aspect-square rounded-full bg-[#1E90FF] opacity-90"></div>
                <div className="aspect-square rounded-full bg-[#1E90FF] opacity-90"></div>
                <div className="aspect-square rounded-full bg-[#1E90FF] opacity-90"></div>
                <div className="aspect-square rounded-full bg-[#1E90FF] opacity-90"></div>
             </div>

             <div className="absolute bottom-0 bg-[#E2E8F0] text-[#0F1B2D] text-[11px] md:text-xs font-bold py-3 w-full text-center tracking-wide">
                Your free personalised AI Lead Recovery Report
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
