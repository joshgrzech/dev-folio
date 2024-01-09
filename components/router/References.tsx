import React from "react";
import { title } from "../primitives";
import ExpandingCardClient from "../ExpandingCardClient";
import { CornerHandleIcon } from "@/components/icons";
import { m } from "framer-motion";
import RecommendationsList from "../RecommendationsList";
import RecommendationsListSummary from "../RecommendationsListSummary";
import { CardRoute } from ".";

const References = ({ open, route }: { open: boolean; route: CardRoute }) => {
  return (
    <ExpandingCardClient
      open={open}
      route={route}
      layoutId={route}
      cardHeader={
        <m.div layout className="p-unit-lg">
          <m.h1
            layout
            layoutId="references-header-text"
            className={`${title({ color: "green" })}`}
          >
            See What Industry Leaders Say About Me
          </m.h1>
        </m.div>
      }
      openCardHeader={
        <m.div layout className="p-unit-lg ">
          <m.h1
            layout
            layoutId="references-header-text"
            className={`${title({ color: "green" })}`}
          >
            Professional References
          </m.h1>
        </m.div>
      }
      cardBody={
        <m.div className="flex flex-col w-full h-full">
          <m.div
            layout
            layoutId="references-container"
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
              friction: 10,
            }}
            className="flex flex-row justify-between items-end p-3"
          >
            <RecommendationsListSummary />
          </m.div>
          <m.div className="self-end">
            <CornerHandleIcon />
          </m.div>
        </m.div>
      }
      openCardBody={
        <m.div
          layout
          layoutId="references-container"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            friction: 10,
          }}
        >
          <RecommendationsList />
        </m.div>
      }
    />
  );
};

export default References;
