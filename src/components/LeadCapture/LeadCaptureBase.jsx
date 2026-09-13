import { CONFIG } from '../../quizConfig';
import IntlPhoneInput from '../IntlPhoneInput';

export default function LeadCaptureBase({ 
  abbreviation, 
  iconImg,
  brandColor = "#1E90FF", 
  reportMockupImg, 
  leadData, 
  setLeadData, 
  agreed, 
  setAgreed, 
  handleLeadSubmit 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#F1F5F9] font-sans selection:bg-[#1E90FF]/30">
      <div className="bg-white w-full max-w-[880px] shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200 my-auto">
        
        {/* Left Column - Form & Quiz Result Teaser */}
        <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white order-1 md:order-1">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
            Your Quiz Results!
          </h2>
          
          {/* Custom Bucket Icon + Abbreviation Badge in Quotes */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
            {iconImg && (
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
                <img src={iconImg} alt={abbreviation} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight" style={{ color: brandColor }}>
              "{abbreviation}"
            </div>
          </div>

          <p className="text-gray-600 font-bold text-xs sm:text-sm md:text-base mb-5 sm:mb-6 leading-relaxed max-w-sm">
            Where Should We Send Your Complete<br className="hidden sm:inline" />
            <span className="text-[#0F172A]">"Lead Killer Diagnostic Results"?</span>
          </p>

          <form onSubmit={handleLeadSubmit} className="space-y-3.5 sm:space-y-4 w-full max-w-sm">
            {CONFIG.leadCaptureConfig.fields.name.show && (
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Enter Your Name" 
                  className="w-full border border-gray-300 p-3.5 sm:p-4 rounded-lg bg-white text-base outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[#1E90FF]/20 transition-all font-medium text-gray-800 placeholder-gray-400"
                  value={leadData.name}
                  onChange={e => setLeadData({...leadData, name: e.target.value})}
                  required={CONFIG.leadCaptureConfig.fields.name.required}
                />
              </div>
            )}
            
            {CONFIG.leadCaptureConfig.fields.phone.show && (
              <div className="w-full">
                <IntlPhoneInput 
                  value={leadData.phone}
                  onChange={val => setLeadData({...leadData, phone: val})}
                  required={CONFIG.leadCaptureConfig.fields.phone.required}
                />
              </div>
            )}

            <button type="submit" className="w-full bg-[#FFCC00] hover:bg-[#E6B800] text-[#0F172A] font-black py-3.5 sm:py-4 rounded-lg text-base sm:text-lg tracking-wider transition-all shadow-md uppercase">
              CONTINUE →
            </button>
            
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium pt-0.5">
              *We will not spam, rent or sell your information.
            </p>
          </form>
        </div>

        {/* Right Column - Mobile Responsive 3D Report Mockup Panel */}
        <div className="w-full md:w-[45%] bg-[#0F172A] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 border-t md:border-t-0 md:border-l border-slate-100 relative order-2 md:order-2">
           <div className="w-[180px] sm:w-[220px] md:w-[250px] transform transition-transform hover:scale-105 duration-300 mb-4 sm:mb-6">
              <img src={reportMockupImg} alt="AI Lead Recovery Report" className="w-full h-auto filter drop-shadow-2xl" />
           </div>
           <div className="bg-white/10 backdrop-blur-sm text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-md border border-white/20 uppercase tracking-wider text-center">
              Get Your FREE Results Report
           </div>
        </div>

      </div>
    </div>
  );
}
