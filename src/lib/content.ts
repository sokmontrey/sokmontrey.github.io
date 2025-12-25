import { getCollection } from 'astro:content';

export async function getAllSkills(category?: string) {
	const skills = await getCollection('skills');
	
	if (category) {
		return skills.filter((skill) => skill.data.category === category);
	}
	
	return skills;
}

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
	return experiences.sort((a, b) => {
		const aEnd = a.data.endDate?.getTime() ?? Date.now();
		const bEnd = b.data.endDate?.getTime() ?? Date.now();
		return bEnd - aEnd;
	});
}

export async function getAllThingsIDo(category?: string) {
	const things = await getCollection('things-i-do');
	
	if (category) {
		return things.filter((thing) => thing.data.category === category);
	}
	
	return things;
}

