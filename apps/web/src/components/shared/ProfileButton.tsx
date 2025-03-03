import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { auth, SignOutButton } from "@clerk/nextjs";
import { db } from "db";
import { users } from "db/schema";
import { eq } from "db/drizzle";
import Link from "next/link";
import { DropdownSwitcher } from "@/components/shared/ThemeSwitcher";
import DefaultDropdownTrigger from "../dash/shared/DefaultDropDownTrigger";
import MobileNavBarLinks from "./MobileNavBarLinks";

export default async function ProfileButton() {
  const clerkUser = await auth();
  const { userId } = clerkUser;

  // This is our default component if there is no user data
 
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-transparent bg-transparent hover:bg-transparent hover:border-transparent">
          <Button className="relative rounded-full border-transparent focus-visible:ring-transparent focus-visible:ring-offset-transparent">
            <DefaultDropdownTrigger />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-32 sm:w-40 lg:w-52  mt-2 bg-[rgb(247,240,232)] dark:bg-black"
          align="end"
          forceMount>
          <DropdownMenuGroup>
            <MobileNavBarLinks />
            <DropdownMenuSeparator className="bg-[rgb(228,228,231)] dark:bg-[rgb(39,39,42)]" />
            <DropdownSwitcher />
            <Link href={`/bug-report`}>
              <DropdownMenuItem className="cursor-pointer">
                Report a Bug
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}

export const runtime = "edge";
