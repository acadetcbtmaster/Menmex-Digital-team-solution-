import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { data, submitContact, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your telephone or WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim()
      });

      if (res.success) {
        setSuccessMsg('Your message has been delivered to MNX DIGITAL TEAM SOLUTIONS. Automated alerts have been routed to our admin panel, email, and WhatsApp.');
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMsg(res.message || 'Could not deliver message.');
      }
    } catch {
      setErrorMsg('Network error delivering message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Direct Communication Desk
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Contact MNX DIGITAL TEAM SOLUTIONS
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reach our corporate and educational consultancy desks directly through official channels, WhatsApp chat, email, or by submitting the contact form below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Information & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                  Official Registry Details
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Corporate Contact Information
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Telephone Support</span>
                    <a href={`tel:${data.settings.contactDetails.phone}`} className="font-semibold text-slate-900 hover:text-amber-600">
                      {data.settings.contactDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">WhatsApp Advisory Desk</span>
                    <a 
                      href={`https://wa.me/${data.settings.contactDetails.whatsapp.replace(/^0/, '234').replace(/[^0-9]/g, '')}?text=Hello%20MNX%20DIGITAL%20TEAM%20SOLUTIONS,%20I%20would%20like%20to%20reach%20your%20consultancy%20desk.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {data.settings.contactDetails.whatsapp} (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Official Email</span>
                    <a href={`mailto:${data.settings.contactDetails.email}`} className="font-semibold text-slate-900 hover:text-amber-600">
                      {data.settings.contactDetails.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Address & Coverage</span>
                    <span className="font-semibold text-slate-900 leading-snug block">
                      {data.settings.contactDetails.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Operating Hours</span>
                    <span className="font-semibold text-slate-900 block">
                      {data.settings.contactDetails.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${data.settings.contactDetails.whatsapp.replace(/^0/, '234').replace(/[^0-9]/g, '')}?text=Hello%20MNX%20DIGITAL%20TEAM%20SOLUTIONS,%20I%20am%20contacting%20you%20from%20your%20official%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Direct WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="bg-slate-100 rounded-xl border border-slate-200 p-6 space-y-4">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Official Social Media Channels
              </span>
              <div className="space-y-2 text-xs">
                <a
                  href={data.founder.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition-colors"
                >
                  <span className="font-medium">Facebook Community Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href={data.founder.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition-colors"
                >
                  <span className="font-medium">WhatsApp Broadcast Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href={data.founder.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition-colors"
                >
                  <span className="font-medium">YouTube Video Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href={data.founder.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition-colors"
                >
                  <span className="font-medium">TikTok Educational Account</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                Reach Out Online
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                Send an Official Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill in the form below for general enquiries, institutional partnerships, or corporate support.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chukwuma Eze"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. user@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. School Portal Partnership"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-amber-600">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-y"
                />
              </div>

              {/* Automated Real-Time Dispatch Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Automated Dispatch Enabled:</span>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    This form automatically alerts our executive team via Admin Dashboard, Email, and WhatsApp instantly.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 bg-[#0B1B3D] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{submitting ? 'Transmitting to Admin, Email & WhatsApp...' : 'Transmit Message to MNX'}</span>
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Have a specific service request?</span>
              <button
                onClick={() => {
                  setActiveTab('consultancy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Use Consultancy Intake Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
