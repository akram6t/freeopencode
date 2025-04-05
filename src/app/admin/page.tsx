import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

export default function DashboardPage() {
    return (
        <AdminPageWrapper
            navTitle="Dashboard"
            breadcrumpItems={[{ name: "Dashboard" }]}>
            <h1>hello dashboard</h1>
        </AdminPageWrapper>
    )
}