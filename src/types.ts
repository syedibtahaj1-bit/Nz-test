export type CategoryId = 
  | 'treaty_and_history'
  | 'government_and_law'
  | 'maori_culture'
  | 'geography_and_society'
  | 'citizenship_ceremony';

export interface Question {
  id: string;
  category: CategoryId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  historicalContext?: string;
  keyFact: string;
}

export interface QuizResult {
  id: string;
  date: string;
  mode: 'mock_exam' | 'quick_drill' | 'category_focus' | 'missed_review';
  categoryTitle?: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
}

export interface HistoryMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  teReoTitle?: string;
  summary: string;
  fullStory: string[];
  significance: string;
  keyFigures: string[];
  category: 'Treaty & Crown' | 'Foundations & Voyaging' | 'Social Rights' | 'Constitution & Governance' | 'Modern Aotearoa';
  imagePlaceholder?: string;
}

export interface TreatyArticle {
  number: number;
  title: string;
  englishVersion: {
    text: string;
    interpretation: string;
  };
  maoriVersion: {
    text: string;
    translation: string;
    keyConcept: string;
    interpretation: string;
  };
  modernSignificance: string;
}

export interface Flashcard {
  id: string;
  category: CategoryId;
  front: string;
  back: string;
  phoneticOrPronunciation?: string;
  context: string;
  audioPronunciationText?: string;
  syllables?: string[];
  isMaoriTerm?: boolean;
}

export interface StudyModule {
  id: string;
  title: string;
  teReoTitle?: string;
  category: CategoryId;
  estimatedMinutes: number;
  description: string;
  keyPoints: string[];
  historicalArticleId?: string;
}

export interface SavedDebitCard {
  last4: string;
  cardBrand: 'visa' | 'mastercard' | 'eftpos' | 'generic';
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: 'Debit Card' | 'Credit Card';
}

export interface ConsultancyBooking {
  id: string;
  bookingRef: string;
  consultantName: string;
  consultantLicenseNo: string;
  consultationType: 'eligibility_check' | 'comprehensive_review' | 'express_advisory';
  consultationTitle: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  amountNZD: number;
  paymentMethod: 'debit_card' | 'credit_card' | 'poli_pay';
  cardLast4: string;
  paidAt: string;
  status: 'confirmed' | 'completed' | 'rescheduled';
}

export interface UserProgress {
  completedModules: string[]; // module ids
  completedTests: QuizResult[];
  savedQuestions: string[];
  missedQuestionIds: string[];
  masteredFlashcards: string[];
  userName: string;
  userPhone?: string;
  userEmail?: string;
  targetTestDate?: string;
  lastActiveDate: string;
  dailyQuestionGoal?: number;
  dailyActivity?: {
    date: string;
    questionsAnswered: number;
  };
  savedDebitCard?: SavedDebitCard;
  consultancyBookings?: ConsultancyBooking[];
}

