import { API_BASE_URL } from "./baseURL";

export const searchBarApiUrls = {
    searchHotelsRoute: (cityName: string, checkInDate: string, checkOutDate: string, adults: number, children: number) => `${API_BASE_URL}/api/home/search?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&city=${cityName}&starRate=5&sort=up&numberOfRooms=1&adults=${adults}&children=${children}`,
    getHotelRoute: (hotelId: number) => `${API_BASE_URL}/api/hotels/${hotelId}?includeRooms=false`,
    getRoomsOfHotelRoute: (hotelId: number) => `${API_BASE_URL}/api/hotels/${hotelId}/rooms?checkInDate=55&checkOutDate=55`,
    getImagesOfHotelRoute: (hotelId: number) => `${API_BASE_URL}/api/hotels/${hotelId}/gallery`,
};
