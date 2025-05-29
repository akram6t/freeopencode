import { ThemeSwitch } from "@/components/theme-switch";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Box, LayoutDashboard, List, Users } from "lucide-react";

export function AdminSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: Box,
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: List,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
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
        <p className="text-sm text-gray-500">&copy; 2024 Free Open Code</p>
      </SidebarFooter>
    </Sidebar>
  );
}
