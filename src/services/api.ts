import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

export function setupApiClient(ctx = undefined) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies["beeheroes.token"]}`,
    },
  });

  api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response?.data?.message === "jwt expired") {
          cookies = parseCookies(ctx);

          const { "beeheroes.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post("/refreshtoken", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "beeheroes.token", token, {
                  maxAge: 60 * 60 * 25 * 30, // 30 days
                  path: "/",
                });

                setCookie(
                  ctx,
                  "beeheroes.refreshToken",
                  response.data?.refresh_token,
                  {
                    maxAge: 60 * 60 * 25 * 30, // 30 days
                    path: "/",
                  }
                );

                api.defaults.headers["Authorization"] = `Barear ${token}`;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];

                if (process.browser) {
                  //signOut();
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Barear ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          // signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
