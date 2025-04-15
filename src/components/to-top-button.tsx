"use client"

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ToTopButton() {
    const [currentWindow, setCurrentWindow] = useState<Window | null>(null);

    useEffect(() => {
        setCurrentWindow(window);
    }, []);


    const handleClick = () => {
        currentWindow?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    
    return (
        <Button size="icon" variant={"default"} onClick={handleClick} className="fixed right-16 bottom-20">
            <ArrowUp />
        </Button>
    )
}
