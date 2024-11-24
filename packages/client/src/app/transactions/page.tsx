"use client";

import { WalletForm } from "@/feautures";
import { useAuth, useBalances, useTransactions } from "@/core";

export default function TransactionsPage() {
  const { user } = useAuth();
  const { balances } = useBalances({ userId: user?.id });
  const { transactions } = useTransactions({ userId: user?.id });

  return (
    <WalletForm
      balances={balances || []}
      user={user || undefined}
      transactions={transactions || []}
    />
  );
}
