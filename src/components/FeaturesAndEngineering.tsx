import React from 'react';
import { PERMISSIONS_TABLE } from '../data/storeContent';

export const FeaturesAndEngineering: React.FC = () => {
  return (
    <>
      {/* Core Capabilities — Asymmetric Bento Architecture */}
      <section id="features" className="py-20 border-t border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Direct LAN Protocol · Wi-Fi Router &amp; Mobile Hotspot
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Built for flights, cruise ships, campuses, and off-grid teams
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Whether external internet is unavailable, metered, or restricted, Meshly routes
              messages, high-bitrate media, and real-time audio/video directly between Android
              devices over your local subnet.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Span-2 Marquee Capability */}
            <div className="lg:col-span-2 rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#94A3A8]">
                  01. Instant Local Wi-Fi &amp; Hotspot Messaging
                </p>
                <h3 className="mt-2 text-2xl font-display font-bold text-[#F1F5F6]">
                  Full-featured chat timelines with zero cloud relays
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#94A3A8] leading-relaxed max-w-[65ch]">
                  Send and receive instant messages directly between nearby devices on the same
                  Wi-Fi router or phone hotspot. Includes live typing indicators, delivery and read
                  receipts, contextual message replies, and WhatsApp-style date-grouped conversation
                  headers.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#CBD5D9]">
                <div>
                  <div className="font-mono text-[#00C48C] font-semibold">mDNS _meshly._tcp</div>
                  <div className="mt-0.5 text-[#94A3A8]">Automatic local peer discovery</div>
                </div>
                <div>
                  <div className="font-mono text-[#00C48C] font-semibold">Verified Gmail ID</div>
                  <div className="mt-0.5 text-[#94A3A8]">Locked first &amp; last name identity</div>
                </div>
                <div>
                  <div className="font-mono text-[#00C48C] font-semibold">Custom Wallpapers</div>
                  <div className="mt-0.5 text-[#94A3A8]">Color themes, Light/Dark &amp; gallery</div>
                </div>
              </div>
            </div>

            {/* Span-1 Voice & Video Calling */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#94A3A8]">
                  02. Direct Voice &amp; Video Calling
                </p>
                <h3 className="mt-2 text-xl font-display font-bold text-[#F1F5F6]">
                  Sub-10ms LAN audio and camera streaming
                </h3>
                <p className="mt-3 text-sm text-[#94A3A8] leading-relaxed">
                  Place low-latency peer-to-peer voice and video calls over your local network.
                  Switch seamlessly between front and rear cameras, toggle speakerphone or mute, and
                  review complete call history logs with timestamps.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs font-mono text-[#94A3A8]">
                Peer-to-peer UDP/TCP · Dedicated Calls tab
              </p>
            </div>

            {/* Span-1 File Sharing */}
            <div className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#94A3A8]">
                  03. High-Speed Media &amp; File Sharing
                </p>
                <h3 className="mt-2 text-xl font-display font-bold text-[#F1F5F6]">
                  Original quality with SHA-256 verification
                </h3>
                <p className="mt-3 text-sm text-[#94A3A8] leading-relaxed">
                  Transfer uncompressed photos, 4K videos, and large documents at full local Wi-Fi
                  throughput without cloud upload caps. Automatic SHA-256 checksums and pause/resume
                  support guarantee bit-exact delivery.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs font-mono text-[#94A3A8]">
                SHA-256 integrity · Pause &amp; resume streams
              </p>
            </div>

            {/* Span-2 QR Pairing + 100% On-Device Storage */}
            <div className="lg:col-span-2 rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono text-[#94A3A8]">
                  04. QR Pairing &amp; Request Block List
                </p>
                <h3 className="mt-2 text-lg font-display font-bold text-[#F1F5F6]">
                  Explicit approval before any chat starts
                </h3>
                <p className="mt-2.5 text-sm text-[#94A3A8] leading-relaxed">
                  Scan another user’s Meshly QR code with your camera, import a QR screenshot from
                  your gallery, or connect via manual IPv4 in Settings. Rejecting an unwanted chat
                  request automatically blocks that sender’s Google ID across devices.
                </p>
              </div>

              <div className="sm:border-l sm:border-white/[0.07] sm:pl-6">
                <p className="text-xs font-mono text-[#94A3A8]">05. 100% On-Device Folder Storage</p>
                <h3 className="mt-2 text-lg font-display font-bold text-[#F1F5F6]">
                  Your files stay inside your chosen folder
                </h3>
                <p className="mt-2.5 text-sm text-[#94A3A8] leading-relaxed">
                  All chat history, call logs, cryptographic device keys, and received media stay in
                  app-private storage or the local folder you choose via Android’s Storage Access
                  Framework. Wipe all local data anytime in one tap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Android Permissions Transparency (Including Background Battery Optimization) */}
      <section id="permissions" className="py-20 border-t border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#00C48C]">
              Zero Sensitive Declarations · Least-Privilege Runtime Access
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F1F5F6] [text-wrap:balance]">
              Android permissions transparency
            </h2>
            <p className="mt-3 text-base text-[#94A3A8] leading-relaxed">
              Meshly never accesses GPS or physical location. Every Android manifest permission is
              scoped strictly to local peer discovery, background LAN reachability, QR pairing, or
              live voice and video calls.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PERMISSIONS_TABLE.map((row) => (
              <div
                key={row.permission}
                className="rounded-2xl bg-[#131C20] border border-white/[0.08] p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[#F1F5F6]">
                    {row.permission}
                  </span>
                  <code className="text-[11px] font-mono text-[#00C48C]">{row.manifestId}</code>
                </div>
                <p className="mt-2.5 text-sm text-[#94A3A8] leading-relaxed">{row.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
