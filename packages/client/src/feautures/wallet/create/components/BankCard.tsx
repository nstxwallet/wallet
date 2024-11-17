"use client";

import { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Button, NstxLogo } from "@/shared";
import { Balance, User } from "@/core";

interface userCardProps {
	balance?: Balance;
	user?: User;
}

export const BankCard = ({ balance, user }: userCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => setIsFlipped(!isFlipped);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(r => console.log(r));
	};

	const handleCopy = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (balance?.id) copyToClipboard(balance.id);
	};

	return (
		<div
			className={`relative w-72 h-48 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg cursor-pointer transform transition-transform duration-500 ${
				isFlipped ? "rotate-y-180" : ""
			}`}
			onClick={handleFlip}
			style={{ perspective: 1000 }}
		>
			<div
				className={`absolute inset-0 flex flex-col justify-between p-5 rounded-xl backface-hidden ${
					isFlipped ? "hidden" : "block"
				}`}
			>
				<NstxLogo className="w-12 h-12" />
				<div className="text-xs text-white truncate">{balance?.id}</div>
				<div className="flex justify-between text-white uppercase">
					<div>
						{user?.firstName} {user?.lastName}
					</div>
					<div>
						{balance?.value} {balance?.currency}
					</div>
				</div>
			</div>
			<div
				className={`absolute inset-0 flex flex-col justify-between p-5 bg-gray-800 text-white rounded-xl backface-hidden transform rotate-y-180 ${
					isFlipped ? "block" : "hidden"
				}`}
			>
				<div className="text-right text-sm">CVV - ***</div>
				<div className="text-right text-sm">Exp - **/**</div>
				<Button variant="primary" onClick={() => handleCopy}>
					Copy ID
				</Button>
			</div>
		</div>
	);
};
