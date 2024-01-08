import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { LayoutGroup, m, useWillChange } from "framer-motion";

export interface ExpandingCardProps {
  open?: boolean;
  onPress?: () => void;
  cardBody?: React.ReactNode;
  cardFooter?: React.ReactNode;
  cardHeader?: React.ReactNode;
  openCardBody?: React.ReactNode;
  openCardFooter?: React.ReactNode;
  openCardHeader?: React.ReactNode;
  layoutId?: string;
  zIndex?: number;
  setZIndex?: (zIndex: number) => void;
  defaultClass?: string;
  initialDimensions?: DOMRect;
  children?: React.ReactNode;
}

const ExpandingCard = ({
  cardBody,
  cardFooter,
  cardHeader,
  openCardBody,
  openCardFooter,
  openCardHeader,
  open,
  onPress,
  layoutId,
  zIndex,
  setZIndex,
  defaultClass,
  initialDimensions,
  children,
}: ExpandingCardProps) => {
  const willChange = useWillChange();

  return (
    <m.div>
      {open && (
        <div
          style={
            initialDimensions
              ? {
                  width: initialDimensions.width,
                  height: initialDimensions.height,
                }
              : {
                  width: "100%",
                  height: "100%",
                }
          }
        />
      )}
      <m.div
        layout
        layoutId={`${layoutId}-background`}
        className={open ? "backdrop-blur-lg" : ""}
        style={{
          height: open ? window.innerHeight : 0,
          width: open ? window.innerWidth : 0,
          top: 0,
          left: 0,
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.0)",
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
        }}
      />
      <m.div
        layout
        layoutId={layoutId}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          friction: 10,
        }}
        className={`${defaultClass ? defaultClass : "w-full h-full"} ${
          open ? "fixed inset-0 p-2 md:p-10" : ""
        }`}
        style={{ willChange, zIndex }}
        onLayoutAnimationComplete={() => {
          if (!open) {
            setZIndex && setZIndex(0);
          }
        }}
      >
        <Card
          isHoverable
          isPressable
          className="h-full w-full"
          onPress={() => {
            onPress && onPress();
          }}
        >
          <LayoutGroup>
            {cardHeader && (
              <CardHeader className="overflow-hidden">
                <m.div
                  layout
                  layoutId={`${layoutId}-header`}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200,
                    friction: 10,
                  }}
                >
                  {open && openCardHeader ? openCardHeader : cardHeader}
                </m.div>
              </CardHeader>
            )}
            {cardBody && (
              <CardBody className="overflow-hidden">
                <m.div
                  layout
                  layoutId={`${layoutId}-body`}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200,
                    friction: 10,
                  }}
                >
                  {open && openCardBody ? openCardBody : cardBody}
                </m.div>
              </CardBody>
            )}
            {cardFooter && (
              <CardFooter className="overflow-hidden">
                <m.div
                  layout
                  layoutId={`${layoutId}-footer`}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200,
                    friction: 10,
                  }}
                  className="w-full"
                >
                  {open && openCardFooter ? openCardFooter : cardFooter}
                </m.div>
              </CardFooter>
            )}
          </LayoutGroup>
        </Card>
      </m.div>
    </m.div>
  );
};

export default ExpandingCard;
