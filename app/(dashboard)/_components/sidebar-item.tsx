import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};
const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    pathname === href ||
    (pathname === "/" && href === "/") ||
    pathname?.includes(`${href}/`);

  const onClick = (e: any) => {
    router.push(href);
  };
  return (
    <button
      className={cn(
        `flex items-center gap-x-2 text-slate-500 text-sm
         font-[500] pl-6 transition-all
         hover:text-slate-600 hover:bg-slate-300/20`,
        isActive &&
          `text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700`
      )}
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon className={cn(`text-slate-500`, isActive && `text-sky-700`)} />
        {label}
      </div>
      <div
        className={cn(
          `ml-auto h-full opacity-0 border-sky-700 border-2 transition-all`,
          isActive && `opacity-100`
        )}
      />
    </button>
  );
};

export default SidebarItem;
