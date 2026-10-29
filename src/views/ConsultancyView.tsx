import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { EnquirySuccessModal } from '../components/EnquirySuccessModal.tsx';
import { 
  Sparkles, 
  ShieldCheck, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Search,
  Lock,
  MessageCircle,
  FileText
} from 'lucide-react';

export const ConsultancyView: React.FC = () => {
  const { 
    submitEnquiry, 
    data, 
    selectedServiceForEnquiry, 
    setSelectedServiceForEnquiry 
  } = useApp();

  const serviceCategories = [
    'Online Consultancy',
    'JAMB and Admission Assistance',
    'Online Registration',
    'Website Development',
    'Social Media Management',
    'Digital Marketing',
    'Technical Support',
    'Business and Digital Development'
  ];

  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(
    selectedServiceForEnquiry || 'Online Consultancy'
  );
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Success Modal State
  const [createdRef, setCreatedRef] = useState<string | null>(null);

  // Status Lookup State
  const [lookupRef, setLookupRef] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    referenceNumber: string;
    serviceCategory: string;
    status: string;
    submittedAt: string;
    adminNotes?: string;
  } | null>(null);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    if (selectedServiceForEnquiry) {
      setServiceCategory(selectedServiceForEnquiry);
    }
  }, [selectedServiceForEnquiry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!whatsappNumber.trim()) {
      setErrorMsg('Please enter a reachable WhatsApp phone number.');
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      setErrorMsg('Please provide a descriptive explanation of your request (minimum 15 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitEnquiry({
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        email: email.trim() ? email.trim() : undefined,
        serviceCategory,
        subject: subject.trim() || `Consultancy Request: ${serviceCategory}`,
        description: description.trim()
      });

      if (res.success && res.referenceNumber) {
        setCreatedRef(res.referenceNumber);
        // Clear form
        setFullName('');
        setWhatsappNumber('');
        setEmail('');
        setSubject('');
        setDescription('');
        setSelectedServiceForEnquiry(null);
      } else {
        setErrorMsg(res.message || 'Could not process submission. Please retry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error logging enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);

    const query = lookupRef.trim().toUpperCase();
    if (!query) {
      setLookupError('Please enter a valid reference number (e.g. MNX-2026-8912).');
      return;
    }

    const found = data.enquiries.find(
      enq => enq.referenceNumber.toUpperCase() === query
    );

    if (found) {
      setLookupResult({
        referenceNumber: found.referenceNumber,
        serviceCategory: found.serviceCategory,
        status: found.status,
        submittedAt: found.submittedAt,
        adminNotes: found.adminNotes
      });
    } else {
      setLookupError(`No logged enquiry found matching reference: "${query}". Please check the digits.`);
    }
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
              Professional Service Enquiry System
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Request Professional Online Consultancy
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Submit your specific educational, registration, or software inquiry directly to our advisory desk. All submissions generate an official tracking reference and are handled with strict confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Lookup Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: The Main Enquiry Form */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider block">
                Direct Submission
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Consultancy & Service Intake Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select your required service category and describe the challenge or project requirements.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Service Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Service Category <span className="text-sky-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceCategories.map((cat) => {
                    const isSelected = serviceCategory === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setServiceCategory(cat)}
                        className={`p-3 rounded-lg text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0B1B3D] text-sky-300 border-[#0B1B3D] shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adeyemi Michael"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 812 345 6789"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Used for sending your response updates and reference code.
                  </span>
                </div>
              </div>

              {/* Email (Optional) & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. candidate@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Specific Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. O'Level Upload Issue or School Website Scope"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Description of Request */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Description of Request / Challenge <span className="text-sky-600">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please state details of the issue, school, target course, or website specifications..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-y"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  The more specifics provided, the quicker our advisory team can structure the exact solution.
                </span>
              </div>

              {/* Automated Real-Time Dispatch Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Instant 3-Channel Automated Dispatch:</span>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    Upon submission, your request is automatically dispatched directly to our Admin Dashboard, Email, and WhatsApp without requiring you to open WhatsApp manually.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-500 text-white shadow-xs font-bold text-xs sm:text-sm rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Routing to Admin, Email & WhatsApp...' : 'Submit & Automatically Notify Team'}</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Private and encrypted transmission. Never shared publicly.</span>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Status Tracker & Advisory Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Enquiry Status Tracker */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Track Your Existing Request
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have you previously submitted a request? Enter your reference number below to check its real-time review status.
              </p>

              <form onSubmit={handleLookup} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="e.g. MNX-2026-8912"
                    value={lookupRef}
                    onChange={(e) => setLookupRef(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono uppercase bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Lookup Status
                </button>
              </form>

              {lookupError && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {lookupError}
                </div>
              )}

              {lookupResult && (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-mono font-bold text-slate-900">
                      {lookupResult.referenceNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      lookupResult.status === 'Resolved' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : lookupResult.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : lookupResult.status === 'Under Review' 
                        ? 'bg-sky-100 text-sky-800' 
                        : 'bg-slate-200 text-slate-800'
                    }`}>
                      {lookupResult.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 block">Department: {lookupResult.serviceCategory}</span>
                    <span className="text-[11px] text-slate-500 block">Submitted: {lookupResult.submittedAt}</span>
                  </div>
                  {lookupResult.adminNotes && (
                    <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                      <strong>Advisor Note:</strong> {lookupResult.adminNotes}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Advisory Guarantee Box */}
            <div className="bg-[#0B1B3D] text-white rounded-xl p-6 border border-slate-800 space-y-4">
              <span className="text-sky-400 text-xs font-semibold uppercase tracking-wider block">
                The Menmex Commitment
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                Accredited Verification & Transparent Service
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Verified institutional cross-checking against official portals.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Dedicated assignment to a domain specialist advisor.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Immediate follow-up via WhatsApp or scheduled telephone call.</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <a
                  href={`https://wa.me/${(data?.settings?.contactDetails?.whatsapp || '07053157243').replace(/^0/, '234').replace(/[^0-9]/g, '')}?text=Hello%20Menmex%20Digital%20Solution%20team%20network,%20I%20have%20an%20urgent%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Need Immediate Direct WhatsApp Help?</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Success Modal */}
      {createdRef && (
        <EnquirySuccessModal
          referenceNumber={createdRef}
          fullName={fullName}
          serviceCategory={serviceCategory}
          whatsappNumber={whatsappNumber}
          onClose={() => setCreatedRef(null)}
        />
      )}

    </div>
  );
};
