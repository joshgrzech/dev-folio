"use client";
import React, { useEffect, useRef, useState } from "react";
import ExpandingCard, { ExpandingCardProps } from "./ExpandingCard";
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div ref={ref} style={{ zIndex }} className="w-full h-full">
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
