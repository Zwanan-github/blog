import { Header } from '@/components/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='flex-1 max-w-screen-lg md:w-4/6 w-full sm:w-6/7 mx-auto px-6 py-8 md:py-12'>
        <div className='animate-slide-up'>{children}</div>
      </main>
    </>
  );
}
