import React from "react";
import SidebarMobile from "./sidebar-mobile";
import NavbarRoutes from "@/components/common/navbar-routes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full shadow-sm flex items-center w-full">
      <SidebarMobile />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
