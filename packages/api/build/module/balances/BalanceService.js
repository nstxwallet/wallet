"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
class BalanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(getAllProperties) {
        return this.prisma.balance.findMany({
            where: {
                userId: getAllProperties.userId
            }
        });
    }
    async create(createProperties) {
        const userBalances = await this.getAll({ userId: createProperties.userId });
        if (userBalances.some(balance => balance.currency === createProperties.currency)) {
            throw new Error("User already has a components in this currency");
        }
        return this.prisma.balance.create({
            data: {
                userId: createProperties.userId,
                currency: createProperties.currency,
                value: 0
            }
        });
    }
    async getOne(getOneProperties) {
        return this.prisma.balance.findFirst({
            where: {
                id: getOneProperties.id,
                userId: getOneProperties.userId
            }
        });
    }
}
exports.BalanceService = BalanceService;
