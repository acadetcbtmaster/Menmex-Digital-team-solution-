import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Code, 
  HelpCircle, 
  TrendingUp, 
  Share2, 
  Cpu, 
  FileCheck, 
  Briefcase, 
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Calendar,
  Clock
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { data, setActiveTab, setSelectedArticle, setSelectedServiceForEnquiry } = useApp();

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForEnquiry(serviceName);
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-500" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-amber-500" />;
      case 'Code': return <Code className="w-5 h-5 text-amber-500" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  const latestArticles = data.articles.slice(0, 3);
  const featuredProjects = data.projects.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1B3D] text-white overflow-hidden border-b border-slate-800 w-full">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-amber-400/20 max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{data?.settings?.hero?.badgeText || 'OFFICIAL DIGITAL SOLUTIONS & CONSULTANCY'}</span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight break-words">
                  {data?.settings?.hero?.headline || data?.settings?.brandName || 'MNX DIGITAL TEAM SOLUTIONS'}
                </h1>
                <p className="text-sm sm:text-lg lg:text-xl font-medium text-amber-300/90 leading-snug break-words">
                  {data?.settings?.hero?.subheadline || 'Your Trusted Partner in Digital Solutions, Online Consultancy and Educational Information.'}
                </p>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed max-w-2xl">
                {data?.settings?.hero?.description || 'We provide professional digital services, educational information, online consultancy, technology solutions and business support designed to simplify processes and create opportunities.'}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Contact MNX</span>
                </button>
              </div>

              {/* Slogan Marker */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
                <span className="text-amber-400 font-semibold tracking-wide uppercase text-[10px]">Brand Slogan</span>
                <span className="text-slate-600 hidden xs:inline">·</span>
                <span className="italic text-slate-300 text-[11px] sm:text-xs">"{data?.settings?.brandSlogan || 'Simplifying Digital Processes. Connecting People to Opportunities.'}"</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset or Interactive Command Hub */}
            <div className="lg:col-span-5 w-full">
              {data?.settings?.hero?.heroImage ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group w-full">
                  <img
                    src={data.settings.hero.heroImage}
                    alt={data?.settings?.hero?.headline || data?.settings?.brandName || 'MNX Digital Operations'}
                    className="w-full h-56 sm:h-80 md:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101E] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#07101E]/90 border border-slate-700 text-xs text-slate-300 backdrop-blur-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-400 text-[11px] sm:text-xs">{data?.settings?.brandName || 'MNX DIGITAL TEAM SOLUTIONS'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Verified Active</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Authentic Corporate Command Hub (Zero AI Slop) */
                <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-[#0F224D] via-[#0B1B3D] to-[#07101E] p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xs">
                        MNX
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white tracking-wide block">MNX DIGITAL TEAM SOLUTIONS</span>
                        <span className="text-[10px] text-amber-300 font-medium">Enterprise & Student Operations</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Systems</span>
                    </div>
                  </div>

                  {/* 3 Core Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Admissions Desk</span>
                      <span className="font-bold text-amber-400 text-xs sm:text-sm">100% Verified</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">JAMB & Tertiary Portals</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Departments</span>
                      <span className="font-bold text-amber-400 text-xs sm:text-sm">8 Divisions</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Consultancy & Tech</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Response Time</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm">Same-Day Desk</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">WhatsApp & Online Intake</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Engineering</span>
                      <span className="font-bold text-amber-400 text-xs sm:text-sm">Modern Web Apps</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">CBT & School Portals</span>
                    </div>
                  </div>

                  {/* Quick Action Prompt */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-300">
                      Need immediate assistance?
                    </div>
                    <button
                      onClick={() => {
                        setSelectedServiceForEnquiry('Online Consultancy');
                        setActiveTab('consultancy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-md font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 5-Question Clarity Strip */}
        <div className="bg-[#07101E] border-t border-slate-800/80 py-4 sm:py-6 px-3 sm:px-4 w-full">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 text-center">
            <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
              <span className="block text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">01. Who We Are</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Digital Solutions Brand</span>
            </div>
            <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
              <span className="block text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">02. What We Do</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Simplify Digital Workflows</span>
            </div>
            <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
              <span className="block text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">03. Our Services</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">8 Specialized Departments</span>
            </div>
            <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
              <span className="block text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">04. Education</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Verified Admissions Portal</span>
            </div>
            <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60 col-span-2 sm:col-span-1">
              <span className="block text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-wider">05. Engage Us</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Consultancy & Direct Desk</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT MNX DIGITAL TEAM SOLUTIONS SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                About MNX DIGITAL TEAM SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Bridging the Gap Between People and Digital Opportunities
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                MNX DIGITAL TEAM SOLUTIONS is a digital solutions, online consultancy and information service brand established to provide individuals, students, entrepreneurs and businesses with access to reliable digital services, educational information, professional guidance and technology-driven solutions.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                The brand operates across multiple digital service categories, combining online consultancy, educational support, digital marketing, website development, online registration assistance and information dissemination.
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Full Vision, Mission & Founder Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Our Strategic Mandate
              </h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Verified academic information dissemination.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Stress-free online application & registration processing.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Modern, high-performance web engineering.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Measurable digital marketing and social growth.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR 8 SERVICE DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Comprehensive Digital Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Business Departments & Service Categories
          </h2>
          <p className="text-sm text-slate-600">
            MNX DIGITAL TEAM SOLUTIONS delivers structured digital solutions categorized across eight dedicated business departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                    Dept {service.departmentCode}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B1B3D] transition-colors">
                    {service.categoryName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {service.tagline}
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">·</span>
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleSelectService(service.categoryName)}
                  className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Full details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>View All 8 Departments and Full Service Scopes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. LATEST EDUCATIONAL UPDATES */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                Educational Information Centre
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Latest Academic Updates & Announcements
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Timely, verified notifications covering JAMB, Post-UTME screening, scholarships, and admission procedures.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('education');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Explore All Publications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {article.featuredImage && (
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={article.featuredImage} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-[#0B1B3D]/90 backdrop-blur-xs text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {article.category}
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-2.5">
                    {/* Unboxed metadata with · separator */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{article.publishDate}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    {article.isOfficialAnnouncement ? (
                      <span className="text-amber-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                        Verified Official
                      </span>
                    ) : (
                      <span>General Guide</span>
                    )}
                  </div>
                  <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform font-semibold text-xs inline-flex items-center gap-1">
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
              Proven Digital Systems
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Featured Web & Software Platforms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Selected platforms engineered and operated by MNX DIGITAL TEAM SOLUTIONS across education, enterprise, and e-commerce.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-900 flex items-center justify-center">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B1B3D] to-[#122858] p-4 flex flex-col justify-between text-white border-b border-slate-700/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {project.category.split(' ')[0]} Platform
                        </span>
                        <Code className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white line-clamp-1 block">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-slate-300 font-mono block">
                          Built & Operated by MNX
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-slate-950/80 text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    {project.status}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                  {project.impactMetric && (
                    <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 font-medium">
                      Outcome: {project.impactMetric}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOUNDER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] rounded-xl text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                {data.founder.founderImage ? (
                  <img
                    src={data.founder.founderImage}
                    alt={data.founder.name}
                    className="w-48 h-48 sm:w-60 sm:h-60 rounded-xl object-cover border-2 border-amber-400/40 shadow-2xl mx-auto"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-xl bg-gradient-to-br from-[#0F224D] via-[#0B1B3D] to-[#07101E] border-2 border-amber-400/40 shadow-2xl flex flex-col items-center justify-center p-4 text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 text-2xl font-extrabold tracking-tight">
                      IM
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm block">{data?.founder?.name || 'Isaiah (MNX)'}</span>
                      <span className="text-[10px] text-amber-300 font-medium block">Lead Consultant & Founder</span>
                    </div>
                    <span className="text-[9px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      Verified Identity
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-3 -right-2 sm:-right-3 bg-amber-400 text-slate-950 px-3 py-1 rounded text-xs font-bold tracking-tight shadow-md">
                  Lead Consultant
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block">
                  Meet the Founder
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {data.founder.name}
                </h2>
                <p className="text-amber-300 text-xs font-medium mt-0.5">
                  {data.founder.title}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {data.founder.shortBio}
              </p>

              <p className="text-slate-400 text-xs leading-relaxed">
                Active leader in educational admissions dissemination, web application engineering, social media channel growth, and business digital transformation across Nigeria.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  View Founder Biography & Experience
                </button>

                <a
                  href={data.founder.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Connect With Isaiah</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE MNX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Our Operating Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Choose MNX DIGITAL TEAM SOLUTIONS?
          </h2>
          <p className="text-sm text-slate-600">
            Founded on strict corporate principles to deliver dependable outcomes without ambiguity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">01. Professionalism</div>
            <h3 className="text-base font-bold text-slate-900">High Standard Service Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every client inquiry and application workflow is treated with rigorous corporate discipline, systematic communication, and timeliness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">02. Integrity</div>
            <h3 className="text-base font-bold text-slate-900">Verified & Honest Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never promote unverified rumors or exploit student anxiety. Official statutory announcements are linked directly to accredited authorities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">03. Reliability</div>
            <h3 className="text-base font-bold text-slate-900">Dependable Digital Execution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether building a school CBT portal or processing urgent O'Level verification, MNX delivers prompt and reproducible results.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">04. Innovation</div>
            <h3 className="text-base font-bold text-slate-900">Modern Digital Systems</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We integrate high-speed web frameworks, automated enquiry references, and direct communication channels for effortless interaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">05. Accessibility</div>
            <h3 className="text-base font-bold text-slate-900">Demystified Processes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complex institutional protocols and software architectures are translated into simple, accessible steps that anyone can follow.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-2.5">
            <div className="text-amber-500 font-mono text-sm font-bold">06. Excellence</div>
            <h3 className="text-base font-bold text-slate-900">Quality Across Operations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous enhancement across our educational publications, web development deliverables, and client consultancy engagements.
            </p>
          </div>
        </div>
      </section>

      {/* 8. REQUEST A CONSULTATION CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B1B3D] to-[#07101E] rounded-xl text-white p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Direct Advisory Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Have an Admission Question or Digital Project?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit your enquiry to receive a unique reference tracking number and scheduled advisory review from our consultancy team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab('consultancy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
            >
              Open Consultancy Form
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md transition-colors cursor-pointer"
            >
              General Contact
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
