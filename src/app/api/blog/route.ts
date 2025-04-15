import { getBlog } from "@/actions/blog/action";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const blog = await getBlog(name!);
    return NextResponse.json(blog);
}

