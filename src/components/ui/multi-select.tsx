"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MultiSelect as ReactMultiSelect } from "react-multi-select-component";
import { useTheme } from "next-themes";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: Option[];
  value: string[] | Option[]; // Accept both string array and Option array
  onChange: (selected: string[]) => void; // Always return string array
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

type ItemRenderType = {
  checked: boolean;
  option: Option;
  onClick: () => void;
  disabled: boolean;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Convert string array to Option array for the react-multi-select-component
  const selectedOptions =
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
      ? options.filter((option) => value.includes(option.value))
      : value;

  const handleChange = (selected: Option[]) => {
    // Convert back to string array for the form
    onChange(selected.map((item) => item.value));
  };

  const baseClassName =
    "w-full items-center justify-between border border-input text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

  return (
    <ReactMultiSelect
      className={`${baseClassName} ${className} ${theme === "dark" ? "dark" : ""}`}
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      labelledBy={placeholder}
      disabled={disabled}
      overrideStrings={{
        selectSomeItems: placeholder,
        allItemsAreSelected: "All items are selected",
      }}
      ClearSelectedIcon={
        <span className="text-primary hover:text-primary/80">×</span>
      }
      ArrowRenderer={({ expanded }) => (
        <span className="text-primary">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      )}
      ItemRenderer={({
        checked,
        option,
        onClick,
        disabled,
      }: ItemRenderType) => (
        <div
          className={`flex items-center px-2 py-1 cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${checked ? "bg-primary/10" : "hover:bg-accent"}`}
          onClick={disabled ? undefined : onClick}
        >
          {checked && <Check size={18} className="mr-2" />}
          {option.label}
        </div>
      )}
    />
  );
}
