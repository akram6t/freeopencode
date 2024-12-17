import React from "react";

interface IAdminNavbar {
    title: string;
}

export default function AdminNavbar({ title }: IAdminNavbar): React.ReactNode {
    return (
        <nav>
            <h3>{title}</h3>
        </nav>
    );
}