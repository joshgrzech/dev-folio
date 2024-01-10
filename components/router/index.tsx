"use client";
import { createContext } from "react";
import AboutMe from "@/components/router/AboutSummary";
import ResumeSummary from "@/components/router/ResumeSummary";
import ContactSummary from "@/components/router/ContactSummary";
import References from "@/components/router/References";
import ClosedSkillBody from "@/components/router/SkillsShowcase/Body/ClosedBody";
import OpenSkillBody from "@/components/router/SkillsShowcase/Body/OpenBody";
import ClosedFooter from "@/components/router/SkillsShowcase/Footer/ClosedFooter";
import OpenFooter from "@/components/router/SkillsShowcase/Footer/OpenFooter";
import ExpandingCardClient from "../ExpandingCardClient";
import { Card } from "@nextui-org/react";
import { subtitle, title } from "../primitives";
import { m } from "framer-motion";
import { ProjectInfo } from "@/lib/fetchProjectInfo";

export const ProjectContext = createContext<ProjectInfo[]>([]);

export enum CardRoute {
  Swift = "swift",
  ReactNative = "react-native",
  Web = "web",
  Mobile = "mobile",
  AboutMe = "about",
  References = "references",
  Resume = "resume",
  Contact = "contact",
  Home = "/",
}
export interface Skill {
  name: string;
  icon: string;
  route: string;
  projectsFilter: (projects: ProjectInfo[]) => ProjectInfo[];
}

const skills = [
  {
    name: "Mobile Apps",
    icon: "/images/mobile.png",
    route: CardRoute.Mobile,
    projectsFilter: (projects: ProjectInfo[]) =>
      projects.filter((project) => {
        let show = false;
        if (project.platforms.includes("android")) {
          show = true;
        }
        if (project.platforms.includes("ios")) {
          show = true;
        }
        if (project.technologies.includes("react-native")) {
          show = true;
        }
        return show;
      }),
  },
  {
    name: "Web Apps",
    icon: "/images/web.png",
    route: CardRoute.Web,
    projectsFilter: (projects: ProjectInfo[]) =>
      projects.filter((project) => {
        let show = false;
        if (project.platforms.includes("web")) {
          show = true;
        }
        if (project.technologies.includes("nextjs")) {
          show = true;
        }
        return show;
      }),
  },
  {
    name: "Built w/ React Native",
    icon: "/images/react_native.png",
    route: CardRoute.ReactNative,
    projectsFilter: (projects: ProjectInfo[]) =>
      projects.filter((project) => {
        let show = false;
        if (project.technologies.includes("react-native")) {
          show = true;
        }
        return show;
      }),
  },
  {
    name: "Built w/ Swift",
    icon: "/images/swift.png",
    route: CardRoute.Swift,
    projectsFilter: (projects: ProjectInfo[]) =>
      projects.filter((project) => {
        let show = false;
        console.log(project.platforms);
        if (project.platforms.includes("macos")) {
          show = true;
        }
        if (project.platforms.includes("ios")) {
          show = true;
        }
        if (project.technologies.includes("swift")) {
          show = true;
        }
        return show;
      }),
  },
];

const routes = [
  {
    route: CardRoute.References,
    component: References,
  },
  {
    route: CardRoute.AboutMe,
    component: AboutMe,
  },
  {
    route: CardRoute.Resume,
    component: ResumeSummary,
  },
  {
    route: CardRoute.Contact,
    component: ContactSummary,
  },
];
const CardRouter = ({
  slug,
  projectInfo,
}: {
  slug: string;
  projectInfo: ProjectInfo[];
}) => {
  return (
    <ProjectContext.Provider value={projectInfo}>
      <m.section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card className="w-full p-unit-2xl">
          <div className="inline-block max-w-xxl text-center justify-center ">
            <h1 className={title()}>Crafting </h1>
            <h1 className={title({ color: "blue" })}>the Future&nbsp;</h1>
            <h1 className={title()}>of Mobile &amp; Web.</h1>
            <h2 className={subtitle({ class: "mt-4" })}>
              Mobile Focused, Full-Stack Enabled
            </h2>
          </div>
        </Card>
        <m.div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <ExpandingCardClient
              route={skill.route}
              open={
                slug === skill.route.replace("projects", "").replace("/", "")
              }
              key={index}
              layoutId={skill.route.replace("/", "")}
              cardBody={
                <ClosedSkillBody skill={skill} index={index} key={index} />
              }
              cardFooter={<ClosedFooter skill={skill} />}
              openCardFooter={<OpenFooter skill={skill} />}
              openCardBody={
                <OpenSkillBody skill={skill} index={index} key={index} />
              }
            />
          ))}
        </m.div>
        {routes.map((route, index) =>
          route.component({
            open: slug === route.route.replace("/", ""),
            route: route.route,
          })
        )}
      </m.section>
    </ProjectContext.Provider>
  );
};

export default CardRouter;
