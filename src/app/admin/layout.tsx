import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {/* <SidebarTrigger className="fixed z-50 top-4 left-4"></SidebarTrigger> */}
            <AdminSidebar/>
            {children}
        </SidebarProvider>
    )
}