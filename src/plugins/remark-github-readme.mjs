import { fromMarkdown } from 'mdast-util-from-markdown';
import { fetchGithubReadme } from '../lib/github-readme.mjs';

export function remarkGithubReadme() {
  return async (tree, file) => {
    const githubUrl = file.data?.astro?.frontmatter?.githubUrl;
    if (!githubUrl) return;

    const readme = await fetchGithubReadme(githubUrl);
    if (!readme) return;

    tree.children.push({ type: 'thematicBreak' });
    tree.children.push({
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: 'README' }],
    });

    const readmeTree = fromMarkdown(readme);
    tree.children.push(...readmeTree.children);
  };
}
