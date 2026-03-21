import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUDGET_OPTIONS = ['< $10k', '$10k - $50k', '$50k - $100k', '$100k+'];
const TIMELINE_OPTIONS = ['ASAP', '1-3 months', '3-6 months', 'Flexible'];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    description: '',
    date: '',
    time: ''
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 300); // Reset after animation
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field: 'budget' | 'timeline', value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Move to success state
  };

  const generateCalendarLink = () => {
    try {
      const selectedDate = formData.date || new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const selectedTime = formData.time || '10:00';
      
      const start = new Date(`${selectedDate}T${selectedTime}`);
      const end = new Date(start.getTime() + 30 * 60000);

      const formatDt = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `Discovery Call: ${formData.company || formData.name} x INDI AINTELLIGENCE`,
        dates: `${formatDt(start)}/${formatDt(end)}`,
        details: `Project Details:\n${formData.description}\n\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nClient: ${formData.name} (${formData.email})`,
        add: 'shavitriverma111@gmail.com',
      });

      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    } catch (error) {
      return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Discovery+Call+x+INDI+AINTELLIGENCE&add=shavitriverma111@gmail.com';
    }
  };

  const isStep1Valid = formData.name.trim() !== '' && formData.email.trim() !== '';
  const isStep2Valid = formData.budget !== '' && formData.timeline !== '' && formData.description.trim() !== '';
  const isStep3Valid = formData.date !== '' && formData.time !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 fade-in duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6">
          <div className="flex items-center gap-4">
            {step > 1 && step < 4 && (
              <button 
                onClick={prevStep}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            )}
            <div>
              <h2 className="text-2xl font-medium text-white tracking-tight">
                {step === 4 ? 'Meeting Confirmed' : 'Let\'s build together'}
              </h2>
              {step < 4 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-emerald-400' : i < step ? 'w-2 bg-emerald-400/50' : 'w-2 bg-white/10'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium ml-2">Step {step} of 3</span>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 pt-2 overflow-y-auto custom-scrollbar">
          
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-white/10 px-1 py-3 text-xl text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder-gray-700"
                    placeholder="Jane Doe"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-white/10 px-1 py-3 text-xl text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder-gray-700"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Company <span className="text-gray-600">(Optional)</span></label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-white/10 px-1 py-3 text-xl text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder-gray-700"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Project Details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          )}

          {/* Step 2: Project Scope */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Project Budget</label>
                <div className="grid grid-cols-2 gap-3">
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect('budget', opt)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.budget === opt 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Expected Timeline</label>
                <div className="grid grid-cols-2 gap-3">
                  {TIMELINE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect('timeline', opt)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.timeline === opt 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Project Overview</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-gray-600 resize-none"
                  placeholder="Briefly describe what you're looking to build..."
                ></textarea>
              </div>

              <button 
                onClick={nextStep}
                disabled={!isStep2Valid}
                className="w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Scheduling
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          )}

          {/* Step 3: Scheduling */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Discovery Call</h4>
                    <p className="text-gray-400 text-sm mt-1">A 30-minute introductory call to discuss your project requirements and see if we're a good fit.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Date</label>
                    <input 
                      required
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Time</label>
                    <input 
                      required
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!isStep3Valid}
                className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                Confirm Booking
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 text-black rounded-full flex items-center justify-center relative z-10 shadow-2xl">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-3xl font-medium text-white mb-3 tracking-tight">You're all set!</h3>
              <p className="text-gray-400 max-w-sm mb-10 text-lg">
                Thanks, {formData.name.split(' ')[0]}. We've reserved your slot. Add it to your calendar below.
              </p>
              
              <div className="w-full max-w-sm space-y-4">
                <a 
                  href={generateCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#4285F4] text-white font-medium rounded-2xl hover:bg-[#3367D6] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
                  </svg>
                  Add to Google Calendar
                </a>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-transparent text-gray-400 font-medium rounded-2xl hover:text-white hover:bg-white/5 transition-colors"
                >
                  Close window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
