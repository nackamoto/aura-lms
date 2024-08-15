"use client";

import React from "react";
import SidebarItem from "./sidebar-item";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Explore",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacher = pathname?.includes("/teacher");
  const routes = isTeacher ? teacherRoutes : guestRoutes;
  return (
    <aside className="flex flex-col w-full">
      {routes.map(({ icon, label, href }) => (
        <SidebarItem key={label} icon={icon} label={label} href={href} />
      ))}
    </aside>
  );
};

export default SidebarRoutes;
