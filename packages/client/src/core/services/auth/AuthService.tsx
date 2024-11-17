"use client";

import "reflect-metadata";
import { injectable } from "tsyringe";
import { BehaviorSubject } from "rxjs";
import {
  getUser as getUserAPI,
  login as loginAPI,
  logout as logoutAPI,
  register as registerAPI,
  User
} from "@/core";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Token {
  accessToken: string;
}

@injectable()
export class AuthService {
  private tokenSubject = new BehaviorSubject<Token | null>(null);
  public token = this.tokenSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  private authSubject = new BehaviorSubject<LoginCredentials | null>(null);
  private signupSubject = new BehaviorSubject<SignUpCredentials | null>(null);

  constructor() {
    console.log("AuthService initialized");
    this.initAuthSubscription();
    this.initSignupSubscription();
    this.initUserSubscription();

    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        this.tokenSubject.next({ accessToken: token });
        this.getUser().then((r) => r);
      }
    }
  }

  login(credentials: LoginCredentials) {
    this.authSubject.next(credentials);
  }

  logout() {
    this.logoutUser().then((r) => r);
    this.authSubject.next(null);
  }

  signup(credentials: SignUpCredentials) {
    this.signupSubject.next(credentials);
  }

  private async logoutUser() {
    try {
      await logoutAPI();
      this.tokenSubject.next(null);
      this.userSubject.next(null);
    } catch (_e) {
      this.tokenSubject.next(null);
      this.userSubject.next(null);
    }
  }

  private async getUser() {
    try {
      const user = await getUserAPI();
      this.userSubject.next(user);
    } catch (_e) {
      this.userSubject.next(null);
    }
  }

  private initAuthSubscription() {
    this.authSubject.subscribe(async (credentials) => {
      if (credentials) {
        try {
          const token = await loginAPI(credentials);
          this.tokenSubject.next({ accessToken: token });
          if (typeof window !== "undefined") {
            sessionStorage.setItem("token", token);
          }
        } catch (_e) {
          this.tokenSubject.next(null);
        }
      }
    });
  }

  private initSignupSubscription() {
    this.signupSubject.subscribe(async (credentials) => {
      if (credentials) {
        try {
          const user = await registerAPI(credentials);
          this.userSubject.next(user);
        } catch (_e) {
          this.userSubject.next(null);
        }
      }
    });
  }

  private initUserSubscription() {
    this.tokenSubject.subscribe(async (token) => {
      if (token) {
        await this.getUser();
      } else {
        this.userSubject.next(null);
      }
    });
  }
}
