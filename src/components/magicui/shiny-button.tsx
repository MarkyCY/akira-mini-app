"use client";

import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const initialAnimationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps {
  text: string;
  className?: string;
  active?: boolean;
}
const ShinyButton = ({
  text = "shiny-button",
  className,
  active = false,
}: ShinyButtonProps) => {
  const [animationProps, setAnimationProps] = useState<AnimationProps | {}>({});

  useEffect(() => {
    if (active) {
      setAnimationProps(initialAnimationProps);
    } else {
      setAnimationProps({
        whileTap: { scale: 0.95 }, // La animación de brinco
      });
    }
  }, [active]);

  return (
    <motion.button
      {...animationProps}
      className={cn(
        "relative rounded-lg px-2 py-2 font-medium backdrop-blur-xl transition-[box-shadow] duration-500 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/30%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
        className
      )}
    >
      <span
        className="relative block h-full w-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={
          active
            ? {
              maskImage:
                "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
            }
            : {}
        }
      >
        {text}
      </span>
      {active && (
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      )}
    </motion.button>
  );
};

export default ShinyButton;
