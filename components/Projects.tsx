import { ProjectInfo } from "@/lib/fetchProjectInfo";
import React, { useContext, useState } from "react";
import { ProjectContext, Skill } from "./router";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import ProjectCard from "./ProjectCard";

interface ProjectCardProps {
  project: ProjectInfo;
  onSelect: () => void;
  selected: boolean;
}

const ProjectButton: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  selected,
}) => {
  return (
    <Card
      isPressable
      onPress={onSelect}
      className={selected ? "border-white border-large" : ""}
    >
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
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectButton
            key={project.name}
            project={project}
            onSelect={() => handleSelectProject(project)}
            selected={selectedProject?.name === project.name}
          />
        ))}
      </div>
      {selectedProject && (
        <ProjectCard
          project={selectedProject}
          onSelect={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsList;
