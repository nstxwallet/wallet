"use client";

import {useAuth, useBalances, useTransactions} from "@/core";
import { WalletForm } from "@/feautures";

export default function Wallet() {
  const { user } = useAuth();

  const { balances } = useBalances({ userId: user?.id });

  const {
    transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useTransactions({ id: "2" });

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
