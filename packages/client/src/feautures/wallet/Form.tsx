"use client";

import React from "react";
import { Balance, Transaction, User } from "@/core";
import {
  Button,
  Col,
  Grid,
  Paper,
  Row,
  TransactionsList,
  TransactionsTable,
  Typography,
} from "@/shared";
import { BankCardSlider } from "@/feautures";

export const WalletForm = ({
  user,
  balances,
  transactions,
  isLoadingTransactions,
  isErrorTransactions,
}: {
  user: User | null | undefined;
  balances: Balance[] | null | undefined;
  transactions?: Transaction[];
  isLoadingTransactions: boolean;
  isErrorTransactions: boolean;
}) => {
  return (
    <Grid>
      <Paper color="secondary" className="flex items-center justify-between">
        <Typography variant="h5" className="text-lg font-medium">
          TransactionHistory.pdf
        </Typography>
        <Button variant="bordered">Download</Button>
      </Paper>
      <Row className="w-full justify-center">
        <Col className="w-full">
          <BankCardSlider balances={balances} user={user} />
        </Col>
      </Row>
      <Row className="hidden lg:flex flex-col">
        <TransactionsTable transactions={transactions} />
      </Row>
      <Row className="flex flex-col lg:hidden">
        <TransactionsList transactions={transactions} />
      </Row>
      <Row className="flex lg:hidden p-6 ">
        <TransactionsList
          transactions={transactions}
          isTransactionsLoading={isLoadingTransactions}
          isTransactionsError={isErrorTransactions}
        />
      </Row>
      <Typography className="text-center text-sm lg:text-base mt-4">
        By using our services, you agree to our{" "}
        <a href="/terms" className="text-blue-400 hover:underline">
          terms and conditions
        </a>
        . Please read them carefully before using our services.
      </Typography>
    </Grid>
  );
};
