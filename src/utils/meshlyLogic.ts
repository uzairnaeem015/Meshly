import {
  ChatMessage,
  ChatThread,
  FileTransferItem,
  NearbyPeer,
  PeerRequest,
  StoreListingVariant,
} from '../data/storeContent';

export interface SimulatorState {
  chats: ChatThread[];
  pendingRequests: PeerRequest[];
  nearbyPeers: NearbyPeer[];
  transfers: FileTransferItem[];
  blockedGoogleIds: string[];
  proUnlocked?: boolean;
}

export interface ListingValidationResult {
  appNameLength: number;
  appNameMax: 30;
  appNameValid: boolean;
  shortDescLength: number;
  shortDescMax: 80;
  shortDescValid: boolean;
  fullDescLength: number;
  fullDescMax: 4000;
  fullDescValid: boolean;
  allValid: boolean;
}

export function filterChats(chats: ChatThread[], query: string): ChatThread[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return chats;
  return chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(normalized) ||
      chat.email.toLowerCase().includes(normalized) ||
      chat.localIp.toLowerCase().includes(normalized) ||
      chat.lastMessage.toLowerCase().includes(normalized) ||
      chat.messages.some(
        (m) =>
          m.text.toLowerCase().includes(normalized) ||
          (m.attachment && m.attachment.name.toLowerCase().includes(normalized))
      )
  );
}

export function markChatAsRead(chats: ChatThread[], chatId: string): ChatThread[] {
  return chats.map((chat) => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat));
}

export function sendChatMessage(
  chats: ChatThread[],
  chatId: string,
  rawText: string,
  timeLabel: string
): { chats: ChatThread[]; sent: boolean; error?: string } {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { chats, sent: false, error: 'Enter a message to send over local Wi-Fi.' };
  }

  const newMessage: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender: 'me',
    text: trimmed,
    time: timeLabel,
    dateGroup: 'TODAY',
    status: 'read',
  };

  const updated = chats.map((chat) => {
    if (chat.id !== chatId) return chat;
    return {
      ...chat,
      unreadCount: 0,
      typing: false,
      lastMessage: trimmed,
      lastTimestamp: timeLabel,
      messages: [...chat.messages, newMessage],
    };
  });

  return { chats: updated, sent: true };
}

export function acceptPeerRequest(state: SimulatorState, requestId: string): SimulatorState {
  const target = state.pendingRequests.find((r) => r.id === requestId);
  if (!target) return state;

  const newChat: ChatThread = {
    id: `chat-${target.id}`,
    name: target.name,
    initials: target.initials,
    avatarTone: 'bg-[#17493D] text-[#6EE7B7]',
    email: target.email,
    localIp: target.localIp,
    verifiedGmail: true,
    online: true,
    unreadCount: 0,
    lastMessage: target.note,
    lastTimestamp: 'Just now',
    messages: [
      {
        id: `init-${target.id}`,
        sender: 'them',
        text: target.note,
        time: 'Just now',
        dateGroup: 'TODAY',
      },
    ],
  };

  return {
    ...state,
    chats: [newChat, ...state.chats],
    pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
  };
}

export function rejectAndBlockPeerRequest(state: SimulatorState, requestId: string): SimulatorState {
  const target = state.pendingRequests.find((r) => r.id === requestId);
  if (!target) return state;

  const nextBlocked = state.blockedGoogleIds.includes(target.email)
    ? state.blockedGoogleIds
    : [...state.blockedGoogleIds, target.email];

  return {
    ...state,
    pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
    blockedGoogleIds: nextBlocked,
  };
}

export function sendDiscoveryRequest(peers: NearbyPeer[], peerId: string): NearbyPeer[] {
  return peers.map((peer) => (peer.id === peerId ? { ...peer, requestSent: true } : peer));
}

export function toggleTransferPause(
  transfers: FileTransferItem[],
  transferId: string
): FileTransferItem[] {
  return transfers.map((tx) => {
    if (tx.id !== transferId || tx.status === 'verified') return tx;
    const nextStatus = tx.status === 'transferring' ? 'paused' : 'transferring';
    return {
      ...tx,
      status: nextStatus,
      speedLabel: nextStatus === 'paused' ? 'Paused' : '38.4 MB/s',
    };
  });
}

export function validateStoreListingLimits(listing: StoreListingVariant): ListingValidationResult {
  const appNameLength = listing.appName.length;
  const shortDescLength = listing.shortDescription.length;
  const fullDescLength = listing.fullDescription.length;

  const appNameValid = appNameLength > 0 && appNameLength <= 30;
  const shortDescValid = shortDescLength > 0 && shortDescLength <= 80;
  const fullDescValid = fullDescLength > 0 && fullDescLength <= 4000;

  return {
    appNameLength,
    appNameMax: 30,
    appNameValid,
    shortDescLength,
    shortDescMax: 80,
    shortDescValid,
    fullDescLength,
    fullDescMax: 4000,
    fullDescValid,
    allValid: appNameValid && shortDescValid && fullDescValid,
  };
}

export function unlockProFeature(state: SimulatorState): SimulatorState {
  return {
    ...state,
    proUnlocked: true,
  };
}

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

Meshly ("the App") is a local peer-to-peer communication application for Android. We are committed to protecting your privacy.

## 1. Local Peer-to-Peer Communication (No Developer Chat Servers)
Meshly operates directly between devices on your local Wi-Fi network or mobile hotspot. We do not operate central messaging servers, and we do not collect, upload, store, or sell your personal messages, call logs, or shared files on developer servers.

## 2. Information Stored Locally on Your Device
- **Profile Information:** Your chosen display name, optional Google email identifier, and profile photo are stored locally on your device and shared only with peers on your local network to identify you during discovery and chat requests.
- **Messages, Files, and Call Logs:** All chat history, shared photos/videos/files, and call logs are stored locally on your device. You can delete individual messages, clear chats, clear call history, or wipe all local data at any time in **Settings > Data & Reset**.

## 3. Advertising & In-App Purchases
- **In-App Purchases:** Meshly offers one optional in-app purchase (such as unlocking Live Typing Preview Pro) processed securely through **Google Play Billing**. We do not access or store your payment card details; only your purchase entitlement status is verified via Google Play.
- **Advertisements:** Meshly may display ads served by third-party advertising partners (such as Google AdMob) when internet connectivity is available. Ad SDKs may process device identifiers (such as the Android Advertising ID), coarse network information, and ad interaction diagnostics to serve and measure ads. You can reset or delete your Advertising ID anytime in your Android device’s **Settings > Privacy > Ads**.

## 4. Permissions Used
- **Camera (\`android.permission.CAMERA\`):** Used only when you scan a QR code, capture a photo in chat, or participate in a video call.
- **Microphone (\`android.permission.RECORD_AUDIO\`):** Used only during active voice or video calls.
- **Nearby Wi-Fi Devices (\`android.permission.NEARBY_WIFI_DEVICES\`):** Used to discover other Meshly users on your local network without determining your physical location.
- **Notifications (\`android.permission.POST_NOTIFICATIONS\`):** Used to notify you of incoming messages and calls.
- **Google Play Billing (\`com.android.vending.BILLING\`):** Used to process and restore the optional in-app purchase.

## 5. Data Deletion
Because your conversations and files reside on your device, you have full control over them. You can erase all stored local data at any time from **Settings > Data & Reset > Wipe All Local Data** or by uninstalling the App.

## 6. Contact Us
If you have questions about this Privacy Policy, please contact us at: ${safeEmail}`;
  }

  return `# Privacy Policy for Meshly

**Effective Date:** November 6, 2026

Meshly ("the App") is a local peer-to-peer communication application for Android. We respect your privacy and designed Meshly so that your conversations, files, and calls remain under your control on your local network.

## 1. No Developer Cloud Servers for Conversations or Files
Meshly does not use external developer servers or cloud databases to route or store your communications. We do not collect, store, sell, or transmit your personal messages, voice/video calls, call logs, or transferred files to any developer-operated server.

## 2. Information Stored Locally on Your Device
All communication data generated or configured in Meshly is stored locally on your Android device:
- **Profile Identity:** Your chosen display name (first and last name), email identifier, profile photo, and locally generated cryptographic device keys.
- **Messages, Call Logs & Files:** Chat history, call history, and transferred media/files are stored exclusively in your device's internal storage or the local folder you select via the Android Storage Access Framework.

## 3. Local Network Peer-to-Peer Communication
When you connect to a local Wi-Fi network or mobile hotspot while using Meshly, your device broadcasts your configured display name, email identifier, and cryptographic public key to other Meshly users on the same local network so they can discover you, verify your identity, and exchange messages, files, and voice/video calls directly device-to-device.

## 4. In-App Purchases & Third-Party Advertising
- **In-App Purchase (Google Play Billing):** Meshly includes one optional in-app purchase (for example, Live Typing Preview Pro). All payment processing is handled directly by **Google Play Billing** (\`com.android.vending.BILLING\`). Meshly never receives or stores your credit card or billing credentials, retaining only purchase verification status to unlock Pro functionality.
- **Advertisements (May Contain Ads):** Meshly may display advertisements provided by third-party ad networks (such as Google AdMob) when your device has internet access. These third-party SDKs may collect and process your Android Advertising ID, device/app diagnostics, and ad interaction metrics in accordance with Google’s Privacy & Terms. You may opt out of personalized ads or delete your Advertising ID at any time in **Android Settings -> Privacy -> Ads**.

## 5. Permissions Used
- **Camera (\`android.permission.CAMERA\`):** Used only when you scan a peer's QR code or participate in a local video call.
- **Microphone (\`android.permission.RECORD_AUDIO\`):** Used only during active local voice or video calls.
- **Nearby Wi-Fi Devices & Network (\`android.permission.NEARBY_WIFI_DEVICES\`, \`INTERNET\`, \`ACCESS_WIFI_STATE\`):** Used to discover and communicate with nearby devices on your local Wi-Fi or hotspot network, and when online to validate Google Play Billing or load ads.
- **Notifications (\`android.permission.POST_NOTIFICATIONS\`):** Used to display alerts for incoming local messages and calls.
- **Billing (\`com.android.vending.BILLING\`):** Used strictly for the optional Google Play in-app purchase and purchase restoration.

## 6. Data Deletion
You can delete individual messages, clear call logs, manage blocked users, rotate your cryptographic keys, or wipe all local app data at any time from **Settings -> Storage & Data -> Wipe All Local App Data**, or by uninstalling the App.

## 7. Contact Us
If you have questions about this Privacy Policy, please contact us at: ${safeEmail}`;
}

export const GOOGLE_TAG_AUTHORITY_ID = 'f08c47fec0942fa0';

export function parseAdMobPublisherId(rawInput: string): {
  valid: boolean;
  normalizedPubId?: string;
  error?: string;
} {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Enter your 16-digit AdMob Publisher ID (for example, pub-3940256099942544).',
    };
  }

  // Accept either a full snippet line ("google.com, pub-1234..., DIRECT, f08c47fec0942fa0") or "pub-1234..." or "1234..."
  const fullLineMatch = trimmed.match(/pub-(\d{16})/i);
  if (fullLineMatch) {
    return { valid: true, normalizedPubId: `pub-${fullLineMatch[1]}` };
  }

  if (/^\d{16}$/.test(trimmed)) {
    return { valid: true, normalizedPubId: `pub-${trimmed}` };
  }

  return {
    valid: false,
    error: 'Publisher ID must be "pub-" followed by 16 digits (from AdMob → Apps → View all apps → app-ads.txt).',
  };
}

export function buildAppAdsTxt(normalizedPubId: string): string {
  return `google.com, ${normalizedPubId}, DIRECT, ${GOOGLE_TAG_AUTHORITY_ID}`;
}

export type ActiveRouteView = 'all' | 'privacy-focused';

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
    cleanHash === 'privacy' ||
    cleanHash === 'play-console' ||
    cleanHash === 'app-ads' ||
    cleanHash === 'engineering' ||
    cleanHash === 'screenshots' ||
    cleanHash === 'features' ||
    cleanHash === 'simulator'
  ) {
    return { mode: 'all', scrollTargetId: cleanHash };
  }

  return { mode: 'all', scrollTargetId: null };
}

