/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			spacing: {
				'bottom-bar-height': '30px',
				'side-menu-width': '30px',
				'open-side-menu-width': '300px',
				'side-menu-content-width': '260px'
			},
			animation: {},
			keyframes: {}
		}
	},
	plugins: []
}
