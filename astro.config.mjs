// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { remarkGithubReadme } from './src/plugins/remark-github-readme.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://sokmontrey.me',
	redirects: {
		'/writing/[slug]': '/writings/[slug]',
	},
	integrations: [
		mdx({
			remarkPlugins: [remarkGithubReadme],
		}),
		tailwind(),
	],
});
