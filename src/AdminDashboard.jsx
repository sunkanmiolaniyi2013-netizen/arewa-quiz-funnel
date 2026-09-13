import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Target, CheckCircle, Mail } from 'lucide-react';
import { CONFIG } from './quizConfig';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || 'beacon_abuja_quiz';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTenant, setActiveTenant] = useState(CLIENT_ID);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2500);
    const handleStorageChange = () => fetchData();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('quiz_analytics_updated', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('quiz_analytics_updated', handleStorageChange);
    };
  }, [activeTenant]);

  const fetchData = async () => {
    let localEvents = [];
    if (typeof window !== 'undefined') {
      try {
        localEvents = JSON.parse(localStorage.getItem('quiz_analytics_local') || '[]');
        if (activeTenant && activeTenant !== 'ALL') {
          localEvents = localEvents.filter(e => e.client_id === activeTenant);
        }
      } catch (e) {
        console.error("Error reading local analytics:", e);
      }
    }

    let remoteEvents = [];
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('quiz_analytics').select('*').order('timestamp', { ascending: false }).limit(5000);
        if (activeTenant && activeTenant !== 'ALL') {
          query = query.eq('client_id', activeTenant);
        }
        const { data: events, error } = await query;

        if (!error && events && events.length > 0) {
          remoteEvents = events;
        }
      } catch (err) {
        console.warn("Supabase fetch notice (using local storage fallback):", err);
      }
    }

    const combinedMap = new Map();
    // Use remoteEvents if available, fallback to localEvents for offline testing
    const eventsToProcess = remoteEvents.length > 0 ? remoteEvents : localEvents;
    eventsToProcess.forEach(item => {
      const key = item.id || `${item.event_type}_${item.timestamp}_${JSON.stringify(item.data || {})}`;
      combinedMap.set(key, item);
    });
    setData(Array.from(combinedMap.values()));
    setLoading(false);
  };

  // Memoized Timezone-Aware Date Filter
  const filteredData = React.useMemo(() => {
    if (!selectedDate) return data;
    return data.filter(e => {
      if (!e.timestamp) return false;
      const isoDate = e.timestamp.split('T')[0];
      const spaceDate = e.timestamp.split(' ')[0];
      
      const d = new Date(e.timestamp);
      let localYYYYMMDD = '';
      if (!isNaN(d.getTime())) {
        const yr = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, '0');
        const da = String(d.getDate()).padStart(2, '0');
        localYYYYMMDD = `${yr}-${mo}-${da}`;
      }

      return isoDate === selectedDate || spaceDate === selectedDate || localYYYYMMDD === selectedDate || e.timestamp.startsWith(selectedDate);
    });
  }, [data, selectedDate]);

  // Metrics Calculation
  const visitors = filteredData.filter(e => e.event_type === 'Landing Page Viewed').length;
  const participants = filteredData.filter(e => e.event_type === 'Quiz Started').length;
  const completions = filteredData.filter(e => e.event_type === 'Quiz Completed').length;
  const leadEvents = filteredData.filter(e => e.event_type === 'Lead Captured');
  const optIns = leadEvents.length;

  const completionRate = participants > 0 ? Math.round((completions / participants) * 100) : 0;
  const optInRate = completions > 0 ? Math.round((optIns / completions) * 100) : 0;

  // CSV Export Functionality
  const exportLeadsToCSV = () => {
     if (leadEvents.length === 0) return alert("No leads available to export yet.");
     
     const headers = ["Date Captured", "Name", "Email", "Phone", "Assigned Marketing Bucket", "Client ID"];
     const rows = leadEvents.map(e => [
         new Date(e.timestamp).toLocaleString(),
         e.data?.name || '',
         e.data?.email || '',
         e.data?.phone || '',
         e.data?.assigned_bucket || '',
         e.client_id
     ]);
     
     const csvContent = "data:text/csv;charset=utf-8," 
         + headers.join(",") + "\n" 
         + rows.map(r => r.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(",")).join("\n");
         
     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", `Reactivation_Leads_Export_${new Date().toISOString().split('T')[0]}.csv`);
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  const seedDemoLead = () => {
    const timestamp = new Date().toISOString();
    const buckets = ['SD', 'CL', 'VG', 'GI'];
    const randomBucket = buckets[Math.floor(Math.random() * buckets.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const demoLead = {
       id: 'evt_' + Math.random().toString(36).substr(2, 9),
       client_id: CLIENT_ID,
       event_type: 'Lead Captured',
       data: {
          name: `Demo Lead #${randomNum}`,
          email: `demo.prospect${randomNum}@company.com`,
          phone: `(555) 234-${randomNum}`,
          assigned_bucket: randomBucket
       },
       timestamp: timestamp
    };
    
    const existing = JSON.parse(localStorage.getItem('quiz_analytics_local') || '[]');
    existing.push(
      { id: 'evt_v_' + randomNum, client_id: CLIENT_ID, event_type: 'Landing Page Viewed', timestamp },
      { id: 'evt_s_' + randomNum, client_id: CLIENT_ID, event_type: 'Quiz Started', timestamp },
      { id: 'evt_c_' + randomNum, client_id: CLIENT_ID, event_type: 'Quiz Completed', data: { assigned_bucket: randomBucket }, timestamp },
      demoLead
    );
    localStorage.setItem('quiz_analytics_local', JSON.stringify(existing));
    window.dispatchEvent(new Event('quiz_analytics_updated'));
    fetchData();
  };

  // Drop-Off Analysis Calculation
  const questionViews = filteredData.filter(e => e.event_type === 'Question Viewed');
  const qStats = {};
  questionViews.forEach(e => {
     const qId = e.data?.question_id;
     if (qId) {
        if (!qStats[qId]) qStats[qId] = { id: qId, views: 0, text: e.data?.text || '' };
        qStats[qId].views += 1;
     }
  });

  const qArray = Object.values(qStats).sort((a,b) => {
     return a.id.localeCompare(b.id, undefined, {numeric: true});
  });

  // Answer Analytics Calculation
  const answerEvents = filteredData.filter(e => e.event_type === 'Answer Selected');
  const answerStats = {};
  answerEvents.forEach(e => {
     const qId = e.data?.question_id;
     const aText = e.data?.answer_text || e.data?.answer || (typeof e.data?.selected_index === 'string' ? e.data.selected_index : '');
     if (qId && aText) {
        if (!answerStats[qId]) answerStats[qId] = { total: 0, answers: {} };
        const cleanKey = aText.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().toLowerCase();
        if (!answerStats[qId].answers[cleanKey]) answerStats[qId].answers[cleanKey] = 0;
        answerStats[qId].answers[cleanKey] += 1;
        answerStats[qId].total += 1;
     }
  });

  // Chart Formatting
  const chartData = [
      { name: 'Visitors', count: visitors },
      { name: 'Participants', count: participants },
      { name: 'Completions', count: completions },
      { name: 'Opt-Ins', count: optIns },
  ];

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center font-sans text-gray-500 font-medium">
           <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading Dashboard Visualizations...</span>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans p-6 md:p-12 selection:bg-orange-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navbar Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 rounded-xl px-8 py-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
               <span className="w-6 h-6 bg-red-600 text-white rounded-lg flex items-center justify-center text-xs font-black">🏛️</span> 
               Beacon Corporate Realty — Abuja Property Matcher Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1">Real-time Lead Capture, Matched Estates & Funnel Drop-off Analytics</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 mt-4 md:mt-0 text-sm font-semibold text-gray-500">
             
             {/* DATE PICKER */}
             <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Filter Date:</span>
                <input 
                  type="date" 
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-[#1E90FF]"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
             </div>
             {selectedDate && (
                <button onClick={() => setSelectedDate('')} className="text-[10px] underline text-gray-400 hover:text-gray-600 mt-4 h-fit">Clear Date</button>
             )}

             <div className="flex flex-col ml-2">
                <span className="text-[10px] uppercase text-gray-400 font-bold">Client / Project ID:</span>
                <span className="text-gray-800 bg-amber-50 border border-amber-200 rounded px-3 py-1 font-mono tracking-wider text-xs font-bold uppercase">
                  {CLIENT_ID}
                </span>
             </div>
             
             <button onClick={fetchData} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded shadow text-xs uppercase tracking-widest transition-colors font-bold ml-2">
               Refresh Data
             </button>

             <button onClick={seedDemoLead} className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-5 rounded shadow text-xs uppercase tracking-widest transition-colors font-bold">
               🧪 Simulate Test Lead
             </button>

             <button onClick={exportLeadsToCSV} className="bg-gray-800 hover:bg-black text-white py-2 px-5 rounded shadow text-xs uppercase tracking-widest transition-colors font-bold">
               Export Leads (CSV)
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
           <StatCard title="Visitors" value={visitors} subtitle="Arrived On Landing Page" icon={<Users className="w-5 h-5 text-blue-500" />} />
           <StatCard title="Participants" value={participants} subtitle="Started First Question" icon={<Target className="w-5 h-5 text-amber-500" />} />
           <StatCard title="Completions" value={completions} subtitle="Reached Final Question" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
           <StatCard title="Opt-Ins" value={optIns} subtitle="Submitted Contact Form" icon={<Mail className="w-5 h-5 text-orange-500" />} />
        </div>

        {/* Rates and Flow UI */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12 flex flex-col md:flex-row gap-12">
           <div className="flex-1 flex flex-col justify-center">
             <div className="flex justify-between items-end mb-2">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Completion Rate</span>
               <span className="text-lg font-black text-gray-700">{completionRate}%</span>
             </div>
             <div className="w-full bg-orange-50 h-2.5 rounded-full overflow-hidden">
               <div className="bg-[#E67E22] h-full rounded-full transition-all duration-1000" style={{ width: `${completionRate}%`}}></div>
             </div>
           </div>
           
           <div className="w-px bg-gray-100 hidden md:block"></div>
           
           <div className="flex-1 flex flex-col justify-center">
             <div className="flex justify-between items-end mb-2">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lead Opt-In Rate</span>
               <span className="text-lg font-black text-gray-700">{optInRate}%</span>
             </div>
             <div className="w-full bg-orange-50 h-2.5 rounded-full overflow-hidden">
               <div className="bg-[#E67E22] h-full rounded-full transition-all duration-1000" style={{ width: `${optInRate}%`}}></div>
             </div>
           </div>
        </div>

        {/* Main Chart Area */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 pb-12 mb-12 flex flex-col items-center">
            <h3 className="text-base font-bold text-gray-800 self-start mb-6 uppercase tracking-wider">Conversion Funnel Drop-off Chart</h3>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 13, fontWeight: 600}} dy={15} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#bbb', fontSize: 13}} dx={-10} />
                        <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none' }} />
                        <Area type="monotone" dataKey="count" stroke="#E67E22" fill="#FDEBD0" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Step-by-Step Funnel Progression & Drop-Off Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-bold text-gray-800 tracking-tight">Step-by-Step Funnel Drop-off Analysis</h3>
                   <p className="text-xs text-gray-400">Track exact drop-off and conversion at every stage of this quiz funnel</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Tenant: {CLIENT_ID}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <th className="py-3 px-4">Funnel Stage</th>
                            <th className="py-3 px-4">Question / Step Title</th>
                            <th className="py-3 px-4 text-center">Step Views</th>
                            <th className="py-3 px-4 text-center">Responses</th>
                            <th className="py-3 px-4 text-right">Step Retention</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 font-medium">
                        {[
                          { id: 'q1', label: 'Step 1', name: 'Primary Investment Goal', views: qStats['q1']?.views || participants || 0, answers: answerStats['q1']?.total || 0 },
                          { id: 'q2', label: 'Step 2', name: 'Preferred Abuja District', views: qStats['q2']?.views || answerStats['q1']?.total || 0, answers: answerStats['q2']?.total || 0 },
                          { id: 'q3', label: 'Step 3', name: 'Budget Comfort Range', views: qStats['q3']?.views || answerStats['q2']?.total || 0, answers: answerStats['q3']?.total || 0 },
                          { id: 'q4', label: 'Step 4', name: 'Payment Structure Pacing', views: qStats['q4']?.views || answerStats['q3']?.total || 0, answers: answerStats['q4']?.total || 0 },
                          { id: 'optin', label: 'Step 5', name: 'VIP Lead Capture Form', views: qStats['optin']?.views || completions || 0, answers: optIns },
                          { id: 'schedule', label: 'Step 6', name: 'Inspection Calendar / Result', views: filteredData.filter(e => e.event_type === 'Calendar Booking Opened').length, answers: filteredData.filter(e => e.event_type === 'Appointment Confirmed').length },
                        ].map((row, idx, arr) => {
                          const prevViews = idx === 0 ? visitors || row.views || 1 : (arr[idx - 1].views || 1);
                          const retention = prevViews > 0 ? Math.min(100, Math.round((row.views / prevViews) * 100)) : 100;
                          return (
                            <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-xs uppercase text-slate-500">
                                    <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono">{row.label}</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-gray-900 text-sm">{row.name}</td>
                                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">{row.views}</td>
                                <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-600 font-semibold">{row.answers}</td>
                                <td className="py-3.5 px-4 text-right">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black ${retention >= 70 ? 'bg-emerald-50 text-emerald-700' : retention >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                                        {retention}%
                                    </span>
                                </td>
                            </tr>
                          );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-bold text-gray-800 tracking-tight">Question Answers Breakdown</h3>
                   <p className="text-xs text-gray-400">See what real visitors are selecting for each diagnostic question</p>
                </div>
                <span className="text-xs font-bold text-[#1E90FF] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Real-Time Poll</span>
            </div>

            {Object.keys(answerStats).length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No question answers recorded yet. Click through the quiz questions to see real-time answer analytics!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CONFIG.questions.map((q) => {
                        const qStat = answerStats[q.id];
                        const totalForQ = qStat?.total || 0;
                        return (
                            <div key={q.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                                <div className="flex justify-between items-start mb-3">
                                   <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded">{q.id.toUpperCase()}</span>
                                   <span className="text-xs font-bold text-gray-400">{totalForQ} response{totalForQ === 1 ? '' : 's'}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-800 mb-4">{q.title || q.text}</h4>
                                
                                <div className="space-y-3">
                                   {q.options.map((opt, oIdx) => {
                                      const rawText = opt.title || opt.text || '';
                                      const cleanKey = rawText.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().toLowerCase();
                                      const count = qStat?.answers[cleanKey] || 0;
                                      const pct = totalForQ > 0 ? Math.round((count / totalForQ) * 100) : 0;
                                      return (
                                         <div key={oIdx} className="bg-white border border-gray-200 rounded-lg p-3 text-xs">
                                            <div className="flex justify-between font-semibold text-gray-700 mb-1 gap-2">
                                               <span>{rawText}</span>
                                               <span className="font-mono text-gray-500 shrink-0">{count} ({pct}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                               <div className="bg-[#D9483B] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`}}></div>
                                            </div>
                                         </div>
                                      );
                                   })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* Lead Submissions Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-bold text-gray-800 tracking-tight">Captured Leads ({leadEvents.length})</h3>
                   <p className="text-xs text-gray-400">All submissions for Beacon Corporate Realty</p>
                </div>
                <span className="text-xs font-semibold text-gray-400">Verified Contact Records</span>
            </div>

            {leadEvents.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No lead form submissions recorded yet. Run through the quiz and submit your contact info on the lead form to test!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Matched Estate</th>
                                <th className="py-3 px-4">Goal / Preference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700 font-medium">
                            {leadEvents.map((e, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="py-3.5 px-4 text-xs text-gray-400 font-mono">
                                        {new Date(e.timestamp).toLocaleString()}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-gray-900">{e.data?.name || 'N/A'}</td>
                                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-800">{e.data?.phone || 'N/A'}</td>
                                    <td className="py-3.5 px-4 text-blue-600 text-xs">{e.data?.email || 'N/A'}</td>
                                    <td className="py-3.5 px-4">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-red-50 text-[#D9483B] border border-red-200">
                                            {e.data?.matched_estate_name || e.data?.assigned_bucket || 'Innovation City'}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">
                                        {e.data?.investment_goal || 'Standard'} • {e.data?.preferred_district || ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</span>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-black text-gray-900 tracking-tight mb-1">{value}</div>
        <div className="text-[11px] text-gray-400 font-medium">{subtitle}</div>
      </div>
    </div>
  );
}
