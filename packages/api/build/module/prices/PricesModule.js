"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesModule = void 0;
const PricesService_1 = require("./PricesService");
const CoinMarketCapService_1 = require("./CoinMarketCapService");
const PricesController_1 = require("./PricesController");
class PricesModule {
    constructor(service) {
        this.service = service;
    }
    static async init(props) {
        const coinMarketCapService = new CoinMarketCapService_1.CoinMarketCapService();
        const service = new PricesService_1.PricesService(coinMarketCapService, props.prisma);
        // setInterval(async () => {
        // 	await service.updatePrices();
        // }, 1000 * 60 * 5);
        await service.updatePrices();
        const controller = new PricesController_1.PricesController(props.fastify, service);
        controller.init();
    }
}
exports.PricesModule = PricesModule;
