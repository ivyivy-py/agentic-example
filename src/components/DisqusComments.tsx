import React, { useState, useMemo, useEffect } from 'react';
import { MessageSquare, Globe, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';

export interface ArticleConfig {
  id: string;
  title: string;
  url: string;
  category?: string;
  summary?: string;
}

const DEFAULT_ARTICLES: ArticleConfig[] = [
  {
    id: 'hdb-singles-calculator-main',
    title: 'HDB Housing Options for Singles Calculator & Strategy Discussion',
    url: typeof window !== 'undefined' ? window.location.origin + '/#calculator' : 'https://singleshome-sg.web.app/#calculator',
    category: 'Calculator & Housing Strategy',
    summary: 'Share your questions on Singles grant calculations, MSR ratios, loan options, and affordability limits.',
  },
  {
    id: 'hdb-singles-grants-eligibility',
    title: 'CPF Housing Grants & Single Citizen Scheme Eligibility 2026',
    url: typeof window !== 'undefined' ? window.location.origin + '/#grants' : 'https://singleshome-sg.web.app/#grants',
    category: 'Grants & Eligibility',
    summary: 'Discuss Enhanced CPF Housing Grant (EHG), Proximity Housing Grant (PHG), and age 35 rules.',
  },
  {
    id: 'hdb-singles-resale-vs-bto',
    title: 'Singles BTO 2-Room Flexi vs Resale Flat Decision Framework',
    url: typeof window !== 'undefined' ? window.location.origin + '/#bto-resale' : 'https://singleshome-sg.web.app/#bto-resale',
    category: 'BTO vs Resale',
    summary: 'Compare waiting times, Standard/Plus/Prime classifications, renovation costs, and estate amenities.',
  },
  {
    id: 'hdb-singles-persuasive-design',
    title: 'Persuasive Design & DOET Principles in Housing Interfaces',
    url: typeof window !== 'undefined' ? window.location.origin + '/#persuasive-tech' : 'https://singleshome-sg.web.app/#persuasive-tech',
    category: 'UI/UX Case Study',
    summary: 'Academic & UX critique on Norman conceptual models, feedback loops, and cognitive nudges.',
  },
];

const LANGUAGE_OPTIONS = [
  { code: 'zh_TW', label: '繁體中文 (Traditional Chinese - Taiwan)' },
  { code: 'en', label: 'English (Default)' },
  { code: 'zh_CN', label: '简体中文 (Simplified Chinese)' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
];

interface DisqusCommentsProps {
  article?: ArticleConfig;
  shortname?: string;
  defaultLanguage?: string;
  showTopicSelector?: boolean;
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({
  article: propArticle,
  shortname = 'sample-oqdiekwyrl',
  defaultLanguage = 'zh_TW',
  showTopicSelector = true,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    propArticle?.id || DEFAULT_ARTICLES[0].id
  );
  const [language, setLanguage] = useState<string>(defaultLanguage);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const activeArticle = useMemo(() => {
    if (propArticle) {
      return propArticle;
    }
    const found = DEFAULT_ARTICLES.find((a) => a.id === selectedArticleId);
    return found || DEFAULT_ARTICLES[0];
  }, [propArticle, selectedArticleId]);

  // Construct canonical URL
  const currentUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}?topic=${encodeURIComponent(activeArticle.id)}`;
    }
    return activeArticle.url;
  }, [activeArticle.id, activeArticle.url]);

  // Initialize or reset Disqus thread with configuration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pageUrl = currentUrl;
    const pageId = activeArticle.id;
    const pageTitle = activeArticle.title;
    const lang = language;

    // Define disqus_config callback safely
    (window as any).disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageId;
      this.page.title = pageTitle;
      if (lang) {
        this.language = lang;
      }
    };

    let timer: NodeJS.Timeout | null = null;

    try {
      if ((window as any).DISQUS) {
        // Delay slightly to ensure #disqus_thread is rendered in DOM after state updates
        timer = setTimeout(() => {
          try {
            (window as any).DISQUS.reset({
              reload: true,
              config: (window as any).disqus_config,
            });
          } catch (err) {
            console.warn('Disqus reset error:', err);
          }
        }, 50);
      } else {
        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = `https://${shortname}.disqus.com/embed.js`;
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.crossOrigin = 'anonymous';
          s.onerror = (e) => {
            console.warn(`Disqus embed script for '${shortname}' could not be loaded.`);
          };
          (d.head || d.body).appendChild(s);
        }
      }
    } catch (err) {
      console.warn('Disqus initialization caught error:', err);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [shortname, currentUrl, activeArticle.id, activeArticle.title, language, reloadKey]);

  const handleRefresh = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <section
      id="disqus-discussion-section"
      className="bg-white rounded-2xl border border-[#e7bdb8]/50 shadow-sm p-6 sm:p-8 space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dfde] pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#005fa6]/10 text-[#005fa6] flex items-center justify-center font-bold shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#191c1e]">
                Community Discussion & Comments
              </h3>
              <span className="bg-[#005fa6]/10 text-[#005fa6] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Disqus
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5f5e5e] mt-0.5">
              Powered by Disqus forum (<code className="text-[#005fa6] font-mono font-semibold">{shortname}</code>) &bull; Share your questions, reviews, or grant advice
            </p>
          </div>
        </div>

        {/* Controls: Language & Refresh */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#f8f9fb] border border-[#e7bdb8]/70 rounded-xl px-3 py-1.5 text-xs">
            <Globe className="w-4 h-4 text-[#005fa6]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent font-medium text-[#191c1e] focus:outline-none cursor-pointer"
              title="Change Disqus Discussion Language"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#e2dfde] text-xs font-medium text-[#5f5e5e] hover:text-[#191c1e] hover:bg-[#f8f9fb] transition-colors"
            title="Reload comment thread"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Topic Switcher (if multiple topics supported) */}
      {showTopicSelector && !propArticle && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider block">
            Discussion Thread / Topic
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {DEFAULT_ARTICLES.map((art) => {
              const isSelected = art.id === selectedArticleId;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#005fa6] bg-[#005fa6]/5 text-[#005fa6] font-semibold ring-1 ring-[#005fa6]'
                      : 'border-[#e2dfde] bg-[#f8f9fb] text-[#5f5e5e] hover:border-[#e7bdb8] hover:text-[#191c1e]'
                  }`}
                >
                  <span className="font-semibold text-[13px] text-[#191c1e] line-clamp-1 mb-1">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-[#5f5e5e] line-clamp-2 leading-relaxed">
                    {art.summary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Thread Meta Card */}
      <div className="bg-[#f8f9fb] rounded-xl p-4 border border-[#e2dfde] text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#191c1e]">{activeArticle.title}</span>
          </div>
          <p className="text-[#5f5e5e] text-[11px]">
            Identifier: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#e2dfde] text-[#005fa6]">{activeArticle.id}</code> &bull; Language: <span className="font-medium text-[#191c1e]">{language}</span>
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#5f5e5e] bg-white px-2.5 py-1 rounded-lg border border-[#e2dfde]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Real-time Sync & Moderation Enabled</span>
        </div>
      </div>

      {/* Disqus Embed Element */}
      <div className="min-h-[280px] w-full pt-2">
        <div id="disqus_thread" key={`${activeArticle.id}-${language}-${reloadKey}`}></div>
        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" rel="nofollow">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>

      {/* Footer / Help note */}
      <div className="pt-4 border-t border-[#e2dfde] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5f5e5e]">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#005fa6]" />
          <span>
            Comments are moderated and synced via Disqus Forum (<code className="font-mono text-[#005fa6]">{shortname}</code>).
          </span>
        </div>
        <a
          href={`https://disqus.com/home/forums/${shortname}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#005fa6] font-medium hover:underline text-xs"
        >
          Open in Disqus &rarr;
        </a>
      </div>
    </section>
  );
};
