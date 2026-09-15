import { supabase, isSupabaseConfigured } from './supabaseClient';
import { CONFIG } from './quizConfig';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || 'navy_estate_innovation_city_quiz';

/**
 * Utility: Convert Nigerian Naira string to clean numeric value for Meta Pixel Value Optimization
 * Examples: "₦9.5M" -> 9500000, "₦13.5M" -> 13500000, "₦60M" -> 60000000
 */
export const parsePriceToNumeric = (priceStr) => {
    if (!priceStr) return 13500000;
    if (typeof priceStr === 'number') return priceStr;
    const clean = priceStr.toString().replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    if (isNaN(num)) return 13500000;
    if (priceStr.toLowerCase().includes('m')) {
        return Math.round(num * 1000000);
    }
    if (priceStr.toLowerCase().includes('k')) {
        return Math.round(num * 1000);
    }
    return num;
};

/**
 * Helper to push an event to Facebook Pixel securely with debug logging
 */
export const firePixelEvent = (pixelType, eventName, data = {}) => {
    if (typeof window !== 'undefined') {
        if (window.fbq) {
            window.fbq(pixelType, eventName, data);
        }
        // Log in development or test mode for instant verification
        if (import.meta.env.DEV) {
            console.log(`🎯 [Meta Pixel] ${pixelType}('${eventName}')`, data);
        }
    }
};

/**
 * Helper to save event to LocalStorage (as instant fallback) & Supabase
 */
const saveToDatabase = async (eventName, data = {}) => {
    const timestamp = new Date().toISOString();
    const eventObj = {
        id: 'evt_' + Math.random().toString(36).substr(2, 9),
        client_id: CLIENT_ID,
        event_type: eventName,
        data: data,
        timestamp: timestamp
    };

    // 1. Save to LocalStorage immediately
    if (typeof window !== 'undefined') {
        try {
            const existing = JSON.parse(localStorage.getItem('quiz_analytics_local') || '[]');
            existing.push(eventObj);
            localStorage.setItem('quiz_analytics_local', JSON.stringify(existing));
            window.dispatchEvent(new Event('quiz_analytics_updated'));
        } catch (e) {
            console.error('Failed saving event to localStorage:', e);
        }
    }

    // 2. Save to Supabase if configured
    if (isSupabaseConfigured()) {
        try {
            const { error } = await supabase.from('quiz_analytics').insert([{
                client_id: CLIENT_ID,
                event_type: eventName,
                data: data,
                timestamp: timestamp
            }]);

            if (error) {
                console.warn('Supabase Insert Warning:', error.message || error);
            }
        } catch (err) {
            console.warn('Supabase connection warning:', err);
        }
    }
};

/**
 * Initialize Meta Pixel script with auto-injection
 */
export const initAnalytics = () => {
    const FB_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID || CONFIG.facebookPixelId;
    if (typeof window !== 'undefined' && FB_ID && FB_ID !== 'YOUR_FB_PIXEL_ID') {
        if (!window.fbq) {
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', FB_ID);
        }
    }
};

/**
 * FUNNEL STAGE 1: Landing / Hero Page View
 */
export const trackLandingPageView = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('nbccl_session_landing_logged')) return;
        sessionStorage.setItem('nbccl_session_landing_logged', 'true');
    }
    saveToDatabase('Landing Page Viewed', {
        development_name: CONFIG.developmentName,
        location: CONFIG.location
    });

    // Standard Meta Pixel Events
    firePixelEvent('track', 'PageView');
    firePixelEvent('track', 'ViewContent', {
        content_name: CONFIG.developmentName,
        content_category: 'Real Estate Land Development',
        content_ids: ['nbccl_innovation_city_apo'],
        location: CONFIG.location
    });
};

/**
 * FUNNEL STAGE 2: Quiz Started (User answers Question 1)
 */
export const trackQuizStarted = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('nbccl_session_started_logged')) return;
        sessionStorage.setItem('nbccl_session_started_logged', 'true');
    }
    saveToDatabase('Quiz Started', {
        development_name: CONFIG.developmentName
    });

    // Custom Event for Meta Ad Campaign optimization
    firePixelEvent('trackCustom', 'QuizStarted', {
        development_name: CONFIG.developmentName,
        funnel: 'Navy Estate Innovation City Assessment'
    });
};

/**
 * FUNNEL STAGE 3: Question Viewed (Tracks Step Retention for Meta Custom Conversions)
 */
export const trackQuestionViewed = (questionId, questionText) => {
    if (typeof window !== 'undefined') {
        const key = `nbccl_qview_${questionId}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, 'true');
    }
    saveToDatabase('Question Viewed', { 
        question_id: questionId, 
        question_title: questionText || '',
        text: questionText || ''
    });

    // Meta Pixel Funnel Progression Event
    firePixelEvent('trackCustom', 'FunnelStepViewed', { 
        step_id: questionId, 
        step_title: questionText 
    });

    // When visitor reaches the Opt-in Form, trigger Standard InitiateCheckout event
    if (questionId === 'optin') {
        firePixelEvent('track', 'InitiateCheckout', {
            content_name: 'Navy Estate Innovation City VIP Pass',
            content_category: 'Real Estate Allocation Form',
            currency: 'NGN',
            value: 13500000.00
        });
    }
};

/**
 * FUNNEL STAGE 4: Answer Selected (Enables Granular Meta Ad Audience Retargeting)
 */
export const trackAnswerSelected = (questionId, answerOrIndex, questionTitleOrAnswerText) => {
    let resolvedText = '';
    let resolvedIndex = undefined;
    let questionTitle = '';

    if (typeof questionTitleOrAnswerText === 'string') {
        questionTitle = questionTitleOrAnswerText;
    }

    if (typeof answerOrIndex === 'string') {
        resolvedText = answerOrIndex;
    } else if (typeof answerOrIndex === 'number') {
        resolvedIndex = answerOrIndex;
        resolvedText = questionTitleOrAnswerText || '';
    }

    saveToDatabase('Answer Selected', { 
        question_id: questionId,
        question_title: questionTitle,
        selected_index: resolvedIndex,
        answer_text: resolvedText
    });

    // 1. General Answer Selected Custom Event
    firePixelEvent('trackCustom', 'AnswerSelected', { 
        question_id: questionId, 
        question_title: questionTitle,
        answer: resolvedText,
        selected_index: resolvedIndex 
    });

    // 2. High-value granular custom events for Meta Audience Segmentation & Optimization:
    if (questionId === 'q1') {
        // Step 1: Financial Interest Qualification
        firePixelEvent('trackCustom', 'FinancialInterestSelected', { 
            financial_interest: resolvedText,
            development: CONFIG.developmentName
        });
        if (resolvedText.toLowerCase().includes('yes')) {
            firePixelEvent('trackCustom', 'QualifiedProspect');
        }
    } else if (questionId === 'q2') {
        // Step 2: Military vs. Civilian Category Branching
        const isMilitary = resolvedText.toLowerCase().includes('military');
        firePixelEvent('trackCustom', 'CategoryAffiliationSelected', { 
            applicant_category: resolvedText,
            is_military: isMilitary
        });
        // Create targeted Custom Audiences in Meta Ads Manager:
        if (isMilitary) {
            firePixelEvent('trackCustom', 'MilitaryAudienceSegment');
        } else {
            firePixelEvent('trackCustom', 'CivilianAudienceSegment');
        }
    } else if (questionId === 'q3') {
        // Step 3: Plot Size & Budget Selection
        const numericPlotPrice = parsePriceToNumeric(resolvedText);
        // Meta Standard Event: CustomizeProduct
        firePixelEvent('track', 'CustomizeProduct', {
            content_name: resolvedText,
            content_category: 'Plot Size Selection',
            value: numericPlotPrice,
            currency: 'NGN'
        });
        firePixelEvent('trackCustom', 'PlotSizeSelected', { 
            plot_size: resolvedText,
            estimated_value: numericPlotPrice,
            currency: 'NGN'
        });
    } else if (questionId === 'q4') {
        // Step 4: Inspection & Visit Availability
        firePixelEvent('track', 'FindLocation', {
            content_name: 'Inspection Tour Slot',
            inspection_timing: resolvedText
        });
        firePixelEvent('trackCustom', 'InspectionAvailabilitySelected', { 
            inspection_timing: resolvedText,
            location: CONFIG.location
        });
    }
};

/**
 * FUNNEL STAGE 5: Quiz Completed (User finishes all questions and proceeds to calculation)
 */
export const trackQuizCompleted = (bucket, meta = {}) => {
    saveToDatabase('Quiz Completed', { 
        assigned_bucket: bucket,
        matched_estate_name: CONFIG.developmentName,
        ...meta 
    });
    firePixelEvent('trackCustom', 'QuizCompleted', { 
        bucket_assigned: bucket, 
        development_name: CONFIG.developmentName,
        ...meta 
    });
};

/**
 * FUNNEL STAGE 6: Lead Form Captured (PRIMARY CONVERSION EVENT FOR META ADS)
 */
export const trackLeadCaptured = (leadData, bucket) => {
    const numericValue = parsePriceToNumeric(leadData.plot_price);

    const payload = { 
         name: leadData.name, 
         email: leadData.email, 
         phone: leadData.phone,
         assigned_bucket: bucket || 'INNOVATION_CITY',
         matched_estate_name: leadData.matched_estate_name || CONFIG.developmentName,
         applicant_category: leadData.category || leadData.applicant_category,
         selected_plot: leadData.selected_plot,
         plot_price: leadData.plot_price,
         inspection_timing: leadData.inspection_timing,
         financial_interest: leadData.financial_interest || 'Yes',
         numeric_value: numericValue
    };

    saveToDatabase('Lead Captured', payload);
    
    // STANDARD FACEBOOK PIXEL 'Lead' EVENT WITH VALUE OPTIMIZATION (ROAS)
    firePixelEvent('track', 'Lead', { 
        content_name: leadData.matched_estate_name || CONFIG.developmentName, 
        content_category: 'Cadastral Zone Apo Plot',
        currency: 'NGN', 
        value: numericValue,
        applicant_category: leadData.category || leadData.applicant_category,
        selected_plot: leadData.selected_plot,
        plot_price: leadData.plot_price,
        inspection_timing: leadData.inspection_timing
    });

    // CUSTOM META CONVERSION EVENT
    firePixelEvent('trackCustom', 'NavyEstateLeadCaptured', {
        applicant_category: leadData.category || leadData.applicant_category,
        selected_plot: leadData.selected_plot,
        plot_price: leadData.plot_price,
        numeric_value: numericValue,
        currency: 'NGN',
        inspection_timing: leadData.inspection_timing
    });
};

/**
 * FUNNEL STAGE 7: Calendar Modal Opened
 */
export const trackScheduleOpened = (estateName) => {
    saveToDatabase('Calendar Booking Opened', { estate_name: estateName || CONFIG.developmentName });
    
    // Standard Facebook Pixel 'Schedule' Event
    firePixelEvent('track', 'Schedule', { 
        content_name: estateName || 'NBCCL VIP Site Inspection Calendar',
        content_category: 'Real Estate Site Inspection',
        currency: 'NGN' 
    });
};

/**
 * FUNNEL STAGE 8: Appointment Confirmed (Highest-Intent Conversion Event)
 */
export const trackAppointmentConfirmed = (estateName) => {
    saveToDatabase('Appointment Confirmed', { estate_name: estateName || CONFIG.developmentName });
    
    // Highest-value Meta Conversion Event
    firePixelEvent('track', 'Purchase', { 
        content_name: estateName || 'NBCCL VIP Inspection Confirmed',
        content_type: 'product',
        currency: 'NGN',
        value: 30000.00 // Official application fee value
    });

    firePixelEvent('trackCustom', 'InspectionAppointmentBooked', { 
        estate_name: estateName || CONFIG.developmentName,
        status: 'booked'
    });
};

export const trackOutcomeViewed = (bucket) => {
    saveToDatabase('Outcome Page Viewed', { assigned_bucket: bucket });
    firePixelEvent('trackCustom', 'OutcomeViewed', { bucket_assigned: bucket });
};
