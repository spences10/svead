const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	plugins: [typography, daisyui],

	daisyui: {
		themes: ['night', 'winter'],
	},
}

module.exports = config
