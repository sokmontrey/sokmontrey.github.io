/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "#09090b", // Deep dark styling (charcoal/soft black)
				surface: "#121212",
				accent: "#e0c090", // The gold/beige text color
				muted: "#525252", // Grey text
			},
			fontFamily: {
				serif: ['"DM Serif Text"', "serif"],
				sans: ['"Inter"', "sans-serif"],
				mono: ['"JetBrains Mono"', "monospace"],
			},
		},
	},
	plugins: [],
};
