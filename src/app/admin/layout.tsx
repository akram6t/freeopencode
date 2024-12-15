import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AdminSidebar } from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminSidebar/>
            {children}
        </SidebarProvider>
    )
}