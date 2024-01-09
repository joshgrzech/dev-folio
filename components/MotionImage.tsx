//@ts-nocheck

import { m } from "framer-motion";
import Image from "next/image";
import ts from "typescript";

const MImage = m(Image);

export interface MotionImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  layoutId: string;
  className?: string;
}

const MotionImage = ({
  src,
  alt,
  width,
  height,
  layoutId,
  className,
}: MotionImageProps) => {
  return (
    <MImage
      layout
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        friction: 10,
      }}
      src={src}
      alt={alt}
      width={width}
      height={height}
      layoutId={layoutId}
      className={className}
    />
  );
};

export default MotionImage;
