import React from "react";
import "react-multi-carousel/lib/styles.css";
import ChildrenModal from "../components/modals/ChildrenModal";
import { Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Hotel, trendingHotel } from "../@types/hotel";
import Loading from "../components/Loading";
import useAnimationInView from "../hooks/useAnimationInView";
import Carousel from "react-multi-carousel";
import FeaturedCard from "./FeaturedCard";
import TrendingCard from "./TrendingCard";

interface gettingStartedProps {
  featuredHotels: Hotel[];
  trendingHotels: trendingHotel[];
  loading: boolean;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 1,
  },
  smallTablet: {
    breakpoint: { max: 1200, min: 780 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 780, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const GettingStarted = ({
  featuredHotels,
  trendingHotels,
  loading,
}: gettingStartedProps) => {
  const { controls, ref } = useAnimationInView();

  return (
    <section id="getting-started" className="min-h-screen h-full py-5">
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
        <div className="flex md:flex-row flex-col items-center gap-14 lg:mx-16 rounded-lg bg-slate-100 shadow-2xl dark:bg-slate-800 py-7 px-5 mt-16">
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
          <div>
            <Carousel
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px flex justify-center pb-12"
            >
              {featuredHotels && featuredHotels.length > 0 ? (
                featuredHotels.map((hotel: Hotel) => (
                  <FeaturedCard key={hotel.title} hotel={hotel} />
                ))
              ) : (
                <p>No trending hotels available.</p>
              )}
            </Carousel>
          </div>
        )}
      </div>
      <div className="lg:mx-10 mx-3">
        <span className="text-3xl">Trending Destination</span>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Carousel
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px flex justify-center pb-12"
            >
              {trendingHotels && trendingHotels.length > 0 ? (
                trendingHotels.map((hotel: trendingHotel) => (
                  <TrendingCard key={hotel.cityName} hotel={hotel} />
                ))
              ) : (
                <p>No trending hotels available.</p>
              )}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default GettingStarted;
