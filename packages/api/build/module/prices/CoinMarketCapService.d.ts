import { Currency } from "@prisma/client";
export declare class CoinMarketCapService {
    readonly coinMarketCapCurrencies: Record<number, Currency>;
    getPrices(): Promise<Array<{
        currency: Currency;
        value: number;
        updatedAt: Date;
    }>>;
}
