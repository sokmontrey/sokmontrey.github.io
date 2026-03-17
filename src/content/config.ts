import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		longDescription: z.string().optional(),
		technologies: z.array(z.string()),
		image: z.string().optional(),
		githubUrl: z.string().url().optional().or(z.literal('')),
		liveUrl: z.string().url().optional().or(z.literal('')),
		date: z.date(),
		featured: z.boolean(),
		tags: z.array(z.string()),
	}),
});

const experiencesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		company: z.string(),
		startDate: z.date(),
		endDate: z.date().optional().nullable(),
		type: z.enum(['work', 'education', 'volunteer', 'internship']),
		description: z.string(),
		technologies: z.array(z.string()).optional(),
		achievements: z.array(z.string()).optional(),
		hidden: z.boolean().optional(),
	}),
});

const writingCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		category: z.string(),
		description: z.string(),
		image: z.string().optional(),
		link: z.string().url().optional().or(z.literal('')),
		tags: z.array(z.string()).optional(),
		hidden: z.boolean().optional(),
	}),
});

export const collections = {
	projects: projectsCollection,
	experiences: experiencesCollection,
	writing: writingCollection,
};

