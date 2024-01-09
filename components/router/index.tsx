//@ts-nocheck
"use client";
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
import { useEffect } from "react";
import ts from "typescript";

export interface Skill {
  name: string;
  icon: string;
}

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

const skills = [
  { name: "Mobile Apps", icon: "/images/mobile.png", route: CardRoute.Mobile },
  { name: "Web Apps", icon: "/images/web.png", route: CardRoute.Web },
  {
    name: "Built w/ React Native",
    icon: "/images/react_native.png",
    route: CardRoute.ReactNative,
  },
  { name: "Built w/ Swift", icon: "/images/swift.png", route: CardRoute.Swift },
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
const CardRouter = ({ params }: { params: { id: string } }) => {
  const slug = params?.id;

  return (
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
            open={slug === skill.route.replace("projects", "").replace("/", "")}
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
          key: index,
        })
      )}
    </m.section>
  );
};

export default CardRouter;
