import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ExternalLink, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { setActiveTab, setSelectedServiceForEnquiry } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const officialPortals = [
    {
      title: "JAMB e-Facility & CAPS Portal",
      authority: "Joint Admissions and Matriculation Board",
      url: "https://portal.jamb.gov.ng/efacility",
      description: "Direct portal for admission letter printing, checking admission status, and accessing CAPS (Central Admissions Processing System)."
    },
    {
      title: "JAMB IBASS (Interactive e-Brochure & Syllabus)",
      authority: "JAMB Academic Directorate",
      url: "https://ibass.jamb.gov.ng",
      description: "Official statutory database for verifying approved O'Level and UTME subject combinations across all Nigerian universities, polytechnics, and colleges."
    },
    {
      title: "Federal Scholarship Board (FSB) Portal",
      authority: "Federal Ministry of Education",
      url: "https://education.gov.ng/fsb",
      description: "Official portal for Bilateral Education Agreement (BEA) overseas awards and Nigerian Federal Government undergraduate scholarships."
    },
    {
      title: "National Universities Commission (NUC)",
      authority: "Federal Regulatory Agency",
      url: "https://nuc.edu.ng",
      description: "Accredited federal, state, and private universities directory and approved degree programme accreditation status."
    },
    {
      title: "National Board for Technical Education (NBTE)",
      authority: "Technical & Vocational Education Board",
      url: "https://nbte.gov.ng",
      description: "Regulatory registry for accredited federal, state, and private polytechnics offering National Diploma (ND) and Higher National Diploma (HND)."
    },
    {
      title: "WAEC / NECO Result Verification Service",
      authority: "Examination Councils of Nigeria",
      url: "https://verify.waeconline.org.ng",
      description: "Official verification gateways for confirmation of secondary school certificate results and direct pin services."
    }
  ];

  const faqs = [
    {
      q: "Why is my JAMB CAPS showing 'Not Admitted' even though I scored above the departmental cut-off?",
      a: "Admission is processed in batches (Merit, Catchment, ELDS). Reasons may include: pending O'Level upload verification, subject combination mismatch on JAMB IBASS, quota exhaustion for the first choice course, or institutional delay in transmitting candidate rosters to the JAMB central server. MNX DIGITAL TEAM SOLUTIONS can verify your CAPS status."
    },
    {
      q: "Can I upload my O'Level results to JAMB CAPS by myself using a smartphone?",
      a: "No. JAMB regulations strictly prohibit uploading O'Level certificates or awaiting results via personal smartphones or general cybercafes. Uploads must be authenticated through an accredited JAMB CBT centre via their private intranet credentials."
    },
    {
      q: "What is the difference between an Official Announcement and General Guidance on MNX?",
      a: "Official announcements are statutory directives issued directly by authorities like JAMB, UNILAG, or Federal Ministries, verified and linked directly to the regulatory source. General guidance represents analytical advisory, step-by-step walkthroughs, and recommendations authored by MNX consultants to help applicants navigate complex processes."
    },
    {
      q: "How does the MNX DIGITAL TEAM SOLUTIONS Consultancy Enquiry System work?",
      a: "When you submit a request through our website, our system automatically routes your request to our central admin panel, sends an email alert to our team, and sends an automated WhatsApp message to our desk without you or us needing to manually open WhatsApp! You also receive a unique tracking reference code."
    },
    {
      q: "What types of websites and software does MNX DIGITAL TEAM SOLUTIONS develop?",
      a: "MNX builds high-performance corporate business websites, school portals, CBT examination platforms, e-commerce marketplaces, property directories, and customized workflow automation systems using modern, secure frameworks."
    }
  ];

  const handleDownloadChecklist = (title: string) => {
    // Generate text/markdown file for the user to save
    const content = `# MNX DIGITAL TEAM SOLUTIONS - OFFICIAL CHECKLIST\n\nTitle: ${title}\nPublished by: MNX Educational Advisory\nDate: 2026\nOfficial Website: MNX DIGITAL TEAM SOLUTIONS\n\n1. Ensure NIN is correctly linked to your active mobile telephone line.\n2. Confirm exact UTME subject combinations via JAMB IBASS.\n3. Always upload verified O'Level grades at an accredited CBT centre.\n4. Monitor JAMB CAPS regularly on desktop view.\n\nNeed assistance? Reach MNX Consultancy Desk.`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Central Knowledge Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Resources, Official Portals & Guides
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Curated statutory portals, accredited verification registries, step-by-step candidate checklists, and verified answers to frequently asked admission and digital questions.
            </p>
          </div>
        </div>
      </section>

      {/* Official Statutory Portals Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
            Accredited Institutional Gateways
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Official Regulatory Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Direct statutory websites for candidate verification, syllabus cross-referencing, and accreditation lookups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officialPortals.map((portal, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {portal.authority}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {portal.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {portal.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Downloadable Candidate Checklists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-xl p-8 sm:p-10 border border-slate-200">
          <div className="max-w-2xl mb-8 space-y-1">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
              Step-by-Step Educational Checklists
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Actionable Process Guides & Documents
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Download summary instructions curated by the MNX DIGITAL TEAM SOLUTIONS Educational Advisory Desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">2026 UTME Profile Code Generation Checklist</h4>
                <p className="text-xs text-slate-500">
                  Step-by-step checklist on SMS syntax, NIN linking, and resolving return errors.
                </p>
              </div>
              <button
                onClick={() => handleDownloadChecklist('2026 UTME Profile Code Generation Checklist')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Checklist Guide</span>
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Post-UTME Aggregate Calculation Guide</h4>
                <p className="text-xs text-slate-500">
                  Standard mathematical aggregate formulas for Federal universities (50:30:20 & 50:50).
                </p>
              </div>
              <button
                onClick={() => handleDownloadChecklist('Post-UTME Aggregate Calculation Guide')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Aggregate Formula</span>
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">JAMB CAPS O'Level Upload Verification Protocol</h4>
                <p className="text-xs text-slate-500">
                  Visual verification checklist to confirm whether WAEC or NECO results are loaded on CAPS.
                </p>
              </div>
              <button
                onClick={() => handleDownloadChecklist('JAMB CAPS OLevel Upload Verification Protocol')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Upload Checklist</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Common Inquiries Answered
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, practical answers to recurrent admission, registration, and consultancy questions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6 text-center">
            <p className="text-xs text-slate-500 mb-3">
              Don't see your specific question addressed here?
            </p>
            <button
              onClick={() => {
                setActiveTab('consultancy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Submit a Direct Inquiry to Our Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
