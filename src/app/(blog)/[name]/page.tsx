import MDComponents from "@/components/md-components";
import { getBlog } from "@/actions/blog/action";
import { notFound } from "next/navigation";
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
  const blog = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog?name=${decodedName}`, {
    next: {
      revalidate: 10
    }
  }).then(res => res.json());
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{blog.name === "about" ? "关于我" : blog.name}</h1>
      <p className="text-sm text-gray-500">{`更新时间：${blog.date}`}</p>
      <MDComponents content={blog.content} />
    </div>
  );
}