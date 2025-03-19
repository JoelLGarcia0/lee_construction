"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlideIn = ({
  children,
  direction = "left",
  className,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
