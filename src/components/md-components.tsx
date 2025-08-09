"use client";
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

type Params = {
    content: string
    hideCatalog?: boolean
    className?: string
    transparent?: boolean
}

export default function MDComponents(params: Params) {
    const [mount, setMount] = useState(false);
    const { resolvedTheme } = useTheme()
    useEffect(() => {
        setMount(true);
    }, []);
    // 设置md-editor-rt的样式
    const style = {
        // 设置透明
        background: ` ${params.transparent && 'transparent'}`,
        backgroundColor: params.transparent ? 'transparent' : (resolvedTheme == "dark" ? "#0a0a0a" : "#ffffff")
    }

    return (
        mount ? <>
            <MdPreview id={"md-preview"} className={cn("markdown-body", "w-full", params.className)} style={style} theme={resolvedTheme == "dark" ? "dark" : "light"} value={params.content ?? ""} previewTheme="default" />
            {!params.hideCatalog && <MenuButton/>}
        </> : <MDSkeleton />
    )
}

export function MenuButton() {
    // 使用 Portal 将按钮渲染到 body 中，避免父组件影响
    if (typeof document === 'undefined') {
        return null;
    }
    return createPortal(
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-4 right-4 z-[9999] shadow-lg hover:shadow-xl transition-all duration-300"
                        size="icon"
                        variant={"outline"}
                        aria-label="目录"
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent aria-describedby='catalog-description'>
                    <DialogHeader>
                        <DialogTitle>目录</DialogTitle>
                    </DialogHeader>
                    <div className="h-[calc(60vh)] overflow-x-auto">
                        <MdCatalog scrollElementOffsetTop={68} offsetTop={70} editorId={"md-preview"} className="w-full text-sm" scrollElement={document.documentElement} />
                    </div>
                </DialogContent>
            </Dialog>,
            document.body
        );
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
