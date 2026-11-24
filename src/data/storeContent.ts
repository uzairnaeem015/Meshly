export interface FeaturePillar {
  index: string;
  title: string;
  headline: string;
  bullets: Array<{
    label?: string;
    text: string;
  }>;
  footerMeta: string;
  spanWide?: boolean;
}

export interface IdealForProfile {
  index: string;
  audience: string;
  description: string;
}

export interface SecurityProtectionItem {
  index: string;
  title: string;
  meta: string;
  points: Array<{
    label?: string;
    text: string;
  }>;
}

export interface PermissionItem {
  permission: string;
  manifestId: string;
  purpose: string;
}

export interface AppScreenshot {
  id: string;
  title: string;
  caption: string;
  assetSubpath: string;
  meta: string;
}

export interface ChangelogHighlight {
  tag: string;
  title: string;
  description: string;
}

export interface EngineeringFix {
  index: string;
  title: string;
  rootCause: string;
  resolution: string;
}

export const HERO_CONTENT = {
  kicker: 'Local-First Android Messenger · End-to-End Encrypted · Zero Cloud Servers',
  headline: 'Meshly — Your People. Your Network. No Internet Required.',
  subheadline:
    'Private, end-to-end encrypted messaging, HD voice and video calling, and fast local file sharing that work directly over your local Wi-Fi network or peer-to-peer Wi-Fi Direct—with no cloud servers, no phone numbers, and no internet connection required.',
  whatMeshlyDoesTitle: 'What Meshly Does',
  whatMeshlyDoesBody:
    'Meshly turns any shared Wi-Fi network—or nearby Android devices via Wi-Fi Direct—into a private, high-speed communication network. Whether you are at home, in an office, on a campus, traveling on a cruise or flight, or working in an area without cellular coverage, Meshly keeps your conversations, calls, and files flowing directly from device to device.',
  metrics: [
    {
      value: '0 Cloud Servers',
      label: 'Direct peer-to-peer over local Wi-Fi LAN and Wi-Fi Direct',
    },
    {
      value: 'AES-256-GCM',
      label: 'ECDH / ECDSA secp256r1 + HKDF-SHA256 encryption by default',
    },
    {
      value: '48 kHz HD',
      label: 'Hardware-accelerated voice & video with Picture-in-Picture',
    },
    {
      value: '100% User-Owned',
      label: 'Encrypted local backups & Storage Access Framework folders',
    },
  ],
};

export const KEY_FEATURES: FeaturePillar[] = [
  {
    index: '01',
    title: 'Offline Local Wi-Fi & Wi-Fi Direct Messaging',
    headline: 'Discover nearby devices across multi-subnet Wi-Fi or direct peer links',
    spanWide: true,
    bullets: [
      {
        text: 'Automatic peer discovery across local Wi-Fi (including multi-subnet networks) and peer-to-peer Wi-Fi Direct when no router is available.',
      },
      {
        text: 'Built-in control to disable Wi-Fi Direct discovery whenever you want to stay invisible to nearby Wi-Fi Direct scans.',
      },
      {
        text: 'Real-time typing indicators, delivery and read receipts, replies, reactions, and QR code contact verification.',
      },
    ],
    footerMeta: 'Local Wi-Fi LAN · Multi-Subnet Discovery · Wi-Fi Direct Visibility Control',
  },
  {
    index: '02',
    title: 'Fast Local Media & File Sharing',
    headline: 'Full local-network speed without cloud upload limits',
    spanWide: false,
    bullets: [
      {
        text: 'Send photos, videos, audio clips, and documents at full local network speed without cloud upload limits or compression delays.',
      },
      {
        text: 'Organize and save received media cleanly into your chosen device folder using Android’s Storage Access Framework.',
      },
    ],
    footerMeta: 'Zero Cloud Caps · Android Photo Picker & SAF',
  },
  {
    index: '03',
    title: 'Encrypted Local Backups You Own',
    headline: 'Identity-bound local archives stored only where you choose',
    spanWide: false,
    bullets: [
      {
        text: 'Back up your contacts, chat history, and media directly to a folder you choose on your device or external storage.',
      },
      {
        text: 'Backups are encrypted and bound to your account identity so only Meshly on your verified account can restore them—with automatic deduplication when merging restored contacts and live peers.',
      },
    ],
    footerMeta: 'Encrypted Archives · Automatic Peer Deduplication',
  },
  {
    index: '04',
    title: 'HD Peer-to-Peer Voice & Video Calling',
    headline: '48 kHz HD voice, hardware-accelerated video, and effortless multitasking',
    spanWide: true,
    bullets: [
      {
        text: 'Direct local 48 kHz HD voice and hardware-accelerated video calls with automatic route switching between Wi-Fi LAN and Wi-Fi Direct.',
      },
      {
        label: 'Call Multitasking & Picture-in-Picture',
        text: 'Minimize active voice or video calls to browse chats and messages inside Meshly using a floating video window, or switch apps with Android System Picture-in-Picture without interrupting audio or video.',
      },
      {
        label: 'Smart Call Ergonomics',
        text: 'Automatic ear-proximity screen-off during voice calls, double-tap video zoom (Fill Screen / Fit to Screen), and Silent Call Waiting that notifies callers when you are on another call while giving you a silent option to Switch or Decline.',
      },
    ],
    footerMeta: '48 kHz HD Voice · System Picture-in-Picture · Silent Call Waiting',
  },
];

export const IDEAL_FOR_PROFILES: IdealForProfile[] = [
  {
    index: '01',
    audience: 'Homes & Families',
    description:
      'Instant intercom-style voice/video calls and messaging across rooms without relying on internet bandwidth.',
  },
  {
    index: '02',
    audience: 'Offices, Studios & Campuses',
    description:
      'Share large files and coordinate teams over local Wi-Fi without uploading sensitive work to third-party servers.',
  },
  {
    index: '03',
    audience: 'Travel & Remote Areas',
    description:
      'Stay connected on flights, ships, road trips, and field sites with zero cellular or internet access.',
  },
];

export const SECURITY_PROTECTIONS: SecurityProtectionItem[] = [
  {
    index: '01',
    title: 'No Central Messaging Servers',
    meta: 'Direct Device-to-Device Transport',
    points: [
      {
        text: 'Meshly does not operate cloud servers to relay, store, or index your chats, calls, or contacts. All communication happens directly peer-to-peer over your local Wi-Fi network or Wi-Fi Direct.',
      },
    ],
  },
  {
    index: '02',
    title: 'End-to-End Encryption by Default',
    meta: 'ECDH / ECDSA secp256r1 · AES-256-GCM · HKDF-SHA256',
    points: [
      {
        text: 'Every device generates its own elliptic-curve cryptographic identity (ECDH / ECDSA secp256r1).',
      },
      {
        text: 'Direct peer sessions derive unique AES-256-GCM encryption keys via ECDH + HKDF-SHA256, with cryptographic Safety Numbers and QR pairing so you can verify contacts and prevent man-in-the-middle attacks.',
      },
    ],
  },
  {
    index: '03',
    title: 'Protected Account Identity (Hidden by Default)',
    meta: 'Encrypted Identity Tokens · Verified Private ID',
    points: [
      {
        text: 'Your Google ID is stored and exchanged using encrypted identity tokens so Meshly can reliably recognize your contacts without duplicating them across networks.',
      },
      {
        label: 'Hidden by Default',
        text: 'Other users cannot view your Google ID in your profile unless you explicitly turn on visibility in Settings. When hidden, peers see a Verified Private ID badge instead.',
      },
    ],
  },
  {
    index: '04',
    title: 'Encrypted, User-Owned Backups',
    meta: 'Identity-Bound Local Storage',
    points: [
      {
        text: 'Local backups are saved only to a folder you explicitly select and are encrypted so only Meshly signed into your matching identity can read or restore them. You remain in complete control of where your backups live and can delete them at any time.',
      },
    ],
  },
];

export const PERMISSIONS_TABLE: PermissionItem[] = [
  {
    permission: 'Local Wi-Fi & Nearby Devices',
    manifestId: 'NEARBY_WIFI_DEVICES (neverForLocation) · Wi-Fi Direct',
    purpose:
      'Used solely to discover and connect to peers on your local network or Wi-Fi Direct. NEARBY_WIFI_DEVICES is declared with neverForLocation on Android 13+; Android 10–12 requires system location permission solely for OS-level Wi-Fi Direct scanning, and Meshly never tracks, stores, or transmits your GPS location.',
  },
  {
    permission: 'Camera & Microphone',
    manifestId: 'CAMERA · RECORD_AUDIO',
    purpose:
      'Used only when you actively scan a QR code, capture media, or place/answer a voice or video call.',
  },
  {
    permission: 'Zero Broad Storage Access',
    manifestId: 'Android Photo Picker · Storage Access Framework (SAF)',
    purpose:
      'Meshly uses the Android Photo Picker and Storage Access Framework (SAF), meaning it never requests blanket access to your entire photo gallery or filesystem.',
  },
  {
    permission: 'Notifications',
    manifestId: 'android.permission.POST_NOTIFICATIONS',
    purpose: 'Used locally to alert you to incoming messages and calls.',
  },
  {
    permission: 'Background Battery Optimization',
    manifestId: 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
    purpose:
      'Allows Meshly to remain reachable on your local Wi-Fi or Wi-Fi Direct network in the background without Android Doze suspending peer discovery, incoming messages, file transfers, or calls.',
  },
];

export const OPTIONAL_ADS_DISCLOSURE = {
  title: 'Optional Ads Disclosure (When Online)',
  subtitle: '100% Offline Core · Optional User-Initiated Rewarded Ads',
  points: [
    'Meshly works 100% offline with zero internet required for messaging, calling, and file sharing.',
    'Meshly includes the Google Mobile Ads (AdMob) SDK for optional, user-initiated rewarded ads when an internet connection is available. When your device is online and you interact with optional ad features, Google Mobile Ads may collect standard advertising identifiers and device diagnostics according to Google’s Privacy Policy. AdMob never has access to your Meshly messages, calls, contacts, encryption keys, or local files.',
  ],
};

export const APP_SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'screen-welcome',
    title: 'Zero-Cloud Onboarding & Protected Identity',
    caption:
      'Links your on-device Google Account using encrypted identity tokens so your profile is verified for local discovery—with your Google ID hidden by default behind a Verified Private ID badge.',
    assetSubpath: 'assets/aistudio/screenshot_1_f5c5b4d5.png',
    meta: 'Onboarding · Encrypted Identity · Local Folder',
  },
  {
    id: 'screen-chats',
    title: 'Offline Local Wi-Fi & Wi-Fi Direct Chats',
    caption:
      'Automatic local Wi-Fi and peer-to-peer Wi-Fi Direct discovery with request-based approval, QR code verification, typing indicators, replies, and reactions.',
    assetSubpath: 'assets/aistudio/screenshot_2_0dc826c5.png',
    meta: 'Chats · Multi-Subnet & Wi-Fi Direct · QR Pairing',
  },
  {
    id: 'screen-settings',
    title: 'Privacy Controls, Permissions & Local Backups',
    caption:
      'Inspect your active LAN endpoint, toggle Google ID visibility or Wi-Fi Direct discovery, manage minimal device permissions, and choose your SAF folder for encrypted local backups.',
    assetSubpath: 'assets/aistudio/screenshot_3_e239b91b.png',
    meta: 'Settings · Privacy Controls · User-Owned Storage',
  },
];

export const CHANGELOG_HIGHLIGHTS: ChangelogHighlight[] = [
  {
    tag: 'Connectivity',
    title: 'Bluetooth & Wi-Fi Direct Support',
    description:
      'Added peer-to-peer Bluetooth and Wi-Fi Direct transport support so nearby Android devices can discover peers, chat, and transfer files even when no Wi-Fi router or hotspot is available.',
  },
  {
    tag: 'Background Reliability',
    title: 'Added Background Battery Permission',
    description:
      'Added unrestricted background battery support (REQUEST_IGNORE_BATTERY_OPTIMIZATIONS) to keep local discovery, incoming messages, file transfers, and calls active without Android Doze interruptions.',
  },
  {
    tag: 'Maintenance',
    title: 'General Fixes & Polish',
    description:
      'General bug fixes, smoother peer session recovery across network switches, and reliability improvements across Chats, Calls, People, and Transfers.',
  },
];

export const ENGINEERING_FIXES: EngineeringFix[] = [
  {
    index: '01',
    title: 'Background Coroutine Exception Handling & Dispatchers.IO Saturation',
    rootCause:
      'At startup, scanLocalSubnetForPeers() launched 64 concurrent blocking socket connections across up to 5 /24 subnets (1,270 sockets) and spawned Runtime.getRuntime().exec("ip neigh") every 4 seconds, exhausting Dispatchers.IO’s 64-thread pool and file descriptors shortly after launch.',
    resolution:
      'Removed the external ip neigh subprocess, restricted subnet scanning to the active local /24 subnet with a 6-second cooldown and a 16-connection Semaphore, and attached CoroutineExceptionHandler to all background coroutine scopes (MeshNetworkManager, LocalCallEngine, BluetoothMeshController).',
  },
  {
    index: '02',
    title: 'Android 12+ Background Service & Notification Icon Inflation Hardening',
    rootCause:
      'Starting MeshlyForegroundService while a runtime permission prompt (POST_NOTIFICATIONS / NEARBY_WIFI_DEVICES) briefly paused MainActivity, or inflating adaptive vector drawables as status bar small icons, could trigger BackgroundServiceStartNotAllowedException or IllegalArgumentException.',
    resolution:
      'Created a dedicated monochrome 24dp status bar vector icon (ic_stat_meshly.xml), started MeshNetworkManager directly in-process, removed .setFullScreenIntent(...), and guarded all service/notification calls and NsdManager listener registrations with synchronization and runCatching.',
  },
  {
    index: '03',
    title: 'Room Database v3 Schema Migration Resilience',
    rootCause:
      'Schema updates between local peer metadata revisions required deterministic migration handling across upgrades and test downgrades.',
    resolution:
      'Bumped MeshlyDatabase to version = 3 with both fallbackToDestructiveMigration and fallbackToDestructiveMigrationOnDowngrade enabled for clean schema transitions.',
  },
];
