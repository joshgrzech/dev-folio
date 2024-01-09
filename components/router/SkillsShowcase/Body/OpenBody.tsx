import React from "react";
import Image from "../../../MotionImage";
import { m } from "framer-motion";
import { Skill } from "..";

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
    >
      <Image
        src={skill.icon}
        alt={skill.name}
        layoutId={`${skill.name.replace(" ", "")}_${index}_icon`}
        width={100}
        height={100}
      />
    </m.div>
  );
};

export default OpenSkillBody;
