import React from "react";
import ExpandingCardClient from "../../ExpandingCardClient";
import ClosedSkillBody from "./Body/ClosedBody";
import OpenSkillBody from "./Body/OpenBody";

import ClosedFooter from "./Footer/ClosedFooter";
import OpenFooter from "./Footer/OpenFooter";

export interface Skill {
  name: string;
  icon: string;
}

const skills = [
  { name: "Mobile Apps", icon: "/images/mobile.png" },
  { name: "Web Apps", icon: "/images/web.png" },
  { name: "Built w/ React Native", icon: "/images/react_native.png" },
  { name: "Built w/ Swift", icon: "/images/swift.png" },
];

const SkillsComponent: React.FC = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <ExpandingCardClient
          key={index}
          layoutId={skill.name.split(" ").join("")}
          cardBody={<ClosedSkillBody skill={skill} index={index} key={index} />}
          cardFooter={<ClosedFooter skill={skill} />}
          openCardFooter={<OpenFooter skill={skill} />}
          openCardBody={
            <OpenSkillBody skill={skill} index={index} key={index} />
          }
        />
      ))}
    </div>
  );
};

export default SkillsComponent;
