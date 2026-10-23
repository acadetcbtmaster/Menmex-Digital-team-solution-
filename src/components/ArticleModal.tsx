import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  X, 
  ExternalLink, 
  Share2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Info, 
  User, 
  Tag, 
  MessageCircle 
} from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, setActiveTab, setSelectedServiceForEnquiry } = useApp();

  if (!selectedArticle) return null;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${selectedArticle.title}*\n\nRead official details from MNX Educational Information Centre:\n${window.location.origin}#education`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleRequestAssistance = () => {
    setSelectedServiceForEnquiry('JAMB and Admission Assistance');
    setSelectedArticle(null);
    setActiveTab('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 text-slate-800 my-auto sm:my-8 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-semibold text-xs tracking-wider uppercase">
              {selectedArticle.category}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300">MNX Information Centre</span>
          </div>
          <button
            onClick={() => setSelectedArticle(null)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* Official Verification Notice */}
          <div className={`p-4 rounded-lg mb-6 border flex items-start gap-3 ${
            selectedArticle.isOfficialAnnouncement 
              ? 'bg-sky-50 border-sky-200 text-sky-950' 
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            {selectedArticle.isOfficialAnnouncement ? (
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <span className="font-semibold block text-slate-900">
                {selectedArticle.isOfficialAnnouncement 
                  ? 'Verified Official Institutional Announcement' 
                  : 'General Educational Process Guidance & Advisory'}
              </span>
              <p className="mt-0.5 text-slate-600">
                Primary Reference: <span className="font-medium text-slate-900">{selectedArticle.officialSource}</span>
              </p>
              {selectedArticle.officialSourceUrl && (
                <a
                  href={selectedArticle.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-sky-700 hover:text-sky-800 font-semibold hover:underline"
                >
                  <span>Verify at Official Statutory Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>

          {/* Unboxed Metadata without pills */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-500 my-4 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedArticle.author}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedArticle.publishDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedArticle.readTime}</span>
            </span>
          </div>

          {/* Featured Image if exists */}
          {selectedArticle.featuredImage && (
            <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={selectedArticle.featuredImage}
                alt={selectedArticle.title}
                className="w-full h-56 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Body Content with formatted paragraphs */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
            {selectedArticle.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(l => l.trim().length > 0);
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5 my-2 text-slate-700 text-sm">
                    {listItems.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ 
                        __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p 
                  key={index} 
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }} 
                />
              );
            })}
          </div>

          {/* Tags */}
          {selectedArticle.tags && selectedArticle.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-700">Keywords:</span>
              {selectedArticle.tags.map((tag, i) => (
                <span key={i} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Share via WhatsApp</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard.');
              }}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          </div>

          <button
            onClick={handleRequestAssistance}
            className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors cursor-pointer"
          >
            Get Help With This Admission / Application
          </button>
        </div>
      </div>
    </div>
  );
};
