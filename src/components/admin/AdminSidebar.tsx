import { ThemeSwitch } from "@/components/theme-switch";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Box, Cpu, LayoutDashboard, Monitor, Users } from "lucide-react";

export function AdminSidebar() {

    const items = [
        {
            title: 'Dashboard',
            url: '/admin',
            icon: LayoutDashboard
        },
        {
            title: 'Users',
            url: '/users',
            icon: Users
        },
        {
            title: 'Projects',
            url: '/projects',
            icon: Box
        }
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-lg font-bold">Admin Panel <ThemeSwitch/></h2>
            </SidebarHeader>
            <SidebarContent>
                {/* Dashboard Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <p className="text-sm text-gray-500">&copy; 2024 Admin Panel</p>
            </SidebarFooter>
        </Sidebar>
    );
}