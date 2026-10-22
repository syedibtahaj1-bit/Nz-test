import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Users, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Search,
  X,
  RotateCcw
} from 'lucide-react';
import { HISTORICAL_MILESTONES } from '../data/historyData';
import { HistoryMilestone } from '../types';

interface HistoryTimelineProps {
  completedModules: string[];
  onToggleModule: (moduleId: string) => void;
  onNavigateToQuiz: (category: string) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  completedModules,
  onToggleModule,
  onNavigateToQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(HISTORICAL_MILESTONES[3].id); // 1840 Treaty default

  const categories = [
    'all',
    'Foundations & Voyaging',
    'Treaty & Crown',
    'Social Rights',
    'Constitution & Governance',
    'Modern Aotearoa'
  ];

  // Filtered milestones based on both Category and Keyword Search
  const filteredMilestones = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return HISTORICAL_MILESTONES.filter(m => {
      // 1. Category filter
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      if (!matchesCategory) return false;

      // 2. Search keyword filter
      if (!query) return true;

      const titleMatch = m.title.toLowerCase().includes(query);
      const teReoMatch = m.teReoTitle ? m.teReoTitle.toLowerCase().includes(query) : false;
      const yearMatch = m.year.toLowerCase().includes(query);
      const periodMatch = m.period.toLowerCase().includes(query);
      const summaryMatch = m.summary.toLowerCase().includes(query);
      const significanceMatch = m.significance.toLowerCase().includes(query);
      const figuresMatch = m.keyFigures.some(figure => figure.toLowerCase().includes(query));
      const storyMatch = m.fullStory.some(p => p.toLowerCase().includes(query));

      return titleMatch || teReoMatch || yearMatch || periodMatch || summaryMatch || significanceMatch || figuresMatch || storyMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Ensure activeMilestone points to a valid item in filtered list if available
  const activeMilestone = useMemo(() => {
    if (filteredMilestones.length === 0) return null;
    const found = filteredMilestones.find(m => m.id === activeMilestoneId);
    return found || filteredMilestones[0];
  }, [filteredMilestones, activeMilestoneId]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-8">
      {/* Editorial Intro Banner with Integrated Search Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
          <span>AOTEAROA HISTORICAL CURRICULUM</span>
          <span aria-hidden="true">·</span>
          <span>FROM VOYAGING TO MODERN CITIZENSHIP</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            New Zealand Historical Milestones
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed">
            Understanding New Zealand’s past is central to becoming an active citizen. Explore key chapters—from the Polynesian voyagers and the signing of Te Tiriti o Waitangi to world-first women’s suffrage and the modern bicultural nation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="space-y-2 pt-1">
          <div className="relative max-w-2xl">
            <label htmlFor="milestones-search" className="sr-only">
              Search historical milestones
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
              <Search className="w-4 h-4" />
            </div>

            <input
              id="milestones-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') handleClearSearch();
              }}
              placeholder="Search milestones by keyword, year, figure, or Te Reo term (e.g. Waitangi, 1893, Kate Sheppard)..."
              className="w-full pl-10 pr-24 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-800 dark:focus:ring-emerald-500 focus:bg-white dark:focus:bg-stone-900 transition-all"
            />

            <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700 transition-colors"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-stone-200/70 dark:bg-stone-700/70 text-stone-600 dark:text-stone-300">
                {filteredMilestones.length} {filteredMilestones.length === 1 ? 'event' : 'events'}
              </span>
            </div>
          </div>

          {/* Quick search hints / active filter indicators */}
          {searchQuery && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-0.5">
              <span>
                Filtering by keyword: <strong className="text-emerald-900 dark:text-emerald-400">"{searchQuery}"</strong>
              </span>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleClearSearch}
                className="text-emerald-800 dark:text-emerald-400 hover:underline font-medium flex items-center gap-1"
              >
                <span>Clear search</span>
              </button>
              {selectedCategory !== 'all' && (
                <>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline"
                  >
                    Search across all eras
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-x-auto pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {cat === 'all' ? 'All Eras' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Master / Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols): Chronological Milestone Index Rail */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold px-1 pb-1">
            <span>
              Timeline ({filteredMilestones.length} {filteredMilestones.length === 1 ? 'Milestone' : 'Milestones'})
            </span>
            {searchQuery && (
              <span className="text-emerald-800 dark:text-emerald-400 font-mono normal-case">
                Filtered view
              </span>
            )}
          </div>

          {filteredMilestones.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                  No milestones found
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                  No historical events match <strong className="text-stone-700 dark:text-stone-300">"{searchQuery}"</strong>
                  {selectedCategory !== 'all' ? ` in the "${selectedCategory}" era.` : '.'}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900 dark:bg-emerald-800 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
              {filteredMilestones.map((item) => {
                const isSelected = activeMilestone ? item.id === activeMilestone.id : false;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMilestoneId(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-800 dark:ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-numbers font-bold text-emerald-900 dark:text-emerald-400 text-xs">
                          {item.year}
                        </span>
                        <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
                        <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm leading-snug">
                        {item.title}
                      </h3>

                      {item.teReoTitle && (
                        <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 italic">
                          {item.teReoTitle}
                        </p>
                      )}

                      <p className="text-stone-600 dark:text-stone-300 line-clamp-2 text-[11px] leading-relaxed pt-1">
                        {item.summary}
                      </p>

                      {/* Matching keyword tag if matched key figures or terms */}
                      {searchQuery && (
                        <div className="pt-1.5 flex flex-wrap gap-1">
                          {item.keyFigures.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase())).map((fig, fIdx) => (
                            <span key={fIdx} className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-[10px] font-medium">
                              Figure: {fig}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-emerald-800 dark:text-emerald-400 translate-x-0.5' : 'text-stone-300 dark:text-stone-600'
                    }`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Deep-Dive Reading Essay */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs sticky top-24 transition-colors">
          {activeMilestone ? (
            <>
              {/* Header Metadata */}
              <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-5">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-mono-numbers font-bold text-emerald-800 dark:text-emerald-400">{activeMilestone.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeMilestone.period}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-700 dark:text-stone-300 font-medium">{activeMilestone.category}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {activeMilestone.title}
                </h2>

                {activeMilestone.teReoTitle && (
                  <p className="text-sm font-medium text-emerald-900/90 dark:text-emerald-300 italic">
                    {activeMilestone.teReoTitle}
                  </p>
                )}
              </div>

              {/* Contextual Image Asset if related to Waitangi or Parliament or Flora */}
              {activeMilestone.id === 'm4' && (
                <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
                  <img
                    src="/src/assets/images/treaty_grounds_waitangi_1792586866722.jpg"
                    alt="Waitangi Treaty Grounds meeting house overlooking Bay of Islands"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-800 text-[11px] text-stone-500 dark:text-stone-400 italic">
                    Fig 1. Te Whare Rūnanga (Carved Meeting House) and Treaty Grounds at Waitangi, Bay of Islands.
                  </div>
                </div>
              )}

              {activeMilestone.id === 'm10' && (
                <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
                  <img
                    src="/src/assets/images/nz_parliament_beehive_1792586868678.jpg"
                    alt="New Zealand Parliament Beehive building in Wellington"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-800 text-[11px] text-stone-500 dark:text-stone-400 italic">
                    Fig 2. The Beehive (Executive Wing) and Parliamentary Library in Wellington.
                  </div>
                </div>
              )}

              {/* Narrative Body Prose with Drop Cap */}
              <div className="space-y-4 text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed">
                {activeMilestone.fullStory.map((paragraph, pIdx) => (
                  <p 
                    key={pIdx}
                    className={pIdx === 0 ? "first-letter:text-4xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-emerald-900 dark:first-letter:text-emerald-400" : ""}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Significance Callout */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Constitutional & Cultural Significance</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeMilestone.significance}
                </p>
              </div>

              {/* Key Figures & Quick Quiz Jump */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-500 dark:text-stone-400 font-medium">Key Historical Figures:</span>
                  <div className="text-stone-800 dark:text-stone-200 font-medium">
                    {activeMilestone.keyFigures.join(' · ')}
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToQuiz(activeMilestone.category === 'Treaty & Crown' ? 'treaty_and_history' : 'government_and_law')}
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  Test Knowledge on this Era
                </button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                No Article Selected
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Select an event from the timeline index to read the deep-dive historical context, significance, and key figures.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
