import React from 'react';
import { COMPLIANCE_DECLARATIONS, MESSENGER_STORE_LISTING } from '../data/storeContent';
import { validateStoreListingLimits } from '../utils/meshlyLogic';

export const PlayConsoleHub: React.FC = () => {
  const activeVariant = MESSENGER_STORE_LISTING;
  const limits = validateStoreListingLimits(activeVariant);

  return (
    <section id="play-console" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-[#00C48C]">
            Google Play Store Listing · Messenger Edition
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
            Google Play Store listing &amp; policy declarations
          </h2>
          <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
            Character-verified store metadata, reviewer onboarding instructions, Data Safety
            questionnaire responses, and IARC content rating declarations for{' '}
            <span className="text-[#E2E8EB] font-medium">Meshly: Local Wi-Fi Messenger</span>.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Main Store Listing Fields */}
          <div className="lg:col-span-7 space-y-5">
            {/* App Name */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div>
                <h3 className="text-sm font-semibold text-white">App Name</h3>
                <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                  {limits.appNameLength} / {limits.appNameMax} characters · Play Console Verified
                </p>
              </div>
              <p className="mt-3 font-display text-lg font-bold text-[#F1F5F6]">
                {activeVariant.appName}
              </p>
            </div>

            {/* Short Description */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Short Description</h3>
                <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                  {limits.shortDescLength} / {limits.shortDescMax} characters · Play Console
                  Verified
                </p>
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#E2E8EB] leading-relaxed">
                {activeVariant.shortDescription}
              </p>
            </div>

            {/* Full Description */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Full Description</h3>
                <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                  {limits.fullDescLength} / {limits.fullDescMax} characters · Category:{' '}
                  {activeVariant.category}
                </p>
              </div>
              <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-[#CBD5D9] leading-relaxed">
                {activeVariant.fullDescription}
              </pre>
              <div className="mt-5 pt-4 border-t border-white/[0.07] text-xs text-[#94A3A8]">
                Store Tags: {activeVariant.tags.join(' · ')}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: App Access, Data Safety & Content Rating Declarations */}
          <div className="lg:col-span-5 space-y-5">
            {/* App Access Instructions for Google Play Reviewers */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  App Access (Reviewer Instructions)
                </h3>
                <p className="text-xs text-[#00C48C] mt-0.5">
                  All functionality available without restrictions
                </p>
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#CBD5D9] leading-relaxed">
                {activeVariant.reviewerInstructions}
              </pre>
            </div>

            {/* Data Safety Questionnaire */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <h3 className="text-sm font-semibold text-white">
                Data Safety Questionnaire Declaration
              </h3>
              <p className="mt-2 text-xs text-[#94A3A8]">
                Does your app collect or share any of the required user data types?
              </p>
              <p className="mt-2 text-sm font-medium text-[#F1F5F6] leading-relaxed">
                {activeVariant.dataSafetySummary}
              </p>
              <p className="mt-3 pt-3 border-t border-white/[0.07] text-xs text-[#94A3A8] leading-relaxed">
                {activeVariant.dataSafetyNote}
              </p>
            </div>

            {/* Content Rating (IARC) & Target Audience Matrix */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <h3 className="text-sm font-semibold text-white">
                IARC Content Rating &amp; Target Audience
              </h3>
              <dl className="mt-4 divide-y divide-white/[0.07]">
                {COMPLIANCE_DECLARATIONS.map((item) => (
                  <div key={item.label} className="py-2.5 first:pt-0 last:pb-0">
                    <dt className="text-xs font-mono text-[#94A3A8]">{item.label}</dt>
                    <dd className="mt-0.5 text-xs sm:text-sm text-[#E2E8EB]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
