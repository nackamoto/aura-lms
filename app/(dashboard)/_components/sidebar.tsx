import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <aside className="border-r shadow-sm flex flex-col h-full">
      <div className="p-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </aside>
  );
};

export default Sidebar;
