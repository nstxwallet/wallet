"use client"

import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { BehaviorSubject, from, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import {
  Balance,
  createUserBalance as createBalanceAPI,
  getUserBalance as getBalanceAPI,
  getUserBalances as getBalancesAPI,
  User,
} from "@/core";

@injectable()
export class BalanceService {
  private readonly balancesSubject = new BehaviorSubject<Balance[] | null>(null);
  private readonly balanceSubject = new BehaviorSubject<Balance | null>(null);

   constructor(
      @inject("UserStream") private readonly user$: Observable<User | null>
  ) {
    this.initBalancesSubscription();
  }
  public balance = this.balanceSubject.asObservable();
  public balances = this.balancesSubject.asObservable();

  get balances$(): Observable<Balance[] | null> {
    return this.balancesSubject.asObservable();
  }


  private get userId(): string | null {
    let userId: string | null = null;
    this.user$.subscribe(user => {
      userId = user?.id || null;
    }).unsubscribe();
    return userId;
  }

  fetchBalances(): Observable<Balance[]> {
    return this.getBalancesAPI().pipe(
        tap((balances) => this.updateBalances(balances))
    );
  }

  fetchBalance(id: string): Observable<Balance> {
    return this.getBalanceAPI(id).pipe(
        tap((balance) => this.updateBalance(balance))
    );
  }

  createBalance(currency: string): Observable<Balance> {
    return this.createBalanceAPI(currency).pipe(
        tap((newBalance) => this.addNewBalance(newBalance))
    );
  }

  private initBalancesSubscription(): void {
    this.user$
        .pipe(
            switchMap((user) => (user ? this.fetchBalances() : from([])))
        )
        .subscribe();
  }

  private getBalancesAPI(): Observable<Balance[]> {
    const userId = this.userId;
    if (userId) {
      return from(getBalancesAPI({ userId }));
    }
    return from([]);
  }

  private getBalanceAPI(id: string): Observable<Balance> {
    const userId = this.userId;
    if (userId) {
      return from(getBalanceAPI({ userId, id }));
    }
    return from([]);
  }

  private createBalanceAPI(currency: string): Observable<Balance> {
    const userId = this.userId;
    if (userId) {
      return from(createBalanceAPI({  currency }));
    }
    return from([]);
  }

  private updateBalances(balances: Balance[]): void {
    this.balancesSubject.next(balances);
  }

  private updateBalance(balance: Balance): void {
    this.balanceSubject.next(balance);
  }

  private addNewBalance(newBalance: Balance): void {
    const currentBalances = this.balancesSubject.getValue() || [];
    this.balancesSubject.next([...currentBalances, newBalance]);
  }
}
