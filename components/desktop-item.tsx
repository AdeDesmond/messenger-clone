"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
function DesktopItem({
  label,
  icon: Icon,
  onClick,
  href,
  active,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={cn(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="h-5 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
//on the span we have sr-only which is going to be only for server side rendering

export default DesktopItem;
