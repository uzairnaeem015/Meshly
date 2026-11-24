import React from 'react';
import {
  OPTIONAL_ADS_DISCLOSURE,
  PERMISSIONS_TABLE,
  SECURITY_PROTECTIONS,
} from '../data/storeContent';

export const SecurityOverviewSection: React.FC = () => {
  return (
    <section id="security" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        {/* Our Privacy Commitment + How Your Data Is Protected */}
        <div>
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Privacy &amp; Security Overview · Local-First, Zero-Server Architecture
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Our privacy commitment &amp; how your data is protected
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Meshly is built from the ground up as a local-first, zero-server messenger. Your
              messages, voice/video calls, contacts, and files travel directly between your
              devices—never through Meshly cloud servers.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECURITY_PROTECTIONS.map((item) => (
              <article
                key={item.index}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#00C48C]">
                    {item.index} · {item.meta}
                  </p>
                  <h3 className="mt-2 text-xl font-display font-bold text-[#F1F5F6]">
                    {item.title}
                  </h3>
                  <div className="mt-3.5 space-y-3 text-sm sm:text-[15px] text-[#94A3A8] leading-relaxed">
                    {item.points.map((point, idx) => (
                      <p key={idx}>
                        {point.label && (
                          <strong className="text-[#E2E8EB] font-semibold">
                            {point.label}:{' '}
                          </strong>
                        )}
                        {point.text}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Minimal, Transparent Device Permissions */}
        <div id="permissions" className="pt-14 border-t border-white/[0.07]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Least-Privilege Access · Zero Broad Storage Access
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Minimal, transparent device permissions
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#94A3A8] leading-relaxed">
              Every permission is scoped strictly to local peer discovery, background LAN
              reachability, QR verification, or active calls—never GPS tracking or blanket access to
              your photo gallery.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PERMISSIONS_TABLE.map((row, idx) => {
              const isTrailingOdd =
                idx === PERMISSIONS_TABLE.length - 1 && PERMISSIONS_TABLE.length % 2 === 1;
              return (
                <div
                  key={row.permission}
                  className={`${
                    isTrailingOdd ? 'md:col-span-2' : ''
                  } rounded-2xl bg-[#131C20] border border-white/[0.08] p-6`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#F1F5F6]">
                      {row.permission}
                    </span>
                    <code className="text-[11px] font-mono text-[#00C48C]">{row.manifestId}</code>
                  </div>
                  <p className="mt-2.5 text-sm text-[#94A3A8] leading-relaxed">{row.purpose}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Ads Disclosure (When Online) */}
        <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6 sm:p-8">
          <p className="text-xs font-mono text-[#00C48C]">{OPTIONAL_ADS_DISCLOSURE.subtitle}</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-display font-bold text-[#F1F5F6]">
            {OPTIONAL_ADS_DISCLOSURE.title}
          </h3>
          <div className="mt-4 space-y-3 text-sm sm:text-[15px] text-[#94A3A8] leading-relaxed max-w-[75ch]">
            {OPTIONAL_ADS_DISCLOSURE.points.map((point, idx) => (
              <p key={idx}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
