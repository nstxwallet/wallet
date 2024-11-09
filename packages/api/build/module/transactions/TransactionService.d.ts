import { Currency, PrismaClient, Transaction, TransactionStatus, TransactionType } from "@prisma/client";
interface Transfer {
    senderId: string;
    receiverId: string;
    amount: number;
    currency: Currency;
}
export declare class TransactionService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    transfer({ senderId, receiverId, amount, currency }: Transfer): Promise<Transaction[]>;
    getAll(getAllProperties: {
        userId: string;
        currencies: Currency[];
        statuses: TransactionStatus[];
        types: TransactionType[];
    }): Promise<Transaction[]>;
    getForCurrency(getForCurrencyProperties: {
        userId: string;
        currency: Currency;
    }): Promise<Transaction[]>;
    getById(id: string): Promise<Transaction | null>;
}
export {};
