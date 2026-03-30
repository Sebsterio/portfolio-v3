import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettier,
	globalIgnores([
		'node_modules/**',
		'.next/**',
		'out/**',
		'build/**',
		'coverage/**',
		'next-env.d.ts', //
	]),
	{
		settings: {
			// Fix for ESLint 10+: eslint-plugin-react uses context.getFilename() (legacy API)
			// which was removed in ESLint 10 flat config. Declaring the version explicitly
			// prevents the plugin from trying to auto-detect it and failing.
			react: { version: '19' },
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
]);

export default eslintConfig;
