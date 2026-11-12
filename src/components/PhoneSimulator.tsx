import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  Camera,
  CheckCheck,
  FileText,
  Lock,
  MessageSquare,
  Mic,
  MicOff,
  Pause,
  Phone,
  PhoneIncoming,
  PhoneOff,
  PhoneOutgoing,
  Play,
  QrCode,
  RefreshCw,
  Search,
  Send,
  Settings as SettingsIcon,
  ShieldCheck,
  Users,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import {
  CallRecord,
  INITIAL_CALLS,
  INITIAL_CHATS,
  INITIAL_NEARBY_PEERS,
  INITIAL_REQUESTS,
  INITIAL_TRANSFERS,
} from '../data/storeContent';
import {
  acceptPeerRequest,
  filterChats,
  markChatAsRead,
  rejectAndBlockPeerRequest,
  sendChatMessage,
  sendDiscoveryRequest,
  SimulatorState,
  toggleTransferPause,
} from '../utils/meshlyLogic';

type PhoneTab = 'chats' | 'calls' | 'people' | 'transfers' | 'settings';

const WALLPAPER_THEMES = [
  { id: 'obsidian', label: 'Obsidian Default', bgClass: 'bg-[#10171A]' },
  { id: 'deep-pine', label: 'Deep Pine', bgClass: 'bg-[#0E1E1B]' },
  { id: 'slate-harbor', label: 'Slate Harbor', bgClass: 'bg-[#121B24]' },
] as const;

export const PhoneSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PhoneTab>('chats');
  const [state, setState] = useState<SimulatorState>({
    chats: INITIAL_CHATS,
    pendingRequests: INITIAL_REQUESTS,
    nearbyPeers: INITIAL_NEARBY_PEERS,
    transfers: INITIAL_TRANSFERS,
    blockedGoogleIds: [],
  });
  const [calls, setCalls] = useState<CallRecord[]>(INITIAL_CALLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [composeError, setComposeError] = useState<string | null>(null);
  const [showScanBanner, setShowScanBanner] = useState(true);
  const [scanStatusText, setScanStatusText] = useState(
    'Scanning local Wi-Fi network for nearby people...'
  );
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeCall, setActiveCall] = useState<{
    name: string;
    initials: string;
    localIp: string;
    mode: 'voice' | 'video';
  } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [rearCamera, setRearCamera] = useState(false);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  const visibleChats = filterChats(state.chats, searchQuery);
  const selectedChat = state.chats.find((c) => c.id === selectedChatId) || null;
  const totalUnread = state.chats.reduce((acc, c) => acc + c.unreadCount, 0);
  const currentWallpaper = WALLPAPER_THEMES[wallpaperIndex];

  useEffect(() => {
    if (selectedChat && scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = scrollBodyRef.current.scrollHeight;
    }
  }, [selectedChatId, selectedChat?.messages.length]);

  const handleOpenChat = (chatId: string) => {
    setState((prev) => ({ ...prev, chats: markChatAsRead(prev.chats, chatId) }));
    setSelectedChatId(chatId);
    setComposeError(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChatId) return;
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const result = sendChatMessage(state.chats, selectedChatId, draftMessage, timeLabel);
    if (!result.sent) {
      setComposeError(result.error || 'Enter a message first.');
      return;
    }
    setState((prev) => ({ ...prev, chats: result.chats }));
    setDraftMessage('');
    setComposeError(null);
  };

  const handleRescanSubnet = () => {
    setShowScanBanner(true);
    setScanStatusText(
      `Active /24 scan complete: ${state.chats.length + state.pendingRequests.length + state.nearbyPeers.length} peers on 10.0.2.0/24`
    );
  };

  const handleStartCall = (
    name: string,
    initials: string,
    localIp: string,
    mode: 'voice' | 'video'
  ) => {
    setActiveCall({ name, initials, localIp, mode });
    setIsMuted(false);
    setCalls((prev) => [
      {
        id: `call-${Date.now()}`,
        name,
        initials,
        localIp,
        mode,
        direction: 'outgoing',
        timestamp: 'Just now',
        duration: 'Live LAN',
        latencyMs: 5,
      },
      ...prev,
    ]);
  };

  return (
    <div className="w-full max-w-[390px] mx-auto">
      {/* Outer Android Hardware Frame */}
      <div
        data-testid="meshly-phone-simulator"
        className="relative rounded-[32px] border border-white/15 bg-[#10171A] shadow-2xl overflow-hidden flex flex-col h-[690px]"
      >
        {/* Android Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1.5 bg-[#192327] text-[11px] font-medium text-[#E2E8EB] select-none">
          <span className="font-mono tabular-nums">12:52</span>
          <div className="flex items-center gap-2 text-[10px] text-[#94A3A8] font-mono">
            <span>Wi-Fi LAN</span>
            <span>·</span>
            <span>100%</span>
          </div>
        </div>

        {/* Active Call Full-Screen Overlay */}
        {activeCall && (
          <div
            role="dialog"
            aria-label={`Active ${activeCall.mode} call with ${activeCall.name}`}
            className="absolute inset-0 z-30 bg-[#0E1619] flex flex-col justify-between p-6"
          >
            <div className="pt-6 text-center">
              <p className="text-xs font-mono text-[#00C48C]">
                Direct P2P {activeCall.mode === 'video' ? 'Video' : 'Voice'} · {activeCall.localIp} · 5ms UDP
              </p>
              <h3 className="mt-2 text-2xl font-display font-bold text-white">{activeCall.name}</h3>
              <p className="mt-1 text-xs text-[#94A3A8]">
                {activeCall.mode === 'video'
                  ? rearCamera
                    ? 'Streaming Rear Camera (1080p LAN)'
                    : 'Streaming Front Camera (1080p LAN)'
                  : 'Connected over Local Wi-Fi — Zero Cloud Relay'}
              </p>
            </div>

            <div className="my-auto flex flex-col items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-[#17493D] border border-[#00C48C]/40 flex items-center justify-center text-3xl font-display font-bold text-[#6EE7B7]">
                {activeCall.initials}
              </div>
              <p className="mt-4 font-mono text-xs text-[#CBD5D9] tabular-nums">00:42 · Verified Device Key</p>
            </div>

            <div className="grid grid-cols-4 gap-3 pb-4">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                className={`flex flex-col items-center justify-center py-3 rounded-2xl border text-xs font-medium transition-colors ${
                  isMuted
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                    : 'bg-[#192327] border-white/10 text-[#E2E8EB] hover:bg-[#223036]'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4 mb-1" /> : <Mic className="w-4 h-4 mb-1" />}
                <span>{isMuted ? 'Muted' : 'Mute'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSpeakerOn((s) => !s)}
                aria-label={isSpeakerOn ? 'Disable speakerphone' : 'Enable speakerphone'}
                className={`flex flex-col items-center justify-center py-3 rounded-2xl border text-xs font-medium transition-colors ${
                  isSpeakerOn
                    ? 'bg-[#0D4A3A] border-[#00C48C]/40 text-[#6EE7B7]'
                    : 'bg-[#192327] border-white/10 text-[#E2E8EB] hover:bg-[#223036]'
                }`}
              >
                <Volume2 className="w-4 h-4 mb-1" />
                <span>Speaker</span>
              </button>

              <button
                type="button"
                onClick={() => setRearCamera((c) => !c)}
                aria-label="Switch front and rear camera"
                className="flex flex-col items-center justify-center py-3 rounded-2xl border border-white/10 bg-[#192327] text-[#E2E8EB] hover:bg-[#223036] text-xs font-medium transition-colors"
              >
                <Camera className="w-4 h-4 mb-1" />
                <span>{rearCamera ? 'Rear' : 'Front'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCall(null)}
                aria-label="End local call"
                className="flex flex-col items-center justify-center py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
              >
                <PhoneOff className="w-4 h-4 mb-1" />
                <span>End</span>
              </button>
            </div>
          </div>
        )}

        {/* QR Code Pairing Modal inside Phone */}
        {showQrModal && (
          <div
            role="dialog"
            aria-label="Meshly QR Code Pairing"
            className="absolute inset-0 z-20 bg-[#0B1114]/95 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white">Pair via Meshly QR</h3>
                <p className="text-xs text-[#94A3A8]">Scan with camera or import screenshot from gallery</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                aria-label="Close QR pairing dialog"
                className="w-9 h-9 rounded-lg bg-[#192327] text-[#E2E8EB] flex items-center justify-center hover:bg-[#243238]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-auto bg-[#162024] border border-white/10 rounded-2xl p-5 text-center">
              <div className="w-36 h-36 mx-auto rounded-xl bg-white p-3 flex items-center justify-center">
                <QrCode className="w-28 h-28 text-[#0B1114]" />
              </div>
              <p className="mt-4 font-semibold text-sm text-white">Alex Rivera</p>
              <p className="text-xs text-[#00C48C] font-mono mt-0.5">alex.rivera@gmail.com</p>
              <p className="text-[11px] text-[#94A3A8] font-mono mt-2">
                Endpoint: 10.0.2.16:42850 · _meshly._tcp
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowQrModal(false);
                setActiveTab('people');
              }}
              className="w-full py-2.5 rounded-xl bg-[#00B37E] hover:bg-[#00C98D] text-[#042319] font-semibold text-xs transition-colors"
            >
              View Pending Chat Requests ({state.pendingRequests.length})
            </button>
          </div>
        )}

        {/* Top App Bar (Matches screenshot_2 & screenshot_3) */}
        {!selectedChat ? (
          <>
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#192327]">
              <div>
                <div className="text-[18px] font-display font-semibold text-white leading-tight">
                  Meshly
                </div>
                <div className="text-[11px] font-mono text-[#CBD5D9]">Local network ready</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  aria-label="Open My Meshly QR Code"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#E2E8EB] hover:bg-white/10 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRescanSubnet}
                  aria-label="Rescan local Wi-Fi subnet"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#E2E8EB] hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showScanBanner && (
              <div className="flex items-center justify-between px-4 py-2 bg-[#192327] border-t border-b border-white/[0.07] text-[11.5px] text-[#D8E2E6]">
                <span className="truncate pr-2">{scanStatusText}</span>
                <button
                  type="button"
                  onClick={() => setShowScanBanner(false)}
                  aria-label="Dismiss network scan banner"
                  className="w-6 h-6 rounded flex items-center justify-center text-[#94A3A8] hover:text-white shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Active Conversation Top Bar */
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#192327] border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedChatId(null)}
                aria-label="Back to chats list"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#E2E8EB] hover:bg-white/10 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${selectedChat.avatarTone}`}
              >
                {selectedChat.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white truncate">
                    {selectedChat.name}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C48C] shrink-0" aria-hidden="true" />
                </div>
                <div className="text-[10.5px] font-mono text-[#94A3A8] truncate">
                  {selectedChat.localIp} · Verified Gmail
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleStartCall(
                    selectedChat.name,
                    selectedChat.initials,
                    selectedChat.localIp,
                    'voice'
                  )
                }
                aria-label={`Voice call ${selectedChat.name}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#E2E8EB] hover:bg-white/10"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleStartCall(
                    selectedChat.name,
                    selectedChat.initials,
                    selectedChat.localIp,
                    'video'
                  )
                }
                aria-label={`Video call ${selectedChat.name}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#E2E8EB] hover:bg-white/10"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Scrollable Screen Body */}
        <div
          ref={scrollBodyRef}
          className={`flex-1 overflow-y-auto ${selectedChat ? currentWallpaper.bgClass : 'bg-[#10171A]'}`}
        >
          {selectedChat ? (
            /* Conversation Thread View */
            <div className="p-3.5 flex flex-col gap-2.5">
              {selectedChat.messages.map((msg, idx) => {
                const prevGroup = idx > 0 ? selectedChat.messages[idx - 1].dateGroup : null;
                const showDateHeader = msg.dateGroup !== prevGroup;
                const isMe = msg.sender === 'me';

                return (
                  <React.Fragment key={msg.id}>
                    {showDateHeader && (
                      <div className="my-1 text-center">
                        <span className="text-[10px] font-mono tracking-wider text-[#94A3A8]">
                          {msg.dateGroup}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#0B5340] text-[#F1F5F6] rounded-br-sm'
                            : 'bg-[#1C262B] text-[#E2E8EB] rounded-bl-sm'
                        }`}
                      >
                        {msg.replyTo && (
                          <div className="mb-1.5 px-2.5 py-1 rounded bg-black/25 text-[10.5px] text-[#94A3A8] truncate">
                            Replying to {msg.replyTo}
                          </div>
                        )}
                        {msg.attachment && (
                          <div className="mb-2 p-2.5 rounded-xl bg-black/25 border border-white/10 flex items-start gap-2.5">
                            <FileText className="w-4 h-4 text-[#00C48C] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="font-medium text-white truncate">
                                {msg.attachment.name}
                              </div>
                              <div className="text-[10px] font-mono text-[#94A3A8] mt-0.5">
                                {msg.attachment.size} · SHA-256 {msg.attachment.sha256Short}
                              </div>
                            </div>
                          </div>
                        )}
                        <p>{msg.text}</p>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#CBD5D9]/75 font-mono">
                          <span>{msg.time}</span>
                          {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#4ADE80]" />}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : activeTab === 'chats' ? (
            /* Populated Chats List */
            <div className="p-3">
              <div className="relative mb-3">
                <Search
                  className="w-4 h-4 text-[#94A3A8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search accepted chats"
                  placeholder="Search accepted chats..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#1C262B] text-xs text-white placeholder:text-[#8A999F] border border-white/[0.05] focus:outline-none focus:border-[#00C48C]"
                />
              </div>

              {visibleChats.length === 0 ? (
                <div className="py-14 px-4 text-center">
                  <p className="text-sm font-semibold text-white">No Matching Local Chats</p>
                  <p className="mt-1 text-xs text-[#94A3A8]">
                    Try another contact name, local IPv4 address, or check People Nearby.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#00B37E] text-[#042319] text-xs font-semibold"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {visibleChats.map((chat) => (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() => handleOpenChat(chat.id)}
                      className="w-full py-3 px-2 flex items-center gap-3 text-left hover:bg-white/[0.04] rounded-xl transition-colors"
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${chat.avatarTone}`}
                      >
                        {chat.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-semibold text-white truncate">
                            {chat.name}
                          </span>
                          <span className="text-[10.5px] font-mono text-[#94A3A8] shrink-0 tabular-nums">
                            {chat.lastTimestamp}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <span
                            className={`text-xs truncate ${
                              chat.typing ? 'text-[#00C48C] font-medium' : 'text-[#94A3A8]'
                            }`}
                          >
                            {chat.typing ? 'Typing over local Wi-Fi...' : chat.lastMessage}
                          </span>
                          {chat.unreadCount > 0 && (
                            <span className="font-mono text-[10px] font-bold text-[#042319] bg-[#00C48C] w-5 h-5 rounded-full flex items-center justify-center shrink-0 tabular-nums">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[10px] font-mono text-[#6E7F85]">
                          {chat.localIp} · {chat.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'calls' ? (
            /* Populated Calls History */
            <div className="p-3.5 space-y-2">
              <div className="px-1 pb-1 flex items-center justify-between text-[11px] text-[#94A3A8]">
                <span>Direct LAN Voice &amp; Video History</span>
                <span className="font-mono tabular-nums">{calls.length} calls</span>
              </div>
              {calls.map((call) => (
                <div
                  key={call.id}
                  className="p-3 rounded-xl bg-[#162024] border border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#1D3238] text-[#CBD5D9] flex items-center justify-center text-xs font-bold shrink-0">
                      {call.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{call.name}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#94A3A8]">
                        {call.direction === 'incoming' ? (
                          <PhoneIncoming className="w-3 h-3 text-[#00C48C]" />
                        ) : (
                          <PhoneOutgoing className="w-3 h-3 text-[#60A5FA]" />
                        )}
                        <span className="truncate">
                          {call.timestamp} · {call.duration}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#6E7F85] tabular-nums">
                        {call.localIp} · {call.latencyMs}ms RTT
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleStartCall(call.name, call.initials, call.localIp, call.mode)
                    }
                    aria-label={`Start ${call.mode} call with ${call.name}`}
                    className="w-9 h-9 rounded-lg bg-[#0D4A3A] text-[#6EE7B7] hover:bg-[#13634E] flex items-center justify-center shrink-0 transition-colors"
                  >
                    {call.mode === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : activeTab === 'people' ? (
            /* People Nearby & Chat Requests */
            <div className="p-3.5 space-y-4">
              <div>
                <div className="px-1 mb-2 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Pending Chat Requests</span>
                  <span className="font-mono text-[11px] text-[#00C48C] tabular-nums">
                    {state.pendingRequests.length} awaiting approval
                  </span>
                </div>

                {state.pendingRequests.length === 0 ? (
                  <div className="p-3.5 rounded-xl bg-[#162024] border border-white/[0.06] text-xs text-[#94A3A8]">
                    All incoming local peer requests have been reviewed.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {state.pendingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-xl bg-[#162024] border border-white/[0.08]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-xs text-white">{req.name}</div>
                          <span className="text-[10px] font-mono text-[#94A3A8]">
                            {req.localIp}
                          </span>
                        </div>
                        <div className="text-[10.5px] font-mono text-[#00C48C] mt-0.5">
                          {req.email} · {req.discoveryMethod}
                        </div>
                        <p className="mt-1.5 text-xs text-[#CBD5D9] leading-snug">{req.note}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setState((prev) => acceptPeerRequest(prev, req.id));
                              setActiveTab('chats');
                            }}
                            aria-label={`Accept chat request from ${req.name}`}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-[#00B37E] hover:bg-[#00C98D] text-[#042319] font-semibold text-xs transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setState((prev) => rejectAndBlockPeerRequest(prev, req.id))
                            }
                            aria-label={`Reject and block ${req.name}`}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-[#1F2C32] hover:bg-[#2A3A42] text-[#E2E8EB] font-medium text-xs transition-colors"
                          >
                            Reject &amp; Block ID
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="px-1 mb-2 text-xs font-semibold text-white">
                  Discovered on Wi-Fi Subnet (10.0.2.0/24)
                </div>
                <div className="space-y-2">
                  {state.nearbyPeers.map((peer) => (
                    <div
                      key={peer.id}
                      className="p-3 rounded-xl bg-[#162024] border border-white/[0.06] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{peer.name}</div>
                        <div className="text-[10.5px] font-mono text-[#94A3A8] truncate">
                          {peer.email}
                        </div>
                        <div className="text-[10px] font-mono text-[#6E7F85]">
                          {peer.signalLabel}
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={peer.requestSent}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            nearbyPeers: sendDiscoveryRequest(prev.nearbyPeers, peer.id),
                          }))
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                          peer.requestSent
                            ? 'bg-white/10 text-[#94A3A8] cursor-default'
                            : 'bg-[#0D4A3A] text-[#6EE7B7] hover:bg-[#13634E]'
                        }`}
                      >
                        {peer.requestSent ? 'Requested' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'transfers' ? (
            /* High-Speed SHA-256 Transfers */
            <div className="p-3.5 space-y-2.5">
              <div className="px-1 pb-1 text-[11px] text-[#94A3A8]">
                Original-quality LAN transfers · Automatic SHA-256 integrity check
              </div>
              {state.transfers.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-[#162024] border border-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{tx.fileName}</div>
                      <div className="text-[11px] text-[#94A3A8] mt-0.5">
                        {tx.direction === 'receiving'
                          ? `Receiving from ${tx.peerName}`
                          : tx.direction === 'sent'
                          ? `Sent to ${tx.peerName}`
                          : `Received from ${tx.peerName}`}{' '}
                        · {tx.sizeLabel}
                      </div>
                    </div>
                    {tx.status !== 'verified' ? (
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            transfers: toggleTransferPause(prev.transfers, tx.id),
                          }))
                        }
                        aria-label={
                          tx.status === 'paused'
                            ? `Resume transfer ${tx.fileName}`
                            : `Pause transfer ${tx.fileName}`
                        }
                        className="px-2.5 py-1 rounded-lg bg-[#1F2C32] hover:bg-[#2A3A42] text-xs font-medium text-white flex items-center gap-1 shrink-0"
                      >
                        {tx.status === 'paused' ? (
                          <>
                            <Play className="w-3 h-3" />
                            <span>Resume</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>Pause</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-[10.5px] font-mono text-[#00C48C] shrink-0">
                        SHA-256 OK
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${
                        tx.status === 'paused' ? 'bg-amber-400' : 'bg-[#00C48C]'
                      }`}
                      style={{ width: `${tx.progress}%` }}
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#6E7F85] tabular-nums">
                    <span className="truncate pr-2">SHA-256: {tx.sha256.slice(0, 22)}...</span>
                    <span className="shrink-0">{tx.speedLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Settings Screen (Matches screenshot_3_e239b91b.png) */
            <div className="p-3.5 space-y-3">
              <div className="p-3 rounded-2xl bg-[#162024] border border-white/[0.06] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#DCE4E7] text-[#28353A] font-display font-bold text-sm flex items-center justify-center shrink-0">
                  AR
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white">Alex Rivera</span>
                    <Lock className="w-3.5 h-3.5 text-[#00C48C]" aria-hidden="true" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#00C48C] font-mono truncate">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">alex.rivera@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/[0.06] rounded-2xl bg-[#162024] border border-white/[0.06] px-3">
                <div className="py-2.5">
                  <div className="text-xs font-semibold text-white">
                    Permissions &amp; Background Battery
                  </div>
                  <div className="text-[11px] text-[#94A3A8]">
                    Camera, Mic, Wi-Fi, Alerts &amp; Unrestricted Battery active
                  </div>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-semibold text-white">Privacy &amp; Block List</div>
                  <div className="text-[11px] text-[#94A3A8] font-mono tabular-nums">
                    Blocked Google IDs ({state.blockedGoogleIds.length}), request approval active
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-white">Chats, Theme &amp; Wallpaper</div>
                    <div className="text-[11px] text-[#94A3A8]">
                      Active: {currentWallpaper.label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setWallpaperIndex((prev) => (prev + 1) % WALLPAPER_THEMES.length)
                    }
                    className="px-2.5 py-1 rounded-lg bg-[#0D4A3A] text-[#6EE7B7] text-[11px] font-semibold hover:bg-[#13634E] shrink-0"
                  >
                    Cycle Theme
                  </button>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-semibold text-white">Storage &amp; Local Folder</div>
                  <div className="text-[11px] text-[#94A3A8]">
                    100% On-Device · SAF Local Meshly Folder
                  </div>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-semibold text-white">Network &amp; Direct IP</div>
                  <div className="text-[11px] font-mono text-[#94A3A8] tabular-nums">
                    IPv4 10.0.2.16 • Port 42850 • _meshly._tcp
                  </div>
                </div>

                <div className="py-2.5">
                  <div className="text-xs font-semibold text-white">About Meshly</div>
                  <div className="text-[11px] text-[#94A3A8]">
                    Version 1.2.0 • Local Wi-Fi peer-to-peer architecture
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Composer when inside an active chat */}
        {selectedChat && (
          <form
            onSubmit={handleSendMessage}
            className="p-2.5 bg-[#141C20] border-t border-white/[0.08]"
          >
            {composeError && (
              <p role="alert" className="text-[11px] text-amber-300 px-2 pb-1.5">
                {composeError}
              </p>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draftMessage}
                onChange={(e) => {
                  setDraftMessage(e.target.value);
                  if (composeError) setComposeError(null);
                }}
                aria-label="Message over local Wi-Fi"
                placeholder={`Message ${selectedChat.name} on LAN...`}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#1C262B] text-xs text-white placeholder:text-[#8A999F] border border-white/[0.06] focus:outline-none focus:border-[#00C48C]"
              />
              <button
                type="submit"
                aria-label="Send local Wi-Fi message"
                className="w-9 h-9 rounded-xl bg-[#00B37E] hover:bg-[#00C98D] text-[#042319] flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Bottom 5-Tab Navigation Bar (Matches screenshot_2 & screenshot_3) */}
        {!selectedChat && (
          <nav
            aria-label="Meshly App Tabs"
            className="grid grid-cols-5 bg-[#141C20] border-t border-white/[0.08] px-1.5 py-2"
          >
            {(
              [
                { id: 'chats', label: 'Chats', icon: MessageSquare, badge: totalUnread },
                { id: 'calls', label: 'Calls', icon: Phone, badge: 0 },
                {
                  id: 'people',
                  label: 'People',
                  icon: Users,
                  badge: state.pendingRequests.length,
                },
                { id: 'transfers', label: 'Transfers', icon: ArrowUpDown, badge: 0 },
                { id: 'settings', label: 'Settings', icon: SettingsIcon, badge: 0 },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center justify-center gap-1 py-0.5 text-[10.5px] font-medium focus-visible:outline-2 focus-visible:outline-[#00C48C] rounded-lg"
                >
                  <div
                    className={`relative px-3.5 py-1 rounded-full transition-colors ${
                      isActive ? 'bg-[#253339] text-white' : 'text-[#94A3A8] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.badge > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#00C48C] text-[#042319] font-mono text-[9px] font-bold flex items-center justify-center tabular-nums">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className={isActive ? 'text-white font-semibold' : 'text-[#94A3A8]'}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};
