import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  ChevronRight, 
  Scale, 
  HeartHandshake, 
  Target, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  Zap,
  Crown,
  CreditCard,
  Phone
} from 'lucide-react';
import { UserProgress } from '../types';
import { calculateProgressSummary, getTodayQuestionsAnswered } from '../utils/storage';

interface OverviewHeroProps {
  progress: UserProgress;
  onNavigate: (tab: string) => void;
  onStartQuiz: (mode: 'mock_exam' | 'quick_drill') => void;
  onUpdateDailyGoal?: (goal: number) => void;
  onOpenSubscription?: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  progress,
  onNavigate,
  onStartQuiz,
  onUpdateDailyGoal,
  onOpenSubscription
}) => {
  const summary = calculateProgressSummary(progress);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const currentGoal = progress.dailyQuestionGoal || 15;
  const [customGoalInput, setCustomGoalInput] = useState<string>(String(currentGoal));

  const questionsAnsweredToday = getTodayQuestionsAnswered(progress);
  const progressPercent = Math.min(100, Math.round((questionsAnsweredToday / currentGoal) * 100));
  const isGoalAchieved = questionsAnsweredToday >= currentGoal;
  const remainingQuestions = Math.max(0, currentGoal - questionsAnsweredToday);

  // SVG Progress Ring calculations
  const ringRadius = 22;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  const handleSelectPreset = (preset: number) => {
    if (onUpdateDailyGoal) {
      onUpdateDailyGoal(preset);
    }
    setCustomGoalInput(String(preset));
    setIsEditingGoal(false);
  };

  const handleSaveCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customGoalInput, 10);
    if (!isNaN(val) && val > 0 && onUpdateDailyGoal) {
      onUpdateDailyGoal(val);
      setIsEditingGoal(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section Split */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 text-white shadow-sm min-h-[440px] flex flex-col justify-end">
        {/* Background Landscape Photo with measured contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_aotearoa_landscape_1792586866004.jpg"
            alt="Southern Alps reflection over alpine lake with silver fern fronds"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-900/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400">
            <span>KIA ORA & WELCOME TO AOTEAROA</span>
            <span aria-hidden="true">·</span>
            <span>CITIZENSHIP STUDY PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-white tracking-tight leading-tight">
            Prepare for New Zealand Citizenship with Confidence
          </h1>

          <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            Master the essential historical compacts, democratic systems, and bicultural foundations of New Zealand. Track your module completion, take realistic practice exams, and prepare for your ceremony declaration.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('tracker')}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-200" />
              <span>Open Study Progress Tracker ({summary.moduleCompletionPercentage}% Done)</span>
            </button>

            <button
              onClick={() => onStartQuiz('mock_exam')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Simulate 20-Question Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Study Goal Feature Card with Small Progress Ring */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Progress Ring + Goal Status */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Small Circular Progress Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                {/* Track circle */}
                <circle
                  cx="28"
                  cy="28"
                  r={ringRadius}
                  className="stroke-stone-100 dark:stroke-stone-800"
                  strokeWidth="4.5"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="28"
                  cy="28"
                  r={ringRadius}
                  className={
                    isGoalAchieved
                      ? "stroke-emerald-600 dark:stroke-emerald-400 transition-all duration-500"
                      : "stroke-emerald-700 dark:stroke-emerald-500 transition-all duration-500"
                  }
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              
              {/* Inner ring content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isGoalAchieved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="text-[11px] font-mono font-bold text-stone-800 dark:text-stone-200">
                    {progressPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Target & Counts */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>Daily Study Target</span>
                </span>
                {isGoalAchieved && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Goal Met Today!</span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100">
                  {questionsAnsweredToday}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  / {currentGoal} practice questions completed today
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300">
                {isGoalAchieved
                  ? "Ka pai! You have achieved your daily practice target. Keep going or review your flashcards."
                  : `${remainingQuestions} more question${remainingQuestions === 1 ? '' : 's'} needed today to reach your target.`}
              </p>
            </div>
          </div>

          {/* Right: Goal Adjuster & Action Trigger */}
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-stone-800">
            {/* Preset Goal Selectors */}
            {!isEditingGoal ? (
              <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 px-2 font-medium hidden sm:inline">
                  Daily Goal:
                </span>
                {[10, 15, 20, 30].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      currentGoal === preset
                        ? 'bg-emerald-800 dark:bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-700/60'
                    }`}
                  >
                    {preset} Qs
                  </button>
                ))}
                <button
                  onClick={() => setIsEditingGoal(true)}
                  className="px-2 py-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 rounded-lg transition-colors"
                  title="Custom goal"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveCustomGoal} className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(e.target.value)}
                  className="w-20 px-2.5 py-1 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Target"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-800 dark:bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingGoal(false)}
                  className="px-2.5 py-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Quick Practice Trigger Button */}
            <button
              onClick={() => onStartQuiz('quick_drill')}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              <span>{isGoalAchieved ? "Practice 10 More" : "Practice 10 Questions"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4-Column Quick Status Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Curriculum Modules
          </span>
          <div className="text-2xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100 mt-1">
            {summary.completedModulesCount} / {summary.totalModules}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            {summary.moduleCompletionPercentage}% completed
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Test Performance
          </span>
          <div className="text-2xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100 mt-1">
            {summary.totalTestsTaken > 0 ? `${summary.averageTestScore}%` : '—'}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            {summary.totalTestsTaken} practice attempt{summary.totalTestsTaken !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Official Pass Mark
          </span>
          <div className="text-2xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100 mt-1">
            85%
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            17 of 20 correct answers
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            Readiness Index
          </span>
          <div className="text-2xl font-bold font-mono-numbers text-emerald-900 dark:text-emerald-400 mt-1">
            {summary.readinessScore}%
          </div>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium mt-1">
            {summary.readinessLabel}
          </p>
        </div>
      </div>

      {/* Premium Service & Personal Tutor ($15) Subscription Banner */}
      {onOpenSubscription && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white p-5 sm:p-6 shadow-md border border-emerald-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-lg mt-0.5">
                <Crown className="w-6 h-6 fill-current" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-editorial font-bold text-base sm:text-lg text-white">
                    Premium Service & 1-on-1 Personal Tutor
                  </span>
                  <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full font-mono text-[10px] font-bold">
                    $15 NZD / Month
                  </span>
                  {progress.savedDebitCard ? (
                    <span className="px-2 py-0.5 bg-white/10 text-emerald-200 rounded-full font-mono text-[10px] flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-amber-300" />
                      <span>Card •••• {progress.savedDebitCard.last4} Saved</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-white/10 text-stone-300 rounded-full font-mono text-[10px] flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-stone-400" />
                      <span>No Card Saved</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                  {progress.subscription?.isActive ? (
                    <span>Your personal tutor <strong>Aroha Henderson, LLB</strong> is actively assigned to your citizenship test preparation. Call or message your tutor anytime at <strong>+64 21 029 4812</strong>.</span>
                  ) : (
                    <span>Accelerate your preparation with private 1-on-1 personal tutoring, Te Reo Māori oath coaching, DIA presence audit, and priority review.</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {progress.subscription?.isActive ? (
                <>
                  <a
                    href="tel:+64210294812"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Call Tutor</span>
                  </a>
                  <button
                    onClick={onOpenSubscription}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Manage Tutor ($15)
                  </button>
                </>
              ) : (
                <button
                  onClick={onOpenSubscription}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Crown className="w-4 h-4 fill-current" />
                  <span>{progress.savedDebitCard ? 'Subscribe with Saved Card ($15)' : 'Subscribe to Premium ($15)'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Study Progress Tracker */}
        <div 
          onClick={() => onNavigate('tracker')}
          className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 rounded-2xl p-6 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-950 dark:group-hover:text-emerald-400 transition-colors">
              Study Progress Tracker
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Mark off the 12 core study curriculum modules as you learn, track your test score averages, and view your candidate readiness rating.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-medium text-emerald-900 dark:text-emerald-400">
            <span>Open Tracker</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Te Tiriti o Waitangi */}
        <div 
          onClick={() => onNavigate('history')}
          className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 rounded-2xl p-6 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-950 dark:group-hover:text-emerald-400 transition-colors">
              Te Tiriti & NZ History
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Side-by-side comparative analysis of the Māori and English texts of the Treaty, plus an interactive timeline from Kupe’s voyage to modern day.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-medium text-emerald-900 dark:text-emerald-400">
            <span>Explore History</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Ceremony Guide & Oaths */}
        <div 
          onClick={() => onNavigate('ceremony')}
          className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 rounded-2xl p-6 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-950 dark:group-hover:text-emerald-400 transition-colors">
              Ceremony Guide & Anthem
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Study the Oath and Affirmation of Allegiance in English and Te Reo Māori, follow national anthem lyrics, and see post-ceremony civic tasks.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-medium text-emerald-900 dark:text-emerald-400">
            <span>Walkthrough Ceremony</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
