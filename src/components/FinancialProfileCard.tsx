import React from 'react';
import { FinancialInputs } from '../types';
import { TheoryBubble } from './TheoryBubble';

interface FinancialProfileCardProps {
  inputs: FinancialInputs;
  setInputs: React.Dispatch<React.SetStateAction<FinancialInputs>>;
  isTheoryMode: boolean;
  onOpenTheoryModal: (id: number) => void;
  calculatedGrant: number;
  onGenerateStrategy: () => void;
}

export const FinancialProfileCard: React.FC<FinancialProfileCardProps> = ({
  inputs,
  setInputs,
  isTheoryMode,
  onOpenTheoryModal,
  calculatedGrant,
  onGenerateStrategy,
}) => {
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(rawVal || '0', 10);
    setInputs((prev) => ({ ...prev, grossIncome: num }));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(rawVal || '0', 10);
    setInputs((prev) => ({ ...prev, cpfOA: num }));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input Card Container */}
      <div className="bg-white p-6 rounded-2xl border border-[#e7bdb8]/50 shadow-sm relative transition-all hover:shadow-md">
        {/* Theory Bubble 2: Signifier */}
        <TheoryBubble
          id={2}
          isTheoryMode={isTheoryMode}
          positionClasses="-left-3 top-5"
          onClickBubble={onOpenTheoryModal}
          tooltipPositionClass="left-8 top-0"
        />

        {/* Card Header */}
        <h3 className="text-xl font-bold text-[#191c1e] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#005fa6] text-2xl">analytics</span>
          Financial Profile
        </h3>

        <div className="space-y-6">
          {/* Mapping Field: Housing Budget Slider (Numerical Bubble 4) */}
          <div className="space-y-2.5 relative">
            {/* Theory Bubble 4: Mappings */}
            <TheoryBubble
              id={4}
              isTheoryMode={isTheoryMode}
              positionClasses="-right-3 -top-2"
              onClickBubble={onOpenTheoryModal}
              tooltipPositionClass="right-8 top-0"
            />

            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#191c1e]">
                Monthly Housing Budget
              </label>
              <span className="text-xl font-bold text-[#005fa6] tracking-tight">
                {formatCurrency(inputs.monthlyBudget)}
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={10000}
              step={100}
              value={inputs.monthlyBudget}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, monthlyBudget: Number(e.target.value) }))
              }
              className="w-full h-2.5 bg-[#e2dfde] rounded-lg appearance-none cursor-pointer custom-slider focus:outline-none"
            />

            <div className="flex justify-between text-xs text-[#5f5e5e] font-medium">
              <span>$1,000</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Gross Monthly Income & CPF OA Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#5f5e5e]">
                Gross Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] font-semibold text-sm">
                  $
                </span>
                <input
                  type="text"
                  value={inputs.grossIncome.toLocaleString('en-US')}
                  onChange={handleIncomeChange}
                  className="w-full pl-8 pr-4 py-2.5 border border-[#e7bdb8]/80 rounded-lg bg-[#f8f9fb] text-[#191c1e] font-semibold text-sm hover:border-[#005fa6] focus:border-[#005fa6] focus:ring-2 focus:ring-[#005fa6]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#5f5e5e]">
                CPF Ordinary Account
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] font-semibold text-sm">
                  $
                </span>
                <input
                  type="text"
                  value={inputs.cpfOA.toLocaleString('en-US')}
                  onChange={handleCpfChange}
                  className="w-full pl-8 pr-4 py-2.5 border border-[#e7bdb8]/80 rounded-lg bg-[#f8f9fb] text-[#191c1e] font-semibold text-sm hover:border-[#005fa6] focus:border-[#005fa6] focus:ring-2 focus:ring-[#005fa6]/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Buyer Type & Single / Couple Option */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setInputs((prev) => ({ ...prev, buyerType: 'single' }))}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                inputs.buyerType === 'single'
                  ? 'bg-[#005fa6]/10 text-[#005fa6] border-[#005fa6]'
                  : 'bg-[#f8f9fb] text-[#5f5e5e] border-[#e2dfde] hover:bg-[#eceef0]'
              }`}
            >
              <span className="material-symbols-outlined text-base">person</span>
              Single (Age 35+)
            </button>
            <button
              type="button"
              onClick={() => setInputs((prev) => ({ ...prev, buyerType: 'couple' }))}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                inputs.buyerType === 'couple'
                  ? 'bg-[#005fa6]/10 text-[#005fa6] border-[#005fa6]'
                  : 'bg-[#f8f9fb] text-[#5f5e5e] border-[#e2dfde] hover:bg-[#eceef0]'
              }`}
            >
              <span className="material-symbols-outlined text-base">group</span>
              Couple (Joint)
            </button>
          </div>

          {/* Constraint Example: Locked HDB Grants (Numerical Bubble 3) */}
          <div className="bg-[#eceef0]/70 p-3.5 rounded-xl border border-[#e2dfde] relative opacity-90 transition-all hover:opacity-100">
            {/* Theory Bubble 3: Constraints */}
            <TheoryBubble
              id={3}
              isTheoryMode={isTheoryMode}
              positionClasses="-left-3 -top-2"
              onClickBubble={onOpenTheoryModal}
              tooltipPositionClass="left-8 top-0"
            />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-[#191c1e] flex items-center gap-1.5">
                  HDB Housing Grants
                  <span className="bg-[#ffe165] text-[#4b3f00] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                    Auto
                  </span>
                </p>
                <p className="text-xs text-[#5f5e5e]">
                  Auto-calculated based on income (~{formatCurrency(calculatedGrant)})
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#e2dfde] flex items-center justify-center text-[#5f5e5e]">
                <span className="material-symbols-outlined text-sm">lock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affordance Example: Generate Strategy Button (Numerical Bubble 1) */}
      <div className="relative">
        {/* Theory Bubble 1: Affordance */}
        <TheoryBubble
          id={1}
          isTheoryMode={isTheoryMode}
          positionClasses="left-1/2 -translate-x-1/2 -top-4"
          onClickBubble={onOpenTheoryModal}
          tooltipPositionClass="-top-28 left-1/2 -translate-x-1/2"
        />

        <button
          onClick={onGenerateStrategy}
          className="w-full py-4 bg-[#005fa6] hover:bg-[#0079cf] active:bg-[#004880] text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#0079cf]/40"
        >
          <span>Generate Strategy</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
