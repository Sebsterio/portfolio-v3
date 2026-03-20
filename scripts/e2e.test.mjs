import test from 'node:test';
import assert from 'node:assert/strict';
import { parseE2EArgs } from './e2e-lib.mjs';

test('returns unchanged env and no playwright args for empty input', () => {
	const baseEnv = { PATH: '/usr/bin' };
	const result = parseE2EArgs([], baseEnv);

	assert.deepEqual(result, { env: { PATH: '/usr/bin' }, pwArgs: [] });
});

test('sets MODE from long mode flag', () => {
	const result = parseE2EArgs(['--basic'], {});

	assert.equal(result.env.MODE, 'basic');
	assert.deepEqual(result.pwArgs, []);
});

test('sets MODE from short mode alias', () => {
	const result = parseE2EArgs(['-V'], {});

	assert.equal(result.env.MODE, 'vendors');
	assert.deepEqual(result.pwArgs, []);
});

test('allows repeating the same mode flag', () => {
	const result = parseE2EArgs(['--basic', '-B'], {});

	assert.equal(result.env.MODE, 'basic');
	assert.deepEqual(result.pwArgs, []);
});

test('throws on conflicting mode flags', () => {
	assert.throws(() => parseE2EArgs(['--basic', '--full'], {}), /Conflicting mode flags: "basic" and "full"/);
});

test('sets QUICK env flag', () => {
	const result = parseE2EArgs(['--quick'], {});

	assert.equal(result.env.QUICK, '1');
});

test('sets DEV env flag', () => {
	const result = parseE2EArgs(['--dev'], {});

	assert.equal(result.env.DEV, '1');
});

test('sets DEV env flag from alias', () => {
	const result = parseE2EArgs(['-D'], {});

	assert.equal(result.env.DEV, '1');
});

test('sets CI env flag', () => {
	const result = parseE2EArgs(['--ci'], {});

	assert.equal(result.env.CI, '1');
});

test('sets AI env flag', () => {
	const result = parseE2EArgs(['--ai'], {});

	assert.equal(result.env.AI, '1');
});

test('maps --update to --update-snapshots', () => {
	const result = parseE2EArgs(['--update'], {});

	assert.deepEqual(result.pwArgs, ['--update-snapshots']);
});

test('maps -U to --update-snapshots', () => {
	const result = parseE2EArgs(['-U'], {});

	assert.deepEqual(result.pwArgs, ['--update-snapshots']);
});

test('passes through --ui to playwright args', () => {
	const result = parseE2EArgs(['--ui'], {});

	assert.deepEqual(result.pwArgs, ['--ui']);
});

test('passes through unknown args unchanged', () => {
	const result = parseE2EArgs(['--grep', '@smoke', '--reporter=line'], {});

	assert.deepEqual(result.pwArgs, ['--grep', '@smoke', '--reporter=line']);
});

test('supports combining env flags, mode flag, and playwright args', () => {
	const result = parseE2EArgs(['--dev', '--ci', '--basic', '--ui', '--grep', '@smoke'], {});

	assert.deepEqual(result, { env: { DEV: '1', CI: '1', MODE: 'basic' }, pwArgs: ['--ui', '--grep', '@smoke'] });
});

test('allows --project=value when no mode is selected', () => {
	const result = parseE2EArgs(['--project=chromium'], {});

	assert.deepEqual(result.pwArgs, ['--project=chromium']);
});

test('allows --project value when no mode is selected', () => {
	const result = parseE2EArgs(['--project', 'firefox'], {});

	assert.deepEqual(result.pwArgs, ['--project', 'firefox']);
});

test('throws when --project is missing its value', () => {
	assert.throws(() => parseE2EArgs(['--project'], {}), /Missing value for --project/);
});

test('throws when mode flag is combined with --project=value', () => {
	assert.throws(() => parseE2EArgs(['--basic', '--project=chromium'], {}), /Cannot combine --project \(chromium\) with mode "basic"/);
});

test('throws when mode flag is combined with --project value form', () => {
	assert.throws(() => parseE2EArgs(['--mobile', '--project', 'webkit'], {}), /Cannot combine --project \(webkit\) with mode "mobile"/);
});

test('throws when --project comes first and mode comes later', () => {
	assert.throws(
		() => parseE2EArgs(['--project=chromium', '--responsive'], {}),
		/Cannot combine mode flag "--responsive" with --project \(chromium\)/,
	);
});

test('preserves existing env vars', () => {
	const result = parseE2EArgs(['--ai'], { PATH: '/usr/bin', HOME: '/tmp/me' });

	assert.deepEqual(result.env, { PATH: '/usr/bin', HOME: '/tmp/me', AI: '1' });
});
