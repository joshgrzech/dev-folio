import { ProjectContext } from "@/app/providers";
import { ProjectInfo } from "@/lib/fetchProjectInfo";
import React, { useContext, useState } from "react";
import CardRouter, { CardRoute, Skill } from "./router";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface ProjectCardProps {
  project: ProjectInfo;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <Card>
      <CardHeader className="text-lg font-semibold">{project.name}</CardHeader>
      <CardBody>
        <p>{project.description}</p>
      </CardBody>
    </Card>
  );
};

interface ProjectsListProps {
  skill: Skill;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ skill }) => {
  const projects = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null
  );

  const handleSelectProject = (project: ProjectInfo) => {
    setSelectedProject(project);
  };

  const filteredProjects = skill.projectsFilter(projects);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.name}
          project={project}
          onSelect={() => handleSelectProject(project)}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
