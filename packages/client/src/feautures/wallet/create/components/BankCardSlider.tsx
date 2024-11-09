import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation"

import {Balance, useBalances, User} from "@/core";
import { BankCard } from "@/feautures";
import { Button, Loading } from "@/shared";

interface UserCardInfoProps {
  user?: User;
}

const NoBalancesState = ({
	onCreateBalance,
}: {
	onCreateBalance: () => void;
}) => (
	<div className="flex flex-col">
		<p className="text-gray-400 text-left">No balances available.</p>
		<Button onClick={onCreateBalance} variant="primary" className="mt-6">
			Create Balance
		</Button>
	</div>
);

const BalanceCards = ({
	balances,
	user,
}: {
	balances: Balance[];
	user?: User;
}) => (
	<div className="relative w-full max-w-xl mx-auto">
		<Slider {...sliderSettings(balances.length)}>
			{balances.map((balance) => (
				<div key={balance.id}>
					<BankCard balance={balance} user={user} />
				</div>
			))}
		</Slider>
	</div>
);

const sliderSettings = (balanceCount: number) => ({
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: balanceCount > 1 ? 1 : 1,
	slidesToScroll: 1,
});

export const BankCardSlider = ({ user }: UserCardInfoProps) => {
	const { balances, isErrorBalances, isLoadingBalances } = useBalances({
		userId: user?.id as string,
	});
	const router = useRouter();
	const handleCreateBalance = () => {
		router.push("/balance/create");
	};
	if (isLoadingBalances) return <Loading />;
	if (isErrorBalances)
		return (
			<div className="text-center">
				<p>Failed to load balances</p>
				<Button onClick={handleCreateBalance} variant="primary">
					Create Balance
				</Button>
			</div>
		);
	return balances && balances.length > 0 ? (
		<BalanceCards balances={balances} user={user} />
	) : (
		<NoBalancesState onCreateBalance={handleCreateBalance} />
	);
};
