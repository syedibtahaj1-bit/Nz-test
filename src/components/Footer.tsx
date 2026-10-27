import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAdMobSetup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdMobSetup }) => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 text-stone-600 dark:text-stone-400 text-xs py-12 transition-colors duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-900 text-white flex items-center justify-center font-editorial font-bold text-xs">
                NZ
              </div>
              <span className="font-editorial font-bold text-stone-900 dark:text-stone-100 text-base">
                New Zealand Citizenship Test
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed text-xs">
              An educational citizenship preparation platform designed to help prospective citizens study New Zealand history, Te Tiriti o Waitangi, democratic institutions, and civic responsibilities.
            </p>
            {onOpenAdMobSetup && (
              <div className="pt-2">
                <button
                  onClick={onOpenAdMobSetup}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Google AdMob Connected</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[11px]">
              Official Government Portals
            </span>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li>
                <a 
                  href="https://www.govt.nz/browse/passports-citizenship-and-identity/nz-citizenship/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>Citizenship at DIA</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://vote.nz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>Electoral Enrolment (vote.nz)</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://passports.govt.nz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>NZ Passports Service</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[11px]">
              Cultural & History Resources
            </span>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li>
                <a 
                  href="https://nzhistory.govt.nz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>NZ History (Manatū Taonga)</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://waitangitribunal.govt.nz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>Waitangi Tribunal Inquiry</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://teara.govt.nz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center gap-1"
                >
                  <span>Te Ara Encyclopedia of NZ</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-stone-500 dark:text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} New Zealand Citizenship Test · Curated for New Zealand Citizenship Preparation.
          </div>
          <div>
            Kia kaha, kia māia, kia manawanui · Be strong, be brave, be steadfast.
          </div>
        </div>
      </div>
    </footer>
  );
};
