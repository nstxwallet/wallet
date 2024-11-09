"use client";

import {useState} from "react";

import {WalletForm} from "@/feautures";
import {useAuth, useTransactions} from "@/core";

export default function Wallet() {
  const { user } = useAuth();

  const { transactions } = useTransactions({ id: "2" });

  const [isLoadingTransactions, _setIsLoadingTransactions] = useState(true);
  const [isErrorTransactions, _setIsErrorTransactions] = useState(false);

  return (
    <WalletForm
      user={user}
      transactions={transactions}
      isLoadingTransactions={isLoadingTransactions}
      isErrorTransactions={isErrorTransactions}
    />
  );
}
