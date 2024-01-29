import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		svelte(),
		mdx()
	],
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'poimandres' },
		remarkRehype: { footnoteLabel: 'Footnotes' },
		gfm: false,
		remarkPlugins: [remarkMath],
		rehypePlugins: [
			[rehypeKatex, {
				trust: true,
			}],
		]
	},
});
