import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHANGELOG_HIGHLIGHTS,
  HERO_CONTENT,
  IDEAL_FOR_PROFILES,
  KEY_FEATURES,
  OPTIONAL_ADS_DISCLOSURE,
  PERMISSIONS_TABLE,
  SECURITY_PROTECTIONS,
} from '../data/storeContent';
import { buildPrivacyPolicyMarkdown, isValidEmail, resolveInitialView } from './meshlyLogic';

test('Hero, Key Features, and Ideal For match the updated Meshly public website overview', () => {
  assert.equal(HERO_CONTENT.headline, 'Meshly — Your People. Your Network. No Internet Required.');
  assert.equal(KEY_FEATURES.length, 4);
  assert.equal(IDEAL_FOR_PROFILES.length, 3);

  const featureText = KEY_FEATURES.map(
    (f) => `${f.title} ${f.bullets.map((b) => `${b.label || ''} ${b.text}`).join(' ')}`
  ).join(' ');

  assert.match(featureText, /Wi-Fi Direct/i);
  assert.match(featureText, /48 kHz HD voice/i);
  assert.match(featureText, /Picture-in-Picture/i);
  assert.match(featureText, /Silent Call Waiting/i);
  assert.match(featureText, /Storage Access Framework/i);
  assert.match(featureText, /Encrypted Local Backups/i);
  assert.match(featureText, /deduplication/i);
});

test('Security overview and permissions include E2EE, Hidden Google ID, Zero Broad Storage, Background Battery, and Rewarded Ads', () => {
  const securityText = SECURITY_PROTECTIONS.map(
    (s) => `${s.title} ${s.meta} ${s.points.map((p) => p.text).join(' ')}`
  ).join(' ');

  assert.match(securityText, /secp256r1/);
  assert.match(securityText, /AES-256-GCM/);
  assert.match(securityText, /HKDF-SHA256/);
  assert.match(securityText, /Safety Numbers/);
  assert.match(securityText, /Verified Private ID/);

  const permText = PERMISSIONS_TABLE.map((p) => `${p.permission} ${p.manifestId} ${p.purpose}`).join(' ');
  assert.match(permText, /neverForLocation/);
  assert.match(permText, /Android 10–12/);
  assert.match(permText, /Photo Picker/);
  assert.match(permText, /REQUEST_IGNORE_BATTERY_OPTIMIZATIONS/);

  const adsText = OPTIONAL_ADS_DISCLOSURE.points.join(' ');
  assert.match(adsText, /rewarded ads/i);
  assert.match(adsText, /AdMob never has access/i);
});

test('buildPrivacyPolicyMarkdown merges all new privacy disclosures and retains Background Battery across both templates', () => {
  assert.equal(isValidEmail('uzairnaeem15@gmail.com'), true);
  assert.equal(isValidEmail('not-an-email'), false);

  for (const mode of ['detailed', 'concise'] as const) {
    const md = buildPrivacyPolicyMarkdown(mode, 'uzairnaeem15@gmail.com');
    assert.ok(md.includes('**Effective Date:** November 6, 2026'));
    assert.ok(md.includes('secp256r1'));
    assert.ok(md.includes('AES-256-GCM'));
    assert.ok(md.includes('Verified Private ID'));
    assert.ok(md.includes('REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'));
    assert.ok(md.includes('Photo Picker'));
    assert.ok(md.includes('rewarded ads'));
    assert.equal(md.includes('com.android.vending.BILLING'), false);
    assert.equal(md.includes('Google Play Billing'), false);
  }
});

test('resolveInitialView supports all public sections and standalone ?page=privacy mode', () => {
  assert.deepEqual(resolveInitialView('#features', ''), { mode: 'all', scrollTargetId: 'features' });
  assert.deepEqual(resolveInitialView('#ideal-for', ''), { mode: 'all', scrollTargetId: 'ideal-for' });
  assert.deepEqual(resolveInitialView('#security', ''), { mode: 'all', scrollTargetId: 'security' });
  assert.deepEqual(resolveInitialView('#changelog', ''), { mode: 'all', scrollTargetId: 'changelog' });
  assert.deepEqual(resolveInitialView('#privacy', ''), { mode: 'all', scrollTargetId: 'privacy' });
  assert.deepEqual(resolveInitialView('', '?page=privacy'), {
    mode: 'privacy-focused',
    scrollTargetId: 'privacy',
  });
});

test('Play Console kit and Phone Simulator are retired while Changelog, GitHub Pages bundle, and app-ads.txt stay intact', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  assert.equal(fs.existsSync(path.resolve('src/components/PhoneSimulator.tsx')), false);
  assert.equal(fs.existsSync(path.resolve('src/components/PlayConsoleHub.tsx')), false);
  assert.equal(fs.existsSync(path.resolve('src/components/SecurityOverviewSection.tsx')), true);
  assert.equal(fs.existsSync(path.resolve('src/components/ChangelogSection.tsx')), true);

  const combinedChangelog = CHANGELOG_HIGHLIGHTS.map((c) => `${c.title} ${c.description}`).join(' ');
  assert.match(combinedChangelog, /Bluetooth/i);
  assert.match(combinedChangelog, /Wi-Fi Direct/i);
  assert.match(combinedChangelog, /Background Battery/i);

  assert.equal(fs.existsSync(path.resolve('public/app-ads.txt')), true);
  assert.equal(
    fs.readFileSync(path.resolve('public/app-ads.txt'), 'utf8').trim(),
    fs.readFileSync(path.resolve('app-ads.txt'), 'utf8').trim()
  );
  assert.equal(fs.existsSync(path.resolve('docs/index.html')), true);
  assert.equal(fs.existsSync(path.resolve('docs/assets/meshly.js')), true);
});
