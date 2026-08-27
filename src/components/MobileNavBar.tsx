import React from 'react';
import { ActiveTab } from '../types';

interface MobileNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-white border-t border-[#e2dfde] py-2 px-3 shadow-lg">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
          activeTab === 'home'
            ? 'bg-[#0079cf] text-white shadow-sm'
            : 'text-[#5f5e5e] hover:text-[#191c1e]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">home</span>
        <span className="text-[11px] font-semibold">Home</span>
      </button>

      <button
        onClick={() => setActiveTab('budget')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
          activeTab === 'budget'
            ? 'bg-[#0079cf] text-white shadow-sm'
            : 'text-[#5f5e5e] hover:text-[#191c1e]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">calculate</span>
        <span className="text-[11px] font-semibold">Budget</span>
      </button>

      <button
        onClick={() => setActiveTab('process')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
          activeTab === 'process'
            ? 'bg-[#0079cf] text-white shadow-sm'
            : 'text-[#5f5e5e] hover:text-[#191c1e]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">mobile_share_stack</span>
        <span className="text-[11px] font-semibold">Process</span>
      </button>

      <button
        onClick={() => setActiveTab('services')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
          activeTab === 'services'
            ? 'bg-[#0079cf] text-white shadow-sm'
            : 'text-[#5f5e5e] hover:text-[#191c1e]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">construction</span>
        <span className="text-[11px] font-semibold">Services</span>
      </button>

      <button
        onClick={() => setActiveTab('discussion')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
          activeTab === 'discussion'
            ? 'bg-[#0079cf] text-white shadow-sm'
            : 'text-[#5f5e5e] hover:text-[#191c1e]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">forum</span>
        <span className="text-[11px] font-semibold">Discuss</span>
      </button>
    </nav>
  );
};
