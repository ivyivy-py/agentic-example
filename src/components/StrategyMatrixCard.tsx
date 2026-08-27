import React from 'react';
import { FinancialInputs, StrategyCalculationResult } from '../types';
import { TheoryBubble } from './TheoryBubble';

interface StrategyMatrixCardProps {
  inputs: FinancialInputs;
  strategy: StrategyCalculationResult;
  isTheoryMode: boolean;
  onOpenTheoryModal: (id: number) => void;
  activeRoadmapStep: number;
  setActiveRoadmapStep: (step: number) => void;
}

export const StrategyMatrixCard: React.FC<StrategyMatrixCardProps> = ({
  inputs,
  strategy,
  isTheoryMode,
  onOpenTheoryModal,
  activeRoadmapStep,
  setActiveRoadmapStep,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Feedback Indicator Card (Numerical Bubble 5) */}
      <div className="bg-[#f2f4f6] border border-[#e7bdb8]/50 rounded-2xl p-6 relative overflow-hidden transition-all shadow-sm">
        {/* Theory Bubble 5: Feedback */}
        <TheoryBubble
          id={5}
          isTheoryMode={isTheoryMode}
          positionClasses="right-5 top-5"
          onClickBubble={onOpenTheoryModal}
          tooltipPositionClass="right-8 top-0"
        />

        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe165] flex items-center justify-center text-[#4b3f00] shadow-sm shrink-0">
            <span className="material-symbols-outlined text-3xl">trending_up</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#5f5e5e] uppercase tracking-widest">
              Affordability Score
            </p>
            <h4 className={`text-3xl font-extrabold tracking-tight ${strategy.statusColorClass}`}>
              {strategy.affordabilityStatus}
            </h4>
          </div>
        </div>

        {/* Progress Bar Gauge */}
        <div className="w-full bg-[#e0e3e5] h-3.5 rounded-full overflow-hidden mb-3 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${strategy.barColorClass}`}
            style={{ width: `${strategy.barPercentage}%` }}
          ></div>
        </div>

        <p className="text-sm font-medium text-[#5f5e5e]">
          {strategy.recommendationText}
        </p>

        {/* Breakdown Stats */}
        <div className="mt-4 pt-3 border-t border-[#e2dfde] grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[#5f5e5e] block">Est. Purchasing Power</span>
            <span className="font-bold text-[#191c1e] text-sm">
              {formatCurrency(strategy.maxPropertyPrice)}
            </span>
          </div>
          <div>
            <span className="text-[#5f5e5e] block">Est. Housing Loan</span>
            <span className="font-bold text-[#005fa6] text-sm">
              {formatCurrency(strategy.maxLoanAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Conceptual Model Roadmap (Numerical Bubble 6) */}
      <div className="glass-panel p-6 rounded-2xl border border-[#e7bdb8]/50 flex-grow relative shadow-sm">
        {/* Theory Bubble 6: Conceptual Model */}
        <TheoryBubble
          id={6}
          isTheoryMode={isTheoryMode}
          positionClasses="-left-3 -top-2"
          onClickBubble={onOpenTheoryModal}
          tooltipPositionClass="left-8 top-0"
        />

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#191c1e]">Your Homeownership Roadmap</h3>
          <span className="text-xs font-semibold text-[#005fa6] bg-[#005fa6]/10 px-2.5 py-1 rounded-full">
            Singapore HDB 2026
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-6 relative pl-1">
          {/* Timeline Vertical Bar */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#d2e4ff]"></div>

          {/* Step 1 */}
          <div
            onClick={() => setActiveRoadmapStep(1)}
            className={`flex gap-4 relative cursor-pointer group transition-all p-2 rounded-xl ${
              activeRoadmapStep === 1 ? 'bg-[#005fa6]/5 ring-1 ring-[#005fa6]/20' : 'hover:bg-white/60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#005fa6] text-white flex items-center justify-center shrink-0 z-10 font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              1
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#191c1e] group-hover:text-[#005fa6] transition-colors">
                Eligibility Check
              </h5>
              <p className="text-xs text-[#5f5e5e] mt-0.5">
                HDB Flat Eligibility (HFE) letter application & Grant assessment (~{formatCurrency(strategy.estimatedGrant)} grant).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setActiveRoadmapStep(2)}
            className={`flex gap-4 relative cursor-pointer group transition-all p-2 rounded-xl ${
              activeRoadmapStep === 2 ? 'bg-[#005fa6]/5 ring-1 ring-[#005fa6]/20' : 'hover:bg-white/60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#e0e3e5] text-[#005fa6] flex items-center justify-center shrink-0 z-10 font-bold text-base border-2 border-[#005fa6] shadow-sm group-hover:scale-105 transition-transform">
              2
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#005fa6]">
                Option to Purchase (OTP)
              </h5>
              <p className="text-xs text-[#5f5e5e] mt-0.5">
                Searching for units based on {formatCurrency(inputs.monthlyBudget)}/mo budget in {strategy.suitableEstates.slice(0, 2).join(' or ')}.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setActiveRoadmapStep(3)}
            className={`flex gap-4 relative cursor-pointer group transition-all p-2 rounded-xl ${
              activeRoadmapStep === 3 ? 'bg-[#005fa6]/5 ring-1 ring-[#005fa6]/20' : 'hover:bg-white/60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#e0e3e5] text-[#5f5e5e] flex items-center justify-center shrink-0 z-10 font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              3
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#5f5e5e]">
                Valuation & CPF Disbursement
              </h5>
              <p className="text-xs text-[#5f5e5e] opacity-75 mt-0.5">
                Valuation request, loan approval, and CPF OA balance ({formatCurrency(inputs.cpfOA)}) deduction.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Context Image */}
        <div className="mt-8 rounded-xl overflow-hidden h-44 relative group shadow-sm border border-[#e2dfde]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5YIC5mVW4DJdVqBMMIxBCQOaXc1dRCXIVMRb-7qtQcKLzHlefUEc90wRZKdS8sbcEKZB8KnwmZBuh7Nkbov_ygRwUOuzpNRRUZCgcXlQeJaB8SnuLNCKejRIDjqZvyAOjMCYzS4oIBrFp3OaAXptfe45CPjP-D4j56LLxyOGVmwJqVFMwQGOSTncNJLuaZCRY5NyNxbekUMwJG486-lxSMa-NXvut8r24LANzbp10an9bogGBWEDUsjiPgSMTDo_W-qr5LSu51ek')`,
            }}
          ></div>
          <div className="absolute bottom-3 left-3 z-20 flex justify-between items-end right-3">
            <span className="text-white font-semibold text-xs flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              <span className="material-symbols-outlined text-sm text-yellow-400">location_on</span>
              Toa Payoh Crest (Mature Estate)
            </span>
            <span className="text-white/80 text-[11px]">HDB Resale & BTO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
