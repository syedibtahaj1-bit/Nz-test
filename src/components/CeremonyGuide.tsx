import React, { useState } from 'react';
import { 
  Award, 
  Music, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Volume2, 
  FileText, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { CEREMONY_OATHS, CEREMONY_STEPS, ANTHEM_VERSES, POST_CITIZENSHIP_CHECKLIST } from '../data/ceremonyData';

interface CeremonyGuideProps {
  userName: string;
  isCeremonyModuleCompleted: boolean;
  onToggleCeremonyModule: () => void;
}

export const CeremonyGuide: React.FC<CeremonyGuideProps> = ({
  isCeremonyModuleCompleted,
  onToggleCeremonyModule
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const handleSpeakAnthemLine = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-NZ';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
              <span>OFFICIAL CEREMONY PROTOCOL</span>
              <span aria-hidden="true">·</span>
              <span>BECOMING A CITIZEN OF AOTEAROA</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              The Citizenship Ceremony Guide
            </h1>
          </div>

          <button
            onClick={onToggleCeremonyModule}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors border flex items-center gap-1.5 whitespace-nowrap self-start md:self-auto ${
              isCeremonyModuleCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
            }`}
          >
            {isCeremonyModuleCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Ceremony Prep Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                <span>Mark Ceremony Module Complete</span>
              </>
            )}
          </button>
        </div>

        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed">
          The citizenship ceremony is the joyful final legal step in your citizenship journey. Organized by your local city or district council, it is where you recite your declaration of allegiance, receive your official certificate, and are warmly welcomed as a citizen of Aotearoa New Zealand.
        </p>
      </div>

      {/* Step by Step Ceremony Walkthrough */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
            Timeline of the Day
          </span>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
            What Happens on Ceremony Day
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {CEREMONY_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all space-y-1.5 ${
                activeStepIndex === idx
                  ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-800 dark:ring-emerald-500 shadow-xs'
                  : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-850'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-numbers">
                <span className="font-bold text-emerald-900 dark:text-emerald-400">Step 0{s.step}</span>
                {activeStepIndex === idx && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />}
              </div>
              <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-200 line-clamp-2">
                {s.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Selected Step Detail Box */}
        <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold">
            Stage {CEREMONY_STEPS[activeStepIndex].step} of 5
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            {CEREMONY_STEPS[activeStepIndex].title}
          </h3>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
            {CEREMONY_STEPS[activeStepIndex].description}
          </p>
        </div>
      </div>

      {/* Official Declarations: Oath vs Affirmation Reference */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
            Statutory Declarations
          </span>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
            The Oath & Affirmation of Allegiance
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
            Candidates choose either the Oath of Allegiance (religious, sworn before God) or the Affirmation of Allegiance (solemn secular declaration). Both have identical legal validity under the Citizenship Act 1977 and can be spoken in English, Te Reo Māori, or both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Affirmation Card */}
          <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700 text-xs">
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                The Affirmation of Allegiance
              </span>
              <span className="text-stone-500 dark:text-stone-400 text-[11px]">Secular / Non-religious</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200">English Text:</span>
              <p className="font-editorial text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed bg-white dark:bg-stone-900 p-3.5 rounded-lg border border-stone-200 dark:border-stone-700">
                “{CEREMONY_OATHS.affirmationEnglish}”
              </p>
            </div>

            <div className="space-y-1.5 text-xs pt-1">
              <span className="font-semibold text-emerald-900 dark:text-emerald-400">Te Reo Māori Text:</span>
              <p className="font-editorial text-sm text-emerald-950 dark:text-emerald-300 italic leading-relaxed bg-white dark:bg-stone-900 p-3.5 rounded-lg border border-stone-200 dark:border-stone-700">
                “{CEREMONY_OATHS.affirmationMaori}”
              </p>
            </div>
          </div>

          {/* Oath Card */}
          <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700 text-xs">
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                The Oath of Allegiance
              </span>
              <span className="text-stone-500 dark:text-stone-400 text-[11px]">Religious / Mentions God</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200">English Text:</span>
              <p className="font-editorial text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed bg-white dark:bg-stone-900 p-3.5 rounded-lg border border-stone-200 dark:border-stone-700">
                “{CEREMONY_OATHS.oathEnglish}”
              </p>
            </div>

            <div className="space-y-1.5 text-xs pt-1">
              <span className="font-semibold text-emerald-900 dark:text-emerald-400">Te Reo Māori Text:</span>
              <p className="font-editorial text-sm text-emerald-950 dark:text-emerald-300 italic leading-relaxed bg-white dark:bg-stone-900 p-3.5 rounded-lg border border-stone-200 dark:border-stone-700">
                “{CEREMONY_OATHS.oathMaori}”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* National Anthem Bilingual Study Grid */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
            <Music className="w-3.5 h-3.5" />
            <span>GOD DEFEND NEW ZEALAND / AOTEAROA</span>
          </div>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
            The National Anthem (Verse 1 in Te Reo Māori & English)
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
            At citizenship ceremonies and national civic gatherings, the first verse is traditionally sung in Te Reo Māori first, followed by English. Follow along with the phonetic pronunciation guide below.
          </p>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden divide-y divide-stone-200 dark:divide-stone-800 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-stone-50 dark:bg-stone-800 p-3 font-semibold text-stone-700 dark:text-stone-200">
            <div>Te Reo Māori Line</div>
            <div>Phonetic Guide</div>
            <div>English Translation / Meaning</div>
          </div>

          {ANTHEM_VERSES.map((verse, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-3 items-center gap-2 hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
              <div className="font-editorial text-sm font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
                <span>{verse.maoriLine}</span>
                <button
                  onClick={() => handleSpeakAnthemLine(verse.maoriLine)}
                  className="text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                  title="Pronounce line"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-mono text-stone-500 dark:text-stone-400 text-[11px]">
                [{verse.phonetic}]
              </div>
              <div className="text-stone-700 dark:text-stone-300 font-medium">
                {verse.englishLine}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Citizenship Civic Checklist */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
            Next Civic Steps
          </span>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
            What to Do After Your Ceremony
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
            Congratulations on your citizenship. Complete these key legal and civic steps to access all rights and duties of your new status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POST_CITIZENSHIP_CHECKLIST.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {item.task}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 text-xs">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
