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
  Phone,
  Compass,
  Home,
  CheckCircle,
  AlertCircle,
  CheckCheck,
  MoreVertical,
  MessageSquare
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
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analyzingStage, setAnalyzingStage] = useState(0);
  const [showNotInterestedModal, setShowNotInterestedModal] = useState(false);

  // 15-Minute Promo Reservation Countdown Timer
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

  // Listen for GHL calendar appointment booking completion
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (
          data?.type === 'booking_successful' || 
          data?.action === 'booking_success' || 
          data?.event === 'appointment_booked' ||
          data?.msg === 'appointment_booked' ||
          data?.status === 'confirmed'
        ) {
          setScreen('THANK_YOU');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (e) {
        // Ignore non-json postMessages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Track step & question views for Funnel Analytics
  useEffect(() => {
    if (screen === 'PAGE_1') {
      trackQuestionViewed('q1', CONFIG.questions[0]?.title || 'Are you financially interested in Arewa Residences?');
    } else if (screen === 'QUIZ_STEPS') {
      const q = CONFIG.questions[currentStepIdx];
      if (q) {
        trackQuestionViewed(q.id, q.title);
      }
    } else if (screen === 'OPT_IN') {
      trackQuestionViewed('optin', 'Arewa Residences Presale Opt-In Form');
    } else if (screen === 'CALENDAR') {
      trackQuestionViewed('calendar', 'VIP Site Inspection Calendar Booking');
    } else if (screen === 'THANK_YOU') {
      trackQuestionViewed('thank_you', 'Reservation Confirmed - WhatsApp Clearance Instructions');
    }
  }, [screen, currentStepIdx]);

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

    setCurrentStepIdx(1); // Move to Question 2 (Objective)
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

    const selectedObjective = answers.q2?.title || 'Buy & Build (Family Residence)';
    const selectedPlot = answers.q3?.title || '250 SQM (₦5.5M Presale)';
    const selectedPlotSize = answers.q3?.size || '250 SQM';
    const selectedPresalePrice = answers.q3?.price || '₦5.5M';
    const selectedActualPrice = answers.q3?.actualPrice || '₦11M';
    const inspectionTime = answers.q4?.title || 'This Week';

    const formattedNotes = `🎯 AREWA RESIDENCES PRESALE APPLICATION:
• Project: Arewa Residences (New Millennium City, Kaduna)
• Developer: Beacon Corporate Realty Ltd
• Title: C of O Title (KADGIS Verifiable)
• Selected Plot: ${selectedPlot} (${selectedPlotSize})
• Presale Price: ${selectedPresalePrice} (Actual Launch Price: ${selectedActualPrice} - 50% Off)
• 3-Month Plan: ${answers.q3?.threeMonthPlan || 'Available'}
• Buyer Objective: ${selectedObjective}
• Inspection / Consultation: ${inspectionTime}
• Country: ${selectedCountry.name} (${selectedCountry.dialCode})
• Financial Interest: ${answers.q1?.title || 'Yes'}
• Submitted: ${new Date().toLocaleString()}`;

    trackLeadCaptured({
      name: leadData.name.trim(),
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@arewa.leads`,
      category: selectedObjective,
      selected_plot: selectedPlot,
      plot_price: selectedPresalePrice,
      inspection_timing: inspectionTime,
      matched_estate_name: "Arewa Residences, Kaduna"
    }, "AREWA_RESIDENCES");

    // GHL Webhook Payload
    const payload = {
      name: leadData.name.trim(),
      first_name: leadData.name.trim().split(' ')[0],
      last_name: leadData.name.trim().split(' ').slice(1).join(' ') || '',
      phone: fullPhone,
      email: leadData.email ? leadData.email.trim() : `${cleanPhone || Date.now()}@arewa.leads`,
      tags: [
        "arewa-residences-kaduna",
        "beacon-corporate-realty",
        "new-millennium-city",
        "presale-50-percent-off",
        `plot-${selectedPlotSize.toLowerCase().replace(/\s+/g, '-')}`,
        `objective-${selectedObjective.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        `country-${selectedCountry.code.toLowerCase()}`
      ],
      notes: formattedNotes,
      custom_fields: {
        applicant_objective: selectedObjective,
        selected_plot_size: selectedPlotSize,
        presale_price: selectedPresalePrice,
        actual_price: selectedActualPrice,
        inspection_timeline: inspectionTime,
        development_project: "Arewa Residences",
        location: "New Millennium City, Kaduna",
        title_type: "C of O Title",
        country_code: selectedCountry.code
      },
      source: "Arewa Residences Kaduna Funnel - Beacon Realty",
      submitted_at: new Date().toISOString()
    };

    // Fire webhook (non-blocking)
    fetch(CONFIG.leadCaptureConfig.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(err => console.error("Webhook error:", err));

    trackQuizCompleted("AREWA_RESIDENCES");

    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmittedDetails(true);
      setScreen('CALENDAR');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  // --------------------------------------------------------------------------
  // SCREEN 1: HERO & QUESTION 1 (AREWA RESIDENCES • BEACON REALTY)
  // --------------------------------------------------------------------------
  if (screen === 'PAGE_1') {
    const q1Config = CONFIG.questions[0];

    const OptionCards = () => (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl mx-auto w-full">
        {q1Config.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelectPage1Card(option)}
            className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-red-700/20 cursor-pointer bg-white border border-slate-200 hover:border-[#B8001F]"
          >
            {/* Photo Top (1:1 Square Aspect Ratio) */}
            <div className="w-full aspect-square overflow-hidden bg-slate-100 relative">
              <img 
                src={option.image} 
                alt={option.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {option.badge && (
                <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-white/20">
                  {option.badge}
                </div>
              )}
            </div>

            {/* Bottom Solid Colored Action Bar (Iconic Perspective DNA - Flyer Crimson) */}
            <div className={`${option.color || 'bg-[#B8001F]'} py-3 sm:py-4 px-2 sm:px-3 text-center text-white font-extrabold text-base sm:text-xl tracking-tight group-hover:brightness-110 transition-all shadow-xs`}>
              <span>{option.title}</span>
            </div>
          </button>
        ))}
      </div>
    );

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#B8001F] selection:text-white">
        
        {/* TOP URGENCY / SCARCITY TICKER */}
        <div className="bg-gradient-to-r from-[#8B0000] via-[#B8001F] to-[#8B0000] text-white py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm">
          <span className="animate-pulse">🔥</span>
          <span><strong>PRESALE TIER 1 OPEN:</strong> 50% Off Outright Allocation • Only 8 Slots Remaining in Batch 1</span>
          <span className="hidden md:inline bg-black/30 text-white/90 text-[10px] uppercase font-black px-2 py-0.5 rounded-full ml-1">
            Ends Soon
          </span>
        </div>

        {/* OFFICIAL BEACON CORPORATE REALTY HEADER */}
        <header className="px-4 py-3 sm:py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <img 
              src="/beacon-logo.png" 
              alt="Beacon Corporate Realty Ltd" 
              className="h-9 sm:h-11 w-auto object-contain shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="text-xs sm:text-sm font-black text-[#111827] tracking-tight block leading-tight">
                BEACON CORPORATE REALTY LTD
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#B8001F] tracking-wide uppercase block">
                Secure Your Tomorrow.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#111827] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#B8001F]" />
              <span>New Millennium City, Kaduna</span>
            </div>

            {/* GOLD C OF O BADGE (From Flyer) */}
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#78350F] bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 px-3 py-1.5 rounded-full shadow-2xs">
              <Award className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>C OF O TITLE</span>
            </div>
          </div>
        </header>

        {/* HERO / HOOK CONTENT START */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-20 flex flex-col">
          
          {/* TOP EYEBROW BADGE */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-2 bg-red-50 text-[#B8001F] border border-red-200 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B8001F]" />
              <span>Official Presale Now Open • Buy &amp; Build Directly on a Tarred Road</span>
            </span>
          </div>

          {/* MAIN HEADLINE & NARRATIVE */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] tracking-tight leading-[1.12] mb-3">
              Arewa Residences Is Now Open in New Millennium City
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-5">
              Kaduna's primary growth corridor has officially unlocked. Situated on the direct expansion boundary with <strong className="text-slate-900 font-bold">Ungwan Rimi</strong> (the <em>"Maitama of Kaduna"</em>), <strong className="text-[#B8001F] font-bold">Arewa Residences</strong> offers genuine <strong className="text-slate-900 font-bold">C of O titled land</strong>, fully serviced directly on a tarred road at <strong className="text-[#B8001F] font-bold">50% presale discount</strong> before public launch.
            </p>
            <p className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Are you financially interested in securing a plot at Arewa Residences, New Millennium City?
            </p>
          </div>

          {/* QUESTION 1 OPTION CARDS (PERSPECTIVE 2-CARD LAYOUT) */}
          <div className="mb-14 sm:mb-16">
            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 2: FLYER HIGHLIGHTS & CORE PILLARS                    */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-14 sm:mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-black text-[#B8001F] uppercase tracking-widest block mb-1">
                Invest • Live • Build • Belong
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                Why Smart Money Is Securing Arewa Residences Now
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Item 1 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#B8001F] flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Directly on a Tarred Road
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Zero interior bush pathways or rugged access. Immediate smooth asphalt connectivity straight to your plot gate.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  C of O Title (KADGIS Verified)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  100% government titled land. 100% free from customary family disputes. Verifiable directly at the Kaduna Geographic Information Service.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Buy &amp; Build Ready
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Solid, dry, ready-to-build topography. Start your foundation immediately or hold for massive capital growth.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Ungwan Rimi Spillover Corridor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ungwan Rimi is fully built-out with land at ₦30M–₦60M+. Millennium City is the natural expansion corridor for Kaduna's elite.
                </p>
              </div>

              {/* Item 5 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Elite Landmarks &amp; Security
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Surrounded by the Nigerian Navy Base, Police Housing Estate, NNPC quarters, and the President Tinubu-commissioned General Hospital.
                </p>
              </div>

              {/* Item 6 */}
              <div className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#B8001F] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  50% Instant Presale Margin
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Enter at ₦3.5M instead of ₦7M, or ₦5.5M instead of ₦11M. Lock in 100% price upside the moment the estate launches publicly.
                </p>
              </div>

            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 3: REPEATED CALL TO ACTION (PERSPECTIVE DNA)          */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="pt-6 mb-16 sm:mb-20">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-black text-[#B8001F] uppercase tracking-widest block mb-1">
                Limited Allocations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mb-2">
                Check Plot Availability &amp; 50% Presale Rates 🎯
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Are you financially interested in securing a plot at Arewa Residences, New Millennium City?
              </p>
            </div>

            <OptionCards />
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SECTION 4: OFFICIAL BEACON CORPORATE REALTY CARD             */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-slate-800">
              
              {/* Crimson Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8001F]/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-slate-200 mb-4 border border-white/15">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Developer &amp; Project Liaison</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-white">
                  Beacon Corporate Realty Ltd
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                  New Millennium City Expansion Corridor, Kaduna, Nigeria.<br />
                  Official Website: <strong>www.beaconrealty.ng</strong><br />
                  Slogan: <em>"Arewa Today, Greater Tomorrows."</em>
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-white/15">
                  <div className="text-xs text-slate-300">
                    Title: <strong>Certificate of Occupancy (C of O)</strong> • Cadastral Registered
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>KADGIS Verifiable Project</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* NOT INTERESTED MODAL */}
        {showNotInterestedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center">
              <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-black text-[#111827] mb-2">
                Thank You for Your Feedback! 🤝
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                We completely respect your timing. Arewa Residences in New Millennium City is currently in its limited 50% early-bird presale phase. If you'd like general updates or future estate announcements in Kaduna, our team is always available:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 text-left mb-6 space-y-1.5">
                <div><strong>Company:</strong> Beacon Corporate Realty Ltd</div>
                <div><strong>Location:</strong> New Millennium City, Kaduna</div>
                <div><strong>Website:</strong> www.beaconrealty.ng</div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setShowNotInterestedModal(false);
                    handleSelectPage1Card(q1Config.options[0]);
                  }}
                  className="w-full bg-[#B8001F] hover:bg-[#8B0000] text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md"
                >
                  Actually, Check Plot Sizes &amp; 50% Rates →
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
          <p>© {new Date().getFullYear()} Beacon Corporate Realty Ltd. Arewa Residences, New Millennium City, Kaduna. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: QUIZ STEPS (QUESTIONS 2, 3, 4)
  // --------------------------------------------------------------------------
  if (screen === 'QUIZ_STEPS') {
    const currentQ = CONFIG.questions[currentStepIdx];
    const progressPercent = Math.round(((currentStepIdx + 1) / CONFIG.questions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-100/90 text-[#0F172A] flex flex-col font-sans selection:bg-[#B8001F] selection:text-white">
        
        {/* TOP HEADER WITH BACK & STEP PROGRESS */}
        <header className="px-4 py-3 sm:py-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={handleBackStep}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#B8001F] transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Step Counter Pill */}
          <div className="text-xs font-black text-[#B8001F] bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-2xs">
            Step {currentStepIdx + 1} of {CONFIG.questions.length}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-300 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>C OF O TITLE</span>
          </div>
        </header>

        {/* PROGRESS BAR WITH FLYER CRIMSON FILL */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full pt-2">
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#B8001F] to-[#DC2626] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* QUESTION CONTENT */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
          
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#B8001F] bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block mb-3 shadow-2xs">
              Step {currentStepIdx + 1} of {CONFIG.questions.length}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight leading-tight mb-2">
              {currentQ.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto">
              {currentQ.subtitle}
            </p>
          </div>

          {/* QUESTION 2: OBJECTIVE CARDS */}
          {currentQ.id === 'q2' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-300 hover:border-[#B8001F] shadow-sm hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-left cursor-pointer relative"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl sm:text-3xl shadow-2xs group-hover:scale-105 transition-transform">
                      {option.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-[#B8001F] border border-red-200">
                      {option.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 group-hover:text-[#B8001F] transition-colors leading-snug">
                    {option.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                    {option.subtitle}
                  </p>

                  <div className="mt-auto pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black text-[#B8001F]">
                    <span>{option.shortTag}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* QUESTION 3: THE 4 PLOTS & 50% PRICING MATRIX */}
          {currentQ.id === 'q3' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
              {currentQ.options.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, plot)}
                  className="group flex flex-col rounded-2xl bg-white border-2 border-slate-300 hover:border-[#B8001F] shadow-sm hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-left cursor-pointer overflow-hidden"
                >
                  {/* Top Dark Header Bar (From Flyer) */}
                  <div className="bg-[#111827] text-white p-3 sm:p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-base sm:text-lg font-black tracking-tight block">
                        {plot.size}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
                        {plot.buildingType}
                      </span>
                    </div>
                    <span className="text-xs font-black uppercase px-2.5 py-1 rounded-md bg-[#B8001F] text-white">
                      50% OFF
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#F8FAFC]">
                    
                    {/* Pricing Grid */}
                    <div className="space-y-2 mb-4">
                      
                      {/* Presale Outright (Big Bold Red) */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 text-center">
                        <span className="text-[9px] uppercase font-black text-[#B8001F] tracking-wider block">
                          PRESALE (OUTRIGHT)
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-[#B8001F] tracking-tight block">
                          {plot.price}
                        </span>
                      </div>

                      {/* 3-Month Plan & Actual Price */}
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="bg-slate-100 rounded-lg p-2 border border-slate-200">
                          <span className="text-[9px] uppercase font-bold text-slate-500 block">3-Month Plan</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900">{plot.threeMonthPlan}</span>
                        </div>
                        <div className="bg-slate-100 rounded-lg p-2 border border-slate-200">
                          <span className="text-[9px] uppercase font-bold text-slate-500 block">Actual Price</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-400 line-through decoration-red-600 decoration-2">
                            {plot.actualPrice}
                          </span>
                        </div>
                      </div>

                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                      {plot.subtitle}
                    </p>

                    <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-black text-[#B8001F] group-hover:text-[#8B0000]">
                      <span>Select This Plot ({plot.savings})</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                </button>
              ))}
            </div>
          )}

          {/* QUESTION 4: INSPECTION / CONSULTATION */}
          {currentQ.id === 'q4' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectQuizStep(currentQ.id, option)}
                  className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-300 hover:border-[#B8001F] shadow-sm hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl sm:text-3xl">
                      {option.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-[#B8001F] border border-red-200">
                      {option.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1 group-hover:text-[#B8001F] transition-colors">
                    {option.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-600 mb-2 block">{option.shortTag}</span>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {option.subtitle}
                  </p>
                </button>
              ))}
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
          <p>Arewa Residences • Beacon Corporate Realty Ltd</p>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 3: ANALYZING ANIMATION (PERSPECTIVE ENGINE)
  // --------------------------------------------------------------------------
  if (screen === 'ANALYZING') {
    const stages = [
      "Checking Arewa Residences presale plot availability in New Millennium City...",
      "Applying 50% early-bird discount & calculating outright savings...",
      "Verifying C of O title documentation and tarred road frontage...",
      "Reserving your VIP Site Inspection & Allocation Pass..."
    ];

    return (
      <div className="min-h-screen bg-white text-[#0F172A] flex flex-col justify-center items-center px-4 py-12 font-sans selection:bg-[#B8001F] selection:text-white">
        <div className="max-w-md w-full text-center">
          
          {/* Beacon Logo */}
          <div className="mb-8">
            <img 
              src="/beacon-logo.png" 
              alt="Beacon Corporate Realty" 
              className="h-12 w-auto mx-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Spinner Ring in Crimson */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-red-100 border-t-[#B8001F] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-[#B8001F]">
              {analyzingProgress}%
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#111827] mb-2 tracking-tight">
            Allocating Presale Plot...
          </h2>

          <p className="text-sm font-semibold text-slate-600 min-h-[48px] px-4 leading-relaxed animate-pulse">
            {stages[analyzingStage]}
          </p>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6 border border-slate-200">
            <div 
              className="bg-gradient-to-r from-[#B8001F] to-[#DC2626] h-full transition-all duration-200 rounded-full"
              style={{ width: `${analyzingProgress}%` }}
            ></div>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 4: OPT-IN DETAILS FORM (AREWA RESIDENCES)
  // --------------------------------------------------------------------------
  if (screen === 'OPT_IN') {
    const selectedPlotSize = answers.q3?.size || '250 SQM';
    const selectedPrice = answers.q3?.price || '₦5.5M';
    const selectedActual = answers.q3?.actualPrice || '₦11M';

    const filteredCountries = countrySearch.trim()
      ? COUNTRIES.filter(c => 
          c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
          c.dialCode.includes(countrySearch)
        )
      : COUNTRIES;

    return (
      <div className="min-h-screen bg-slate-100/90 text-[#0F172A] flex flex-col justify-center px-4 py-8 sm:py-12 font-sans selection:bg-[#B8001F] selection:text-white">
        
        {/* Minimal header */}
        <div className="max-w-xl mx-auto w-full flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5">
            <img 
              src="/beacon-logo.png" 
              alt="Beacon Corporate Realty" 
              className="h-9 sm:h-10 w-auto object-contain shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <span className="text-xs sm:text-sm font-black text-[#111827] block leading-tight">
                BEACON CORPORATE REALTY LTD
              </span>
              <span className="text-[10px] font-semibold text-[#B8001F] uppercase block">
                Arewa Residences • Kaduna
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-300">
            <Award className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>C OF O TITLE</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto w-full">
          
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 shadow-xl">
            
            {/* Top Countdown Urgency Banner */}
            <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8001F] animate-pulse" />
                <span className="font-bold text-slate-700">Holding 50% Presale Price:</span>
              </div>
              <span className="font-black text-[#B8001F] text-sm tracking-wider font-mono">
                {formatTimer(timeLeft)}
              </span>
            </div>

            {/* Top Eyebrow & Notice */}
            <div className="text-center mb-6">
              <p className="text-xs sm:text-sm font-extrabold text-[#B8001F] tracking-wide uppercase mb-1">
                Great, your presale allocation is matched!
              </p>
              
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mb-2">
                Request Your Guided Site Inspection
              </h1>

              {/* Offer Match Tag directly on form */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#B8001F] px-4 py-1.5 rounded-full text-xs font-bold mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B8001F]" />
                <span>Matched: {selectedPlotSize} @ {selectedPrice} (Save 50% vs ~~{selectedActual}~~)</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              
              {/* Input 1: Full Name */}
              <div className="flex items-center bg-white border-2 border-slate-300 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-400 focus-within:border-[#B8001F] focus-within:ring-4 focus-within:ring-red-700/10 transition-all">
                <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input 
                  type="text"
                  required
                  placeholder="First and last name"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-semibold outline-none text-sm sm:text-base"
                />
              </div>

              {/* Input 2: International Phone with Flag & Country Code */}
              <div className="relative flex items-center bg-white border-2 border-slate-300 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xs hover:border-slate-400 focus-within:border-[#B8001F] focus-within:ring-4 focus-within:ring-red-700/10 transition-all">
                
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
                  placeholder="Phone number / WhatsApp"
                  value={phoneSubscriber}
                  onChange={(e) => setPhoneSubscriber(e.target.value)}
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-semibold outline-none text-sm sm:text-base py-1.5"
                />

                {/* Country Dropdown Popover */}
                {countryDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setCountryDropdownOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border-2 border-slate-300 z-50 p-2 max-h-64 overflow-y-auto">
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
                            selectedCountry.code === c.code ? 'bg-red-50 text-[#B8001F] font-bold' : 'hover:bg-slate-50 text-slate-800'
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
              <div className="flex items-center bg-white border-2 border-slate-300 rounded-2xl px-4 py-3.5 sm:py-4 shadow-2xs hover:border-slate-400 focus-within:border-[#B8001F] focus-within:ring-4 focus-within:ring-red-700/10 transition-all">
                <Mail className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input 
                  type="email"
                  placeholder="Email address (optional)"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-semibold outline-none text-sm sm:text-base"
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
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#B8001F] focus:ring-[#B8001F] cursor-pointer" 
                />
                <label htmlFor="privacy_policy" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer leading-relaxed">
                  I understand and accept the <span className="underline text-slate-900 font-bold">privacy policy</span>.
                </label>
              </div>

              {/* Submit Button (Advances directly to Calendar) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#B8001F] via-[#DC2626] to-[#8B0000] hover:brightness-110 active:scale-[0.99] text-white rounded-2xl py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 mt-4 group"
              >
                <span className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2">
                  {isSubmitting ? 'Submitting Details...' : 'Continue to Select Date & Time on Calendar 🗓️'}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                  Pick your private VIP site inspection tour slot
                </span>
              </button>

            </form>

            {/* Confidential Notice */}
            <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>100% Confidential • Official Beacon Corporate Realty Representative</span>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 5: CALENDAR BOOKING (PICK DATE & TIME FOR INSPECTION)
  // --------------------------------------------------------------------------
  if (screen === 'CALENDAR') {
    const cleanPhone = (leadData.phone || `${selectedCountry.dialCode}${phoneSubscriber.trim()}`).replace(/[^\d+]/g, '');
    const calendarParams = new URLSearchParams({
      first_name: (leadData.name || '').trim().split(' ')[0],
      last_name: (leadData.name || '').trim().split(' ').slice(1).join(' ') || (leadData.name || '').trim().split(' ')[0],
      phone: cleanPhone,
      email: (leadData.email || '').trim()
    }).toString();
    const calendarUrl = `${CONFIG.leadCaptureConfig.ghlCalendarEmbedUrl}?${calendarParams}`;

    return (
      <div className="min-h-screen bg-slate-100/90 text-[#0F172A] flex flex-col font-sans selection:bg-[#B8001F] selection:text-white">
        
        {/* Top Navigation Bar */}
        <header className="px-4 py-3 sm:py-4 sm:px-8 max-w-4xl mx-auto w-full flex items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
          <button 
            onClick={() => setScreen('OPT_IN')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#B8001F] transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </button>

          <div className="text-xs font-black text-[#B8001F] bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-2xs">
            Step 2 of 2: Inspection Calendar
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-300">
            <Award className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>C OF O TITLE</span>
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
          
          {/* Top Urgency Banner */}
          <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8001F] animate-pulse" />
              <span className="font-bold text-slate-700">Holding 50% Presale Price for {leadData.name ? leadData.name.split(' ')[0] : 'You'}:</span>
            </div>
            <span className="font-black text-[#B8001F] text-sm tracking-wider font-mono">
              {formatTimer(timeLeft)}
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B8001F] bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block mb-2.5">
              🗓️ FINAL STEP BEFORE CLEARANCE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight leading-tight mb-2">
              Select Your Private Inspection Date &amp; Time
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl mx-auto">
              Choose an available slot on the calendar below to finalize your booking directly into our system.
            </p>
          </div>

          {/* 2-Step Action Callout Box */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-4 text-xs sm:text-sm text-amber-950 shadow-2xs">
            <div className="flex items-center gap-2 font-black text-amber-900 text-sm mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>TWO STEPS TO LOCK IN YOUR BOOKING:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800 mt-2">
              <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="bg-amber-500 text-white w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5">1</span>
                <span>Select your preferred <strong>Date</strong>, pick a <strong>Time slot</strong>, and click <strong>Select Time</strong>.</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="bg-emerald-600 text-white w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5">2</span>
                <span>Click the blue <strong>"Schedule Meeting"</strong> button inside the calendar to register it in our CRM!</span>
              </div>
            </div>
          </div>

          {/* Embedded Calendar Container */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden mb-6 flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  Live Booking Calendar • Arewa Residences
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                1-on-1 Guided Inspection
              </span>
            </div>

            <div className="w-full h-[760px] sm:h-[840px] bg-white relative">
              <iframe 
                src={calendarUrl}
                title="Arewa Residences Private Inspection Calendar"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Action Button to Proceed to Thank You Page */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-5 sm:p-6 text-center shadow-lg">
            <p className="text-sm sm:text-base font-extrabold text-slate-900 mb-1">
              Have you clicked "Schedule Meeting" inside the calendar above?
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4 max-w-md mx-auto">
              Once you confirm your booking on the calendar, click below to see your security gate clearance pass and WhatsApp notice instructions:
            </p>
            <button
              onClick={() => {
                setScreen('THANK_YOU');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-gradient-to-r from-[#B8001F] via-[#DC2626] to-[#8B0000] hover:brightness-110 active:scale-[0.99] text-white rounded-2xl py-4.5 px-6 shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base sm:text-lg font-black cursor-pointer group"
            >
              <span>Yes, I've Scheduled My Meeting → View Gate Clearance</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              ⚠️ If you haven't clicked "Schedule Meeting" inside the calendar above yet, please do so first so our advisor sees it!
            </p>
          </div>

        </main>

        <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Beacon Corporate Realty Ltd. Arewa Residences • Kaduna</p>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 6: THANK YOU PAGE (WHATSAPP MOCKUP & CLEARANCE INSTRUCTIONS)
  // --------------------------------------------------------------------------
  if (screen === 'THANK_YOU') {
    const selectedPlotSize = answers.q3?.size || '250 SQM';
    const selectedPrice = answers.q3?.price || '₦5.5M';
    const inspectionTime = answers.q4?.title || 'Selected Calendar Slot';

    return (
      <div className="min-h-screen bg-slate-100/90 text-[#0F172A] flex flex-col justify-center px-4 py-8 sm:py-12 font-sans selection:bg-[#B8001F] selection:text-white">
        
        {/* Minimal header */}
        <div className="max-w-xl mx-auto w-full flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5">
            <img 
              src="/beacon-logo.png" 
              alt="Beacon Corporate Realty" 
              className="h-9 sm:h-10 w-auto object-contain shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <span className="text-xs sm:text-sm font-black text-[#111827] block leading-tight">
                BEACON CORPORATE REALTY LTD
              </span>
              <span className="text-[10px] font-semibold text-[#B8001F] uppercase block">
                Arewa Residences • Kaduna
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-300">
            <Award className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>C OF O TITLE</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto w-full py-2 sm:py-4 animate-fade-in text-center">
          
          {/* Top Success Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-extrabold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DISPATCHED TO YOUR WHATSAPP &amp; EMAIL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight leading-tight mb-2">
              Reservation Received! 🏛️
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-medium max-w-lg mx-auto">
              Thank you, <strong className="text-slate-900">{leadData.name || 'Valued Buyer'}</strong>. We have dispatched your VIP Site Inspection confirmation &amp; clearance instructions.
            </p>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* REALISTIC WHATSAPP CHAT SCREENSHOT MOCKUP                     */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="bg-slate-900 rounded-3xl p-3 sm:p-5 shadow-2xl border-2 border-slate-800 mb-6 text-left">
            
            {/* Mockup Header Label */}
            <div className="flex items-center justify-between px-2 pb-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-white font-extrabold tracking-wide">Incoming WhatsApp Message Preview</span>
              </div>
              <span className="text-[10px] text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full font-semibold border border-slate-700">
                Your Phone Inbox
              </span>
            </div>

            {/* Smartphone Screen Simulator */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#EFEAE2] shadow-inner">
              
              {/* WhatsApp App Bar */}
              <div className="bg-[#075E54] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <ArrowLeft className="w-4 h-4 text-white/80 cursor-pointer" />
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#128C7E] border border-white/30 flex items-center justify-center font-black text-sm text-white shadow-xs">
                      🏛️
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm leading-tight text-white">Beacon Corporate Realty</span>
                      <span className="bg-emerald-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full inline-flex items-center justify-center" title="Verified Business">
                        ✓
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-200 block leading-tight font-medium">
                      Official Business Account • Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-4 h-4" />
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>

              {/* Chat Wallpaper Canvas */}
              <div 
                className="p-3.5 sm:p-5 space-y-3"
                style={{ 
                  backgroundImage: 'radial-gradient(#075e54 0.6px, transparent 0.6px)', 
                  backgroundSize: '16px 16px', 
                  backgroundColor: '#EFEAE2' 
                }}
              >
                
                {/* End-to-end Encryption Notice */}
                <div className="bg-[#FFF3C4] border border-amber-300/80 rounded-xl p-2 text-center text-[10px] text-amber-900 leading-tight shadow-2xs max-w-sm mx-auto font-medium">
                  🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                </div>

                {/* Today Pill */}
                <div className="text-center">
                  <span className="bg-white/90 text-slate-600 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-2xs uppercase tracking-wider">
                    Today
                  </span>
                </div>

                {/* WhatsApp Speech Bubble (Incoming) */}
                <div className="relative bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-md max-w-md border border-slate-200 text-slate-900 text-xs sm:text-sm leading-relaxed">
                  
                  <p className="font-black text-[#075E54] mb-2 flex items-center gap-1.5 text-sm sm:text-base">
                    <span>Reservation Confirmed! 🏛️</span>
                  </p>
                  
                  <p className="mb-2.5 text-slate-800">
                    Hello <strong className="text-slate-900">{leadData.name ? leadData.name.trim().split(' ')[0] : 'there'}</strong>, your VIP site inspection for Arewa Residences is reserved for <strong className="text-slate-900">{inspectionTime}</strong>.
                  </p>

                  <p className="mb-3 text-slate-800">
                    Our <strong>Senior Beacon Property Advisor</strong> will call you shortly to confirm gate access clearance. Location pin &amp; master plan details have also been sent to your email.
                  </p>

                  {/* Callout Box inside WhatsApp Bubble */}
                  <div className="bg-red-50/90 border-l-4 border-[#B8001F] p-3 rounded-r-xl mb-2.5">
                    <p className="font-black text-[#99001A] text-xs uppercase tracking-wide">
                      ⚠️ ACTION REQUIRED:
                    </p>
                    <p className="text-xs text-slate-800 font-semibold mt-1 leading-snug">
                      Please reply <strong className="text-[#99001A] underline font-black">"CONFIRMED"</strong> to this WhatsApp message or reply to your confirmation email to guarantee your gate pass clearance.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    <span className="italic">— Beacon Corporate Realty</span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>Just now</span>
                      <CheckCheck className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Subtitle helper */}
            <p className="text-center text-xs text-slate-400 font-medium mt-3">
              👆 Look out for this exact message on your phone's WhatsApp ({leadData.phone || phoneSubscriber})
            </p>

          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* CLEAR NEXT STEP INSTRUCTIONS (NO BACKEND BUTTONS)             */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-5 sm:p-6 shadow-sm mb-6 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#B8001F]"></span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                What You Need To Do Right Now:
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Follow these 2 quick steps to make sure security clears your private inspection pass before your arrival:
            </p>

            <div className="space-y-3.5">
              
              {/* Step 1: WhatsApp instruction */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Open WhatsApp on your phone &amp; reply "CONFIRMED"
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                    Open the WhatsApp app on your phone right now (<strong className="text-slate-900">{leadData.phone || phoneSubscriber}</strong>). Find the message from <strong>Beacon Corporate Realty</strong> previewed above, and reply with the word <strong className="text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-black">CONFIRMED</strong> so our gate security desk immediately approves your clearance pass.
                  </p>
                </div>
              </div>

              {/* Step 2: Email instruction */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Check your Email for your GPS Location Pin &amp; Survey Map
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                    We sent your official inspection packet to <strong className="text-slate-900">{leadData.email || 'your email'}</strong>. Please check your inbox (and your <strong>Spam or Promotions</strong> folder if not visible within 2 minutes). Reply or star the email to easily open the GPS map directions on inspection day.
                  </p>
                </div>
              </div>

              {/* Step 3: Advisor call */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Expect a Brief Call from our Senior Property Advisor
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                    Our advisor assigned to your file will call you directly to confirm directions to New Millennium City, gate clearance, and lock in your 50% presale price reservation.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* SUMMARY CARD OF SELECTED PLOT & OPTIONAL CALENDAR ACCESS      */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-4 sm:p-5 text-left shadow-xs mb-4">
            <div className="flex items-center gap-3.5 mb-3.5">
              <img 
                src="/arewa-estate-hero.jpg" 
                alt="Arewa Residences" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-[#B8001F] border border-red-200">
                  50% Presale Confirmed
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#111827] mt-1">
                  Arewa Residences
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  New Millennium City, Kaduna • Directly on Tarred Road
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-200">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Plot Size</span>
                <span className="text-xs font-black text-slate-900">{selectedPlotSize}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Presale Rate</span>
                <span className="text-xs font-black text-[#B8001F]">{selectedPrice}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Inspection</span>
                <span className="text-xs font-black text-emerald-700">{inspectionTime}</span>
              </div>
            </div>

            {/* Modify Calendar Slot Button */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span className="text-slate-600 font-medium text-center sm:text-left">
                Need to change or adjust your inspection time slot?
              </span>
              <button
                onClick={() => {
                  setScreen('CALENDAR');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-extrabold text-[#B8001F] hover:text-[#8B0000] underline cursor-pointer shrink-0 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Modify Slot on Calendar 🗓️ →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  return null;
}
