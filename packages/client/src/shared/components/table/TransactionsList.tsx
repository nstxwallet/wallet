"use client";

import { useRouter } from "next/navigation";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React from "react";

import { Transaction } from "@/core";
import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { Paper } from "@/shared";

interface TransactionProps {
  transactions?: Transaction[];
  isTransactionsLoading?: boolean;
  isTransactionsError?: boolean;
}

const groupTransactionsByDate = (transactions: Transaction[] = []) => {
  const groups = {
    today: [] as Transaction[],
    yesterday: [] as Transaction[],
    thisWeek: [] as Transaction[],
    older: [] as Transaction[],
  };

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.createdAt);
    if (Number.isNaN(transactionDate.getTime())) {
      console.warn("Invalid date format for transaction:", transaction);
      continue;
    }

    if (isToday(transactionDate)) {
      groups.today.push(transaction);
    } else if (isYesterday(transactionDate)) {
      groups.yesterday.push(transaction);
    } else if (isThisWeek(transactionDate)) {
      groups.thisWeek.push(transaction);
    } else {
      groups.older.push(transaction);
    }
  }

  return groups;
};

export const TransactionsList = ({ transactions }: TransactionProps) => {
  const router = useRouter();
  const groupedTransactions = groupTransactionsByDate(transactions || []);

  return (
    <div>
      {Object.entries(groupedTransactions).map(([group, items]) =>
        items.length > 0 ? (
          <div key={group} className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {group === "today" && "Today"}
              {group === "yesterday" && "Yesterday"}
              {group === "thisWeek" && "This Week"}
              {group === "older" && "Older..."}
            </h2>
            <ul className="space-y-4 sm:space-y-6">
              {items.map((transaction) => (
                <Paper
                  key={transaction.id}
                  elevation={3}
                >
                  <button
                    onClick={() =>
                      router.push(`/transactions/${transaction.id}`)
                    }
                    className="block w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-lg font-semibold">
                        {transaction.type === "deposit" ? (
                          <FaArrowDown className="text-green-500 mr-2" />
                        ) : (
                          <FaArrowUp className="text-red-500 mr-2" />
                        )}
                        <span className="text-gray-300 capitalize">
                          {transaction.type}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        ID: {transaction.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">
                        {transaction.amount} USD
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {format(
                        new Date(transaction.createdAt),
                        "HH:mm, dd MMM yyyy"
                      )}
                    </div>
                  </button>
                </Paper>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
};
