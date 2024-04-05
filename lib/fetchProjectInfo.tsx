const noFetch = ["/", "", "resume", "references", "about"];

export interface ProjectInfo {
  name: string;
  description: string;
  technologies: string[];
  platforms: string[];
  features: string[];
  repositoryUrl: string;
  liveDemoUrl?: string;
  startDate: string;
  endDate?: string;
}

async function fetchAllProjectInfo(
  username: string,
  slug: string
): Promise<ProjectInfo[]> {
  if (!slug || noFetch.includes(slug)) return Promise.resolve([]);
  try {
    // Fetch public repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (!reposResponse.ok) {
      throw new Error(`Error fetching repositories: ${reposResponse.status}`);
    }
    const repos = await reposResponse.json();

    // Fetch project info for each repository
    const projectInfos = await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const projectInfoResponse = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/master/project-info.json`
          );
          const readMeResponse = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/master/README.md`
          );
          const projectInfo = await projectInfoResponse.json();
          const readme = await readMeResponse.text();
          return {
            ...projectInfo,
            readme,
          };
        } catch {
          return null;
        }
      })
    );

    return projectInfos.filter((info) => info !== null);
  } catch {
    return [];
  }
}

export default fetchAllProjectInfo;
