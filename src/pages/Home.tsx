import React, { useEffect, useState } from "react";
import { Button, Image } from "@nextui-org/react";
import backgroundImageLight from "../assets/images/wallpaperflare.com_wallpaper (2).jpg";
import backgroundImageDark from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import { motion } from "framer-motion";

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

  return (
    <div className="bg-slate-200 dark:bg-[#070811] min-h-screen">
      <aside className="flex justify-center flex-col min-h-screen w-full">
        <div className="absolute top-0 left-0">
          <div className="bg-black opacity-40 h-full w-full absolute top-0 z-20" />
          <Image
            src={backgroundImage}
            alt="background image"
            className="lg:w-[100vw] h-screen object-cover bg-image relative"
          />
        </div>

        <article className="flex justify-center items-center text-white z-50 mt-32">
          <div className="text-center lg:w-[60%] w-[97%]">
            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="lg:text-[6rem] md:text-[4rem] text-[3rem] leading-tight">
                Plan Your <br /> Perfect Getaway
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
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
              transition={{ duration: 1 }}
            >
              <Button
                className="mt-16 text-lg text-whit"
                size="lg"
                color="primary"
                variant="shadow"
              >
                Getting Started
              </Button>
            </motion.div>
          </div>
        </article>
        <article className="h-[13rem] w-full rounded-xl bg-gray-100 dark:bg-gray-800 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] flex justify-center items-center text-white">
          <div>
            <span>location</span>
          </div>
        </article>
      </aside>
    </div>
  );
};

export default Home;
