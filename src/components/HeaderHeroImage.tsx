import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, ExternalLink, Sparkles, Building2, Home, Layers } from 'lucide-react';
import { PexelsPhoto, FALLBACK_HOUSING_PHOTOS } from '../../api/pexels';

const THEME_CHIPS = [
  { label: 'All Housing', query: '' },
  { label: 'Modern Apartments', query: 'modern apartment architecture' },
  { label: 'Singapore Architecture', query: 'singapore residential architecture' },
  { label: 'Minimalist Interior', query: 'minimalist interior design apartment' },
  { label: 'Urban High-Rise', query: 'modern housing building' },
];

export const HeaderHeroImage: React.FC = () => {
  const [photo, setPhoto] = useState<PexelsPhoto>(FALLBACK_HOUSING_PHOTOS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [sourceType, setSourceType] = useState<'pexels_api' | 'fallback'>('pexels_api');

  const fetchPhoto = async (queryParam?: string) => {
    setIsLoading(true);
    setIsImageLoaded(false);
    try {
      const q = queryParam !== undefined ? queryParam : activeQuery;
      const url = q ? `/api/pexels?query=${encodeURIComponent(q)}` : '/api/pexels';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.photo) {
          setPhoto(data.photo);
          setSourceType(data.source || 'pexels_api');
        }
      } else {
        // Fallback to random fallback
        const randomIdx = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
        setPhoto(FALLBACK_HOUSING_PHOTOS[randomIdx]);
      }
    } catch (err) {
      console.warn('Failed to fetch Pexels header photo:', err);
      const randomIdx = Math.floor(Math.random() * FALLBACK_HOUSING_PHOTOS.length);
      setPhoto(FALLBACK_HOUSING_PHOTOS[randomIdx]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial image when website shows
    fetchPhoto();
  }, []);

  const handleQuerySelect = (query: string) => {
    setActiveQuery(query);
    fetchPhoto(query);
  };

  const currentImageUrl =
    photo.src?.landscape || photo.src?.large2x || photo.src?.large || photo.src?.original;

  return (
    <div
      id="header-hero-banner"
      className="relative w-full rounded-3xl overflow-hidden border border-[#e7bdb8]/40 shadow-sm mb-8 bg-[#191c1e] text-white transition-all"
    >
      {/* Background Image Container with Gradient Overlays */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
        {/* Actual Image */}
        <img
          key={photo.id ? String(photo.id) : currentImageUrl}
          src={currentImageUrl}
          alt={photo.alt || 'Housing photography from Pexels'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isImageLoaded ? 'opacity-90 scale-100' : 'opacity-30 scale-105 blur-xs'
          }`}
        />

        {/* Ambient Dark Gradient Scrims for text contrast and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191c1e]/80 via-[#191c1e]/30 to-transparent" />

        {/* Top Badges & Dynamic Refresh Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#005fa6]/80 text-white backdrop-blur-md border border-white/20 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>SinglesHome SG</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-gray-200 backdrop-blur-md border border-white/10">
              <Camera className="w-3 h-3 text-[#79c2ff]" />
              <span>Pexels Live Housing Visual</span>
            </span>
          </div>

          <button
            onClick={() => fetchPhoto()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 hover:bg-white/25 active:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
            title="Fetch a new random housing photo from Pexels"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">{isLoading ? 'Fetching...' : 'New Image'}</span>
          </button>
        </div>

        {/* Main Content Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8c7fa] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Singapore Housing Intelligence & Grants
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              HDB Housing Options for Singles
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 drop-shadow-xs max-w-xl">
              Real-time calculation engine, grant optimization, and persuasive decision framework for Singaporean single home buyers.
            </p>
          </div>

          {/* Attribution & Photographer Credit */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            {photo.photographer && (
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] text-gray-200 flex items-center gap-1.5">
                <span className="text-gray-400">Photo:</span>
                <a
                  href={photo.photographer_url || photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:text-[#79c2ff] underline transition-colors flex items-center gap-0.5"
                >
                  <span>{photo.photographer}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-70" />
                </a>
                <span className="text-gray-400">on</span>
                <a
                  href={photo.url || 'https://www.pexels.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#79c2ff] hover:underline"
                >
                  Pexels
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Query Filter Chips Bottom Bar */}
      <div className="bg-[#24282c] border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Aesthetic Vibe:
          </span>
          {THEME_CHIPS.map((chip) => {
            const isSelected = activeQuery === chip.query;
            return (
              <button
                key={chip.label}
                onClick={() => handleQuerySelect(chip.query)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#005fa6] text-white font-semibold shadow-xs'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-gray-400 flex items-center gap-1 ml-auto">
          <span>API:</span>
          <span className="text-emerald-400 font-mono">Pexel_API_Key</span>
          <span className="text-gray-500">&bull;</span>
          <span>Auto-refreshed on load</span>
        </div>
      </div>
    </div>
  );
};
