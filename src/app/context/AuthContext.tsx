import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  signin: (token: string) => void;
  signout: () => void;
  isFetching: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
  });

  const signin = useCallback(
    (token: string) => {
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);

      if (isSuccess) {
        setSignedIn(true);
      }
    },
    [isSuccess]
  );

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
}
