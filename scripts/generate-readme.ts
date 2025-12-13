import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'src', 'content');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// Helper to read JSON
function readJSON(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Helper to format date
function formatDate(date: Date | string) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// 1. Process Skills
console.log('Processing skills...');
const skills = readJSON(path.join(DATA_DIR, 'skills.json'));
let skillsSection = '## 🛠 Skills\n\n';

skills.forEach((category: any) => {
    skillsSection += `### ${category.category}\n`;
    // We can't easily display icons in standard markdown without images, 
    // so we'll list them as badges or just text.
    // Using shields.io badges is a common pattern for GitHub profiles.

    const badges = category.items.map((item: any) => {
        // Simple badge generation
        const color = 'black'; // default
        // We could map specific colors if we wanted, but black is sleek.
        return `![${item.name}](https://img.shields.io/badge/${encodeURIComponent(item.name)}-${color}?style=flat-square&logo=${item.name.toLowerCase()}&logoColor=white)`;
        // Note: Logo names might not match perfectly with simple-icons names used in react-icons. 
        // e.g. SiHtml5 -> html5. 
        // For now, let's try just text first to be safe, or a simple list.
    });

    // skillsSection += badges.join(' ') + '\n\n';

    // Text based fallback which is cleaner if logos fail
    skillsSection += category.items.map((i: any) => `\`${i.name}\``).join(' • ') + '\n\n';
});

// 2. Process Projects
console.log('Processing projects...');
const projectsDir = path.join(CONTENT_DIR, 'projects');
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

const projects = projectFiles.map(file => {
    const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
    const { data } = matter(content);
    return data;
}).sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending
});

let projectsSection = '## 🚀 Projects\n\n';
projectsSection += '| Project | Description | Tech | Links |\n';
projectsSection += '|---|---|---|---|\n';

projects.forEach((p: any) => {
    const title = p.title;
    const desc = p.description;
    const tags = p.tags ? p.tags.map((t: string) => `\`${t}\``).join(' ') : '';
    const links = p.links ? p.links.map((l: any) => `[${l.name}](${l.url})`).join('<br>') : '';
    projectsSection += `| **${title}** | ${desc} | ${tags} | ${links} |\n`;
});

// 3. Assemble README
const header = `# Hi there, I'm Sokmontrey Sythat 👋\n\nWeb Developer | Physics Enthusiast | Problem Solver\n\n`;
// We can add more 'intro' content if we scrape it from the site or hardcode it.

const content = `${header}\n${skillsSection}\n${projectsSection}\n\n---\n*Generated automatically from my [portfolio website](https://sokmontrey.github.io)*`;

fs.writeFileSync(README_PATH, content);
console.log(`README.md generated at ${README_PATH}`);
