import MDComponents from "@/components/md-components";
import { Blog, getBlog } from "@/actions/blog/action";
import { notFound } from "next/navigation";
import { whiteList } from "@/app/white-list";
type Params = Promise<{
  name: string
}>

// meta
export async function generateMetadata({ params }: { params: Params }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const blog = await getBlog(decodedName);
  if (!blog) {
    throw notFound();
  }
  return { title: `Blogs-${blog.name}`, description: blog.name };
}

export default async function Page({ params }: { params: Params }) {
  const { name } = await params;
  // 解码URL编码的name
  const decodedName = decodeURIComponent(name);
  // 获取博客内容
  // dev环境的时候不缓存
  const blog: Blog = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog?name=${decodedName}`, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 10 : 0
    }
  }).then(res => res.json());

  if (!blog) {
    throw notFound();
  }

  const matchingWhiteListItem = whiteList.find(item => item.name === blog.name);

  const displayTitle = matchingWhiteListItem ? matchingWhiteListItem.title : blog.name;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {displayTitle}
      </h1>
      <p className="text-sm text-gray-500">{`更新时间：${blog.date}`}</p>
      <MDComponents content={blog.content} />
    </div>
  );
}