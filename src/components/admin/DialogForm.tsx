'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";

type DialogFormType = {
    children: React.ReactNode;
    title: string;
    formType: "add" | "edit";
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DialogForm: React.FC<DialogFormType> = ({ children, title, open, setOpen, formType }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{formType === 'edit' ? `Edit ${title}` : `Add New ${title}`}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}