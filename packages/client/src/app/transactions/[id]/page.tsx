"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { TransactionDetails } from "@/feautures/transactions/transaction/Form";
import { useTransactions } from "@/core";

export default function TransactionDetailsPage() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { id } = useParams();
  const { transaction, getTransactionById } = useTransactions({});

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCopyId = () => {
    navigator.clipboard.writeText(id as string).then((r) => r);
    alert("Transaction ID copied to clipboard!");
  };

  useEffect(() => {
    if (id) {
      getTransactionById(id as string);
    }
  }, [id, getTransactionById]);

  return (
    <TransactionDetails
      transaction={transaction}
      isExpanded={isExpanded}
      toggleExpand={toggleExpand}
      handleCopyId={handleCopyId}
    />
  );
}
