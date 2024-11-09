"use client";

import "reflect-metadata";

import React from "react";

import { useRouter } from "next/navigation";
import {useAuth} from "@/core";
import {Home} from "@/feautures";


export default function HomePage() {
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleWallet = () => {
    router.push("/wallet");
  };

  const handleSupport = () => {
    router.push("/support");
  };

  return (
    <Home
      isAuthenticated={isAuthenticated}
      user={user}
      handleLogin={handleLogin}
      handleSupport={handleSupport}
      handleWallet={handleWallet}
    />
  );
}
