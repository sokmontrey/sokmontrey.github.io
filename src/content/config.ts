import { defineCollection, z } from 'astro:content';

const common_schema =
	z.object({
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
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		description: z.string(),
		url: z.string().optional(),
		thumbnail: z.string().optional(),
	})
});

const experiences = defineCollection({ 
	type: 'content',
	schema: common_schema,
});

const extra_curriculars = defineCollection({ 
	type: 'content',
	schema: common_schema,
});

export const collections = {
	projects, experiences, extra_curriculars
};
