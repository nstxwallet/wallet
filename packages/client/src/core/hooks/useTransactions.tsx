import { useMutation, useQuery } from "react-query";

import {
	createNSTXTransfer,
	getTransactionById,
	getTransactions,
	getTransactionsForCurrency,
	updateTransactionNote,
} from "@/core/api/transactions";
import { Balance, Transaction } from "../interfaces";

interface TransactionProps {
	onSuccess?: (data: unknown) => void;
	onError?: (error: unknown) => void;
}

export const useTransactions = ({ id }: { id: string }) => {
	const transactionsQuery = useQuery<Transaction[], Error, Transaction[]>(
		"transactions",
		() => getTransactions({ id }),
	);
	return {
		transactions: transactionsQuery.data,
		isLoading: transactionsQuery.isLoading,
		isError: transactionsQuery.isError,
	};
};

export const useTransactionsForCurrency = ({
	balance,
}: {
	balance: Balance;
}) => {
	const transactionsQuery = useQuery<Transaction[], Error, Transaction[]>(
		["transactions", balance],
		() =>
			getTransactionsForCurrency({
				currency: balance.currency,
			}),
	);
	return {
		transactionsCurrency: transactionsQuery.data,
		isLoading: transactionsQuery.isLoading,
		isError: transactionsQuery.isError,
	};
};

export const useNSTXTransfer = ({ onSuccess, onError }: TransactionProps) => {
	const NSTXTransferQuery = useMutation<
		void,
		unknown,
		{
			senderId: string;
			receiverId: string;
			amount: number;
			currency: string;
		}
	>(
		"NSTXTransfer",
		async (data) => {
			await createNSTXTransfer(data);
		},
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
		NSTXTransfer: NSTXTransferQuery.mutate,
	};
};

export const useTransactionById = ({ id }: { id: string }) => {
	const transactionQuery = useQuery<Transaction, Error, Transaction>(
		["transaction", id],
		() => getTransactionById({ id }),
	);
	return {
		transaction: transactionQuery.data,
		isLoading: transactionQuery.isLoading,
		isError: transactionQuery.isError,
	};
};

export const useUpdateTransactionNote = ({
	onSuccess,
	onError,
}: TransactionProps) => {
	const updateTransactionNoteQuery = useMutation<
		void,
		unknown,
		{
			id: string;
			note: string;
		}
	>(
		"updateTransactionNote",
		async (data) => {
			await updateTransactionNote(data);
		},
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
		updateTransactionNote: updateTransactionNoteQuery.mutate,
	};
};
