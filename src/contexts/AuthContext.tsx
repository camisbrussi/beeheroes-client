import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/apiCLient";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  name: string;
  permissions: string[];
  roles: string[];
};

export const AuthContext = createContext({} as AuthContextData);

// let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "beeheroes.token");
  destroyCookie(undefined, "beeheroes.refreshToken");

  // authChannel.postMessage("signOut");

  typeof window !== "undefined" && Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

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
          const { email, permissions, roles, name } = response.data;
          setUser({ email, permissions, roles, name });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", { email, password });

      const { token, refresh_token, permissions, roles, name } = response.data;

      setCookie(undefined, "beeheroes.token", token, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "beeheroes.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
        name,
      });

      api.defaults.headers["Authorization"] = `Barear ${token}`;

      Router.push("/profile");

      // authChannel.postMessage("signIn");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
