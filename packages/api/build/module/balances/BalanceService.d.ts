import { Balance, Currency, PrismaClient } from "@prisma/client";
export declare class BalanceService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getAll(getAllProperties: {
        userId: string;
    }): Promise<Balance[]>;
    create(createProperties: {
        userId: string;
        currency: Currency;
    }): Promise<Balance>;
    getOne(getOneProperties: {
        id: string;
        userId: string;
    }): Promise<Balance | null>;
}
