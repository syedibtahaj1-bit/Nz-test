import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Smartphone, 
  FileCode, 
  Globe, 
  Play, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { 
  getAdMobConfig, 
  saveAdMobConfig, 
  AdMobConfig, 
  ADMOB_SAMPLE_IDS 
} from '../utils/admob';

interface AdMobSetupModalProps {
  onClose: () => void;
  onPreviewInterstitial?: () => void;
}

export const AdMobSetupModal: React.FC<AdMobSetupModalProps> = ({ 
  onClose,
  onPreviewInterstitial 
}) => {
  const [config, setConfig] = useState<AdMobConfig>(getAdMobConfig());
  const [copiedAppAdsTxt, setCopiedAppAdsTxt] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Extract publisher ID from App ID or use sample
  const pubMatch = config.appId.match(/pub-\d+/);
  const publisherId = pubMatch ? pubMatch[0] : ADMOB_SAMPLE_IDS.PUBLISHER_ID;

  const appAdsTxtSnippet = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
  const metaTagSnippet = `<meta name="google-admob-app-id" content="${config.appId}">`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdMobConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetToTestSample = () => {
    const sampleConfig: AdMobConfig = {
      appId: ADMOB_SAMPLE_IDS.APP_ID,
      bannerAdUnitId: ADMOB_SAMPLE_IDS.BANNER,
      interstitialAdUnitId: ADMOB_SAMPLE_IDS.INTERSTITIAL,
      rewardedAdUnitId: ADMOB_SAMPLE_IDS.REWARDED,
      isTestMode: true
    };
    setConfig(sampleConfig);
    saveAdMobConfig(sampleConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const copyToClipboard = (text: string, type: 'appAdsTxt' | 'meta') => {
    navigator.clipboard.writeText(text);
    if (type === 'appAdsTxt') {
      setCopiedAppAdsTxt(true);
      setTimeout(() => setCopiedAppAdsTxt(false), 2000);
    } else {
      setCopiedMeta(true);
      setTimeout(() => setCopiedMeta(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-sm overflow-y-auto no-print">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8 transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-stone-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Smartphone className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-editorial font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Google AdMob Integration</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold">
                  Active
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Monetize your New Zealand Citizenship app with Google Mobile Ads (Banner, Interstitial, & app-ads.txt)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-stone-700 dark:text-stone-300 max-h-[75vh] overflow-y-auto">
          
          {/* Status Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-emerald-950 dark:text-emerald-200 block text-xs">
                Google AdMob & Mobile Ads SDK Connected
              </span>
              <p className="text-emerald-900 dark:text-emerald-300/90 leading-relaxed text-[11px]">
                Google Mobile Ads tag, app ID meta tags, and root <code className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded text-emerald-950 dark:text-emerald-100">/app-ads.txt</code> are installed. Official Google sample test IDs are active by default to protect your account against invalid traffic violations during development.
              </p>
            </div>
          </div>

          {/* Test Ad Unit Live Preview Action */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs block">
                Test Interstitial Ad Experience
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Preview full-screen interstitial ad display between mock exam rounds
              </p>
            </div>
            {onPreviewInterstitial && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPreviewInterstitial();
                }}
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Show Interstitial</span>
              </button>
            )}
          </div>

          {/* Form to configure AdMob IDs */}
          <form onSubmit={handleSave} className="space-y-4 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-xs">
                  AdMob IDs Configuration
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Switch between official sample test units or your production AdMob units.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetToTestSample}
                className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 cursor-pointer"
                title="Reset to Google Official Sample Test IDs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Sample IDs</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* AdMob App ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block">
                  AdMob App ID <span className="text-stone-400 font-mono">(ca-app-pub-XXXXXXXX~XXXXXXXX)</span>
                </label>
                <input
                  type="text"
                  value={config.appId}
                  onChange={(e) => setConfig({ ...config, appId: e.target.value })}
                  placeholder="ca-app-pub-3940256099942544~3347511713"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Banner Unit ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block">
                  Banner Ad Unit ID <span className="text-stone-400 font-mono">(ca-app-pub-XXXXXXXX/XXXXXXXX)</span>
                </label>
                <input
                  type="text"
                  value={config.bannerAdUnitId}
                  onChange={(e) => setConfig({ ...config, bannerAdUnitId: e.target.value })}
                  placeholder="ca-app-pub-3940256099942544/6300978111"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Interstitial Unit ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block">
                  Interstitial Ad Unit ID <span className="text-stone-400 font-mono">(ca-app-pub-XXXXXXXX/XXXXXXXX)</span>
                </label>
                <input
                  type="text"
                  value={config.interstitialAdUnitId}
                  onChange={(e) => setConfig({ ...config, interstitialAdUnitId: e.target.value })}
                  placeholder="ca-app-pub-3940256099942544/1033173712"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Test Mode Toggle */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="font-medium text-stone-800 dark:text-stone-200 block text-xs">
                    Safe Test Mode (Recommended during development)
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Always returns test ads and eliminates accidental policy strikes.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={config.isTestMode}
                  onChange={(e) => setConfig({ ...config, isTestMode: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-xs cursor-pointer"
              >
                Save AdMob Configuration
              </button>

              {saveSuccess && (
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Configuration saved!</span>
                </div>
              )}
            </div>
          </form>

          {/* Verification Deliverables */}
          <div className="space-y-3">
            <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs uppercase tracking-wider font-mono">
              AdMob Developer Verification Standards
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Deliverable 1: app-ads.txt */}
              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-[11px]">
                    <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>1. Root /app-ads.txt</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(appAdsTxtSnippet, 'appAdsTxt')}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedAppAdsTxt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAppAdsTxt ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-2 bg-stone-100 dark:bg-stone-900 rounded font-mono text-[10px] text-stone-700 dark:text-stone-300 overflow-x-auto">
                  {appAdsTxtSnippet}
                </pre>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Deployed at /app-ads.txt</span>
                </div>
              </div>

              {/* Deliverable 2: Head Meta Tag */}
              <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-[11px]">
                    <FileCode className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>2. &lt;head&gt; App ID Tag</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(metaTagSnippet, 'meta')}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedMeta ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMeta ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-2 bg-stone-100 dark:bg-stone-900 rounded font-mono text-[10px] text-stone-700 dark:text-stone-300 overflow-x-auto">
                  {metaTagSnippet}
                </pre>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Configured in index.html</span>
                </div>
              </div>
            </div>
          </div>

          {/* AdMob Setup Guide */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100 block text-xs">
              AdMob Next Steps & Account Setup:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              <li>Log in to the <a href="https://admob.google.com" target="_blank" rel="noreferrer" className="text-emerald-800 dark:text-emerald-400 underline font-medium">Google AdMob Console</a>.</li>
              <li>Go to <strong>Apps → Add App</strong> (select Platform: Android / iOS / Web PWA).</li>
              <li>Create your <strong>Banner</strong> and <strong>Interstitial</strong> Ad Units and paste their IDs above.</li>
              <li>Under <strong>Apps → app-ads.txt</strong>, verify your domain. AdMob automatically crawls <code className="font-mono text-[10px]">https://your-domain.com/app-ads.txt</code>.</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex items-center justify-between">
          <a
            href="https://admob.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-stone-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <span>Open Google AdMob Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
