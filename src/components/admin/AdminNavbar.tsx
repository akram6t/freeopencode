import React from "react";

interface IAdminNavbar {
    title: string;
}

export default function AdminNavbar({ title }: IAdminNavbar): React.ReactNode {
    return (
        <nav className="py-2">
            <h3 className="text-2xl">{title}</h3>
        </nav>
    );
}