"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollReveal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Runs animation only once
    threshold: 0.3, // Triggers when 20% of the section is in view
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
