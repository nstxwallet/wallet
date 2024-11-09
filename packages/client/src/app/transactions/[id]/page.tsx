"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useTransactionById } from "@/core";
import {TransactionDetails} from "@/feautures/transactions/transaction/Form";

export default function TransactionDetailsPage() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCopyId = () => {
    navigator.clipboard.writeText(id as string);
    alert("Transaction ID copied to clipboard!");
  };

  const { id } = useParams();
  const { transaction } = useTransactionById({ id: id });

  return (
    <TransactionDetails
      transaction={transaction}
      isExpanded={isExpanded}
      toggleExpand={toggleExpand}
      handleCopyId={handleCopyId}
    />
  );
}
