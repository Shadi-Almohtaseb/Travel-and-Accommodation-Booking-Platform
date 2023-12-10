import React, { useEffect, useState } from "react";
import { Button, Image, Link } from "@nextui-org/react";
import backgroundImageLight from "../assets/images/wallpaperflare.com_wallpaper (2).jpg";
import backgroundImageDark from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  featuredHotels as featuredHotelsFun,
  trendingHotels as trendingHotelsFun,
  recentlyVisitedHotels as RecentlyVisitedHotelsFun,
} from "../redux/thunks/homeThunk";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../redux/store";
import GettingStarted from "../components/GettingStarted";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageLight);

  useEffect(() => {
    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme") || "Light";
      setBackgroundImage(
        theme === "Dark" ? backgroundImageDark : backgroundImageLight
      );
    };

    handleThemeChange();
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { featuredHotels, trendingHotels, hotelsRecentlyVisited, loading } =
    useSelector((state: RootState) => state.home);

  useEffect(() => {
    const fetchData = async (fetchFunction: any, ...args: any[]) => {
      try {
        await dispatch(fetchFunction(...args));
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      }
    };

    const userId = Math.floor(Math.random() * 100) + 1; // Generate a consistent userId or get it from your authentication system

    fetchData(featuredHotelsFun);
    fetchData(RecentlyVisitedHotelsFun, userId);
    fetchData(trendingHotelsFun);
  }, [dispatch]);

  return (
    <div className="bg-slate-200 dark:bg-[#070811] min-h-screen h-full">
      <main className="flex justify-center flex-col min-h-screen w-full">
        <div className="absolute top-0 left-0">
          <div className="bg-black opacity-30 h-full w-full absolute top-0 z-20" />
          <Image
            src={backgroundImage}
            alt="background image"
            className="lg:w-[100vw] h-screen object-cover bg-image relative"
          />
        </div>

        <article className="flex justify-center items-center text-white z-40">
          <div className="text-center lg:w-[60%] w-[97%]">
            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="lg:text-[6rem] md:text-[4rem] text-[3rem] leading-tight">
                Plan Your <br /> Perfect Getaway
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="mt-10 lg:text-[1.4rem] text-[1rem]">
                Explore our travel platform to discover amazing destinations
                around the world. Whether you're seeking a relaxing beach
                retreat, an adventurous mountain trek, or a cultural city
                experience, we have the perfect options for you. Our
                user-friendly interface and comprehensive search tools make it
                easy to find and book your dream vacation. Trust us to turn your
                travel aspirations into unforgettable memories.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Link href="#getting-started">
                <Button
                  className="mt-16 text-lg"
                  size="lg"
                  color="primary"
                  variant="shadow"
                >
                  Getting Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </article>
      </main>
      <GettingStarted
        featuredHotels={featuredHotels}
        trendingHotels={trendingHotels}
        hotelsRecentlyVisited={hotelsRecentlyVisited}
        loading={loading}
      />
    </div>
  );
};

export default Home;
