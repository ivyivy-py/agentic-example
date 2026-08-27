export type ActiveTab = 'home' | 'budget' | 'process' | 'services' | 'theory' | 'discussion';

export interface FinancialInputs {
  monthlyBudget: number;
  grossIncome: number;
  cpfOA: number;
  housingGrants: number;
  age: number;
  citizenship: 'SC' | 'PR';
  buyerType: 'single' | 'couple';
  flatTypePreference: '2-room' | '3-room' | '4-room' | '5-room';
}

export type AffordabilityStatus = 'Highly Optimal' | 'Moderate' | 'Stretched';

export interface StrategyCalculationResult {
  affordabilityStatus: AffordabilityStatus;
  barPercentage: number;
  statusColorClass: string;
  barColorClass: string;
  recommendationText: string;
  estimatedGrant: number;
  maxLoanAmount: number;
  maxPropertyPrice: number;
  monthlyMortgageMSR: number;
  msrRatio: number;
  suitableEstates: string[];
}

export interface TheoryItem {
  id: number;
  title: string;
  subtitle: string;
  normanConcept: string;
  description: string;
  uiContext: string;
  exampleInApp: string;
  guideline: string;
}
