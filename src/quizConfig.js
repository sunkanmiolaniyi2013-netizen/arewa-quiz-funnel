export const CONFIG = {
  // Global Brand Setup
  brandName: "Naval Building & Construction Company Limited",
  brandShortName: "NBCCL",
  developmentName: "Navy Estate Innovation City",
  location: "Cadastral Zone, Apo, Abuja",
  officeAddress: "Cluster C, Admiralty Estate, Navy Town Asokoro, FCT Abuja",
  contactPhones: ["+234 703 829 2131", "+234 902 131 1681"],
  contactEmail: "nbccl.ng@gmail.com",
  formNumber: "JVA",
  applicationFee: "₦30,000.00",
  brandTagline: "Structured Development. Quality Infrastructure. Execution.",
  quizTitle: "Navy Estate Innovation City Assessment",
  facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || "",
  
  // DIAGNOSIS STRATEGY
  diagnosisType: "PRODUCT_FINDER",

  // LEAD CAPTURE SETTINGS
  leadCaptureConfig: {
    webhookUrl: "https://services.leadconnectorhq.com/hooks/aTC64ND4XQDWNEekVZeZ/webhook-trigger/e24b115a-a820-4efa-aa62-0ed423bf96c2",
    ghlCalendarEmbedUrl: "https://api.leadconnectorhq.com/widget/bookings/vip-consultation-site-visitati",
    whatsappSalesNumber: "2348030000000",
    fields: {
      name: { show: true, required: true },
      phone: { show: true, required: true },
      email: { show: true, required: false }
    }
  },

  // THE 3 ESTATES INVENTORY
  estates: {
    EMINENCE_VILLA: {
      id: "EMINENCE_VILLA",
      name: "Eminence Villa",
      location: "Maitama 2, Abuja",
      tagline: "Prestige. Location. Legacy. Own A Landmark.",
      image: "/eminence-villa.jpg",
      titleType: "FCDA C of O",
      badgeText: "Ultra Luxury Enclave",
      paymentTerms: "12 Months Payment Plan • 30% Initial Deposit",
      promoDeadline: "Offer Closes 7th October 2026",
      defaultPlot: "250 SQM Semi-Detached Plot",
      defaultPrice: "₦14,000,000",
      defaultMarketPrice: "₦18,000,000",
      defaultSavings: "₦4,000,000",
      defaultIncentive: "₦400,000 Luxury Shopping Voucher",
      plots: [
        { size: "170 SQM", promoPrice: "₦9.5M", marketPrice: "₦12.5M", voucher: "₦250,000 Voucher" },
        { size: "250 SQM", promoPrice: "₦14M", marketPrice: "₦18M", voucher: "₦400,000 Voucher" },
        { size: "350 SQM", promoPrice: "₦19.5M", marketPrice: "₦26M", voucher: "₦500,000 Voucher" },
        { size: "600 SQM", promoPrice: "₦33M", marketPrice: "₦44M", voucher: "₦700,000 Voucher" },
        { size: "1,000 SQM", promoPrice: "₦55M", marketPrice: "₦73.75M", voucher: "₦800,000 Voucher + 2-Night Luxury Getaway" },
        { size: "5,000 SQM", promoPrice: "₦200M", marketPrice: "₦200M", voucher: "4-Night Stay at Kigali Marriott, Rwanda + $500 Voucher" },
        { size: "10,000 SQM", promoPrice: "₦350M", marketPrice: "₦350M", voucher: "Luxury Trip to the Maldives + $1,000 Voucher" }
      ]
    },
    INNOVATION_CITY: {
      id: "INNOVATION_CITY",
      name: "Navy Estate Innovation City",
      location: "Cadastral Zone, Apo, Abuja",
      developer: "Naval Building & Construction Company Limited (NBCCL)",
      tagline: "Structured Development • Quality Infrastructure • Execution",
      image: "/innovation-city.jpg",
      titleType: "FCDA Cadastral Allocation",
      badgeText: "Official Opening Offer",
      paymentTerms: "Flexible Initial Deposit • Convenient Milestone Spread",
      promoDeadline: "Opening Offer Limited Allocations",
      defaultPlot: "250 SQM Semi-Detached Plot",
      defaultPrice: "₦13,500,000",
      defaultMarketPrice: "₦16,000,000",
      defaultSavings: "₦2,500,000",
      defaultIncentive: "Verified Allocation Pass + Guided Site Inspection Tour",
      plots: [
        { size: "170 SQM", militaryPrice: "₦9.5M", civilianPrice: "₦12M", buildingType: "Terrace Duplex" },
        { size: "250 SQM", militaryPrice: "₦13.5M", civilianPrice: "₦16M", buildingType: "Semi-Detached Duplex" },
        { size: "450 SQM", militaryPrice: "₦22.3M", civilianPrice: "₦24.8M", buildingType: "Fully Detached Duplex" },
        { size: "600 SQM", militaryPrice: "₦29.5M", civilianPrice: "₦32M", buildingType: "Luxury Detached Duplex" },
        { size: "850 SQM", militaryPrice: "₦41.5M", civilianPrice: "₦44M", buildingType: "Executive Mansion" },
        { size: "1,200 SQM", militaryPrice: "₦57.5M", civilianPrice: "₦60M", buildingType: "Block of Flats / Apartments" }
      ]
    },
    MAYFAIR_GARDEN: {
      id: "MAYFAIR_GARDEN",
      name: "Mayfair Garden",
      location: "Behind Efab Metropolis, Karsana, Abuja",
      tagline: "A Better Place To Belong • Secure Growth & High Returns",
      image: "/mayfair-garden.jpg",
      titleType: "FCDA C of O",
      badgeText: "Smart Land Banking",
      paymentTerms: "Outright Promo Price or 3 Months Payment Plan",
      promoDeadline: "September Speciale Promo Price",
      defaultPlot: "250 SQM Residential Plot",
      defaultPrice: "₦20,000,000 Outright",
      defaultMarketPrice: "₦30,000,000 Actual Value",
      defaultSavings: "₦10,000,000",
      defaultIncentive: "₦10,000,000 Instant Promo Discount + Allocation Pass",
      plots: [
        { size: "150 SQM", promoPrice: "₦12M Outright", planPrice: "₦15M (3 Mo)", actualPrice: "₦18M" },
        { size: "250 SQM", promoPrice: "₦20M Outright", planPrice: "₦25M (3 Mo)", actualPrice: "₦30M" },
        { size: "350 SQM", promoPrice: "₦28M Outright", planPrice: "₦35M (3 Mo)", actualPrice: "₦42M" },
        { size: "500 SQM", promoPrice: "₦40M Outright", planPrice: "₦50M (3 Mo)", actualPrice: "₦60M" }
      ]
    }
  },

  // QUESTIONS & DYNAMIC BRANCHING LOGIC
  questions: [
    // PAGE 1 / QUESTION 1: Financial Interest Qualification
    {
      id: "q1",
      stepNumber: 1,
      totalSteps: 4,
      title: "Are you financially interested in the Navy Estate, Apo?",
      subtitle: "Choose an option below to check eligibility, plot sizes and opening offer rates:",
      options: [
        {
          id: "opt_yes",
          title: "Yes",
          buttonLabel: "Yes, I Am Interested",
          shortTag: "Explore Allocation & Opening Rates",
          subtitle: "I want to build, secure for my family or hold as a high-value long-term asset in Apo.",
          image: "/innovation-city.jpg",
          color: "bg-[#0A2558]", // Rich NBCCL Navy
          badge: "Opening Offer Active",
          targetEstate: "INNOVATION_CITY"
        },
        {
          id: "opt_no",
          title: "No",
          buttonLabel: "No, Not At This Time",
          shortTag: "General Information Only",
          subtitle: "I am not actively looking to purchase or invest in Apo land right now.",
          image: "/mayfair-garden.jpg",
          color: "bg-[#475569]", // Muted Professional Slate
          badge: "Inquiry Only",
          targetEstate: "INNOVATION_CITY"
        }
      ]
    },

    // QUESTION 2: Category Branching (Military vs Civilian)
    {
      id: "q2",
      stepNumber: 2,
      totalSteps: 4,
      title: "Which category applies to you?",
      subtitle: "Select your affiliation to unlock applicable allocation rates & subsidies:",
      options: [
        {
          id: "cat_military",
          categoryKey: "MILITARY",
          title: "I am a Military Personnel",
          shortTag: "Subsidized Rates",
          subtitle: "Serving or retired Armed Forces personnel eligible for statutory development subsidies.",
          image: "/military-avatar.jpg",
          color: "bg-[#0A2558]",
          badge: "Military Subsidized"
        },
        {
          id: "cat_civilian",
          categoryKey: "CIVILIAN",
          title: "I am a Civilian",
          shortTag: "Civilian Approved Plots",
          subtitle: "Open to business executives, civil servants, private investors & the diaspora.",
          image: "/civilian-avatar.jpg",
          color: "bg-[#185ADB]",
          badge: "Open Allocation"
        }
      ]
    },

    // QUESTION 3: Plot Sizes & Pricing (Dynamic Branching)
    {
      id: "q3",
      stepNumber: 3,
      totalSteps: 4,
      title: "Which plot size are you interested in?",
      subtitle: "Select your target plot size and building type for Navy Estate Innovation City:",
      // Subsidized Military Pricing Options
      militaryOptions: [
        { id: "plot_m_170", size: "170 SQM", price: "₦9.5M", title: "170 SQM (₦9.5M)", shortTag: "Terrace Duplex Plot", subtitle: "Subsidized plot for 3-4 bedroom terrace duplex", icon: "🏛️", color: "bg-[#0A2558]", badge: "Military Rate" },
        { id: "plot_m_250", size: "250 SQM", price: "₦13.5M", title: "250 SQM (₦13.5M)", shortTag: "Semi-Detached Duplex", subtitle: "Subsidized plot for 4-bedroom semi-detached duplex", icon: "🏡", color: "bg-[#0A2558]", badge: "Most Popular" },
        { id: "plot_m_450", size: "450 SQM", price: "₦22.3M", title: "450 SQM (₦22.3M)", shortTag: "Fully Detached Duplex", subtitle: "Subsidized plot for 4-5 bedroom detached duplex with BQ", icon: "💎", color: "bg-[#0A2558]", badge: "Military Rate" },
        { id: "plot_m_600", size: "600 SQM", price: "₦29.5M", title: "600 SQM (₦29.5M)", shortTag: "Luxury Detached Duplex", subtitle: "Subsidized plot for 5-bedroom luxury duplex + private pool", icon: "🌟", color: "bg-[#0A2558]", badge: "Military Rate" },
        { id: "plot_m_850", size: "850 SQM", price: "₦41.5M", title: "850 SQM (₦41.5M)", shortTag: "Executive Mansion", subtitle: "Subsidized prime plot for palatial residence / ambassadorial home", icon: "👑", color: "bg-[#0A2558]", badge: "Military Rate" },
        { id: "plot_m_1200", size: "1200 SQM", price: "₦57.5M", title: "1200 SQM (₦57.5M)", shortTag: "Block of Flats / Estate", subtitle: "Subsidized high-density plot for block of residential apartments", icon: "🏢", color: "bg-[#0A2558]", badge: "Military Rate" }
      ],
      // Approved Civilian Pricing Options
      civilianOptions: [
        { id: "plot_c_170", size: "170 SQM", price: "₦12M", title: "170 SQM (₦12M)", shortTag: "Terrace Duplex Plot", subtitle: "Approved plot for 3-4 bedroom terrace duplex", icon: "🏛️", color: "bg-[#185ADB]", badge: "Civilian Approved" },
        { id: "plot_c_250", size: "250 SQM", price: "₦16M", title: "250 SQM (₦16M)", shortTag: "Semi-Detached Duplex", subtitle: "Approved plot for 4-bedroom semi-detached duplex", icon: "🏡", color: "bg-[#185ADB]", badge: "Most Popular" },
        { id: "plot_c_450", size: "450 SQM", price: "₦24.8M", title: "450 SQM (₦24.8M)", shortTag: "Fully Detached Duplex", subtitle: "Approved plot for 4-5 bedroom detached duplex with BQ", icon: "💎", color: "bg-[#185ADB]", badge: "Civilian Approved" },
        { id: "plot_c_600", size: "600 SQM", price: "₦32M", title: "600 SQM (₦32M)", shortTag: "Luxury Detached Duplex", subtitle: "Approved plot for 5-bedroom luxury duplex + private pool", icon: "🌟", color: "bg-[#185ADB]", badge: "Civilian Approved" },
        { id: "plot_c_850", size: "850 SQM", price: "₦44M", title: "850 SQM (₦44M)", shortTag: "Executive Mansion", subtitle: "Approved prime plot for palatial residence / ambassadorial home", icon: "👑", color: "bg-[#185ADB]", badge: "Civilian Approved" },
        { id: "plot_c_1200", size: "1200 SQM", price: "₦60M", title: "1200 SQM (₦60M)", shortTag: "Block of Flats / Estate", subtitle: "Approved high-density plot for block of residential apartments", icon: "🏢", color: "bg-[#185ADB]", badge: "Civilian Approved" }
      ]
    },

    // QUESTION 4: Inspection & Visit Availability
    {
      id: "q4",
      stepNumber: 4,
      totalSteps: 4,
      title: "When will you be available for inspection or visit to our office?",
      subtitle: "Select your preferred timeline for a guided site tour or office visit at Asokoro:",
      options: [
        {
          id: "insp_this_week",
          title: "This Week",
          shortTag: "Monday – Friday",
          subtitle: "Available for on-site inspection or office consultation this week",
          icon: "📅",
          color: "bg-[#0A2558]",
          badge: "Fast Track"
        },
        {
          id: "insp_this_weekend",
          title: "This Weekend",
          shortTag: "Saturday / Sunday",
          subtitle: "Weekend inspection tour with NBCCL project consultants",
          icon: "☀️",
          color: "bg-[#0A2558]",
          badge: "Weekend Slot"
        },
        {
          id: "insp_next_week",
          title: "Next Week",
          shortTag: "Flexible Schedule",
          subtitle: "Planning ahead for a convenient visit during next week",
          icon: "🗓️",
          color: "bg-[#185ADB]",
          badge: "Upcoming"
        },
        {
          id: "insp_outside_abuja",
          title: "I am Outside Abuja / Overseas",
          shortTag: "Virtual Inspection",
          subtitle: "Request video walkthrough, cadastral layout docs & digital consultation",
          icon: "✈️",
          color: "bg-[#1E293B]",
          badge: "Diaspora / Remote"
        }
      ]
    }
  ]
};
