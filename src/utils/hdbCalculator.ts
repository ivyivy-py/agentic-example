import { FinancialInputs, StrategyCalculationResult } from '../types';

export function calculateHdbGrant(grossIncome: number, buyerType: 'single' | 'couple'): number {
  if (buyerType === 'single') {
    if (grossIncome > 7000) return 0;
    // Base Single Grant for resale: $40,000 for 2-4 room resale
    let baseGrant = 40000;
    // Enhanced Housing Grant (EHG) for Singles: up to $40,000 if income <= 4500
    let ehgGrant = 0;
    if (grossIncome <= 4500) {
      // Tiered EHG calculation
      const incomeTier = Math.max(0, 4500 - grossIncome);
      ehgGrant = Math.min(40000, 5000 + Math.floor(incomeTier / 500) * 2500);
    }
    return baseGrant + ehgGrant;
  } else {
    // Couple rules
    if (grossIncome > 14000) return 0;
    let baseGrant = 80000;
    let ehgGrant = 0;
    if (grossIncome <= 9000) {
      ehgGrant = Math.min(80000, 10000 + Math.floor((9000 - grossIncome) / 500) * 5000);
    }
    return baseGrant + ehgGrant;
  }
}

export function calculateStrategy(inputs: FinancialInputs): StrategyCalculationResult {
  const { monthlyBudget, grossIncome, cpfOA, buyerType } = inputs;

  const estimatedGrant = calculateHdbGrant(grossIncome, buyerType);
  
  // HDB MSR 30% cap on monthly income for loan repayments
  const maxAllowableMsrMortgage = Math.round(grossIncome * 0.30);

  // Mortgage servicing calculation at 2.6% HDB loan interest rate over 25 years (300 months)
  // Monthly payment per $100,000 loan is ~ $453.89
  const maxLoanAmount = Math.round((maxAllowableMsrMortgage / 453.89) * 100000);

  // Total purchasing power = CPF OA + Max Loan + Estimated Grant + Cash savings buffer
  const maxPropertyPrice = cpfOA + maxLoanAmount + estimatedGrant + (monthlyBudget * 12);

  // Affordability ratio relative to monthly budget
  const budgetRatio = monthlyBudget / (grossIncome || 1);

  let affordabilityStatus: StrategyCalculationResult['affordabilityStatus'];
  let barPercentage: number;
  let statusColorClass: string;
  let barColorClass: string;
  let recommendationText: string;
  let suitableEstates: string[];

  if (monthlyBudget < 2000) {
    affordabilityStatus = 'Highly Optimal';
    barPercentage = 85;
    statusColorClass = 'text-[#6f5d00] dark:text-[#ffe165]';
    barColorClass = 'bg-[#6f5d00] dark:bg-[#c7a900]';
    recommendationText = 'Your budget is comfortably sustainable with low financial risk. Great for 2-Room Flexi or 3-Room Resale flats.';
    suitableEstates = ['Yishun', 'Woodlands', 'Jurong West', 'Sengkang'];
  } else if (monthlyBudget <= 4500) {
    affordabilityStatus = 'Moderate';
    barPercentage = 60;
    statusColorClass = 'text-[#005fa6]';
    barColorClass = 'bg-[#0079cf]';
    recommendationText = 'Your budget allows for 4-Room Resale flats in mature estates or prime BTO locations.';
    suitableEstates = ['Toa Payoh Crest', 'Bedok', 'Geylang', 'Kallang / Whampoa', 'Queenstown'];
  } else {
    affordabilityStatus = 'Stretched';
    barPercentage = 30;
    statusColorClass = 'text-[#ba1a1a]';
    barColorClass = 'bg-[#ba1a1a]';
    recommendationText = 'Your budget is above recommended MSR guidelines. Consider increasing CPF OA balance or choosing 3-Room flats.';
    suitableEstates = ['Bishan', 'Bukit Merah', 'Marine Parade'];
  }

  return {
    affordabilityStatus,
    barPercentage,
    statusColorClass,
    barColorClass,
    recommendationText,
    estimatedGrant,
    maxLoanAmount,
    maxPropertyPrice,
    monthlyMortgageMSR: maxAllowableMsrMortgage,
    msrRatio: Math.round(budgetRatio * 100),
    suitableEstates,
  };
}
