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
              Viewing standalone Privacy Policy page for Google Play Console verification.
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
                Hosted for Google Play Store compliance. Use the direct{' '}
                <a
                  href="?page=privacy"
                  className="text-[#00C48C] hover:underline underline-offset-4 font-mono text-xs"
                >
                  ?page=privacy
                </a>{' '}
                endpoint in Google Play Console’s App Content &rarr; Privacy Policy field.
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
                    Detailed (SAF &amp; Keys)
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
                {template === 'detailed'
                  ? 'Meshly ("the App") is a local peer-to-peer communication application for Android. We respect your privacy and designed Meshly so that your conversations, files, and calls remain under your control on your local network.'
                  : 'Meshly ("the App") is a local peer-to-peer communication application for Android. We are committed to protecting your privacy.'}
              </p>
            </header>

            {template === 'detailed' ? (
              <div className="space-y-6 text-sm sm:text-base text-[#CBD5D9] leading-relaxed">
                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    1. No Developer Cloud Servers for Conversations or Files
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly does not use external developer servers or cloud databases to route or
                    store your communications. We do not collect, store, sell, or transmit your
                    personal messages, voice/video calls, call logs, or transferred files to any
                    developer-operated server.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    2. Information Stored Locally on Your Device
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    All communication data generated or configured in Meshly is stored locally on
                    your Android device:
                  </p>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Profile Identity:</strong> Your chosen
                      display name (first and last name), email identifier, profile photo, and
                      locally generated cryptographic device keys.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Messages, Call Logs &amp; Files:</strong>{' '}
                      Chat history, call history, and transferred media/files are stored exclusively
                      in your device’s internal storage or the local folder you select via the
                      Android Storage Access Framework.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    3. Local Network Peer-to-Peer Communication
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    When you connect to a local Wi-Fi network or mobile hotspot while using Meshly,
                    your device broadcasts your configured display name, email identifier, and
                    cryptographic public key to other Meshly users on the same local network so they
                    can discover you, verify your identity, and exchange messages, files, and
                    voice/video calls directly device-to-device.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    4. Third-Party Advertising
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly is free to use with no in-app purchases and may display advertisements
                    served by third-party ad networks (such as Google AdMob) when your device has
                    internet connectivity. Advertising SDKs may collect and process your Android
                    Advertising ID, coarse IP-based network state, and ad interaction diagnostics to
                    serve and measure ads. You can opt out of personalized ads or reset/delete your
                    Advertising ID anytime in{' '}
                    <strong className="text-[#E2E8EB]">
                      Android Settings &rarr; Privacy &rarr; Ads
                    </strong>
                    .
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    5. Permissions Used
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Camera</strong> (
                      <code className="text-xs text-[#00C48C]">android.permission.CAMERA</code>):
                      Used only when you scan a peer’s QR code or participate in a local video call.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Microphone</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.RECORD_AUDIO
                      </code>
                      ): Used only during active local voice or video calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Nearby Wi-Fi Devices &amp; Network</strong>{' '}
                      (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.NEARBY_WIFI_DEVICES
                      </code>
                      , <code className="text-xs text-[#00C48C]">INTERNET</code>,{' '}
                      <code className="text-xs text-[#00C48C]">ACCESS_WIFI_STATE</code>): Used to
                      discover and communicate with nearby devices on your local Wi-Fi or hotspot
                      network, and when online to load advertisements.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Notifications</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.POST_NOTIFICATIONS
                      </code>
                      ): Used to display alerts for incoming local messages and calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Background Battery Optimization</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
                      </code>
                      ): Allows Meshly to stay reachable on your local Wi-Fi or hotspot in the
                      background without Android Doze suspending peer discovery, incoming messages,
                      file transfers, or voice/video calls.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    6. Data Deletion
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    You can delete individual messages, clear call logs, manage blocked users,
                    rotate your cryptographic keys, or wipe all local app data at any time from{' '}
                    <strong className="text-[#E2E8EB]">
                      Settings &rarr; Storage &amp; Data &rarr; Wipe All Local App Data
                    </strong>
                    , or by uninstalling the App.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    7. Contact Us
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
                    1. Local Peer-to-Peer Communication (No Developer Chat Servers)
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly operates directly between devices on your local Wi-Fi network or mobile
                    hotspot. We do not operate central messaging servers, and we do not collect,
                    upload, store, or sell your personal messages, call logs, or shared files on
                    developer servers.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    2. Information Stored Locally on Your Device
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Profile Information:</strong> Your chosen
                      display name, optional Google email identifier, and profile photo are stored
                      locally on your device and shared only with peers on your local network to
                      identify you during discovery and chat requests.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Messages, Files, and Call Logs:</strong>{' '}
                      All chat history, shared photos/videos/files, and call logs are stored locally
                      on your device. You can delete individual messages, clear chats, clear call
                      history, or wipe all local data at any time in{' '}
                      <strong className="text-[#E2E8EB]">Settings &gt; Data &amp; Reset</strong>.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    3. Third-Party Advertising
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Meshly is free with no in-app purchases and may display ads served by
                    third-party advertising partners (such as Google AdMob) when internet access is
                    available. Ad SDKs may process your Android Advertising ID and ad diagnostics to
                    deliver and measure ads. You can reset or delete your Advertising ID anytime in{' '}
                    <strong className="text-[#E2E8EB]">Settings &gt; Privacy &gt; Ads</strong>.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    4. Permissions Used
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-[#94A3A8] list-disc pl-5">
                    <li>
                      <strong className="text-[#E2E8EB]">Camera</strong> (
                      <code className="text-xs text-[#00C48C]">android.permission.CAMERA</code>):
                      Used only when you scan a QR code, capture a photo in chat, or participate in
                      a video call.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Microphone</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.RECORD_AUDIO
                      </code>
                      ): Used only during active voice or video calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Nearby Wi-Fi Devices</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.NEARBY_WIFI_DEVICES
                      </code>
                      ): Used to discover other Meshly users on your local network without
                      determining your physical location.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Notifications</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.POST_NOTIFICATIONS
                      </code>
                      ): Used to notify you of incoming messages and calls.
                    </li>
                    <li>
                      <strong className="text-[#E2E8EB]">Background Battery Optimization</strong> (
                      <code className="text-xs text-[#00C48C]">
                        android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
                      </code>
                      ): Allows Meshly to maintain uninterrupted local network reachability in the
                      background so incoming messages, file transfers, and calls arrive reliably.
                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    5. Data Deletion
                  </h4>
                  <p className="mt-2 text-[#94A3A8]">
                    Because your conversations and files reside on your device, you have full
                    control over them. You can erase all stored local data at any time from{' '}
                    <strong className="text-[#E2E8EB]">
                      Settings &gt; Data &amp; Reset &gt; Wipe All Local Data
                    </strong>{' '}
                    or by uninstalling the App.
                  </p>
                </section>

                <section>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    6. Contact Us
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
            )}
          </article>
        </div>
      </div>
    </section>
  );
};
