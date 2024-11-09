"use client";
import {
	createUserBalance,
	getUserBalance,
	getUserBalances,
} from "@/core"
import { useMutation, useQuery } from "react-query";

export const useBalances = ({ userId }: { userId: string }) => {
	const balancesQuery = useQuery("balances", () =>
		getUserBalances({
			userId,
		}),
	);
	return {
		balances: balancesQuery.data,
		isLoadingBalances: balancesQuery.isLoading,
		isErrorBalances: balancesQuery.isError,
	};
};
export const useBalance = ({ userId, id }: { userId: string; id: string }) => {
	const balanceQuery = useQuery(["balance", id], () =>
		getUserBalance({ userId, id }),
	);

	return {
		balance: balanceQuery.data,
		isLoadingBalance: balanceQuery.isLoading,
		isErrorBalance: balanceQuery.isError,
	};
};

export const useCreateBalance = ({
	onSuccess,
	onError,
}: {
	onSuccess: (data: unknown) => void;
	onError: (error: unknown) => void;
}) => {
	const createBalance = useMutation(
		(data: { currency: string }) => createUserBalance(data),
		{
			onSuccess: async (data) => {
				if (onSuccess) {
					onSuccess(data);
				}
			},
			onError: async (error) => {
				if (onError) {
					onError(error);
				}
			},
		},
	);
	return {
		createBalance: createBalance.mutate,
		isLoading: createBalance.isLoading,
		isError: createBalance.isError,
	};
};
