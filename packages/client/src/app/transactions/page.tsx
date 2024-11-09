"use client";

import { TransactionsForm } from "@/feautures";
import { useTransactions } from "@/core"

export default function TransactionsPage() {
  const { transactions, isLoading, isError } = useTransactions({ id: '2' });

  return (
    <TransactionsForm
      transactions={transactions}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
