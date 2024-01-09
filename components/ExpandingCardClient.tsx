import React, { createContext, useEffect, useRef, useState } from "react";
import ExpandingCard, { ExpandingCardProps } from "./ExpandingCard";
import { useRouter } from "next/navigation";
import { CardRoute } from "./router";
import { AnimatePresence, m } from "framer-motion";

export const ExpandingCardContext = createContext<{
  openDimensions?: DOMRect;
}>({ openDimensions: undefined });

interface ExpandingCardClientProps extends ExpandingCardProps {
  open: boolean;
  route: CardRoute;
}
const ExpandingCardClient = ({
  open,
  route,
  ...props
}: ExpandingCardClientProps) => {
  const router = useRouter();
  const [zIndex, setZIndex] = useState(open ? 100 : 0);
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();
  useEffect(() => {
    if (ref.current && !dimensions) {
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, [ref, dimensions]);

  const handlePress = (shouldOpen: boolean) => {
    router.push(shouldOpen ? route : "/");
  };

  return (
    <AnimatePresence>
      <m.div ref={ref} style={{ zIndex }} className="w-full h-full">
        <ExpandingCard
          {...props}
          open={open}
          onPress={handlePress}
          zIndex={zIndex}
          setZIndex={setZIndex}
          initialDimensions={dimensions}
        />
      </m.div>

      {open && (
        <m.div
          className="default-class"
          layout
          layoutId={`${props.layoutId}-initial`}
          style={{
            height: dimensions?.height,
            width: dimensions?.width,
            position: "relative",
            top: dimensions?.top,
            left: dimensions?.left,
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ExpandingCardClient;
