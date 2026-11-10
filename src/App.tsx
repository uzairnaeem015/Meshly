import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PhoneSimulator } from './components/PhoneSimulator';
import { ScreenshotsShowcase } from './components/ScreenshotsShowcase';
import { FeaturesAndEngineering } from './components/FeaturesAndEngineering';
import { PlayConsoleHub } from './components/PlayConsoleHub';
import { PrivacyPolicySection } from './components/PrivacyPolicySection';
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
            {/* Hero Section — 2-Column Asymmetric Balance */}
            <section className="pt-14 pb-20 lg:pt-20 lg:pb-24">
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                  {/* Left 7 Columns: Core Value Proposition */}
                  <div className="lg:col-span-7">
                    <p className="text-xs sm:text-sm font-mono text-[#00C48C]">
                      Android Peer-to-Peer Messenger · Free · Contains Ads · In-App Purchases
                    </p>

                    <h1 className="mt-4 font-display font-bold tracking-tight text-[#F1F5F6] text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.08] [text-wrap:balance]">
                      Chat, share files, and call over local Wi-Fi or Hotspot.
                    </h1>

                    <p className="mt-5 text-base sm:text-lg text-[#94A3A8] leading-relaxed max-w-[60ch]">
                      Meshly connects nearby Android devices directly over the same Wi-Fi router or
                      mobile hotspot — with no internet connection, external accounts, or cloud
                      relays required. Ideal for flights, cruise ships, campuses, hotels, and local
                      teams.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="#privacy"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00C48C] hover:bg-[#1AD49E] text-[#042319] font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>Read Official Privacy Policy</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <a
                        href="#play-console"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-[#F1F5F6] font-medium text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        Google Play Listing Copy
                      </a>
                    </div>

                    <p className="mt-6 text-xs text-[#94A3A8]">
                      Try the populated Android preview on the right: search accepted contacts, send
                      a local LAN message, approve peer chat requests, or unlock Live Typing Preview
                      Pro in Settings.
                    </p>
                  </div>

                  {/* Right 5 Columns: Interactive Populated Android Preview */}
                  <div id="simulator" className="lg:col-span-5">
                    <PhoneSimulator />
                  </div>
                </div>

                {/* Full-Width Quantitative Architecture Strip Below Hero */}
                <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-[#F1F5F6] font-mono tabular-nums">
                      0 Chat Servers
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#94A3A8]">
                      Direct device-to-device LAN sockets for messages, voice/video calls, and files
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-[#F1F5F6] font-mono tabular-nums">
                      SHA-256
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#94A3A8]">
                      Automatic file integrity verification &amp; pause/resume for original media
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-[#F1F5F6] font-mono tabular-nums">
                      16-Socket Pool
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#94A3A8]">
                      Bounded /24 subnet discovery &amp; mDNS (_meshly._tcp) in v1.2.0
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-[#F1F5F6] font-mono tabular-nums">
                      100% Local
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#94A3A8]">
                      Stored in app-private storage or your chosen Android SAF folder
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real Attached Android Screenshots */}
            <ScreenshotsShowcase />

            {/* Core Capabilities, v1.2.0 Crash Fix Engineering & Permissions */}
            <FeaturesAndEngineering />

            {/* Complete Google Play Store Listing & Console Kit */}
            <PlayConsoleHub />

            {/* Official Ready-to-Host Privacy Policy */}
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
            <span>Local Wi-Fi Messenger for Android (v1.2.0)</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#features" onClick={handleShowAllSections} className="hover:text-white">
              Features
            </a>
            <a href="#screenshots" onClick={handleShowAllSections} className="hover:text-white">
              Screenshots
            </a>
            <a href="#engineering" onClick={handleShowAllSections} className="hover:text-white">
              v1.2.0 Release Notes
            </a>
            <a href="#play-console" onClick={handleShowAllSections} className="hover:text-white">
              Play Console Kit
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
