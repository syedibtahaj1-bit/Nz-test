import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  RotateCcw, 
  FileText,
  AlertCircle,
  Activity,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend
} from 'recharts';
import { UserProgress, QuizResult, CategoryId } from '../types';
import { STUDY_MODULES } from '../data/studyModulesData';
import { QUESTION_CATEGORIES } from '../data/citizenshipQuestions';
import { calculateProgressSummary } from '../utils/storage';

interface StudyProgressTrackerProps {
  progress: UserProgress;
  onToggleModule: (moduleId: string) => void;
  onUpdateUserName: (name: string) => void;
  onUpdateTargetDate: (date: string) => void;
  onStartQuiz: (mode: 'mock_exam' | 'quick_drill' | 'category_focus', category?: CategoryId) => void;
  onOpenCertificate: () => void;
  onNavigateToContent: (tab: string, itemId?: string) => void;
  onResetProgress: () => void;
}

export const StudyProgressTracker: React.FC<StudyProgressTrackerProps> = ({
  progress,
  onToggleModule,
  onUpdateUserName,
  onUpdateTargetDate,
  onStartQuiz,
  onOpenCertificate,
  onNavigateToContent,
  onResetProgress
}) => {
  const summary = calculateProgressSummary(progress);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(progress.userName);
  const [tempDate, setTempDate] = useState(progress.targetTestDate || '');

  const filteredModules = selectedCategoryFilter === 'all'
    ? STUDY_MODULES
    : STUDY_MODULES.filter(m => m.category === selectedCategoryFilter);

  // Chronological score history data for recharts (oldest to newest)
  const chartData = [...progress.completedTests]
    .reverse()
    .map((test, index) => ({
      attemptLabel: `Test #${index + 1}`,
      shortDate: test.date,
      score: test.percentage,
      passBenchmark: 85,
      mode: test.mode === 'mock_exam' 
        ? 'Full Mock Exam (20 Qs)' 
        : test.mode === 'quick_drill' 
        ? 'Quick Drill (10 Qs)' 
        : 'Category Drill',
      correctRatio: `${test.correctCount}/${test.totalQuestions}`,
      passed: test.passed,
      timeSeconds: test.timeSpentSeconds
    }));

  const scoreDelta = chartData.length > 1
    ? chartData[chartData.length - 1].score - chartData[0].score
    : null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    onUpdateTargetDate(tempDate);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Candidate greeting */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400">
              <span>AOTEAROA CITIZENSHIP CANDIDATE</span>
              <span aria-hidden="true">·</span>
              <span>OFFICIAL PREPARATION ROADMAP</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-editorial font-bold text-white tracking-tight">
              Tēnā koe, {progress.userName}
            </h1>
            <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
              Track your mastery of New Zealand history, Te Tiriti o Waitangi, democratic institutions, and civic responsibilities. Complete all 12 modules and target an 85%+ practice test score to ensure citizenship readiness.
            </p>
            {progress.targetTestDate && (
              <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target Ceremony / Assessment Date: <strong className="text-stone-200">{progress.targetTestDate}</strong></span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3.5 py-2 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700 whitespace-nowrap"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Candidate Details'}
            </button>
            <button
              onClick={() => onStartQuiz('mock_exam')}
              className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Simulate 20-Question Exam</span>
            </button>
          </div>
        </div>

        {/* Profile edit inline drawer */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Your Full Name</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Candidate Name"
                className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-stone-300 font-medium mb-1">Target Date (Optional)</label>
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
              >
                Save Candidate Profile
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Module Completion */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Study Modules</span>
            <BookOpen className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100">
              {summary.moduleCompletionPercentage}%
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-numbers">
              ({summary.completedModulesCount}/{summary.totalModules} completed)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-700 dark:bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${summary.moduleCompletionPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
            {summary.totalModules - summary.completedModulesCount} remaining to complete
          </p>
        </div>

        {/* Metric 2: Average Test Score */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Practice Test Average</span>
            <TrendingUp className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100">
              {summary.totalTestsTaken > 0 ? `${summary.averageTestScore}%` : '—'}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-numbers">
              {summary.totalTestsTaken > 0 ? `(${summary.totalTestsTaken} tests)` : '(No tests yet)'}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                summary.averageTestScore >= 85 ? 'bg-emerald-600 dark:bg-emerald-500' : summary.averageTestScore >= 65 ? 'bg-sky-600 dark:bg-sky-500' : 'bg-amber-500'
              }`}
              style={{ width: `${summary.averageTestScore}%` }}
            />
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
            Official pass benchmark: 85% (17 / 20)
          </p>
        </div>

        {/* Metric 3: Latest Test Result */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Latest Test Score</span>
            <Award className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100">
              {summary.latestTestScore !== null ? `${summary.latestTestScore}%` : '—'}
            </span>
            {summary.latestTestScore !== null && (
              <span className={`text-xs font-medium ${summary.latestTestScore >= 85 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                {summary.latestTestScore >= 85 ? 'Passed' : 'Needs Review'}
              </span>
            )}
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span>Highest Score</span>
            <span className="font-mono-numbers font-semibold text-stone-800 dark:text-stone-200">
              {summary.totalTestsTaken > 0 ? `${summary.highestTestScore}%` : '—'}
            </span>
          </div>
        </div>

        {/* Metric 4: Readiness Index */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
              <span className="font-medium text-stone-700 dark:text-stone-300">Citizenship Readiness</span>
              <Sparkles className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold font-mono-numbers text-stone-900 dark:text-stone-100">
                {summary.readinessScore}%
              </span>
            </div>
            <div className="mt-1">
              <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
                {summary.readinessLabel}
              </span>
            </div>
          </div>

          <div className="pt-2 mt-2">
            {summary.readinessScore >= 85 ? (
              <button
                onClick={onOpenCertificate}
                className="w-full text-xs font-medium text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 underline flex items-center justify-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Readiness Certificate</span>
              </button>
            ) : (
              <p className="text-[11px] text-stone-400 dark:text-stone-500">
                Aim for 85%+ to generate your certificate.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Score History Line Chart Section */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-xs space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>PERFORMANCE METRICS</span>
              <span aria-hidden="true">·</span>
              <span>CHRONOLOGICAL SCORE TRAJECTORY</span>
            </div>
            <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Quiz Score History Over Time
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
              Monitor your assessment scores across consecutive attempts compared against the official 85% passing benchmark (17 / 20 correct).
            </p>
          </div>

          {chartData.length > 0 && (
            <div className="flex items-center gap-4 text-xs font-mono-numbers shrink-0">
              <div className="text-right">
                <span className="text-stone-400 block text-[11px]">Latest Score</span>
                <span className={`text-base font-bold ${summary.latestTestScore !== null && summary.latestTestScore >= 85 ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-800 dark:text-stone-200'}`}>
                  {summary.latestTestScore}%
                </span>
              </div>
              {scoreDelta !== null && (
                <div className="text-right pl-3 border-l border-stone-100 dark:border-stone-800">
                  <span className="text-stone-400 block text-[11px]">Trajectory</span>
                  <span className={`text-sm font-bold ${scoreDelta >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {scoreDelta >= 0 ? `+${scoreDelta}%` : `${scoreDelta}%`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chart Area */}
        {chartData.length === 0 ? (
          <div className="py-12 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl p-6 text-center space-y-3 bg-stone-50/50 dark:bg-stone-800/30">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                No Test History Recorded Yet
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                Take your first 20-question mock exam or 10-question quick drill. Your scores over time will automatically be plotted on this line chart with the 85% pass line.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onStartQuiz('mock_exam')}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Start 20-Question Mock Exam</span>
              </button>
              <button
                onClick={() => onStartQuiz('quick_drill')}
                className="px-4 py-2 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 rounded-lg text-xs font-medium transition-colors"
              >
                Take 10-Question Drill
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 16, right: 30, left: -10, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#78716c" opacity={0.2} vertical={false} />
                  <XAxis 
                    dataKey="attemptLabel" 
                    stroke="#a8a29e" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#78716c', opacity: 0.3 }} 
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    ticks={[0, 25, 50, 75, 85, 100]} 
                    stroke="#a8a29e" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#78716c', opacity: 0.3 }} 
                    tickFormatter={(val) => `${val}%`} 
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-3.5 shadow-xl text-xs space-y-2 min-w-[210px]">
                            <div className="flex items-center justify-between pb-1.5 border-b border-stone-100 dark:border-stone-700 text-[11px] text-stone-500 dark:text-stone-400">
                              <span className="font-semibold text-stone-800 dark:text-stone-200">{data.attemptLabel}</span>
                              <span>{data.shortDate}</span>
                            </div>
                            <div className="text-stone-700 dark:text-stone-300 font-medium text-[11px]">
                              {data.mode}
                            </div>
                            <div className="flex items-baseline justify-between pt-1">
                              <span className="text-stone-500 dark:text-stone-400">Score:</span>
                              <span className={`font-mono-numbers font-bold text-sm ${data.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                {data.score}% ({data.correctRatio})
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100 dark:border-stone-700">
                              <span className="text-stone-400">Pass Benchmark:</span>
                              <span className="font-mono-numbers text-stone-600 dark:text-stone-300 font-medium">85%</span>
                            </div>
                            <div className="pt-0.5">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                data.passed 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400' 
                                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400'
                              }`}>
                                {data.passed ? 'Passed (≥85%)' : 'Needs Review'}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine 
                    y={85} 
                    stroke="#10b981" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5} 
                    label={{ 
                      value: '85% Pass Benchmark', 
                      position: 'insideTopRight', 
                      fill: '#10b981', 
                      fontSize: 11, 
                      fontWeight: 600,
                      offset: 8
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    name="Score Percentage" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    dot={{ r: 4.5, fill: '#059669', strokeWidth: 2, stroke: '#ecfdf5' }} 
                    activeDot={{ r: 7, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend / Info Strip */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 inline-block rounded-full" />
                  <span>Your Score (%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-emerald-500 inline-block" />
                  <span>Official 85% Target</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 dark:text-stone-500">
                {chartData.length} recorded assessment{chartData.length !== 1 ? 's' : ''} plotted chronologically
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Split: Modules Checklist & Test History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Interactive Study Modules Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
            <div>
              <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
                Study Modules Curriculum
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Mark each core topic as you review and master its key concepts.
              </p>
            </div>

            {/* Interactive filter segmented buttons (clean tabs) */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-x-auto">
              <button
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                All ({STUDY_MODULES.length})
              </button>
              <button
                onClick={() => setSelectedCategoryFilter('treaty_and_history')}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === 'treaty_and_history'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Te Tiriti & History
              </button>
              <button
                onClick={() => setSelectedCategoryFilter('government_and_law')}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === 'government_and_law'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Government
              </button>
              <button
                onClick={() => setSelectedCategoryFilter('maori_culture')}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === 'maori_culture'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                Te Ao Māori
              </button>
            </div>
          </div>

          {/* Module List */}
          <div className="space-y-3">
            {filteredModules.map((module) => {
              const isCompleted = progress.completedModules.includes(module.id);
              const isExpanded = expandedModuleId === module.id;
              const categoryMeta = QUESTION_CATEGORIES[module.category];

              return (
                <div
                  key={module.id}
                  className={`border rounded-xl transition-all duration-200 bg-white dark:bg-stone-900 ${
                    isCompleted 
                      ? 'border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/20' 
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex items-start gap-3.5">
                    {/* Toggle Checkbox Button */}
                    <button
                      onClick={() => onToggleModule(module.id)}
                      className="mt-0.5 text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus:outline-none shrink-0"
                      aria-label={isCompleted ? `Mark ${module.title} as incomplete` : `Mark ${module.title} as complete`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300 dark:text-stone-600 hover:text-stone-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Unboxed metadata row with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
                        <span className="font-medium text-stone-700 dark:text-stone-300">{categoryMeta?.name || 'Curriculum'}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono-numbers">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {module.estimatedMinutes} min
                        </span>
                        {isCompleted && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Completed</span>
                          </>
                        )}
                      </div>

                      <h3 className={`text-base font-semibold transition-colors ${
                        isCompleted ? 'text-stone-700 dark:text-stone-300' : 'text-stone-900 dark:text-stone-100'
                      }`}>
                        {module.title}
                      </h3>

                      {module.teReoTitle && (
                        <p className="text-xs text-emerald-900/80 dark:text-emerald-400/80 italic font-medium mt-0.5">
                          {module.teReoTitle}
                        </p>
                      )}

                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed line-clamp-2">
                        {module.description}
                      </p>

                      {/* Expand / Collapse toggle */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                        <button
                          onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                          className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 font-medium flex items-center gap-1 transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Key Concepts' : 'Show Key Concepts'}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onStartQuiz('category_focus', module.category)}
                            className="text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 font-medium hover:underline"
                          >
                            Practice Questions
                          </button>
                          <button
                            onClick={() => onToggleModule(module.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                              isCompleted
                                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                : 'bg-emerald-800 dark:bg-emerald-700 text-white hover:bg-emerald-900 dark:hover:bg-emerald-600'
                            }`}
                          >
                            {isCompleted ? 'Undo Completion' : 'Mark Complete'}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Key Points */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-stone-200/70 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/60 rounded-lg p-3 text-xs space-y-2">
                          <div className="font-semibold text-stone-800 dark:text-stone-200">Essential Knowledge Points:</div>
                          <ul className="space-y-1.5 text-stone-600 dark:text-stone-300">
                            {module.keyPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold leading-none mt-0.5">•</span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Test History & Category Strengths */}
        <div className="space-y-6">
          
          {/* Quick Quiz launcher box */}
          <div className="bg-stone-100/80 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>Practice Mode Shortcuts</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Test your knowledge under realistic conditions. All completed test scores are saved to your profile.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onStartQuiz('mock_exam')}
                className="w-full py-2.5 px-3 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white text-xs font-medium rounded-lg text-center transition-colors flex items-center justify-between"
              >
                <span>Full Official Mock (20 Qs)</span>
                <span className="font-mono-numbers opacity-80">25 min</span>
              </button>
              <button
                onClick={() => onStartQuiz('quick_drill')}
                className="w-full py-2.5 px-3 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-lg text-center transition-colors flex items-center justify-between"
              >
                <span>Quick Knowledge Drill (10 Qs)</span>
                <span className="font-mono-numbers text-stone-500 dark:text-stone-400">Instant</span>
              </button>
              {progress.missedQuestionIds.length > 0 && (
                <button
                  onClick={() => onStartQuiz('category_focus')}
                  className="w-full py-2.5 px-3 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-medium rounded-lg text-center transition-colors flex items-center justify-between"
                >
                  <span>Review {progress.missedQuestionIds.length} Missed Question{progress.missedQuestionIds.length > 1 ? 's' : ''}</span>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                </button>
              )}
            </div>
          </div>

          {/* Stored Practice Test Scores Log */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Stored Test Results
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {progress.completedTests.length} recorded session{progress.completedTests.length !== 1 ? 's' : ''}
                </p>
              </div>

              {progress.completedTests.length > 0 && (
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-numbers">
                  Avg: {summary.averageTestScore}%
                </span>
              )}
            </div>

            {progress.completedTests.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-500 dark:text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-lg p-4">
                <FileText className="w-6 h-6 text-stone-400 mx-auto mb-2 opacity-60" />
                <p className="font-medium text-stone-700 dark:text-stone-300">No practice tests taken yet</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Take your first 20-question mock exam to see your diagnostic baseline.</p>
                <button
                  onClick={() => onStartQuiz('mock_exam')}
                  className="mt-3 px-3 py-1.5 bg-emerald-800 dark:bg-emerald-700 text-white rounded text-xs font-medium hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-colors"
                >
                  Start First Test
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-80 overflow-y-auto pr-1 text-xs">
                {progress.completedTests.map((t) => (
                  <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-800 dark:text-stone-200 capitalize">
                          {t.mode.replace('_', ' ')}
                        </span>
                        <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">
                          {t.date}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {t.correctCount} of {t.totalQuestions} correct · {Math.round(t.timeSpentSeconds / 60)}m {t.timeSpentSeconds % 60}s
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`font-mono-numbers text-sm font-bold ${
                        t.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                      }`}>
                        {t.percentage}%
                      </span>
                      <div className={`text-[10px] font-medium ${t.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {t.passed ? 'PASS (≥85%)' : 'REVIEW'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset progress safety button */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset your study module completion and test history? This cannot be undone.')) {
                  onResetProgress();
                }
              }}
              className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Study Tracker Data</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
