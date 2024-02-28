import { createContext } from "react";

export interface AuthObj {
    auth: boolean | null,
    setAuth: React.Dispatch<React.SetStateAction<boolean | null>>,
    user: string | null,
    setUser: React.Dispatch<React.SetStateAction<string | null>>,
}

export const AuthContext = createContext<AuthObj>({
    auth: null,
    setAuth: () => {},
    user: null,
    setUser: () => {}
});
