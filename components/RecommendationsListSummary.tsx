import recommendations from "@/config/recommendations.json";
import { Card, CardBody } from "@nextui-org/react";
import { LinkedInIcon } from "./icons";
import { m } from "framer-motion";
import Image from "next/image";

const MImage = m(Image);

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
      className="w-full rounded overflow-hidden border-medium shadow-lg p-4 "
    >
      <m.div className="top-0 right-0">
        <LinkedInIcon color="#0077B5" />
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
        <Card className="border-small">
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
      {recommendations.map((recommendation, index) => (
        <RecommendationCard key={index} recommendation={recommendation} />
      ))}
    </m.div>
  );
};

export default RecommendationsListSummary;
