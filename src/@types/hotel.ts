export type Hotel = {
    title: string;
    hotelName: string;
    cityName: string;
    roomPhotoUrl: string;
    hotelStarRating: number;
    originalRoomPrice: number;
    finalPrice: number;
    description: string;
    discountPercentage: number;
};

export type trendingHotel = {
    countryName: string;
    cityName: string;
    thumbnailUrl: string;
    description: string;
};

export type recentlyVisitedHotel = {
    cityName: string,
    hotelName: string
    starRating: number
    thumbnailUrl: string
};
