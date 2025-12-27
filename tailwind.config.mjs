/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['EB Garamond', 'serif'],
				sans: ['Poppins', 'sans-serif'],
				mono: ['DM Mono', 'monospace'],
			},
		},
	},
	plugins: [],
};

