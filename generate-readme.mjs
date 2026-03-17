import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'src', 'content');
const LINKS_PATH = path.join(ROOT, 'src', 'data', 'links.json');
const BIO_PATH = path.join(ROOT, 'src', 'data', 'bio.json');
const SKILLS_TS_PATH = path.join(ROOT, 'src', 'data', 'skills.ts');
const SITE_URL = 'https://sokmontrey.github.io';

function toDisplayName(value) {
  if (!value) return 'Developer';
  const parts = value.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return parts
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function inferNameFromRepo() {
  const repoName = path.basename(ROOT);
  if (repoName.endsWith('.github.io')) {
    return toDisplayName(repoName.replace('.github.io', ''));
  }
  return toDisplayName(repoName);
}

async function readCollection(collectionName) {
  const dirPath = path.join(CONTENT_ROOT, collectionName);
  let files = [];
  try {
    files = await fs.readdir(dirPath);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
  const entries = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const filePath = path.join(dirPath, fileName);
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = parseMdx(raw);
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        data: parsed.data,
        content: parsed.content.trim(),
      };
    })
  );
  return entries;
}

async function readSkillsGroups() {
  let raw = '';
  try {
    raw = await fs.readFile(SKILLS_TS_PATH, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const groups = [];
  const groupRegex = /label:\s*'([^']+)'\s*,[\s\S]*?items:\s*\[([\s\S]*?)\]/g;
  let match = groupRegex.exec(raw);

  while (match) {
    const label = match[1].trim();
    const itemsRaw = match[2];
    const items = [];
    const itemRegex = /'([^']+)'/g;
    let itemMatch = itemRegex.exec(itemsRaw);

    while (itemMatch) {
      items.push(itemMatch[1].trim());
      itemMatch = itemRegex.exec(itemsRaw);
    }

    groups.push({ label, items });
    match = groupRegex.exec(raw);
  }

  return groups;
}

function parseMdx(raw) {
  const lines = raw.split('\n');
  if (lines[0]?.trim() !== '---') {
    return { data: {}, content: raw };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const content = lines.slice(endIndex + 1).join('\n');
  const data = parseYamlSubset(frontmatterLines);
  return { data, content };
}

function parseYamlSubset(lines) {
  const result = {};
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    const keyMatch = rawLine.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      i += 1;
      continue;
    }

    const key = keyMatch[1];
    const inlineValue = keyMatch[2] ?? '';

    if (inlineValue === '|') {
      i += 1;
      const blockLines = [];
      while (i < lines.length && /^ {2}/.test(lines[i])) {
        blockLines.push(lines[i].slice(2));
        i += 1;
      }
      result[key] = blockLines.join('\n').trim();
      continue;
    }

    if (!inlineValue) {
      i += 1;
      const items = [];
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^\s*-\s+(.*)$/);
        if (!itemMatch) break;
        items.push(parseScalar(itemMatch[1]));
        i += 1;
      }
      result[key] = items;
      continue;
    }

    result[key] = parseScalar(inlineValue);
    i += 1;
  }

  return result;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed;
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
}

function formatSkills(skillGroups) {
  if (skillGroups.length === 0) return '_No skills yet._';
  return skillGroups
    .map((group) => `- **${group.label}:** ${group.items.join(', ')}`)
    .join('\n');
}

function formatProjects(projects) {
  if (projects.length === 0) return '_No projects yet._';
  const lines = projects
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
    .map((project) => {
      const year = new Date(project.data.date).getFullYear();
      const tech = (project.data.technologies ?? []).slice(0, 3).join(', ');
      return `- \`${year}\` [${project.data.title}](${SITE_URL}/projects/${project.slug}) · ${tech}`;
    });
  lines.push(`- [see all projects](${SITE_URL}/projects)`);
  return lines.join('\n');
}

function formatExperiences(experiences) {
  if (experiences.length === 0) return '_No experiences yet._';
  const lines = experiences
    .sort((a, b) => {
      const aEnd = a.data.endDate ? new Date(a.data.endDate).getTime() : Date.now();
      const bEnd = b.data.endDate ? new Date(b.data.endDate).getTime() : Date.now();
      return bEnd - aEnd;
    })
    .map((experience) => {
      const start = new Date(experience.data.startDate).getFullYear();
      const end = experience.data.endDate ? new Date(experience.data.endDate).getFullYear() : 'Present';
      const range = start === end ? `${start}` : `${start} - ${end}`;
      return `- \`${range}\` [${experience.data.title}](${SITE_URL}/experiences/${experience.slug}) at **${experience.data.company}**`;
    });
  lines.push(`- [see all experiences](${SITE_URL}/experiences)`);
  return lines.join('\n');
}

function formatWriting(writings) {
  if (writings.length === 0) return '_No writing yet._';
  const lines = writings
    .map((writing) => `- [${writing.data.title}](${SITE_URL}/writing/${writing.slug}) · ${writing.data.category}`);
  lines.push(`- [see all writing](${SITE_URL}/writings)`);
  return lines.join('\n');
}

function formatLinks(links) {
  const visibleLinks = links.filter((link) => link.isVisible && link.url);
  if (visibleLinks.length === 0) return '_No public links yet._';
  return visibleLinks.map((link) => `- [${link.name}](${link.url})`).join('\n');
}

function buildReadme({ name, bio, skills, projects, experiences, writings, links }) {
  const featuredProjects = projects.filter((project) => Boolean(project.data.featured));
  const projectsForReadme = featuredProjects.length > 0 ? featuredProjects : projects;

  return `# Hi, I'm ${name}

${bio}

## Skills

${formatSkills(skills)}

## Featured Projects

${formatProjects(projectsForReadme)}

## Experience

${formatExperiences(experiences)}

## Writing

${formatWriting(writings)}

## Connect

${formatLinks(links)}
`;
}

async function main() {
  const outputArg = process.argv[2] ?? 'README.md';
  const outputPath = path.isAbsolute(outputArg)
    ? outputArg
    : path.join(ROOT, outputArg);

  const [skillGroups, projects, experiences, writings, linksRaw, bioRaw] = await Promise.all([
    readSkillsGroups(),
    readCollection('projects'),
    readCollection('experiences'),
    readCollection('writing'),
    fs.readFile(LINKS_PATH, 'utf8'),
    fs.readFile(BIO_PATH, 'utf8'),
  ]);

  const links = JSON.parse(linksRaw);
  const { bio } = JSON.parse(bioRaw);
  const name = inferNameFromRepo();
  const readme = buildReadme({
    name,
    bio,
    skills: skillGroups,
    projects,
    experiences,
    writings,
    links,
  });

  await fs.writeFile(outputPath, readme, 'utf8');
  const relativePath = path.relative(ROOT, outputPath) || 'README.md';
  console.log(`README generated at ${relativePath}`);
}

main().catch((error) => {
  console.error('Failed to generate README:', error);
  process.exit(1);
});
