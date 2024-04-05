import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ProjectInfo } from "@/lib/fetchProjectInfo";

interface ProjectCardProps {
  project: ProjectInfo;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <Card>
      <CardHeader className="text-lg font-semibold">{project.name}</CardHeader>
      <CardBody>
        <div className="py-4">
          <h3 className="font-semibold">Technologies:</h3>
          <ul className="list-disc pl-5">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <div className="py-4">
          <h3 className="font-semibold">Platforms:</h3>
          <ul className="list-disc pl-5">
            {project.platforms.map((platform) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
        </div>
        <div className="py-4">
          <h3 className="font-semibold">Features:</h3>
          {Object.entries(project.features).map(([feature, description]) => (
            <div key={feature}>
              <h4 className="font-semibold">{feature}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <a
          href={project.homepage}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Homepage
        </a>
        <div className="pt-4">
          <span className="font-semibold">Status:</span> {project.status}
        </div>
        <div className="pt-2">
          <span className="font-semibold">Current Version:</span>{" "}
          {project.currentVersion}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
