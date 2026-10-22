import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Scale, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Info,
  Printer,
  Download,
  FileText,
  Edit3,
  Save,
  RotateCcw,
  X,
  Check
} from 'lucide-react';
import { TREATY_ARTICLES_COMPARISON, TREATY_PRINCIPLES } from '../data/historyData';

interface TreatyComparisonViewerProps {
  isTreatyModuleCompleted: boolean;
  onToggleTreatyModule: () => void;
  onPracticeTreatyQuestions: () => void;
  candidateName?: string;
}

const STORAGE_NOTES_KEY = 'nz_treaty_summary_notes';

const DEFAULT_STUDY_NOTES = `1. Article 1 (Governance vs Sovereignty): Māori agreed to "kāwanatanga" (governorship over British settlers to establish peace and law), expecting to retain their independent tribal mana. The English draft declared total "sovereignty" ceded to Queen Victoria.
2. Article 2 (Chieftainship vs Property): The Māori text guaranteed "te tino rangatiratanga" (unqualified authority and self-determination) over their whenua (lands), kāinga (villages), and taonga katoa (all prized treasures, language, and culture). The English text framed this as ordinary property ownership ("lands, estates, forests, fisheries").
3. Article 3 (Equality & Royal Protection): Both texts harmonize to grant royal Crown protection and "ōritetanga" (equal civil rights and legal citizenship standing equal to British subjects).
4. The 3Ps Treaty Principles (Court of Appeal 1987 Lands Case):
  • Partnership: Duty to act in utmost good faith and mutual civic respect.
  • Active Protection: Crown obligation to affirmatively safeguard Māori land, taonga, and Te Reo Māori.
  • Participation: Meaningful Māori involvement in national, regional, and environmental decision-making.
5. Waitangi Tribunal: Established under the Treaty of Waitangi Act 1975 to investigate Crown breaches; confirmed northern chiefs did not cede sovereignty in 1840.`;

export const TreatyComparisonViewer: React.FC<TreatyComparisonViewerProps> = ({
  isTreatyModuleCompleted,
  onToggleTreatyModule,
  onPracticeTreatyQuestions,
  candidateName = 'Aotearoa Candidate'
}) => {
  const [activeArticleIndex, setActiveArticleIndex] = useState<number>(0);
  const activeArticle = TREATY_ARTICLES_COMPARISON[activeArticleIndex];

  // User Notes state
  const [notes, setNotes] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      return saved !== null ? saved : DEFAULT_STUDY_NOTES;
    } catch {
      return DEFAULT_STUDY_NOTES;
    }
  });
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(notes);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Export Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [includeMatrix, setIncludeMatrix] = useState(true);
  const [includeArticles, setIncludeArticles] = useState(true);
  const [includePrinciples, setIncludePrinciples] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [customReportName, setCustomReportName] = useState(candidateName);

  useEffect(() => {
    if (candidateName) {
      setCustomReportName(candidateName);
    }
  }, [candidateName]);

  const handleSaveNotes = () => {
    setNotes(notesDraft);
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, notesDraft);
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
    setIsEditingNotes(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2500);
  };

  const handleResetToDefaultNotes = () => {
    setNotesDraft(DEFAULT_STUDY_NOTES);
    setNotes(DEFAULT_STUDY_NOTES);
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, DEFAULT_STUDY_NOTES);
    } catch (e) {
      console.error(e);
    }
    setIsEditingNotes(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2500);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
              <span>FOUNDING CONSTITUTIONAL COMPACT</span>
              <span aria-hidden="true">·</span>
              <span>SIGNED 6 FEBRUARY 1840</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Te Tiriti o Waitangi: Dual Text Comparison
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export PDF / Print Button */}
            <button
              onClick={() => {
                setNotesDraft(notes);
                setIsExportModalOpen(true);
              }}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              title="Export complete comparison and your revision notes as a printable PDF report"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
              <span>Export Printable PDF</span>
            </button>

            <button
              onClick={onToggleTreatyModule}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors border flex items-center gap-1.5 whitespace-nowrap ${
                isTreatyModuleCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              {isTreatyModuleCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Module Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>

            <button
              onClick={onPracticeTreatyQuestions}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors whitespace-nowrap shadow-xs"
            >
              Practice Treaty Quiz
            </button>
          </div>
        </div>

        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed">
          The Treaty of Waitangi was signed in two languages: Te Reo Māori and English. Over 500 Māori leaders signed the Māori text, while around 39 signed the English text. Understanding the differences between these two texts is fundamental for every New Zealand citizen.
        </p>

        {/* Article Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 overflow-x-auto">
          {TREATY_ARTICLES_COMPARISON.map((art, idx) => (
            <button
              key={art.number}
              onClick={() => setActiveArticleIndex(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeArticleIndex === idx
                  ? 'bg-emerald-900 dark:bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Article {art.number}: {art.title.split(':')[1]?.trim() || art.title}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Dual Text Comparison Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs transition-colors">
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-900 dark:text-emerald-400 font-bold">
              Comparative Analysis
            </span>
            <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              {activeArticle.title}
            </h2>
          </div>

          <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Core Concept: <strong className="text-emerald-900 dark:text-emerald-400">{activeArticle.maoriVersion.keyConcept}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
          
          {/* Column 1: Māori Version (Te Tiriti) */}
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-400">
                Te Reo Māori Text (Te Tiriti)
              </span>
              <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">Signed by 500+ Chiefs</span>
            </div>

            <div className="font-editorial text-sm md:text-base text-stone-800 dark:text-stone-200 italic bg-stone-50/80 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700 leading-relaxed">
              “{activeArticle.maoriVersion.text}”
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <strong className="text-stone-800 dark:text-stone-200">Direct Translation to English:</strong>
              <p className="leading-relaxed bg-white dark:bg-stone-850 p-3 rounded-lg border border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                {activeArticle.maoriVersion.translation}
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <strong className="text-stone-800 dark:text-stone-200">What Māori Understood & Agreed To:</strong>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeArticle.maoriVersion.interpretation}
              </p>
            </div>
          </div>

          {/* Column 2: English Draft */}
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                English Text (The Treaty)
              </span>
              <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">Signed by ~39 Chiefs</span>
            </div>

            <div className="font-editorial text-sm md:text-base text-stone-800 dark:text-stone-200 bg-stone-50/80 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700 leading-relaxed">
              “{activeArticle.englishVersion.text}”
            </div>

            <div className="space-y-1.5 text-xs">
              <strong className="text-stone-800 dark:text-stone-200">British Crown Intention:</strong>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed bg-white dark:bg-stone-850 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                {activeArticle.englishVersion.interpretation}
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <strong className="text-stone-800 dark:text-stone-200">The Crucial Linguistic Difference:</strong>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeArticle.number === 1 && "Chiefs ceded 'kāwanatanga' (governance over settlers), not their supreme sovereign mana. The Crown drafted 'sovereignty' without finding an equivalent Māori word."}
                {activeArticle.number === 2 && "The English text guaranteed property ownership of lands, while the Māori text confirmed 'tino rangatiratanga' (unrestricted chieftainship and authority) over lands and all treasured possessions (taonga katoa)."}
                {activeArticle.number === 3 && "Both texts harmonize in Article 3: imparting all rights, royal protection, and equality (ōritetanga) to Māori people."}
              </p>
            </div>
          </div>

        </div>

        {/* Modern Significance Strip */}
        <div className="p-5 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
          <div className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>Modern Judicial & Civic Significance</span>
          </div>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            {activeArticle.modernSignificance}
          </p>
        </div>
      </div>

      {/* The 4 Principles of Te Tiriti Section */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
            Legal Framework
          </span>
          <h2 className="text-xl md:text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
            The Principles of the Treaty of Waitangi
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
            Because of the textual differences between the Māori and English versions, New Zealand law and courts focus on the overarching “Principles of the Treaty” established in landmark cases such as the 1987 Lands Case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TREATY_PRINCIPLES.map((tp, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-900 dark:bg-emerald-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                  {idx + 1}
                </span>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {tp.principle}
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-7">
                {tp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Candidate Summary Notes Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
              <FileText className="w-4 h-4" />
              <span>Personal Study Notes & Key Takeaways</span>
            </div>
            <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
              Candidate Revision Notes
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Personalized summary points saved locally for quick review and inclusion in your printable PDF report.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditingNotes ? (
              <>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
                <button
                  onClick={() => {
                    setNotesDraft(notes);
                    setIsEditingNotes(false);
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setNotesDraft(notes);
                    setIsEditingNotes(true);
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Notes</span>
                </button>

                <button
                  onClick={handleResetToDefaultNotes}
                  className="px-3 py-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Reset to comprehensive standard revision notes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Standard Notes</span>
                </button>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export Report PDF</span>
                </button>
              </>
            )}
          </div>
        </div>

        {showSaveSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Study notes successfully saved! They are ready to export in your printable PDF report.</span>
          </div>
        )}

        {isEditingNotes ? (
          <div className="space-y-3">
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-emerald-500 leading-relaxed resize-y"
              placeholder="Write your personal reflections, key Treaty distinctions, and examination mnemonics..."
            />
            <p className="text-[11px] text-stone-400 dark:text-stone-500">
              Tip: Bullet points starting with numbers or hyphens will be cleanly rendered in the printable PDF study report.
            </p>
          </div>
        ) : (
          <div className="bg-stone-50/80 dark:bg-stone-800/50 p-5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed font-sans">
            {notes}
          </div>
        )}
      </div>

      {/* Printable PDF Report Modal & Full Canvas */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/80 backdrop-blur-sm overflow-y-auto print-modal-backdrop">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-4 sm:my-8 transition-colors">
            
            {/* Modal Controls Bar (Hidden during print) */}
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print bg-stone-50 dark:bg-stone-850">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  <Printer className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                  <span>Export Treaty Study Report (Print / PDF)</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Select your options below and click Print. In your browser print dialog, choose <strong>“Save as PDF”</strong> to download offline.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleTriggerPrint}
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customization Toolstrip (Hidden during print) */}
            <div className="px-5 py-3 border-b border-stone-100 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/90 no-print flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 dark:text-stone-400">Candidate Name:</span>
                <input
                  type="text"
                  value={customReportName}
                  onChange={(e) => setCustomReportName(e.target.value)}
                  placeholder="Your Name"
                  className="px-2.5 py-1 text-xs border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-stone-700 dark:text-stone-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMatrix}
                    onChange={(e) => setIncludeMatrix(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                  />
                  <span>Matrix</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeArticles}
                    onChange={(e) => setIncludeArticles(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                  />
                  <span>Articles 1–3</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePrinciples}
                    onChange={(e) => setIncludePrinciples(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                  />
                  <span>Principles (3Ps)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNotes}
                    onChange={(e) => setIncludeNotes(e.target.checked)}
                    className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                  />
                  <span>Study Notes</span>
                </label>
              </div>
            </div>

            {/* Printable Document Paper Canvas */}
            <div className="max-h-[75vh] overflow-y-auto p-4 sm:p-8 bg-stone-100 dark:bg-stone-950">
              <div className="print-sheet bg-white text-stone-900 max-w-3xl mx-auto p-8 sm:p-12 rounded-xl shadow-md border border-stone-200 space-y-8 font-sans">
                
                {/* Official Report Header */}
                <div className="border-b-2 border-stone-900 pb-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-emerald-950 uppercase font-bold">
                        AOTEAROA NEW ZEALAND CITIZENSHIP STUDY PLATFORM
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-950 tracking-tight mt-0.5">
                        Te Tiriti o Waitangi / The Treaty of Waitangi
                      </h1>
                      <p className="text-xs text-stone-600 font-medium">
                        Dual Language Constitutional Comparison & Candidate Revision Brief
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-lg bg-emerald-950 text-white flex items-center justify-center font-editorial font-bold text-sm shrink-0">
                      NZ
                    </div>
                  </div>

                  {/* Document Metadata Bar */}
                  <div className="pt-2 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase tracking-wider font-mono">Candidate</span>
                      <strong className="text-stone-900 font-semibold">{customReportName || 'Candidate'}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase tracking-wider font-mono">Date Generated</span>
                      <strong className="text-stone-900 font-semibold">{currentDateFormatted}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase tracking-wider font-mono">Original Signing</span>
                      <strong className="text-stone-900 font-semibold">6 February 1840</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[9px] uppercase tracking-wider font-mono">Curriculum Focus</span>
                      <strong className="text-stone-900 font-semibold">Citizenship Core</strong>
                    </div>
                  </div>
                </div>

                {/* Section 1: Executive Comparison Matrix */}
                {includeMatrix && (
                  <div className="space-y-3 page-break-avoid">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-900" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 font-mono">
                        1. Executive Comparative Matrix (Articles 1–3)
                      </h2>
                    </div>

                    <div className="border border-stone-300 rounded-lg overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-semibold text-[11px]">
                            <th className="p-2.5 border-r border-stone-300 w-16">Article</th>
                            <th className="p-2.5 border-r border-stone-300">Te Reo Māori Concept</th>
                            <th className="p-2.5 border-r border-stone-300">English Draft Term</th>
                            <th className="p-2.5">Key Constitutional Distinction</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          <tr>
                            <td className="p-2.5 font-bold border-r border-stone-200 bg-stone-50/50">Article 1</td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-emerald-950 font-semibold">Kāwanatanga</strong>
                              <span className="block text-[11px] text-stone-600">Civil governorship over British settlers to maintain peace</span>
                            </td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-stone-900 font-semibold">Sovereignty</strong>
                              <span className="block text-[11px] text-stone-600">Absolute supreme power over the islands</span>
                            </td>
                            <td className="p-2.5 text-stone-700 text-[11px]">
                              Māori ceded governance, retaining their chieftain mana. English text drafted total sovereignty.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold border-r border-stone-200 bg-stone-50/50">Article 2</td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-emerald-950 font-semibold">Te Tino Rangatiratanga</strong>
                              <span className="block text-[11px] text-stone-600">Full chieftainship over lands, villages & taonga katoa (treasures)</span>
                            </td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-stone-900 font-semibold">Possession / Property</strong>
                              <span className="block text-[11px] text-stone-600">Undisturbed possession of physical estates, forests & fisheries</span>
                            </td>
                            <td className="p-2.5 text-stone-700 text-[11px]">
                              Māori text guaranteed self-determination & all taonga (including culture & language); English emphasized legal property.
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold border-r border-stone-200 bg-stone-50/50">Article 3</td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-emerald-950 font-semibold">Ōritetanga me ngā Tikanga</strong>
                              <span className="block text-[11px] text-stone-600">Equal rights, customs & royal protection</span>
                            </td>
                            <td className="p-2.5 border-r border-stone-200">
                              <strong className="text-stone-900 font-semibold">Rights of British Subjects</strong>
                              <span className="block text-[11px] text-stone-600">Royal protection & full legal privileges</span>
                            </td>
                            <td className="p-2.5 text-stone-700 text-[11px]">
                              Harmonious agreement: Guarantee of non-discrimination and equal citizenship rights for all citizens.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Section 2: Detailed Article Dual-Text Comparison */}
                {includeArticles && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-900" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 font-mono">
                        2. Detailed Dual-Text Analysis
                      </h2>
                    </div>

                    {TREATY_ARTICLES_COMPARISON.map((art) => (
                      <div key={art.number} className="border border-stone-200 rounded-lg p-4 space-y-3 page-break-avoid">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                          <h3 className="font-editorial font-bold text-base text-stone-950">
                            {art.title}
                          </h3>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-950 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Concept: {art.maoriVersion.keyConcept}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {/* Māori column */}
                          <div className="space-y-2 bg-stone-50/60 p-3 rounded-md border border-stone-100">
                            <span className="text-[10px] font-bold uppercase text-emerald-950 font-mono block">
                              Te Reo Māori Text (Te Tiriti)
                            </span>
                            <p className="font-editorial italic text-stone-800 text-[11px]">
                              “{art.maoriVersion.text}”
                            </p>
                            <div className="text-[11px] text-stone-600 pt-1">
                              <strong>Direct English Translation: </strong>
                              {art.maoriVersion.translation}
                            </div>
                            <div className="text-[11px] text-stone-700 pt-1">
                              <strong>Māori Signatories' Understanding: </strong>
                              {art.maoriVersion.interpretation}
                            </div>
                          </div>

                          {/* English column */}
                          <div className="space-y-2 bg-stone-50/60 p-3 rounded-md border border-stone-100">
                            <span className="text-[10px] font-bold uppercase text-stone-700 font-mono block">
                              English Draft (The Treaty)
                            </span>
                            <p className="font-editorial text-stone-800 text-[11px]">
                              “{art.englishVersion.text}”
                            </p>
                            <div className="text-[11px] text-stone-700 pt-1">
                              <strong>British Crown Intention: </strong>
                              {art.englishVersion.interpretation}
                            </div>
                          </div>
                        </div>

                        {/* Modern Significance note */}
                        <div className="p-2.5 bg-emerald-50/40 border border-emerald-100 rounded text-[11px] text-stone-800">
                          <strong className="text-emerald-950">Constitutional & Civic Significance: </strong>
                          {art.modernSignificance}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section 3: Principles of the Treaty */}
                {includePrinciples && (
                  <div className="space-y-3 page-break-avoid">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-900" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 font-mono">
                        3. The Core Principles of Te Tiriti (The 3Ps & Redress)
                      </h2>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      Established by landmark New Zealand jurisprudence (including the 1987 Lands Case) and statutory law, bridging differences between the texts through actionable constitutional duties:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {TREATY_PRINCIPLES.map((tp, idx) => (
                        <div key={idx} className="p-3 border border-stone-200 rounded-lg bg-stone-50/50 space-y-1">
                          <div className="font-bold text-stone-950 text-xs flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-emerald-950 text-white flex items-center justify-center text-[9px] font-mono">
                              {idx + 1}
                            </span>
                            <span>{tp.principle}</span>
                          </div>
                          <p className="text-[11px] text-stone-700 leading-relaxed pl-5">
                            {tp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Candidate's Personal Notes */}
                {includeNotes && (
                  <div className="space-y-3 page-break-avoid">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-900" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 font-mono">
                        4. Candidate Personal Study Summary & Notes
                      </h2>
                    </div>

                    <div className="border border-stone-300 p-4 rounded-lg bg-stone-50/60 text-xs text-stone-800 whitespace-pre-line leading-relaxed font-sans">
                      {notes || 'No custom notes provided.'}
                    </div>
                  </div>
                )}

                {/* Printable Document Footer */}
                <div className="pt-6 border-t border-stone-300 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                  <span>Prepared for New Zealand Citizenship Test & Civic Review</span>
                  <span>Te Tiriti o Waitangi Study Brief · Page 1 of 1</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
