import React, { useState } from 'react';
import { Maximize2, Smartphone, X } from 'lucide-react';
import { APP_SCREENSHOTS } from '../data/storeContent';

export const ScreenshotsShowcase: React.FC = () => {
  const [fallbackStepById, setFallbackStepById] = useState<Record<string, number>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const baseUrl = import.meta.env.BASE_URL || './';
  const activeModalItem = lightboxIndex !== null ? APP_SCREENSHOTS[lightboxIndex] : null;

  const resolveCandidateSrc = (assetSubpath: string, step: number): string | null => {
    const candidates = [
      `${baseUrl}${assetSubpath}`,
      `./public/${assetSubpath}`,
      `./docs/${assetSubpath}`,
    ];
    return step < candidates.length ? candidates[step] : null;
  };

  return (
    <section id="screenshots" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-[#00C48C]">Android Material 3 Capture Set · v1.2.0</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
            Native Android interface built for zero-cloud clarity
          </h2>
          <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
            Every screen is designed around transparent local networking: verified on-device Google
            identity, explicit peer chat approvals, and direct visibility into your active IPv4
            socket and folder storage.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {APP_SCREENSHOTS.map((shot, index) => {
            const step = fallbackStepById[shot.id] ?? 0;
            const resolvedSrc = resolveCandidateSrc(shot.assetSubpath, step);

            return (
              <article
                key={shot.id}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden bg-[#10171A] border border-white/[0.07] aspect-[9/20]">
                    {resolvedSrc ? (
                      <img
                        src={resolvedSrc}
                        alt={`Meshly Android screenshot — ${shot.title}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setFallbackStepById((prev) => ({
                            ...prev,
                            [shot.id]: (prev[shot.id] ?? 0) + 1,
                          }))
                        }
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#162227] to-[#0E1518]">
                        <Smartphone className="w-8 h-8 text-[#00C48C] mb-3" />
                        <p className="text-sm font-semibold text-white">{shot.title}</p>
                        <p className="mt-1 text-xs text-[#94A3A8]">{shot.meta}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Inspect full screenshot: ${shot.title}`}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1114]/85 hover:bg-[#0B1114] border border-white/15 text-xs font-medium text-white backdrop-blur-sm transition-colors whitespace-nowrap"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  <p className="mt-4 text-xs text-[#94A3A8] font-mono">{shot.meta}</p>
                  <h3 className="mt-1.5 text-lg font-display font-bold text-[#F1F5F6]">
                    {shot.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#94A3A8] leading-relaxed">{shot.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Full-Resolution Screenshot Lightbox */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#131C20] border border-white/15 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:col-span-6 max-h-[75vh] flex justify-center bg-[#0B1114] rounded-xl p-2 border border-white/10">
              <img
                src={
                  resolveCandidateSrc(
                    activeModalItem.assetSubpath,
                    fallbackStepById[activeModalItem.id] ?? 0
                  ) || `${baseUrl}${activeModalItem.assetSubpath}`
                }
                alt={activeModalItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="sm:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#00C48C]">{activeModalItem.meta}</span>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close screenshot viewer"
                    className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/10 text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="mt-3 text-xl font-display font-bold text-white">
                  {activeModalItem.title}
                </h3>
                <p className="mt-3 text-sm text-[#CBD5D9] leading-relaxed">
                  {activeModalItem.caption}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + APP_SCREENSHOTS.length) % APP_SCREENSHOTS.length
                        : 0
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white whitespace-nowrap"
                >
                  Previous Screen
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % APP_SCREENSHOTS.length : 0
                    )
                  }
                  className="px-3.5 py-2 rounded-lg bg-[#00C48C] hover:bg-[#1AD49E] text-xs font-semibold text-[#042319] whitespace-nowrap"
                >
                  Next Screen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
