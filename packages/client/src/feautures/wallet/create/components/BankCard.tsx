
import { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {Button, NstxLogo} from "@/shared";
import { Balance, User } from "@/core";

interface userCardProps {
	balance?: Balance;
	user?: User;
}

export const BankCard = ({ balance, user }: userCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};
	const handleCopy = () => {
		if (balance?.id) {
			copyToClipboard(balance.id);
		}
	};
	return (
		<div
			className={`relative max-w-xs h-48 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg transform transition-transform ${
				isFlipped ? "rotate-y-180 transform" : ""
			}`}
			onClick={handleFlip}
		>
			<div
				className={`absolute inset-0 flex flex-col justify-between p-5 ${
					isFlipped ? "hidden" : "block"
				}`}
			>
				<NstxLogo className="w-12 h-12" />
				<div className="text-xs">{balance?.id}</div>
				<div className="flex justify-between uppercase">
					<div>
						{user?.firstName} {user?.lastName}
					</div>
					<div>
						{balance?.value} {balance?.currency}
					</div>
				</div>
			</div>

			<div
				className={`absolute inset-0 flex rounded-xl flex-col justify-between p-5 bg-gray-800 text-white transform rotate-y-180 ${
					isFlipped ? "block" : "hidden"
				}`}
			>
				<div className="text-right text-sm">CVV - {""}</div>
				<div className="text-right text-sm">Exp - {""}</div>
				<Button variant="primary" onClick={handleCopy}>
					Copy Ic
				</Button>
			</div>
		</div>
	);
};
