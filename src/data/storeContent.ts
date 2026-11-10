export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  dateGroup: string;
  replyTo?: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    name: string;
    size: string;
    sha256Short: string;
    kind: 'document' | 'video' | 'photo';
  };
}

export interface ChatThread {
  id: string;
  name: string;
  initials: string;
  avatarTone: string;
  email: string;
  localIp: string;
  verifiedGmail: boolean;
  online: boolean;
  typing?: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: ChatMessage[];
}

export interface PeerRequest {
  id: string;
  name: string;
  initials: string;
  email: string;
  localIp: string;
  discoveryMethod: 'mDNS (_meshly._tcp)' | 'QR Code Pairing';
  note: string;
  timestamp: string;
}

export interface NearbyPeer {
  id: string;
  name: string;
  initials: string;
  email: string;
  localIp: string;
  signalLabel: string;
  requestSent: boolean;
}

export interface CallRecord {
  id: string;
  name: string;
  initials: string;
  localIp: string;
  mode: 'video' | 'voice';
  direction: 'incoming' | 'outgoing';
  timestamp: string;
  duration: string;
  latencyMs: number;
}

export interface FileTransferItem {
  id: string;
  fileName: string;
  peerName: string;
  direction: 'receiving' | 'sent' | 'received';
  sizeLabel: string;
  speedLabel: string;
  progress: number;
  status: 'transferring' | 'paused' | 'verified';
  sha256: string;
}

export interface StoreListingVariant {
  id: 'variant-a' | 'variant-b';
  label: string;
  appName: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  reviewerInstructions: string;
  dataSafetySummary: string;
  dataSafetyNote: string;
}

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'chat-maya',
    name: 'Maya Lin',
    initials: 'ML',
    avatarTone: 'bg-[#17493D] text-[#6EE7B7]',
    email: 'maya.lin@gmail.com',
    localIp: '10.0.2.18',
    verifiedGmail: true,
    online: true,
    unreadCount: 0,
    lastMessage: 'Got it in 2 seconds at full quality! Calling you from Observation Lounge in five.',
    lastTimestamp: '12:49 PM',
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: 'Hey Alex! Cellular just dropped since we left port, good thing the ship Wi-Fi LAN still routes local peers.',
        time: '12:41 PM',
        dateGroup: 'TODAY',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Right? Zero internet needed. Sending over the deck itinerary PDF and raw photos now.',
        time: '12:43 PM',
        dateGroup: 'TODAY',
        status: 'read',
      },
      {
        id: 'm3',
        sender: 'me',
        text: 'Original file attached directly over Wi-Fi.',
        time: '12:44 PM',
        dateGroup: 'TODAY',
        status: 'read',
        attachment: {
          name: 'Cruise_Excursion_Map_2026.pdf',
          size: '14.8 MB',
          sha256Short: '9f86d081...e44a1c',
          kind: 'document',
        },
      },
      {
        id: 'm4',
        sender: 'them',
        replyTo: 'Cruise_Excursion_Map_2026.pdf',
        text: 'Got it in 2 seconds at full quality! Calling you from Observation Lounge in five.',
        time: '12:49 PM',
        dateGroup: 'TODAY',
      },
    ],
  },
  {
    id: 'chat-liam',
    name: "Liam O'Connor",
    initials: 'LO',
    avatarTone: 'bg-[#1D3B4F] text-[#93C5FD]',
    email: 'liam.oconnor@gmail.com',
    localIp: '10.0.2.24',
    verifiedGmail: true,
    online: true,
    typing: true,
    unreadCount: 2,
    lastMessage: 'Check Transfers tab — pushing 38.4 MB/s over 5GHz LAN!',
    lastTimestamp: '12:51 PM',
    messages: [
      {
        id: 'l1',
        sender: 'them',
        text: 'Are you in Studio B? External ISP uplink is down across campus.',
        time: '12:30 PM',
        dateGroup: 'TODAY',
      },
      {
        id: 'l2',
        sender: 'me',
        text: 'Yep, connected to the same Campus-West router.',
        time: '12:32 PM',
        dateGroup: 'TODAY',
        status: 'read',
      },
      {
        id: 'l3',
        sender: 'them',
        text: 'Awesome, transferring the 4K rough cut directly over LAN now.',
        time: '12:50 PM',
        dateGroup: 'TODAY',
      },
      {
        id: 'l4',
        sender: 'them',
        text: 'Check Transfers tab — pushing 38.4 MB/s over 5GHz LAN!',
        time: '12:51 PM',
        dateGroup: 'TODAY',
      },
    ],
  },
  {
    id: 'chat-priya',
    name: 'Priya Nair',
    initials: 'PN',
    avatarTone: 'bg-[#362B48] text-[#D8B4FE]',
    email: 'priya.nair@gmail.com',
    localIp: '10.0.2.31',
    verifiedGmail: true,
    online: true,
    unreadCount: 0,
    lastMessage: 'Low-latency UDP right between phones. Let me know when the site walk wraps up.',
    lastTimestamp: '11:20 AM',
    messages: [
      {
        id: 'p1',
        sender: 'them',
        text: 'Voice call audio was crystal clear over your mobile hotspot in the tunnel.',
        time: '11:18 AM',
        dateGroup: 'TODAY',
      },
      {
        id: 'p2',
        sender: 'me',
        text: 'Low-latency UDP right between phones. Let me know when the site walk wraps up.',
        time: '11:20 AM',
        dateGroup: 'TODAY',
        status: 'read',
      },
    ],
  },
  {
    id: 'chat-marcus',
    name: 'Marcus Vance',
    initials: 'MV',
    avatarTone: 'bg-[#3F3222] text-[#FCD34D]',
    email: 'marcus.vance@gmail.com',
    localIp: '10.0.2.09',
    verifiedGmail: true,
    online: false,
    unreadCount: 0,
    lastMessage: 'Scanned your QR code from gallery — paired immediately.',
    lastTimestamp: 'Yesterday',
    messages: [
      {
        id: 'mv1',
        sender: 'them',
        text: 'Scanned your QR code from gallery — paired immediately.',
        time: '4:15 PM',
        dateGroup: 'YESTERDAY',
      },
    ],
  },
  {
    id: 'chat-elena',
    name: 'Elena Rostova',
    initials: 'ER',
    avatarTone: 'bg-[#1F3A3D] text-[#5EEAD4]',
    email: 'elena.rostova@gmail.com',
    localIp: '10.0.2.42',
    verifiedGmail: true,
    online: true,
    unreadCount: 0,
    lastMessage: 'All site inspection photos saved straight to my local Meshly folder.',
    lastTimestamp: 'Yesterday',
    messages: [
      {
        id: 'e1',
        sender: 'them',
        text: 'All site inspection photos saved straight to my local Meshly folder.',
        time: '2:08 PM',
        dateGroup: 'YESTERDAY',
      },
    ],
  },
];

export const INITIAL_REQUESTS: PeerRequest[] = [
  {
    id: 'req-noah',
    name: 'Noah Patel',
    initials: 'NP',
    email: 'noah.patel@gmail.com',
    localIp: '10.0.2.53',
    discoveryMethod: 'mDNS (_meshly._tcp)',
    note: 'Hey Alex, sitting two rows back on Flight 418 — can you send the slide deck?',
    timestamp: 'Just now',
  },
  {
    id: 'req-hannah',
    name: 'Hannah Kim',
    initials: 'HK',
    email: 'hannah.kim@gmail.com',
    localIp: '10.0.2.61',
    discoveryMethod: 'QR Code Pairing',
    note: 'Connecting for the architecture review session on Floor 4 LAN.',
    timestamp: '3m ago',
  },
];

export const INITIAL_NEARBY_PEERS: NearbyPeer[] = [
  {
    id: 'peer-devon',
    name: 'Devon Brooks',
    initials: 'DB',
    email: 'devon.brooks@gmail.com',
    localIp: '10.0.2.77',
    signalLabel: '10.0.2.0/24 • Port 42850',
    requestSent: false,
  },
  {
    id: 'peer-sofia',
    name: 'Sofia Alvarez',
    initials: 'SA',
    email: 'sofia.alvarez@gmail.com',
    localIp: '10.0.2.84',
    signalLabel: '10.0.2.0/24 • Port 42850',
    requestSent: false,
  },
];

export const INITIAL_CALLS: CallRecord[] = [
  {
    id: 'call-1',
    name: 'Maya Lin',
    initials: 'ML',
    localIp: '10.0.2.18',
    mode: 'video',
    direction: 'incoming',
    timestamp: 'Today, 12:15 PM',
    duration: '14m 22s',
    latencyMs: 6,
  },
  {
    id: 'call-2',
    name: 'Priya Nair',
    initials: 'PN',
    localIp: '10.0.2.31',
    mode: 'voice',
    direction: 'outgoing',
    timestamp: 'Today, 11:02 AM',
    duration: '15m 40s',
    latencyMs: 4,
  },
  {
    id: 'call-3',
    name: "Liam O'Connor",
    initials: 'LO',
    localIp: '10.0.2.24',
    mode: 'video',
    direction: 'outgoing',
    timestamp: 'Yesterday, 5:48 PM',
    duration: '08m 11s',
    latencyMs: 5,
  },
  {
    id: 'call-4',
    name: 'Elena Rostova',
    initials: 'ER',
    localIp: '10.0.2.42',
    mode: 'voice',
    direction: 'incoming',
    timestamp: 'Yesterday, 1:30 PM',
    duration: '21m 05s',
    latencyMs: 7,
  },
];

export const INITIAL_TRANSFERS: FileTransferItem[] = [
  {
    id: 'tx-1',
    fileName: 'StudioB_RoughCut_4K.mp4',
    peerName: "Liam O'Connor",
    direction: 'receiving',
    sizeLabel: '412 MB / 605 MB',
    speedLabel: '38.4 MB/s',
    progress: 68,
    status: 'transferring',
    sha256: 'Pending stream completion...',
  },
  {
    id: 'tx-2',
    fileName: 'Cruise_Excursion_Map_2026.pdf',
    peerName: 'Maya Lin',
    direction: 'sent',
    sizeLabel: '14.8 MB',
    speedLabel: 'Verified',
    progress: 100,
    status: 'verified',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0e44a1c',
  },
  {
    id: 'tx-3',
    fileName: 'Field_Inspection_RAW_04.dng',
    peerName: 'Elena Rostova',
    direction: 'received',
    sizeLabel: '42.1 MB',
    speedLabel: 'Verified',
    progress: 100,
    status: 'verified',
    sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
  },
];

export const APP_SCREENSHOTS = [
  {
    id: 'screen-welcome',
    title: 'Zero-Cloud Onboarding & Verified Identity',
    caption:
      'Links your on-device Google Account so your First & Last Name are locked and verified for local discovery without creating an external cloud account.',
    assetSubpath: 'assets/aistudio/screenshot_1_f5c5b4d5.png',
    meta: 'Onboarding · Verified Identity · Local Folder',
  },
  {
    id: 'screen-chats',
    title: 'Request-Gated Chats & Instant QR Pairing',
    caption:
      'Active local Wi-Fi scanning via mDNS (_meshly._tcp) with request-based approval. Scan a peer QR code or discover People Nearby before any chat begins.',
    assetSubpath: 'assets/aistudio/screenshot_2_0dc826c5.png',
    meta: 'Chats Tab · mDNS Discovery · QR Scanner',
  },
  {
    id: 'screen-settings',
    title: 'Granular Permissions, Wallpapers & Direct IP',
    caption:
      'Inspect your active LAN endpoint (IPv4 10.0.2.16 • Port 42850), manage Camera/Mic/Wi-Fi permissions, block Google IDs, or pick a local storage folder.',
    assetSubpath: 'assets/aistudio/screenshot_3_e239b91b.png',
    meta: 'Settings · v1.2.0 · Direct IPv4 Socket',
  },
];

export const STORE_LISTING_VARIANTS: StoreListingVariant[] = [
  {
    id: 'variant-b',
    label: 'Listing B: Meshly: Local Wi-Fi Messenger',
    appName: 'Meshly: Local Wi-Fi Messenger',
    shortDescription: 'Chat, share files, and make voice or video calls over local Wi-Fi or Hotspot.',
    fullDescription: `Meshly is a local peer-to-peer messenger that lets you chat, share photos, videos, and files, and make real-time voice and video calls with people on the same Wi-Fi network or mobile hotspot — with no internet connection or cloud servers required.

WHY USE MESHLY?
Whether you are traveling on a cruise ship or flight, staying at a hotel, working on a campus or job site with spotty internet, or collaborating in a home or office LAN, Meshly connects nearby Android devices directly over your local Wi-Fi router or phone hotspot.

KEY FEATURES
• Direct Local Messaging: Send instant messages with read receipts, typing indicators, message replies, and WhatsApp-style date headers over local Wi-Fi.
• Request-Based Privacy & Block List: Incoming peers must be accepted before appearing in your active Chats list. Rejecting a request automatically blocks that user's Google ID across devices.
• High-Speed Local File & Media Sharing: Transfer original-quality photos, videos, documents, and large files directly between phones at local Wi-Fi speeds, with automatic SHA-256 integrity verification and pause/resume support.
• Local Voice & Video Calling: Place low-latency peer-to-peer audio and video calls over your local network, complete with mute, speakerphone, front/rear camera switching, and a dedicated Calls history tab.
• Instant QR Code & Manual IP Pairing: Connect immediately by scanning another user's in-app QR code with your camera, picking a QR screenshot from your gallery, or entering a local IP address in Settings.
• Custom Chat Wallpapers & Contact Info: Personalize your chat background with built-in color themes or custom gallery photos, and tap any contact's header to browse shared media, files, and verification details.
• 100% On-Device Storage: All messages, call logs, and received files stay in your device's local storage or your chosen folder. No external cloud database is ever used.`,
    category: 'Communication',
    tags: ['Messaging', 'Communication', 'File Sharing', 'Network Tools'],
    reviewerInstructions: `Meshly operates locally over Wi-Fi / LAN without requiring any backend server account.
1. On the Welcome screen, tap "Get Started", enter any First Name, Last Name, and email identifier (or pick a device Google account), and tap "Launch Meshly".
2. You can immediately explore Chats, Calls, People, Transfers, QR Code pairing, and Settings (including the optional Live Typing Preview PRO in-app purchase) on a single device, or install the app on two devices on the same Wi-Fi network to test live P2P messaging, file transfers, and voice/video calling.`,
    dataSafetySummary:
      'Local P2P chats, calls, and files are never collected on developer servers. Declare third-party Advertising SDK & Google Play Billing data types in Data Safety if ads and the 1 in-app purchase are active.',
    dataSafetyNote:
      'Play Console Data Safety guidance: Messages, call logs, and shared files stay strictly on-device / local P2P and are not collected. Because the app has 1 in-app purchase and may contain ads, select "Yes" in Data Safety if using an ad SDK (e.g., Google AdMob) to declare Device or other IDs (Advertising ID), Diagnostics, and App interactions for Advertising/Analytics, plus Financial info -> Purchase history for App functionality (Google Play Billing entitlement).',
  },
  {
    id: 'variant-a',
    label: 'Listing A: Meshly: Local Wi-Fi Chat',
    appName: 'Meshly: Local Wi-Fi Chat',
    shortDescription: 'Chat, share files, and make voice or video calls over local Wi-Fi or Hotspot.',
    fullDescription: `Meshly is a fast, private peer-to-peer messenger that lets you chat, share files, and make real-time voice and video calls with people on the same Wi-Fi network or mobile hotspot — with no internet connection or cloud servers required.

Whether you are traveling, on a flight or cruise, working in a campus or office network, or in an area with poor cellular coverage, Meshly connects directly between Android devices on your local network.

KEY FEATURES

• Instant Local Wi-Fi & Hotspot Messaging
Send and receive messages directly between nearby devices on the same Wi-Fi router or phone hotspot. Includes typing indicators, delivery/read receipts, message replies, and date-grouped conversation timelines.

• Direct Voice & Video Calling
Place low-latency peer-to-peer voice and video calls over your local network. Switch between front and rear cameras, toggle speakerphone or mute, and view your complete call history with date and time stamps.

• High-Speed File, Photo & Video Sharing
Send original-quality photos, videos, and documents directly from device to device without cloud upload limits. Automatic SHA-256 integrity verification and resumable transfers ensure large files arrive intact.

• Easy QR Code Pairing & Chat Requests
Scan another user's Meshly QR code with your camera or import a QR image from your gallery to connect immediately. Incoming chat requests require your approval before a conversation starts, and unwanted requests can be rejected and blocked by Google ID.

• Customizable & Clean Experience
Personalize your chats with built-in color wallpaper themes or your own custom gallery photos. View shared media and files per contact, manage app permissions in one place, and switch between Light, Dark, and System themes.

• 100% On-Device Storage
All messages, call logs, and received files stay on your device in your local Meshly storage folder.`,
    category: 'Communication',
    tags: ['Messaging', 'Video calling', 'File sharing', 'Communication', 'Tools'],
    reviewerInstructions: `Meshly operates over a local Wi-Fi network without requiring an external server account.
1. On first launch, tap "Continue" on the Welcome screen, enter any first/last name (or pick a device Google account), and tap "Start Using Meshly".
2. You can immediately explore Chats, Calls, People, Transfers, QR code generation/scanning, and Settings (including the 1 optional Pro in-app purchase) on a single device.
3. To test live peer-to-peer chat, file transfer, or voice/video calling between two devices, connect two Android devices to the same Wi-Fi network or mobile hotspot.`,
    dataSafetySummary:
      'Zero developer cloud servers for messages, calls, or files. Declare Advertising ID / Diagnostics (for Ads) and Purchase History (for the 1 Google Play Billing IAP) in Play Console Data Safety.',
    dataSafetyNote:
      'All personal conversations, photos/files, and voice/video streams stay on-device and transmit peer-to-peer on the local network. For the 1 in-app purchase and ads support, declare Google Play Billing purchase entitlement under App Functionality and your ad SDK’s standard Device ID / Ad interaction fields under Advertising or Marketing.',
  },
];

export const PERMISSIONS_TABLE = [
  {
    permission: 'CAMERA',
    manifestId: 'android.permission.CAMERA',
    purpose:
      'Used for scanning peer connection QR codes, taking photos to send in chat, and streaming live video during peer-to-peer video calls.',
  },
  {
    permission: 'RECORD_AUDIO',
    manifestId: 'android.permission.RECORD_AUDIO',
    purpose: 'Used to capture microphone audio for live voice transmission during peer-to-peer voice and video calls.',
  },
  {
    permission: 'NEARBY_WIFI_DEVICES',
    manifestId: 'android.permission.NEARBY_WIFI_DEVICES (neverForLocation)',
    purpose:
      'Used strictly to discover nearby Meshly peers on the local Wi-Fi network without accessing or deriving physical location.',
  },
  {
    permission: 'POST_NOTIFICATIONS',
    manifestId: 'android.permission.POST_NOTIFICATIONS',
    purpose: 'Used to alert the user of incoming local messages, file transfers, and voice/video calls.',
  },
  {
    permission: 'LOCAL LAN, BILLING & ADS',
    manifestId: 'INTERNET · ACCESS_WIFI_STATE · CHANGE_WIFI_MULTICAST_STATE · BILLING',
    purpose:
      'Used for local LAN TCP/UDP sockets and mDNS (_meshly._tcp) discovery, plus Google Play Billing (1 optional Pro in-app purchase) and ad delivery when internet is available.',
  },
];

export const ENGINEERING_FIXES = [
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

export const COMPLIANCE_DECLARATIONS = [
  { label: 'App or Game', value: 'App (Communication)' },
  {
    label: 'Pricing & In-App Purchases',
    value: 'Free download · 1 In-App Purchase (Live Typing Preview PRO via Google Play Billing)',
  },
  {
    label: 'Contains Ads Declaration',
    value: 'Yes, may contain ads (Select "Yes, my app contains ads" in Play Console)',
  },
  {
    label: 'Digital Goods Purchases (IARC)',
    value: 'Yes · 1 optional one-time Pro feature unlock via Google Play Billing',
  },
  { label: 'App Access', value: 'All core functionality available without access restrictions' },
  { label: 'Target Age Group', value: '13–15, 16–17, 18 and over (Not directed to under 13 / No Families Policy trigger)' },
  { label: 'IARC Content Rating', value: 'Social / Communication · No violence, sexuality, profanity, gambling, or substances' },
  { label: 'Physical Location Sharing', value: 'No (NEARBY_WIFI_DEVICES declared with neverForLocation)' },
  { label: 'Regulated Categories', value: 'Government, Financial, Health, COVID-19: No to all' },
];
