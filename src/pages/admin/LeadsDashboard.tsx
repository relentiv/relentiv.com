import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase/config';
import { Lead, updateLeadStatus } from '../../lib/firebase/leads';
import { signOut } from '../../lib/firebase/auth';

export default function LeadsDashboard() {
  const [, setLocation] = useLocation();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'open' | 'in_progress' | 'closed'>('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'budget'>('newest');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const leadsRef = collection(db, "leads");
    const q = query(leadsRef, orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newLeads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Lead));
      setLeads(newLeads);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setLocation('/internal/portal/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status'], currentStatus: Lead['status']) => {
    try {
      await updateLeadStatus(id, newStatus, currentStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
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

  const filteredLeads = leads.filter(lead => {
    if (filter !== 'all' && lead.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        lead.fullName.toLowerCase().includes(searchLower) ||
        lead.workEmail.toLowerCase().includes(searchLower) ||
        (lead.companyName && lead.companyName.toLowerCase().includes(searchLower))
      );
    }
    return true;
  }).sort((a, b) => {
    if (sort === 'newest') return b.submittedAt?.toMillis() - a.submittedAt?.toMillis();
    if (sort === 'oldest') return a.submittedAt?.toMillis() - b.submittedAt?.toMillis();
    if (sort === 'budget') {
      // Very basic budget sorting - assumes format like "$10k - $50k"
      const getBudgetVal = (b: string) => parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return getBudgetVal(b.budget) - getBudgetVal(a.budget);
    }
    return 0;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    inProgress: leads.filter(l => l.status === 'open' || l.status === 'in_progress').length,
    closed: leads.filter(l => l.status === 'closed').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight">RELENTIV <span className="text-emerald-500">PORTAL</span></h1>
          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            <Link href="/internal/portal/leads" className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
              Leads
            </Link>
            <Link href="/internal/portal/messages" className="rounded-full px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Messages
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-400">{auth.currentUser?.email}</span>
          <button 
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: stats.total, color: 'text-white' },
            { label: 'New', value: stats.new, color: 'text-blue-400' },
            { label: 'In Progress', value: stats.inProgress, color: 'text-purple-400' },
            { label: 'Closed', value: stats.closed, color: 'text-emerald-400' }
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <span className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['all', 'new', 'open', 'in_progress', 'closed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
                  filter === f 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none pr-8 relative"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="budget">Budget (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0a0a0a]/50 text-xs uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Budget & Timeline</th>
                  <th className="px-6 py-4 font-semibold">Meeting</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No leads found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{lead.fullName}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{lead.companyName || 'No company'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${lead.workEmail}`} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                          {lead.workEmail}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{lead.budget}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.expectedTimeline}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{lead.meetingDate}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.meetingTime}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {formatRelativeTime(lead.submittedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative group/dropdown">
                          <button className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ').toUpperCase()}
                            <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                          
                          {/* Status Dropdown */}
                          <div className="absolute top-full left-0 mt-1 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-10 overflow-hidden">
                            {['new', 'open', 'in_progress', 'closed'].map(s => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(lead.id, s as any, lead.status)}
                                disabled={lead.status === s}
                                className={`w-full text-left px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white/5 transition-colors ${lead.status === s ? 'text-emerald-500 bg-emerald-500/5' : 'text-gray-400'}`}
                              >
                                {s.replace('_', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setLocation(`/internal/portal/leads/${lead.id}`)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
