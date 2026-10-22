import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  ExternalLink, 
  ArrowUpRight,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setActiveTab } = useApp();
  const currentYear = new Date().getFullYear();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07101E] text-slate-400 border-t border-slate-800 text-sm">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-[#0B1B3D] to-[#07101E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
              {data?.settings?.brandPositioning || 'Digital Solutions | Online Consultancy | Educational Information'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
              Ready to simplify your digital journey or resolve an admission process?
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Speak directly with our consultancy team for step-by-step guidance, registration support, or website development.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => handleNav('consultancy')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer text-center"
            >
              Request a Consultation
            </button>
            <a
              href={`https://wa.me/${(data?.settings?.contactDetails?.whatsapp || '070531572').replace(/^0/, '234').replace(/[^0-9]/g, '')}?text=Hello%20MNX%20DIGITAL%20TEAM%20SOLUTIONS,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-white border border-slate-700 hover:border-slate-500 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {data?.settings?.logoUrl ? (
                <div className="bg-white p-1 rounded-md shadow-xs shrink-0 flex items-center justify-center">
                  <img
                    src={data.settings.logoUrl}
                    alt={data?.settings?.brandName || 'MNX Logo'}
                    className="h-8 w-auto max-w-[120px] object-contain"
                  />
                </div>
              ) : (
                <div className="w-9 h-8 px-1.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs sm:text-sm">
                  MNX
                </div>
              )}
              <span className="text-lg font-bold tracking-tight text-white">
                MNX <span className="text-amber-400 font-light">DIGITAL TEAM SOLUTIONS</span>
              </span>
            </div>
            
            <p className="text-amber-400/90 text-xs font-medium italic">
              "{data?.settings?.brandSlogan || 'Simplifying Digital Processes. Connecting People to Opportunities.'}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              A recognized digital solutions, online consultancy, and educational information brand established to bridge the gap between students, professionals, and the technology opportunities they need.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{data?.settings?.contactDetails?.address || 'Digital Suite 4, Technology Hub Complex, Nigeria'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{data?.settings?.contactDetails?.workingHours || 'Monday – Saturday: 8:00 AM – 7:00 PM (WAT)'}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Main Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About MNX & Founder
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Our 8 Service Departments
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('education')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Educational Information Centre
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Project Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Resources & Official Portals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('consultancy')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Online Consultancy Request
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Official Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Business Departments */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Departments
            </h3>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">A. Online Consultancy</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">B. Educational Information</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">C. Online Registration</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">D. Website & Software Dev</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">E. Social Media Management</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">F. Digital Marketing & Ads</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">G. Digital Solutions & Support</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">H. Business Development</button></li>
            </ul>
          </div>

          {/* Verified Official Links & Socials */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Official Channels & Desk
            </h3>
            <div className="space-y-3 text-xs">
              <a
                href={data.founder.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors p-2 rounded bg-slate-900 border border-slate-800"
              >
                <span>WhatsApp (07053157243)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={data.founder.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors p-2 rounded bg-slate-900 border border-slate-800"
              >
                <span>Facebook (@menmex)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={data.founder.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors p-2 rounded bg-slate-900 border border-slate-800"
              >
                <span>YouTube (@menmex001)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={data.founder.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors p-2 rounded bg-slate-900 border border-slate-800"
              >
                <span>TikTok (@menmex01)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Verified Educational Advisory</span>
              </div>
            </div>
          </div>

        </div>

        {/* Educational Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Educational Notice:</strong> MNX Educational Information Centre disseminates verified educational notifications and guidance. While we strictly verify announcements against primary statutory bulletins (JAMB, National Universities Commission, NBTE, Federal Scholarship Board), institutional regulations are subject to statutory amendments. Official institutional links are provided across publications for direct verification.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} MNX DIGITAL TEAM SOLUTIONS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Leadership: Isaiah (MNX DIGITAL TEAM SOLUTIONS)
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleNav('admin')} className="hover:text-amber-400 transition-colors cursor-pointer">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
