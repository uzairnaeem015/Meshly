import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { FeaturesAndEngineering } from './components/FeaturesAndEngineering';
import { ScreenshotsShowcase } from './components/ScreenshotsShowcase';
import { SecurityOverviewSection } from './components/SecurityOverviewSection';
import { ChangelogSection } from './components/ChangelogSection';
import { PrivacyPolicySection } from './components/PrivacyPolicySection';
import { HERO_CONTENT } from './data/storeContent';
import { ActiveRouteView, resolveInitialView } from './utils/meshlyLogic';

export default function App() {
  const [routeMode, setRouteMode] = useState<ActiveRouteView>(() => {
    if (typeof window === 'undefined') return 'all';
    return resolveInitialView(window.location.hash, window.location.search).mode;
  });

  useEffect(() => {
    const syncFromUrl = () => {
      const resolved = resolveInitialView(window.location.hash, window.location.search);
      setRouteMode(resolved.mode);
      if (resolved.scrollTargetId) {
        const el = document.getElementById(resolved.scrollTargetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    syncFromUrl();
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  const handleShowAllSections = () => {
    setRouteMode('all');
    if (window.location.search.includes('page=privacy')) {
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#0B1114] text-[#F1F5F6]">
      <Navbar onShowAllSections={handleShowAllSections} />

      <main className="flex-1">
        {routeMode === 'privacy-focused' ? (
          <PrivacyPolicySection
            isStandaloneMode={true}
            onExitStandalone={handleShowAllSections}
          />
        ) : (
          <>
            {/* Clean Simulator-Free Hero Section + What Meshly Does */}
            <section className="pt-16 pb-20 lg:pt-24 lg:pb-24">
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
                  {/* Left 7 Columns: Core Proposition */}
                  <div className="lg:col-span-7">
                    <p className="text-xs sm:text-sm font-mono text-[#00C48C]">
                      {HERO_CONTENT.kicker}
                    </p>

                    <h1 className="mt-4 font-display font-bold tracking-tight text-[#F1F5F6] text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.08] [text-wrap:balance]">
                      {HERO_CONTENT.headline}
                    </h1>

                    <p className="mt-5 text-base sm:text-lg text-[#94A3A8] leading-relaxed max-w-[62ch]">
                      {HERO_CONTENT.subheadline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="#features"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00C48C] hover:bg-[#1AD49E] text-[#042319] font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>Explore Features</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <a
                        href="#security"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-[#F1F5F6] font-medium text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        Privacy &amp; Security Overview
                      </a>
                    </div>
                  </div>

                  {/* Right 5 Columns: What Meshly Does Editorial Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-7">
                      <p className="text-xs font-mono text-[#00C48C]">
                        Peer-to-Peer Architecture
                      </p>
                      <h2 className="mt-2 text-xl sm:text-2xl font-display font-bold text-[#F1F5F6]">
                        {HERO_CONTENT.whatMeshlyDoesTitle}
                      </h2>
                      <p className="mt-3 text-sm sm:text-[15px] text-[#CBD5D9] leading-relaxed">
                        {HERO_CONTENT.whatMeshlyDoesBody}
                      </p>
                      <div className="mt-6 pt-4 border-t border-white/[0.07] text-xs font-mono text-[#94A3A8]">
                        No Cloud Servers · No Phone Numbers · No Internet Required
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-Width 4-Column Architectural Proof Strip */}
                <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {HERO_CONTENT.metrics.map((metric) => (
                    <div key={metric.value}>
                      <div className="text-xl sm:text-2xl font-display font-bold text-[#F1F5F6] font-mono tabular-nums whitespace-nowrap">
                        {metric.value}
                      </div>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#94A3A8] leading-relaxed">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Features Bento Grid & Ideal For Strip */}
            <FeaturesAndEngineering />

            {/* Real Attached Android Screenshots */}
            <ScreenshotsShowcase />

            {/* Privacy & Security Overview, Minimal Permissions & Optional Ads Disclosure */}
            <SecurityOverviewSection />

            {/* Dedicated Changelog Section */}
            <ChangelogSection />

            {/* Formal Privacy Policy */}
            <PrivacyPolicySection />
          </>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-white/[0.08] py-10 bg-[#090E10]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#94A3A8]">
          <div>
            <span className="font-display font-bold text-sm text-[#F1F5F6]">Meshly</span>
            <span className="mx-2" aria-hidden="true">
              {' · '}
            </span>
            <span>Your People. Your Network. No Internet Required.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#features" onClick={handleShowAllSections} className="hover:text-white">
              Features
            </a>
            <a href="#ideal-for" onClick={handleShowAllSections} className="hover:text-white">
              Ideal For
            </a>
            <a href="#screenshots" onClick={handleShowAllSections} className="hover:text-white">
              Screenshots
            </a>
            <a href="#security" onClick={handleShowAllSections} className="hover:text-white">
              Security
            </a>
            <a href="#changelog" onClick={handleShowAllSections} className="hover:text-white">
              Changelog
            </a>
            <a href="?page=privacy" className="hover:text-white">
              Standalone Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
