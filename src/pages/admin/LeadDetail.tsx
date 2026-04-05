import React, { useState, useEffect } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { Lead, LeadHistoryEntry, updateLeadStatus } from '../../lib/firebase/leads';

export default function LeadDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>('/internal/portal/leads/:id');
  const leadId = params?.id;

  const [lead, setLead] = useState<Lead | null>(null);
  const [history, setHistory] = useState<LeadHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!leadId) return;

    // Listen to lead document
    const leadRef = doc(db, "leads", leadId);
    const unsubscribeLead = onSnapshot(leadRef, (docSnap) => {
      if (docSnap.exists()) {
        setLead({ id: docSnap.id, ...docSnap.data() } as Lead);
      } else {
        setLead(null);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching lead:", error);
      setIsLoading(false);
    });

    // Listen to history subcollection
    const historyRef = collection(db, "leads", leadId, "history");
    const q = query(historyRef, orderBy("changedAt", "desc"));
    const unsubscribeHistory = onSnapshot(q, (snapshot) => {
      const newHistory = snapshot.docs.map(doc => ({
        ...doc.data()
      } as LeadHistoryEntry));
      setHistory(newHistory);
    }, (error) => {
      console.error("Error fetching history:", error);
    });

    return () => {
      unsubscribeLead();
      unsubscribeHistory();
    };
  }, [leadId]);

  const handleStatusChange = async (newStatus: Lead['status']) => {
    if (!lead || lead.status === newStatus) return;
    
    setIsUpdating(true);
    try {
      await updateLeadStatus(lead.id, newStatus, lead.status);
      // Optional: show success toast here
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'open': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'in_progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'closed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const formatRelativeTime = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Lead Not Found</h2>
        <button 
          onClick={() => setLocation('/internal/portal/leads')}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
        <button 
          onClick={() => setLocation('/internal/portal/leads')}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{lead.fullName}</h1>
          <p className="text-sm text-gray-500">{lead.companyName || 'No company provided'}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          <Link href="/internal/portal/leads" className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
            Leads
          </Link>
          <Link href="/internal/portal/messages" className="rounded-full px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
            Messages
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Lead Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Lead Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Full Name</label>
                  <p className="text-lg font-medium text-white">{lead.fullName}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Work Email</label>
                  <p className="text-lg font-medium text-emerald-400">
                    <a href={`mailto:${lead.workEmail}`} className="hover:underline">{lead.workEmail}</a>
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Company Name</label>
                  <p className="text-lg font-medium text-white">{lead.companyName || <span className="text-gray-600 italic">Not provided</span>}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Budget</label>
                  <p className="text-lg font-medium text-white">{lead.budget}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Expected Timeline</label>
                  <p className="text-lg font-medium text-white">{lead.expectedTimeline}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Meeting Requested</label>
                  <p className="text-lg font-medium text-white">
                    {lead.meetingDate} at {lead.meetingTime}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Project Notes / Message</label>
                  <div className="mt-2 p-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-gray-300 whitespace-pre-wrap">
                    {lead.message || <span className="text-gray-600 italic">No additional notes provided.</span>}
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/10 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Submission Info</label>
                  <p className="text-sm text-gray-400">Submitted on {formatDate(lead.submittedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Status & History */}
          <div className="space-y-8">
            
            {/* Status Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Current Status</h3>
              
              <div className={`px-4 py-3 rounded-xl border flex items-center justify-center mb-6 text-sm font-bold tracking-wider uppercase ${getStatusColor(lead.status)}`}>
                {lead.status.replace('_', ' ')}
              </div>

              <div className="space-y-2">
                {[
                  { id: 'new', label: 'Mark as New' },
                  { id: 'open', label: 'Mark as Open' },
                  { id: 'in_progress', label: 'Mark as In Progress' },
                  { id: 'closed', label: 'Mark as Closed' }
                ].map(status => (
                  <button
                    key={status.id}
                    onClick={() => handleStatusChange(status.id as any)}
                    disabled={lead.status === status.id || isUpdating}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                      lead.status === status.id 
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-transparent' 
                        : 'bg-[#0a0a0a] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {status.label}
                    {lead.status !== status.id && (
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Activity History
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {history.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 py-4 relative z-10 bg-[#0a0a0a] rounded-xl border border-white/5">
                    No status changes yet
                  </div>
                ) : (
                  history.map((entry, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-[#0a0a0a] text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      </div>
                      
                      {/* Card */}
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-[#0a0a0a] border border-white/10 shadow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-emerald-400">Status Changed</span>
                          <time className="text-xs text-gray-500">{formatRelativeTime(entry.changedAt)}</time>
                        </div>
                        <div className="text-sm text-gray-300 mt-2">
                          <span className="text-gray-500 line-through mr-2">{entry.fromStatus.replace('_', ' ')}</span>
                          <svg className="w-3 h-3 inline mx-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          <span className="text-white font-medium ml-2">{entry.toStatus.replace('_', ' ')}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/5">
                          By: {entry.changedBy}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
