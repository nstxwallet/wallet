"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const client_1 = require("@prisma/client");
class TransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async transfer({ senderId, receiverId, amount, currency }) {
        return this.prisma.$transaction(async (trx) => {
            const sender = await trx.balance.findFirst({
                where: {
                    userId: senderId,
                    currency: currency
                }
            });
            if (!sender || sender.value < amount) {
                throw new Error("Sender has insufficient funds to transfer");
            }
            if (sender.userId === receiverId) {
                throw new Error("Sender and receiver cannot be the same components");
            }
            const receiver = await trx.balance.findFirst({
                where: {
                    userId: receiverId,
                    currency: currency
                }
            });
            if (!receiver) {
                throw new Error("Receiver not found");
            }
            await trx.balance.update({
                where: {
                    id: sender.id
                },
                data: {
                    value: {
                        decrement: +amount
                    }
                }
            });
            await trx.balance.update({
                where: {
                    id: receiver.id
                },
                data: {
                    value: {
                        increment: +amount
                    }
                }
            });
            const senderTransaction = await trx.transaction.create({
                data: {
                    amount,
                    currency,
                    userId: senderId,
                    status: client_1.TransactionStatus.completed,
                    type: client_1.TransactionType.transfer
                }
            });
            const receiverTransaction = await trx.transaction.create({
                data: {
                    amount,
                    currency,
                    userId: receiverId,
                    status: client_1.TransactionStatus.completed,
                    type: client_1.TransactionType.deposit
                }
            });
            return [senderTransaction, receiverTransaction];
        });
    }
    async getAll(getAllProperties) {
        return this.prisma.transaction.findMany({
            where: {
                userId: getAllProperties.userId,
                currency: {
                    in: getAllProperties.currencies
                },
                status: {
                    in: getAllProperties.statuses
                },
                type: {
                    in: getAllProperties.types
                }
            }
        });
    }
    async getForCurrency(getForCurrencyProperties) {
        return this.prisma.transaction.findMany({
            where: {
                userId: getForCurrencyProperties.userId,
                currency: getForCurrencyProperties.currency
            }
        });
    }
    async getById(id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id: id
            }
        });
        if (!transaction) {
            return null;
        }
        return transaction;
    }
}
exports.TransactionService = TransactionService;
