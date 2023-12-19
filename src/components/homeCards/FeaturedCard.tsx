import { Button, Image } from "@nextui-org/react";
import cardImage from "../../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { Hotel } from "../../@types/hotel";
import useAnimationInView from "../../hooks/useAnimationInView";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItem, removeItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface HotelProps {
  hotel: Hotel;
}

const FeaturedCard = ({ hotel }: HotelProps) => {
  const { controls, ref } = useAnimationInView();

  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (hotel: Hotel) => {
    const item = cart.find((item: any) => item.id === hotel.title);
    if (!item) {
      dispatch(addItem({ id: hotel.title, ...hotel }));
      toast.success("Added to cart");
    } else {
      dispatch(removeItem({ id: hotel.title, ...hotel }));
      toast.warn("Removed from cart");
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 120 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1 }}
      ref={ref}
    >
      <article className="w-[350px] mt-10 flex-col cursor-pointer bg-white dark:bg-slate-800 rounded-xl hover:transform hover:scale-105 duration-500 shadow-2xl">
        <Image
          src={hotel.roomPhotoUrl || cardImage}
          alt="card image"
          className="pb-5 max-h-[350px] w-[350px]"
        />
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col">
            <span className="text-xl mb-3">{hotel.title}</span>
            <span>{hotel.hotelName}</span>
            <div className="flex items-center gap-2 my-2">
              <GrLocation />
              <span>{hotel.cityName}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FaStar className="text-[#f8e42a]" />
              <span>{hotel.hotelStarRating}</span>
            </div>
            <span className="line-through text-red-400 mt-2 -ml-3">
              {hotel.originalRoomPrice}$
            </span>
            <span className="text-xl -mt-2 mr-2">{hotel.finalPrice}$</span>
          </div>
        </div>
        <p className="flex justify-between flex-col gap-4 mt-2 p-4">
          {hotel.description.length > 100
            ? hotel.description.slice(0, 100) + "..."
            : hotel.description}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              color="primary"
              as={Link}
              to={`/hotel/${Date.now()}`}
              className="text-white text-base"
            >
              See more details...
            </Button>
            <Button
              variant="flat"
              onClick={() => handleAddToCart(hotel)}
              className="text-white text-base bg-blue-500"
            >
              {cart.find((item: any) => item.id === hotel.title)
                ? "Remove from cart"
                : "Add to cart"}
            </Button>
          </div>
        </p>
      </article>
    </motion.div>
  );
};

export default FeaturedCard;
