import React from "react";
import Image from "../../../MotionImage";
import { m } from "framer-motion";
import { Skill } from "../..";
import ProjectsList from "@/components/Projects";

const OpenSkillBody = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <m.div
      layout
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        friction: 10,
      }}
      layoutId={`${skill.name.replace(" ", "")}_${index}`}
      className="flex flex-col gap-4 w-full items-center "
    >
      <Image
        src={skill.icon}
        alt={skill.name}
        layoutId={`${skill.name.replace(" ", "")}_${index}_icon`}
        width={100}
        height={100}
      />

      <ProjectsList skill={skill} />
    </m.div>
  );
};

export default OpenSkillBody;
