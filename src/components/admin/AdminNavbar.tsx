import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Menu } from "lucide-react";
import { ThemeSwitch } from "../theme-switch";

interface IAdminNavbar {
  title: string;
}

export function AdminNavbar({ title }: IAdminNavbar): React.ReactNode {
  return (
    <nav className="py-2 flex items-center justify-between space-x-0 sticky top-0 z-10  bg-background">
      <SidebarTrigger className="md:hidden" />
      <h3 className="text-lg md:hidden">Admin Panel</h3>
      <ThemeSwitch />
    </nav>
  );
}
