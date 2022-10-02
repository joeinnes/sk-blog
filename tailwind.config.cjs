const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Avenir Next',
					'Avenir',
					'Century Gothic',
					'Gill Sans',
					...defaultTheme.fontFamily.sans
				]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
