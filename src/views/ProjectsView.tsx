import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ExternalLink, 
  Code, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { data, setActiveTab, setSelectedServiceForEnquiry } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Educational Technology & Software', 'School Management Solutions', 'Real Estate & Housing Platforms', 'Commercial Business Applications'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return data.projects;
    return data.projects.filter(p => p.category === selectedCategory);
  }, [data.projects, selectedCategory]);

  const handleCommissionProject = () => {
    setSelectedServiceForEnquiry('Website Development');
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Digital Engineering & Platforms
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Projects & Portfolio
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore selected digital platforms, examination engines, school management suites, and commercial applications engineered or managed by MNX DIGITAL TEAM SOLUTIONS.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Image Frame or Tech Platform Banner */}
                <div className="h-56 sm:h-64 overflow-hidden relative bg-slate-900 border-b border-slate-200 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B1B3D] via-[#0F224D] to-[#162D63] p-6 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                          {project.category}
                        </span>
                        <Code className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-base sm:text-lg font-bold text-white block">
                          {project.title}
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-xs text-xs font-mono text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/30">
                    {project.status}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                      {project.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Metric Box */}
                  {project.impactMetric && (
                    <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
                      <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Verified Impact:</span>
                        <span className="text-slate-700">{project.impactMetric}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Technologies & Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500 font-mono">
                  Managed by MNX DIGITAL TEAM SOLUTIONS
                </span>

                {project.externalUrl ? (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic">Internal Deployment</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commission Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block">
              Custom Engineering & Architecture
            </span>
            <h3 className="text-xl font-bold text-white">
              Do You Require a Custom Web Platform or School Portal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We design and engineer bespoke web platforms, CBT examination engines, school portals, and digital marketplaces tailored specifically to your organizational workflow.
            </p>
          </div>

          <button
            onClick={handleCommissionProject}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-md transition-colors cursor-pointer shrink-0"
          >
            Commission a Platform
          </button>
        </div>
      </section>

    </div>
  );
};
