import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { COMPLIANCE_DECLARATIONS, STORE_LISTING_VARIANTS } from '../data/storeContent';
import { validateStoreListingLimits } from '../utils/meshlyLogic';

function copyTextSafe(text: string): void {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}

export const PlayConsoleHub: React.FC = () => {
  const [selectedVariantId, setSelectedVariantId] = useState<'variant-b' | 'variant-a'>(
    'variant-b'
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeVariant =
    STORE_LISTING_VARIANTS.find((v) => v.id === selectedVariantId) || STORE_LISTING_VARIANTS[0];
  const limits = validateStoreListingLimits(activeVariant);

  const handleCopy = (fieldKey: string, value: string) => {
    copyTextSafe(value);
    setCopiedField(fieldKey);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === fieldKey ? null : prev));
    }, 2000);
  };

  return (
    <section id="play-console" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Google Play Console Ready · Character-Verified Store Declarations
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Complete Google Play Store listing &amp; policy declarations
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Copy verified store metadata, reviewer onboarding instructions, Data Safety
              questionnaire responses, and IARC content rating declarations directly into Google
              Play Console.
            </p>
          </div>

          {/* Interactive Segmented Switcher for Variant B vs Variant A */}
          <div
            role="group"
            aria-label="Select Google Play Store listing variant"
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#131C20] border border-white/[0.08] self-start"
          >
            {STORE_LISTING_VARIANTS.map((variant) => {
              const active = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#00C48C] text-[#042319]'
                      : 'text-[#94A3A8] hover:text-white'
                  }`}
                >
                  {variant.id === 'variant-b' ? 'Messenger Edition' : 'Local Chat Edition'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Main Store Listing Fields */}
          <div className="lg:col-span-7 space-y-5">
            {/* App Name */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">App Name</h3>
                  <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                    {limits.appNameLength} / {limits.appNameMax} characters · Play Console Verified
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('appName', activeVariant.appName)}
                  aria-label="Copy App Name"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'appName' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00C48C]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 font-display text-lg font-bold text-[#F1F5F6]">
                {activeVariant.appName}
              </p>
            </div>

            {/* Short Description */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Short Description</h3>
                  <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                    {limits.shortDescLength} / {limits.shortDescMax} characters · Play Console
                    Verified
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('shortDesc', activeVariant.shortDescription)}
                  aria-label="Copy Short Description"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'shortDesc' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00C48C]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#E2E8EB] leading-relaxed">
                {activeVariant.shortDescription}
              </p>
            </div>

            {/* Full Description */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Full Description</h3>
                  <p className="text-xs font-mono text-[#94A3A8] tabular-nums mt-0.5">
                    {limits.fullDescLength} / {limits.fullDescMax} characters · Category:{' '}
                    {activeVariant.category}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('fullDesc', activeVariant.fullDescription)}
                  aria-label="Copy Full Description"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'fullDesc' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00C48C]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
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
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    App Access (Reviewer Instructions)
                  </h3>
                  <p className="text-xs text-[#00C48C] mt-0.5">
                    All functionality available without restrictions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('reviewerNotes', activeVariant.reviewerInstructions)}
                  aria-label="Copy Reviewer Instructions"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'reviewerNotes' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00C48C]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
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
