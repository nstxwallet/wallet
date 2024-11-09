import { User } from "@/core/interfaces";
import { Button, Row, Typography } from "../../../shared/components";
import React from "react";
import {CoinMarketCapBar} from "@/shared/components/table";

export const Hero = ({
                         handleLogin,
                         handleSupport,
                         handleWallet,
                         user,
                     }: {
    handleLogin: () => void;
    handleWallet: () => void;
    handleSupport: () => void;
    user?: User ;
}) => {
    return (
        <div className="bg-gradient-to-b from-black min-h-screen flex flex-col items-center justify-center p-8 w-full">
            <CoinMarketCapBar />
            <Typography center variant="h6" strong className="mb-4">
                Your one-stop shop for all things crypto. Exchange, store, and monitor
                your assets with ease.
            </Typography>
            <Typography center variant="h1" className="mb-8">
                Exchange, Store, and Monitor Your Crypto Assets
            </Typography>
            <Row justify="center" className="space-x-4">
                {user ? (
                    <Button variant="bordered" onClick={handleWallet}>
                        Wallet
                    </Button>
                ) : (
                    <Button variant="bordered" onClick={handleLogin}>
                        Login
                    </Button>
                )}
                <Button variant="transparent" onClick={handleSupport}>
                    Support
                </Button>
            </Row>
        </div>
    );
};
