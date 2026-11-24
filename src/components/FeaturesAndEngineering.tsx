import React from 'react';
import { IDEAL_FOR_PROFILES, KEY_FEATURES } from '../data/storeContent';

export const FeaturesAndEngineering: React.FC = () => {
  return (
    <>
      {/* Key Features — Asymmetric Bento Architecture */}
      <section id="features" className="py-20 border-t border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Key Features · Local Wi-Fi &amp; Wi-Fi Direct
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Built to keep conversations, calls, and files flowing directly device to device
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Every core capability works completely offline across shared Wi-Fi networks or direct
              Android peer-to-peer Wi-Fi Direct links—with zero central servers or cloud limits.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {KEY_FEATURES.map((feature) => (
              <article
                key={feature.index}
                className={`${
                  feature.spanWide ? 'lg:col-span-2' : 'lg:col-span-1'
                } rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 flex flex-col justify-between`}
              >
                <div>
                  <p className="text-xs font-mono text-[#94A3A8]">
                    {feature.index}. {feature.title}
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-display font-bold text-[#F1F5F6] [text-wrap:balance]">
                    {feature.headline}
                  </h3>

                  <ul className="mt-4 space-y-3 text-sm sm:text-[15px] text-[#94A3A8] leading-relaxed list-disc pl-5">
                    {feature.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        {bullet.label && (
                          <strong className="text-[#E2E8EB] font-semibold">
                            {bullet.label}:{' '}
                          </strong>
                        )}
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs font-mono text-[#00C48C]">
                  {feature.footerMeta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For — Real-World Use-Case Strip */}
      <section id="ideal-for" className="py-20 border-t border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">Ideal For · Everyday &amp; Off-Grid</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Private local communication wherever your people gather
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {IDEAL_FOR_PROFILES.map((profile) => (
              <article
                key={profile.index}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6"
              >
                <p className="text-xs font-mono text-[#00C48C]">{profile.index}</p>
                <h3 className="mt-2 text-xl font-display font-bold text-[#F1F5F6]">
                  {profile.audience}
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] text-[#94A3A8] leading-relaxed">
                  {profile.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
