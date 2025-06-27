import { Blog, getBlogList } from "@/actions/blog/action";
import { NextResponse } from "next/server";

export async function GET() {
    const blogList: Blog[] = await getBlogList();
    return NextResponse.json(blogList);
}

