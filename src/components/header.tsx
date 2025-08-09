"use client"

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { whiteList } from "@/app/white-list";

export function Header() {
    return (
        <div className="p-4 max-w-screen-lg md:w-4/6 w-full sm:w-6/7 mx-auto flex justify-between">
            <NavigationMenu>
                <NavigationMenuList className="gap-4 flex items-center">
                <NavigationMenuList className="gap-4 flex items-center">
                    {whiteList.map(item =>
                        <NavigationMenuItem key={item.name}>
                            <NavigationMenuLink asChild>
                                <Link href={`/${item.name}`} passHref className="flex justify-center items-center gap-2">
                                    <span>{item.title}</span>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
                </NavigationMenuList>
            </NavigationMenu>
            <ThemeModeToggle className="ml-auto" />
        </div>
    );
}
