import React from 'react';
import { CHANGELOG_HIGHLIGHTS, ENGINEERING_FIXES } from '../data/storeContent';

export const ChangelogSection: React.FC = () => {
  return (
    <section id="changelog" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-14">
        {/* Latest Release Updates: Bluetooth, Wi-Fi Direct, Background Battery & General Fixes */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-[#00C48C]">
                Changelog · Latest Android Release Updates
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
                What’s new in Meshly
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3A8] leading-relaxed">
                Expanded offline transport support with Bluetooth and Wi-Fi Direct, unrestricted
                background battery reachability, and general reliability fixes.
              </p>
            </div>

            <div className="text-xs font-mono text-[#94A3A8] shrink-0">
              Android Release Changelog
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {CHANGELOG_HIGHLIGHTS.map((entry) => (
              <article
                key={entry.title}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#00C48C]">{entry.tag}</p>
                  <h3 className="mt-2 text-lg font-display font-bold text-[#F1F5F6]">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#94A3A8] leading-relaxed">{entry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Release Engineering · Version 1.2.0 Stability Hardening */}
        <div className="pt-12 border-t border-white/[0.07]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Release Engineering · Version 1.2.0 Stability Hardening
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              What caused the startup crash and how v1.2.0 fixed it
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#94A3A8] leading-relaxed">
              Production hardening in Meshly v1.2.0 eliminated coroutine thread-pool exhaustion,
              Android 12+ foreground service race conditions during runtime permission dialogs, and
              Room schema migration mismatches.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {ENGINEERING_FIXES.map((item) => (
              <article
                key={item.index}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#00C48C]">v1.2.0 Fix · {item.index}</p>
                  <h4 className="mt-2 text-lg font-display font-bold text-[#F1F5F6]">
                    {item.title}
                  </h4>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed">
                    <p className="text-[#94A3A8]">
                      <strong className="text-[#E2E8EB] font-semibold">Root Cause: </strong>
                      {item.rootCause}
                    </p>
                    <p className="text-[#CBD5D9]">
                      <strong className="text-[#00C48C] font-semibold">v1.2.0 Fix: </strong>
                      {item.resolution}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
