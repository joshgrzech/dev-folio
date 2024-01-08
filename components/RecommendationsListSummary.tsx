import recommendations from "@/config/recommendations.json";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { LinkedInIcon } from "./icons";
import { m } from "framer-motion";
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
  recommendationHighlight: string;
};

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  return (
    <m.div
      layout
      layoutId={recommendation.providedBy.replace(" ", "")}
      className="w-full rounded overflow-hidden shadow-lg p-4 "
    >
      <m.div className="top-0 right-0">
        <LinkedInIcon color="#0077B5" />
      </m.div>
      <m.div
        layout
        layoutId={`${recommendation.providedBy.replace(
          " ",
          ""
        )}-avatar-container`}
        className="flex items-center justify-center mx-auto"
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
      <m.div className="px-6 py-4">
        <m.div
          className="font-bold text-xl"
          layout
          layoutId={`${recommendation.providedBy.replace(
            " ",
            ""
          )}-name-container`}
        >
          {recommendation.providedBy}
        </m.div>
        <m.p
          layout
          layoutId={`${recommendation.providedBy.replace(
            " ",
            ""
          )}-title-container`}
          className=" font-semibold text-base mb-3"
        >
          {recommendation.providedByTitle}
        </m.p>
        <Card>
          <CardBody>
            <p className="font-semibold">
              &quot;{recommendation.recommendationHighlight}&quot;
            </p>
          </CardBody>
        </Card>
      </m.div>
    </m.div>
  );
};

const RecommendationsListSummary = () => {
  return (
    <m.div
      layout
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        friction: 10,
      }}
      layoutId="reference-list-grid-contianer"
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      {recommendations
        .sort((a, b) => {
          return (
            new Date(a.recommendationDate).getTime() -
            new Date(b.recommendationDate).getTime()
          );
        })
        .map((recommendation, index) => (
          <RecommendationCard key={index} recommendation={recommendation} />
        ))}
    </m.div>
  );
};

export default RecommendationsListSummary;
