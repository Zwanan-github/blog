import { sendMessage } from "@/actions/chat/action";

export async function POST(request: Request) {
    try {
        const res = await request.json();
        // console.log("res", res)
        // console.log("res.messages", res.messages)
        const response = await sendMessage(res.messages);
        return response;
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ error: 'Failed to process chat message' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
