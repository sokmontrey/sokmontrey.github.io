export interface SkillsGroup {
	label: string;
	items: string[];
}

export const skills: SkillsGroup[] = [
	{
		label: 'Core Web',
		items: ['JS/TS', 'React', 'Tailwind'],
	},
	{
		label: 'Backend/Data',
		items: ['ASP.NET', 'Spring Boot', 'Express', 'PostgreSQL', 'Supabase'],
	},
	{
		label: 'Languages/Tools',
		items: ['Python', 'C#', 'Go', 'Java', 'Kotlin', 'PHP', 'Git', 'Docker', 'PyTorch'],
	},
];
