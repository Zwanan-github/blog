"use client"

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { createPortal } from "react-dom";

export function ToTopButton() {
    const [currentWindow, setCurrentWindow] = useState<Window | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setCurrentWindow(window);

        // 添加滚动监听来控制按钮显示/隐藏
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleClick = () => {
        currentWindow?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // 使用 Portal 将按钮渲染到 body 中，避免父组件影响
    if (typeof document !== 'undefined') {
        return (
            <>
                {isVisible &&
                    createPortal(
                        <Button
                            className="fixed bottom-16 right-4 z-[9999] shadow-lg hover:shadow-xl transition-all duration-300"
                            size="icon"
                            variant={"default"}
                            onClick={handleClick}
                            aria-label="回到顶部"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>,
                        document.body
                    )
                }
            </>
        );
    }

    return null;
}