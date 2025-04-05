import React from "react";
import AdminNavbar from "./AdminNavbar";
import { ModernBreadCrump } from "../ui/modern-breadcrump";
import { Button } from "../ui/button";
import { LucideProps, Plus } from "lucide-react";

interface TypeAdminPageWrapper {
    children: React.ReactNode;
    navTitle: string;
    breadcrumpItems: { name: string, href?: string }[];
    actionButtonName?: string,
    actionButtonIcon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    onActionButtonClick?: () => void
}

export const AdminPageWrapper: React.FC<TypeAdminPageWrapper> = ({ children, navTitle, breadcrumpItems, actionButtonName, actionButtonIcon, onActionButtonClick }) => {
    return (
        <main className="p-3 w-full">
            <AdminNavbar title={navTitle} />
            <div className="h-3" />
            <div className="flex items-center justify-between">
                <ModernBreadCrump items={breadcrumpItems} />
                { actionButtonName && <Button onClick={onActionButtonClick}>{actionButtonIcon && <Plus/>} {actionButtonName}</Button> }
            </div>
            {children}
        </main>
    )
}