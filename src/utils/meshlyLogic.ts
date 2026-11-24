export type ActiveRouteView = 'all' | 'privacy-focused';

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function buildPrivacyPolicyMarkdown(
  template: 'detailed' | 'concise',
  contactEmail: string
): string {
  const safeEmail = contactEmail.trim();

  if (template === 'concise') {
    return `# Privacy Policy for Meshly

**Effective Date:** November 6, 2026

Meshly ("the App") is a local-first, zero-server peer-to-peer messenger for Android. Your messages, voice/video calls, contacts, and files travel directly between your devices—never through Meshly cloud servers.

## 1. No Central Messaging Servers
Meshly does not operate cloud servers to relay, store, or index your chats, calls, or contacts. All communication happens directly peer-to-peer over your local Wi-Fi network or Wi-Fi Direct.

## 2. End-to-End Encryption & Protected Account Identity
- **End-to-End Encryption by Default:** Every device generates an elliptic-curve cryptographic identity (ECDH / ECDSA secp256r1). Direct peer sessions derive unique AES-256-GCM encryption keys via ECDH + HKDF-SHA256, with cryptographic Safety Numbers and QR code pairing to verify contacts.
- **Protected Account Identity (Hidden by Default):** Your Google ID is stored and exchanged using encrypted identity tokens to recognize contacts reliably without duplicates. Other users cannot view your Google ID unless you explicitly enable visibility in Settings; when hidden, peers see a Verified Private ID badge instead.
- **Encrypted, User-Owned Backups:** Backups of your contacts, chats, and media are saved only to a folder you select via Android’s Storage Access Framework and are encrypted so only Meshly on your verified account can restore them.

## 3. Minimal, Transparent Device Permissions
- **Local Wi-Fi & Nearby Devices (\`NEARBY_WIFI_DEVICES\` with \`neverForLocation\` on Android 13+):** Used solely to discover and connect to peers on your local network or Wi-Fi Direct. Android 10–12 requires system location permission solely for OS-level Wi-Fi Direct scanning; Meshly never tracks, stores, or transmits your GPS location.
- **Camera & Microphone (\`CAMERA\`, \`RECORD_AUDIO\`):** Used only when you actively scan a QR code, capture media, or place/answer a voice or video call.
- **Zero Broad Storage Access:** Meshly uses the Android Photo Picker and Storage Access Framework (SAF) and never requests blanket access to your photo gallery or filesystem.
- **Notifications (\`POST_NOTIFICATIONS\`):** Used locally to alert you to incoming messages and calls.
- **Background Battery Optimization (\`REQUEST_IGNORE_BATTERY_OPTIMIZATIONS\`):** Allows Meshly to remain reachable on your local Wi-Fi or Wi-Fi Direct network in the background without Android Doze suspending discovery, messages, file transfers, or calls.

## 4. Optional Ads Disclosure (When Online)
Meshly works 100% offline with zero internet required for messaging, calling, and file sharing, and contains no in-app purchases. Meshly includes the Google Mobile Ads (AdMob) SDK for optional, user-initiated rewarded ads when an internet connection is available. When you interact with optional ad features while online, Google Mobile Ads may collect standard advertising identifiers and device diagnostics according to Google’s Privacy Policy. AdMob never has access to your Meshly messages, calls, contacts, encryption keys, or local files.

## 5. Data Deletion
All chats, call logs, backups, and media reside on your device. You can delete messages, remove backups, or wipe all local data at any time in **Settings** or by uninstalling the App.

## 6. Contact Us
If you have questions about this Privacy Policy, please contact us at: ${safeEmail}`;
  }

  return `# Privacy Policy for Meshly

**Effective Date:** November 6, 2026

Meshly ("the App") is built from the ground up as a local-first, zero-server communication application for Android. Your messages, voice and video calls, contacts, and files travel directly between your devices—never through Meshly cloud servers.

## 1. No Central Messaging Servers
Meshly does not operate central cloud servers to relay, store, or index your chats, voice/video calls, call logs, contacts, or shared files. All communication happens directly peer-to-peer over your local Wi-Fi network (including multi-subnet networks) or peer-to-peer Wi-Fi Direct.

## 2. End-to-End Encryption by Default
- **Cryptographic Device Identity:** Every device generates its own elliptic-curve cryptographic identity (\`ECDH\` / \`ECDSA secp256r1\`).
- **Session Encryption & Verification:** Direct peer sessions derive unique \`AES-256-GCM\` encryption keys via \`ECDH + HKDF-SHA256\`, paired with cryptographic Safety Numbers and QR code verification so you can verify contacts and prevent man-in-the-middle attacks.

## 3. Protected Account Identity (Hidden by Default)
Your Google ID is stored and exchanged using encrypted identity tokens so Meshly can reliably recognize your contacts without duplicating them across networks.
- **Hidden by Default:** Other users cannot view your Google ID in your profile unless you explicitly turn on visibility in Settings. When hidden, peers see a **Verified Private ID** badge instead.

## 4. Encrypted, User-Owned Local Backups & On-Device Storage
All chat history, call logs, and transferred media stay exclusively on your device or in the folder you explicitly select via the Android Storage Access Framework (SAF).
- **Encrypted Backups:** Local backups of your contacts, chat history, and media are encrypted and bound to your account identity so only Meshly signed into your matching verified account can read or restore them (with automatic deduplication when merging restored contacts and live peers). You remain in complete control of where your backups live and can delete them at any time.

## 5. Minimal, Transparent Device Permissions
- **Local Wi-Fi & Nearby Devices (\`android.permission.NEARBY_WIFI_DEVICES\`):** Used solely to discover and connect to peers on your local network or Wi-Fi Direct. \`NEARBY_WIFI_DEVICES\` is declared with \`neverForLocation\` on Android 13+; Android 10–12 requires system location permission solely for OS-level Wi-Fi Direct scanning, and Meshly never tracks, stores, or transmits your GPS location.
- **Camera & Microphone (\`android.permission.CAMERA\`, \`android.permission.RECORD_AUDIO\`):** Used only when you actively scan a QR code, capture media, or place/answer a voice or video call.
- **Zero Broad Storage Access:** Meshly uses the Android Photo Picker and Storage Access Framework (SAF), meaning it never requests blanket access to your entire photo gallery or filesystem.
- **Notifications (\`android.permission.POST_NOTIFICATIONS\`):** Used locally to alert you to incoming messages and calls.
- **Background Battery Optimization (\`android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS\`):** Allows Meshly to stay reachable on your local Wi-Fi or Wi-Fi Direct network in the background without Android Doze interrupting peer discovery, incoming messages, file transfers, or voice/video calls.

## 6. Optional Ads Disclosure (When Online)
Meshly works 100% offline with zero internet required for messaging, calling, and file sharing, and does not include in-app purchases.
- **Optional Rewarded Ads:** Meshly includes the Google Mobile Ads (AdMob) SDK for optional, user-initiated rewarded ads when an internet connection is available. When your device is online and you interact with optional ad features, Google Mobile Ads may collect standard advertising identifiers and device diagnostics according to Google’s Privacy Policy. AdMob never has access to your Meshly messages, calls, contacts, encryption keys, or local files. You can reset or delete your Android Advertising ID at any time in **Android Settings -> Privacy -> Ads**.

## 7. Data Deletion
You can delete individual messages, clear call logs, manage blocked users, delete local backup files, rotate your cryptographic keys, or wipe all local app data at any time from **Settings -> Storage & Data -> Wipe All Local App Data**, or by uninstalling the App.

## 8. Contact Us
If you have questions about this Privacy Policy, please contact us at: ${safeEmail}`;
}

export function resolveInitialView(hash: string, search: string): {
  mode: ActiveRouteView;
  scrollTargetId: string | null;
} {
  const cleanHash = hash.replace(/^#\/?/, '').toLowerCase();
  const params = new URLSearchParams(search);
  const pageParam = (params.get('page') || '').toLowerCase();

  if (pageParam === 'privacy' || cleanHash === 'privacy-policy-standalone') {
    return { mode: 'privacy-focused', scrollTargetId: 'privacy' };
  }

  if (
    cleanHash === 'features' ||
    cleanHash === 'ideal-for' ||
    cleanHash === 'screenshots' ||
    cleanHash === 'security' ||
    cleanHash === 'permissions' ||
    cleanHash === 'changelog' ||
    cleanHash === 'privacy'
  ) {
    return { mode: 'all', scrollTargetId: cleanHash };
  }

  return { mode: 'all', scrollTargetId: null };
}
