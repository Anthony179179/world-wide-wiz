import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./authContext";

function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

  useEffect(() => {
    const isAuth = async () => {
      cookies.loggedIn ? setAuth(true) : setAuth(false); // This is an experiment
      if (!auth) {
        try {
          const res = await axios.get("/api/logincheck"); // I'll add this in later probably
          console.log(res.status);
          if (res.status === 200) {
            setUser(res.data);
          }
        } catch (error) {
          let err = error as Object;
          console.log(err.toString());
          setUser(null);
        }
      }
    };
    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
