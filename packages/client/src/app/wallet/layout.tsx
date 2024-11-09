"use client";
import React from "react";
import ClientLayout from "@/shared/layout/ClientLayout";

export default function WalletPage({
	children,
}: { children: React.ReactNode }) {
	return <ClientLayout>{children}</ClientLayout>;
}
