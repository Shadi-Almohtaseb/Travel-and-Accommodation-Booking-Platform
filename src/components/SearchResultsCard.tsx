import React from "react";
import cardImage from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import { Button, Image, Link } from "@nextui-org/react";
import { Hotel, SearchResultHotel } from "../@types/hotel";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addItem, removeItem } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

interface SearchResultsCardProps {
  item: SearchResultHotel;
}

const SearchResultsCard = ({ item }: SearchResultsCardProps) => {
  const fullStars = Math.floor(item.starRating);
  const emptyStars = Math.floor(5 - item.starRating);

  const fullStarsArray = Array.from({ length: fullStars });
  const emptyStarsArray = Array.from({ length: emptyStars });

  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (hotel: SearchResultHotel) => {
    const item = cart.find((item: any) => item.id === hotel.hotelName);
    if (!item) {
      dispatch(addItem({ id: hotel.hotelName, ...hotel }));
      toast.success("Added to cart");
    } else {
      dispatch(removeItem({ id: hotel.hotelName, ...hotel }));
      toast.warn("Removed from cart");
    }
  };

  return (
    <article className="flex gap-5 dark:bg-default-200 bg-[#f5f5f5] p-5 rounded-xl shadow-2xl">
      <Image
        src={item.roomPhotoUrl || cardImage}
        alt="hotel image"
        width={400}
        className="max-h-[200px]"
      />
      <div className="flex flex-col justify-between gap-6 w-full">
        <div className="flex flex-col gap-2">
          <div className="text-xl flex items-center justify-between w-full">
            <span>{item.hotelName}</span>
            <div className="flex flex-col">
              <span className="text-red-400 text-sm">
                {item.discount * 100}% off
              </span>
              <span className="text-lg">
                Price:{" "}
                <span className="text-green-400 font-bold">
                  {item.roomPrice}$
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GrLocation />
            <span>{item.cityName}</span>
          </div>
          <span>
            Room Type: <span className="font-semibold">{item.roomType}</span>
          </span>
          <div className="flex items-center gap-2">
            {/* Render full stars */}
            {fullStarsArray.map((_, index) => (
              <FaStar key={`full-${index}`} className="text-[#f8e42a]" />
            ))}

            {/* Render empty stars */}
            {emptyStarsArray.map((_, index) => (
              <FaStar key={`empty-${index}`} className="text-gray-400" />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button
            color="primary"
            variant="flat"
            className="dark:text-white  text-base"
            as={Link}
            href={`/hotel/${item.latitude}${item.longitude}}`}
          >
            See more details...
          </Button>
          <Button
            variant="shadow"
            color="primary"
            onClick={() => handleAddToCart(item)}
          >
            {cart.find((cartItem: any) => cartItem.id === item.hotelName)
              ? "Remove from cart"
              : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SearchResultsCard;
