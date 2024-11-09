"use client";

import React from "react";
import {
  MdBuild,
  MdLogin,
  MdLogout,
  MdOutlineSupportAgent,
  MdWallet,
} from "react-icons/md";
import { useRouter } from "next/navigation";

import { useAuth } from "@/core";
import { Button, NstxLogo, Row } from "@/shared";

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900">
      <Row>
        <Button variant="transparent" onClick={() => router.push("/")}>
          <NstxLogo className="h-8" />
        </Button>

        <Button
          variant="transparent"
          onClick={() => router.push("/transactions/create")}
          className="hidden lg:inline"
        >
          Transfer
        </Button>
        <Button
          variant="transparent"
          onClick={() => router.push("/wallet/create")}
          className="hidden lg:inline"
        >
          Create Balance
        </Button>
        <Button
          variant="transparent"
          onClick={() => router.push("/transactions")}
          className="hidden lg:inline"
        >
          Transactions
        </Button>
      </Row>

      <div className="flex items-center space-x-4">
        <Button variant="transparent" onClick={() => router.push("/wallet")}>
          <MdWallet size={24} />
        </Button>
        <Button variant="transparent" onClick={() => router.push("/support")}>
          <MdOutlineSupportAgent size={24} />
        </Button>

        {isAuthenticated ? (
          <Button variant="transparent" onClick={logout}>
            <MdLogout size={24} />
          </Button>
        ) : (
          <Button
            variant="transparent"
            onClick={() => router.push("/auth/login")}
          >
            <MdLogin size={24} />
          </Button>
        )}
        <MdBuild
          color="white"
          size={24}
          onClick={() => router.push("/settings")}
        />
      </div>
    </header>
  );
}
