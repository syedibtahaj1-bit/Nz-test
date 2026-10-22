import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle, 
  Share2, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Question, QuizResult, CategoryId } from '../types';
import { CITIZENSHIP_QUESTIONS, QUESTION_CATEGORIES } from '../data/citizenshipQuestions';

interface QuizEngineProps {
  initialMode: 'mock_exam' | 'quick_drill' | 'category_focus' | 'missed_review';
  initialCategory?: CategoryId;
  missedQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onSaveResult: (result: QuizResult) => void;
  onBackToOverview: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  initialMode,
  initialCategory,
  missedQuestionIds,
  bookmarkedQuestionIds,
  onToggleBookmark,
  onSaveResult,
  onBackToOverview
}) => {
  const [mode, setMode] = useState(initialMode);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | undefined>(initialCategory);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selectedAnswer: number; isCorrect: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60); // 25 min default
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);

  // Initialize questions according to mode
  useEffect(() => {
    let pool = [...CITIZENSHIP_QUESTIONS];

    if (mode === 'category_focus' && selectedCategory) {
      pool = pool.filter(q => q.category === selectedCategory);
    } else if (mode === 'missed_review' && missedQuestionIds.length > 0) {
      pool = pool.filter(q => missedQuestionIds.includes(q.id));
      if (pool.length === 0) pool = [...CITIZENSHIP_QUESTIONS];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    const questionCount = mode === 'mock_exam' ? 20 : mode === 'quick_drill' ? 10 : Math.min(15, shuffled.length);
    const selectedSubset = shuffled.slice(0, questionCount);

    setQuestions(selectedSubset);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setElapsedSeconds(0);
    setSecondsRemaining(mode === 'mock_exam' ? 25 * 60 : 15 * 60);
    setIsTimerActive(true);
  }, [mode, selectedCategory]);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || isCompleted) return;

    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, isCompleted, userAnswers]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted && instantFeedback) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsAnswerSubmitted(true);

    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        selectedAnswer: selectedOption,
        isCorrect
      }
    ];
    setUserAnswers(updatedAnswers);

    // If instant feedback is off, proceed directly to next
    if (!instantFeedback) {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
      } else {
        finishQuiz(updatedAnswers);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz(userAnswers);
    }
  };

  const handleFinishQuiz = () => {
    finishQuiz(userAnswers);
  };

  const finishQuiz = (answers: typeof userAnswers) => {
    setIsCompleted(true);
    setIsTimerActive(false);

    const totalQuestions = questions.length;
    const correctCount = answers.filter(a => a.isCorrect).length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= 85;

    const result: QuizResult = {
      id: `test-${Date.now()}`,
      date: new Date().toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' }),
      mode,
      categoryTitle: selectedCategory ? QUESTION_CATEGORIES[selectedCategory]?.name : undefined,
      totalQuestions,
      correctCount,
      percentage,
      passed,
      timeSpentSeconds: elapsedSeconds,
      answers
    };

    onSaveResult(result);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentQuestion && !isCompleted) {
    return (
      <div className="py-16 text-center text-stone-500">
        <p>Loading questions...</p>
      </div>
    );
  }

  // Final Results Screen
  if (isCompleted) {
    const totalQuestions = questions.length;
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= 85;

    return (
      <div className="max-w-3xl mx-auto space-y-8 py-4">
        {/* Results Header Card */}
        <div className={`rounded-2xl p-6 md:p-8 border shadow-xs text-center space-y-4 ${
          passed 
            ? 'bg-emerald-900 text-stone-100 border-emerald-800' 
            : 'bg-stone-900 text-stone-100 border-stone-800'
        }`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white mx-auto">
            <Award className="w-8 h-8 text-emerald-300" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-emerald-300 font-mono">
              {passed ? 'Assessment Benchmark Passed' : 'Preparation Review Recommended'}
            </span>
            <h2 className="text-3xl md:text-4xl font-editorial font-bold">
              {passed ? 'Ka pai! You Passed!' : 'Keep Going! Review Needed'}
            </h2>
            <p className="text-sm text-stone-300 max-w-lg mx-auto">
              {passed 
                ? `You achieved ${percentage}% (${correctCount}/${totalQuestions}), exceeding the official 85% requirement.`
                : `You scored ${percentage}% (${correctCount}/${totalQuestions}). The official target is 85% (at least 17 of 20 correct). Review the answers below.`}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-4 border-t border-white/10 text-xs">
            <div>
              <div className="text-stone-400">Score</div>
              <div className="text-xl font-bold font-mono-numbers text-white">{percentage}%</div>
            </div>
            <div>
              <div className="text-stone-400">Correct</div>
              <div className="text-xl font-bold font-mono-numbers text-white">{correctCount} / {totalQuestions}</div>
            </div>
            <div>
              <div className="text-stone-400">Time Taken</div>
              <div className="text-xl font-bold font-mono-numbers text-white">{formatTime(elapsedSeconds)}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                setIsCompleted(false);
                setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
                setUserAnswers([]);
                setElapsedSeconds(0);
                setSecondsRemaining(25 * 60);
                setIsTimerActive(true);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={onBackToOverview}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Return to Study Tracker
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100">
            Detailed Question Breakdown
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const answerRecord = userAnswers.find(a => a.questionId === q.id);
              const userSelected = answerRecord ? answerRecord.selectedAnswer : null;
              const isCorrect = userSelected === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className={`border rounded-xl p-5 bg-white dark:bg-stone-900 space-y-3 transition-colors ${
                    isCorrect 
                      ? 'border-emerald-200 dark:border-emerald-800/60' 
                      : 'border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-numbers font-semibold text-xs text-stone-400 dark:text-stone-500">
                        Q{idx + 1}.
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        {QUESTION_CATEGORIES[q.category]?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium">
                      {isCorrect ? (
                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {q.question}
                  </p>

                  {/* Options with marked user choice */}
                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswer;
                      const isOptionUserChoice = optIdx === userSelected;

                      let itemStyle = 'border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300';
                      if (isOptionCorrect) {
                        itemStyle = 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-medium';
                      } else if (isOptionUserChoice && !isCorrect) {
                        itemStyle = 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-300 line-through';
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={`p-2.5 rounded-lg border flex items-center justify-between ${itemStyle}`}
                        >
                          <span>{opt}</span>
                          {isOptionCorrect && (
                            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">Correct Answer</span>
                          )}
                          {isOptionUserChoice && !isCorrect && (
                            <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-400">Your Selection</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-1 bg-stone-50/50 dark:bg-stone-800/40 p-3 rounded-lg">
                    <p className="font-medium text-stone-800 dark:text-stone-200">
                      <strong>Why:</strong> {q.explanation}
                    </p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                      <strong>Key Fact:</strong> {q.keyFact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const isBookmarked = bookmarkedQuestionIds.includes(currentQuestion.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Test Control Ribbon */}
      <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span className="text-stone-500 dark:text-stone-400">
            {QUESTION_CATEGORIES[currentQuestion.category]?.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-mono-numbers text-stone-700 dark:text-stone-300">
            <Clock className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => onToggleBookmark(currentQuestion.id)}
            className="text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none"
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later review'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-100 dark:fill-amber-950" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden -mt-2">
        <div 
          className="h-full bg-emerald-800 dark:bg-emerald-500 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-xs space-y-6 transition-colors">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
            {currentQuestion.category.replace(/_/g, ' ')}
          </div>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            
            let btnStyle = 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50/70 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200';

            if (isAnswerSubmitted && instantFeedback) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200 ring-1 ring-rose-400';
              } else {
                btnStyle = 'border-stone-100 dark:border-stone-800 text-stone-400 dark:text-stone-600 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-800 dark:ring-emerald-500';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted && instantFeedback}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3 text-sm leading-relaxed ${btnStyle}`}
              >
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 text-xs font-mono font-medium ${
                  isSelected 
                    ? 'bg-emerald-900 border-emerald-900 dark:bg-emerald-700 dark:border-emerald-700 text-white' 
                    : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 mt-0.5">
                  {option}
                </div>
                {isAnswerSubmitted && instantFeedback && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isAnswerSubmitted && instantFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Drawer */}
        {isAnswerSubmitted && instantFeedback && (
          <div className="mt-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
              <Info className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>Official Reference Explanation</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
            <p className="text-stone-500 dark:text-stone-400 pt-1 text-[11px] border-t border-stone-200/60 dark:border-stone-700">
              <strong className="text-stone-700 dark:text-stone-200">Key Fact:</strong> {currentQuestion.keyFact}
            </p>
            {currentQuestion.historicalContext && (
              <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                <strong className="text-stone-700 dark:text-stone-200">Context:</strong> {currentQuestion.historicalContext}
              </p>
            )}
          </div>
        )}

        {/* Actions Strip */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={onBackToOverview}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium transition-colors"
          >
            Exit Test
          </button>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                selectedOption !== null
                  ? 'bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
