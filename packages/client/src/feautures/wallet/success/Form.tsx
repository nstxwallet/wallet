"use client";

import React from "react";

import { Button, Container, Paper, Typography } from "@/shared";
import { Balance } from "@/core";

interface WalletSuccessProps {
  handleGoToWallet: () => void;
  handleCreateAnotherBalance: () => void;
  balance: Balance | null;
}

export const WalletSuccess = ({
  handleGoToWallet,
  handleCreateAnotherBalance,
  balance,
}: WalletSuccessProps) => {
  if (!balance) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <Typography variant="h4" color="danger">
          No balance found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <Paper
        color="primary"
        className="max-w-md w-full p-6 text-center space-y-6"
      >
        <Typography variant="h4" color="primary" className="text-green-600">
          Balance Created Successfully!
        </Typography>
        <Typography variant="body1" color="secondary" className="text-gray-600">
          Your new wallet balance has been created. You can now manage your
          funds or create additional balances.
        </Typography>
        <div className="bg-gray-100 p-4 rounded-lg text-left space-y-2">
          <Typography
            variant="body2"
            color="secondary"
            className="font-semibold"
          >
            Receipt:
          </Typography>
          <Typography variant="body2" color="secondary">
            Balance ID: <span className="text-gray-700">{balance.id}</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Currency: <span className="text-gray-700">{balance.currency}</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Date Created:{" "}
            <span className="text-gray-700">
              {balance.createdAt?.toString()}
            </span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Status: <span className="text-green-600 font-semibold">Active</span>
          </Typography>
        </div>
        <Button onClick={handleGoToWallet} variant="primary" fullWidth>
          Go to Wallet
        </Button>
        <Button
          fullWidth
          onClick={handleCreateAnotherBalance}
          variant="bordered"
        >
          Create Another Balance
        </Button>
      </Paper>
    </Container>
  );
};
