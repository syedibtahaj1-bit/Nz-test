import { UserProgress, QuizResult, SavedDebitCard, ConsultancyBooking, PremiumSubscription } from '../types';
import { STUDY_MODULES } from '../data/studyModulesData';

const STORAGE_KEY = 'korero_nz_progress_v2';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  completedTests: [],
  savedQuestions: [],
  missedQuestionIds: [],
  masteredFlashcards: [],
  userName: 'Aotearoa Candidate',
  userPhone: '',
  userEmail: '',
  targetTestDate: '',
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyQuestionGoal: 15,
  dailyActivity: {
    date: new Date().toISOString().split('T')[0],
    questionsAnswered: 0
  },
  savedDebitCard: undefined
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Check if dailyActivity belongs to today or needs reset
    let dailyActivity = parsed.dailyActivity;
    if (!dailyActivity || dailyActivity.date !== todayStr) {
      // Calculate from completedTests that occurred today if any
      const todayNZ = new Date().toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' });
      const completedToday = Array.isArray(parsed.completedTests)
        ? parsed.completedTests.filter((t: QuizResult) => t.date === todayNZ)
        : [];
      const questionsToday = completedToday.reduce((sum: number, t: QuizResult) => sum + (t.totalQuestions || 0), 0);

      dailyActivity = {
        date: todayStr,
        questionsAnswered: questionsToday
      };
    }

    // Automatically remove any previously saved credit/debit card matching 6725 or Syed Ibtahaj
    let savedDebitCard = parsed.savedDebitCard;
    if (savedDebitCard && (savedDebitCard.last4 === '6725' || savedDebitCard.cardholderName === 'Syed Ibtahaj')) {
      savedDebitCard = undefined;
      try {
        const cleaned = { ...parsed, savedDebitCard: undefined };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      } catch (e) {
        // ignore
      }
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      dailyQuestionGoal: typeof parsed.dailyQuestionGoal === 'number' && parsed.dailyQuestionGoal > 0 ? parsed.dailyQuestionGoal : 15,
      dailyActivity,
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
      completedTests: Array.isArray(parsed.completedTests) ? parsed.completedTests : [],
      savedQuestions: Array.isArray(parsed.savedQuestions) ? parsed.savedQuestions : [],
      missedQuestionIds: Array.isArray(parsed.missedQuestionIds) ? parsed.missedQuestionIds : [],
      masteredFlashcards: Array.isArray(parsed.masteredFlashcards) ? parsed.masteredFlashcards : [],
      savedDebitCard: savedDebitCard || undefined,
      subscription: parsed.subscription || undefined
    };
  } catch (err) {
    console.warn('Failed to load user progress from localStorage', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    const updated = {
      ...progress,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save user progress to localStorage', err);
  }
}

export function setDailyQuestionGoal(current: UserProgress, goal: number): UserProgress {
  const sanitizedGoal = Math.max(1, Math.min(100, Math.round(goal)));
  const updated: UserProgress = {
    ...current,
    dailyQuestionGoal: sanitizedGoal
  };
  saveUserProgress(updated);
  return updated;
}

export function getTodayQuestionsAnswered(progress: UserProgress): number {
  const todayStr = new Date().toISOString().split('T')[0];
  if (progress.dailyActivity && progress.dailyActivity.date === todayStr) {
    return progress.dailyActivity.questionsAnswered;
  }
  
  // Fallback to searching tests taken today
  const todayNZ = new Date().toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' });
  const completedToday = progress.completedTests.filter(t => t.date === todayNZ);
  return completedToday.reduce((sum, t) => sum + (t.totalQuestions || 0), 0);
}

export function toggleModuleCompletion(current: UserProgress, moduleId: string): UserProgress {
  const exists = current.completedModules.includes(moduleId);
  const updatedModules = exists
    ? current.completedModules.filter(id => id !== moduleId)
    : [...current.completedModules, moduleId];

  const updated: UserProgress = {
    ...current,
    completedModules: updatedModules
  };
  saveUserProgress(updated);
  return updated;
}

export function recordTestResult(current: UserProgress, result: QuizResult): UserProgress {
  // Collect newly missed questions and remove newly correct ones
  const newMissed = new Set(current.missedQuestionIds);
  result.answers.forEach(a => {
    if (!a.isCorrect) {
      newMissed.add(a.questionId);
    } else {
      newMissed.delete(a.questionId);
    }
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const currentTodayQuestions = (current.dailyActivity && current.dailyActivity.date === todayStr)
    ? current.dailyActivity.questionsAnswered
    : 0;

  const updatedDailyActivity = {
    date: todayStr,
    questionsAnswered: currentTodayQuestions + result.totalQuestions
  };

  const updated: UserProgress = {
    ...current,
    completedTests: [result, ...current.completedTests],
    missedQuestionIds: Array.from(newMissed),
    dailyActivity: updatedDailyActivity
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleBookmarkQuestion(current: UserProgress, questionId: string): UserProgress {
  const exists = current.savedQuestions.includes(questionId);
  const updatedList = exists
    ? current.savedQuestions.filter(id => id !== questionId)
    : [...current.savedQuestions, questionId];

  const updated: UserProgress = {
    ...current,
    savedQuestions: updatedList
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleMasteredFlashcard(current: UserProgress, cardId: string): UserProgress {
  const exists = current.masteredFlashcards.includes(cardId);
  const updatedList = exists
    ? current.masteredFlashcards.filter(id => id !== cardId)
    : [...current.masteredFlashcards, cardId];

  const updated: UserProgress = {
    ...current,
    masteredFlashcards: updatedList
  };
  saveUserProgress(updated);
  return updated;
}

export interface ProgressSummary {
  totalModules: number;
  completedModulesCount: number;
  moduleCompletionPercentage: number;
  totalTestsTaken: number;
  averageTestScore: number;
  highestTestScore: number;
  latestTestScore: number | null;
  testsPassedCount: number;
  passRatePercentage: number;
  readinessScore: number;
  readinessLabel: 'Needs Preparation' | 'Making Progress' | 'Solid Understanding' | 'Exam Ready & Prepared';
  readinessBadgeColor: string;
}

export function calculateProgressSummary(progress: UserProgress): ProgressSummary {
  const totalModules = STUDY_MODULES.length;
  const completedModulesCount = progress.completedModules.length;
  const moduleCompletionPercentage = totalModules > 0
    ? Math.round((completedModulesCount / totalModules) * 100)
    : 0;

  const tests = progress.completedTests;
  const totalTestsTaken = tests.length;

  let averageTestScore = 0;
  let highestTestScore = 0;
  let latestTestScore: number | null = null;
  let testsPassedCount = 0;

  if (totalTestsTaken > 0) {
    const sum = tests.reduce((acc, t) => acc + t.percentage, 0);
    averageTestScore = Math.round(sum / totalTestsTaken);
    highestTestScore = Math.max(...tests.map(t => t.percentage));
    latestTestScore = tests[0].percentage;
    testsPassedCount = tests.filter(t => t.passed).length;
  }

  const passRatePercentage = totalTestsTaken > 0
    ? Math.round((testsPassedCount / totalTestsTaken) * 100)
    : 0;

  // Composite Readiness Score:
  // 50% Module Completion + 50% Test Average (if tests taken, otherwise module completion only)
  let readinessScore = 0;
  if (totalTestsTaken === 0) {
    readinessScore = Math.round(moduleCompletionPercentage * 0.75);
  } else {
    readinessScore = Math.round((moduleCompletionPercentage * 0.5) + (averageTestScore * 0.5));
  }

  let readinessLabel: ProgressSummary['readinessLabel'] = 'Needs Preparation';
  let readinessBadgeColor = 'text-amber-800 bg-amber-50 border-amber-200';

  if (readinessScore >= 85 && (latestTestScore ?? 0) >= 80) {
    readinessLabel = 'Exam Ready & Prepared';
    readinessBadgeColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  } else if (readinessScore >= 65) {
    readinessLabel = 'Solid Understanding';
    readinessBadgeColor = 'text-sky-800 bg-sky-50 border-sky-200';
  } else if (readinessScore >= 35) {
    readinessLabel = 'Making Progress';
    readinessBadgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
  }

  return {
    totalModules,
    completedModulesCount,
    moduleCompletionPercentage,
    totalTestsTaken,
    averageTestScore,
    highestTestScore,
    latestTestScore,
    testsPassedCount,
    passRatePercentage,
    readinessScore,
    readinessLabel,
    readinessBadgeColor
  };
}

export function saveDebitCard(card: SavedDebitCard): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    savedDebitCard: card
  };
  saveUserProgress(updated);
  return updated;
}

export function removeDebitCard(): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    savedDebitCard: undefined
  };
  saveUserProgress(updated);
  return updated;
}

export function addConsultancyBooking(booking: ConsultancyBooking): UserProgress {
  const current = loadUserProgress();
  const existingBookings = Array.isArray(current.consultancyBookings) ? current.consultancyBookings : [];
  const updated: UserProgress = {
    ...current,
    userPhone: booking.clientPhone,
    userEmail: booking.clientEmail,
    consultancyBookings: [booking, ...existingBookings]
  };
  saveUserProgress(updated);
  return updated;
}

export function updateUserContact(phone: string, email?: string): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    userPhone: phone,
    ...(email !== undefined ? { userEmail: email } : {})
  };
  saveUserProgress(updated);
  return updated;
}

export function activatePremiumSubscription(card?: SavedDebitCard): UserProgress {
  const current = loadUserProgress();
  const effectiveCard: SavedDebitCard = card || current.savedDebitCard || {
    last4: '0000',
    cardBrand: 'generic',
    cardholderName: current.userName || 'Subscriber',
    expiryMonth: '12',
    expiryYear: '2028',
    cardType: 'Debit Card'
  };

  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const subscription: PremiumSubscription = {
    isActive: true,
    subscribedAt: now.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' }),
    planName: 'Premium Service & Personal Tutor',
    amountNZD: 15,
    paymentMethod: 'debit_card',
    cardLast4: effectiveCard.last4,
    cardBrand: effectiveCard.cardBrand,
    personalTutorName: 'Aroha Henderson, LLB (NZ Senior Civic Tutor)',
    personalTutorPhone: '+64 21 029 4812',
    personalTutorEmail: 'tutor@nzcitizenshipguide.co.nz',
    nextRenewalDate: nextMonth.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const updated: UserProgress = {
    ...current,
    savedDebitCard: card ? card : current.savedDebitCard,
    subscription
  };
  saveUserProgress(updated);
  return updated;
}

export function cancelPremiumSubscription(): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    subscription: undefined
  };
  saveUserProgress(updated);
  return updated;
}

