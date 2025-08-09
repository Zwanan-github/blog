"use client";

import React from "react";
import { motion } from "motion/react"

export default function Transition({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 0, x: 0 },
    enter: { opacity: 1, x: 0 },
  };

  return (
    <motion.main
      initial="hidden"
      className="w-full h-full"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}