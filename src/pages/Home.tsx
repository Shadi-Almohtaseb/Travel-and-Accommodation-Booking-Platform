import React, { useEffect, useState } from "react";
import ChildrenModal from "../components/modals/ChildrenModal";
import { Button, Image, Input, Link } from "@nextui-org/react";
import backgroundImageLight from "../assets/images/wallpaperflare.com_wallpaper (2).jpg";
import backgroundImageDark from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import { motion } from "framer-motion";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { featuredHotels } from "../redux/thunks/homeThunk";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import Card from "../components/Card";
import { Hotel } from "../@types/hotel";
import Loading from "../components/Loading";

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

  const dispatch = useDispatch();
  const { hotels, isError, loading } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    try {
      dispatch(featuredHotels() as any);
    } catch (error: any) {
      toast.error(error);
    }
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
      <section id="getting-started" className="min-h-screen h-full py-5">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-14 lg:mx-16 rounded-lg bg-slate-100 shadow-2xl dark:bg-slate-800 py-7 px-5 mt-16">
            <div className="flex items-center gap-3 w-full">
              <GrLocation size={35} />
              <Input type="text" label="Location" className="shadow-lg" />
            </div>
            <div className="flex items-center gap-3 w-full">
              <FaRegCalendarAlt size={27} />
              <Input type="date" className="shadow-lg" />
            </div>
            <div className="flex items-center gap-3 w-full">
              <MdFamilyRestroom size={35} />
              <ChildrenModal />
            </div>
          </div>
        </motion.div>
        <div className="lg:mx-10 mx-3 mt-14">
          <span className="text-3xl">Featured Deals</span>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex justify-center flex-wrap gap-10">
              {hotels?.map((hotel: Hotel, index: number) => {
                return <Card key={index} hotel={hotel} />;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
