"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import type { SidebarNavProps } from "@/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      <nav
        className={cn(
          "hidden space-x-2 md:flex lg:flex-col lg:space-x-0 lg:space-y-1",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger className="flex md:hidden">
          <Button size="icon" variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="whitespace-nowrap text-center text-2xl sm:text-3xl"
              >
                <span className="font-bold">Next</span>
                <span>Drive</span>
              </Link>
            </SheetTitle>

            {items.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                  )}
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
