import axios from "axios";

import { useSpinnerStore } from "../stores/spinner";
import { getActivePinia } from "pinia";
import { useAuthStore } from "../stores/storeAuth";

const showSpinner = () => {
  const pinia = getActivePinia();
  if (pinia) {
    const spinnerStore = useSpinnerStore();
    spinnerStore.show();
  }
};

const hideSpinner = () => {
  const pinia = getActivePinia();
  if (pinia) {
    const spinnerStore = useSpinnerStore();
    spinnerStore.hide();
  }
};

const productApi = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//API BE
const apiMain = axios.create({
  baseURL: "https://localhost:7275/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];


apiMain.interceptors.request.use(
  (config) => {
    showSpinner();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

apiMain.interceptors.response.use(
  (response) => {
    hideSpinner();
    return response;
  },
  async (error) => {
    showSpinner();
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        hideSpinner();
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiMain(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const AccessToken = await localStorage.getItem("accessToken");
        console.log('accessTokenn: ', AccessToken);

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          hideSpinner();
          throw new Error("No refresh token");
        }

        console.log('Refesh Token');


        const response = await axios.post("https://localhost:7275/api/auth/refresh-token", {
          AccessToken,
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiMain(originalRequest);
      } catch (err) {
        hideSpinner();
        console.error("Refresh Token failed, logging out...");
        const authStore = useAuthStore();
        authStore.isAuthenticated = false;
        authStore.userRole = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/practice4";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    hideSpinner();
    return Promise.reject(error);
  },
);


// 


const api = axios.create({
  baseURL: "https://api.agify.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    showSpinner();
    return config;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    hideSpinner();
    return response;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

productApi.interceptors.request.use(
  (config) => {
    showSpinner();
    return config;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

productApi.interceptors.response.use(
  (response) => {
    hideSpinner();
    return response;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

export { productApi, api, apiMain };