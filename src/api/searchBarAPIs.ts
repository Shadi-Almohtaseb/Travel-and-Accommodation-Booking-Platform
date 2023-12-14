import { API_BASE_URL } from "./baseURL";

export const searchBarApiUrls = {
    searchHotelsRoute: (cityName: string) => `${API_BASE_URL}/api/home/search?city=${cityName}&numberOfRooms=1&adults=2&children=0`,
    getHotelRoute: (hotelId: number) => `${API_BASE_URL}/api/hotels/${hotelId}?includeRooms=false`,
    getRoomsOfHotelRoute: (hotelId: number) => `${API_BASE_URL}/api/hotels/${hotelId}/rooms`,
};
