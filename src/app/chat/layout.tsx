import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat - Zwanan's Blog",
    description: "基于 Gemini Api 和 Mcp server 搭建的聊天应用",
    keywords: ["AI", "Chat", "聊天", "Gemini", "Mcp", "Mcp server", "Zwanan's Blog"],
    authors: [
        { name: "Zwanan", url: "https://blog.zwanan.top/about" },
        { name: "Zwanan-github", url: "https://github.com/zwanan-github" }
    ],
    openGraph: {
        title: "Chat - Zwanan's Blog",
        description: "基于 Gemini Api 和 Mcp server 搭建的聊天应用",
        images: ["https://blog.zwanan.top/favicon.ico"],
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="max-w-screen-lg h-[calc(90vh)] md:w-4/6 w-full sm:w-6/7 mx-auto">
            <div className="p-2 w-full h-full">
                {children}
            </div>
        </main>
    )
}