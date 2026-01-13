'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { ThemeModeToggle } from './theme-mode-toggle';
import { whiteList } from '@/app/white-list';

// 可以在这里替换成任何你想要的图标
const HomeIcon = () => (
  <svg
    className='h-5 w-5 text-primary'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    />
  </svg>
);

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/30'>
      <div className='px-4 py-3 max-w-screen-lg md:w-4/6 w-full sm:w-6/7 mx-auto flex justify-between items-center'>
        <NavigationMenu>
          <NavigationMenuList className='gap-1 md:gap-4 flex items-center'>
            {/* Logo/Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href='/'
                  className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors group'
                >
                  <HomeIcon />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Divider */}
            <div className='h-6 w-px bg-border mx-1 hidden sm:block' />

            {whiteList.map(item => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/${item.name}`}
                    className='px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors'
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <ThemeModeToggle />
      </div>
    </header>
  );
}
