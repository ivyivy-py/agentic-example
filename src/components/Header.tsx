import React from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isTheoryMode: boolean;
  setIsTheoryMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTheoryId: number | null;
  onOpenTheoryModal: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isTheoryMode,
  setIsTheoryMode,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#e7bdb8]/40 sticky top-0 z-50 transition-colors">
      <div className="flex justify-between items-center w-full px-4 md:px-6 py-3 max-w-[1200px] mx-auto">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#005fa6]/10 flex items-center justify-center text-[#005fa6] group-hover:bg-[#005fa6] group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-[22px] fill-current">account_balance</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-[#005fa6] tracking-tight leading-none flex items-center gap-1.5">
              SinglesHome SG
            </h1>
            <span className="text-[11px] font-medium text-[#5f5e5e] tracking-wider uppercase">
              HDB Housing Intelligence
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`font-semibold text-sm transition-colors relative py-1 ${
                activeTab === 'home'
                  ? 'text-[#005fa6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#005fa6]'
                  : 'text-[#5f5e5e] hover:text-[#191c1e]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`font-semibold text-sm transition-colors relative py-1 ${
                activeTab === 'budget'
                  ? 'text-[#005fa6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#005fa6]'
                  : 'text-[#5f5e5e] hover:text-[#191c1e]'
              }`}
            >
              Eligibility & Grants
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`font-semibold text-sm transition-colors relative py-1 ${
                activeTab === 'process'
                  ? 'text-[#005fa6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#005fa6]'
                  : 'text-[#5f5e5e] hover:text-[#191c1e]'
              }`}
            >
              Process Roadmap
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`font-semibold text-sm transition-colors relative py-1 ${
                activeTab === 'services'
                  ? 'text-[#005fa6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#005fa6]'
                  : 'text-[#5f5e5e] hover:text-[#191c1e]'
              }`}
            >
              Services & Estates
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`font-semibold text-sm transition-colors relative py-1 flex items-center gap-1.5 ${
                activeTab === 'discussion'
                  ? 'text-[#005fa6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#005fa6]'
                  : 'text-[#5f5e5e] hover:text-[#191c1e]'
              }`}
            >
              <span>Discussion</span>
              <span className="bg-[#005fa6]/10 text-[#005fa6] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                Disqus
              </span>
            </button>
          </nav>

          <div className="h-6 w-px bg-[#e7bdb8]/60 hidden md:block"></div>

          {/* Theory Mode Toggle Button */}
          <button
            onClick={() => setIsTheoryMode((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              isTheoryMode
                ? 'bg-[#005fa6] text-white shadow-md ring-2 ring-[#0079cf]/30 scale-[1.02]'
                : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5] border border-[#e2dfde]'
            }`}
            title="Toggle Persuasive Design annotations"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>{isTheoryMode ? 'Theory Mode ON' : 'Theory Mode'}</span>
            {isTheoryMode && (
              <span className="flex h-2 w-2 relative ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
