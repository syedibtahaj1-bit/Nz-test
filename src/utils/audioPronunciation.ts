/**
 * Audio playback and pronunciation engine for Te Reo Māori in New Zealand Citizenship Prep
 * Supports Web Speech Synthesis with native mi-NZ / en-NZ voice heuristics,
 * phonetic compensation, syllable sequencing, and Web Audio API vowel acoustic synthesis.
 */

export interface SpeechPlaybackOptions {
  text: string;
  phoneticFallback?: string;
  isMaori?: boolean;
  rate?: number; // default 0.85 (0.7 for slow learner pace)
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
  onBoundary?: (charIndex: number, charLength: number) => void;
}

// Cached voice lookup
let voicesCache: SpeechSynthesisVoice[] = [];

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  if (voicesCache.length > 0) {
    return voicesCache;
  }
  voicesCache = window.speechSynthesis.getVoices();
  return voicesCache;
}

// Initialise voice listener if voices are loaded asynchronously in Chrome/Edge
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    voicesCache = window.speechSynthesis.getVoices();
  };
}

/**
 * Finds the most suitable voice for Te Reo Māori or New Zealand English
 */
export function findBestVoiceForMaori(): {
  voice: SpeechSynthesisVoice | null;
  isNativeMaori: boolean;
  voiceName: string;
} {
  const voices = getAvailableVoices();
  if (voices.length === 0) {
    return { voice: null, isNativeMaori: false, voiceName: 'Default System Voice' };
  }

  // 1. Exact match for Maori language code
  const nativeMaori = voices.find(
    v =>
      v.lang.toLowerCase().startsWith('mi') ||
      v.lang.toLowerCase().includes('mri') ||
      v.name.toLowerCase().includes('maori') ||
      v.name.toLowerCase().includes('māori')
  );

  if (nativeMaori) {
    return { voice: nativeMaori, isNativeMaori: true, voiceName: nativeMaori.name };
  }

  // 2. New Zealand English voice (shares NZ accent, vowel cadence, and recognizes NZ place names)
  const nzVoice = voices.find(
    v =>
      v.lang.toLowerCase() === 'en-nz' ||
      v.name.toLowerCase().includes('new zealand') ||
      v.name.toLowerCase().includes('kiwi')
  );

  if (nzVoice) {
    return { voice: nzVoice, isNativeMaori: false, voiceName: `${nzVoice.name} (en-NZ)` };
  }

  // 3. Australian English voice (closest Australasian phonetic match)
  const auVoice = voices.find(v => v.lang.toLowerCase() === 'en-au');
  if (auVoice) {
    return { voice: auVoice, isNativeMaori: false, voiceName: `${auVoice.name} (en-AU)` };
  }

  // 4. Default en-GB / clear English voice
  const gbVoice = voices.find(v => v.lang.toLowerCase() === 'en-gb');
  if (gbVoice) {
    return { voice: gbVoice, isNativeMaori: false, voiceName: gbVoice.name };
  }

  const defaultVoice = voices.find(v => v.default) || voices[0] || null;
  return {
    voice: defaultVoice,
    isNativeMaori: false,
    voiceName: defaultVoice ? defaultVoice.name : 'Default Voice'
  };
}

/**
 * Clean up text for speech synthesis if it contains slash alternates like "Aoraki / Mount Cook"
 */
export function getPronounceableTerm(term: string, preferMaoriPart: boolean = true): string {
  if (term.includes('/')) {
    const parts = term.split('/').map(p => p.trim());
    return preferMaoriPart ? parts[0] : parts[1] || parts[0];
  }
  return term;
}

/**
 * Cancels any active speech synthesis
 */
export function stopAudioPlayback(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

/**
 * Plays the Te Reo Māori pronunciation using SpeechSynthesis
 */
export function speakTeReoTerm(options: SpeechPlaybackOptions): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options.onError) {
      options.onError(new Error('Speech synthesis is not supported on this browser'));
    }
    return () => {};
  }

  // Cancel prior speech
  stopAudioPlayback();

  const { voice, isNativeMaori } = findBestVoiceForMaori();

  // If we have a native Maori voice, speak the clean Maori term directly.
  // Otherwise, if we have a phonetic guide and no native Maori voice,
  // we can pronounce the phonetic breakdown which sounds far more natural
  // on standard speech engines than mangled English orthography.
  let spokenText = getPronounceableTerm(options.text);

  if (!isNativeMaori && options.isMaori && options.phoneticFallback) {
    // Convert phonetic e.g. "fah-nah-oo-ngah-tah-ngah" to spaced syllables
    // that standard TTS engines pronounce with clean, open vowel sounds
    spokenText = options.phoneticFallback
      .replace(/-/g, ' ')
      .replace(/pah/gi, 'pah')
      .replace(/tee/gi, 'tea');
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || (isNativeMaori ? 'mi-NZ' : 'en-NZ');
  } else {
    utterance.lang = 'en-NZ';
  }

  utterance.rate = options.rate ?? 0.85;
  utterance.pitch = options.pitch ?? 1.0;

  utterance.onstart = () => {
    if (options.onStart) options.onStart();
  };

  utterance.onend = () => {
    if (options.onEnd) options.onEnd();
  };

  utterance.onerror = (e) => {
    if (options.onError) options.onError(e);
  };

  if (options.onBoundary) {
    utterance.onboundary = (e) => {
      if (options.onBoundary) {
        options.onBoundary(e.charIndex, (e as unknown as { charLength?: number }).charLength || 1);
      }
    };
  }

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (options.onError) options.onError(err);
  }

  return () => {
    stopAudioPlayback();
  };
}

/**
 * Plays an individual syllable (e.g., 'kai', 'tia', 'ki')
 */
export function speakSingleSyllable(syllable: string, rate: number = 0.8): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  stopAudioPlayback();

  const { voice } = findBestVoiceForMaori();
  const utterance = new SpeechSynthesisUtterance(syllable);
  if (voice) utterance.voice = voice;
  utterance.lang = 'en-NZ';
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

// ----------------------------------------------------------------------
// Web Audio API Vowel Synthesis:
// Authentic acoustic resonant formants for the 5 cardinal Māori vowels:
// A [a], E [e], I [i], O [o], U [u]
// ----------------------------------------------------------------------

const VOWEL_FORMANTS: Record<'a' | 'e' | 'i' | 'o' | 'u', { f1: number; f2: number; f3: number }> = {
  a: { f1: 800, f2: 1250, f3: 2500 }, // 'car' / 'calm'
  e: { f1: 530, f2: 1850, f3: 2500 }, // 'bed' / 'pet'
  i: { f1: 270, f2: 2300, f3: 3000 }, // 'see' / 'ski'
  o: { f1: 500, f2: 900,  f3: 2500 }, // 'or' / 'raw'
  u: { f1: 300, f2: 870,  f3: 2250 }, // 'boot' / 'flute'
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Synthesizes an authentic acoustic vowel sound using a glottal pulse oscillator
 * and 3 resonant formant bandpass filters matching Māori phonology.
 */
export function playSynthesizedVowel(
  vowel: 'a' | 'e' | 'i' | 'o' | 'u',
  isMacron: boolean = false,
  baseFrequency: number = 135
): Promise<void> {
  return new Promise((resolve) => {
    const ctx = getAudioContext();
    if (!ctx) {
      resolve();
      return;
    }

    const formants = VOWEL_FORMANTS[vowel] || VOWEL_FORMANTS.a;
    const duration = isMacron ? 0.75 : 0.45; // Elongated length for tohutō (macron)

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    masterGain.gain.setValueAtTime(0.25, ctx.currentTime + duration - 0.08);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    masterGain.connect(ctx.destination);

    // Glottal source (sawtooth simulates rich vocal cord harmonics)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFrequency, ctx.currentTime);
    // Slight human pitch inflection
    osc.frequency.exponentialRampToValueAtTime(baseFrequency * 0.94, ctx.currentTime + duration);

    // Formant 1 filter (Vowel tongue height)
    const f1 = ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(formants.f1, ctx.currentTime);
    f1.Q.setValueAtTime(5, ctx.currentTime);

    // Formant 2 filter (Vowel tongue backness/frontness)
    const f2 = ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(formants.f2, ctx.currentTime);
    f2.Q.setValueAtTime(6, ctx.currentTime);

    // Formant 3 filter (Speaker vocal tract resonance)
    const f3 = ctx.createBiquadFilter();
    f3.type = 'bandpass';
    f3.frequency.setValueAtTime(formants.f3, ctx.currentTime);
    f3.Q.setValueAtTime(7, ctx.currentTime);

    // Connect source to filters in parallel and route to master gain
    osc.connect(f1);
    osc.connect(f2);
    osc.connect(f3);

    f1.connect(masterGain);
    f2.connect(masterGain);
    f3.connect(masterGain);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);

    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
}
