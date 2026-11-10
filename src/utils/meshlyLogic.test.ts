import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPLIANCE_DECLARATIONS,
  INITIAL_CHATS,
  INITIAL_NEARBY_PEERS,
  INITIAL_REQUESTS,
  INITIAL_TRANSFERS,
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
  unlockProFeature,
  validateStoreListingLimits,
} from './meshlyLogic';

test('both Google Play Store listing variants satisfy strict 30 / 80 / 4000 character limits', () => {
  for (const variant of STORE_LISTING_VARIANTS) {
    const res = validateStoreListingLimits(variant);
    assert.equal(res.appNameValid, true, `${variant.id} appName exceeded 30 chars (${res.appNameLength})`);
    assert.equal(res.shortDescValid, true, `${variant.id} shortDescription exceeded 80 chars (${res.shortDescLength})`);
    assert.equal(res.fullDescValid, true, `${variant.id} fullDescription exceeded 4000 chars (${res.fullDescLength})`);
    assert.equal(res.allValid, true);
  }
});

test('Play Console compliance declarations accurately reflect 1 In-App Purchase and May Contain Ads', () => {
  const pricing = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Pricing & In-App Purchases');
  const ads = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Contains Ads Declaration');
  const iarcGoods = COMPLIANCE_DECLARATIONS.find((d) => d.label === 'Digital Goods Purchases (IARC)');

  assert.ok(pricing?.value.includes('1 In-App Purchase'));
  assert.ok(ads?.value.includes('Yes, may contain ads'));
  assert.ok(iarcGoods?.value.includes('Yes'));
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

test('acceptPeerRequest and unlockProFeature update simulator state cleanly', () => {
  const initialState: SimulatorState = {
    chats: INITIAL_CHATS,
    pendingRequests: INITIAL_REQUESTS,
    nearbyPeers: INITIAL_NEARBY_PEERS,
    transfers: INITIAL_TRANSFERS,
    blockedGoogleIds: [],
    proUnlocked: false,
  };

  const next = acceptPeerRequest(initialState, 'req-noah');
  assert.equal(next.chats.length, INITIAL_CHATS.length + 1);
  assert.equal(next.chats[0].name, 'Noah Patel');
  assert.equal(next.pendingRequests.length, INITIAL_REQUESTS.length - 1);

  const unlocked = unlockProFeature(next);
  assert.equal(unlocked.proUnlocked, true);
});

test('rejectAndBlockPeerRequest removes request and records blocked Google ID without duplicates', () => {
  const initialState: SimulatorState = {
    chats: INITIAL_CHATS,
    pendingRequests: INITIAL_REQUESTS,
    nearbyPeers: INITIAL_NEARBY_PEERS,
    transfers: INITIAL_TRANSFERS,
    blockedGoogleIds: [],
  };

  const next = rejectAndBlockPeerRequest(initialState, 'req-hannah');
  assert.equal(next.pendingRequests.length, 1);
  assert.deepEqual(next.blockedGoogleIds, ['hannah.kim@gmail.com']);
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

test('buildPrivacyPolicyMarkdown discloses Google Play Billing IAP and Advertising across both templates', () => {
  assert.equal(isValidEmail('support@meshly.app'), true);
  assert.equal(isValidEmail('uzairnaeem15@gmail.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);

  const detailed = buildPrivacyPolicyMarkdown('detailed', 'uzairnaeem15@gmail.com');
  assert.ok(detailed.includes('**Effective Date:** November 6, 2026'));
  assert.ok(detailed.includes('uzairnaeem15@gmail.com'));
  assert.ok(detailed.includes('Google Play Billing'));
  assert.ok(detailed.includes('Advertising ID'));
  assert.equal(detailed.toLowerCase().includes('no advertising sdks'), false);

  const concise = buildPrivacyPolicyMarkdown('concise', 'uzairnaeem15@gmail.com');
  assert.ok(concise.includes('Google Play Billing'));
  assert.ok(concise.includes('Advertising ID'));
});

test('parseAdMobPublisherId and buildAppAdsTxt validate Publisher IDs and format IAB app-ads.txt records', async () => {
  const { parseAdMobPublisherId, buildAppAdsTxt } = await import('./meshlyLogic');
  const fs = await import('node:fs');
  const path = await import('node:path');

  assert.equal(parseAdMobPublisherId('').valid, false);
  assert.equal(parseAdMobPublisherId('pub-12345').valid, false);

  const fromRawDigits = parseAdMobPublisherId('3940256099942544');
  assert.equal(fromRawDigits.valid, true);
  assert.equal(fromRawDigits.normalizedPubId, 'pub-3940256099942544');

  const fromFullSnippet = parseAdMobPublisherId(
    'google.com, pub-3940256099942544, DIRECT, f08c47fec0942fa0'
  );
  assert.equal(fromFullSnippet.valid, true);
  assert.equal(
    buildAppAdsTxt(fromFullSnippet.normalizedPubId!),
    'google.com, pub-3940256099942544, DIRECT, f08c47fec0942fa0'
  );

  const staticAppAds = fs.readFileSync(path.resolve('public/app-ads.txt'), 'utf8');
  const recordLines = staticAppAds
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('#'));
  assert.equal(recordLines.length, 1);
  assert.match(recordLines[0], /^google\.com,\s*pub-\d{16},\s*DIRECT,\s*f08c47fec0942fa0$/);
});

test('resolveInitialView supports GitHub Pages hash and query deep-links for Google Play Console', () => {
  assert.deepEqual(resolveInitialView('#privacy', ''), { mode: 'all', scrollTargetId: 'privacy' });
  assert.deepEqual(resolveInitialView('#app-ads', ''), { mode: 'all', scrollTargetId: 'app-ads' });
  assert.deepEqual(resolveInitialView('', '?page=privacy'), {
    mode: 'privacy-focused',
    scrollTargetId: 'privacy',
  });
  assert.deepEqual(resolveInitialView('#play-console', ''), {
    mode: 'all',
    scrollTargetId: 'play-console',
  });
});

test('GitHub Pages deployment artifacts exist for Actions, /docs, and root branch modes', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const rootIndex = fs.readFileSync(path.resolve('index.html'), 'utf8');
  assert.equal(rootIndex.includes('src="/src/main.tsx"'), false, 'index.html must not use absolute /src/main.tsx');
  assert.equal(rootIndex.includes('src="./src/main.tsx"'), true, 'index.html must use relative ./src/main.tsx');
  assert.equal(rootIndex.includes('./docs/assets/meshly.js'), true, 'index.html must include precompiled branch fallback');

  assert.equal(fs.existsSync(path.resolve('.github/workflows/deploy.yml')), true);
  assert.equal(fs.existsSync(path.resolve('.nojekyll')), true);
  assert.equal(fs.existsSync(path.resolve('app-ads.txt')), true);
  assert.equal(fs.existsSync(path.resolve('docs/index.html')), true);
  assert.equal(fs.existsSync(path.resolve('docs/assets/meshly.js')), true);
  assert.equal(fs.existsSync(path.resolve('docs/assets/meshly.css')), true);
});
