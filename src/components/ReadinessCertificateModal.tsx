import React from 'react';
import { Award, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';
import { calculateProgressSummary } from '../utils/storage';

interface ReadinessCertificateModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const ReadinessCertificateModal: React.FC<ReadinessCertificateModalProps> = ({
  progress,
  onClose
}) => {
  const summary = calculateProgressSummary(progress);
  const candidateName = progress.userName && progress.userName.trim() ? progress.userName : 'Aotearoa Candidate';
  const currentDate = new Date().toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8 transition-colors">
        
        {/* Modal Controls Bar (hidden during print) */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between no-print bg-stone-50 dark:bg-stone-850">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <Award className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>Certificate of Citizenship Knowledge Readiness</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas (high-contrast parchment styling, print-compliant) */}
        <div className="p-8 sm:p-12 text-center bg-stone-50 dark:bg-stone-950/70 relative border-8 border-stone-100 dark:border-stone-800 m-4 rounded-xl">
          {/* Subtle decorative inner hairline border */}
          <div className="border border-emerald-900/20 dark:border-emerald-500/30 p-8 sm:p-10 rounded-lg space-y-6 bg-white dark:bg-stone-900 relative">
            
            {/* Top Emblem & Header */}
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-900 dark:bg-emerald-800 text-white mx-auto flex items-center justify-center font-editorial font-bold text-base shadow-xs">
                NZ
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-900 dark:text-emerald-400 font-bold">
                Aotearoa New Zealand
              </div>
              <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Certificate of Civic Knowledge Readiness
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider font-mono">
                Te Tohu Māramatanga Kirirarau
              </p>
            </div>

            {/* Candidate Presentation */}
            <div className="space-y-2 py-4 border-y border-stone-100 dark:border-stone-800">
              <p className="text-xs text-stone-500 dark:text-stone-400 italic">This certifies that</p>
              <div className="text-2xl sm:text-3xl font-editorial font-bold text-emerald-950 dark:text-emerald-300">
                {candidateName}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                has successfully reviewed the official curriculum modules covering Te Tiriti o Waitangi, New Zealand history, the MMP parliamentary system, Te Ao Māori tikanga, and civic responsibilities.
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-xs py-2">
              <div>
                <span className="text-stone-400 dark:text-stone-500 block text-[11px]">Modules Mastered</span>
                <strong className="text-stone-800 dark:text-stone-200 font-mono-numbers text-sm">{summary.completedModulesCount} of {summary.totalModules}</strong>
              </div>
              <div>
                <span className="text-stone-400 dark:text-stone-500 block text-[11px]">Practice Average</span>
                <strong className="text-emerald-900 dark:text-emerald-400 font-mono-numbers text-sm">{summary.averageTestScore}%</strong>
              </div>
              <div>
                <span className="text-stone-400 dark:text-stone-500 block text-[11px]">Readiness Status</span>
                <strong className="text-emerald-900 dark:text-emerald-400 font-semibold text-[11px] block">{summary.readinessLabel}</strong>
              </div>
            </div>

            {/* Signature & Date Footer */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              <div className="text-left space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">Date Issued</span>
                <div className="font-medium text-stone-800 dark:text-stone-200">{currentDate}</div>
              </div>

              <div className="text-right space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">Preparation Platform</span>
                <div className="font-medium text-stone-800 dark:text-stone-200">New Zealand Citizenship Test</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
