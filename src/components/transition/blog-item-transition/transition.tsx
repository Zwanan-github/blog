"use client";

import React from "react";
import { motion } from "motion/react"

// 继承 div 组件的属性
export interface TransitionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    index: number
}
export const TransitionItem = ({ children, className, index }: TransitionItemProps) => {
    const variants = {
        hidden: { opacity: 0, x: 50, y: 30 },
        enter: { opacity: 1, x: 0, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            className={className}
            animate="enter"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.02 }}
        >
            {children}
        </motion.div>
    );
}