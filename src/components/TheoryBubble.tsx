import React, { useState } from 'react';
import { THEORY_ITEMS } from '../data/theoryData';

interface TheoryBubbleProps {
  id: number;
  isTheoryMode: boolean;
  positionClasses: string;
  onClickBubble: (id: number) => void;
  tooltipPositionClass?: string;
}

export const TheoryBubble: React.FC<TheoryBubbleProps> = ({
  id,
  isTheoryMode,
  positionClasses,
  onClickBubble,
  tooltipPositionClass = 'top-full left-1/2 -translate-x-1/2 mt-2',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theory = THEORY_ITEMS[id];

  if (!isTheoryMode || !theory) return null;

  return (
    <div className={`absolute z-40 ${positionClasses}`}>
      <div className="relative group">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClickBubble(id);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="theory-bubble pulse shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Theory #${id}: ${theory.title}`}
        >
          {id}
        </button>

        {/* Hover / Active Tooltip */}
        {(isHovered) && (
          <div
            className={`theory-annotation absolute z-50 pointer-events-none transition-opacity duration-200 opacity-100 ${tooltipPositionClass} min-w-[240px] max-w-[280px] bg-[#191c1e] text-white p-3 rounded-lg shadow-xl border border-white/20 text-xs`}
          >
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>
                #{id} {theory.title}
              </span>
            </div>
            <p className="text-gray-200 text-[11px] leading-relaxed mb-1.5">
              {theory.description}
            </p>
            <div className="text-[10px] text-blue-300 font-semibold border-t border-white/10 pt-1 flex justify-between items-center">
              <span>Click for design case study</span>
              <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
