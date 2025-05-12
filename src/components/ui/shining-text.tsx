import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function ShiningText({ className,children } : { className?: string, children: React.ReactNode }) {
  return (
    <motion.h1
      className={cn(
        "bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] dark:bg-[linear-gradient(110deg,#a0a0a0,35%,#fff,50%,#a0a0a0,75%,#a0a0a0)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent",
        className
      )}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 5,
        ease: "linear",
      }}
    >
      {children}
    </motion.h1>
  );
}