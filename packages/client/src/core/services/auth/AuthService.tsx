import { BehaviorSubject, switchMap, of } from "rxjs";
import { login as loginAPI, register as registerAPI } from "../../../core/api/user";
import { User } from "@/core/interfaces";

export interface State {
  user?: User;
  token?: string;
  error?: string;
  loading?: boolean;
}

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

export class AuthService {
  private stateSubject = new BehaviorSubject<State>({});
  public state$ = this.stateSubject.asObservable();

  private authSubject = new BehaviorSubject<LoginCredentials | null>(null);
  private signupSubject = new BehaviorSubject<SignUpCredentials | null>(null);

  constructor() {
    this.authSubject.pipe(
        switchMap((credentials) => {
          if (!credentials) return of(null);
          this.stateSubject.next({ loading: true });
          return loginAPI(credentials).then(
              (token) => ({ token }),
              (error) => ({ error: error.message })
          );
        })
    ).subscribe((result) => {
      this.stateSubject.next({ ...result, loading: false });
    });

    this.signupSubject.pipe(
        switchMap((credentials) => {
          if (!credentials) return of(null);
          this.stateSubject.next({ loading: true });
          return registerAPI(credentials).then(
              (user) =>
                  loginAPI(credentials).then(
                      (token) => ({ user, token }),
                      (error) => ({ error: error.message })
                  ),
              (error) => ({ error: error.message })
          );
        })
    ).subscribe((result) => {
      this.stateSubject.next({ ...result, loading: false });
    });
  }

  login(credentials: LoginCredentials) {
    this.stateSubject.next({ loading: true });
    this.authSubject.next(credentials);
  }

  logout() {
    this.stateSubject.next({});
  }

  signup(credentials: SignUpCredentials) {
    this.stateSubject.next({ loading: true });
    this.signupSubject.next(credentials);
  }
}
