import { supabase, isSupabaseConfigured } from './supabaseClient';
import { CONFIG } from './quizConfig';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || 'beacon_abuja_quiz';

/**
 * Helper to push an event to Facebook Pixel securely
 */
const firePixelEvent = (pixelType, eventName, data = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(pixelType, eventName, data);
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

export const initAnalytics = () => {
    const FB_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
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

export const trackLandingPageView = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('beacon_session_landing_logged')) return;
        sessionStorage.setItem('beacon_session_landing_logged', 'true');
    }
    saveToDatabase('Landing Page Viewed');
    firePixelEvent('track', 'PageView');
};

export const trackQuizStarted = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('beacon_session_started_logged')) return;
        sessionStorage.setItem('beacon_session_started_logged', 'true');
    }
    saveToDatabase('Quiz Started');
    firePixelEvent('trackCustom', 'QuizStarted');
};

export const trackQuestionViewed = (questionId, questionText) => {
    if (typeof window !== 'undefined') {
        const key = `beacon_qview_${questionId}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, 'true');
    }
    saveToDatabase('Question Viewed', { question_id: questionId, text: questionText });
    firePixelEvent('trackCustom', 'QuestionViewed', { question_id: questionId });
};

export const trackAnswerSelected = (questionId, answerOrIndex, answerText) => {
    let resolvedText = '';
    let resolvedIndex = undefined;

    if (typeof answerOrIndex === 'string') {
        resolvedText = answerOrIndex;
        resolvedIndex = typeof answerText === 'number' ? answerText : undefined;
    } else if (typeof answerOrIndex === 'number') {
        resolvedIndex = answerOrIndex;
        resolvedText = answerText || '';
    }

    saveToDatabase('Answer Selected', { 
        question_id: questionId, 
        selected_index: resolvedIndex,
        answer_text: resolvedText
    });

    // 1. General Answer Selected Custom Event
    firePixelEvent('trackCustom', 'AnswerSelected', { 
        question_id: questionId, 
        answer: resolvedText,
        selected_index: resolvedIndex 
    });

    // 2. High-value granular custom events for Meta Audience Segmentation
    if (questionId === 'q1') {
        firePixelEvent('trackCustom', 'GoalSelected', { goal: resolvedText });
    } else if (questionId === 'q2') {
        firePixelEvent('trackCustom', 'DistrictSelected', { district: resolvedText });
    } else if (questionId === 'q3') {
        firePixelEvent('trackCustom', 'BudgetSelected', { budget_range: resolvedText });
    } else if (questionId === 'q4') {
        firePixelEvent('trackCustom', 'PaymentPlanSelected', { payment_structure: resolvedText });
    }
};

export const trackQuizCompleted = (bucket, meta = {}) => {
    saveToDatabase('Quiz Completed', { assigned_bucket: bucket, ...meta });
    firePixelEvent('trackCustom', 'QuizCompleted', { bucket_assigned: bucket, ...meta });
};

export const trackAppointmentConfirmed = (estateName) => {
    saveToDatabase('Appointment Confirmed', { estate_name: estateName });
    firePixelEvent('trackCustom', 'AppointmentConfirmed', { 
        content_name: estateName || 'Beacon Inspection Scheduled',
        status: 'booked'
    });
};

export const trackLeadCaptured = (leadData, bucket) => {
    const payload = { 
         name: leadData.name, 
         email: leadData.email, 
         phone: leadData.phone,
         assigned_bucket: bucket,
         matched_estate_name: leadData.matched_estate_name,
         investment_goal: leadData.investment_goal,
         preferred_district: leadData.preferred_district,
         budget_range: leadData.budget_range,
         payment_structure: leadData.payment_structure
    };

    saveToDatabase('Lead Captured', payload);
    
    // Standard Facebook Pixel 'Lead' Event with rich real-estate context
    firePixelEvent('track', 'Lead', { 
        content_name: leadData.matched_estate_name || bucket, 
        content_category: 'Abuja Real Estate Plot',
        currency: 'NGN', 
        value: 35000000.00,
        investment_goal: leadData.investment_goal,
        preferred_district: leadData.preferred_district,
        budget_range: leadData.budget_range
    });
};

export const trackScheduleOpened = (estateName) => {
    saveToDatabase('Calendar Booking Opened', { estate_name: estateName });
    // Standard Facebook Pixel 'Schedule' Event
    firePixelEvent('track', 'Schedule', { 
        content_name: estateName || 'Beacon VIP Private Viewing Calendar',
        content_category: 'Real Estate Site Inspection',
        currency: 'NGN' 
    });
};

export const trackOutcomeViewed = (bucket) => {
    saveToDatabase('Outcome Page Viewed', { assigned_bucket: bucket });
    firePixelEvent('trackCustom', 'OutcomeViewed', { bucket_assigned: bucket });
};
