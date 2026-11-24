import React, { useState } from 'react';

interface PrivacyPolicySectionProps {
  defaultEmail?: string;
  isStandaloneMode?: boolean;
  onExitStandalone?: () => void;
}

export const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({
  defaultEmail = 'uzairnaeem15@gmail.com',
  isStandaloneMode = false,
  onExitStandalone,
}) => {
  const [template, setTemplate] = useState<'detailed' | 'concise'>('detailed');

  return (
    <section id="privacy" className="py-20 border-t border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-6">
        {isStandaloneMode && onExitStandalone && (
          <div className="mb-8 p-4 rounded-xl bg-[#131C20] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#CBD5D9]">
              Viewing standalone Privacy Policy page for Google Play Store verification.
            </p>
            <button
              type="button"
              onClick={onExitStandalone}
              className="px-3.5 py-1.5 rounded-lg bg-[#00C48C] text-[#042319] text-xs font-semibold hover:bg-[#1AD49E] whitespace-nowrap"
            >
              View Full Meshly Website
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 4 Columns: Policy Overview & Detail Level */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <p className="text-xs font-mono text-[#00C48C]">
                Public Legal Endpoint · Effective November 6, 2026
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#F1F5F6]">
                Privacy Policy for Meshly
              </h2>
              <p className="mt-2.5 text-sm text-[#94A3A8] leading-relaxed">
                Formal privacy policy aligned with Meshly’s zero-server encryption, hidden account
                identity, encrypted backups, minimal permissions, and optional rewarded ads
                disclosure. Direct standalone URL:{' '}
                <a
                  href="?page=privacy"
                  className="text-[#00C48C] hover:underline underline-offset-4 font-mono text-xs"
                >
                  ?page=privacy
                </a>
                .
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.08] space-y-5">
              <div>
                <span className="block text-xs font-semibold text-white mb-2">
                  Policy Detail Level
                </span>
                <div
                  role="group"
                  aria-label="Select Privacy Policy template version"
                  className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#131C20] border border-white/[0.08]"
                >
                  <button
                    type="button"
                    onClick={() => setTemplate('detailed')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      template === 'detailed'
                        ? 'bg-[#223036] text-white'
                        : 'text-[#94A3A8] hover:text-white'
                    }`}
                  >
                    Detailed (E2EE &amp; SAF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplate('concise')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      template === 'concise'
                        ? 'bg-[#223036] text-white'
                        : 'text-[#94A3A8] hover:text-white'
                    }`}
                  >
                    Concise Standard
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.07]">
                <span className="block text-xs font-semibold text-white">
                  Developer Support Contact
                </span>
                <a
                  href={`mailto:${defaultEmail}`}
                  className="mt-1 inline-block text-xs font-mono text-[#00C48C] hover:underline underline-offset-4"
                >
                  {defaultEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Right 8 Columns: Rendered Legal Document */}
          <article
            aria-label="Privacy Policy Document"
            className="lg:col-span-8 rounded-2xl bg-[#131C20] border border-white/[0.08] p-7 sm:p-10 space-y-6"
          >
            <header className="pb-5 border-b border-white/[0.08]">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Privacy Policy for Meshly
              </h3>
              <p className="mt-2 text-xs font-mono text-[#94A3A8]">
                Effective Date: November 6, 2026 · Android Application (Meshly: Local Wi-Fi
                Messenger)
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#CBD5D9] leading-relaxed">
                Meshly (&ldquo;the App&rdquo;) is built from the ground up as a local-first,
                zero-server messenger for Android. Your messages, voice/video calls, contacts, and
                files travel directly between your devices—never through Meshly cloud servers.
              </p>
            </header>

            {template === 'detailed' ? (
              <div className="space-y-6 text-sm sm:text-base text-[#CBD5D9] leading-relaxed">
                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    1. No Central Messaging Servers
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly does not operate cloud servers to relay, store, or index your chats,
                    voice/video calls, call logs, contacts, or shared files. All communication
                    happens directly peer-to-peer over your local Wi-Fi network (including
                    multi-subnet networks) or peer-to-peer Wi-Fi Direct.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    2. End-to-End Encryption by Default
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Device Cryptographic Identity:</strong>{' '}
                      Every device generates its own elliptic-curve cryptographic identity (
                      <code className="text-xs text-[#00C48C]">ECDH / ECDSA secp256r1</code>).
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Session Keys &amp; Safety Numbers:</strong>{' '}
                      Direct peer sessions derive unique{' '}
                      <code className="text-xs text-[#00C48C]">AES-256-GCM</code> encryption keys
                      via <code className="text-xs text-[#00C48C]">ECDH + HKDF-SHA256</code>, with
                      cryptographic Safety Numbers and QR pairing so you can verify contacts and
                      prevent man-in-the-middle attacks.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    3. Protected Account Identity (Hidden by Default)
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Your Google ID is stored and exchanged using encrypted identity tokens so Meshly
                    can reliably recognize your contacts without duplicating them across networks.
                    Other users cannot view your Google ID in your profile unless you explicitly
                    turn on visibility in Settings. When hidden, peers see a{' '}
                    <strong className="text-[#E2E8EB]">Verified Private ID</strong> badge instead.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    4. Encrypted, User-Owned Backups &amp; Local Storage
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    All chat history, call logs, and transferred media remain exclusively on your
                    device or in the folder you explicitly select via the Android Storage Access
                    Framework (SAF). Local backups of your contacts, chat history, and media are
                    saved only to a folder you choose and are encrypted and bound to your account
                    identity so only Meshly signed into your matching verified account can read or
                    restore them—with automatic deduplication when merging restored contacts and
                    live peers. You remain in complete control of where your backups live and can
                    delete them at any time.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    5. Minimal, Transparent Device Permissions
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Local Wi-Fi &amp; Nearby Devices</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.NEARBY_WIFI_DEVICES
                      </code>
                      ): Used solely to discover and connect to peers on your local network or Wi-Fi
                      Direct. <code className="text-xs text-[#00C48C]">NEARBY_WIFI_DEVICES</code>{' '}
                      is declared with{' '}
                      <code className="text-xs text-[#00C48C]">neverForLocation</code> on Android
                      13+; Android 10–12 requires system location permission solely for OS-level
                      Wi-Fi Direct scanning, and Meshly never tracks, stores, or transmits your GPS
                      location.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Camera &amp; Microphone</strong> (
                      <code className="text-xs text-[#00C48C]">CAMERA</code>,{' '}
                      <code className="text-xs text-[#00C48C]">RECORD_AUDIO</code>): Used only when
                      you actively scan a QR code, capture media, or place/answer a voice or video
                      call.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Zero Broad Storage Access:</strong> Meshly
                      uses the Android Photo Picker and Storage Access Framework (SAF), meaning it
                      never requests blanket access to your entire photo gallery or filesystem.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Notifications</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.POST_NOTIFICATIONS
                      </code>
                      ): Used locally to alert you to incoming messages and calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Background Battery Optimization</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
                      </code>
                      ): Allows Meshly to stay reachable on your local Wi-Fi or Wi-Fi Direct network
                      in the background without Android Doze suspending peer discovery, incoming
                      messages, file transfers, or voice/video calls.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    6. Optional Ads Disclosure (When Online)
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly works 100% offline with zero internet required for messaging, calling,
                    and file sharing, and contains no in-app purchases. Meshly includes the Google
                    Mobile Ads (AdMob) SDK for optional, user-initiated rewarded ads when an
                    internet connection is available. When your device is online and you interact
                    with optional ad features, Google Mobile Ads may collect standard advertising
                    identifiers and device diagnostics according to Google’s Privacy Policy. AdMob
                    never has access to your Meshly messages, calls, contacts, encryption keys, or
                    local files. You can reset or delete your Android Advertising ID anytime in{' '}
                    <strong className="text-[#E2E8EB]">
                      Android Settings &rarr; Privacy &rarr; Ads
                    </strong>
                    .
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    7. Data Deletion
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    You can delete individual messages, clear call logs, manage blocked users,
                    delete local backup files, rotate your cryptographic keys, or wipe all local app
                    data at any time from{' '}
                    <strong className="text-[#E2E8EB]">
                      Settings &rarr; Storage &amp; Data &rarr; Wipe All Local App Data
                    </strong>
                    , or by uninstalling the App.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    8. Contact Us
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    If you have questions about this Privacy Policy, please contact us at:{' '}
                    <a
                      href={`mailto:${defaultEmail}`}
                      className="text-[#00C48C] underline underline-offset-4 font-mono text-sm"
                    >
                      {defaultEmail}
                    </a>
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-6 text-sm sm:text-base text-[#CBD5D9] leading-relaxed">
                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    1. No Central Messaging Servers
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly does not operate cloud servers to relay, store, or index your chats,
                    calls, or contacts. All communication happens directly peer-to-peer over your
                    local Wi-Fi network or Wi-Fi Direct.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    2. Encryption, Protected Identity &amp; User-Owned Backups
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">End-to-End Encryption by Default:</strong>{' '}
                      Devices generate <code className="text-xs text-[#00C48C]">secp256r1</code>{' '}
                      keys and derive unique{' '}
                      <code className="text-xs text-[#00C48C]">AES-256-GCM</code> session keys via{' '}
                      <code className="text-xs text-[#00C48C]">ECDH + HKDF-SHA256</code> with
                      Safety Numbers and QR pairing.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Hidden Google ID by Default:</strong>{' '}
                      Exchanged via encrypted identity tokens; peers see a Verified Private ID badge
                      unless you explicitly turn on Google ID visibility in Settings.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Encrypted Local Backups:</strong> Stored
                      only in the folder you choose and encrypted to your matching verified account.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    3. Minimal, Transparent Device Permissions
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Local Wi-Fi &amp; Nearby Devices:</strong>{' '}
                      <code className="text-xs text-[#00C48C]">NEARBY_WIFI_DEVICES</code>{' '}
                      (<code className="text-xs text-[#00C48C]">neverForLocation</code> on Android
                      13+; Android 10–12 uses system location only for OS Wi-Fi Direct scanning—never
                      GPS tracking).
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Camera &amp; Microphone:</strong> Only for
                      QR scans, media capture, and active voice/video calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Zero Broad Storage Access:</strong> Uses
                      Android Photo Picker and Storage Access Framework (SAF) only.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Notifications &amp; Background Battery:</strong>{' '}
                      <code className="text-xs text-[#00C48C]">POST_NOTIFICATIONS</code> for local
                      alerts and{' '}
                      <code className="text-xs text-[#00C48C]">
                        REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
                      </code>{' '}
                      to keep local LAN/Wi-Fi Direct reachability active in the background.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    4. Optional Ads Disclosure (When Online)
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly works 100% offline with zero internet required for messaging, calling,
                    and file sharing, and has no in-app purchases. Optional, user-initiated rewarded
                    ads use Google Mobile Ads (AdMob) when online; AdMob never has access to your
                    Meshly messages, calls, contacts, encryption keys, or local files.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    5. Data Deletion &amp; Contact
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Erase all local data anytime in{' '}
                    <strong className="text-[#E2E8EB]">Settings &rarr; Data &amp; Reset</strong> or
                    by uninstalling the App. Questions? Email{' '}
                    <a
                      href={`mailto:${defaultEmail}`}
                      className="text-[#00C48C] underline underline-offset-4 font-mono text-sm"
                    >
                      {defaultEmail}
                    </a>
                    .
                  </p>
                </section>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};
