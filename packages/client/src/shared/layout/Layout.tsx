"use client";

import "reflect-metadata";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Footer } from "@/shared";
import {ServicesProvider} from "@/core";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps ) => {
	const queryClient = new QueryClient();

	return (
		<ServicesProvider>
			<QueryClientProvider client={queryClient}>
				<div className="flex flex-col min-h-screen overflow-auto bg-gray-900 w-full text-white">
					<main className="flex-grow">
						{children}
					</main>
					<Footer />
				</div>
			</QueryClientProvider>
		</ServicesProvider>
	);
};

