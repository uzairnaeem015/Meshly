import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPLIANCE_DECLARATIONS,
  INITIAL_CHATS,
  INITIAL_NEARBY_PEERS,
  INITIAL_REQUESTS,
  INITIAL_TRANSFERS,
  MESSENGER_STORE_LISTING,
  PERMISSIONS_TABLE,
  STORE_LISTING_VARIANTS,
} from '../data/storeContent';
import {
  acceptPeerRequest,
  buildPrivacyPolicyMarkdown,
  filterChats,
  isValidEmail,
  rejectAndBlockPeerRequest,
  resolveInitialView,
  sendChatMessage,
  SimulatorState,
  toggleTransferPause,
  validateStoreListingLimits,
} from './meshlyLogic';

test('Messenger Edition is the sole store listing and satisfies strict 30 / 80 / 4000 character limits', () => {
  assert.equal(STORE_LISTING_VARIANTS.length, 1);
  assert.equal(STORE_LISTING_VARIANTS[0].appName, 'Meshly: Local Wi-Fi Messenger');

  const res = validateStoreListingLimits(MESSENGER_STORE_LISTING);
  assert.equal(res.appNameValid, true);
  assert.equal(res.shortDescValid, true);
  assert.equal(res.fullDescValid, true);
  assert.equal(res.allValid, true);
});

test('Play Console declarations reflect Free with No In-App Purchases, May Contain Ads, and Background Battery permission', () => {
  const pricing = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Pricing & Monetization');
  const ads = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Contains Ads Declaration');
  const iarcGoods = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Digital Goods Purchases (IARC)');

  assert.ok(pricing?.value.includes('No In-App Purchases'));
  assert.ok(ads?.value.includes('Yes, may contain ads'));
  assert.ok(iarcGoods?.value.startsWith('No'));

  const batteryPerm = PERMISSIONS_TABLE.find((p) => p.permission === 'BACKGROUND BATTERY');
  assert.ok(batteryPerm);
  assert.equal(batteryPerm.manifestId, 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS');

  const hasBilling = PERMISSIONS_TABLE.some((p) => p.manifestId.includes('BILLING'));
  assert.equal(hasBilling, false);
});

test('filterChats filters by name, email, local IP, or message content', () => {
  assert.equal(filterChats(INITIAL_CHATS, '').length, 5);
  assert.equal(filterChats(INITIAL_CHATS, 'Maya').length, 1);
  assert.equal(filterChats(INITIAL_CHATS, '10.0.2.24')[0].name, "Liam O'Connor");
  assert.equal(filterChats(INITIAL_CHATS, 'hotspot')[0].name, 'Priya Nair');
  assert.equal(filterChats(INITIAL_CHATS, 'nonexistent-peer-xyz').length, 0);
});

test('sendChatMessage rejects empty input and appends trimmed valid messages', () => {
  const emptyAttempt = sendChatMessage(INITIAL_CHATS, 'chat-maya', '   ', '12:55 PM');
  assert.equal(emptyAttempt.sent, false);
  assert.ok(emptyAttempt.error);
  assert.equal(emptyAttempt.chats[0].messages.length, INITIAL_CHATS[0].messages.length);

  const validAttempt = sendChatMessage(INITIAL_CHATS, 'chat-maya', '  Meet on Deck 9 Wi-Fi  ', '12:56 PM');
  assert.equal(validAttempt.sent, true);
  const maya = validAttempt.chats.find((c) => c.id === 'chat-maya')!;
  assert.equal(maya.lastMessage, 'Meet on Deck 9 Wi-Fi');
  assert.equal(maya.lastTimestamp, '12:56 PM');
  assert.equal(maya.messages.at(-1)?.text, 'Meet on Deck 9 Wi-Fi');
});

test('acceptPeerRequest and rejectAndBlockPeerRequest update simulator state cleanly', () => {
  const initialState: SimulatorState = {
    chats: INITIAL_CHATS,
    pendingRequests: INITIAL_REQUESTS,
    nearbyPeers: INITIAL_NEARBY_PEERS,
    transfers: INITIAL_TRANSFERS,
    blockedGoogleIds: [],
  };

  const accepted = acceptPeerRequest(initialState, 'req-noah');
  assert.equal(accepted.chats.length, INITIAL_CHATS.length + 1);
  assert.equal(accepted.chats[0].name, 'Noah Patel');
  assert.equal(accepted.pendingRequests.length, INITIAL_REQUESTS.length - 1);

  const rejected = rejectAndBlockPeerRequest(accepted, 'req-hannah');
  assert.equal(rejected.pendingRequests.length, 0);
  assert.deepEqual(rejected.blockedGoogleIds, ['hannah.kim@gmail.com']);
});

test('toggleTransferPause pauses and resumes active transfers while preserving SHA-256 verified files', () => {
  const paused = toggleTransferPause(INITIAL_TRANSFERS, 'tx-1');
  assert.equal(paused[0].status, 'paused');
  assert.equal(paused[0].speedLabel, 'Paused');

  const resumed = toggleTransferPause(paused, 'tx-1');
  assert.equal(resumed[0].status, 'transferring');

  const verifiedUnchanged = toggleTransferPause(INITIAL_TRANSFERS, 'tx-2');
  assert.equal(verifiedUnchanged[1].status, 'verified');
});

test('buildPrivacyPolicyMarkdown includes Background Battery permission, Advertising, and zero IAP/Billing references', () => {
  assert.equal(isValidEmail('uzairnaeem15@gmail.com'), true);

  const detailed = buildPrivacyPolicyMarkdown('detailed', 'uzairnaeem15@gmail.com');
  assert.ok(detailed.includes('**Effective Date:** November 6, 2026'));
  assert.ok(detailed.includes('REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'));
  assert.ok(detailed.includes('Advertising ID'));
  assert.equal(detailed.includes('com.android.vending.BILLING'), false);
  assert.equal(detailed.includes('Google Play Billing'), false);

  const concise = buildPrivacyPolicyMarkdown('concise', 'uzairnaeem15@gmail.com');
  assert.ok(concise.includes('REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'));
  assert.ok(concise.includes('Advertising ID'));
  assert.equal(concise.includes('com.android.vending.BILLING'), false);
});

test('resolveInitialView supports #changelog, #permissions, #privacy, and ?page=privacy deep-links', () => {
  assert.deepEqual(resolveInitialView('#changelog', ''), { mode: 'all', scrollTargetId: 'changelog' });
  assert.deepEqual(resolveInitialView('#permissions', ''), { mode: 'all', scrollTargetId: 'permissions' });
  assert.deepEqual(resolveInitialView('#privacy', ''), { mode: 'all', scrollTargetId: 'privacy' });
  assert.deepEqual(resolveInitialView('', '?page=privacy'), {
    mode: 'privacy-focused',
    scrollTargetId: 'privacy',
  });
});

test('UI components hide app-ads.txt setup and exclude Copy/Update buttons while static files remain for crawlers', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const playConsoleSrc = fs.readFileSync(path.resolve('src/components/PlayConsoleHub.tsx'), 'utf8');
  const privacySrc = fs.readFileSync(path.resolve('src/components/PrivacyPolicySection.tsx'), 'utf8');

  assert.equal(playConsoleSrc.includes('AdMob app-ads.txt Setup'), false);
  assert.equal(playConsoleSrc.includes('Local Chat Edition'), false);
  assert.equal(playConsoleSrc.includes('>Copy<'), false);
  assert.equal(privacySrc.includes('Copy Raw Markdown'), false);
  assert.equal(privacySrc.includes('>Update<'), false);

  assert.equal(fs.existsSync(path.resolve('public/app-ads.txt')), true);
  assert.equal(
    fs.readFileSync(path.resolve('public/app-ads.txt'), 'utf8').trim(),
    fs.readFileSync(path.resolve('app-ads.txt'), 'utf8').trim()
  );
  assert.equal(fs.existsSync(path.resolve('docs/index.html')), true);
  assert.equal(fs.existsSync(path.resolve('docs/assets/meshly.js')), true);

  const { CHANGELOG_HIGHLIGHTS } = await import('../data/storeContent');
  const combinedChangelog = CHANGELOG_HIGHLIGHTS.map((c) => `${c.title} ${c.description}`).join(' ');
  assert.match(combinedChangelog, /Bluetooth/i);
  assert.match(combinedChangelog, /Wi-Fi Direct/i);
  assert.match(combinedChangelog, /Background Battery/i);
  assert.match(combinedChangelog, /General/i);
});
