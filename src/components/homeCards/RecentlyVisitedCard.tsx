import { Image } from "@nextui-org/react";
import cardImage from "../../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { recentlyVisitedHotel } from "../../@types/hotel";
import useAnimationInView from "../../hooks/useAnimationInView";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface HotelProps {
  hotel: recentlyVisitedHotel;
}

const RecentlyVisitedCard = ({ hotel }: HotelProps) => {
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
      <article className="w-[350px] mt-10 pb-3 flex-col cursor-pointer bg-white dark:bg-slate-800 rounded-xl hover:transform hover:scale-105 duration-500 shadow-2xl">
        <Image
          src={hotel.thumbnailUrl || cardImage}
          alt="card image"
          className="pb-5 max-h-[350px] w-[350px]"
        />
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col">
            <span className="text-xl mb-3">{hotel.hotelName}</span>
            <div className="flex items-center gap-2 my-2">
              <GrLocation />
              <span>{hotel.cityName}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FaStar className="text-[#f8e42a]" />
              <span>{hotel.starRating}</span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default RecentlyVisitedCard;
