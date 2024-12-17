import React from "react";
import { useRouter } from "next/navigation";

import { Balance, User } from "@/core";
import { Button, Typography } from "@/shared";
import { BalanceCards, NoBalances } from "@/feautures";

interface BankCardSliderProps {
  balances?: Balance[] | null | undefined;
  user?: User | null | undefined;
}

export const BankCardSlider = ({ balances, user }: BankCardSliderProps) => {
  const router = useRouter();

  const handleCreateBalance = () => {
    router.push("/wallet/create");
  };

  if (!balances) {
    return (
      <div className="text-center">
        <Typography variant="h6">Failed to load balances</Typography>
        <Button onClick={handleCreateBalance} variant="primary">
          Create Balance
        </Button>
      </div>
    );
  }

  return balances.length > 0 ? (
    <BalanceCards balances={balances} user={user} />
  ) : (
    <NoBalances onCreateBalance={handleCreateBalance} />
  );
};
