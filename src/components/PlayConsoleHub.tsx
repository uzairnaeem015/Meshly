import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { COMPLIANCE_DECLARATIONS, STORE_LISTING_VARIANTS } from '../data/storeContent';
import {
  buildAppAdsTxt,
  parseAdMobPublisherId,
  validateStoreListingLimits,
} from '../utils/meshlyLogic';

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
  const [pubIdInput, setPubIdInput] = useState('pub-0000000000000000');
  const [activePubId, setActivePubId] = useState('pub-0000000000000000');
  const [pubIdError, setPubIdError] = useState<string | null>(null);
  const [pubIdSaved, setPubIdSaved] = useState(false);

  const activeVariant =
    STORE_LISTING_VARIANTS.find((v) => v.id === selectedVariantId) || STORE_LISTING_VARIANTS[0];
  const limits = validateStoreListingLimits(activeVariant);
  const appAdsLine = buildAppAdsTxt(activePubId);
  const baseUrl = import.meta.env.BASE_URL || './';

  const handleCopy = (fieldKey: string, value: string) => {
    copyTextSafe(value);
    setCopiedField(fieldKey);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === fieldKey ? null : prev));
    }, 2000);
  };

  const handleApplyPubId = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseAdMobPublisherId(pubIdInput);
    if (!parsed.valid || !parsed.normalizedPubId) {
      setPubIdError(parsed.error || 'Enter a valid 16-digit AdMob Publisher ID.');
      setPubIdSaved(false);
      return;
    }
    setActivePubId(parsed.normalizedPubId);
    setPubIdInput(parsed.normalizedPubId);
    setPubIdError(null);
    setPubIdSaved(true);
    window.setTimeout(() => setPubIdSaved(false), 2500);
  };

  const handleDownloadAppAds = () => {
    const blob = new Blob([`${appAdsLine}\n`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'app-ads.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="play-console" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Google Play Console &amp; AdMob Ready · Character-Verified Declarations
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Complete Google Play Store listing, policy &amp; app-ads.txt kit
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Copy verified store metadata, reviewer onboarding instructions, Data Safety
              questionnaire responses, IARC declarations, and your root{' '}
              <code className="text-[#E2E8EB]">/app-ads.txt</code> configuration.
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
                    active ? 'bg-[#00C48C] text-[#042319]' : 'text-[#94A3A8] hover:text-white'
                  }`}
                >
                  {variant.id === 'variant-b' ? 'Messenger Edition' : 'Local Chat Edition'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Main Store Listing Fields + AdMob app-ads.txt Setup */}
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

            {/* AdMob app-ads.txt Root Verification Setup */}
            <div
              id="app-ads"
              className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6 space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    AdMob app-ads.txt Setup (Maximize Ad Fill Rates)
                  </h3>
                  <p className="mt-1 text-xs text-[#94A3A8] leading-relaxed">
                    Hosted automatically at <code className="text-[#00C48C]">/app-ads.txt</code>{' '}
                    from <code className="text-[#E2E8EB]">public/app-ads.txt</code>. Paste your
                    snippet or Publisher ID from{' '}
                    <strong className="text-[#E2E8EB]">
                      AdMob &rarr; Apps &rarr; View all apps &rarr; app-ads.txt
                    </strong>{' '}
                    below.
                  </p>
                </div>

                <a
                  href={`${baseUrl}app-ads.txt`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>View /app-ads.txt</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <form onSubmit={handleApplyPubId} noValidate className="pt-2 space-y-2">
                <label
                  htmlFor="admob-publisher-id"
                  className="block text-xs font-semibold text-white"
                >
                  AdMob Publisher ID or Snippet
                </label>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <input
                    id="admob-publisher-id"
                    type="text"
                    value={pubIdInput}
                    onChange={(e) => {
                      setPubIdInput(e.target.value);
                      if (pubIdError) setPubIdError(null);
                    }}
                    placeholder="pub-3940256099942544"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#0B1114] text-xs font-mono text-white placeholder:text-[#6E7F85] focus:outline-none focus:ring-1 focus:ring-[#00C48C]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-white/[0.08] hover:bg-white/15 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    Apply ID
                  </button>
                </div>
                {pubIdError && (
                  <p role="alert" className="text-xs text-amber-300">
                    {pubIdError}
                  </p>
                )}
                {pubIdSaved && (
                  <p role="status" className="text-xs text-[#00C48C]">
                    Authorized seller record updated for {activePubId}.
                  </p>
                )}
              </form>

              <div className="pt-3 border-t border-white/[0.07]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#94A3A8]">
                    https://yourdomain.com/app-ads.txt
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy('appAdsTxt', appAdsLine)}
                      aria-label="Copy app-ads.txt snippet"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedField === 'appAdsTxt' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00C48C]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadAppAds}
                      aria-label="Download app-ads.txt file"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00C48C] hover:bg-[#1AD49E] text-xs font-semibold text-[#042319] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download app-ads.txt</span>
                    </button>
                  </div>
                </div>

                <pre className="mt-3 py-2.5 px-3 rounded-lg bg-[#0B1114] font-mono text-xs text-[#00C48C] overflow-x-auto">
                  {appAdsLine}
                </pre>

                <ol className="mt-3 space-y-1.5 text-xs text-[#94A3A8] list-decimal pl-4 leading-relaxed">
                  <li>
                    In Google Play Console &rarr; <strong className="text-[#E2E8EB]">Store settings</strong>, set your{' '}
                    <strong className="text-[#E2E8EB]">Developer Website URL</strong> to your custom domain or root GitHub Pages user site (<code className="text-[#CBD5D9]">https://&lt;username&gt;.github.io</code>).
                  </li>
                  <li>
                    Replace <code className="text-[#CBD5D9]">public/app-ads.txt</code> in your repository with the downloaded <code className="text-[#CBD5D9]">app-ads.txt</code> file so it resolves at the domain root (<code className="text-[#CBD5D9]">https://yourdomain.com/app-ads.txt</code>).
                  </li>
                  <li>
                    AdMob’s crawler automatically verifies <code className="text-[#CBD5D9]">/app-ads.txt</code> within 24 hours once your Google Play Store listing is live.
                  </li>
                </ol>
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
