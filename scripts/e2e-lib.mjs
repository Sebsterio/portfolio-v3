/**
 * Parses the custom `pnpm e2e ...` flags and converts them into:
 * - environment variables consumed by playwright.config
 * - Playwright CLI arguments forwarded to `playwright test`
 */

const createFlagMap = (entries) => new Map(entries.flatMap(({ flags, value }) => flags.map((flag) => [flag, value])));

const modeFlags = createFlagMap([
	{ flags: ['--quick', '-Q'], value: 'quick' },
	{ flags: ['--full', '-F'], value: 'full' },
	{ flags: ['--responsive', '-R'], value: 'responsive' },
	{ flags: ['--mobile', '-M'], value: 'mobile' },
	{ flags: ['--vendors', '-V'], value: 'vendors' },
]);

const envFlags = createFlagMap([
	{ flags: ['--dev', '-D'], value: ['DEV', '1'] },
	{ flags: ['--ci'], value: ['CI', '1'] },
	{ flags: ['--ai'], value: ['AI', '1'] },
]);

const argFlags = createFlagMap([
	{ flags: ['--update', '-U'], value: '--update-snapshots' },
	{ flags: ['--ui'], value: '--ui' },
]);

const readProjectArg = (args, index) => {
	const arg = args[index];
	return (
		(arg.startsWith('--project=') && { kind: 'inline', value: arg.slice('--project='.length) }) ||
		(arg === '--project' && { kind: 'separate', value: args[index + 1] ?? '' }) ||
		null
	);
};

export const parseE2EArgs = (rawArgs, baseEnv = process.env) => {
	const env = { ...baseEnv };
	const pwArgs = [];

	let selectedMode = null;
	let selectedProject = null;

	for (let index = 0; index < rawArgs.length; index += 1) {
		const arg = rawArgs[index];

		if (modeFlags.has(arg)) {
			const nextMode = modeFlags.get(arg);

			if (selectedMode && selectedMode !== nextMode) throw new Error(`Conflicting mode flags: "${selectedMode}" and "${nextMode}"`);
			if (selectedProject) throw new Error(`Cannot combine mode flag "${arg}" with --project (${selectedProject})`);

			selectedMode = nextMode;
			env.MODE = nextMode;
			continue;
		}

		const projectArg = readProjectArg(rawArgs, index);

		if (projectArg) {
			if (!projectArg.value) throw new Error('Missing value for --project');
			if (selectedMode) throw new Error(`Cannot combine --project (${projectArg.value}) with mode "${selectedMode}"`);

			selectedProject = projectArg.value;
			pwArgs.push(arg);

			if (projectArg.kind === 'inline') continue;

			index += 1;
			pwArgs.push(rawArgs[index]);
			continue;
		}

		if (envFlags.has(arg)) {
			const [key, value] = envFlags.get(arg);
			env[key] = value;
			continue;
		}

		if (argFlags.has(arg)) {
			pwArgs.push(argFlags.get(arg));
			continue;
		}

		pwArgs.push(arg);
	}

	return { env, pwArgs };
};
