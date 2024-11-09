"use client";

import Link from "next/link";
import { Transaction, User } from "@/core";

import { Col, Row } from "@/shared";
import {BankCardSlider} from "@/feautures";
import {TransactionsList, TransactionsTable} from "@/shared";

export const WalletForm = ({
  user,
  transactions,
  isLoadingTransactions,
  isErrorTransactions,
}: {
  user?: User;
  transactions?: Transaction[];
  isLoadingTransactions: boolean;
  isErrorTransactions: boolean;
}) => {

  return (
    <>
      <Row className="justify-between flex-col lg:flex-row">
        <Col className="w-full lg:w-1/3">
          <BankCardSlider user={user} />
        </Col>
        <Col className="bg-gray-700 p-24 w-full lg:w-1/3 h-48 rounded-lg">
          <p>Graph</p>
        </Col>
      </Row>

      <Row>
        <Link
          href="/transactions"
          className="text-2xl text-blue-500 hover:text-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          Go to all transactions...
        </Link>
      </Row>

      <Row className="hidden lg:flex flex-col">
        {isLoadingTransactions ? (
          <p>Loading transactions...</p>
        ) : isErrorTransactions ? (
          <p>Error loading transactions.</p>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}
      </Row>

      <Row className="flex flex-col lg:hidden">
        {isLoadingTransactions ? (
          <p>Loading transactions...</p>
        ) : isErrorTransactions ? (
          <p>Error loading transactions.</p>
        ) : (
          <TransactionsList transactions={transactions} />
        )}
      </Row>
    </>
  );
};
