"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Message } from "@/actions/chat/action"
import MDComponents from "@/components/md-components"

export default function Page() {

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        scrollAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages, streamingContent]);

    async function sendMessage() {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        const curMessage: Message[] = [...messages, userMessage];
        setMessages(curMessage);
        setInput(""); // Clear the input immediately after sending
        setLoading(true);
        setStreamingContent("");

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: curMessage
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData.error);
                setMessages(prev => [...prev, { role: "assistant", content: `Error: ${errorData.error || 'Failed to send message.'}` }]);
                setLoading(false);
                return;
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";

            if (!reader) {
                console.error("Response body reader is null");
                setMessages(prev => [...prev, { role: "assistant", content: "Error: Failed to receive response." }]);
                setLoading(false);
                return;
            }

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    console.log('Stream completed!');
                    setMessages(prev => [...prev, { role: "assistant", content: assistantContent }]);
                    setLoading(false);
                    setStreamingContent(""); // Clear streaming content after completion
                    break;
                }

                const chunk = decoder.decode(value);
                assistantContent += chunk;
                setStreamingContent(prev => prev + chunk); // Accumulate streaming content
            }
        } catch (error) {
            console.error("Error reading stream:", error);
            setMessages(prev => [...prev, { role: "assistant", content: `Error: ${error || 'An unexpected error occurred.'}` }]);
            setLoading(false);
        }
    }

    return (
        <div className="h-full w-full">
            <div className="h-[90%] w-full rounded-xl bg-background/50 dark:bg-[#1e1e1e]/40">
                <div className="w-full h-full py-2 px-2 rounded-lg overflow-auto">
                    <div className="space-y-2 w-full">
                        {messages.map((message, index) => (
                            <div className={cn("w-full flex", message.role === "user" ? "justify-end" : "justify-start")} key={index}>
                                <div className={cn("flex flex-col max-w-full sm:max-w-[90%] md:max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
                                    <p className="px-2 py-1 text-sm font-mono w-fit">{message.role}</p>
                                    <MDComponents hideCatalog={true} content={message.content} className={cn("rounded-xl p-2 shadow-sm")} />
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className={cn("w-full flex justify-start")}>
                                <div className={cn("flex flex-col max-w-full sm:max-w-[90%] md:max-w-[80%] items-start")}>
                                    <p className={cn("px-2 py-1 text-sm font-mono w-fit")}>{"assistant"}</p>
                                    <MDComponents hideCatalog={true} content={streamingContent + "..."} className={cn("rounded-xl p-2 shadow-sm")} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div ref={scrollAreaRef} />
                    {messages.length == 0 && (
                        <div className="flex flex-col items-center justify-center h-full w-full">
                            <div className="flex flex-col items-center mb-8">
                                <p className="text-2xl font-mono font-bold">{"chat"}</p>
                                <p className="text-sm text-gray-500 font-mono">{"gemini + mcp server"}</p>
                            </div>
                            <p className="text-gray-500">{"开始你的对话吧"}</p>
                            <Button size={"lg"} variant={"outline"} className="w-[240px] mt-4" onClick={() => setInput("你好")}>{"你好"}</Button>
                            <Button size={"lg"} variant={"outline"} className="w-[240px] mt-2" onClick={() => setInput("列举可以使用的工具，以及作用")}>{"列举可以使用的工具，以及作用"}</Button>
                            <Button size={"lg"} variant={"outline"} className="w-[240px] mt-2" onClick={() => setInput("介绍一下你自己")}>{"介绍一下你自己"}</Button>
                        </div>

                    )}
                </div>
            </div>
            <div className="flex items-center justify-center h-16 py-4">
                <Input
                    placeholder="输入你的问题"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <Button className="ml-1" size="icon" onClick={sendMessage}><SendIcon /></Button>
            </div>
        </div>
    )
}
