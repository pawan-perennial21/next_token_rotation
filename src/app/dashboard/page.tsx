import HomePage from "@/components/home";
import Logout from "@/components/logout";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <Logout />
      <HomePage />
    </div>
  );
}
