import React, { useState, useEffect } from 'react';
import { X, Smartphone, ExternalLink, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { getAdMobConfig, ADMOB_SAMPLE_IDS } from '../utils/admob';

interface AdMobInterstitialModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const AdMobInterstitialModal: React.FC<AdMobInterstitialModalProps> = ({
  onClose,
  title = 'Aotearoa Civic Study Partner',
  subtitle = 'Official-style New Zealand Citizenship Test Preparation'
}) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const config = getAdMobConfig();

  const activeUnitId = config.isTestMode ? ADMOB_SAMPLE_IDS.INTERSTITIAL : config.interstitialAdUnitId;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto no-print">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="p-3 bg-stone-100 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
            <Smartphone className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-mono text-[11px] font-semibold">AdMob Interstitial</span>
            <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded text-[9px] font-mono">
              Test Mode
            </span>
          </div>

          <div>
            {canClose ? (
              <button
                onClick={onClose}
                className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Close Ad</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                Reward in {countdown}s
              </span>
            )}
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-800 to-stone-900 text-white flex items-center justify-center shadow-lg shadow-emerald-950/20">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Official Sponsor Spotlight</span>
            </div>
            <h3 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
              {title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
              {subtitle}. Learn key historical dates from 1840 to modern New Zealand, master the 3 Articles of Te Tiriti o Waitangi, and practice civic values.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 text-left space-y-2">
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Google Mobile Ads Ad Unit:</span>
              <span className="font-mono text-[10px] text-stone-700 dark:text-stone-300">{activeUnitId}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Format:</span>
              <span className="font-medium text-stone-700 dark:text-stone-300">Full-Screen Interstitial</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Continue to Citizenship Study
            </button>
            <a
              href="https://admob.google.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>About AdMob</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
