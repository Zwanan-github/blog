import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Zwanan's Blog",
        short_name: "Zwanan's Blog",
        description: "Zwanan's Blog, 基于 Next.js 和 Tailwind CSS 构建的个人博客, 记录自己的笔记和生活.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/manifest/zwanan-48px.png',
                sizes: '48x48',
                type: 'image/png',
            },
            {
                src: '/manifest/zwanan-144px.png',
                sizes: '144x144',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/manifest/zwanan-192px.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/manifest/zwanan-512px.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
        categories: ['lifestyle', 'productivity', 'education', 'blog', 'personal', 'development', 'technology', 'programming', 'web-development', 'nextjs', 'react', 'javascript', 'notes', 'tutorial'],
        lang: 'zh-CN',
        orientation: 'portrait-primary',
        scope: '/',
    }
}