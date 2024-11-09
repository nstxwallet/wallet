"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesService = void 0;
class PricesService {
    constructor(coinMarketCapService, prisma) {
        this.coinMarketCapService = coinMarketCapService;
        this.prisma = prisma;
    }
    async updatePrices() {
        try {
            const prices = await this.coinMarketCapService.getPrices();
            await this.prisma.price.createMany({
                data: prices.map(price => ({
                    currency: price.currency,
                    value: price.value,
                    updatedAt: price.updatedAt
                }))
            });
        }
        catch (error) {
            console.error("Error updating prices:", error);
        }
        if ((await this.prisma.price.count()) > 1000) {
            await this.prisma.price.deleteMany({
                where: {
                    updatedAt: {
                        lte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
                    }
                }
            });
        }
    }
    async getAll() {
        try {
            const prices = await this.prisma.price.findMany({
                orderBy: {
                    updatedAt: "desc"
                }
            });
            const groupedPrices = prices.reduce((acc, price) => {
                if (!acc[price.currency] ||
                    acc[price.currency].updatedAt < price.updatedAt) {
                    acc[price.currency] = price;
                }
                return acc;
            }, {});
            return Object.keys(groupedPrices).map(currency => ({
                currency: currency,
                value: groupedPrices[currency].value,
                updatedAt: groupedPrices[currency].updatedAt
            }));
        }
        catch (error) {
            console.error("Error fetching prices:", error);
            return [];
        }
    }
}
exports.PricesService = PricesService;
