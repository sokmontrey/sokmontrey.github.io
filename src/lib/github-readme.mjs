const BRANCH_CANDIDATES = ['main', 'master'];
const readmeCache = new Map();

export function parseGithubUrl(url) {
  if (!url) return null;

  try {
    const { pathname } = new URL(url);
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length < 2 || parts[0] === 'orgs' || parts[0] === 'users') return null;

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, '');
    const branch = parts[2] === 'tree' && parts[3] ? parts[3] : undefined;

    return { owner, repo, branch };
  } catch {
    return null;
  }
}

function rawReadmeUrl(owner, repo, branch) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}/README.md`;
}

function rewriteRelativeAssets(markdown, owner, repo, branch) {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}`;

  return markdown.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (full, pre, assetUrl, post) => {
    if (/^(?:https?:)?\/\//i.test(assetUrl) || assetUrl.startsWith('data:')) return full;
    const path = assetUrl.replace(/^\.\//, '').replace(/^\//, '');
    return `${pre}${base}/${path}${post}`;
  });
}

async function fetchReadmeForBranch(owner, repo, branch) {
  const response = await fetch(rawReadmeUrl(owner, repo, branch));
  if (!response.ok) return null;
  return response.text();
}

export async function fetchGithubReadme(githubUrl) {
  if (readmeCache.has(githubUrl)) return readmeCache.get(githubUrl);

  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) {
    readmeCache.set(githubUrl, null);
    return null;
  }

  const branches = parsed.branch ? [parsed.branch] : BRANCH_CANDIDATES;
  let markdown = null;
  let branchUsed = null;

  for (const branch of branches) {
    markdown = await fetchReadmeForBranch(parsed.owner, parsed.repo, branch);
    if (markdown) {
      branchUsed = branch;
      break;
    }
  }

  if (!markdown) {
    console.warn(`[github-readme] No README found for ${githubUrl}`);
    readmeCache.set(githubUrl, null);
    return null;
  }

  const result = rewriteRelativeAssets(markdown.trim(), parsed.owner, parsed.repo, branchUsed);
  readmeCache.set(githubUrl, result);
  return result;
}
