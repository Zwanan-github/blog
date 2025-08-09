import React from "react";

const Transition = (await import("@/components/transition/transition")).default

export default function Template({ children }: { children: React.ReactNode }) {
    return <Transition>{children}</Transition>
}