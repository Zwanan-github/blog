import { getBlog, getBlogList } from "@/actions/blog/action";
import { notFound } from "next/navigation";
import { whiteList } from "@/app/white-list";
import { Metadata } from "next";

const MDComponents = (await import("@/components/md-components")).default;

type Params = Promise<{
	name: string
}>

// meta
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { name } = await params;
	const decodedName = decodeURIComponent(name);
	const blog = await getBlog(decodedName);
	if (!blog) {
		throw notFound();
	}
	return {
		title: `Blogs-${blog.name}`,
		description: `${blog.name} ${blog.content}`,
		keywords: [blog.name],
		authors: [
			{ name: "Zwanan", url: "https://blog.zwanan.top/about" },
			{ name: "Zwanan-github", url: "https://github.com/zwanan-github" }
		],
		openGraph: {
			title: `Blogs-${blog.name}`,
			description: `${blog.name} ${blog.content}`,
			images: ["https://blog.zwanan.top/favicon.ico"],
		}
	};
}

// isr
export const dynamicParams = true;

// revalidate
export const revalidate = 60;

// ssg
export async function generateStaticParams() {
	return (await getBlogList()).map((blog) => ({
		name: blog.name,
	}));
}

export default async function Page({ params }: { params: Params }) {
	const { name } = await params;
	// 解码URL编码的name
	const decodedName = decodeURIComponent(name);
	// 获取博客内容
	// dev环境的时候不缓存
	const blog = await getBlog(decodedName);

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
			<MDComponents transparent={true} content={blog.content} />
		</div>
	);
}