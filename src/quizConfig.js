export const CONFIG = {
  // Global Brand Setup
  brandName: "Beacon Corporate Realty",
  brandTagline: "Secure Your Tomorrow.",
  quizTitle: "Abuja Property Matcher",
  
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
      name: "Innovation City [The Parliament]",
      location: "Apo, Abuja",
      tagline: "Prime Investment Address • Act Before Oct 1st Price Spike!",
      image: "/innovation-city.jpg",
      titleType: "FCDA C of O",
      badgeText: "High Capital Growth",
      paymentTerms: "50% Initial Deposit • Balance over 6 Months",
      promoDeadline: "New Prices Take Effect 1st October, 2026",
      defaultPlot: "250 SQM Semi-Detached Plot",
      defaultPrice: "₦15,000,000",
      defaultMarketPrice: "₦22,500,000 (Effective Oct 1)",
      defaultSavings: "₦7,500,000",
      defaultIncentive: "50% Pre-Hike Equity Lock + Free Guided Site Tour",
      plots: [
        { size: "170 SQM (Terrace)", promoPrice: "₦10M", nextPrice: "₦15M (+50% jump)" },
        { size: "250 SQM (Semi-Detached)", promoPrice: "₦15M", nextPrice: "₦22.5M (+50% jump)" },
        { size: "450 SQM (Penthouse)", promoPrice: "₦26M", nextPrice: "₦39M (+50% jump)" },
        { size: "600 SQM (Lux Duplex)", promoPrice: "₦35M", nextPrice: "₦52.5M (+50% jump)" },
        { size: "850 SQM (Mansion)", promoPrice: "₦50M", nextPrice: "₦75M (+50% jump)" },
        { size: "1,200 SQM (Block of Flats)", promoPrice: "₦70M", nextPrice: "₦105M (+50% jump)" }
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

  // PERSPECTIVE-STYLE QUESTIONS
  questions: [
    // PAGE 1 / QUESTION 1: The Goal & Vibe (Perspective Product Finder DNA - No Location Leakage)
    {
      id: "q1",
      stepNumber: 1,
      totalSteps: 4,
      title: "What is most important to you in your next acquisition?",
      subtitle: "Choose the option that describes your vision best:",
      options: [
        {
          id: "opt_luxury",
          title: "Luxury Living & Prestige",
          subtitle: "Build an upscale family landmark in a secure, prime enclave.",
          image: "/eminence-villa.jpg",
          color: "bg-[#D9483B]", // Warm coral red like Perspective
          targetEstate: "EMINENCE_VILLA"
        },
        {
          id: "opt_growth",
          title: "High Capital Growth (50%+)",
          subtitle: "Lock in pre-hike rates before imminent price surge.",
          image: "/innovation-city.jpg",
          color: "bg-[#C48824]", // Warm amber gold like Perspective
          targetEstate: "INNOVATION_CITY"
        },
        {
          id: "opt_banking",
          title: "Affordable Land Banking",
          subtitle: "High-yield suburban growth with flexible payment terms.",
          image: "/mayfair-garden.jpg",
          color: "bg-[#2E7D32]", // Rich emerald green like Perspective
          targetEstate: "MAYFAIR_GARDEN"
        }
      ]
    },

    // QUESTION 2: Preferred District (Perspective Visual Cards)
    {
      id: "q2",
      stepNumber: 2,
      totalSteps: 4,
      title: "Which Abuja district do you feel most drawn to? 📍",
      subtitle: "Select a preferred location or let us recommend the highest value:",
      options: [
        { 
          id: "loc_maitama", 
          title: "Maitama 2", 
          shortTag: "Prime Luxury Corridor",
          subtitle: "Prime diplomatic & luxury residential corridor", 
          targetEstate: "EMINENCE_VILLA", 
          image: "/eminence-villa.jpg",
          color: "bg-[#D9483B]"
        },
        { 
          id: "loc_apo", 
          title: "Apo [The Parliament]", 
          shortTag: "High Capital Growth",
          subtitle: "Fast-appreciating central investment corridor", 
          targetEstate: "INNOVATION_CITY", 
          image: "/innovation-city.jpg",
          color: "bg-[#C48824]"
        },
        { 
          id: "loc_karsana", 
          title: "Karsana", 
          shortTag: "Smart Land Banking",
          subtitle: "Rapid suburban growth behind Efab Metropolis", 
          targetEstate: "MAYFAIR_GARDEN", 
          image: "/mayfair-garden.jpg",
          color: "bg-[#2E7D32]"
        },
        { 
          id: "loc_any", 
          title: "Recommend Best Value", 
          shortTag: "Highest ROI Match",
          subtitle: "Match me with the highest ROI plot for my budget", 
          targetEstate: "AUTO", 
          image: "/abuja-recommend.jpg",
          icon: "🧭",
          color: "bg-[#1E293B]"
        }
      ]
    },

    // QUESTION 3: Budget Range (Perspective Visual Cards)
    {
      id: "q3",
      stepNumber: 3,
      totalSteps: 4,
      title: "What is your target budget comfort zone? 💰",
      subtitle: "This matches you with the ideal plot size & building type:",
      options: [
        { 
          id: "b_10_15", 
          title: "₦9.5M – ₦15M", 
          shortTag: "150–170 SQM Starter",
          subtitle: "Starter terrace & entry land banking (150–170 SQM)", 
          tier: "ENTRY",
          icon: "🌱",
          color: "bg-[#2E7D32]"
        },
        { 
          id: "b_15_35", 
          title: "₦15M – ₦35M", 
          shortTag: "250–350 SQM Mid-Tier",
          subtitle: "Semi-detached & residential plots (250–350 SQM)", 
          tier: "MID",
          icon: "🏡",
          color: "bg-[#2563EB]"
        },
        { 
          id: "b_35_70", 
          title: "₦35M – ₦70M", 
          shortTag: "500–1,200 SQM Luxury",
          subtitle: "Detached duplexes, penthouses & flats (500–1200 SQM)", 
          tier: "LUXURY",
          icon: "🏛️",
          color: "bg-[#C48824]"
        },
        { 
          id: "b_70_plus", 
          title: "₦70M – ₦350M+", 
          shortTag: "Commercial & Mansions",
          subtitle: "Commercial blocks & large multi-plot estates", 
          tier: "ULTRA",
          icon: "💎",
          color: "bg-[#7C3AED]"
        }
      ]
    },

    // QUESTION 4: Payment Terms Preference (Perspective Visual Cards with Elite Imagery)
    {
      id: "q4",
      stepNumber: 4,
      totalSteps: 4,
      title: "What payment structure works best for you? ⏱️",
      subtitle: "All options qualify for September Speciale promotional perks:",
      options: [
        { 
          id: "pay_outright", 
          title: "Outright Payment", 
          shortTag: "Highest Promo Discount",
          subtitle: "Instant allocation pass & highest promo price discount", 
          badge: "Max Discount",
          image: "/q4-outright.jpg",
          color: "bg-[#D9483B]"
        },
        { 
          id: "pay_3_6", 
          title: "3 to 6 Months", 
          shortTag: "30%–50% Deposit",
          subtitle: "30%–50% initial deposit with balance spread conveniently", 
          badge: "Most Popular",
          image: "/q4-spread-3-6.jpg",
          color: "bg-[#C48824]"
        },
        { 
          id: "pay_12", 
          title: "12 Months Spread", 
          shortTag: "Zero Pressure",
          subtitle: "Comfortable quarterly or monthly installments", 
          badge: "Zero Pressure",
          image: "/q4-zero-pressure.jpg",
          color: "bg-[#2563EB]"
        },
        { 
          id: "pay_custom", 
          title: "Custom Milestone", 
          shortTag: "Bespoke Inflow Terms",
          subtitle: "Bespoke schedule tailored to your cashflow with our advisor", 
          badge: "Bespoke Terms",
          image: "/q4-custom-milestone.jpg",
          color: "bg-[#1E293B]"
        }
      ]
    }
  ]
};
