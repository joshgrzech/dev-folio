import recommendations from "@/config/recommendations.json";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { m } from "framer-motion";
import { LinkedInIcon } from "./icons";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import MotionImage from "./MotionImage";

type Recommendation = {
  providedBy: string;
  providedByImage: string;
  providedByTitle: string;
  providedByDescription: string;
  providedByLink: string;
  recommendationDate: string;
  recommendation: string;
};

const RecommendationCard = ({
  recommendation,
  setSelected,
  selected,
}: {
  recommendation: Recommendation;
  setSelected: (recommendation: Recommendation | null) => void;
  selected: boolean;
}) => {
  return (
    <Card
      isPressable
      className={`w-full rounded overflow-hidden shadow-lg p-4 ${
        selected ? "bg-blue-500" : ""
      }`}
      onPress={() => {
        setSelected(recommendation);
      }}
    >
      <CardBody className="overflow-hidden">
        <m.div
          layout
          layoutId={`${recommendation.providedBy.replace(
            " ",
            ""
          )}-avatar-container`}
        >
          <MotionImage
            className="rounded-full"
            src={recommendation.providedByImage}
            alt={recommendation.providedBy}
            width={64}
            height={64}
            layoutId={`${recommendation.providedBy.replace(" ", "")}-avatar`}
          />
        </m.div>
        <m.div
          layout
          layoutId={`${recommendation.providedBy.replace(
            " ",
            ""
          )}-name-container`}
          className="font-bold text-xl mb-2 text-left hidden md:flex flex-col"
        >
          {recommendation.providedBy}
          <m.p
            layout
            layoutId={`${recommendation.providedBy.replace(
              " ",
              ""
            )}-title-container`}
            className="text-base"
          >
            {recommendation.providedByTitle}
          </m.p>
        </m.div>
      </CardBody>
    </Card>
  );
};

const RecommendationsList = () => {
  const [selected, setSelected] = useState<Recommendation | null>(
    recommendations[0]
  );
  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <m.div
      layout
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        friction: 10,
      }}
      className="flex flex-col h-full"
    >
      <m.div
        layout
        layoutId="reference-list-grid-contianer"
        className="grid gap-4 grid-cols-4"
      >
        {recommendations
          .sort((a, b) => {
            return (
              new Date(a.recommendationDate).getTime() -
              new Date(b.recommendationDate).getTime()
            );
          })
          .map((recommendation, index) => (
            <m.div
              layout
              layoutId={recommendation.providedBy.replace(" ", "")}
              className="w-full flex flex-row justify-between gap-4"
              key={index}
            >
              <RecommendationCard
                selected={selected === recommendation}
                recommendation={recommendation}
                setSelected={setSelected}
              />
            </m.div>
          ))}
      </m.div>
      {selected && (
        <Card className="flex m-5">
          <CardBody className="max-h-unit-8xl md:max-h-unit-7xl">
            <m.p className="text-lg font-semibold text-center md:text-left m-unit-xl">
              {formatTextWithLineBreaks(selected.recommendation)}
            </m.p>
          </CardBody>
        </Card>
      )}
      <Button
        className="self-center p-10"
        onClick={() => {
          window.open(selected?.providedByLink, "_blank");
        }}
      >
        <h1 className="text-center text-4xl font-semibold m-unit-xl">
          View on LinkedIn
        </h1>
      </Button>
    </m.div>
  );
};

export default RecommendationsList;
