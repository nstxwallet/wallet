"use client";

import React, {createContext, FC, ReactNode, useEffect, useState} from "react";
import {Typography} from "@/shared/components";
import "reflect-metadata"
import { container } from "tsyringe";
import {AuthService} from "@/core/services/auth/AuthService";
import ToastProvider from "@/core/services/provider/ToastProvider";

interface Services {
	authService: AuthService;
}

interface ServicesProviderProps {
	children: ReactNode;
}

export const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider: FC<ServicesProviderProps> = ({ children }) => {
	const [ loading , setLoading ] = useState(true);
	const [services, setServices] = useState<Services | null>(null);

	useEffect(() => {
		const authService = container.resolve(AuthService);

		setServices({ authService });
		setLoading(false);
	}, []);

	if (!services || loading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<ServicesContext.Provider value={services}>
				<ToastProvider />
				{children}
		</ServicesContext.Provider>
	);
};
