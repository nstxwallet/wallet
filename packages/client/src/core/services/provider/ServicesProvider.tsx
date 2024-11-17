import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Loading } from "@/shared/components";
import { container } from "@/core/services/provider/services";
import { AuthService } from "@/core/services/auth/AuthService";
import { BalanceService } from "@/core/services/balance";
import ToastProvider from "@/core/services/provider/ToastProvider";
import "reflect-metadata";

interface Services {
  authService: AuthService;
  balanceService: BalanceService;
}

interface ServicesProviderProps {
	children: ReactNode;
}

export const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider: FC<ServicesProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Services | null>(null);

  useEffect(() => {
    const init = async () => {
      const authService = container.resolve(AuthService);
      const balanceService = container.resolve(BalanceService);

      setServices({ authService, balanceService });
      setLoading(false);
    };

    init();
  }, []);

  if (loading || !services) {
    return <Loading />;
  }

  return (
    <ServicesContext.Provider value={services}>
      <ToastProvider />
      {children}
    </ServicesContext.Provider>
  );
};
