import {
	createNSTXTransfer as createNSTXTransferAPI,
	getTransactionById as getTransactionByIdAPI,
	getTransactions as getTransactionsAPI,
} from "@/core/api";
import { Transaction } from "@/core/interfaces";
import { BehaviorSubject } from "rxjs";

export interface State {
	transactions: Transaction[];
	transaction: Transaction | null;
	isLoadingTransactions: boolean;
	isErrorTransactions: boolean;
}

export class TransactionsService {
	private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
	public transactions$ = this.transactionsSubject.asObservable();
	private transactionSubject = new BehaviorSubject<Transaction | null>(null);
	public transaction$ = this.transactionSubject.asObservable();

	constructor(public state: State) {}

	async getTransactions({ id }: { id: string }) {
		this.state.isLoadingTransactions = true;
		this.state.isErrorTransactions = false; // Сбрасываем флаг ошибки перед новым запросом
		this.transactionsSubject.next(this.state.transactions); // Обновляем поток на случай, если кто-то подписан на состояние загрузки

		try {
			const transactions = await getTransactionsAPI({ id });
			this.state.transactions = transactions;
			this.transactionsSubject.next(transactions);
		} catch (_e) {
			this.state.isErrorTransactions = true;
		} finally {
			this.state.isLoadingTransactions = false;
			this.transactionsSubject.next(this.state.transactions);
		}
		return this.state.transactions;
	}

	async getTransactionById({ id }: { id: string }) {
		this.state.isLoadingTransactions = true;
		this.state.isErrorTransactions = false;
		this.transactionSubject.next(this.state.transaction);

		try {
			const transaction = await getTransactionByIdAPI({ id });
			this.state.transaction = transaction;
			this.transactionSubject.next(transaction);
		} catch (_e) {
			this.state.isErrorTransactions = true;
		} finally {
			this.state.isLoadingTransactions = false;
			this.transactionSubject.next(this.state.transaction);
		}
		return this.state.transaction;
	}

	async createNSTXTransfer({
		senderId,
		receiverId,
		amount,
		currency,
	}: {
		senderId: string;
		receiverId: string;
		amount: number;
		currency: string;
	}) {
		this.state.isLoadingTransactions = true;
		this.state.isErrorTransactions = false;
		this.transactionsSubject.next(this.state.transactions);

		try {
			await createNSTXTransferAPI({ senderId, receiverId, amount, currency });
		} catch (_e) {
			this.state.isErrorTransactions = true;
		} finally {
			this.state.isLoadingTransactions = false;
			this.transactionsSubject.next(this.state.transactions);
		}

		return this.state.transactions;
	}
}
