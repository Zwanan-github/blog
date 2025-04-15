import { BlogList, BlogListSkeleton } from "@/components/blog-list";
import { Suspense } from "react";
export default async function Home() {
    return (
        <>
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogList />
            </Suspense>
        </>
    )
}