// Google AdMob Configuration & Utilities
// Uses official Google AdMob sample test IDs by default to guarantee 100% compliance during development

export const ADMOB_SAMPLE_IDS = {
  APP_ID: 'ca-app-pub-3940256099942544~3347511713',
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
  PUBLISHER_ID: 'pub-3940256099942544'
};

const STORAGE_KEY_ADMOB_CONFIG = 'nz_citizenship_admob_config';

export interface AdMobConfig {
  appId: string;
  bannerAdUnitId: string;
  interstitialAdUnitId: string;
  rewardedAdUnitId: string;
  isTestMode: boolean;
}

export function getAdMobConfig(): AdMobConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMOB_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        appId: parsed.appId || (import.meta.env.VITE_ADMOB_APP_ID as string) || ADMOB_SAMPLE_IDS.APP_ID,
        bannerAdUnitId: parsed.bannerAdUnitId || (import.meta.env.VITE_ADMOB_BANNER_ID as string) || ADMOB_SAMPLE_IDS.BANNER,
        interstitialAdUnitId: parsed.interstitialAdUnitId || (import.meta.env.VITE_ADMOB_INTERSTITIAL_ID as string) || ADMOB_SAMPLE_IDS.INTERSTITIAL,
        rewardedAdUnitId: parsed.rewardedAdUnitId || (import.meta.env.VITE_ADMOB_REWARDED_ID as string) || ADMOB_SAMPLE_IDS.REWARDED,
        isTestMode: parsed.isTestMode !== undefined ? parsed.isTestMode : true
      };
    }
  } catch (e) {
    console.error('Failed reading AdMob config', e);
  }

  return {
    appId: (import.meta.env.VITE_ADMOB_APP_ID as string) || ADMOB_SAMPLE_IDS.APP_ID,
    bannerAdUnitId: (import.meta.env.VITE_ADMOB_BANNER_ID as string) || ADMOB_SAMPLE_IDS.BANNER,
    interstitialAdUnitId: (import.meta.env.VITE_ADMOB_INTERSTITIAL_ID as string) || ADMOB_SAMPLE_IDS.INTERSTITIAL,
    rewardedAdUnitId: (import.meta.env.VITE_ADMOB_REWARDED_ID as string) || ADMOB_SAMPLE_IDS.REWARDED,
    isTestMode: true
  };
}

export function saveAdMobConfig(config: AdMobConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_ADMOB_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed saving AdMob config', e);
  }
}

/**
 * Injects Google Publisher Tag / Google Mobile Ads Web script for AdMob
 */
export function ensureAdMobScriptLoaded(): void {
  if (typeof window === 'undefined') return;

  const scriptId = 'google-admob-gpt-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
}
