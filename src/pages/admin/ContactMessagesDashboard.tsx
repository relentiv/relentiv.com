import React, { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link, useLocation } from 'wouter';
import { auth, db } from '../../lib/firebase/config';
import { signOut } from '../../lib/firebase/auth';
import type { ContactSubmission } from '../../lib/firebase/contact';

export default function ContactMessagesDashboard() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  useEffect(() => {
    const messagesRef = collection(db, 'contactSubmissions');
    const messagesQuery = query(messagesRef, orderBy('submittedAt', 'desc'));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const nextMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactSubmission[];

        setMessages(nextMessages);
        setSelectedMessageId((current) => current ?? nextMessages[0]?.id ?? null);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching contact messages:', error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setLocation('/internal/portal/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredMessages = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      return messages;
    }

    return messages.filter((message) => (
      message.name.toLowerCase().includes(searchTerm) ||
      message.email.toLowerCase().includes(searchTerm) ||
      message.message.toLowerCase().includes(searchTerm)
    ));
  }, [messages, search]);

  useEffect(() => {
    if (!filteredMessages.length) {
      setSelectedMessageId(null);
      return;
    }

    if (!selectedMessageId || !filteredMessages.some((message) => message.id === selectedMessageId)) {
      setSelectedMessageId(filteredMessages[0].id);
    }
  }, [filteredMessages, selectedMessageId]);

  const selectedMessage = filteredMessages.find((message) => message.id === selectedMessageId) ?? null;

  const stats = {
    total: messages.length,
    today: messages.filter((message) => isSameDay(message.submittedAt)).length,
    withLongMessage: messages.filter((message) => message.message.trim().length >= 200).length,
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
      <header className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-tight">RELENTIV <span className="text-emerald-500">PORTAL</span></h1>
          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            <Link href="/internal/portal/leads" className="rounded-full px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Leads
            </Link>
            <Link href="/internal/portal/messages" className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Messages', value: stats.total, color: 'text-white' },
            { label: 'Today', value: stats.today, color: 'text-emerald-400' },
            { label: 'Detailed Notes', value: stats.withLongMessage, color: 'text-blue-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <span className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-semibold">Inbox</h2>
              <p className="text-sm text-gray-500 mt-1">All website contact form submissions.</p>
            </div>

            <div className="divide-y divide-white/5">
              {filteredMessages.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  No messages found.
                </div>
              ) : (
                filteredMessages.map((message) => {
                  const isActive = message.id === selectedMessageId;

                  return (
                    <button
                      key={message.id}
                      type="button"
                      onClick={() => setSelectedMessageId(message.id)}
                      className={`w-full px-6 py-5 text-left transition-colors ${isActive ? 'bg-emerald-500/10' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-medium text-white truncate">{message.name}</div>
                          <div className="text-sm text-emerald-400 truncate">{message.email}</div>
                        </div>
                        <div className="shrink-0 text-xs text-gray-500">
                          {formatRelativeTime(message.submittedAt)}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                        {message.message}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {selectedMessage ? (
              <div className="space-y-8">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{selectedMessage.name}</h2>
                      <a href={`mailto:${selectedMessage.email}`} className="text-emerald-400 hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                      {selectedMessage.status}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Received {formatDate(selectedMessage.submittedAt)}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Message</h3>
                  <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[320px] flex items-center justify-center text-center text-gray-500">
                Select a message to read it here.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

const isSameDay = (timestamp: ContactSubmission['submittedAt']) => {
  if (!timestamp) {
    return false;
  }

  const date = timestamp.toDate();
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const formatDate = (timestamp: ContactSubmission['submittedAt']) => {
  if (!timestamp) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(timestamp.toDate());
};

const formatRelativeTime = (timestamp: ContactSubmission['submittedAt']) => {
  if (!timestamp) {
    return 'Unknown';
  }

  const date = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};
