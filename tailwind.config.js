/** @type {import('tailwindcss').Config} */
const defaultConfig = require('tailwindcss/defaultConfig');

// import type { Config } from 'tailwindcss'

module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		...defaultConfig.theme,
		extend: {
			fontFamily: {
				exo: 'var(--font-exo)',
				'source-code': 'var(--font-source-code)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			colors: {
				'quantum-purple': '#b24bf3',
				'quantum-magenta': '#f32b9d',
				'quantum-blue': '#4b7cf3',
			},
			animation: {
				'grid-perspective': 'gridPerspective 20s ease-in-out infinite',
				'quantum-float': 'quantumFloat 10s ease-in-out infinite',
				'shape-float': 'shapeFloat 8s ease-in-out infinite',
				'gradient-shift': 'gradientShift 3s ease infinite',
				'status-pulse': 'statusPulse 2s ease-in-out infinite',
				'header-drop': 'headerDrop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'hero-reveal': 'heroReveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards',
				'slide-up': 'slideUp 1s ease-out 2.2s backwards',
			},
			keyframes: {
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
				gradientShift: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
				statusPulse: {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.5)', opacity: '0.5' },
				},
				headerDrop: {
					'0%': {
						opacity: '0',
						transform: 'translateY(-100px) rotateX(-90deg)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) rotateX(0deg)',
					},
				},
				heroReveal: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px) rotateY(-20deg)',
						filter: 'blur(20px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) rotateY(0deg)',
						filter: 'blur(0)',
					},
				},
				slideUp: {
					from: { transform: 'translateY(100px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
