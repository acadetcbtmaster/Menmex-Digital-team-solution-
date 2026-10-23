import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, data, adminUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'education', label: 'Educational Updates' },
    { id: 'projects', label: 'Our Projects' },
    { id: 'resources', label: 'Resources' },
    { id: 'consultancy', label: 'Consultancy' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1B3D] border-b border-slate-800 text-white shadow-md">
      {/* Announcement Bar */}
      {data?.settings?.announcementBanner?.enabled && (
        <div className="bg-[#07101E] border-b border-slate-800/80 px-3 sm:px-4 py-1.5 text-xs text-slate-300 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 overflow-hidden truncate min-w-0 flex-1">
              <span className="text-sky-400 font-semibold uppercase tracking-wider text-[10px] shrink-0">Official Bulletin</span>
              <span className="text-slate-500 shrink-0">·</span>
              <span className="truncate text-[11px] sm:text-xs text-slate-300 min-w-0">{data?.settings?.announcementBanner?.text}</span>
            </div>
            <button
              onClick={() => handleNavClick('education')}
              className="text-sky-400 hover:text-sky-300 text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 flex items-center gap-0.5 cursor-pointer ml-1"
            >
              <span>Updates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-16 sm:h-18 min-w-0">
          
          {/* Zone 1: Single text element wordmark or uploaded logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer min-w-0 group shrink"
          >
            {data?.settings?.logoUrl ? (
              <div className="bg-white p-1 rounded-md shadow-xs shrink-0 flex items-center justify-center group-hover:scale-102 transition-transform">
                <img
                  src={data.settings.logoUrl}
                  alt={data?.settings?.brandName || 'MNX Logo'}
                  className="h-7 sm:h-8 w-auto max-w-[120px] object-contain"
                />
              </div>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-9 px-1.5 rounded bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-black text-xs sm:text-sm tracking-wider group-hover:border-sky-400 transition-colors shrink-0">
                MNX
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors truncate">
                MNX <span className="text-sky-400 font-light">DIGITAL</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] sm:text-[10px] tracking-wider text-slate-400 uppercase font-medium truncate">
                Team Solutions & Consultancy
              </span>
            </div>
          </div>

          {/* Zone 2: 4-8 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive 
                      ? 'text-sky-400 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + Admin link */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('admin')}
              title={adminUser ? `Signed in as ${adminUser.name}` : 'Administrative Portal'}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5 ${
                activeTab === 'admin' 
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[11px]">
                {adminUser ? 'Admin' : 'Portal'}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('consultancy')}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 sm:gap-1.5"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              <span className="hidden sm:inline">Request Consultation</span>
              <span className="sm:hidden">Enquire</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07101E] border-b border-slate-800 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-sky-500/10 text-sky-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 mt-2 flex items-center justify-between">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1.5 py-1 px-3"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
