"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PieChart, Activity, Users, Layers } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 flex-1 px-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform's performance and statistics.
        </p>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value="128"
          trend="+14%"
          description="from last month"
          icon={<Users className="h-4 w-4" />}
          href="/admin/users"
        />
        <DashboardCard
          title="Projects"
          value="287"
          trend="+24%"
          description="from last month"
          icon={<Layers className="h-4 w-4" />}
          href="/admin/projects"
        />
        <DashboardCard
          title="Comments"
          value="653"
          trend="+18%"
          description="from last month"
          icon={<Activity className="h-4 w-4" />}
          href="/admin/comments"
        />
        <DashboardCard
          title="Likes"
          value="1,024"
          trend="+32%"
          description="from last month"
          icon={<PieChart className="h-4 w-4" />}
          href="/admin/likes"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/users/create">Add User</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/projects/create">Add Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/users">Manage Users</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/projects">Manage Projects</Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm">New user registered</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm">New project created</p>
                <p className="text-xs text-muted-foreground">32 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-sm">User updated profile</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  trend,
  description,
  icon,
  href,
}: {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href={href}>
            {icon}
            <span className="sr-only">View {title.toLowerCase()}</span>
          </Link>
        </Button>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-500 font-medium">{trend}</span>
        <span className="ml-1 text-muted-foreground">{description}</span>
      </div>
    </Card>
  );
}
