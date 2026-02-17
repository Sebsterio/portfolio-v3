// /** @type {import('tailwindcss').Config} */
// const defaultConfig = require('tailwindcss/defaultConfig');

import type { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultConfig';
import tailwindAnimatePlugin from 'tailwindcss-animate';
import { viewTransitionPlugin } from './src/lib/transitions/tailwind';

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	darkMode: ['class'],
	plugins: [
		tailwindAnimatePlugin,
		viewTransitionPlugin, //
	],
	theme: {
		...defaultConfig.theme,
		extend: {
			fontFamily: {
				// Liquid Chrome
				urbanist: 'var(--font-urbanist)',
				'dm-sans': 'var(--font-dm-sans)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',

				// Liquid Chrome
				// TODO: repetition
				'metallic-text': 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 20%, #b8b8b8 50%, #888888 51%, #b8b8b8 80%, #ffffff 100%)',
				'chrome-metallic': 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 20%, #b8b8b8 50%, #888888 51%, #b8b8b8 80%, #ffffff 100%)',
			},
			colors: {
				// Quantum
				'quantum-purple': '#b24bf3',
				'quantum-magenta': '#f32b9d',
				'quantum-blue': '#4b7cf3',

				// Liquid Chrome
				'chrome-silver': '#f0f0f0',
				'chrome-light': '#d4d4d4',
				'chrome-mid': '#a0a0a0',
				'chrome-dark': '#888888',
				'accent-blue': '#3b82f6',
				'accent-cyan': '#06b6d4',
			},
			animation: {
				'gradient-shift': 'gradientShift 3s ease infinite', // NOTE: requires `backgroundSize: '200% 200%'`

				// Quantum
				'grid-perspective': 'gridPerspective 20s ease-in-out infinite',
				'quantum-float': 'quantumFloat 10s ease-in-out infinite',
				'shape-float': 'shapeFloat 8s ease-in-out infinite',

				// Liquid Chrome
				'liquid-move': 'liquidMove 20s ease-in-out infinite',
				'orb-float': 'orbFloat 25s ease-in-out infinite',
				'status-pulse': 'statusPulse 2s ease-in-out infinite',
			},
			keyframes: {
				gradientShift: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},

				// Quantum
				gridPerspective: {
					'0%, 100%': {
						transform: 'rotateX(60deg) scale(2) translateZ(0)',
						opacity: '0.3',
					},
					'50%': {
						transform: 'rotateX(60deg) scale(2) translateZ(100px)',
						opacity: '0.5',
					},
				},
				quantumFloat: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)',
						opacity: '0.3',
					},
					'25%': {
						transform: 'translate(100px, -100px) scale(1.5)',
						opacity: '0.8',
					},
					'50%': {
						transform: 'translate(-50px, -200px) scale(0.8)',
						opacity: '0.5',
					},
					'75%': {
						transform: 'translate(-100px, -100px) scale(1.2)',
						opacity: '0.6',
					},
				},
				shapeFloat: {
					'0%, 100%': {
						transform: 'translateY(0) rotate(0deg)',
						opacity: '0.3',
					},
					'50%': {
						transform: 'translateY(-30px) rotate(180deg)',
						opacity: '0.6',
					},
				},

				// Liquid Chrome
				liquidMove: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)',
						opacity: '0.8',
					},
					'50%': {
						transform: 'translate(20px, -20px) scale(1.05)',
						opacity: '1',
					},
				},
				orbFloat: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)',
					},
					'33%': {
						transform: 'translate(40px, -40px) scale(1.1)',
					},
					'66%': {
						transform: 'translate(-30px, 30px) scale(0.9)',
					},
				},
				statusPulse: {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '1',
					},
					'50%': {
						transform: 'scale(1.5)',
						opacity: '0.5',
					},
				},
			},
		},
	},
};
