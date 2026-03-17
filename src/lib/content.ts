import { getCollection } from 'astro:content';

export async function getAllProjects(options?: {
	featured?: boolean;
	tags?: string[];
}) {
	let projects = await getCollection('projects');
	
	if (options?.featured !== undefined) {
		projects = projects.filter((project) => project.data.featured === options.featured);
	}
	
	if (options?.tags && options.tags.length > 0) {
		projects = projects.filter((project) =>
			options.tags!.some((tag) => project.data.tags.includes(tag))
		);
	}
	
	// Sort by date, most recent first
	return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAllExperiences() {
	const experiences = await getCollection('experiences');

	// Sort by start date, most recent first
	return experiences.filter((e) => !e.data.hidden).sort((a, b) => {
		const aEnd = a.data.endDate?.getTime() ?? Date.now();
		const bEnd = b.data.endDate?.getTime() ?? Date.now();
		return bEnd - aEnd;
	});
}

export async function getAllWriting(category?: string) {
	const writings = await getCollection('writing');
	
	if (category) {
		return writings.filter((writing) => writing.data.category === category);
	}
	
	return writings;
}

