'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type DialogDeleteType = {
    title: string;
    open: boolean;
    isLoading: boolean;
    onSubmit: () => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DialogDelete: React.FC<DialogDeleteType> = ({ title, open, setOpen, onSubmit, isLoading }) => {

    const handleDelete = () => {
        onSubmit();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
                    <DialogTitle className="text-center text-lg font-semibold">Delete {title}</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Are you sure you want to delete this {title.toLowerCase()}? This action cannot be undo.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2 justify-end">
                    <Button disabled={isLoading} variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};