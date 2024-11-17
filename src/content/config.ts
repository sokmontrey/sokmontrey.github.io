import { defineCollection, z } from 'astro:content';

const projects = defineCollection({ 
	type: 'content',
	schema: z.object({
		title: z.string(),
		type: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string(),
		url: z.string().optional(),
	}),
});

const experiences = defineCollection({ 
	type: 'data',
	schema: z.object({
		title: z.string(),
		type: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string(),
		url: z.string().optional(),
	}),
});

const extra_curriculars = defineCollection({ 
	type: 'content',
	schema: z.object({
		title: z.string(),
		type: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string(),
		url: z.string().optional(),
	}),
});

export const collections = {
	projects, experiences, extra_curriculars
};
