import { getBlogList } from "@/actions/blog/action";
import { Skeleton } from "@/components/ui/skeleton";
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
            {blogList.map((blog) => (
                <div key={blog.name} className="py-2 border-b border-gray-200 dark:border-gray-700">
                    <a href={`/${blog.name}`}>
                        <h2 className="text-base hover:underline">{blog.name}</h2>
                        <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                    </a>
                </div>
            ))}
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
