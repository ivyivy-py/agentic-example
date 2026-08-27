import React, { useState } from 'react';
import { ActiveTab, FinancialInputs } from './types';
import { calculateStrategy, calculateHdbGrant } from './utils/hdbCalculator';
import { Header } from './components/Header';
import { FinancialProfileCard } from './components/FinancialProfileCard';
import { StrategyMatrixCard } from './components/StrategyMatrixCard';
import { TheoryGlossaryFooter } from './components/TheoryGlossaryFooter';
import { TheoryDetailModal } from './components/TheoryDetailModal';
import { EligibilityView } from './components/EligibilityView';
import { ProcessRoadmapView } from './components/ProcessRoadmapView';
import { ServicesEstatesView } from './components/ServicesEstatesView';
import { MobileNavBar } from './components/MobileNavBar';
import { DisqusComments } from './components/DisqusComments';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isTheoryMode, setIsTheoryMode] = useState<boolean>(true);
  const [activeTheoryModalId, setActiveTheoryModalId] = useState<number | null>(null);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(2);

  // Financial inputs matching screenshot default
  const [inputs, setInputs] = useState<FinancialInputs>({
    monthlyBudget: 2500,
    grossIncome: 6500,
    cpfOA: 45000,
    housingGrants: 40000,
    age: 36,
    citizenship: 'SC',
    buyerType: 'single',
    flatTypePreference: '4-room',
  });

  const calculatedGrant = calculateHdbGrant(inputs.grossIncome, inputs.buyerType);
  const strategyResult = calculateStrategy({ ...inputs, housingGrants: calculatedGrant });

  const handleGenerateStrategy = () => {
    setActiveTab('home');
    // Scroll smoothly to output matrix if needed
    const matrixElem = document.getElementById('strategy-matrix-section');
    if (matrixElem) {
      matrixElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] pb-20 md:pb-12 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isTheoryMode={isTheoryMode}
        setIsTheoryMode={setIsTheoryMode}
        activeTheoryId={activeTheoryModalId}
        onOpenTheoryModal={(id) => setActiveTheoryModalId(id)}
      />

      {/* Main Container */}
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 flex-grow">
        {/* TAB 1: HOME / CALCULATOR */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fade-in">
            {/* Case Study Header Banner */}
            <div className="text-center md:text-left max-w-3xl">
              <span className="bg-[#d2e4ff] text-[#001c37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-2xs">
                Persuasive Tech case study
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight mb-2">
                HDB Housing Options for Singles Calculator
              </h2>
            </div>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
              {/* Left Column: Financial Profile Inputs (5 cols) */}
              <section className="lg:col-span-5">
                <FinancialProfileCard
                  inputs={inputs}
                  setInputs={setInputs}
                  isTheoryMode={isTheoryMode}
                  onOpenTheoryModal={(id) => setActiveTheoryModalId(id)}
                  calculatedGrant={calculatedGrant}
                  onGenerateStrategy={handleGenerateStrategy}
                />
              </section>

              {/* Right Column: Strategy Matrix & Roadmap (7 cols) */}
              <section id="strategy-matrix-section" className="lg:col-span-7">
                <StrategyMatrixCard
                  inputs={inputs}
                  strategy={strategyResult}
                  isTheoryMode={isTheoryMode}
                  onOpenTheoryModal={(id) => setActiveTheoryModalId(id)}
                  activeRoadmapStep={activeRoadmapStep}
                  setActiveRoadmapStep={setActiveRoadmapStep}
                />
              </section>
            </div>

            {/* Bottom Section: Theory Outcomes & DOET Glossary */}
            <TheoryGlossaryFooter
              onOpenTheoryModal={(id) => setActiveTheoryModalId(id)}
            />

            {/* Disqus Community Discussion Embed */}
            <DisqusComments
              shortname="sample-oqdiekwyrl"
              defaultLanguage="zh_TW"
            />
          </div>
        )}

        {/* TAB 2: ELIGIBILITY & GRANTS */}
        {activeTab === 'budget' && (
          <div className="space-y-10 animate-fade-in">
            <EligibilityView inputs={inputs} setInputs={setInputs} />
            <DisqusComments
              shortname="sample-oqdiekwyrl"
              defaultLanguage="zh_TW"
              article={{
                id: 'hdb-singles-grants-eligibility',
                title: 'CPF Housing Grants & Single Citizen Scheme Eligibility 2026',
                url: typeof window !== 'undefined' ? window.location.origin + '/#grants' : 'https://singleshome-sg.web.app/#grants',
                category: 'Grants & Eligibility',
                summary: 'Discuss Enhanced CPF Housing Grant (EHG), Proximity Housing Grant (PHG), and age 35 rules.',
              }}
            />
          </div>
        )}

        {/* TAB 3: PROCESS ROADMAP */}
        {activeTab === 'process' && (
          <div className="space-y-10 animate-fade-in">
            <ProcessRoadmapView />
            <DisqusComments
              shortname="sample-oqdiekwyrl"
              defaultLanguage="zh_TW"
              article={{
                id: 'hdb-singles-process-roadmap',
                title: 'Step-by-Step HDB Resale & BTO Buying Process for Singles',
                url: typeof window !== 'undefined' ? window.location.origin + '/#process' : 'https://singleshome-sg.web.app/#process',
                category: 'Process Roadmap',
                summary: 'Share timelines, HFE letter experiences, OTP negotiations, and completion steps.',
              }}
            />
          </div>
        )}

        {/* TAB 4: SERVICES & ESTATES */}
        {activeTab === 'services' && (
          <div className="space-y-10 animate-fade-in">
            <ServicesEstatesView />
            <DisqusComments
              shortname="sample-oqdiekwyrl"
              defaultLanguage="zh_TW"
              article={{
                id: 'hdb-singles-resale-vs-bto',
                title: 'Singles BTO 2-Room Flexi vs Resale Flat Decision Framework',
                url: typeof window !== 'undefined' ? window.location.origin + '/#bto-resale' : 'https://singleshome-sg.web.app/#bto-resale',
                category: 'BTO vs Resale & Estates',
                summary: 'Compare mature vs non-mature estates, price ranges, and renovation considerations.',
              }}
            />
          </div>
        )}

        {/* TAB 5: DEDICATED COMMUNITY DISCUSSION FORUM */}
        {activeTab === 'discussion' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-2">
            <div className="text-center md:text-left">
              <span className="bg-[#d2e4ff] text-[#001c37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                Community Forum
              </span>
              <h2 className="text-3xl font-extrabold text-[#191c1e] tracking-tight">
                Singles Housing Community & Policy Discussions
              </h2>
              <p className="text-sm text-[#5f5e5e] mt-1">
                Ask questions, share advice on single-buyer CPF strategies, and join discussions with other home buyers.
              </p>
            </div>
            <DisqusComments
              shortname="sample-oqdiekwyrl"
              defaultLanguage="zh_TW"
              showTopicSelector={true}
            />
          </div>
        )}
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modal / Slide-over for Theory Concept Details */}
      <TheoryDetailModal
        theoryId={activeTheoryModalId}
        onClose={() => setActiveTheoryModalId(null)}
      />
    </div>
  );
}
