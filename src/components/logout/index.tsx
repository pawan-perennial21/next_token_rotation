"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const router = useRouter();
  // I want logout from next-auth
  const handleSignout = async () => {
    await signOut();
    router.push("/login");
  };
  return <button onClick={handleSignout}>Logout</button>;
}
