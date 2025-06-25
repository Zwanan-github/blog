"use client";
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

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
        mount ? <div className="w-full">
            <MdPreview id={"md-preview"} className="markdown-body" style={style} theme={resolvedTheme == "dark" ? "dark" : "light"} value={content ?? ""} previewTheme="default" />
            <CatalogDialog />
        </div> : <MDSkeleton />
    )
}

function CatalogDialog() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button className="fixed right-8 bottom-12 md:right-16 md:bottom-10" variant="outline" size="icon"> 
                <Menu />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>目录</DialogTitle>
            </DialogHeader>
            <div className="h-[calc(60vh)] overflow-x-auto">
                <MdCatalog editorId={"md-preview"} className="w-full text-sm" scrollElement={document.documentElement} />
            </div>
        </DialogContent>
    </Dialog>
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
