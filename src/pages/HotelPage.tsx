import { Image } from "@nextui-org/react";
import React, { useEffect } from "react";

import Carousel from "react-multi-carousel";
import Loading from "../components/Loading";
import useAnimationInView from "../hooks/useAnimationInView";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getHotelById,
  getHotelImages,
  getRoomsOfHotel,
} from "../redux/thunks/searchBarThunk";
import { toast } from "react-toastify";
import Rooms from "../components/hotel/Rooms";
import { HotelImage, Room } from "../@types/hotel";
import HotelDetails from "../components/hotel/HotelDetails";
import HotelImages from "../components/hotel/HotelImages";

export type HotelAmenity = {
  name: string;
  description: string;
};

const HotelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { hotel, rooms, hotelImages, loading } = useSelector(
    (state: RootState) => state.searchBar
  );

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        await dispatch(getHotelById(1));
        await dispatch(getRoomsOfHotel(1));
        await dispatch(getHotelImages(1));
      } catch (error) {
        console.log(error);
        toast.error("Can't get, something went wrong");
      }
    };
    fetchHotel();
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] dark:bg-[#0e0e10] bg-[#eaeaea] min-h-screen h-full">
      <HotelDetails loading={loading} hotel={hotel} />
      <article className="lg:max-w-[77%] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <HotelImages loading={loading} hotelImages={hotelImages} />
        <div className="flex flex-col gap-5 mt-16">
          {rooms?.map((room: Room) => {
            return <Rooms key={Math.random()} room={room} />;
          })}
        </div>
      </article>
    </div>
  );
};

export default HotelPage;
