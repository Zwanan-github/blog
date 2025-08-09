import { getBlogList } from "@/actions/blog/action";
import { Skeleton } from "@/components/ui/skeleton";
import { TransitionItem } from "./transition/blog-item-transition/transition";
import Link from "next/link";
export async function BlogList() {
    const blogList = await getBlogList();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl tracking-tight">
                博客
                <span className="text-xs text-gray-500 ml-2">
                    {blogList.length}篇
                </span>
            </h1>
            <div className="flex flex-col gap-4">
                {blogList.map((blog, index) => (
                    <TransitionItem index={index} key={blog.name} className="py-1 border-b border-gray-200 dark:border-gray-700">
                        <Link href={`/${blog.name}`} className="block p-2 -mx-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm hover:scale-[1.01]">
                            <h2 className="text-base font-medium hover:underline">{blog.name}</h2>
                            <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                        </Link>
                    </TransitionItem>
                ))}
            </div>
        </div>
    )
}

export function BlogListSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl tracking-tight">博客</h1>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
        </div>
    )
}
