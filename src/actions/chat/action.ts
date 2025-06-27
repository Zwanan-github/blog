'use server'
import { GoogleGenAI, setDefaultBaseUrls } from '@google/genai';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { mcpToTool } from '@google/genai';

const API_KEY = process.env.NEXT_GEMINI_KEY; // 从环境变量获取 Gemini API 密钥
const MODEL_NAME = process.env.NEXT_GEMINI_MODEL; // 或其他支持工具的模型
const MCP_SERVER_URL = process.env.NEXT_MCP_SERVER_URL;
const GEMINI_URL = process.env.NEXT_GEMINI_URL;

export type Message = {
    role: "user" | "assistant";
    content: string;
}

// 定义一个异步函数来处理聊天消息
export async function sendMessage(messages: Message[]) {
    try {
        if (!API_KEY) {
            console.error("GOOGLE_API_KEY is not set.");
            return new Response(JSON.stringify({ error: 'Server configuration error: API Key not set.' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        if (!MODEL_NAME) {
            console.error("MODEL is not found.");
            return new Response(JSON.stringify({ error: 'Server configuration error: MODEL is not found.' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        setDefaultBaseUrls({
            geminiUrl: GEMINI_URL
        })

        // 使用 @google/generative-ai 初始化客户端
        const ai = new GoogleGenAI({
            apiKey: API_KEY,
            apiVersion: 'v1alpha',
        })

        // Removed MCP client initialization
        const serverParams = new StreamableHTTPClientTransport(new URL(MCP_SERVER_URL || "http://localhost:4000/mcp"));
        const client = new Client({ name: "blog-mcp-server", version: "1.0.0" });
        await client.connect(serverParams);

        // console.log("messages", messages)

        // Send request to the model without MCP tools
        const response = await ai.models.generateContentStream({
            model: MODEL_NAME,
            contents: messages?.map((message) => {
                return {
                    role: message.role,
                    parts: [{text: message.content}]
                }
            }), // Assuming simple text input
            // Removed tools configuration
            config: { 
                tools: [mcpToTool(client)], 
            },
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    controller.enqueue(new TextEncoder().encode(chunk.text));
                }
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });

    } catch (error) {
        console.error('Error in sendMessage Server Action:', error);
        // Server Action 返回一个包含错误信息的对象
        return new Response(JSON.stringify({ error: 'Failed to process chat message' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
