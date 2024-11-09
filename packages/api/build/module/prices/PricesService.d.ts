import { Currency, PrismaClient } from "@prisma/client";
import { CoinMarketCapService } from "./CoinMarketCapService";
export declare class PricesService {
    private readonly coinMarketCapService;
    private readonly prisma;
    constructor(coinMarketCapService: CoinMarketCapService, prisma: PrismaClient);
    updatePrices(): Promise<void>;
    getAll(): Promise<{
        currency: Currency;
        value: number;
        updatedAt: Date;
    }[] | null>;
}
