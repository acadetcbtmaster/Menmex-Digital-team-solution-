import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  GraduationCap, 
  FileCheck, 
  Code, 
  Share2, 
  TrendingUp, 
  Cpu, 
  Briefcase,
  Users
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { data, setActiveTab, setSelectedServiceForEnquiry } = useApp();

  const handleEnquireService = (categoryName: string) => {
    setSelectedServiceForEnquiry(categoryName);
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'HelpCircle': return <HelpCircle className="w-6 h-6 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
      case 'Code': return <Code className="w-6 h-6 text-amber-500" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-500" />;
      default: return <HelpCircle className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Capabilities & Departmental Scopes
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Services & Business Departments
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              MNX DIGITAL TEAM SOLUTIONS delivers a versatile spectrum of technology and consultancy services organized across eight dedicated departments. Each department is structured to provide practical, reliable, and verified outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {data.services.map((service, index) => (
            <div 
              key={service.id}
              id={`dept-${service.departmentCode.toLowerCase()}`}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 hover:border-amber-400 transition-all shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Department Info */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-600 block">
                        Department {service.departmentCode}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 leading-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-amber-700 italic">
                    "{service.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Target Clients */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Primary Beneficiaries:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.targetClients.map((client, idx) => (
                        <span key={idx} className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleEnquireService(service.categoryName)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Request This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Service Deliverables Checklist */}
                <div className="lg:col-span-7 bg-slate-50 rounded-lg p-6 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Scope of Deliverables & Assistance:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Direct Consultancy Available</span>
                    <span className="font-mono text-emerald-600 font-semibold">Active & Servicing</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-100 rounded-xl p-8 border border-slate-200 max-w-3xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            Need a Custom Combination of Services?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            We frequently structure integrated solutions — such as building a school website coupled with social media channel management and CBT examination software.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('consultancy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors cursor-pointer"
            >
              Open Unified Consultancy Form
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
