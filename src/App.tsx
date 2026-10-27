import React, { useState, useEffect } from 'react';
import { 
  UserProgress, 
  QuizResult, 
  CategoryId 
} from './types';
import { 
  loadUserProgress, 
  saveUserProgress, 
  toggleModuleCompletion, 
  recordTestResult, 
  toggleBookmarkQuestion, 
  toggleMasteredFlashcard,
  calculateProgressSummary,
  setDailyQuestionGoal
} from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewHero } from './components/OverviewHero';
import { StudyProgressTracker } from './components/StudyProgressTracker';
import { QuizEngine } from './components/QuizEngine';
import { HistoryTimeline } from './components/HistoryTimeline';
import { TreatyComparisonViewer } from './components/TreatyComparisonViewer';
import { CeremonyGuide } from './components/CeremonyGuide';
import { FlashcardsViewer } from './components/FlashcardsViewer';
import { ConsultancyView } from './components/ConsultancyView';
import { ReadinessCertificateModal } from './components/ReadinessCertificateModal';
import { AdMobBanner } from './components/AdMobBanner';
import { AdMobSetupModal } from './components/AdMobSetupModal';
import { AdMobInterstitialModal } from './components/AdMobInterstitialModal';
import { PremiumSubscriptionModal } from './components/PremiumSubscriptionModal';
import { QUESTION_CATEGORIES } from './data/citizenshipQuestions';
import { Award, Clock, ArrowRight } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeQuizMode, setActiveQuizMode] = useState<'mock_exam' | 'quick_drill' | 'category_focus' | 'missed_review' | null>(null);
  const [activeQuizCategory, setActiveQuizCategory] = useState<CategoryId | undefined>(undefined);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [historySubTab, setHistorySubTab] = useState<'milestones' | 'treaty'>('milestones');
  const [isAdMobModalOpen, setIsAdMobModalOpen] = useState(false);
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // Dark Mode Theme State with system fallback & localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Unable to write theme to localStorage', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const summary = calculateProgressSummary(progress);

  // Sync to local storage
  const handleToggleModule = (moduleId: string) => {
    setProgress(prev => toggleModuleCompletion(prev, moduleId));
  };

  const handleSaveQuizResult = (result: QuizResult) => {
    setProgress(prev => recordTestResult(prev, result));
    if (result.mode === 'mock_exam') {
      setTimeout(() => {
        setIsInterstitialOpen(true);
      }, 800);
    }
  };

  const handleToggleBookmark = (questionId: string) => {
    setProgress(prev => toggleBookmarkQuestion(prev, questionId));
  };

  const handleToggleMasteredFlashcard = (cardId: string) => {
    setProgress(prev => toggleMasteredFlashcard(prev, cardId));
  };

  const handleUpdateUserName = (name: string) => {
    setProgress(prev => {
      const updated = { ...prev, userName: name };
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleUpdateTargetDate = (date: string) => {
    setProgress(prev => {
      const updated = { ...prev, targetTestDate: date };
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleUpdateDailyGoal = (goal: number) => {
    setProgress(prev => setDailyQuestionGoal(prev, goal));
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      completedModules: [],
      completedTests: [],
      savedQuestions: [],
      missedQuestionIds: [],
      masteredFlashcards: [],
      userName: progress.userName || 'Aotearoa Candidate',
      targetTestDate: progress.targetTestDate || '',
      lastActiveDate: new Date().toISOString().split('T')[0],
      dailyQuestionGoal: progress.dailyQuestionGoal || 15,
      dailyActivity: {
        date: new Date().toISOString().split('T')[0],
        questionsAnswered: 0
      }
    };
    setProgress(fresh);
    saveUserProgress(fresh);
  };

  const handleStartQuiz = (
    mode: 'mock_exam' | 'quick_drill' | 'category_focus' | 'missed_review',
    category?: CategoryId
  ) => {
    setActiveQuizMode(mode);
    setActiveQuizCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitQuiz = () => {
    setActiveQuizMode(null);
    setActiveQuizCategory(undefined);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-900 selection:text-white transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveQuizMode(null);
        }}
        onOpenMockExam={() => handleStartQuiz('mock_exam')}
        moduleCompletionPercentage={summary.moduleCompletionPercentage}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        isSubscribed={!!progress.subscription?.isActive}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Active Quiz Engine Takes Priority */}
        {activeQuizMode ? (
          <QuizEngine
            initialMode={activeQuizMode}
            initialCategory={activeQuizCategory}
            missedQuestionIds={progress.missedQuestionIds}
            bookmarkedQuestionIds={progress.savedQuestions}
            onToggleBookmark={handleToggleBookmark}
            onSaveResult={handleSaveQuizResult}
            onBackToOverview={handleExitQuiz}
          />
        ) : (
          <>
            {/* View 1: Overview */}
            {activeTab === 'overview' && (
              <OverviewHero
                progress={progress}
                onNavigate={(tab) => setActiveTab(tab)}
                onStartQuiz={(mode) => handleStartQuiz(mode)}
                onUpdateDailyGoal={handleUpdateDailyGoal}
                onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
              />
            )}

            {/* View 2: Study Tracker / Modules */}
            {(activeTab === 'tracker' || activeTab === 'modules') && (
              <StudyProgressTracker
                progress={progress}
                onToggleModule={handleToggleModule}
                onUpdateUserName={handleUpdateUserName}
                onUpdateTargetDate={handleUpdateTargetDate}
                onStartQuiz={handleStartQuiz}
                onOpenCertificate={() => setIsCertificateOpen(true)}
                onNavigateToContent={(tab) => setActiveTab(tab)}
                onResetProgress={handleResetProgress}
              />
            )}

            {/* View 3: Practice Tests Hub */}
            {activeTab === 'tests' && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
                    <span>OFFICIAL-STYLE ASSESSMENT PRACTICE</span>
                    <span aria-hidden="true">·</span>
                    <span>PASS THRESHOLD 85%</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                    New Zealand Citizenship Practice Tests
                  </h1>
                  <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl leading-relaxed">
                    Evaluate your knowledge under authentic test conditions. The benchmark for citizenship readiness is 85% (17 out of 20 correct answers). Every attempt is automatically recorded in your study progress tracker.
                  </p>
                </div>

                {/* Test Modes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mode 1: Full Mock */}
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-semibold text-emerald-900 dark:text-emerald-400">SIMULATION</span>
                        <span className="font-mono-numbers">20 Questions · 25 min</span>
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100">
                        Full Official Mock Exam
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        Comprehensive randomized assessment covering all 5 core curriculum areas. Replicates real test timing and scoring.
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartQuiz('mock_exam')}
                      className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Start 20-Question Exam</span>
                    </button>
                  </div>

                  {/* Mode 2: Quick Drill */}
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-semibold text-sky-900 dark:text-sky-400">RAPID DRILL</span>
                        <span className="font-mono-numbers">10 Questions · Quick</span>
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100">
                        Quick Knowledge Check
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        Fast 10-question practice with instant explanations after every response. Ideal for daily study on the go.
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartQuiz('quick_drill')}
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Start Quick Drill</span>
                    </button>
                  </div>

                  {/* Mode 3: Missed Questions Focus */}
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-semibold text-amber-900 dark:text-amber-400">ADAPTIVE REVIEW</span>
                        <span className="font-mono-numbers">{progress.missedQuestionIds.length} Flagged</span>
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100">
                        Missed Questions Review
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        Practice specifically on questions you answered incorrectly in previous attempts until you achieve full recall.
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartQuiz('missed_review')}
                      disabled={progress.missedQuestionIds.length === 0}
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                        progress.missedQuestionIds.length > 0
                          ? 'bg-amber-800 hover:bg-amber-700 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
                      }`}
                    >
                      <span>Review Missed Questions</span>
                    </button>
                  </div>
                </div>

                {/* Category Topic Drills */}
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs">
                  <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100">
                    Practice by Topic Area
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.values(QUESTION_CATEGORIES).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleStartQuiz('category_focus', cat.id as CategoryId)}
                        className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-700 dark:hover:border-emerald-500 hover:bg-stone-50/70 dark:hover:bg-stone-800/60 text-left transition-all space-y-1.5 group"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 flex items-center justify-between">
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* View 4: NZ History & Te Tiriti */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                {/* Sub-tab switcher */}
                <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-xs max-w-sm">
                  <button
                    onClick={() => setHistorySubTab('milestones')}
                    className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                      historySubTab === 'milestones'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    Historical Milestones
                  </button>
                  <button
                    onClick={() => setHistorySubTab('treaty')}
                    className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                      historySubTab === 'treaty'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    Te Tiriti Comparison
                  </button>
                </div>

                {historySubTab === 'milestones' ? (
                  <HistoryTimeline
                    completedModules={progress.completedModules}
                    onToggleModule={handleToggleModule}
                    onNavigateToQuiz={(cat) => handleStartQuiz('category_focus', cat as CategoryId)}
                  />
                ) : (
                  <TreatyComparisonViewer
                    isTreatyModuleCompleted={progress.completedModules.includes('mod-treaty')}
                    onToggleTreatyModule={() => handleToggleModule('mod-treaty')}
                    onPracticeTreatyQuestions={() => handleStartQuiz('category_focus', 'treaty_and_history')}
                    candidateName={progress.userName}
                  />
                )}
              </div>
            )}

            {/* View 5: Ceremony Guide */}
            {activeTab === 'ceremony' && (
              <CeremonyGuide
                userName={progress.userName}
                isCeremonyModuleCompleted={progress.completedModules.includes('mod-ceremony')}
                onToggleCeremonyModule={() => handleToggleModule('mod-ceremony')}
              />
            )}

            {/* View 6: Flashcards */}
            {activeTab === 'flashcards' && (
              <FlashcardsViewer
                masteredFlashcards={progress.masteredFlashcards}
                onToggleMastered={handleToggleMasteredFlashcard}
              />
            )}

            {/* View 7: Professional Consultancy & Debit Card Payment */}
            {activeTab === 'consultancy' && (
              <ConsultancyView
                progress={progress}
                onUpdateProgress={(updated) => setProgress(updated)}
              />
            )}
          </>
        )}

        {/* Global Responsive Google AdMob Banner (Hidden during exam quizzes or for Premium Subscribers) */}
        {!activeQuizMode && !progress.subscription?.isActive && (
          <AdMobBanner 
            onOpenSettings={() => setIsAdMobModalOpen(true)}
            className="pt-6"
          />
        )}

      </main>

      {/* Printable Readiness Certificate Modal */}
      {isCertificateOpen && (
        <ReadinessCertificateModal
          progress={progress}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Google AdMob Setup & Verification Modal */}
      {isAdMobModalOpen && (
        <AdMobSetupModal
          onClose={() => setIsAdMobModalOpen(false)}
          onPreviewInterstitial={() => setIsInterstitialOpen(true)}
        />
      )}

      {/* Google AdMob Full-Screen Interstitial Ad Modal */}
      {isInterstitialOpen && (
        <AdMobInterstitialModal
          onClose={() => setIsInterstitialOpen(false)}
        />
      )}

      {/* Premium Service & Personal Tutor ($15) Subscription Modal */}
      {isSubscriptionModalOpen && (
        <PremiumSubscriptionModal
          progress={progress}
          onUpdateProgress={(updated) => setProgress(updated)}
          onClose={() => setIsSubscriptionModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer onOpenAdMobSetup={() => setIsAdMobModalOpen(true)} />
    </div>
  );
}
