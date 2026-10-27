import React, { useEffect, useState } from 'react';
import { Smartphone, Settings, ExternalLink, ShieldCheck } from 'lucide-react';
import { getAdMobConfig, ensureAdMobScriptLoaded, ADMOB_SAMPLE_IDS } from '../utils/admob';

interface AdMobBannerProps {
  adUnitId?: string;
  format?: 'banner' | 'medium_rectangle' | 'adaptive';
  className?: string;
  onOpenSettings?: () => void;
  label?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  adUnitId,
  format = 'adaptive',
  className = '',
  onOpenSettings,
  label = 'SPONSORED'
}) => {
  const [config, setConfig] = useState(getAdMobConfig());

  useEffect(() => {
    ensureAdMobScriptLoaded();
    const handleStorage = () => setConfig(getAdMobConfig());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const activeUnitId = adUnitId || (config.isTestMode ? ADMOB_SAMPLE_IDS.BANNER : config.bannerAdUnitId);
  const isTest = config.isTestMode || activeUnitId.includes('3940256099942544');

  return (
    <div className={`my-6 mx-auto w-full max-w-5xl no-print ${className}`}>
      {/* Policy-compliant AdMob header bar */}
      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 mb-1.5 px-1">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-3 h-3 text-stone-400 dark:text-stone-500" />
          <span>{label}</span>
          <span className="text-stone-300 dark:text-stone-600">·</span>
          <span>Google AdMob</span>
          {isTest && (
            <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 rounded font-semibold text-[9px] lowercase tracking-normal">
              test ad
            </span>
          )}
        </div>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            title="Configure AdMob App ID & Ad Units"
          >
            <Settings className="w-3 h-3" />
            <span className="capitalize text-[10px] font-sans">AdMob Settings</span>
          </button>
        )}
      </div>

      {/* AdMob Banner Box */}
      <div className="relative overflow-hidden rounded-xl border border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-2 sm:p-3 transition-colors min-h-[90px] flex items-center justify-center">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between p-4 gap-3 bg-gradient-to-r from-stone-50 via-emerald-50/25 to-stone-100 dark:from-stone-900 dark:via-emerald-950/20 dark:to-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-stone-900 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-emerald-700/30">
              <span className="text-[10px] uppercase font-mono tracking-tighter">AdMob</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  New Zealand Citizenship Guide Partner
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Google Mobile Ads
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 max-w-lg leading-relaxed mt-0.5">
                Practice civic tests, master Te Reo Māori pronunciations, and track your readiness. 
                Unit: <code className="text-stone-700 dark:text-stone-300 font-mono text-[10px]">{activeUnitId}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenSettings ? (
              <button
                onClick={onOpenSettings}
                className="px-3 py-1.5 text-xs bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                Configure AdMob
              </button>
            ) : (
              <a
                href="https://admob.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs flex items-center gap-1 transition-colors"
              >
                <span>Google AdMob</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
