import React from "react";
import { title } from "../primitives";
import { Button, Card } from "@nextui-org/react";
import ExpandingCardClient from "../ExpandingCardClient";
import { m } from "framer-motion";
import experiences from "@/config/experience.json";
import { CornerHandleIcon, DownloadIcon } from "../icons";
import { CardRoute } from ".";
type Experience = {
  title: string;
  company: string;
  dateRange: string;
  location: string;
  description: string[];
};

const ExperienceCard: React.FC<{ experience: Experience }> = ({
  experience,
}) => (
  <m.div layout layoutId={experience.title} className="p-4 ">
    <h3 className="text-4xl font-semibold">{experience.title}</h3>
    <p className="text-2xl ">{experience.dateRange}</p>

    <p className="text-xl ">{experience.location}</p>

    <ul className="list-disc list-inside mt-2 hidden md:block">
      {experience.description.map((point, index) => (
        <li key={index} className="text-lg">
          {point}
        </li>
      ))}
    </ul>
  </m.div>
);

const ResumeSummary = ({
  open,
  route,
}: {
  open: boolean;
  route: CardRoute;
}) => {
  return (
    <ExpandingCardClient
      open={open}
      route={route}
      cardBody={
        <div className="flex flex-col">
          <div
            className="h-unit-5xl md:h-unit-8xl"
            style={{
              display: "flex",
              backgroundImage: `url("/images/word-cloud.svg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              textAlign: "center",
              backgroundBlendMode: "overlay",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="p-unit-lg shadow-lg rounded-md backdrop-blur-lg">
              <h1 className={`${title({ color: "green" })} m-2 leading-3`}>
                Explore My Career Highlights
              </h1>
            </div>
          </div>
          <div className="self-end">
            <CornerHandleIcon />
          </div>
        </div>
      }
      openCardBody={
        <div className="flex flex-col items-center justify-between gap-4 self-center">
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              window.open(
                "/Josh_Grzech_Mobile_Application_Developer_2023.pdf",
                "_blank"
              );
            }}
          >
            <DownloadIcon size={75} />
          </Button>
        </div>
      }
      layoutId={route.replace("/", "")}
    />
  );
};

export default ResumeSummary;
