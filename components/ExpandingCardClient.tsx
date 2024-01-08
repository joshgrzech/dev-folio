"use client";
import React, { useEffect, useRef, useState } from "react";
import ExpandingCard, { ExpandingCardProps } from "./ExpandingCard"; // Assuming this is your server component

const ExpandingCardClient = ({ ...props }: ExpandingCardProps) => {
  const [open, setOpen] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();

  useEffect(() => {
    if (ref.current) {
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  const handlePress = () => {
    setOpen(!open);
    setZIndex(100);
  };

  return (
    <div ref={ref} style={{ height: "100%", width: "100%", zIndex }}>
      <ExpandingCard
        {...props}
        open={open}
        onPress={handlePress}
        zIndex={zIndex}
        setZIndex={setZIndex}
        initialDimensions={dimensions}
      />
    </div>
  );
};

export default ExpandingCardClient;
