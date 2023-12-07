import React from "react";
import "react-multi-carousel/lib/styles.css";
import ChildrenModal from "../components/modals/ChildrenModal";
import { Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Hotel, recentlyVisitedHotel, trendingHotel } from "../@types/hotel";
import useAnimationInView from "../hooks/useAnimationInView";
import FeaturedCardsContainer from "./cardsContainers/FeaturedCardsContainer";
import RecentlyVisitedCardContainer from "./cardsContainers/RecentlyVisitedCardContainer";
import TrendingCardContainer from "./cardsContainers/TrendingCardContainer";

interface gettingStartedProps {
  featuredHotels: Hotel[];
  trendingHotels: trendingHotel[];
  hotelsRecentlyVisited: recentlyVisitedHotel[];
  loading: boolean;
}

const GettingStarted = ({
  featuredHotels,
  trendingHotels,
  hotelsRecentlyVisited,
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
      <FeaturedCardsContainer
        featuredHotels={featuredHotels}
        loading={loading}
      />
      <TrendingCardContainer
        trendingHotels={trendingHotels}
        loading={loading}
      />
      <RecentlyVisitedCardContainer
        hotelsRecentlyVisited={hotelsRecentlyVisited}
        loading={loading}
      />
    </section>
  );
};

export default GettingStarted;
