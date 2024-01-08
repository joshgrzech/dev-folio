"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import ExpandingCard, { ExpandingCardProps } from "./ExpandingCard";

export const ExpandingCardContext = createContext<{
  openDimensions?: DOMRect;
}>({ openDimensions: undefined });

const ExpandingCardClient = ({ ...props }: ExpandingCardProps) => {
  const [open, setOpen] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [openDimensions, setOpenDimensions] = useState<DOMRect>();
  useEffect(() => {
    if (ref.current) {
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  const handlePress = () => {
    setOpen(!open);
    setZIndex(100);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setOpenDimensions(ref.current?.getBoundingClientRect());
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, ref]);

  return (
    <ExpandingCardContext.Provider value={{ openDimensions }}>
      <div ref={ref} style={{ zIndex }} className="w-full h-full">
        <ExpandingCard
          {...props}
          open={open}
          onPress={handlePress}
          zIndex={zIndex}
          setZIndex={setZIndex}
          initialDimensions={dimensions}
          openDimensions={openDimensions}
        />
      </div>
    </ExpandingCardContext.Provider>
  );
};

export default ExpandingCardClient;
