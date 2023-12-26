import { API_BASE_URL } from "./baseURL";

export const homeApiUrls = {
    featuredHotelsRoute: `${API_BASE_URL}/api/home/featured-deals`,
    UsersRecentlyVisitedRoute: (userId: number) => `${API_BASE_URL}/api/home/users/${userId}/recent-hotels`,
    trendingHotelsRoute: `${API_BASE_URL}/api/home/destinations/trending`,
};
