import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Ticket, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { EnquiryStatus } from '../types/index.ts';

interface TicketResult {
  referenceNumber: string;
  serviceCategory: string;
  subject: string;
  status: EnquiryStatus;
  submittedAt: string;
  adminNotes?: string;
}

export const TicketFollowUpPort: React.FC = () => {
  const { data } = useApp();
  const [ticketInput, setTicketInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketResult, setTicketResult] = useState<TicketResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = ticketInput.trim().toUpperCase();

    if (!query) {
      setErrorMsg('Please enter a ticket reference number (e.g. MNX-2026-8912).');
      setTicketResult(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setTicketResult(null);

    // 1. Try local data first
    const localMatch = data.enquiries.find(
      enq => enq.referenceNumber.toUpperCase() === query
    );

    if (localMatch) {
      setTicketResult({
        referenceNumber: localMatch.referenceNumber,
        serviceCategory: localMatch.serviceCategory,
        subject: localMatch.subject,
        status: localMatch.status,
        submittedAt: localMatch.submittedAt,
        adminNotes: localMatch.adminNotes
      });
      setLoading(false);
      return;
    }

    // 2. Query backend API directly for live status
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(query)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.ticket) {
          setTicketResult(json.ticket);
        } else {
          setErrorMsg(`No support ticket found for "${query}". Please check your reference digits.`);
        }
      } else {
        setErrorMsg(`No support ticket found for "${query}". Please verify your reference number or contact our desk.`);
      }
    } catch {
      setErrorMsg('Unable to verify ticket status at this moment. Please check your connection or contact our desk.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setTicketInput('');
    setTicketResult(null);
    setErrorMsg('');
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resolved</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span>In Progress</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-bold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Under Review</span>
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 font-bold text-xs">
            <span>Closed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Received / Queued</span>
          </span>
        );
    }
  };

  // Sample reference helper from existing database (if any)
  const sampleRef = data.enquiries[0]?.referenceNumber || 'MNX-2026-4821';

  const whatsappDeskNumber = (data?.settings?.contactDetails?.whatsapp || '07053157243')
    .replace(/^0/, '234')
    .replace(/[^0-9]/g, '');

  return (
    <section 
      aria-label="Support Ticket Follow-Up Port" 
      className="bg-[#091528] border-b border-slate-800 text-slate-300 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Accent Grid */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5 text-sky-400" />
              <span>Support Ticket Follow-Up Port</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Track Your Support Ticket & Enquiry Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Enter your official reference number to look up live assignment, progress stage, and consultant updates.
            </p>
          </div>

          {/* Quick example helper */}
          <div className="flex items-center gap-2 text-xs text-slate-400 self-start md:self-auto">
            <span className="text-[11px]">Quick test:</span>
            <button
              type="button"
              onClick={() => {
                setTicketInput(sampleRef);
                setErrorMsg('');
              }}
              className="font-mono text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 cursor-pointer transition-colors"
            >
              {sampleRef}
            </button>
          </div>
        </div>

        {/* Input Form Port */}
        <form onSubmit={handleLookup} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#0B1B3D] p-2 rounded-xl border border-slate-700/80 shadow-xl focus-within:border-sky-500 transition-colors">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-sky-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => {
                  setTicketInput(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="Enter Ticket Reference (e.g. MNX-2026-8912)"
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-hidden px-2 py-2"
                aria-label="Ticket Reference"
              />
              {ticketInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Looking Up...</span>
                </>
              ) : (
                <>
                  <span>Look Up Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Found Ticket Result Card */}
        {ticketResult && (
          <div className="mt-6 rounded-xl bg-[#0B1B3D] border border-sky-500/40 p-5 sm:p-7 shadow-2xl animate-in fade-in space-y-5">
            
            {/* Top Bar of Result */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/70 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base sm:text-lg font-black text-white tracking-wider">
                      {ticketResult.referenceNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(ticketResult.referenceNumber)}
                      className="text-slate-400 hover:text-sky-300 transition-colors p-1"
                      title="Copy Reference Number"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Official Support & Advisory Ticket
                  </span>
                </div>
              </div>

              <div>
                {getStatusBadge(ticketResult.status)}
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Assigned Department
                </span>
                <span className="font-bold text-sky-300 text-sm mt-0.5 block truncate">
                  {ticketResult.serviceCategory}
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Subject / Focus
                </span>
                <span className="font-bold text-white text-sm mt-0.5 block truncate">
                  {ticketResult.subject || 'Consultation Request'}
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Date & Time Logged
                </span>
                <span className="font-bold text-slate-300 text-xs sm:text-sm mt-0.5 block">
                  {ticketResult.submittedAt}
                </span>
              </div>
            </div>

            {/* Advisor Notes Section */}
            {ticketResult.adminNotes ? (
              <div className="p-4 rounded-lg bg-sky-950/40 border border-sky-400/30 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Official Advisor Update:</span>
                </div>
                <p className="text-slate-200 pl-5 leading-relaxed italic">
                  "{ticketResult.adminNotes}"
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Your ticket is currently queued for advisor evaluation. You will receive real-time notifications via WhatsApp and email.</span>
              </div>
            )}

            {/* Expedite via WhatsApp action */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px]">
                Need immediate real-time clarification on this ticket?
              </span>

              <a
                href={`https://wa.me/${whatsappDeskNumber}?text=Hello%20MNX%20Support,%20I%20am%20following%20up%20on%20my%20support%20ticket:%20${encodeURIComponent(ticketResult.referenceNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Expedite via WhatsApp Desk</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
