import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* <SidebarTrigger className="fixed z-50 top-4 left-4"></SidebarTrigger> */}
      <AdminSidebar />
      <main className="flex-1 p-4">
        <AdminNavbar title="Dashboard" />
        {children}
      </main>
    </SidebarProvider>
  );
}
