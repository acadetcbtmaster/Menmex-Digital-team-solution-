import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Search, 
  CheckCircle2, 
  Info, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  MessageCircle, 
  GraduationCap,
  Filter,
  Sparkles
} from 'lucide-react';

export const EducationView: React.FC = () => {
  const { data, setSelectedArticle, setSelectedServiceForEnquiry, setActiveTab } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);

  const categories = [
    'All',
    'JAMB Updates',
    'University Admissions',
    'Polytechnic Admissions',
    'Post-UTME and Screening',
    'Admission Requirements',
    'Registration Guidelines',
    'Scholarships and Opportunities',
    'Academic Announcements',
    'Educational News'
  ];

  const filteredArticles = useMemo(() => {
    return data.articles.filter((art) => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchOfficial = !onlyOfficial || art.isOfficialAnnouncement;
      const query = searchFilter.toLowerCase().trim();
      const matchQuery = 
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.content.toLowerCase().includes(query) ||
        art.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchOfficial && matchQuery;
    });
  }, [data.articles, selectedCategory, searchFilter, onlyOfficial]);

  const handleShareWhatsApp = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `*${title}*\n\nRead official update from MNX Educational Information Centre:\n${window.location.origin}#education`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleRequestAssistance = () => {
    setSelectedServiceForEnquiry('JAMB and Admission Assistance');
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-sm border border-sky-400/20">
              <GraduationCap className="w-4 h-4" />
              <span>DEPARTMENT B · EDUCATIONAL INFORMATION CENTRE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Educational Information & Admission Updates
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              A dedicated educational portal delivering verified statutory admission announcements, Post-UTME screening schedules, O'Level guidelines, and scholarship alerts. All publications prioritize accuracy and direct regulatory sourcing.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-sky-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Verified Official Sourcing</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Info className="w-4 h-4 text-slate-400" />
                <span>General Academic Guidance Distinguished</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search publications (e.g., JAMB 2026, UNILAG Post-UTME, O'Level upload, Scholarships)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Official Announcement Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pt-1 md:pt-0">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyOfficial}
                  onChange={(e) => setOnlyOfficial(e.target.checked)}
                  className="rounded text-sky-500 focus:ring-sky-500 w-4 h-4 border-slate-300"
                />
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Verified Official Announcements Only</span>
                </span>
              </label>
            </div>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0B1B3D] text-sky-300 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Publications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            Showing {filteredArticles.length} publication{filteredArticles.length === 1 ? '' : 's'}
          </span>
          <button
            onClick={handleRequestAssistance}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Need personalized admission guidance?</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
            <Info className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching educational publications found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keywords or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchFilter('');
                setOnlyOfficial(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Featured Thumbnail */}
                  {article.featuredImage && (
                    <div className="h-48 overflow-hidden relative bg-slate-900">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#0B1B3D]/90 backdrop-blur-xs text-sky-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {article.category}
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    {/* Unboxed Metadata */}
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

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Sourcing Badge */}
                    <div className="pt-1 text-[11px]">
                      {article.isOfficialAnnouncement ? (
                        <div className="flex items-start gap-1.5 text-sky-800 bg-sky-50 p-2 rounded border border-sky-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                          <div className="leading-tight">
                            <span className="font-semibold block">Official Announcement</span>
                            <span className="text-[10px] text-slate-600 truncate block mt-0.5">
                              Src: {article.officialSource}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/60">
                          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-[10px]">Educational Guidance & Advisory</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <button
                    onClick={(e) => handleShareWhatsApp(e, article.title)}
                    className="text-slate-500 hover:text-emerald-600 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Share</span>
                  </button>

                  <span className="text-sky-700 font-semibold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Advisory Assistance Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1B3D] rounded-xl text-white p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-sky-400 text-xs font-semibold uppercase tracking-wider block">
              Direct Application & Verification Support
            </span>
            <h3 className="text-xl font-bold text-white">
              Stuck on Your O'Level Upload, Profile Code, or Screening Portal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit your enquiry to the MNX DIGITAL TEAM SOLUTIONS Educational Assistance Desk for direct, accredited procedural assistance.
            </p>
          </div>

          <button
            onClick={handleRequestAssistance}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white shadow-xs font-semibold text-xs rounded-md transition-colors cursor-pointer shrink-0"
          >
            Request Admission Support
          </button>
        </div>
      </section>

    </div>
  );
};
