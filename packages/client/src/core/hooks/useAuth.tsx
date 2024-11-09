
import { useServices } from "./useServices";
import {useObservable} from "@/core/hooks/useObservable";

export const useAuth = () => {
    const { authService } = useServices();

  const authState = useObservable(authService.state$);

  const isAuthenticated = !!authState?.user;

  const login = async (values: { email: string; password: string }) => {
    authService.login(values);
  };

  const logout = async () => {
    authService.logout();
  };

  const signup = async (values: { email: string; password: string; firstName: string; lastName: string }) => {
    authService.signup(values);
  }

  const user = authState?.user;

  return { login, logout, isAuthenticated, signup , user };
};
