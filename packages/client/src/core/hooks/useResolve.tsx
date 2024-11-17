import { useMemo } from "react";
import { container, InjectionToken } from "tsyringe";import "reflect-metadata"

export  const useResolve = <T,>(token: InjectionToken<T>): T => {
    return useMemo(() => container.resolve(token), [token]);

}