import { getBlog, getBlogList } from '@/actions/blog/action';
import { notFound } from 'next/navigation';
import { whiteList } from '@/app/white-list';
import { Metadata } from 'next';
import MDComponents from '@/components/md-components';

type Params = Promise<{
  name: string;
}>;

// meta
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
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
      { name: 'Zwanan', url: 'https://blog.zwanan.top/about' },
      { name: 'Zwanan-github', url: 'https://github.com/zwanan-github' },
    ],
    openGraph: {
      title: `Blogs-${blog.name}`,
      description: `${blog.name} ${blog.content}`,
      images: ['https://blog.zwanan.top/favicon.ico'],
    },
  };
}

// isr
export const dynamicParams = true;

// revalidate
export const revalidate = 60;

// ssg
export async function generateStaticParams() {
  return (await getBlogList()).map(blog => ({
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

  const displayTitle = matchingWhiteListItem
    ? matchingWhiteListItem.title
    : blog.name;

  return (
    <article className='animate-slide-up'>
      {/* Article Header */}
      <header className='mb-8 pb-8 border-b border-border/50'>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
          {displayTitle}
        </h1>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <time dateTime={blog.date} className='flex items-center gap-1'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            更新时间：{blog.date}
          </time>
        </div>
      </header>

      {/* Article Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        <MDComponents transparent={true} content={blog.content} />
      </div>
    </article>
  );
}
