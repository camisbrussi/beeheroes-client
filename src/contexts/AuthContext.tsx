import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/apiCLient";
import { UserSignIn } from "../@types/user";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: UserSignIn;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserSignIn>();
  const isAuthenticated = !!user;

  function signOut() {
    destroyCookie(undefined, "beeheroes.token");
    destroyCookie(undefined, "beeheroes.refreshToken");

    // authChannel.postMessage("signOut");

    typeof window !== "undefined" && Router.push("/");
    setUser(null);
  }

  // useEffect(() => {
  //   authChannel = new BroadcastChannel("auth");
  //   authChannel.onmessage = (message: MessageEvent) => {
  //     switch (message.data) {
  //       case "signOut":
  //         signOut();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const { "beeheroes.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, email, permissions, roles, name, avatar } = response.data;
          setUser({ id, email, permissions, roles, name, avatar });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", { email, password });

      const { token, refresh_token, permissions, roles, name, id, avatar } =
        response.data;

      setCookie(undefined, "beeheroes.token", token, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "beeheroes.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: "/",
      });

      setUser({
        id,
        email,
        permissions,
        roles,
        name,
        avatar,
      });

      api.defaults.headers["Authorization"] = `Barear ${token}`;

      Router.back();

      return;

      // authChannel.postMessage("signIn");
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
