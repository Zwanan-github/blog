"use client";
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useState, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { useTheme } from 'next-themes';
import { Skeleton } from './ui/skeleton';

export default function MDComponents({ content }: { content: string }) {
    const [mount, setMount] = useState(false);
    const { resolvedTheme } = useTheme()
    useEffect(() => {
        setMount(true);
    }, []);
    // 设置md-editor-rt的样式
    const style = {
        backgroundColor: resolvedTheme == "dark" ? "#0a0a0a" : "#ffffff"
    }

    return (
        mount ? <div>
            <MdPreview id={"md-preview"} className="markdown-body" style={style} theme={resolvedTheme == "dark" ? "dark" : "light"} value={content} previewTheme="default" />
            <div className="fixed right-8 top-24">
                <ScrollArea className="w-48 h-[calc(60vh)]">
                    <MdCatalog editorId={"md-preview"} scrollElement={document.documentElement} />
                </ScrollArea>
            </div>
        </div> : <MDSkeleton />
    )
}

function MDSkeleton() {
    return <div className="w-full h-screen rounded-lg flex flex-col gap-4">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
    </div>
}
