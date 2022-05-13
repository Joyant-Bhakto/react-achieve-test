import { useMemo } from "react";
import { useAppSelector } from "./store";
import { selectIsAuthenticated } from "@store/slices/authSlice";

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return useMemo(() => ({ isAuthenticated }), [isAuthenticated]);
};
