import React from 'react';
import { Award, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMockExam: () => void;
  moduleCompletionPercentage: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMockExam,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
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

          {/* Zone 3: 1 primary action + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            <button
              onClick={onOpenMockExam}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Start Mock Exam</span>
            </button>
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-stone-200/80 dark:border-stone-800 gap-4 text-xs font-medium text-stone-600 dark:text-stone-300 no-scrollbar">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'tracker' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'modules' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'tests' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'history' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            History & Treaty
          </button>
          <button
            onClick={() => setActiveTab('ceremony')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'ceremony' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Ceremony
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'flashcards' ? 'text-emerald-950 dark:text-emerald-300 font-bold bg-stone-200/70 dark:bg-stone-800' : ''}`}
          >
            Flashcards
          </button>
        </div>
      </div>
    </header>
  );
};
