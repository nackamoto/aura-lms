"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isPlayerPage = pathname?.includes("/player");
  return (
    <section className="flex items-center ml-auto gap-x-2">
      {isTeacherPage || isPlayerPage ? (
        <Link href={`/`}>
          <Button size={`sm`} variant={`ghost`}>
            <LogOut className="h-4 w-4 mr-2" />
            {`Exit`}
          </Button>
        </Link>
      ) : (
        <Link href={`/teacher/courses`}>
          <Button size={`sm`} variant={`ghost`}>{`Teacher mode`}</Button>
        </Link>
      )}
      <UserButton />
    </section>
  );
};

export default NavbarRoutes;
