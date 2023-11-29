import { API_BASE_URL } from "./baseURL";

export const userApiUrls = {
    getUserRoute: (userId: string) => `${API_BASE_URL}/users/${userId}`,
    signupUserRoute: `${API_BASE_URL}/auth/signup`,
    loginUserRoute: `${API_BASE_URL}/auth/login`,
};
