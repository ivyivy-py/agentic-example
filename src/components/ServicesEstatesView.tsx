import React, { useState } from 'react';

export const ServicesEstatesView: React.FC = () => {
  const [flatFilter, setFlatFilter] = useState<'all' | '2-room' | '3-room' | '4-room'>('all');

  const hdbFlatTypes = [
    {
      type: '2-Room Flexi (BTO & Resale)',
      size: '36 – 47 sqm (387 – 505 sqft)',
      priceRange: '$120,000 – $280,000',
      estMonthly: '$600 – $1,100/mo',
      eligibility: 'Single SCs aged 35+ (Gross income <= $7,000)',
      estates: ['Yishun', 'Woodlands', 'Tengah', 'Sengkang', 'Jurong West'],
      tag: '2-room',
      recommendedFor: 'Budget-conscious singles seeking minimal mortgage burden & modern layout.',
    },
    {
      type: '3-Room Resale Flat',
      size: '60 – 68 sqm (645 – 731 sqft)',
      priceRange: '$320,000 – $520,000',
      estMonthly: '$1,400 – $2,300/mo',
      eligibility: 'Single SCs aged 35+ or SC/PR Couples',
      estates: ['Bedok', 'Ang Mo Kio', 'Clementi', 'Tampines', 'Toa Payoh'],
      tag: '3-room',
      recommendedFor: 'Singles wanting 2 bedrooms, extra work-from-home study space, or central location.',
    },
    {
      type: '4-Room Resale Flat',
      size: '90 – 100 sqm (968 – 1,076 sqft)',
      priceRange: '$480,000 – $850,000',
      estMonthly: '$2,200 – $3,800/mo',
      eligibility: 'Joint Single Scheme / SC Couples / Families',
      estates: ['Toa Payoh Crest', 'Queenstown', 'Bukit Merah', 'Kallang', 'Bishan'],
      tag: '4-room',
      recommendedFor: 'Couples or joint singles seeking 3 full bedrooms in prime mature estates.',
    },
  ];

  const filteredFlats = flatFilter === 'all'
    ? hdbFlatTypes
    : hdbFlatTypes.filter((f) => f.tag === flatFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e7bdb8]/50 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#005fa6] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">apartment</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#191c1e]">HDB Property & Estate Explorer</h2>
            <p className="text-sm text-[#5f5e5e]">
              Singapore Housing Types, Estimated Pricing & Recommended Estates
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e2dfde]">
          {(['all', '2-room', '3-room', '4-room'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setFlatFilter(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                flatFilter === tag
                  ? 'bg-[#005fa6] text-white shadow-sm'
                  : 'bg-[#f8f9fb] text-[#5f5e5e] hover:bg-[#eceef0] border border-[#e2dfde]'
              }`}
            >
              {tag === 'all' ? 'All Flat Types' : `${tag} Flats`}
            </button>
          ))}
        </div>
      </div>

      {/* Flat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFlats.map((flat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#e7bdb8]/50 shadow-sm overflow-hidden flex flex-col hover:border-[#005fa6] transition-all group"
          >
            <div className="p-5 bg-[#f8f9fb] border-b border-[#e2dfde]">
              <span className="bg-[#005fa6]/10 text-[#005fa6] text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-max mb-2">
                {flat.size}
              </span>
              <h3 className="text-lg font-bold text-[#191c1e] group-hover:text-[#005fa6] transition-colors">
                {flat.type}
              </h3>
              <p className="text-xl font-extrabold text-[#005fa6] mt-1">{flat.priceRange}</p>
            </div>

            <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#5f5e5e] font-medium block">Est. Monthly Instalment</span>
                  <span className="font-bold text-[#191c1e] text-sm">{flat.estMonthly}</span>
                </div>

                <div>
                  <span className="text-[#5f5e5e] font-medium block">Eligibility Criteria</span>
                  <span className="font-semibold text-[#191c1e]">{flat.eligibility}</span>
                </div>

                <div>
                  <span className="text-[#5f5e5e] font-medium block mb-1">Popular Estates</span>
                  <div className="flex flex-wrap gap-1">
                    {flat.estates.map((e, i) => (
                      <span
                        key={i}
                        className="bg-[#eceef0] text-[#191c1e] px-2 py-0.5 rounded text-[11px] font-medium"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e2dfde]">
                <p className="text-[11px] italic text-[#5f5e5e] leading-relaxed">
                  "{flat.recommendedFor}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
