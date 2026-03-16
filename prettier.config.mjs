/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
	printWidth: 140,
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	jsxSingleQuote: true,
	endOfLine: 'auto',

	plugins: ['prettier-plugin-tailwindcss'],
	tailwindStylesheet: './src/styles/globals.css',
	tailwindFunctions: ['clsx', 'twMerge', 'cn'],

	overrides: [
		{
			files: ['*.json', '*.jsonc'],
			options: {
				printWidth: 120,
				useTabs: false,
			},
		},
	],
};

export default prettierConfig;
