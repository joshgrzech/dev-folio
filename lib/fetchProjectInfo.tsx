export interface ProjectInfo {
  name: string;
  description: string;
  technologies: string[];
  platforms: string[];
  features: string[];
  repositoryUrl: string;
  liveDemoUrl?: string; // Optional, in case some projects don't have a live demo
  startDate: string; // Format: YYYY-MM-DD
  endDate?: string; // Optional, as some projects might be ongoing
}

async function fetchAllProjectInfo(username: string): Promise<ProjectInfo[]> {
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
  } catch (error) {
    console.error("Failed to fetch project infos:", error);
    return [];
  }
}

export default fetchAllProjectInfo;
