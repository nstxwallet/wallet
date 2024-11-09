"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {Balance, useNSTXTransfer, User} from "@/core";
import {Button, Paper, Typography} from "@/shared";

interface ConfirmTransactionProps {
	user?: User;
	receiverId?: string;
	senderId?: string;
	amount: string;
	currency: string;
	balances?: Balance[];
}

export const ConfirmTransaction = ({
									   user,
									   receiverId,
									   amount,
									   currency,
									   balances,
								   }: ConfirmTransactionProps) => {
	const balance = balances?.find((balance) => balance.currency === currency);
	const router = useRouter();

	const { NSTXTransfer } = useNSTXTransfer({
		onSuccess: () => {
			toast.success("Payment was successful");
			setTimeout(() => {
				router.push("/transactions");
			}, 1000);
		},
		onError: () => {
			alert("Failed to make payment");
		},
	});

	const onConfirm = () => {
		NSTXTransfer({
			senderId: user?.id as string,
			receiverId: receiverId as string,
			amount: parseFloat(amount),
			currency,
		});
	};

	const onCancel = () => {
		router.push("/dashboard");
	};

	return (
		<Paper variant='gradient' className="max-w-xl mx-auto p-8">
			<Typography variant="h3" center>
				Confirm Payment
			</Typography>

			<div className="text-center mb-4">
				<Typography variant="h2" className="text-3xl">
					{amount}
				</Typography>
				<Typography variant="body1">
					{currency}
				</Typography>
			</div>

			<div className="flex justify-between text-lg mb-4">
				<Typography variant="body1">To:</Typography>
				<Typography variant="body1">{receiverId}</Typography>
			</div>
			<div className="flex justify-between text-lg mb-4">
				<Typography variant="body1">From:</Typography>
				<Typography variant="body1">{user?.id}</Typography>
			</div>
			<div className="flex justify-between text-lg mb-4">
				<Typography variant="body1">Current balance:</Typography>
				<Typography variant="body1">
					{balance?.value} {currency}
				</Typography>
			</div>
			<div className="flex justify-between text-lg mb-8">
				<Typography variant="body1">Balance after payment:</Typography>
				<Typography variant="body1">
					{balance?.value ?? 0 - parseFloat(amount)} {currency}
				</Typography>
			</div>

			<div className="flex items-center justify-center mb-4">
				<input
					type="checkbox"
					name="terms"
					id="terms"
					className="rounded text-blue-500"
				/>
				<label
					htmlFor="terms"
					className="ml-2 text-sm font-medium text-gray-300"
				>
					<Typography variant="body2">
						I agree with the{" "}
						<a href="/terms" className="text-blue-500 hover:underline">
							terms and conditions
						</a>
						.
					</Typography>
				</label>
			</div>

			<div className="flex justify-between space-x-4">
				<Button onClick={onCancel} variant="danger" fullWidth>
					Cancel Payment
				</Button>
				<Button onClick={onConfirm} variant="primary" fullWidth>
					Confirm Payment
				</Button>
			</div>
		</Paper>
	);
};
