import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Zwanan's Blog",
    description: "Zwanan's Blog, 基于 Next.js 和 Tailwind CSS 构建的个人博客, 记录自己的笔记和生活. ",
    keywords: ["Blog", "个人博客", "Note", "日记", "软件开发", "程序员", "Development", "Next.js", "Tailwind CSS", "Zwanan's Blog"],
    authors: [
        { name: "Zwanan", url: "https://blog.zwanan.top/about" },
        { name: "Zwanan-github", url: "https://github.com/zwanan-github" }
    ],
    openGraph: {
        title: "Zwanan's Blog",
        description: "Zwanan's Blog, 基于 Next.js 和 Tailwind CSS 构建的个人博客, 记录自己的笔记和生活.",
        images: ["https://blog.zwanan.top/favicon.ico"],
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* 直接配置的优先级高于 webmanifest */}
            <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="#0a0a0a"
            />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="#ffffff"
            />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="max-w-screen-lg md:w-4/6 w-full sm:w-6/7 mx-auto">
                        <Header />
                    </main>
                    {children}
                    <SpeedInsights />
                </ThemeProvider>
            </body>
        </html>
    );
}
