import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Code, 
  MessageSquare, 
  FileCheck, 
  Calendar, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { VerifiedBadge, GoogleVerifiedBusinessCard } from '../components/VerifiedBadge.tsx';

export const HomeView: React.FC = () => {
  const { data, setActiveTab, setSelectedArticle, setSelectedServiceForEnquiry } = useApp();

  const handleConsult = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForEnquiry(serviceName);
    }
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const latestArticles = data.articles.slice(0, 3);

  // Department icon resolver helper
  const getDepartmentIcon = (code: string) => {
    switch (code) {
      case 'A': return MessageSquare;
      case 'B': return GraduationCap;
      case 'C': return FileCheck;
      case 'D': return Code;
      case 'E': return ShieldCheck;
      case 'F': return TrendingUp;
      default: return Sparkles;
    }
  };

  // 4 Featured Departments directly from live data.services (updates from admin immediately reflect)
  const featuredServices = (data.services && data.services.length > 0)
    ? data.services.slice(0, 4)
    : [
        {
          id: 'svc-1',
          departmentCode: 'A' as const,
          title: 'Online Consultancy',
          tagline: 'Expert guidance for admissions, careers & enterprise workflows.',
          description: 'Direct strategic advisory for students and businesses.',
          categoryName: 'Consultancy',
          features: [],
          targetClients: [],
          iconName: 'MessageSquare',
          isActive: true
        },
        {
          id: 'svc-2',
          departmentCode: 'B' as const,
          title: 'Educational Information',
          tagline: 'Verified JAMB, Post-UTME, scholarships & screening alerts.',
          description: 'Authentic updates directly from regulatory boards.',
          categoryName: 'Education',
          features: [],
          targetClients: [],
          iconName: 'GraduationCap',
          isActive: true
        },
        {
          id: 'svc-3',
          departmentCode: 'C' as const,
          title: 'Registration & Solutions',
          tagline: 'Accredited portal processing, digital marketing & business growth.',
          description: 'End-to-end portal and corporate filing assistance.',
          categoryName: 'Registration',
          features: [],
          targetClients: [],
          iconName: 'FileCheck',
          isActive: true
        },
        {
          id: 'svc-4',
          departmentCode: 'D' as const,
          title: 'Website & Software Dev',
          tagline: 'Modern, high-performance web applications, CBT portals & tools.',
          description: 'Full-stack software engineering and responsive web designs.',
          categoryName: 'Software',
          features: [],
          targetClients: [],
          iconName: 'Code',
          isActive: true
        }
      ];

  return (
    <div className="bg-white text-slate-900">
      
      {/* 1. HERO SECTION: BOLD, UNIQUE, HIGH-CONTRAST NAVY */}
      <section className="relative bg-[#0B192C] text-white pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden border-b border-slate-800">
        {/* Subtle geometric grid background */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -top-40 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className={`space-y-6 ${data?.settings?.hero?.heroImage ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'}`}>
              {/* Unique Bold Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>{data?.settings?.hero?.badgeText || 'Menmex Digital Solution team network'}</span>
              </div>

              {/* Bold Headline (Reflects Admin changes immediately) */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {data?.settings?.hero?.headline ? (
                  data.settings.hero.headline
                ) : (
                  <>
                    Simplifying Digital Processes.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">
                      Connecting People to Opportunities.
                    </span>
                  </>
                )}
              </h1>

              {/* Sub-headline / Description */}
              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                {data?.settings?.hero?.subheadline || data?.settings?.hero?.description || 'Professional digital services, verified academic admissions guidance, and bespoke technology engineering for individuals, students, and businesses.'}
              </p>

              {/* Clean, Bold Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => handleConsult()}
                  className="px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Consultation</span>
                </button>

                <button
                  onClick={() => handleNavigate('services')}
                  className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore {data?.services?.length || 8} Departments</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Core Impact Metrics with Live Website Views */}
              <div className="pt-8 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                    {(data?.settings?.websiteViews ?? 1428).toLocaleString()}+
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Website Views</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                    {data?.services?.length || 8}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Departments</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-white">100%</span>
                  <span className="text-xs text-slate-400 font-medium">Verified Info</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-sky-300">Fast</span>
                  <span className="text-xs text-slate-400 font-medium">Response</span>
                </div>
              </div>
            </div>

            {/* Optional Hero Banner Image from Admin Settings */}
            {data?.settings?.hero?.heroImage && (
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 max-w-md w-full">
                  <img
                    src={data.settings.hero.heroImage}
                    alt="MNX Digital Hero"
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (SIMPLE & PROFESSIONAL) */}
      <section className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Specialized Solutions for Every Need
            </h2>
          </div>
          <button
            onClick={() => handleNavigate('services')}
            className="text-sm font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All {data?.services?.length || 8} Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Crisp, Bold Dynamic Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => {
            const IconComponent = getDepartmentIcon(service.departmentCode);
            return (
              <div 
                key={service.id || service.departmentCode}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-500 hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-sky-600 uppercase tracking-wider block mb-1">
                      Dept {service.departmentCode}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.tagline || service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleConsult(service.title)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LATEST OFFICIAL BULLETINS */}
      <section className="bg-slate-50 border-y border-slate-200 py-18 sm:py-22">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">
                Educational Information Centre
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Academic Updates & Advisories
              </h2>
            </div>
            <button
              onClick={() => handleNavigate('education')}
              className="text-xs sm:text-sm font-bold text-slate-800 hover:text-sky-600 inline-flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>All Bulletins</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-sky-600 uppercase tracking-wider text-[10px] bg-sky-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{article.publishDate}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                  <span className="text-sky-600 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE DIRECT CONSULTATION CTA */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div 
            aria-hidden="true" 
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                Direct Executive Desk
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to Resolve an Admission or Digital Project?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect with MNX DIGITAL TEAM SOLUTIONS today. Submit your enquiry for an automated tracking reference code and fast review from our team.
              </p>

              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Official Founder & Management:</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{data?.founder?.name || 'Isaiah (MNX DIGITAL TEAM SOLUTIONS)'}</span>
                  <VerifiedBadge size="sm" />
                </span>
                <GoogleVerifiedBusinessCard 
                  compact 
                  businessName={data?.founder?.googleBusinessName || "Menmex Digital team solution Network"}
                  category={data?.founder?.googleBusinessCategory || "Educational consultant"}
                  verificationText={data?.founder?.googleVerificationText || "You manage this Business Profile"}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsult()}
                className="px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-lg transition-all shadow-md text-center cursor-pointer"
              >
                Submit Enquiry
              </button>

              <button
                onClick={() => handleNavigate('contact')}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm rounded-lg transition-all text-center cursor-pointer"
              >
                Contact Details
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
