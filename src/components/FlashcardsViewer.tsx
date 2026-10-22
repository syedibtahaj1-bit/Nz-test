import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  Volume2, 
  VolumeX,
  Play,
  Square,
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  Info,
  X,
  Check,
  Headphones
} from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { QUESTION_CATEGORIES } from '../data/citizenshipQuestions';
import { Flashcard } from '../types';
import {
  speakTeReoTerm,
  speakSingleSyllable,
  stopAudioPlayback,
  findBestVoiceForMaori,
  playSynthesizedVowel
} from '../utils/audioPronunciation';

interface FlashcardsViewerProps {
  masteredFlashcards: string[];
  onToggleMastered: (cardId: string) => void;
}

export const FlashcardsViewer: React.FC<FlashcardsViewerProps> = ({
  masteredFlashcards,
  onToggleMastered
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Audio playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85); // 0.85 normal, 0.65 learner slow
  const [activeSyllableIndex, setActiveSyllableIndex] = useState<number | null>(null);
  const [autoPlayOnNext, setAutoPlayOnNext] = useState(false);
  const [showPronunciationGuide, setShowPronunciationGuide] = useState(false);
  const [playingVowel, setPlayingVowel] = useState<string | null>(null);

  const syllableTimerRef = useRef<number | null>(null);

  const filteredCards: Flashcard[] = selectedCategory === 'all'
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || FLASHCARDS_DATA[0];
  const isMastered = masteredFlashcards.includes(currentCard.id);

  // Stop audio when changing cards or unmounting
  useEffect(() => {
    stopAudioPlayback();
    setIsPlayingAudio(false);
    setActiveSyllableIndex(null);
    if (syllableTimerRef.current) {
      window.clearInterval(syllableTimerRef.current);
      syllableTimerRef.current = null;
    }

    if (autoPlayOnNext && currentCard.isMaoriTerm) {
      const timer = window.setTimeout(() => {
        handlePlayAudio(currentCard);
      }, 250);
      return () => window.clearTimeout(timer);
    }
  }, [currentIndex, selectedCategory]);

  useEffect(() => {
    return () => {
      stopAudioPlayback();
      if (syllableTimerRef.current) {
        window.clearInterval(syllableTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'l') {
        handlePlayAudio(currentCard);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards.length, isPlayingAudio, currentCard, playbackSpeed]);

  const handleNext = () => {
    stopAudioPlayback();
    setIsPlayingAudio(false);
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    stopAudioPlayback();
    setIsPlayingAudio(false);
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handlePlayAudio = (card: Flashcard) => {
    if (isPlayingAudio) {
      stopAudioPlayback();
      setIsPlayingAudio(false);
      setActiveSyllableIndex(null);
      if (syllableTimerRef.current) {
        window.clearInterval(syllableTimerRef.current);
        syllableTimerRef.current = null;
      }
      return;
    }

    setIsPlayingAudio(true);
    setActiveSyllableIndex(0);

    // Syllable progression animation
    if (card.syllables && card.syllables.length > 0) {
      const intervalMs = Math.round((playbackSpeed < 0.8 ? 550 : 380));
      let currentSyl = 0;
      if (syllableTimerRef.current) {
        window.clearInterval(syllableTimerRef.current);
      }
      syllableTimerRef.current = window.setInterval(() => {
        currentSyl++;
        if (currentSyl < (card.syllables?.length || 0)) {
          setActiveSyllableIndex(currentSyl);
        } else {
          if (syllableTimerRef.current) {
            window.clearInterval(syllableTimerRef.current);
            syllableTimerRef.current = null;
          }
        }
      }, intervalMs);
    }

    const textToSpeak = card.audioPronunciationText || card.front;

    speakTeReoTerm({
      text: textToSpeak,
      phoneticFallback: card.phoneticOrPronunciation,
      isMaori: card.isMaoriTerm ?? true,
      rate: playbackSpeed,
      onStart: () => {
        setIsPlayingAudio(true);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setActiveSyllableIndex(null);
        if (syllableTimerRef.current) {
          window.clearInterval(syllableTimerRef.current);
          syllableTimerRef.current = null;
        }
      },
      onError: () => {
        setIsPlayingAudio(false);
        setActiveSyllableIndex(null);
        if (syllableTimerRef.current) {
          window.clearInterval(syllableTimerRef.current);
          syllableTimerRef.current = null;
        }
      }
    });
  };

  const handlePlaySingleSyllable = (e: React.MouseEvent, syllable: string, index: number) => {
    e.stopPropagation();
    stopAudioPlayback();
    if (syllableTimerRef.current) {
      window.clearInterval(syllableTimerRef.current);
      syllableTimerRef.current = null;
    }
    setActiveSyllableIndex(index);
    speakSingleSyllable(syllable, playbackSpeed);
    window.setTimeout(() => {
      setActiveSyllableIndex(null);
    }, 600);
  };

  const handleTestVowel = async (vowel: 'a' | 'e' | 'i' | 'o' | 'u', isMacron: boolean = false) => {
    const key = `${vowel}${isMacron ? '-macron' : ''}`;
    setPlayingVowel(key);
    try {
      await playSynthesizedVowel(vowel, isMacron);
    } catch {
      // fallback to speech
      speakSingleSyllable(isMacron ? `${vowel}${vowel}` : vowel, 0.7);
    } finally {
      setPlayingVowel(null);
    }
  };

  const voiceMeta = findBestVoiceForMaori();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-3 shadow-xs text-center transition-colors">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
          <span>SPACED REPETITION STUDY DECK</span>
          <span aria-hidden="true">·</span>
          <span>CITIZENSHIP FLASHCARDS</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Te Reo & Concept Study Flashcards
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Memorize vital Māori terminology, constitutional milestones, and civic principles with high-fidelity native audio pronunciations.
        </p>

        {/* Category selector */}
        <div className="flex items-center justify-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-x-auto pt-2">
          <button
            onClick={() => { setSelectedCategory('all'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            All Decks ({FLASHCARDS_DATA.length})
          </button>
          <button
            onClick={() => { setSelectedCategory('maori_culture'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'maori_culture' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Te Ao Māori
          </button>
          <button
            onClick={() => { setSelectedCategory('treaty_and_history'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'treaty_and_history' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            History & Treaty
          </button>
          <button
            onClick={() => { setSelectedCategory('government_and_law'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'government_and_law' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Government
          </button>
        </div>

        {/* Audio settings bar & Pronunciation Guide trigger */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Audio Speed:</span>
            <div className="inline-flex rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 text-[11px]">
              <button
                onClick={() => setPlaybackSpeed(0.85)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  playbackSpeed > 0.75
                    ? 'bg-white dark:bg-stone-700 text-emerald-900 dark:text-emerald-300 font-semibold shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                1.0x Normal
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.65)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  playbackSpeed <= 0.75
                    ? 'bg-white dark:bg-stone-700 text-emerald-900 dark:text-emerald-300 font-semibold shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                0.7x Learner
              </button>
            </div>

            <button
              onClick={() => setAutoPlayOnNext(prev => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                autoPlayOnNext
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              title="Automatically pronounce terms when navigating cards"
            >
              <Headphones className="w-3 h-3" />
              <span>Auto-play: {autoPlayOnNext ? 'On' : 'Off'}</span>
            </button>
          </div>

          <button
            onClick={() => setShowPronunciationGuide(prev => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-900 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors ml-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Te Reo Sound Guide</span>
          </button>
        </div>
      </div>

      {/* Interactive Te Reo Pronunciation Guide Drawer */}
      {showPronunciationGuide && (
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 sm:p-6 space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h3 className="font-editorial text-lg font-bold text-emerald-950 dark:text-emerald-100">
                  Te Reo Māori Pronunciation Key
                </h3>
              </div>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 max-w-xl">
                Te Reo Māori has consistent phonetic rules. There are five pure vowels. Tap any vowel button to hear its authentic acoustic resonance.
              </p>
            </div>
            <button
              onClick={() => setShowPronunciationGuide(false)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-lg"
              aria-label="Close sound guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Vowels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {[
              { vowel: 'a', sound: 'car / calm', word: 'Aroha' },
              { vowel: 'e', sound: 'bed / pet', word: 'Etehi' },
              { vowel: 'i', sound: 'see / ski', word: 'Iwi' },
              { vowel: 'o', sound: 'or / raw', word: 'Ora' },
              { vowel: 'u', sound: 'boot / flute', word: 'Utu' },
            ].map((v) => (
              <div
                key={v.vowel}
                className="bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-3 text-center space-y-1.5 shadow-2xs"
              >
                <div className="text-xl font-bold font-editorial text-emerald-900 dark:text-emerald-300 uppercase">
                  {v.vowel}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  like in <em>{v.sound}</em>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                  e.g. {v.word}
                </div>
                <button
                  onClick={() => handleTestVowel(v.vowel as 'a'|'e'|'i'|'o'|'u')}
                  className="w-full mt-1 py-1 px-2 rounded-md bg-emerald-100 dark:bg-emerald-900/70 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-[10px] font-semibold text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{playingVowel === v.vowel ? 'Playing' : 'Listen'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Tohutō & Digraphs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700 dark:text-stone-300">
            <div className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5">
              <strong className="text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <span>Tohutō (Macron: ā, ē, ī, ō, ū)</span>
              </strong>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                A macron elongates the vowel sound to double its normal duration, which often changes the word’s meaning (e.g. <em>kēkē</em> = armpit vs <em>keke</em> = cake).
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5">
              <strong className="text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <span>Consonant Digraphs: WH & NG</span>
              </strong>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>WH</strong> is pronounced softly like English <em>'f'</em> (<em>Whakapapa</em> = "fah-kah-pah-pah"). <strong>NG</strong> is the soft nasal in <em>'sing'</em> (<em>Tangata</em>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress & Deck Navigation */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-2">
        <span className="font-mono-numbers">
          Card {currentIndex + 1} of {filteredCards.length}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-[11px] hidden sm:inline text-stone-400">
            Keys: [Space] Flip · [P] Audio · [←/→] Cards
          </span>
          <span>Mastered: <strong className="text-emerald-800 dark:text-emerald-400 font-mono-numbers">{masteredFlashcards.length}</strong></span>
        </div>
      </div>

      {/* The Interactive Flashcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[360px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between cursor-pointer hover:border-stone-300 dark:hover:border-stone-700 transition-all select-none relative group"
      >
        {/* Top card strip */}
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
              {QUESTION_CATEGORIES[currentCard.category]?.name || 'Study Card'}
            </span>
            {currentCard.isMaoriTerm && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium">
                Te Reo Māori
              </span>
            )}
          </div>

          <span className="flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click to flip</span>
          </span>
        </div>

        {/* Center Card Content */}
        <div className="text-center py-4 space-y-4">
          {!isFlipped ? (
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {currentCard.front}
              </h2>

              {/* Syllable Breakdown & Pronunciation Player */}
              <div className="space-y-2.5 max-w-md mx-auto">
                {/* Clickable Syllables */}
                {currentCard.syllables && currentCard.syllables.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {currentCard.syllables.map((syllable, sIdx) => {
                      const isActive = activeSyllableIndex === sIdx;
                      return (
                        <button
                          key={sIdx}
                          onClick={(e) => handlePlaySingleSyllable(e, syllable, sIdx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all ${
                            isActive
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-105'
                              : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                          }`}
                          title={`Click to listen to syllable: "${syllable}"`}
                        >
                          {syllable}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Phonetic transcription badge */}
                {currentCard.phoneticOrPronunciation && (
                  <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    [{currentCard.phoneticOrPronunciation}]
                  </div>
                )}

                {/* Master Audio Playback Action Button */}
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentCard);
                    }}
                    className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-sm ${
                      isPlayingAudio
                        ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 animate-pulse'
                        : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-emerald-900 dark:hover:bg-emerald-100'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Playing Te Reo Audio...</span>
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                        <span>Listen to Pronunciation</span>
                        <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-white/20 dark:bg-black/20">
                          {playbackSpeed <= 0.75 ? '0.7x' : '1.0x'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 dark:text-stone-500 pt-1">
                Click card anywhere to reveal definition & civics context
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                  Definition & Civic Meaning
                </span>
                {/* Audio replay button on card back so learner doesn't have to flip */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(currentCard);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                  title="Re-play pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Stop' : 'Hear Pronunciation'}</span>
                </button>
              </div>

              <p className="text-lg md:text-xl font-medium text-stone-800 dark:text-stone-200 leading-relaxed max-w-lg mx-auto">
                {currentCard.back}
              </p>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                <strong className="text-stone-700 dark:text-stone-300">Civic Context:</strong> {currentCard.context}
              </div>
            </div>
          )}
        </div>

        {/* Bottom card action */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMastered(currentCard.id);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              isMastered
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {isMastered ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Mastered Term</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                <span>Mark as Mastered</span>
              </>
            )}
          </button>

          <span className="text-stone-400 dark:text-stone-500 text-[11px]">
            {isFlipped ? 'Click to flip back to term' : 'Click card to flip'}
          </span>
        </div>
      </div>

      {/* Control Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
