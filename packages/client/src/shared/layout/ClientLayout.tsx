"use client";

import "reflect-metadata";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ServicesProvider } from "@/core";
import {Col, Container, Header} from "@/shared";

interface ClientLayoutProps {
	children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps ) {
	const queryClient = new QueryClient();

	return (
		<ServicesProvider>
			<QueryClientProvider client={queryClient}>
				<div className="overflow-auto bg-gray-900 w-full text-white min-h-screen flex flex-col">
					<Header />
					<main className="flex-grow p-8 overflow-y-auto">
						<Container>
							<Col>
								{children}
							</Col>
						</Container>
					</main>
				</div>
			</QueryClientProvider>
		</ServicesProvider>
	);
}
