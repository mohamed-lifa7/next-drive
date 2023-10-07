"use client";
import {
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "../themes/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthButtons } from "../auth/auth-buttons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Links } from "@/constants";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 z-50 mb-6 backdrop-blur-lg backdrop-filter ">
        <nav className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-4 p-4 text-primary sm:flex-row sm:justify-between ">
          <h1 className="whitespace-nowrap text-center text-2xl sm:text-3xl">
            <Link href="/">
              <span className="font-bold">Next</span>
              <span>Drive</span>
            </Link>
          </h1>
          <div className="flex">
            <div className="mr-2 flex">
              <AuthButtons />
            </div>
            <ModeToggle />
            {session && session.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 rounded-full ring-[2px] ring-primary focus:border-none focus:outline-none"
                  >
                    <Avatar>
                      {session.user.image && (
                        <AvatarImage src={session.user.image} />
                      )}
                      <AvatarFallback>
                        <UserCircle2 />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/workspace/storage-usage" className="flex">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/workspace/settings" className="flex">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <a href={Links.github} className="flex">
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      void signOut({
                        callbackUrl: "/",
                        redirect: false,
                      });
                      router.push("/");
                    }}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
        <Separator className="" />
      </header>
    </>
  );
}
