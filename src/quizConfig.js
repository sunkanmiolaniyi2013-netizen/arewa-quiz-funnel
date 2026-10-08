export const CONFIG = {
  // Global Brand Setup
  brandName: "Beacon Corporate Realty Ltd",
  brandShortName: "Beacon Realty",
  developmentName: "Arewa Residences",
  location: "New Millennium City, Kaduna",
  officeAddress: "New Millennium City Corridor, Kaduna, Nigeria",
  contactPhones: ["+234 803 000 0000", "+234 902 000 0000"],
  contactEmail: "info@beaconrealty.ng",
  websiteUrl: "https://www.beaconrealty.ng",
  brandTagline: "Secure Your Tomorrow • Arewa Today, Greater Tomorrows.",
  quizTitle: "Arewa Residences Presale Allocation Assessment",
  facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || "",
  
  // PRIMARY BRAND COLORS (Derived from Arewa Residences Flyer)
  colors: {
    primaryCrimson: "#B8001F", // Dominant deep crimson red
    crimsonDark: "#8B0000",   // Dark blood red
    crimsonLight: "#DC2626",  // Vibrant red accent
    goldAccent: "#D4AF37",    // C of O metallic gold
    charcoal: "#111827",      // Bold dark black/charcoal
    backgroundLight: "#F8FAFC"
  },

  // DIAGNOSIS STRATEGY
  diagnosisType: "PRODUCT_FINDER",

  // LEAD CAPTURE SETTINGS
  leadCaptureConfig: {
    webhookUrl: "https://services.leadconnectorhq.com/hooks/aTC64ND4XQDWNEekVZeZ/webhook-trigger/b5yTvVxuEUgAZG2ZCnxu",
    ghlCalendarEmbedUrl: "https://api.leadconnectorhq.com/widget/booking/iH5WWBsPwKTMMmt24JbO",
    whatsappSalesNumber: "2348030000000",
    fields: {
      name: { show: true, required: true },
      phone: { show: true, required: true },
      email: { show: true, required: false }
    }
  },

  // THE AREWA RESIDENCES CORE ESTATE PROFILE
  estate: {
    id: "AREWA_RESIDENCES",
    name: "Arewa Residences",
    location: "New Millennium City, Kaduna",
    developer: "Beacon Corporate Realty Ltd",
    tagline: "Buy & Build — Directly on a Tarred Road",
    subTagline: "Arewa Today, Greater Tomorrows.",
    image: "/arewa-estate-hero.jpg",
    titleType: "C of O Title (KADGIS Verifiable)",
    badgeText: "Presale Now Open • 50% Off",
    paymentTerms: "Presale Outright or Flexible 3-Month Plan",
    promoDeadline: "Strictly Limited to First 25 Presale Allocations",
    defaultPlot: "250 SQM Semi-Detached Duplex",
    defaultPrice: "₦5,500,000",
    defaultMarketPrice: "₦11,000,000",
    defaultSavings: "₦5,500,000 (50% Off)",
    defaultIncentive: "Tarred Road Frontage + Instant C of O Allocation Pass",
    plots: [
      { 
        id: "plot_170", 
        size: "170 SQM", 
        buildingType: "Terrace Duplex",
        presaleOutright: "₦3.5M", 
        threeMonthPlan: "₦4.5M", 
        actualPrice: "₦7M",
        savings: "₦3.5M (50% Equity)",
        badge: "Lowest Entry",
        icon: "🏛️",
        highlight: "Ideal for 3-4 bedroom modern terrace home"
      },
      { 
        id: "plot_250", 
        size: "250 SQM", 
        buildingType: "Semi-Detached Duplex",
        presaleOutright: "₦5.5M", 
        threeMonthPlan: "₦7.5M", 
        actualPrice: "₦11M",
        savings: "₦5.5M (50% Equity)",
        badge: "Most Popular",
        icon: "🏡",
        highlight: "Perfect for 4-bedroom semi-detached family residence"
      },
      { 
        id: "plot_450", 
        size: "450 SQM", 
        buildingType: "Detached Duplex",
        presaleOutright: "₦9M", 
        threeMonthPlan: "₦11M", 
        actualPrice: "₦18M",
        savings: "₦9M (50% Equity)",
        badge: "Executive Plot",
        icon: "💎",
        highlight: "Prime plot for 5-bedroom luxury detached duplex with BQ"
      },
      { 
        id: "plot_900", 
        size: "900 SQM", 
        buildingType: "Block of Flats",
        presaleOutright: "₦18M", 
        threeMonthPlan: "₦21M", 
        actualPrice: "₦36M",
        savings: "₦18M (50% Equity)",
        badge: "High Cash Flow",
        icon: "🏢",
        highlight: "Commercial high-density plot for rental apartment building"
      }
    ]
  },

  // QUESTIONS & DYNAMIC BRANCHING LOGIC
  questions: [
    // PAGE 1 / QUESTION 1: Financial Interest Qualification
    {
      id: "q1",
      stepNumber: 1,
      totalSteps: 4,
      title: "Are you financially interested in securing a plot at Arewa Residences, New Millennium City?",
      subtitle: "Choose an option below to check eligibility, plot sizes, and exclusive 50% presale rates:",
      options: [
        {
          id: "opt_yes",
          title: "Yes",
          buttonLabel: "Yes, I Am Interested",
          shortTag: "Explore Presale Allocation & 50% Off",
          subtitle: "I want to build immediately, secure a prime family residence, or lock in high-growth capital equity in New Millennium City.",
          image: "/arewa-estate-hero.jpg",
          color: "bg-gradient-to-r from-[#B8001F] to-[#8B0000]", // Rich Arewa Crimson
          badge: "Presale Now Open",
          targetEstate: "AREWA_RESIDENCES"
        },
        {
          id: "opt_no",
          title: "No",
          buttonLabel: "No, Not At This Time",
          shortTag: "General Information Only",
          subtitle: "I am not actively looking to purchase or invest in Millennium City, Kaduna land right now.",
          image: "/inquiry-consultant.jpg",
          color: "bg-[#475569]", // Muted Slate
          badge: "Inquiry Only",
          targetEstate: "AREWA_RESIDENCES"
        }
      ]
    },

    // QUESTION 2: Primary Buyer Objective
    {
      id: "q2",
      stepNumber: 2,
      totalSteps: 4,
      title: "What is your primary objective for acquiring land in New Millennium City?",
      subtitle: "Select your acquisition profile to unlock tailored development terms & priority allocation:",
      options: [
        {
          id: "obj_build",
          objectiveKey: "BUY_AND_BUILD",
          title: "Buy & Build (Family Residence)",
          shortTag: "Directly on Tarred Road",
          subtitle: "Ready to construct or secure a family home in a peaceful, secure, master-planned environment.",
          icon: "🏡",
          color: "bg-[#B8001F]",
          badge: "Immediate Construction"
        },
        {
          id: "obj_investment",
          objectiveKey: "CAPITAL_GROWTH",
          title: "Capital Growth & Land Banking",
          shortTag: "50% Presale Equity",
          subtitle: "Locking in 50% below public launch price to maximize high ROI as Ungwan Rimi spills over.",
          icon: "📈",
          color: "bg-[#B8001F]",
          badge: "Double Your Capital"
        },
        {
          id: "obj_commercial",
          objectiveKey: "BLOCK_OF_FLATS",
          title: "Block of Flats / Rental Income",
          shortTag: "High Cashflow Asset",
          subtitle: "Seeking 900 SQM parcel for developing rental apartments with steady recurring dividend.",
          icon: "🏢",
          color: "bg-[#111827]",
          badge: "High Rental Demand"
        },
        {
          id: "obj_diaspora",
          objectiveKey: "DIASPORA",
          title: "Diaspora / Living Outside Kaduna",
          shortTag: "Secure Ancestral Asset",
          subtitle: "Seeking 100% verified C of O titled land in Kaduna with virtual inspection & KADGIS verification.",
          icon: "✈️",
          color: "bg-[#111827]",
          badge: "Verifiable Title"
        }
      ]
    },

    // QUESTION 3: Plot Sizes & 50% Pricing Matrix
    {
      id: "q3",
      stepNumber: 3,
      totalSteps: 4,
      title: "Which plot size and building plan are you interested in?",
      subtitle: "Select your target plot size to lock in 50% presale pricing before the public launch:",
      options: [
        {
          id: "plot_170",
          size: "170 SQM",
          price: "₦3.5M",
          threeMonthPlan: "₦4.5M",
          actualPrice: "₦7M",
          savings: "Save ₦3.5M (50% Off)",
          title: "170 SQM (₦3.5M Presale)",
          buildingType: "Terrace Duplex Plot",
          subtitle: "Subsidized plot for 3-4 bedroom luxury terrace duplex directly on a tarred road",
          icon: "🏛️",
          color: "bg-[#B8001F]",
          badge: "Presale ₦3.5M"
        },
        {
          id: "plot_250",
          size: "250 SQM",
          price: "₦5.5M",
          threeMonthPlan: "₦7.5M",
          actualPrice: "₦11M",
          savings: "Save ₦5.5M (50% Off)",
          title: "250 SQM (₦5.5M Presale)",
          buildingType: "Semi-Detached Duplex",
          subtitle: "Prime plot for 4-bedroom semi-detached duplex in family-friendly neighborhood",
          icon: "🏡",
          color: "bg-[#B8001F]",
          badge: "Most Popular"
        },
        {
          id: "plot_450",
          size: "450 SQM",
          price: "₦9M",
          threeMonthPlan: "₦11M",
          actualPrice: "₦18M",
          savings: "Save ₦9M (50% Off)",
          title: "450 SQM (₦9M Presale)",
          buildingType: "Detached Duplex Plot",
          subtitle: "Executive plot for palatial 5-bedroom detached duplex with BQ & ample parking",
          icon: "💎",
          color: "bg-[#B8001F]",
          badge: "Executive Choice"
        },
        {
          id: "plot_900",
          size: "900 SQM",
          price: "₦18M",
          threeMonthPlan: "₦21M",
          actualPrice: "₦36M",
          savings: "Save ₦18M (50% Off)",
          title: "900 SQM (₦18M Presale)",
          buildingType: "Block of Flats / Multi-Unit",
          subtitle: "High-density plot for building multi-door apartments & rental wealth engine",
          icon: "🏢",
          color: "bg-[#111827]",
          badge: "Commercial / Flats"
        }
      ]
    },

    // QUESTION 4: Inspection & Visit Availability
    {
      id: "q4",
      stepNumber: 4,
      totalSteps: 4,
      title: "When will you be available for site inspection or visit to our office?",
      subtitle: "Select your preferred timeline for a private guided inspection in New Millennium City, Kaduna:",
      options: [
        {
          id: "insp_this_week",
          title: "This Week",
          shortTag: "Monday – Friday",
          subtitle: "Available for on-site inspection or office consultation this week",
          icon: "📅",
          color: "bg-[#B8001F]",
          badge: "Fast Track"
        },
        {
          id: "insp_this_weekend",
          title: "This Weekend",
          shortTag: "Saturday / Sunday",
          subtitle: "Weekend guided site tour with Beacon project consultants",
          icon: "☀️",
          color: "bg-[#B8001F]",
          badge: "Weekend Tour"
        },
        {
          id: "insp_next_week",
          title: "Next Week",
          shortTag: "Flexible Schedule",
          subtitle: "Planning ahead for a convenient private visit during next week",
          icon: "🗓️",
          color: "bg-[#111827]",
          badge: "Advance Booking"
        },
        {
          id: "insp_outside_kaduna",
          title: "I am Outside Kaduna / Overseas",
          shortTag: "Virtual Inspection",
          subtitle: "Request video walkthrough, KADGIS C of O verification & digital allocation pass",
          icon: "✈️",
          color: "bg-[#111827]",
          badge: "Diaspora / Remote"
        }
      ]
    }
  ]
};
