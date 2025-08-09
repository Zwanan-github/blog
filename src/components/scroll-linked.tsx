"use client"

import { motion, useScroll } from "motion/react"
import { useTheme } from "next-themes"

export default function ScrollLinked({children}: {children: React.ReactNode}) {
    const { scrollYProgress } = useScroll()
    const {resolvedTheme} = useTheme()

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    zIndex: 9999,
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    originX: 0,
                    backgroundColor: resolvedTheme === 'dark' ? "#35b378" : "#000",
                }}
            />
            {children}
        </>
    )
}