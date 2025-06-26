"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    }, [messages]);

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
        } catch (error: any) {
            console.error("Error reading stream:", error);
            setMessages(prev => [...prev, { role: "assistant", content: `Error: ${error.message || 'An unexpected error occurred.'}` }]);
            setLoading(false);
        }
    }

    return (
        <div className="h-full flex flex-col w-full">
            <div className="h-[90%] flex-grow flex flex-col w-full rounded-xl bg-gray-100 dark:bg-[#1e1e1e]">
                <div className="py-4 px-2 sm:px-4 lg:px-4 shadow-sm rounded-xl">
                    <p className="text-lg font-semibold">Chat + Gemini Api + MCP</p>
                </div>
                <ScrollArea className="flex-1 h-[80%] w-full py-2 px-4 rounded-lg">
                    <div className="space-y-2 w-full">
                        {messages.map((message, index) => (
                            <div key={index}>
                                <p className={cn("px-2 py-1 text-sm font-mono", message.role === "user" ? "ml-auto w-fit" : "mr-auto w-fit")}>{message.role}</p>
                                <MDComponents content={message.content} key={index} className={cn("bg-white dark:bg-[#0a0a0a] rounded-xl p-2 shadow-sm", message.role === "user" ? "ml-auto w-fit w-max-[80%]" : "mr-auto w-fit w-max-[80%]")} />
                            </div>
                        ))}
                        {loading && (
                            <div>
                                <p className={cn("px-2 py-1 text-sm font-mono", "mr-auto w-fit")}>{"assistant"}</p>
                                <MDComponents content={streamingContent + "..."} className={cn("bg-white dark:bg-[#0a0a0a] rounded-xl p-2 shadow-sm", "mr-auto w-fit w-max-[80%]")} />
                            </div>
                        )}
                        <div ref={scrollAreaRef} />
                    </div>
                    {messages.length == 0 && (
                        <div className="flex flex-col items-center justify-center mt-30 h-full w-full">
                            <p className="text-xl font-mono">{"还没有消息"}</p>
                            <p className="text-gray-500">{"开始你的对话吧"}</p>
                            <Button size={"lg"} variant={"outline"} className="w-[240px]" onClick={() => setInput("你好")}>{"你好"}</Button>
                            <Button size={"lg"} variant={"outline"} className="w-[240px]" onClick={() => setInput("列举可以使用的工具，以及作用")}>{"列举可以使用的工具，以及作用"}</Button>
                            <Button size={"lg"} variant={"outline"} className="w-[240px]" onClick={() => setInput("介绍一下你自己")}>{"介绍一下你自己"}</Button>
                        </div>

                    )}
                </ScrollArea>
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
