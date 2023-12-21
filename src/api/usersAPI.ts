import { API_BASE_URL } from "./baseURL";

export const userApiUrls = {
    getUserRoute: (userId: string) => `${API_BASE_URL}/api/users/${userId}`,
    signupUserRoute: `${API_BASE_URL}/api/auth/signup`,
    loginUserRoute: `${API_BASE_URL}/api/auth/authenticate`,
};
