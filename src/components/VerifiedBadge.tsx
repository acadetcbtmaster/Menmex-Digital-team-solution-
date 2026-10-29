import React, { useState } from 'react';
import { Info, Check, ShieldCheck, ExternalLink, X, Building, Phone, Globe } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  label?: string;
  className?: string;
  tooltip?: string;
}

/**
 * Authentic Blue Tick Verification Mark for Founder & Creator Profile
 * Standard Twitter/Google Business 12-scalloped rosette badge.
 */
export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'md',
  showLabel = false,
  label = 'Verified Creator & Founder',
  className = '',
  tooltip = 'Verified Creator & Official Founder of MNX DIGITAL TEAM SOLUTIONS'
}) => {
  // Dimensions for the blue tick mark
  const sizeMap = {
    xs: { badge: 'w-3.5 h-3.5', check: 'w-2 h-2', text: 'text-[10px]' },
    sm: { badge: 'w-4 h-4', check: 'w-2.5 h-2.5', text: 'text-[11px]' },
    md: { badge: 'w-5 h-5', check: 'w-3 h-3', text: 'text-xs' },
    lg: { badge: 'w-6 h-6', check: 'w-3.5 h-3.5', text: 'text-sm' },
    xl: { badge: 'w-7 h-7', check: 'w-4 h-4', text: 'text-base' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const badgeIcon = (
    <span
      title={tooltip}
      className={`inline-flex items-center justify-center shrink-0 rounded-full select-none cursor-default ${currentSize.badge} ${className}`}
      style={{ filter: 'drop-shadow(0 1px 2px rgba(26, 115, 232, 0.45))' }}
      aria-label="Verified Creator Blue Tick"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Authentic 12-scalloped verified rosette background */}
        <path
          d="M22.5 12c0-.98-.38-1.92-1.05-2.61.2-.55.3-1.14.3-1.74 0-2.8-2.2-5-5-5-.6 0-1.19.1-1.74.3C14.32 2.28 13.38 1.9 12.4 1.9s-1.92.38-2.61 1.05c-.55-.2-1.14-.3-1.74-.3-2.8 0-5 2.2-5 5 0 .6.1 1.19.3 1.74C2.68 10.08 2.3 11.02 2.3 12s.38 1.92 1.05 2.61c-.2.55-.3 1.14-.3 1.74 0 2.8 2.2 5 5 5 .6 0 1.19-.1 1.74-.3.69.67 1.63 1.05 2.61 1.05s1.92-.38 2.61-1.05c.55.2 1.14.3 1.74.3 2.8 0 5-2.2 5-5 0-.6-.1-1.19-.3-1.74.67-.69 1.05-1.63 1.05-2.61z"
          fill="#1A73E8"
        />
        {/* Crisp white checkmark */}
        <path
          d="M10.2 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );

  if (!showLabel) {
    return badgeIcon;
  }

  return (
    <span 
      title={tooltip}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-semibold ${currentSize.text} shadow-xs select-none hover:bg-sky-500/15 transition-colors`}
    >
      {badgeIcon}
      <span className="tracking-tight">{label}</span>
    </span>
  );
};

interface GoogleVerifiedBadgeProps {
  businessName?: string;
  category?: string;
  verificationText?: string;
  showModalOnClick?: boolean;
  className?: string;
  compact?: boolean;
}

/**
 * Exact Google Business Profile Verified Badge matching the user's Google Search & Business Profile
 * "✓ You manage this Business Profile"
 */
export const GoogleVerifiedBusinessCard: React.FC<GoogleVerifiedBadgeProps> = ({
  businessName = 'Menmex Digital team solution Network',
  category = 'Educational consultant',
  verificationText = 'You manage this Business Profile',
  showModalOnClick = true,
  className = '',
  compact = false
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        onClick={() => showModalOnClick && setShowModal(true)}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 hover:border-sky-400/60 text-white transition-all cursor-pointer shadow-xs ${className}`}
        title="Click to view official Google Business Profile verification record"
      >
        {/* Google Blue Rosette Tick */}
        <VerifiedBadge size={compact ? "sm" : "md"} />
        
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold text-sky-100 ${compact ? 'text-xs' : 'text-xs sm:text-sm'} tracking-tight`}>
              {verificationText}
            </span>
            <Info className="w-3.5 h-3.5 text-sky-400 opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>
          {!compact && (
            <span className="text-[10px] text-sky-300/80 font-normal">
              {businessName} · {category}
            </span>
          )}
        </div>
      </div>

      {/* Verification Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-[#0B1B3D] text-white w-full max-w-lg rounded-2xl border border-sky-500/40 shadow-2xl overflow-hidden p-6 relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-400/40">
                  <VerifiedBadge size="lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Verified Business Profile</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-sky-300">Google Search & Business Profile Verification</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Highlight Card */}
            <div className="p-4 rounded-xl bg-[#07101E] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Recognized Entity</span>
                  <span className="text-base font-bold text-white">{businessName}</span>
                </div>
                <VerifiedBadge size="lg" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-400 text-[11px] block">Category</span>
                  <span className="text-sky-300 font-medium">{category}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Status</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Managed & Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-sky-950/40 border border-sky-500/20">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Official Creator & Founder Ownership</strong>
                  This digital profile and domain (<span className="text-sky-300 font-mono">menmexdigital.site</span>) are registered and actively managed by <strong>Isaiah</strong>, founder of <strong>Menmex Digital Solution team network</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800">
                <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Search & Maps Visibility</strong>
                  Listed under Google Search as <span className="text-sky-300 font-medium">Menmex Digital Solution team network</span> and Google Business Network as <span className="text-sky-300 font-medium">Menmex Digital team solution Network</span>.
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href="https://wa.me/2347053157243"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Direct Desk (07053157243)
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
