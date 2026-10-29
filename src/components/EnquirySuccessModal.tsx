import React from 'react';
import { CheckCircle, Copy, MessageCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface EnquirySuccessModalProps {
  referenceNumber: string;
  fullName: string;
  serviceCategory: string;
  whatsappNumber: string;
  onClose: () => void;
}

export const EnquirySuccessModal: React.FC<EnquirySuccessModalProps> = ({
  referenceNumber,
  fullName,
  serviceCategory,
  onClose
}) => {
  const { data } = useApp();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const rawNum = data?.settings?.contactDetails?.whatsapp || '07053157243';
    const cleanNum = rawNum.replace(/^0/, '234').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Menmex Digital Solution team network,\n\nMy name is ${fullName}. I just submitted an online request regarding *${serviceCategory}*.\n\nMy Reference Number is: *${referenceNumber}*.\n\nPlease advise on next steps.`
    );
    window.open(`https://wa.me/${cleanNum}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-w-[calc(100vw-1rem)] sm:max-w-md overflow-hidden border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0B1B3D] text-white p-6 text-center border-b border-slate-800">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Request Automatically Dispatched
          </h2>
          <p className="text-xs text-emerald-300 mt-1 font-medium">
            Multi-channel notification sent: Admin Panel, Email & WhatsApp
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Your Official Reference Number
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-mono font-bold text-[#0B1B3D] tracking-wider">
                {referenceNumber}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Copy reference number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                Reference copied to clipboard!
              </span>
            )}
          </div>

          {/* Automated Multi-Channel Dispatch Badges */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 space-y-2 text-xs">
            <span className="font-bold text-emerald-950 text-[11px] uppercase tracking-wider block">
              Automated Website Dispatch Status:
            </span>
            <div className="flex items-center gap-2 text-emerald-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Admin Panel: Instant request logged & active</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Email: Direct alert sent to executive inbox</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>WhatsApp: Automated notification sent without opening app</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <p>
              • Your request has been automatically sent directly from the website.
            </p>
            <p>
              • The <strong>{serviceCategory}</strong> team has received real-time alerts and will contact you via WhatsApp or Email.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Direct on WhatsApp (Optional)</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Back to MNX Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
