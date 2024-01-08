"use client";
import React from "react";
import { title } from "../primitives";
import { Image } from "@nextui-org/react";
import ExpandingCardClient from "../ExpandingCardClient";
import { CornerHandleIcon } from "@/components/icons";
import { m } from "framer-motion";
import MotionImage from "../MotionImage";
const AboutMe: React.FC = () => {
  return (
    <ExpandingCardClient
      layoutId="about-me"
      cardBody={
        <m.div
          layout
          layoutId="about-me-container"
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
              layoutId="about-me-image"
              className="rounded-xl"
            />
            <m.div layout className="text-center justify-center w-full">
              <m.h1
                layout
                layoutId="about-me-text"
                className={title({ color: "pink" })}
              >
                About Me
              </m.h1>
            </m.div>
          </m.div>
          <CornerHandleIcon />
        </m.div>
      }
      openCardBody={
        <m.div
          layout
          layoutId="about-me-container"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            friction: 10,
          }}
        >
          <m.h1
            layout
            layoutId={"about-me-text"}
            className={title({ color: "pink" })}
          >
            About Me
          </m.h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <MotionImage
              src="/images/profile.jpeg"
              alt="Profile Picture"
              width={400}
              height={400}
              layoutId="about-me-image"
              className="rounded-xl"
            />
            <m.ul className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Dynamic and innovative
              </m.li>
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Extensive experience in TypeScript & Swift, and a strong
                focus on React Native.
              </m.li>
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Proven track record in developing engaging, user-friendly
                mobile applications.
              </m.li>
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Skilled in translating complex requirements into functional
                and aesthetically pleasing app features.
              </m.li>
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Adept at working in fast paced environments
              </m.li>
              <m.li className="text-4xl font-semibold text-center md:text-left m-unit-xl text-ellipsis">
                ➖ Consistently delivers projects on time without compromising
                on quality.
              </m.li>
            </m.ul>
          </div>
        </m.div>
      }
    />
  );
};

export default AboutMe;
