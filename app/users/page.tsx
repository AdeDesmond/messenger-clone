import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import React from "react";

function UsersPage() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div> 
  );
}

export default UsersPage;
