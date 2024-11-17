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
import { Button, NstxLogo, Row, Typography } from "@/shared";

export const Header = () => {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <>
      <Row justify="center" className="px-4 py-2">
        {user ? (
          <Typography variant="h6" strong>
            {user.firstName} {user.lastName}
          </Typography>
        ) : (
          <Typography variant="h6" strong>
            Not logged in
          </Typography>
        )}
      </Row>

      {user && (
        <header className="flex items-center justify-between p-4 bg-gray-900">
          <Row className="flex-grow justify-between">
            <div className="lg:hidden" onClick={() => router.push("/")}>
              <NstxLogo  />
            </div>
            <div className="hidden lg:flex space-x-2">
              <Button
                variant="bordered"
                onClick={() => router.push("/transactions/create")}
              >
                Transfer
              </Button>
              <Button
                variant="transparent"
                onClick={() => router.push("/wallet/create")}
              >
                Create Balance
              </Button>
              <Button
                variant="transparent"
                onClick={() => router.push("/wallet")}
              >
                Transactions
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="transparent"
                onClick={() => router.push("/support")}
              >
                <MdOutlineSupportAgent />
              </Button>
              <Button
                variant="transparent"
                onClick={() => router.push("/settings")}
              >
                <MdBuild />
              </Button>

              {user ? (
                <Button variant="transparent" onClick={logout}>
                  <MdLogout />
                </Button>
              ) : (
                <Button
                  variant="transparent"
                  onClick={() => router.push("/auth/login")}
                >
                  <MdLogin size={24} />
                </Button>
              )}
            </div>
          </Row>
        </header>
      )}

      <Row className="lg:hidden px-4 py-2">
        <Button
          variant="bordered"
          onClick={() => router.push("/transactions/create")}
        >
          Transfer
        </Button>
        <Button
          variant="bordered"
          onClick={() => router.push("/wallet/create")}
        >
           Balance
        </Button>
        <Button
          variant="bordered"
          onClick={() => router.push("/transactions")}
        >
          Transactions
        </Button>
      </Row>
    </>
  );
};
