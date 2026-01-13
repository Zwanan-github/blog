import { getBlogList } from '@/actions/blog/action';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Calendar, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export async function BlogList() {
  const blogList = await getBlogList();
  return (
    <div className='space-y-8 animate-slide-up'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            博客文章
          </h1>
          <p className='text-muted-foreground mt-2'>
            共{' '}
            <span className='font-semibold text-primary'>
              {blogList.length}
            </span>{' '}
            篇文章
          </p>
        </div>
        <Badge variant='outline' className='text-sm'>
          <FileText className='w-3 h-3 mr-1' />
          Blog
        </Badge>
      </div>

      {/* Blog List */}
      <div className='space-y-4'>
        {blogList.map((blog, index) => {
          return (
            <Link
              key={index}
              href={`/blog/${blog.name}`}
              className='group block p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 space-y-2'>
                  <h2 className='text-xl font-semibold group-hover:text-primary transition-colors'>
                    {blog.name}
                  </h2>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1'>
                  <span className='text-sm font-medium'>阅读</span>
                  <ArrowRight className='h-4 w-4' />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {blogList.length === 0 && (
        <div className='text-center py-12'>
          <FileText className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
          <p className='text-muted-foreground'>暂无文章</p>
        </div>
      )}
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-10 w-32 mb-2' />
          <Skeleton className='h-5 w-48' />
        </div>
        <Skeleton className='h-8 w-16 rounded-full' />
      </div>

      {/* List Skeleton */}
      <div className='space-y-4'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='p-6 rounded-2xl border bg-card'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-3/4' />
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
              <Skeleton className='h-5 w-16' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
