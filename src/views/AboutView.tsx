import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  CheckCircle2, 
  Award, 
  Users, 
  MessageCircle, 
  ArrowRight,
  ExternalLink,
  Code,
  GraduationCap,
  Sparkles,
  Share2
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { data, setActiveTab, setSelectedServiceForEnquiry } = useApp();

  const handleConsultFounder = () => {
    setSelectedServiceForEnquiry('Online Consultancy');
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coreObjectives = [
    "Provide accessible and reliable educational information.",
    "Simplify online registration and application processes.",
    "Deliver professional digital consultancy services.",
    "Support businesses with digital transformation.",
    "Develop functional and modern websites and online platforms.",
    "Help individuals and organisations establish a stronger digital presence.",
    "Provide timely updates, announcements and relevant information.",
    "Promote digital awareness, knowledge and opportunities."
  ];

  const targetAudiences = [
    { title: "Students & Prospective Applicants", desc: "Candidates preparing for UTME, Direct Entry, Post-UTME, and overseas scholarships requiring verified admission guidance." },
    { title: "Educational Institutions & Academies", desc: "Secondary schools and tutorial hubs requiring CBT platforms, school management portals, and admissions communication." },
    { title: "Entrepreneurs & Business Owners", desc: "Founders seeking to build professional web presence, automate online sales, and configure digital payment channels." },
    { title: "Startups & Growing Businesses", desc: "Companies transitioning to modern digital infrastructure, online customer service, and cloud platforms." },
    { title: "Content Creators & Influencers", desc: "Personal brands requiring structured social channel management, content scheduling, and community engagement." },
    { title: "Individuals Seeking Digital Guidance", desc: "Anyone navigating technical account recovery, portal submissions, or complex internet services." }
  ];

  return (
    <div className="space-y-16 py-12">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
              Corporate Overview & Identity
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About MNX DIGITAL TEAM SOLUTIONS
            </h1>
            <p className="text-sky-300/90 text-sm sm:text-base font-medium italic">
              "{data.settings.brandSlogan}"
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              MNX DIGITAL TEAM SOLUTIONS is a multi-service digital solutions, online consultancy, and information brand operating at the intersection of technology, education, information dissemination, and business development.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Strategic Destination</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Vision Statement</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "To become a recognised and trusted digital solutions and information brand, empowering individuals and businesses through technology, accessible information, professional services and innovation."
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0B1B3D]">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Purpose & Execution</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Mission Statement</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              "To simplify digital processes, provide accessible and reliable information, deliver practical technology solutions and support individuals and organisations in achieving their educational, professional and business objectives."
            </p>
          </div>

        </div>
      </section>

      {/* 3. Core Objectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
              Strategic Blueprint
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Core Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              The foundational targets guiding our day-to-day operations and advisory services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {coreObjectives.map((obj, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
              >
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEDICATED PROFESSIONAL FOUNDER PROFILE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl border border-slate-800 shadow-2xl p-8 sm:p-12 overflow-hidden">
          
          <div className="border-b border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-sky-400 text-xs font-semibold uppercase tracking-wider block">
                Executive Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Founder Profile: {data.founder.name}
              </h2>
              <p className="text-sky-300 text-xs font-medium mt-0.5">
                {data.founder.title}
              </p>
            </div>

            <button
              onClick={handleConsultFounder}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white shadow-xs font-semibold text-xs rounded-md transition-all self-start sm:self-auto cursor-pointer"
            >
              Consult With Isaiah
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Founder Image & Official Handles */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative mx-auto max-w-xs">
                {data?.founder?.founderImage ? (
                  <img
                    src={data.founder.founderImage}
                    alt={data?.founder?.name || 'Isaiah (MNX DIGITAL TEAM SOLUTIONS)'}
                    className="w-full aspect-square rounded-xl object-cover border-2 border-sky-400/50 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#0F224D] via-[#0B1B3D] to-[#07101E] border-2 border-sky-400/50 shadow-2xl flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-sky-500/10 border-2 border-sky-400/60 flex items-center justify-center text-sky-400 text-3xl font-black tracking-tight shadow-inner">
                      IM
                    </div>
                    <div>
                      <span className="font-bold text-white text-base block">{data.founder.name}</span>
                      <span className="text-xs text-sky-300 font-medium block mt-0.5">{data.founder.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700/80 font-mono">
                      ✓ Executive Profile
                    </span>
                  </div>
                )}
                <div className="mt-3 text-center">
                  <span className="text-xs font-bold text-white block">{data.founder.name}</span>
                  <span className="text-[11px] text-slate-400 block">{data.founder.title}</span>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="bg-[#07101E] rounded-lg p-4 border border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                  Connect Directly
                </span>
                <div className="space-y-2 text-xs">
                  <a
                    href={data.founder.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp (07053157243)</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={data.founder.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Facebook (@menmex)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={data.founder.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>YouTube (@menmex001)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={data.founder.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>TikTok (@menmex01)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Founder Biography & Experience */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                  Biography & Leadership Vision
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.founder.fullBiography}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                  Professional Background
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.founder.professionalBackground}
                </p>
              </div>

              {/* Areas of Expertise Checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                  Key Areas of Practical Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {data.founder.areasOfExpertise.map((area, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Projects under Isaiah's leadership */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Selected Initiatives & Platforms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded bg-[#07101E] border border-slate-800">
                    <span className="font-bold text-white block">MNX EduPortal & CBT Platform</span>
                    <span className="text-slate-400 text-[11px] mt-0.5 block">High-concurrency online examination and screening portal.</span>
                  </div>
                  <div className="p-3 rounded bg-[#07101E] border border-slate-800">
                    <span className="font-bold text-white block">Educational Verification Advisory</span>
                    <span className="text-slate-400 text-[11px] mt-0.5 block">Nationwide guidance on JAMB CAPS, Post-UTME, and O'Level verification.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Target Audience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
            Who We Serve
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Target Audience & Client Communities
          </h2>
          <p className="text-sm text-slate-600">
            Tailored digital frameworks addressing the distinct requirements of each audience segment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudiences.map((aud, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 space-y-2 hover:border-sky-400 transition-colors">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-slate-900">{aud.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {aud.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Core Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-xl p-8 sm:p-10 border border-slate-200">
          <div className="max-w-2xl mb-8 space-y-1">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider block">
              Ethical Standards
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              6 Core Brand Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Upholding excellence, transparency, and dependable execution in every digital encounter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">1. Professionalism</span>
              <p className="text-xs text-slate-600 mt-1">Maintaining professional standards in service delivery.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">2. Integrity</span>
              <p className="text-xs text-slate-600 mt-1">Promoting honesty, transparency and responsible communication.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">3. Reliability</span>
              <p className="text-xs text-slate-600 mt-1">Providing dependable information and services.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">4. Innovation</span>
              <p className="text-xs text-slate-600 mt-1">Embracing technology and improved digital processes.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">5. Accessibility</span>
              <p className="text-xs text-slate-600 mt-1">Making digital services and information easier to access.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 text-sm block">6. Excellence</span>
              <p className="text-xs text-slate-600 mt-1">Maintaining quality in every area of operation.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
