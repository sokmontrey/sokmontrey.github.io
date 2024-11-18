import { defineCollection, z } from 'astro:content';

const common_schema = z.object({
	title: z.string(),
	type: z.array(z.string()),
	tags: z.array(z.string()),
	description: z.string(),
	url: z.string().optional(),
	image: z.array(z.string()).optional(),
	date: z.date(),
})

const projects = defineCollection({ 
	type: 'content',
	schema: common_schema,
});

const experiences = defineCollection({ 
	type: 'content',
	schema: common_schema,
});

const extra_curriculars = defineCollection({ 
	type: 'content',
	schema: common_schema,
});

const links = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		url: z.string(),
		icon: z.string(),
	})
})

export const collections = {
	projects, experiences, extra_curriculars, links
};
