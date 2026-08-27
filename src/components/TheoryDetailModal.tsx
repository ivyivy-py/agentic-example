import React from 'react';
import { THEORY_ITEMS } from '../data/theoryData';

interface TheoryDetailModalProps {
  theoryId: number | null;
  onClose: () => void;
}

export const TheoryDetailModal: React.FC<TheoryDetailModalProps> = ({ theoryId, onClose }) => {
  if (theoryId === null) return null;

  const item = THEORY_ITEMS[theoryId];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#e7bdb8]/60 relative space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] flex items-center justify-center transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header Badge & Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#005fa6] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
            {item.id}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#005fa6] bg-[#005fa6]/10 px-2.5 py-0.5 rounded-md">
              Design Principle #{item.id}
            </span>
            <h3 className="text-2xl font-bold text-[#191c1e] mt-1">{item.title}</h3>
            <p className="text-sm font-medium text-[#5f5e5e]">{item.subtitle}</p>
          </div>
        </div>

        {/* Theoretical Definition Quote */}
        <div className="bg-[#f8f9fb] p-4 rounded-xl border-l-4 border-[#005fa6] space-y-2">
          <p className="text-xs font-bold text-[#005fa6] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">format_quote</span>
            Theoretical Definition
          </p>
          <p className="text-xs italic text-[#191c1e] leading-relaxed">
            "{item.normanConcept}"
          </p>
        </div>

        {/* Implementation in this HDB Calculator App */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005fa6] text-base">
              devices
            </span>
            Application Context: {item.uiContext}
          </h4>

          <div className="bg-[#eceef0]/60 p-4 rounded-xl border border-[#e2dfde] space-y-2">
            <p className="text-xs text-[#191c1e] font-medium leading-relaxed">
              {item.exampleInApp}
            </p>
          </div>
        </div>

        {/* Design Guideline Takeaway */}
        <div className="bg-[#ffe165]/30 p-4 rounded-xl border border-[#c7a900]/40 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#6f5d00] shrink-0 mt-0.5">
            lightbulb
          </span>
          <div>
            <span className="text-xs font-bold text-[#4b3f00] block mb-0.5">
              Persuasive UX Rule
            </span>
            <p className="text-xs text-[#191c1e] leading-relaxed">{item.guideline}</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#005fa6] hover:bg-[#0079cf] text-white text-sm font-bold rounded-xl shadow-sm transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
