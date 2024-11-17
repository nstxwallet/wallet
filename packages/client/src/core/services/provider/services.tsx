"use client"

import { container } from "tsyringe";
import { AuthService } from "@/core/services/auth/AuthService";
import { BalanceService } from "@/core/services/balance";

container.registerSingleton(AuthService, AuthService);
container.register("UserStream", {
    useValue: container.resolve(AuthService).user,
});

console.log("AuthService registered:", container.isRegistered(AuthService));
container.registerSingleton(BalanceService, BalanceService);
console.log("BalanceService registered:", container.isRegistered(BalanceService));

export { container };