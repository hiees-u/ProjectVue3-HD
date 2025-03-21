import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";
import { apiMain } from '../utils/api';

interface AuthState {
    isAuthenticated: boolean;
    userRole: string | null;
};

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        userRole: null
    }),

    getters: {
        getIsAuthenticated: (state): boolean => state.isAuthenticated,
        getUserRole: (state): string | null => state.userRole,
    },

    actions: {
        async login(username: string, password: string) {
            try {
                const response = await apiMain.post("Auth/login", { username, password });
                const accessToken = response.data.accessToken
                const refreshToken = response.data.refreshToken

                const decoded: any = jwtDecode(accessToken);
                this.userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
                this.isAuthenticated = true;

                localStorage.setItem("accessToken", accessToken); // Lưu token vào localStorage
                localStorage.setItem("refreshToken", refreshToken); // Lưu token vào localStorage

                console.log("Login success:", this.userRole);
                return true;
            } catch (error) {
                console.error("Login failed:", error);
                return false;
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.userRole = null;
            localStorage.removeItem("accessToken");
        },
        checkAuth() {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const decoded: any = jwtDecode(token);
                this.userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
                this.isAuthenticated = true;
            }
        },
    },
});