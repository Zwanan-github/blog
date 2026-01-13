import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 sm:px-6'>
      <div className='max-w-2xl w-full text-center space-y-6 sm:space-y-8'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight'>
          {'Zwanan\'s Blog'}
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>记录与分享</p>
        <div className='grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:justify-center sm:gap-3 max-w-xs sm:max-w-none mx-auto w-full sm:w-auto'>
          <Link
            href='/blog'
            className='w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-block sm:inline-flex justify-center'
          >
            博客
          </Link>
          <Link
            href='/blog/about'
            className='w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-medium rounded-lg border border-border hover:bg-accent transition-colors inline-block sm:inline-flex justify-center'
          >
            关于
          </Link>
          <Link
            href='/blog/friend-links'
            className='w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-medium rounded-lg border border-border hover:bg-accent transition-colors inline-block sm:inline-flex justify-center'
          >
            友链
          </Link>
          <Link
            href='/blog/todo'
            className='w-full sm:w-auto px-4 sm:px-6 py-3 text-sm font-medium rounded-lg border border-border hover:bg-accent transition-colors inline-block sm:inline-flex justify-center'
          >
            待办
          </Link>
        </div>
      </div>
    </div>
  );
}
