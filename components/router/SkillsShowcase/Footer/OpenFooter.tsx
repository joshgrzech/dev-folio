import { CornerHandleIcon } from "@/components/icons";
import { m } from "framer-motion";

export interface Skill {
  name: string;
  icon: string;
}

const OpenFooter = ({ skill }: { skill: Skill }) => {
  return (
    <m.div layout className="flex flex-row items-center justify-between">
      <m.div layout className="flex-auto text-left">
        <m.h1
          layout
          layoutId={`${skill.name.replace(" ", "")}_header_text`}
          className="text-2xl font-bold"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            friction: 10,
          }}
        >
          {skill.name}
        </m.h1>
      </m.div>
    </m.div>
  );
};

export default OpenFooter;
