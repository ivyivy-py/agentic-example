import React, { useState } from 'react';

export const ProcessRoadmapView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      stepNumber: 1,
      title: 'HDB Flat Eligibility (HFE) Letter Application',
      timeline: '2 to 4 Weeks',
      status: 'Mandatory First Step',
      icon: 'description',
      summary: 'Apply online via the HDB Flat Portal with Singpass. Determines your eligibility for new/resale flats, CPF grants, and HDB housing loan.',
      details: [
        'Income verification via Myinfo (past 12 months CPF contributions).',
        'Assessment of Single Citizen Scheme eligibility (Age 35+).',
        'Automatic grant entitlement calculation (EHG, CPF Housing Grant, PHG).',
        'HDB Housing Loan eligibility letter issued with maximum loan amount.',
      ],
      tip: 'Ensure your CPF contributions are updated and continuous for at least 12 months before applying.',
    },
    {
      stepNumber: 2,
      title: 'Flat Search & Option to Purchase (OTP)',
      timeline: '1 to 3 Months',
      status: 'Unit Selection',
      icon: 'search',
      summary: 'Search for resale flats on HDB Portal or PropertyGuru within your calculated budget. Secure the unit with an Option Fee.',
      details: [
        'Negotiate purchase price with seller within your financial budget.',
        'Seller grants Option to Purchase (OTP) upon payment of Option Fee ($1 to $1,000 max).',
        'Option period is valid for 21 calendar days.',
        'Submit Request for Value to HDB to determine valuation and loan limit.',
      ],
      tip: 'Do not pay cash-over-valuation (COV) beyond your liquid cash savings reserves.',
    },
    {
      stepNumber: 3,
      title: 'Option Exercise & Loan Approval',
      timeline: 'Within 21 Days',
      status: 'Legal Commitment',
      icon: 'gavel',
      summary: 'Exercise the OTP by paying the Option Exercise Fee ($1 to $4,000) and sign the legal agreement.',
      details: [
        'Confirm HDB Housing Loan or Commercial Bank Letter of Offer.',
        'Pay Option Exercise Fee (Total Option Fee + Exercise Fee <= $5,000).',
        'Submit Resale Application via HDB Flat Portal alongside seller.',
        'HDB reviews eligibility and documents for endorsement.',
      ],
      tip: 'Appoint HDB or private conveyancing lawyer early for title deed transfer.',
    },
    {
      stepNumber: 4,
      title: 'Resale Completion & Key Collection',
      timeline: '8 Weeks from Resale Acceptance',
      status: 'Final Settlement',
      icon: 'key',
      summary: 'Attend the Resale Completion Appointment at HDB Hub or authorize via Singpass for digital completion.',
      details: [
        'CPF OA savings deducted for downpayment and stamp duties.',
        'Disbursement of approved CPF Housing Grants.',
        'Payment of remaining balance via HDB loan or cash.',
        'Collect keys to your new home!',
      ],
      tip: 'Inspect the flat condition during pre-completion inspection before final key handover.',
    },
    {
      stepNumber: 5,
      title: 'Renovation & Move-In',
      timeline: '1 to 2 Months',
      status: 'Home Settling',
      icon: 'home_repair_service',
      summary: 'Engage HDB Registered Renovation Contractors (DRC) for interior fitting and structural permissions.',
      details: [
        'Apply for HDB renovation permits for hacking walls or plumbing.',
        'Set up SP Services utilities account for electricity and water.',
        'Notify HDB of change of NRIC address within 28 days of moving in.',
      ],
      tip: 'Only use HDB Registered Contractors to preserve structural integrity warranty.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e7bdb8]/50 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#005fa6] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">alt_route</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#191c1e]">Singapore Homeownership Journey</h2>
            <p className="text-sm text-[#5f5e5e]">
              End-to-End HDB Resale & BTO Buying Process for Singles & Couples
            </p>
          </div>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-4 border-t border-[#e2dfde]">
          {steps.map((s) => (
            <button
              key={s.stepNumber}
              onClick={() => setActiveStep(s.stepNumber)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeStep === s.stepNumber
                  ? 'bg-[#005fa6] text-white border-[#005fa6] shadow-md scale-[1.02]'
                  : 'bg-[#f8f9fb] text-[#191c1e] border-[#e2dfde] hover:bg-[#eceef0]'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold ${activeStep === s.stepNumber ? 'text-white/80' : 'text-[#005fa6]'}`}>
                  Step 0{s.stepNumber}
                </span>
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
              </div>
              <p className="text-xs font-bold truncate">{s.title.split('&')[0]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Details */}
      {steps
        .filter((s) => s.stepNumber === activeStep)
        .map((s) => (
          <div key={s.stepNumber} className="bg-white p-6 md:p-8 rounded-2xl border border-[#e7bdb8]/50 shadow-sm space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="bg-[#005fa6]/10 text-[#005fa6] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                  Stage {s.stepNumber} of 5 • {s.status}
                </span>
                <h3 className="text-2xl font-bold text-[#191c1e]">{s.title}</h3>
              </div>
              <span className="bg-[#ffe165] text-[#4b3f00] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {s.timeline}
              </span>
            </div>

            <p className="text-sm text-[#191c1e] font-medium leading-relaxed bg-[#f8f9fb] p-4 rounded-xl border border-[#e2dfde]">
              {s.summary}
            </p>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#191c1e] uppercase tracking-wider">
                Key Action Items & Requirements
              </h4>
              <ul className="space-y-2.5">
                {s.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-[#5f5e5e]">
                    <span className="w-5 h-5 rounded-full bg-[#005fa6]/10 text-[#005fa6] flex items-center justify-center font-bold shrink-0 mt-0.5 text-[11px]">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium text-[#191c1e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#005fa6]/5 p-4 rounded-xl border border-[#005fa6]/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#005fa6] shrink-0">tips_and_updates</span>
              <div>
                <span className="text-xs font-bold text-[#005fa6] block mb-0.5">Pro Tip for Buyers</span>
                <p className="text-xs text-[#191c1e]">{s.tip}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
