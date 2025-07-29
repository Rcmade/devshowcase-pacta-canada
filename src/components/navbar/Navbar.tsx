"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getInitials } from "@/lib/utils/stringUtils";
import { Home, LogOut, PlusCircle, Search, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignInButton from "../buttons/SignInButton";
import LogoLink from "../links/LogoLink";

export default function Navbar() {
  const user = useCurrentUser();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/search");
  };

  return (
    <nav className="border-b backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <LogoLink />

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/search"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex"
                >
                  <Link
                    href="/projects/new"
                    className="flex items-center space-x-1"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Project</span>
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.image || undefined}
                          alt={user.name || undefined}
                        />
                        <AvatarFallback>
                          {/* {user.profile?.username?.[0]?.toUpperCase() ||
                            user.email[0].toUpperCase()} */}
                          {getInitials(user?.name || "Unknown ")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="md:hidden">
                      <Link
                        href="/projects/new"
                        className="flex items-center space-x-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>New Project</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
