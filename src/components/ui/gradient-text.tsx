import React from "react";
import { motion, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex overflow-hidden",
        "bg-gradient-to-br from-indigo-500 via-orange-300 to-cyan-200",
        "bg-[length:500%_100%] animate-gradient-flow",
        "text-transparent font-extrabold bg-clip-text",
        className,
      )}
      style={{
        backgroundPosition: "0% 100%",
        animation: "gradient-flow 6s ease infinite",
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}


export { GradientText }