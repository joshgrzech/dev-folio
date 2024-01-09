import React from "react";
import Image from "../../../MotionImage";
import { m } from "framer-motion";
import { Skill } from "../..";

const ClosedSkillBody = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <m.div
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        friction: 10,
      }}
      layout
      layoutId={`${skill.name.replace(" ", "")}_${index}`}
      className="w-full h-full"
    >
      <Image
        src={skill.icon}
        alt={skill.name}
        layoutId={`${skill.name.replace(" ", "")}_${index}_icon`}
        width={280}
        height={280}
        className="w-full h-full"
      />
    </m.div>
  );
};

export default ClosedSkillBody;
