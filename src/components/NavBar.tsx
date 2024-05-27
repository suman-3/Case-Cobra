"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { auth, getAuth } from "@clerk/nextjs/server";

const NavBar2 = () => {
  const { user } = useClerk();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isAdmin = userEmail === process.env.NEXT_PUBLIC_CLERK_ADMIN_EMAIL!;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all ">
      <MaxWidthWrapper>
        <div className="h-14 flex items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-lg">
            case <span className="text-green-600">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button type="button" size="sm" variant="ghost">
                    Sign out
                  </Button>
                </SignOutButton>
                {isAdmin && (
                  <Link
                    href="/api/auth/logout"
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case ✨
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button type="button" size="sm" variant="ghost">
                    Sign up
                  </Button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <Button type="button" size="sm">
                    Log in
                  </Button>
                </SignInButton>
                <div className="bg-zinc-200 hidden sm:block">
                  <Link
                    href="/configure/upload"
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1",
                    })}
                  >
                    Create case ✨
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar2;
