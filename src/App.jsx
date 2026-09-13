import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Calendar,
  Lock,
  Building2,
  TrendingUp,
  Landmark,
  BadgePercent,
  Plane,
  Award,
  Star, 
  ChevronDown, 
  Gift, 
  Check, 
  Zap, 
  Tag, 
  UserCheck,
  FileText,
  CreditCard,
  HardHat,
  Quote,
  User,
  Mail,
  X,
  Search
} from 'lucide-react';
import { CONFIG } from './quizConfig';
import { 
  initAnalytics, 
  trackLandingPageView, 
  trackQuizStarted, 
  trackQuestionViewed,
  trackAnswerSelected, 
  trackQuizCompleted, 
  trackLeadCaptured,
  trackScheduleOpened,
  trackAppointmentConfirmed
} from './analytics';

import AdminDashboard from './AdminDashboard';
import AdCreativeStudio from './components/AdCreativeStudio';

// International Countries Data
const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' }
];

export default function App() {
  // Admin & Ad Studio Route Interceptor
  if (typeof window !== 'undefined') {
    const cleanPath = window.location.pathname.replace(/\/$/, '');
    if (cleanPath === '/admin') return <AdminDashboard />;
    if (cleanPath === '/ad' || cleanPath === '/ads') return <AdCreativeStudio />;
  }

  // State Management
  const [screen, setScreen] = useState('PAGE_1'); // PAGE_1, QUIZ_STEPS, ANALYZING, OPT_IN
  const [currentStepIdx, setCurrentStepIdx] = useState(1); // 1 = q2, 2 = q3, 3 = q4
  const [answers, setAnswers] = useState({});
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default Nigeria (+234)
  const [phoneSubscriber, setPhoneSubscriber] = useState('');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [agreedPolicy, setAgreedPolicy] = useState(true);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);
  const [matchedEstate, setMatchedEstate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analyzingStage, setAnalyzingStage] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedEstateTab, setSelectedEstateTab] = useState('EMINENCE_VILLA');

  // Helper: Calculate Dynamic Match based on Answers
  const getMatchedEstate = (currentAnswers) => {
    const ans = currentAnswers || answers;
    let matchedKey = 'INNOVATION_CITY';
    const q1Target = ans.q1?.targetEstate;
    const q2Target = ans.q2?.targetEstate;

    if (q2Target && q2Target !== 'AUTO') {
      matchedKey = q2Target;
    } else if (q1Target && q1Target !== 'AUTO') {
      matchedKey = q1Target;
    }

    return CONFIG.estates[matchedKey] || CONFIG.estates.INNOVATION_CITY;
  };

  // Initialize Analytics & Detect Country by IP
  useEffect(() => {
    initAnalytics();
    trackLandingPageView();

    const detectCountry = async () => {
      try {
        const res = await fetch('https://api.country.is');
        if (res.ok) {
          const data = await res.json();
          if (data && data.country) {
            const found = COUNTRIES.find(c => c.code === data.country.toUpperCase());
            if (found) {
              setSelectedCountry(found);
            }
          }
        }
      } catch (e) {
        // Fallback to default NG
      }
    };
    detectCountry();
  }, []);

  // Listen for GoHighLevel Calendar Booking Success postMessage
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
  useEffect(() => {
    const handleGHLMessage = (e) => {
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (d && (d.action === 'appointment_booked' || d.type === 'booking_success' || d.event === 'appointment_booked')) {
          setIsAppointmentBooked(true);
          trackAppointmentConfirmed(matchedEstate?.name || 'Abuja Plot Inspection');
        }
      } catch (err) {
        // Not a JSON message or unrelated message
      }
    };
    window.addEventListener('message', handleGHLMessage);
    return () => window.removeEventListener('message', handleGHLMessage);
  }, [matchedEstate]);

  // Track step & question views for Admin Funnel Drop-off analytics
  useEffect(() => {
    if (screen === 'PAGE_1') {
      trackQuestionViewed('q1', 'What is most important to you in your next acquisition?');
    } else if (screen === 'QUIZ_STEPS') {
      const q = CONFIG.questions[currentStepIdx];
      if (q) {
        trackQuestionViewed(q.id, q.title);
      }
    } else if (screen === 'OPT_IN') {
      trackQuestionViewed('optin', 'VIP Allocation Opt-In Form');
    }
  }, [screen, currentStepIdx]);

  // 15-Minute Promo Countdown Timer
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handler: Select Question 1 on Page 1
  const handleSelectPage1Card = (option) => {
    trackQuizStarted();
    trackAnswerSelected('q1', option.title);
    
    setAnswers(prev => ({
      ...prev,
      q1: option
    }));

    setCurrentStepIdx(1); // Move to Question 2
    setScreen('QUIZ_STEPS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Subsequent Quiz Questions (q2, q3, q4)
  const handleSelectQuizStep = (qId, option) => {
    trackAnswerSelected(qId, option.title);
    const updatedAnswers = { ...answers, [qId]: option };
    setAnswers(updatedAnswers);

    if (currentStepIdx < CONFIG.questions.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Transition to Perspective Live Analyzing Animation
      setScreen('ANALYZING');
      setAnalyzingProgress(10);
      setAnalyzingStage(0);

      const interval = setInterval(() => {
        setAnalyzingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              const matched = getMatchedEstate();
              setMatchedEstate(matched);
              setSelectedEstateTab(matched.id);
              setScreen('OPT_IN');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
            return 100;
          }
          if (prev === 30) setAnalyzingStage(1);
          if (prev === 65) setAnalyzingStage(2);
          if (prev === 85) setAnalyzingStage(3);
          return prev + 10;
        });
      }, 180);
    }
  };

  // Back Navigation in Quiz
  const handleBackStep = () => {
    if (currentStepIdx === 1) {
      setScreen('PAGE_1');
    } else {
      setCurrentStepIdx(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lead Submission Handler
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!phoneSubscriber.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    if (!agreedPolicy) {
      alert("Please accept the terms and privacy policy to continue.");
      return;
    }

    const fullPhone = `${selectedCountry.dialCode} ${phoneSubscriber.trim()}`;
    const cleanPhone = fullPhone.replace(/\D/g, '');
    const updatedLeadData = { ...leadData, phone: fullPhone };
    setLeadData(updatedLeadData);
    setIsSubmitting(true);

    const estateObj = matchedEstate || getMatchedEstate();
    setMatchedEstate(estateObj);
    setSelectedEstateTab(estateObj.id);

    const formattedNotes = `🎯 BEACON QUIZ FUNNEL MATCH:
• Matched Estate: ${estateObj.name} (${estateObj.location})
• Investment Goal: ${answers.q1?.title || 'Not specified'}
• Preferred District: ${answers.q2?.title || 'Open to recommendation'}
• Budget Range: ${answers.q3?.title || 'Standard'}
• Payment Preference: ${answers.q4?.title || 'Flexible'}
• Promo Price: ${estateObj.defaultPrice} (${estateObj.defaultPlot})
• Instant Savings: ${estateObj.defaultSavings}
• Country: ${selectedCountry.name} (${selectedCountry.dialCode})
• Submitted: ${new Date().toLocaleString()}`;

    trackLeadCaptured({
      name: leadData.name.trim(),
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@beaconrealty.leads`,
      investment_goal: answers.q1?.title || 'Not specified',
      preferred_district: answers.q2?.title || 'Open to recommendation',
      budget_range: answers.q3?.title || 'Standard',
      payment_structure: answers.q4?.title || 'Flexible',
      matched_estate_name: estateObj.name
    }, estateObj.id);

    // GHL Webhook Payload
    const payload = {
      name: leadData.name.trim(),
      first_name: leadData.name.trim().split(' ')[0],
      last_name: leadData.name.trim().split(' ').slice(1).join(' ') || '',
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@beaconrealty.leads`,
      tags: ["september-speciale-2026", `estate-${estateObj.id.toLowerCase()}`, "fcda-c-of-o-lead", "vip-site-visitation", `country-${selectedCountry.code.toLowerCase()}`],
      notes: formattedNotes,
      custom_fields: {
        investment_goal: answers.q1?.title || 'Not specified',
        preferred_district: answers.q2?.title || 'Open to recommendation',
        budget_range: answers.q3?.title || 'Standard',
        payment_structure: answers.q4?.title || 'Flexible',
        matched_estate_name: estateObj.name,
        matched_estate_location: estateObj.location,
        country_code: selectedCountry.code
      },
      source: "Beacon Perspective Quiz Funnel",
      submitted_at: new Date().toISOString()
    };

    // Fire webhook (non-blocking)
    fetch(CONFIG.leadCaptureConfig.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(err => console.error("Webhook error:", err));

    trackQuizCompleted(estateObj.id);

    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmittedDetails(true);
      setIsCalendarModalOpen(true);
    }, 400);
  };

  // --------------------------------------------------------------------------
  // SCREEN 1: PERSPECTIVE PRODUCT FINDER DESIGN DNA (NO LOCATION HINTS)
  // --------------------------------------------------------------------------
  if (screen === 'PAGE_1') {
    const q1Config = CONFIG.questions[0];

    // Card component to allow clean reuse for top hero and below-fold CTA
    const OptionCards = () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto w-full">
        {q1Config.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelectPage1Card(option)}
            className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-red-500/20 cursor-pointer bg-white"
          >
            {/* Photo Top (Perspective 4:3 Aspect Ratio) */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100">
              <img 
                src={option.image} 
                alt={option.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Solid Colored Action Bar (Iconic Perspective DNA) */}
            <div className={`${option.color || 'bg-red-600'} py-3.5 sm:py-4 px-3 text-center text-white font-extrabold text-base sm:text-lg tracking-tight group-hover:brightness-105 transition-all shadow-xs`}>
              <span>{option.title}</span>
            </div>
          </button>
        ))}
      </div>
    );

    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#2B1713] flex flex-col font-sans selection:bg-red-500 selection:text-white">
        
        {/* PERSPECTIVE-STYLE MINIMAL BRAND HEADER */}
        <header className="px-4 py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/beacon-logo.png" 
              alt="Beacon Corporate Realty" 
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% FCDA C of O Title</span>
          </div>
        </header>

        {/* HERO / PRODUCT FINDER START */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 pb-20 flex flex-col">
          
          {/* HEADLINE */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl font-black text-[#2B1713] tracking-tight leading-[1.15] mb-3">
              Your Abuja Land Match: Find out which verified estate & plot suits you! 🎯
            </h1>
            <p className="text-lg sm:text-xl text-[#685752] font-medium">
              What's more important to you in your next acquisition?
            </p>
          </div>

          {/* 3 PERSPECTIVE PRODUCT FINDER OPTION CARDS */}
          <div className="mb-20 sm:mb-24">
            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 2: CIRCULAR TRUST FEATURES (PERSPECTIVE DNA) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-12 border-t border-[#E8E1D9] mb-20 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-black text-[#2B1713] text-center max-w-2xl mx-auto mb-12 sm:mb-14 leading-tight">
              We develop prime, fully verified estates with guaranteed FCDA C of O titles.
            </h2>

            {/* 4 Circular Trust Feature Items in 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto text-center">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#F5ECE0] border border-[#EADBCA] flex items-center justify-center mb-4 shadow-sm text-amber-700">
                  <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#2B1713] mb-1.5">
                  100% Verifiable FCDA C of O Title
                </h3>
                <p className="text-sm text-[#685752] leading-relaxed max-w-sm">
                  Clean legal records at AGIS, ensuring zero government encumbrance or ownership dispute risk.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#E8EFF6] border border-[#D5E1ED] flex items-center justify-center mb-4 shadow-sm text-blue-700">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#2B1713] mb-1.5">
                  Flexible 30% Down & 12-Month Spread
                </h3>
                <p className="text-sm text-[#685752] leading-relaxed max-w-sm">
                  Start with an accessible initial commitment and spread your balance across convenient zero-interest installments.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#EAF2EC] border border-[#D4E4D8] flex items-center justify-center mb-4 shadow-sm text-emerald-700">
                  <HardHat className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#2B1713] mb-1.5">
                  Gated Infrastructure & 24/7 Security
                </h3>
                <p className="text-sm text-[#685752] leading-relaxed max-w-sm">
                  Engineered estate layout featuring perimeter fencing, 24/7 armed gatehouse, modern drainage, and paved access roads.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#F8ECEE] border border-[#EED7DB] flex items-center justify-center mb-4 shadow-sm text-rose-700">
                  <Gift className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#2B1713] mb-1.5">
                  September Speciale: Trips & ₦1M Vouchers
                </h3>
                <p className="text-sm text-[#685752] leading-relaxed max-w-sm">
                  Complimentary luxury getaways to Maldives or Kigali plus up to ₦1,000,000 shopping vouchers on eligible plots.
                </p>
              </div>

            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 3: REPEATED CALL TO ACTION (PERSPECTIVE DNA) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-12 border-t border-[#E8E1D9] mb-20 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-[#2B1713] tracking-tight mb-2">
                Find out which verified estate & plot suits you! 🎯
              </h2>
              <p className="text-base sm:text-lg text-[#685752] font-medium">
                What's more important to you in your next acquisition?
              </p>
            </div>

            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 4: EDITORIAL TESTIMONIAL BLOCK (PERSPECTIVE DNA) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-[#1E1917] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-black/20">
              
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xs font-semibold text-slate-300 ml-2">Verified Landowner Review</span>
                </div>

                {/* Big Quote */}
                <blockquote className="text-xl sm:text-2xl font-bold italic leading-snug mb-6 text-slate-100">
                  “Securing our plot with Beacon was seamless. FCDA C of O verified, and the payment spread made it completely stress-free.”
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-base font-bold text-white">
                      Engr. T. Balogun
                    </div>
                    <div className="text-xs text-slate-400">
                      Verified Property Owner, Abuja
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FCDA Allocation Certified</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#E8E1D9] bg-white py-6 px-4 text-center text-xs text-[#8A7974]">
          <p>© {new Date().getFullYear()} Beacon Corporate Realty Ltd. All rights reserved. September Speciale Campaign.</p>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: QUIZ STEPS (QUESTIONS 2, 3, 4 - PERSPECTIVE PRODUCT FINDER DNA)
  // --------------------------------------------------------------------------
  if (screen === 'QUIZ_STEPS') {
    const currentQ = CONFIG.questions[currentStepIdx];
    const progressPercent = Math.round(((currentStepIdx + 1) / CONFIG.questions.length) * 100);

    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#2B1713] flex flex-col font-sans selection:bg-red-500 selection:text-white">
        
        {/* TOP HEADER WITH BACK & STEP PROGRESS */}
        <header className="px-4 py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between">
          <button 
            onClick={handleBackStep}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#685752] hover:text-[#2B1713] transition-colors py-1.5 px-3 rounded-xl hover:bg-white/80 border border-transparent hover:border-[#E8E1D9]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Step Counter Pill */}
          <div className="text-xs font-extrabold text-[#685752] bg-white/80 border border-[#E8E1D9] px-3.5 py-1.5 rounded-full shadow-xs">
            Step {currentStepIdx + 1} of {CONFIG.questions.length}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FCDA Verified</span>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full">
          <div className="w-full bg-[#E8E1D9] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-600 to-rose-600 h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* QUESTION CONTENT */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
          
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-red-600 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full inline-block mb-3 shadow-2xs">
              Step {currentStepIdx + 1} of {CONFIG.questions.length}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1713] tracking-tight leading-tight mb-2">
              {currentQ.title}
            </h2>
            <p className="text-sm sm:text-base text-[#685752] font-medium max-w-lg mx-auto">
              {currentQ.subtitle}
            </p>
          </div>

          {/* QUESTION 2: LOCATION (PERSPECTIVE 4-CARD SINGLE LINE ON PC, 2x2 ON MOBILE) */}
          {currentQ.id === 'q2' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-500/20 cursor-pointer bg-white border border-[#E8E1D9]/70 text-left"
                >
                  {/* Photo Top: aspect 4/3 */}
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={option.image} 
                      alt={option.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Bottom Solid Colored Action Bar (Exact Perspective DNA) */}
                  <div className={`${option.color || 'bg-slate-900'} py-3 sm:py-3.5 px-2.5 text-center text-white flex flex-col justify-center items-center min-h-[58px] sm:min-h-[66px] group-hover:brightness-105 transition-all shadow-xs`}>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                      {option.title}
                    </span>
                    {option.shortTag && (
                      <span className="text-[11px] sm:text-xs text-white/80 font-medium leading-tight mt-0.5">
                        {option.shortTag}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* QUESTION 3: BUDGET RANGE (PERSPECTIVE 4-CARD SINGLE LINE ON PC, 2x2 ON MOBILE) */}
          {currentQ.id === 'q3' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-500/20 cursor-pointer bg-white border border-[#E8E1D9]/70 text-left"
                >
                  {/* Top Graphic Header (Compact 4:3) */}
                  <div className="w-full aspect-[4/3] bg-gradient-to-b from-white via-slate-50 to-[#FAF8F5] flex flex-col items-center justify-center p-3 relative border-b border-[#E8E1D9]/50">
                    <span className="text-3xl sm:text-4xl mb-1.5 group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {option.tier}
                    </span>
                  </div>

                  {/* Bottom Solid Colored Bar */}
                  <div className={`${option.color || 'bg-slate-900'} py-3 sm:py-3.5 px-2 text-center text-white flex flex-col justify-center items-center min-h-[58px] sm:min-h-[66px] group-hover:brightness-105 transition-all shadow-xs`}>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                      {option.title}
                    </span>
                    {option.shortTag && (
                      <span className="text-[11px] sm:text-xs text-white/80 font-medium leading-tight mt-0.5">
                        {option.shortTag}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* QUESTION 4: PAYMENT TERMS (2x2 GRID ON MOBILE, 4-CARD SINGLE LINE ON PC - ELITE IMAGERY) */}
          {currentQ.id === 'q4' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-500/20 cursor-pointer bg-white border border-[#E8E1D9]/70 text-left"
                >
                  {/* Photo Top: aspect 4/3 */}
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={option.image} 
                      alt={option.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {option.badge && (
                      <span className="absolute top-2 right-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur-xs border border-white/40">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Solid Colored Action Bar */}
                  <div className={`${option.color || 'bg-slate-900'} py-3 sm:py-3.5 px-2 text-center text-white flex flex-col justify-center items-center min-h-[58px] sm:min-h-[66px] group-hover:brightness-105 transition-all shadow-xs`}>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                      {option.title}
                    </span>
                    {option.shortTag && (
                      <span className="text-[11px] sm:text-xs text-white/80 font-medium leading-tight mt-0.5">
                        {option.shortTag}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

        </main>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 3: LIVE ANALYZING (PERSPECTIVE 2-SECOND CALCULATION)
  // --------------------------------------------------------------------------
  if (screen === 'ANALYZING') {
    const stages = [
      "Reviewing your investment criteria & budget...",
      "Filtering verified FCDA C of O layouts in Abuja...",
      "Calculating September Speciale promo discounts & vouchers...",
      "Preparing your personalized property allocation match!"
    ];

    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 font-sans text-[#2B1713]">
        <div className="max-w-md w-full text-center">
          
          {/* Animated Spinner */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[#E8E1D9]"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin"
            ></div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-[#2B1713]">
              {analyzingProgress}%
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#2B1713] mb-3 tracking-tight">
            Matching Your Ideal Abuja Estate...
          </h2>

          <p className="text-sm font-semibold text-red-600 h-6 transition-all duration-300">
            {stages[analyzingStage]}
          </p>

          <div className="w-full bg-[#E8E1D9] h-2 rounded-full overflow-hidden mt-6">
            <div 
              className="bg-red-600 h-full transition-all duration-200 ease-out rounded-full"
              style={{ width: `${analyzingProgress}%` }}
            ></div>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // SCREEN 4: OPT-IN & APPOINTMENT BOOKING (PERSPECTIVE DNA)
  // --------------------------------------------------------------------------
  if (screen === 'OPT_IN') {
    const filteredCountries = countrySearch.trim()
      ? COUNTRIES.filter(c => 
          c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
          c.dialCode.includes(countrySearch)
        )
      : COUNTRIES;

    // GHL Calendar URL with Pre-filled Lead Parameters
    const calendarParams = new URLSearchParams({
      name: (leadData.name || '').trim(),
      first_name: (leadData.name || '').trim().split(' ')[0],
      last_name: (leadData.name || '').trim().split(' ').slice(1).join(' '),
      phone: leadData.phone || `${selectedCountry.dialCode} ${phoneSubscriber.trim()}`,
      email: (leadData.email || '').trim()
    }).toString();
    const calendarUrl = `${CONFIG.leadCaptureConfig.ghlCalendarEmbedUrl}?${calendarParams}`;

    return (
      <div className="min-h-screen bg-white text-[#2B1713] flex flex-col justify-center px-4 py-10 sm:py-16 font-sans">
        
        {/* Minimal header */}
        <div className="max-w-xl mx-auto w-full flex items-center justify-between mb-6 sm:mb-10">
          <img 
            src="/beacon-logo.png" 
            alt="Beacon Corporate Realty" 
            className="h-8 sm:h-9 w-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FCDA Verified</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto w-full">
          
          {hasSubmittedDetails ? (
            /* ───────────────────────────────────────────────────────────── */
            /* CONFIRMATION VIEW (WHEN DETAILS SUBMITTED / MODAL CLOSED)    */
            /* ───────────────────────────────────────────────────────────── */
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#1F1614] tracking-tight mb-2">
                Viewing Appointment Requested!
              </h1>
              <p className="text-sm text-[#685752] mb-6">
                Thank you, <strong className="text-slate-900">{leadData.name}</strong>. Please pick your preferred date & time slot on the calendar below:
              </p>

              {/* Action Button: Calendar Booking Focused */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => {
                    setIsCalendarModalOpen(true);
                    trackScheduleOpened(matchedEstate?.name);
                  }}
                  className="w-full sm:w-auto bg-[#D9483B] hover:bg-[#C0392B] text-white font-extrabold px-10 py-4.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  <span>Open Calendar to Pick Date & Time 🗓️</span>
                </button>
              </div>

              {/* Matched Estate Summary Card */}
              {matchedEstate && (
                <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E1D9] p-4 sm:p-5 text-left shadow-xs">
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <img 
                      src={matchedEstate.image} 
                      alt={matchedEstate.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        Your Matched Offer
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                        {matchedEstate.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {matchedEstate.location} • {matchedEstate.titleType}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#E8E1D9]/70">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Plot Size</span>
                      <span className="text-xs font-black text-slate-900">{matchedEstate.defaultPlot.split(' ')[0]} SQM</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Promo Price</span>
                      <span className="text-xs font-black text-red-600">{matchedEstate.defaultPrice.replace(' Outright', '')}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Instant Savings</span>
                      <span className="text-xs font-black text-emerald-600">{matchedEstate.defaultSavings}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* ───────────────────────────────────────────────────────────── */
            /* APPOINTMENT REQUEST FORM (INITIAL STEP)                       */
            /* ───────────────────────────────────────────────────────────── */
            <div>
              {/* Top Eyebrow & Urgency Notice */}
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm font-extrabold text-[#D9483B] tracking-wide uppercase mb-2">
                  Great, thanks for your valuable input!
                </p>
                
                <h1 className="text-2xl sm:text-4xl font-black text-[#1F1614] tracking-tight mb-2.5">
                  Request Your Private Viewing Appointment
                </h1>

                {/* Offer Match Tag directly on form */}
                {matchedEstate && (
                  <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200/80 text-[#D9483B] px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9483B]" />
                    <span>Your Matched Estate: {matchedEstate.name} ({matchedEstate.location})</span>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs mt-1">
                    <span>⏱️</span>
                    <span><strong>Last Step:</strong> Please only arrange a meeting with us if you are actually interested 🤝</span>
                  </div>
                </div>
              </div>

              {/* Form matching Perspective Reference Screenshots */}
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                {/* Input 1: Full Name */}
                <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-300 focus-within:border-[#D9483B] focus-within:ring-4 focus-within:ring-red-500/10 transition-all">
                  <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                  <input 
                    type="text"
                    required
                    placeholder="First and last name"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium outline-none text-sm sm:text-base"
                  />
                </div>

                {/* Input 2: International Phone with Flag & Country Code */}
                <div className="relative flex items-center bg-white border border-slate-200/90 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xs hover:border-slate-300 focus-within:border-[#D9483B] focus-within:ring-4 focus-within:ring-red-500/10 transition-all">
                  
                  {/* Flag & Dial Code Trigger Button */}
                  <button 
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className="flex items-center gap-1.5 py-1 px-2 hover:bg-slate-100 rounded-xl transition-all cursor-pointer mr-2 border-r border-slate-200 pr-3 shrink-0"
                    title="Select country code"
                  >
                    <span className="text-xl sm:text-2xl leading-none">{selectedCountry.flag}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-700 ml-0.5">{selectedCountry.dialCode}</span>
                  </button>

                  {/* Phone Input */}
                  <input 
                    type="tel"
                    required
                    placeholder="Phone number of the contact person for the project"
                    value={phoneSubscriber}
                    onChange={(e) => setPhoneSubscriber(e.target.value)}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium outline-none text-sm sm:text-base py-1.5"
                  />

                  {/* Country Dropdown Popover */}
                  {countryDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setCountryDropdownOpen(false)}
                      />
                      <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 max-h-64 overflow-y-auto">
                        <div className="p-1 mb-1">
                          <div className="flex items-center px-2.5 py-1.5 bg-slate-100 rounded-xl">
                            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                            <input 
                              type="text"
                              placeholder="Search country or code..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full bg-transparent text-xs outline-none text-slate-800"
                              autoFocus
                            />
                          </div>
                        </div>
                        {filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setCountryDropdownOpen(false);
                              setCountrySearch('');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                              selectedCountry.code === c.code ? 'bg-red-50 text-[#D9483B] font-bold' : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{c.flag}</span>
                              <span className="truncate">{c.name}</span>
                            </div>
                            <span className="font-bold text-slate-500 shrink-0 ml-2">{c.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Input 3: Email Address */}
                <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-300 focus-within:border-[#D9483B] focus-within:ring-4 focus-within:ring-red-500/10 transition-all">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                  <input 
                    type="email"
                    placeholder="Email address"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium outline-none text-sm sm:text-base"
                  />
                </div>

                {/* Terms & Privacy Policy Checkbox */}
                <div className="flex items-start gap-3 pt-1 text-left">
                  <input 
                    type="checkbox" 
                    id="privacy_policy" 
                    required
                    checked={agreedPolicy}
                    onChange={(e) => setAgreedPolicy(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#D9483B] focus:ring-[#D9483B] cursor-pointer" 
                  />
                  <label htmlFor="privacy_policy" className="text-xs sm:text-sm text-slate-600 font-medium cursor-pointer leading-relaxed">
                    I understand and accept the <span className="underline text-slate-800">privacy policy</span>.
                  </label>
                </div>

                {/* Submit Button (Brand Color Red) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D9483B] hover:bg-[#C0392B] active:scale-[0.99] text-white rounded-2xl py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 mt-4 group"
                >
                  <span className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2">
                    {isSubmitting ? 'Opening Calendar...' : 'Open the calendar now 🗓️'}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                    and book an appointment
                  </span>
                </button>

              </form>

              {/* Confidential Notice */}
              <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>100% Confidential • Verified Beacon Corporate Realty Representative</span>
              </div>
            </div>
          )}

        </div>

        {/* CALENDAR MODAL OVERLAY (OPENS DIRECTLY ON SUBMIT OR BUTTON CLICK) */}
        {isCalendarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2.5 sm:p-6 animate-fade-in">
            <div className="bg-white w-full max-w-3xl h-[94vh] max-h-[820px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
              
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="text-base sm:text-lg font-black text-[#2B1713] tracking-tight">
                      Schedule Your Private Viewing Appointment
                    </h3>
                  </div>
                  <p className="text-xs text-[#685752] font-medium mt-0.5">
                    Beacon Corporate Realty • Guided VIP Inspection Appointment
                  </p>
                </div>

                <button 
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Calendar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Calendar Content with Pre-filled Params */}
              <div className="flex-1 w-full bg-white relative overflow-hidden">
                <iframe 
                  src={calendarUrl}
                  title="Beacon Private Inspection Calendar"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-slate-100 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant reservation confirmed to your WhatsApp ({leadData.phone || phoneSubscriber})</span>
                </div>
                <button
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="text-xs font-bold text-slate-700 hover:text-red-600 underline cursor-pointer"
                >
                  Done / Close Calendar →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  return null;
}
