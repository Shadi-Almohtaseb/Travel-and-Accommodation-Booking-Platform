import { API_BASE_URL } from "./baseURL";

export const homeApiUrls = {
    featuredHotelsRoute: `${API_BASE_URL}/api/home/featured-deals`,
    UsersRecentlyVisitedRoute: (userId: number) => `${API_BASE_URL}/users/${userId}/recent-hotels`,
    trendingHotelsRoute: `${API_BASE_URL}/destinations/trending`,
    searchHotelsRoute: (hotelName: string) => `${API_BASE_URL}/api/hotels?name=${hotelName}&pageSize=10&pageNumber=1`,
    searchResultsRoute: `${API_BASE_URL}/api/SearchResults`,
};
