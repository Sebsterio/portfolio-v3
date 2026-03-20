#!/usr/bin/env node

/**
 * CLI wrapper around `playwright test`.
 *
 * It translates higher-level shortcut flags like `-Q`, `--dev`, or `-U`
 * into the env vars and Playwright args expected by the project.
 */

import { spawnSync } from 'node:child_process';
import { parseE2EArgs } from './e2e-lib.mjs';

const EXECUTED_ENV_KEYS = ['MODE', 'QUICK', 'DEV', 'CI', 'AI'];

const quoteArg = (value) => {
	if (!value) return '""';
	return /\s|"/.test(value) ? `"${value.replaceAll('"', '\\"')}"` : value;
};

const formatExecutedCommand = (env, pwArgs) => {
	const envPrefix = EXECUTED_ENV_KEYS.filter((key) => env[key] === '1' || (key === 'MODE' && env[key]))
		.map((key) => `${key}=${quoteArg(env[key])}`)
		.join(' ');
	const command = ['pnpm', 'exec', 'playwright', 'test', ...pwArgs].map(quoteArg).join(' ');

	return envPrefix ? `${envPrefix} ${command}` : command;
};

const runPlaywright = (pwArgs, env, log) => {
	if (!env.npm_execpath) throw new Error('npm_execpath is not set. Run this script via pnpm.');
	if (log) console.log(`> ${log}\n`);

	return spawnSync(process.execPath, [env.npm_execpath, 'exec', 'playwright', 'test', ...pwArgs], { stdio: 'inherit', env });
};

const main = () => {
	try {
		const { env, pwArgs } = parseE2EArgs(process.argv.slice(2));
		const commandLog = formatExecutedCommand(env, pwArgs);
		const result = runPlaywright(pwArgs, env, commandLog);

		if (result.error) throw result.error;
		if (result.status) process.exit(result.status);
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
	}
	process.exit(1);
};

main();
