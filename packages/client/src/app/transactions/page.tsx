"use client";

import { useState } from "react";

import { WalletForm } from "@/feautures";
import { useAuth, useBalances, useTransactions } from "@/core";

export default function TransactionsPage() {
  const { user } = useAuth();
  const { balances } = useBalances({ userId: user?.id });
  const { transactions } = useTransactions({ id: "2" });
  const [isLoadingTransactions, _setIsLoadingTransactions] = useState(true);
  const [isErrorTransactions, _setIsErrorTransactions] = useState(false);

  return (
    <WalletForm
        balances={balances}
      user={user}
      transactions={transactions}
      isLoadingTransactions={isLoadingTransactions}
      isErrorTransactions={isErrorTransactions}
    />
  );
}
