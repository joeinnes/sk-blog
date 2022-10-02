const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Avenir Next', 'Avenir', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
