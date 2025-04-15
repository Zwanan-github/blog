import { getBlog } from "@/actions/blog/action";
import MDComponents from "@/components/md-components";

type Params = Promise<{
  name: string
}>

// meta
export async function generateMetadata({ params }: { params: Params }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const blog = await getBlog(decodedName);
  return { title: `Blogs-${blog.name}`, description: blog.name };
}

export default async function Page({ params }: { params: Params }) {
  const { name } = await params;
  // 解码URL编码的name
  const decodedName = decodeURIComponent(name);
  // 获取博客内容
  const blog = await fetch(`http://localhost:3000/api/blog?name=${decodedName}`);
  const blogData = await blog.json();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{blogData.name === "about" ? "关于我" : blogData.name}</h1>
      <p className="text-sm text-gray-500">{`更新时间：${blogData.date}`}</p>
      <MDComponents content={blogData.content} />
    </div>
  );
}