import { HotelAmenity } from "../pages/HotelPage";

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

// searchBar slice types
export type SearchedHotel = {
  hotelName: string;
  description: string;
  imageUrl: string;
  location: string;
  longitude: number;
  latitude: number;
  starRating: number;
  availableRooms: number;
  amenities: HotelAmenity[];
}

export type RoomAmenity = {
  name: string;
  description: string;
}

export type Room = {
  roomNumber: number,
  roomPhotoUrl: string,
  roomType: string,
  capacityOfAdults: number,
  capacityOfChildren: number,
  price: number,
  availability: boolean,
  roomAmenities: RoomAmenity[],
}

export type HotelImage = {
  id: number,
  url: string,
}