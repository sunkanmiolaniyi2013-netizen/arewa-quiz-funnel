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
  Search,
  Phone
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
  const [showNotInterestedModal, setShowNotInterestedModal] = useState(false);

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
      trackQuestionViewed('q1', CONFIG.questions[0]?.title || 'Are you financially interested in the Navy Estate, Apo?');
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
    trackAnswerSelected('q1', option.title, CONFIG.questions[0]?.title);
    
    if (option.id === 'opt_no' || option.title?.toLowerCase() === 'no') {
      setShowNotInterestedModal(true);
      return;
    }

    trackQuizStarted();
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
    const currentQ = CONFIG.questions[currentStepIdx];
    trackAnswerSelected(qId, option.title || option.size, currentQ?.title);
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

    const isMilitary = answers.q2?.categoryKey === 'MILITARY' || answers.q2?.title?.includes('Military');
    const categoryTitle = answers.q2?.title || (isMilitary ? 'Military Personnel' : 'Civilian');
    const selectedPlot = answers.q3?.title || '250 SQM Plot';
    const selectedPrice = answers.q3?.price || (isMilitary ? '₦13.5M' : '₦16M');
    const inspectionTime = answers.q4?.title || 'Flexible';

    const formattedNotes = `🎯 NAVY ESTATE INNOVATION CITY APPLICATION:
• Estate: Navy Estate Innovation City (Cadastral Zone, Apo, Abuja)
• Developer: Naval Building & Construction Company Limited (NBCCL)
• Applicant Category: ${categoryTitle}
• Selected Plot: ${selectedPlot}
• Official Allocation Rate: ${selectedPrice}
• Inspection / Visit: ${inspectionTime}
• Financial Interest: ${answers.q1?.title || 'Yes'}
• Country: ${selectedCountry.name} (${selectedCountry.dialCode})
• Submitted: ${new Date().toLocaleString()}`;

    trackLeadCaptured({
      name: leadData.name.trim(),
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@nbccl.leads`,
      category: categoryTitle,
      selected_plot: selectedPlot,
      plot_price: selectedPrice,
      inspection_timing: inspectionTime,
      matched_estate_name: "Navy Estate Innovation City"
    }, estateObj.id);

    // GHL Webhook Payload
    const payload = {
      name: leadData.name.trim(),
      first_name: leadData.name.trim().split(' ')[0],
      last_name: leadData.name.trim().split(' ').slice(1).join(' ') || '',
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@nbccl.leads`,
      tags: [
        "navy-estate-innovation-city",
        isMilitary ? "category-military" : "category-civilian",
        "cadastral-zone-apo",
        "nbccl-application",
        `country-${selectedCountry.code.toLowerCase()}`
      ],
      notes: formattedNotes,
      custom_fields: {
        applicant_category: categoryTitle,
        selected_plot_size: selectedPlot,
        plot_price: selectedPrice,
        inspection_timeline: inspectionTime,
        matched_estate_name: "Navy Estate Innovation City",
        matched_estate_location: "Cadastral Zone, Apo, Abuja",
        country_code: selectedCountry.code
      },
      source: "Navy Estate Innovation City Quiz Funnel - NBCCL",
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
  // SCREEN 1: NAVY ESTATE INNOVATION CITY HERO & HOOK SCREEN (NBCCL)
  // --------------------------------------------------------------------------
  if (screen === 'PAGE_1') {
    const q1Config = CONFIG.questions[0];

    // Card component to allow clean reuse for top hero and below-fold CTA
    const OptionCards = () => (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl mx-auto w-full">
        {q1Config.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelectPage1Card(option)}
            className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-blue-900/20 cursor-pointer bg-white"
          >
            {/* Photo Top (1:1 Square Aspect Ratio so both fit side-by-side on mobile) */}
            <div className="w-full aspect-square overflow-hidden bg-slate-100">
              <img 
                src={option.image} 
                alt={option.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Solid Colored Action Bar (Iconic Perspective DNA) */}
            <div className={`${option.color || 'bg-[#0A2558]'} py-3 sm:py-4 px-2 sm:px-3 text-center text-white font-extrabold text-base sm:text-xl tracking-tight group-hover:brightness-105 transition-all shadow-xs`}>
              <span>{option.title}</span>
            </div>
          </button>
        ))}
      </div>
    );

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#0A2558] selection:text-white">
        
        {/* OFFICIAL NBCCL BRAND HEADER */}
        <header className="px-4 py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <img 
              src="/nbccl-logo.svg" 
              alt="NBCCL Crest" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <span className="text-xs sm:text-sm font-black text-[#0A2558] tracking-tight block leading-tight">
                NAVAL BUILDING &amp; CONSTRUCTION
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-wider uppercase block">
                COMPANY LIMITED (NBCCL)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#0A2558] bg-[#EEF4FC] border border-[#CBDDF7] px-3 py-1.5 rounded-full shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Cadastral Zone, Apo</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Military &amp; Civilians Welcome</span>
            </div>
          </div>
        </header>

        {/* HERO / HOOK CONTENT START */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-20 flex flex-col">
          
          {/* TOP EYEBROW BADGE */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-2 bg-[#EEF4FC] text-[#0A2558] border border-[#CBDDF7] px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Official Residential Opening • Apo, Abuja</span>
            </span>
          </div>

          {/* MAIN HEADLINE & QUESTION */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-[#0A2558] tracking-tight leading-[1.15] mb-3">
              A New Navy Estate Has Opened in Apo
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-5">
              A new opportunity has quietly opened in Apo, Abuja — and it’s not just another private estate. <strong className="text-slate-900 font-bold">Navy Estate Innovation City</strong> is a residential development by <strong className="text-[#0A2558] font-bold">Naval Building &amp; Construction Company Limited (NBCCL)</strong>, now open to <strong className="text-slate-900 font-bold">both military personnel and civilians</strong>.
            </p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Are you financially interested in the Navy Estate, Apo?
            </p>
          </div>

          {/* QUESTION 1 OPTION CARDS (PERSPECTIVE 2-CARD LAYOUT) */}
          <div className="mb-20 sm:mb-24">
            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 2: INSTITUTIONAL TRUST & EXECUTION FEATURES */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-12 border-t border-slate-200 mb-20 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2558] text-center max-w-2xl mx-auto mb-3 leading-tight">
              Why Navy Estate Innovation City by NBCCL?
            </h2>
            <p className="text-center text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-12">
              Guaranteed infrastructure, verified legal title, and structured development by Naval Building &amp; Construction Company Limited.
            </p>

            {/* 4 Circular Trust Feature Items in 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto text-center">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#EEF4FC] border border-[#CBDDF7] flex items-center justify-center mb-4 shadow-sm text-[#0A2558]">
                  <Building2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0A2558] mb-1.5">
                  Structured NBCCL Development
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                  Known for structured development, quality infrastructure, and prompt execution across Abuja.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#FAF5E6] border border-[#EEDFB8] flex items-center justify-center mb-4 shadow-sm text-[#C59B27]">
                  <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0A2558] mb-1.5">
                  Verified Cadastral Allocation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                  Located in Cadastral Zone, Apo, Abuja with verifiable allocation and clear title, ensuring zero dispute risk.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#EAF2EC] border border-[#D4E4D8] flex items-center justify-center mb-4 shadow-sm text-emerald-700">
                  <UserCheck className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0A2558] mb-1.5">
                  Military &amp; Civilian Inclusivity
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                  Now open to both Armed Forces personnel and civilian buyers with subsidized military rates and civilian allocations.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#EEF4FC] border border-[#CBDDF7] flex items-center justify-center mb-4 shadow-sm text-[#185ADB]">
                  <HardHat className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0A2558] mb-1.5">
                  Naval-Grade Infrastructure &amp; Security
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                  Perimeter fencing, 24/7 guarded gatehouse, asphalt access roads, dedicated power grid, and storm drainage.
                </p>
              </div>

            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 3: REPEATED CALL TO ACTION (PERSPECTIVE DNA) */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-12 border-t border-slate-200 mb-20 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A2558] tracking-tight mb-2">
                Check Plot Availability &amp; Opening Rates 🎯
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Are you financially interested in the Navy Estate, Apo?
              </p>
            </div>

            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 4: OFFICIAL NBCCL PROJECT & OFFICE CARD */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-[#0A2558] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-[#051535]">
              
              {/* Subtle Gold Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-slate-200 mb-4 border border-white/15">
                  <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Official Developer &amp; Project Liaison</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-white">
                  Naval Building &amp; Construction Company Limited
                </h3>
                
                <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed">
                  Cluster C, Admiralty Estate, Navy Town Asokoro, FCT Abuja.<br />
                  Direct Project Inquiries: <strong>+234 703 829 2131</strong>, <strong>+234 902 131 1681</strong><br />
                  Email: <strong>nbccl.ng@gmail.com</strong>
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-white/15">
                  <div className="text-xs text-slate-300">
                    Application Form No: <strong>JVA</strong> • Fee: <strong>₦30,000.00</strong>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NBCCL Verified Development</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* NOT INTERESTED POLITE MODAL */}
        {showNotInterestedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center">
              <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-black text-[#0A2558] mb-2">
                Thank You for Your Feedback! 🤝
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                We completely respect your timing. Navy Estate Innovation City in Apo is currently in its limited opening phase. If you'd ever like general inquiries or future updates from NBCCL, feel free to contact us:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 text-left mb-6 space-y-1.5">
                <div><strong>Office:</strong> Cluster C, Admiralty Estate, Navy Town Asokoro, Abuja</div>
                <div><strong>Phone:</strong> +234 703 829 2131 / +234 902 131 1681</div>
                <div><strong>Email:</strong> nbccl.ng@gmail.com</div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setShowNotInterestedModal(false);
                    // allow them to proceed if they change their mind
                    handleSelectPage1Card(q1Config.options[0]);
                  }}
                  className="w-full bg-[#0A2558] hover:bg-[#07193C] text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md"
                >
                  Actually, Check Plot Sizes &amp; Rates →
                </button>
                <button
                  onClick={() => setShowNotInterestedModal(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Naval Building &amp; Construction Company Limited (NBCCL). Navy Estate Innovation City, Cadastral Zone, Apo, Abuja.</p>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: QUIZ STEPS (QUESTIONS 2, 3, 4 - DYNAMIC BRANCHING)
  // --------------------------------------------------------------------------
  if (screen === 'QUIZ_STEPS') {
    const currentQ = CONFIG.questions[currentStepIdx];
    const progressPercent = Math.round(((currentStepIdx + 1) / CONFIG.questions.length) * 100);
    const isMilitary = answers.q2?.categoryKey === 'MILITARY' || answers.q2?.title?.includes('Military');

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#0A2558] selection:text-white">
        
        {/* TOP HEADER WITH BACK & STEP PROGRESS */}
        <header className="px-4 py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={handleBackStep}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0A2558] transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Step Counter Pill */}
          <div className="text-xs font-black text-[#0A2558] bg-[#EEF4FC] border border-[#CBDDF7] px-3.5 py-1.5 rounded-full shadow-2xs">
            Step {currentStepIdx + 1} of {CONFIG.questions.length}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cadastral Verified</span>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full pt-2">
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#0A2558] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* QUESTION CONTENT */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
          
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#0A2558] bg-[#EEF4FC] border border-[#CBDDF7] px-3 py-1 rounded-full inline-block mb-3 shadow-2xs">
              Step {currentStepIdx + 1} of {CONFIG.questions.length}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A2558] tracking-tight leading-tight mb-2">
              {currentQ.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
              {currentQ.id === 'q3' 
                ? (isMilitary ? "Exclusive subsidized military allocation rates for Armed Forces personnel:" : "Approved civilian allocation rates for private investors and families:")
                : currentQ.subtitle}
            </p>
          </div>

          {/* QUESTION 2: CATEGORY (MILITARY VS CIVILIAN) - 2 CLEAN CARDS 1x1 ON MOBILE */}
          {currentQ.id === 'q2' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl mx-auto w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-blue-900/20 cursor-pointer bg-white border border-slate-200/90 text-left"
                >
                  <div className="w-full aspect-square overflow-hidden bg-slate-100 relative">
                    <img 
                      src={option.image} 
                      alt={option.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {option.badge && (
                      <span className="absolute top-2.5 right-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 text-[#0A2558] shadow-md backdrop-blur-xs border border-white/70">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  <div className={`${option.color || 'bg-[#0A2558]'} py-3 sm:py-4 px-2.5 text-center text-white flex flex-col justify-center items-center min-h-[56px] sm:min-h-[64px] group-hover:brightness-105 transition-all shadow-xs`}>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                      {option.title}
                    </span>
                    {option.shortTag && (
                      <span className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight mt-0.5">
                        {option.shortTag}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* QUESTION 3: PLOT SIZES & PRICING (DYNAMIC BRANCHING) */}
          {currentQ.id === 'q3' && (() => {
            const plotOptions = isMilitary ? currentQ.militaryOptions : currentQ.civilianOptions;

            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4.5 max-w-3xl mx-auto w-full">
                {plotOptions.map((plot) => (
                  <button
                    key={plot.id}
                    onClick={() => handleSelectQuizStep(currentQ.id, plot)}
                    className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-900/20 cursor-pointer bg-white border border-slate-200/90 text-left"
                  >
                    {/* Top Plot Spec Header */}
                    <div className="p-3.5 sm:p-4 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-slate-100 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xl sm:text-2xl">{plot.icon || '🏡'}</span>
                        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isMilitary ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}`}>
                          {plot.badge || (isMilitary ? 'Military' : 'Civilian')}
                        </span>
                      </div>

                      <div>
                        <span className="font-black text-base sm:text-lg text-[#0A2558] tracking-tight block">
                          {plot.size}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500 font-semibold block leading-tight">
                          {plot.shortTag}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Bar with Big Bold Price */}
                    <div className={`${isMilitary ? 'bg-[#0A2558]' : 'bg-[#185ADB]'} py-3 sm:py-3.5 px-3 text-center text-white flex items-center justify-center gap-1.5 group-hover:brightness-110 transition-all shadow-xs`}>
                      <span className="text-xs sm:text-sm font-medium text-white/80">Price:</span>
                      <span className="font-black text-sm sm:text-base tracking-tight text-white">
                        {plot.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            );
          })()}

          {/* QUESTION 4: INSPECTION & VISIT AVAILABILITY */}
          {currentQ.id === 'q4' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-900/20 cursor-pointer bg-white border border-slate-200/90 text-left"
                >
                  <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-slate-100 flex-1 flex flex-col items-center text-center justify-center">
                    <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">
                      {option.icon}
                    </span>
                    <span className="font-black text-sm sm:text-base text-[#0A2558] tracking-tight">
                      {option.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                      {option.shortTag}
                    </span>
                  </div>

                  <div className={`${option.color || 'bg-[#0A2558]'} py-2.5 px-2 text-center text-white text-xs font-black tracking-wider uppercase group-hover:brightness-110 transition-all shadow-xs`}>
                    <span>Select Slot →</span>
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
  // SCREEN 3: LIVE ANALYZING (NBCCL 2-SECOND CALCULATION)
  // --------------------------------------------------------------------------
  if (screen === 'ANALYZING') {
    const isMilitary = answers.q2?.categoryKey === 'MILITARY' || answers.q2?.title?.includes('Military');
    const stages = [
      `Reviewing your ${isMilitary ? "Military statutory" : "Civilian"} qualification...`,
      "Verifying Cadastral Zone, Apo plot allocations...",
      `Applying official ${isMilitary ? "subsidized Armed Forces rates" : "opening prices"}...`,
      "Preparing your VIP property reservation & inspection pass!"
    ];

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 font-sans text-[#0F172A]">
        <div className="max-w-md w-full text-center">
          
          {/* Animated Spinner */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-[#0A2558] border-t-transparent animate-spin"
            ></div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-[#0A2558]">
              {analyzingProgress}%
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0A2558] mb-3 tracking-tight">
            Matching Your Apo Property Allocation...
          </h2>

          <p className="text-sm font-bold text-[#185ADB] h-6 transition-all duration-300">
            {stages[analyzingStage]}
          </p>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-6">
            <div 
              className="bg-[#0A2558] h-full transition-all duration-200 ease-out rounded-full"
              style={{ width: `${analyzingProgress}%` }}
            ></div>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 4: OPT-IN & APPOINTMENT BOOKING (NBCCL & APO)
  // --------------------------------------------------------------------------
  if (screen === 'OPT_IN') {
    const isMilitary = answers.q2?.categoryKey === 'MILITARY' || answers.q2?.title?.includes('Military');
    const categoryTitle = answers.q2?.title || (isMilitary ? 'Military Personnel' : 'Civilian');
    const selectedPlot = answers.q3?.title || '250 SQM Plot';
    const selectedPrice = answers.q3?.price || (isMilitary ? '₦13.5M' : '₦16M');
    const inspectionTime = answers.q4?.title || 'Flexible';

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
      <div className="min-h-screen bg-white text-[#0F172A] flex flex-col justify-center px-4 py-10 sm:py-16 font-sans">
        
        {/* Minimal header */}
        <div className="max-w-xl mx-auto w-full flex items-center justify-between mb-6 sm:mb-10">
          <div className="flex items-center gap-3">
            <img 
              src="/nbccl-logo.svg" 
              alt="NBCCL Crest" 
              className="h-10 sm:h-11 w-auto object-contain shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <span className="text-xs sm:text-sm font-black text-[#0A2558] block leading-tight">
                NAVAL BUILDING &amp; CONSTRUCTION
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                COMPANY LIMITED (NBCCL)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cadastral Verified</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto w-full">
          
          {hasSubmittedDetails ? (
            /* ───────────────────────────────────────────────────────────── */
            /* CONFIRMATION VIEW (WHEN DETAILS SUBMITTED)                   */
            /* ───────────────────────────────────────────────────────────── */
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#0A2558] tracking-tight mb-2">
                Viewing Appointment Requested!
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                Thank you, <strong className="text-slate-900">{leadData.name}</strong>. Please select your specific time slot on the calendar below:
              </p>

              {/* Action Button: Calendar Booking Focused */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => {
                    setIsCalendarModalOpen(true);
                    trackScheduleOpened("Navy Estate Innovation City");
                  }}
                  className="w-full sm:w-auto bg-[#0A2558] hover:bg-[#07193C] text-white font-extrabold px-10 py-4.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  <span>Open Calendar to Pick Date &amp; Time 🗓️</span>
                </button>
              </div>

              {/* Matched Estate Summary Card */}
              <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200 p-4 sm:p-5 text-left shadow-xs">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <img 
                    src="/innovation-city.jpg" 
                    alt="Navy Estate Innovation City"
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#EEF4FC] text-[#0A2558] border border-[#CBDDF7]">
                      {categoryTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#0A2558] mt-1">
                      Navy Estate Innovation City
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Cadastral Zone, Apo, Abuja • NBCCL
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-200">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Plot Size</span>
                    <span className="text-xs font-black text-slate-900">{answers.q3?.size || '250 SQM'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Allocation Rate</span>
                    <span className="text-xs font-black text-[#0A2558]">{selectedPrice}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Inspection</span>
                    <span className="text-xs font-black text-emerald-600">{inspectionTime}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* ───────────────────────────────────────────────────────────── */
            /* APPOINTMENT REQUEST FORM (INITIAL STEP)                       */
            /* ───────────────────────────────────────────────────────────── */
            <div>
              {/* Top Eyebrow & Notice */}
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm font-extrabold text-[#0A2558] tracking-wide uppercase mb-2">
                  Great, thanks for your valuable input!
                </p>
                
                <h1 className="text-2xl sm:text-4xl font-black text-[#0A2558] tracking-tight mb-2.5">
                  Request Your Private Viewing Appointment
                </h1>

                {/* Offer Match Tag directly on form */}
                <div className="inline-flex items-center gap-2 bg-[#EEF4FC] border border-[#CBDDF7] text-[#0A2558] px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Matched: {answers.q3?.title || 'Selected Plot'} • {categoryTitle}</span>
                </div>
                
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs mt-1">
                    <span>⏱️</span>
                    <span><strong>Last Step:</strong> Please only arrange an inspection if you are actually interested 🤝</span>
                  </div>
                </div>
              </div>

              {/* Form matching Perspective Reference */}
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                {/* Input 1: Full Name */}
                <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-300 focus-within:border-[#0A2558] focus-within:ring-4 focus-within:ring-blue-900/10 transition-all">
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
                <div className="relative flex items-center bg-white border border-slate-200/90 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xs hover:border-slate-300 focus-within:border-[#0A2558] focus-within:ring-4 focus-within:ring-blue-900/10 transition-all">
                  
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
                    placeholder="Phone number of contact person"
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
                              selectedCountry.code === c.code ? 'bg-blue-50 text-[#0A2558] font-bold' : 'hover:bg-slate-50 text-slate-800'
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
                <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-300 focus-within:border-[#0A2558] focus-within:ring-4 focus-within:ring-blue-900/10 transition-all">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                  <input 
                    type="email"
                    placeholder="Email address (optional)"
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
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0A2558] focus:ring-[#0A2558] cursor-pointer" 
                  />
                  <label htmlFor="privacy_policy" className="text-xs sm:text-sm text-slate-600 font-medium cursor-pointer leading-relaxed">
                    I understand and accept the <span className="underline text-slate-800">privacy policy</span>.
                  </label>
                </div>

                {/* Submit Button (Official NBCCL Navy) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2558] hover:bg-[#07193C] active:scale-[0.99] text-white rounded-2xl py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 mt-4 group"
                >
                  <span className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2">
                    {isSubmitting ? 'Opening Calendar...' : 'Open the calendar now 🗓️'}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                    and book your private site inspection
                  </span>
                </button>

              </form>

              {/* Confidential Notice */}
              <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>100% Confidential • Official NBCCL Development Representative</span>
              </div>
            </div>
          )}

        </div>

        {/* CALENDAR MODAL OVERLAY */}
        {isCalendarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2.5 sm:p-6 animate-fade-in">
            <div className="bg-white w-full max-w-3xl h-[94vh] max-h-[820px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
              
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="text-base sm:text-lg font-black text-[#0A2558] tracking-tight">
                      Schedule Your Private Viewing Appointment
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Naval Building &amp; Construction Company Limited (NBCCL) • Apo Site or Asokoro Liaison Office
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
                  title="Navy Estate Private Inspection Calendar"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-slate-100 bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reservation confirmed to your phone / WhatsApp ({leadData.phone || phoneSubscriber})</span>
                </div>
                <button
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="text-xs font-bold text-slate-700 hover:text-[#0A2558] underline cursor-pointer"
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
