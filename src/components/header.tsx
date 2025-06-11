"use client"

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeModeToggle } from "./theme-mode-toggle";

export function Header() {
    return (
        <div className="p-4 w-full flex justify-between">
            <NavigationMenu>
                <NavigationMenuList className="gap-4 flex items-center">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/" passHref className="flex justify-center items-center gap-2">
                                <span>首页</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/about" passHref className="flex justify-center items-center gap-2">
                                <span>关于</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/friend-links" passHref className="flex justify-center items-center gap-2">
                                <span>友链</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <ThemeModeToggle className="ml-auto" />
        </div>
    );
}
