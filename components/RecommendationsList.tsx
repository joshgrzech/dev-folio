import recommendations from "@/config/recommendations.json";
import { Card, CardBody } from "@nextui-org/react";
import { m } from "framer-motion";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { ExpandingCardContext } from "./ExpandingCardClient";

const MImage = m(Image);

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
      className={`w-full rounded overflow-hidden shadow-lg border-medium p-4 ${
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
  const { openDimensions } = useContext(ExpandingCardContext);
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
    >
      <m.div
        layout
        layoutId="reference-list-grid-contianer"
        className="grid gap-4 grid-cols-4"
      >
        {recommendations.map((recommendation, index) => (
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
        <Card className="m-4 max-h-unit-8xl">
          <CardBody>
            <m.p className="text-lg font-semibold text-left m-unit-lg h-full">
              {formatTextWithLineBreaks(selected.recommendation)}
            </m.p>
          </CardBody>
        </Card>
      )}
    </m.div>
  );
};

export default RecommendationsList;
