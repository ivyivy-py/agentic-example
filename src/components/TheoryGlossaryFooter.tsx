import React from 'react';

interface TheoryGlossaryFooterProps {
  onOpenTheoryModal: (id: number) => void;
}

export const TheoryGlossaryFooter: React.FC<TheoryGlossaryFooterProps> = ({ onOpenTheoryModal }) => {
  return (
    <div className="space-y-12">
      {/* Theory Outcomes Section */}
      <section className="pt-10 border-t border-[#e7bdb8]/50">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#005fa6]/10 text-[#005fa6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              Persuasive Design Principles
            </div>
            <h4 className="text-2xl font-bold text-[#191c1e] mb-3">The Outcomes</h4>
            <p className="text-sm text-[#5f5e5e] leading-relaxed">
              In persuasive design,{' '}
              <span className="text-[#005fa6] font-bold">discoverability</span> is the outcome of
              these six elements working together. It is not a separate member of the vocabulary,
              but the goal of excellent interface design.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div
              onClick={() => onOpenTheoryModal(3)}
              className="text-center p-3 rounded-xl bg-white border border-[#e2dfde] shadow-2xs hover:border-[#005fa6] hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#005fa6] mb-1 group-hover:scale-110 transition-transform">
                touch_app
              </span>
              <p className="text-[#005fa6] font-bold text-xs group-hover:underline">Physical</p>
              <p className="text-[#5f5e5e] text-[11px]">Constraints</p>
            </div>

            <div
              onClick={() => onOpenTheoryModal(4)}
              className="text-center p-3 rounded-xl bg-white border border-[#e2dfde] shadow-2xs hover:border-[#005fa6] hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#005fa6] mb-1 group-hover:scale-110 transition-transform">
                public
              </span>
              <p className="text-[#005fa6] font-bold text-xs group-hover:underline">Cultural</p>
              <p className="text-[#5f5e5e] text-[11px]">Constraints</p>
            </div>

            <div
              onClick={() => onOpenTheoryModal(2)}
              className="text-center p-3 rounded-xl bg-white border border-[#e2dfde] shadow-2xs hover:border-[#005fa6] hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#005fa6] mb-1 group-hover:scale-110 transition-transform">
                translate
              </span>
              <p className="text-[#005fa6] font-bold text-xs group-hover:underline">Semantic</p>
              <p className="text-[#5f5e5e] text-[11px]">Constraints</p>
            </div>

            <div
              onClick={() => onOpenTheoryModal(6)}
              className="text-center p-3 rounded-xl bg-white border border-[#e2dfde] shadow-2xs hover:border-[#005fa6] hover:shadow-sm transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#005fa6] mb-1 group-hover:scale-110 transition-transform">
                psychology
              </span>
              <p className="text-[#005fa6] font-bold text-xs group-hover:underline">Logical</p>
              <p className="text-[#5f5e5e] text-[11px]">Constraints</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-[#2d3133] text-[#eff1f3] rounded-2xl p-6 md:p-8 mt-12 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#a1c9ff]">account_balance</span>
              <span className="font-bold text-lg text-white tracking-tight">SinglesHome SG</span>
            </div>
            <p className="text-xs text-[#c8c6c5]">
              © 2026 SinglesHome SG. Case Study & Persuasive Design Demo for Singapore HDB Buyers.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-semibold">
            <a
              href="https://www.hdb.gov.sg"
              target="_blank"
              rel="noreferrer"
              className="text-[#c8c6c5] hover:text-[#a1c9ff] transition-colors flex items-center gap-1"
            >
              HDB Official Portal
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('Privacy Policy: All financial calculations run locally in your browser.');
              }}
              className="text-[#c8c6c5] hover:text-[#a1c9ff] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#help"
              onClick={(e) => {
                e.preventDefault();
                alert('Help Center: Need guidance on HDB Grants or HFE letters? Contact support@singleshome.sg');
              }}
              className="text-[#c8c6c5] hover:text-[#a1c9ff] transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
