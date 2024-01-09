import React from "react";
import { title } from "../primitives";
import ExpandingCardClient from "../ExpandingCardClient";
import { CornerHandleIcon } from "@/components/icons";
import { m } from "framer-motion";
import MotionImage from "../MotionImage";
import { CardRoute } from ".";
const AboutMe = ({ open, route }: { open: boolean; route: CardRoute }) => {
  return (
    <ExpandingCardClient
      open={open}
      route={route}
      layoutId={CardRoute.AboutMe.replace("/", "")}
      cardBody={
        <m.div
          layout
          layoutId="about-container"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            friction: 10,
          }}
          className="flex flex-row justify-between items-end"
        >
          <m.div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <MotionImage
              src="/images/profile.jpeg"
              alt="Profile Picture"
              width={300}
              height={300}
              layoutId="about-image"
              className="rounded-xl"
            />
            <m.div layout className="text-center justify-center w-full">
              <m.h1
                layout
                layoutId="about-text"
                className={title({ color: "pink" })}
              >
                More About Me
              </m.h1>
            </m.div>
          </m.div>
          <CornerHandleIcon />
        </m.div>
      }
      openCardBody={
        <m.div
          layout
          layoutId="about-container"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            friction: 10,
          }}
          className="flex flex-col items-center justify-center w-full"
        >
          <m.h1
            layout
            layoutId={"about-text"}
            className={title({ color: "pink" })}
          >
            About Me
          </m.h1>

          <div className="flex flex-col md:flex-col items-center justify-center gap-4 pt-6">
            <div className="hidden md:flex">
              <MotionImage
                src="/images/profile.jpeg"
                alt="Profile Picture"
                width={400}
                height={400}
                layoutId="about-image"
                className="rounded-xl m-3"
              />
            </div>
            <div className="flex flex-col text-xl md:text-2xl gap-4">
              <h1>{`👋 Hi, I'm Josh!`}</h1>
              <h2>
                {`🧙‍♂️✨ I'm a digital wizard who speaks Swift and conjures apps
                with React Native!`}
              </h2>
              <h3>{`📱 Sleek UIs and bare-metal performance in Swift? Got it.`}</h3>
              <h3>{`↔️ Cross platform solutions in React Native? You bet.`}</h3>
              <h3>{`🔧 I’m all about elegant solutions for complex challenges`}</h3>
              <h3>{`🖥️ My workspace? A masterpiece of creative chaos.`}</h3>
              <h3>
                {`🎶 Off the clock, I'm either crafting tunes or tinkering with
                AI.`}
              </h3>
              <h3>
                {`🤝 Think we can collaborate on something cool or just want to
                chat tech? I’m always up for connecting with fellow enthusiasts.
                Let’s make things happen. 🚀`}
              </h3>
            </div>
          </div>
        </m.div>
      }
    />
  );
};

export default AboutMe;
