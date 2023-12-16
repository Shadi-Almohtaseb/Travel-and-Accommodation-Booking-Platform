import { Image } from "@nextui-org/react";
import cardImage from "../../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { Hotel } from "../../@types/hotel";
import useAnimationInView from "../../hooks/useAnimationInView";
import { motion } from "framer-motion";

interface HotelProps {
  hotel: Hotel;
}

const FeaturedCard = ({ hotel }: HotelProps) => {
  const { controls, ref } = useAnimationInView();

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
        <p className="mt-2 p-4">
          {hotel.description.length > 100
            ? hotel.description.slice(0, 100) + "..."
            : hotel.description}
        </p>
      </article>
    </motion.div>
  );
};

export default FeaturedCard;
