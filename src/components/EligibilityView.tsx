import React, { useState } from 'react';
import { FinancialInputs } from '../types';
import { calculateHdbGrant } from '../utils/hdbCalculator';

interface EligibilityViewProps {
  inputs: FinancialInputs;
  setInputs: React.Dispatch<React.SetStateAction<FinancialInputs>>;
}

export const EligibilityView: React.FC<EligibilityViewProps> = ({ inputs, setInputs }) => {
  const [citizenship, setCitizenship] = useState<'SC' | 'PR'>('SC');
  const [age, setAge] = useState<number>(36);
  const [livingNearParents, setLivingNearParents] = useState<boolean>(true);

  const baseGrant = calculateHdbGrant(inputs.grossIncome, inputs.buyerType);
  const phgAmount = livingNearParents ? (inputs.buyerType === 'single' ? 10000 : 20000) : 0;
  const totalGrants = baseGrant + phgAmount;

  const isEligibleByAge = inputs.buyerType === 'single' ? age >= 35 : age >= 21;
  const isIncomeWithinLimit =
    inputs.buyerType === 'single' ? inputs.grossIncome <= 7000 : inputs.grossIncome <= 14000;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fade-in">
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e7bdb8]/50 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#005fa6]/10 text-[#005fa6] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#191c1e]">HDB Grant Eligibility & Assessment</h2>
            <p className="text-sm text-[#5f5e5e]">
              Singapore Housing & Development Board (HDB) 2026 CPF Housing Grants Calculator
            </p>
          </div>
        </div>

        {/* Interactive Eligibility Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#e2dfde]">
          <div>
            <label className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider block mb-1">
              Applicant Age
            </label>
            <input
              type="number"
              min={21}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-[#e7bdb8] rounded-xl font-semibold text-sm bg-[#f8f9fb]"
            />
            <span className="text-[11px] text-[#5f5e5e] mt-1 block">
              {inputs.buyerType === 'single' ? 'Min. age 35 for Single Scheme' : 'Min. age 21 for Couples'}
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider block mb-1">
              Citizenship Status
            </label>
            <select
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value as 'SC' | 'PR')}
              className="w-full px-4 py-2.5 border border-[#e7bdb8] rounded-xl font-semibold text-sm bg-[#f8f9fb]"
            >
              <option value="SC">Singapore Citizen (SC)</option>
              <option value="PR">Permanent Resident (PR)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider block mb-1">
              Proximity to Parents (&lt;4km)
            </label>
            <button
              type="button"
              onClick={() => setLivingNearParents(!livingNearParents)}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm border transition-all flex items-center justify-between ${
                livingNearParents
                  ? 'bg-[#005fa6]/10 text-[#005fa6] border-[#005fa6]'
                  : 'bg-[#f8f9fb] text-[#5f5e5e] border-[#e2dfde]'
              }`}
            >
              <span>{livingNearParents ? 'Within 4km / With Parents' : 'Further than 4km'}</span>
              <span className="material-symbols-outlined text-base">
                {livingNearParents ? 'check_circle' : 'cancel'}
              </span>
            </button>
          </div>
        </div>

        {/* Eligibility Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isEligibleByAge
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Age Requirement</span>
              <span className="text-sm font-semibold">
                {isEligibleByAge
                  ? `Qualified (Age ${age} >= ${inputs.buyerType === 'single' ? 35 : 21})`
                  : `Ineligible (Age ${age} < ${inputs.buyerType === 'single' ? 35 : 21})`}
              </span>
            </div>
            <span className="material-symbols-outlined text-2xl">
              {isEligibleByAge ? 'check_circle' : 'error'}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isIncomeWithinLimit
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Gross Income Ceiling</span>
              <span className="text-sm font-semibold">
                {isIncomeWithinLimit
                  ? `Within Limit ($${inputs.grossIncome.toLocaleString()} <= $${inputs.buyerType === 'single' ? '7,000' : '14,000'})`
                  : `Above Ceiling ($${inputs.grossIncome.toLocaleString()} > $${inputs.buyerType === 'single' ? '7,000' : '14,000'})`}
              </span>
            </div>
            <span className="material-symbols-outlined text-2xl">
              {isIncomeWithinLimit ? 'check_circle' : 'warning'}
            </span>
          </div>
        </div>

        {/* Grant Breakdown Table */}
        <div className="space-y-4 pt-4 border-t border-[#e2dfde]">
          <h3 className="text-lg font-bold text-[#191c1e]">Grant Component Breakdown</h3>

          <div className="bg-[#f8f9fb] rounded-xl border border-[#e2dfde] divide-y divide-[#e2dfde] overflow-hidden text-sm">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-[#191c1e]">Singles / CPF Housing Grant (Resale)</p>
                <p className="text-xs text-[#5f5e5e]">Base grant for 2-Room to 4-Room resale flats</p>
              </div>
              <span className="font-bold text-[#005fa6] text-base">$40,000</span>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-[#191c1e]">Enhanced CPF Housing Grant (EHG)</p>
                <p className="text-xs text-[#5f5e5e]">Income-tested for gross monthly income &lt;= $4,500</p>
              </div>
              <span className="font-bold text-[#005fa6] text-base">
                ${(baseGrant - 40000 > 0 ? baseGrant - 40000 : 0).toLocaleString()}
              </span>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-[#191c1e]">Proximity Housing Grant (PHG)</p>
                <p className="text-xs text-[#5f5e5e]">Live with or near parents / child (&lt;4km)</p>
              </div>
              <span className="font-bold text-[#005fa6] text-base">${phgAmount.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-[#005fa6]/10 flex justify-between items-center">
              <div>
                <p className="font-extrabold text-[#005fa6] text-base">Total Estimated Housing Grant</p>
                <p className="text-xs text-[#005fa6]">Disbursed directly into CPF Ordinary Account</p>
              </div>
              <span className="font-extrabold text-[#005fa6] text-xl">${totalGrants.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
