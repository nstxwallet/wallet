import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	fullWidth?: boolean;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "transparent" | "danger" | "bordered";
	size?: "sm" | "md" | "lg";
	className?: string;
	type?: "button" | "submit" | "reset";
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
}

export const Button = ({
						   onClick,
						   fullWidth,
						   children,
						   type = "button",
						   size = "md",
						   className = "",
						   variant = "primary",
						   icon,
						   iconPosition = "left",
					   } : ButtonProps ) => {
	const variantStyles = {
		primary: "bg-blue-500 border border-blue-500 text-white hover:bg-blue-600",
		secondary: "bg-teal-400 border border-teal-600 text-white hover:bg-teal-700",
		transparent: "bg-transparent border border-gray-700 hover:bg-gray-900",
		danger: "bg-none border-red-500 text-white hover:bg-red-400",
		bordered: "border border-blue-500 text-blue-500 hover:bg-blue-100",
	};

	const baseStyles =
		"rounded-lg flex font-light shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-300";
	const sizeStyles = {
		sm: "px-4 py-2",
		md: "px-6 py-3",
		lg: "px-8 py-4",
	};

	return (
		<button
			className={`${fullWidth ? "w-full" : ""} ${variantStyles[variant]} ${
				sizeStyles[size]
			} ${className} ${baseStyles} items-center`}
			onClick={onClick}
			type={type}
		>
			{icon && iconPosition === "left" && (
				<span className="mr-2">{icon}</span>
			)}
			{children}
			{icon && iconPosition === "right" && (
				<span className="ml-4">{icon}</span>
			)}
		</button>
	);
};
