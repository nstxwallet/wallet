"use client";

import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

import { Balance, User } from "@/core";
import { Button, Paper, Typography } from "@/shared";
import { BankCard } from "@/feautures";

interface BankCardSliderProps {
  balances?: Balance[] | null | undefined;
  user?: User | null | undefined;
}

const NoBalancesState: React.FC<{ onCreateBalance: () => void }> = ({
  onCreateBalance,
}) => (
  <div className="flex flex-col items-center justify-center p-6">
    <Typography variant="h6" className="text-center text-gray-700">
      No balances found
    </Typography>
    <Typography variant="body1" className="text-center text-gray-500 mt-2">
      You don’t have any wallet balance yet. Create one to start managing your
      funds.
    </Typography>
    <Button onClick={onCreateBalance} variant="primary" className="mt-6">
      Create Balance
    </Button>
  </div>
);

const BalanceCards: React.FC<{ balances: Balance[]; user?: User }> = ({
  balances,
  user,
}) => (
  <Paper color="transparent">
    <Slider {...sliderSettings()}>
      {balances.map((balance) => (
        <BankCard key={balance.id} balance={balance} user={user} />
      ))}
    </Slider>
  </Paper>
);

const sliderSettings = () => ({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

export const BankCardSlider: React.FC<BankCardSliderProps> = ({ balances }) => {
  const router = useRouter();

  const handleCreateBalance = () => {
    router.push("/wallet/create");
  };

  if (!balances) {
    return (
      <div className="text-center">
        <p>Failed to load balances</p>
        <Button onClick={handleCreateBalance} variant="primary">
          Create Balance
        </Button>
      </div>
    );
  }

  return balances.length > 0 ? (
    <BalanceCards balances={balances} />
  ) : (
    <NoBalancesState onCreateBalance={handleCreateBalance} />
  );
};
