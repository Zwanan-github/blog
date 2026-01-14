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
import Logo from '@/app/logo-header.png';
import Image from 'next/image';

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
                  <Image className={'w-30'} src={Logo} alt={'Zwanan'} />
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
