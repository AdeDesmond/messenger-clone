"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
interface MobileProps {
  label?: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
function MobileItem({ icon: Icon, href, active, onClick }: MobileProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      className={cn(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
        active && "bg-gray-100 text-black"
      )}
      href={href}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}

export default MobileItem;
