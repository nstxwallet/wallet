"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinMarketCapService = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
class CoinMarketCapService {
    constructor() {
        this.coinMarketCapCurrencies = {
            1: client_1.Currency.BNB,
            1027: client_1.Currency.BTC,
            825: client_1.Currency.USDT,
            2010: client_1.Currency.ETH,
            74: client_1.Currency.DASH,
            52: client_1.Currency.XMR,
            1831: client_1.Currency.BCH,
            2: client_1.Currency.LTC,
            512: client_1.Currency.XRP,
            2011: client_1.Currency.XLM,
            1975: client_1.Currency.SOL,
            1958: client_1.Currency.DOT,
            1839: client_1.Currency.LINK,
            8916: client_1.Currency.CAKE,
            4687: client_1.Currency.CRO,
            3717: client_1.Currency.UNI,
            7083: client_1.Currency.AAVE
        };
    }
    async getPrices() {
        const response = await axios_1.default.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${Object.keys(this.coinMarketCapCurrencies).join(",")}`, {
            headers: {
                "X-CMC_PRO_API_KEY": "6f4ce433-b481-4c80-86ab-559e330d3a56"
            }
        });
        return Object.values(response.data.data).map(data => ({
            currency: this.coinMarketCapCurrencies[data.id],
            value: data.quote.USD.price,
            updatedAt: new Date()
        }));
    }
}
exports.CoinMarketCapService = CoinMarketCapService;
