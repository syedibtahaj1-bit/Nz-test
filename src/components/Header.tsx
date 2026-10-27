import React from 'react';
import { Award, Sun, Moon, Crown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMockExam: () => void;
  moduleCompletionPercentage: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenSubscription?: () => void;
  isSubscribed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMockExam,
  theme,
  toggleTheme,
  onOpenSubscription,
  isSubscribed = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 min-h-[4.5rem] py-1.5">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2 text-left group transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-900 text-stone-100 flex items-center justify-center font-editorial font-bold text-sm tracking-wide shadow-sm shrink-0">
              NZ
            </div>
            <span className="text-lg font-editorial font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap">
              NZ Citizenship
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'tracker'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Study Tracker
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'modules'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Study Modules
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'tests'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Practice Tests
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'history'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              NZ History & Te Tiriti
            </button>
            <button
              onClick={() => setActiveTab('ceremony')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'ceremony'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Ceremony Guide
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'flashcards'
                  ? 'text-emerald-900 dark:text-emerald-400 border-emerald-800 dark:border-emerald-500 font-semibold'
                  : 'border-transparent hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Flashcards
            </button>
          </nav>

          {/* Zone 3: Subscription button on top; Start Mock Exam button and dark mode button below it */}
          <div className="flex flex-col items-end justify-center gap-1.5 shrink-0 py-1">
            {/* Top: Subscription Button for Premium Service & Personal Tutor */}
            {onOpenSubscription && (
              <button
                onClick={onOpenSubscription}
                className={`w-full sm:w-auto px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  isSubscribed
                    ? 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold shadow-amber-900/10'
                }`}
                title="Premium Service & Personal Tutor ($15 NZD)"
              >
                <Crown className={`w-3.5 h-3.5 fill-current ${isSubscribed ? 'text-amber-600 dark:text-amber-400' : 'text-stone-950'}`} />
                <span>{isSubscribed ? 'Tutor Active' : 'Subscribe ($15)'}</span>
              </button>
            )}

            {/* Bottom: Start Mock Exam button and Dark Mode toggle button below Subscription button */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenMockExam}
                className="px-2.5 sm:px-3 py-1 text-xs font-medium text-white bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-emerald-300" />
                <span>Start Mock Exam</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-1 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-600" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-stone-200/80 dark:border-stone-800 gap-2.5 text-xs font-medium text-stone-600 dark:text-stone-300 no-scrollbar">
          {onOpenSubscription && (
            <button
              onClick={onOpenSubscription}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md flex items-center gap-1 font-bold shrink-0 ${
                isSubscribed
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-amber-400 text-stone-950 shadow-xs'
              }`}
            >
              <Crown className="w-3 h-3 fill-current" />
              <span>{isSubscribed ? 'Tutor' : 'Tutor ($15)'}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'tracker' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'modules' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'tests' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'history' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            History & Treaty
          </button>
          <button
            onClick={() => setActiveTab('ceremony')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'ceremony' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Ceremony
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap px-2 py-1 rounded shrink-0 ${activeTab === 'flashcards' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Flashcards
          </button>
        </div>
      </div>
    </header>
  );
};
