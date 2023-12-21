import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import ChildrenModal from "../components/modals/ChildrenModal";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { Hotel, recentlyVisitedHotel, trendingHotel } from "../@types/hotel";
import useAnimationInView from "../hooks/useAnimationInView";
import FeaturedCardsContainer from "./cardsContainers/FeaturedCardsContainer";
import RecentlyVisitedCardContainer from "./cardsContainers/RecentlyVisitedCardContainer";
import TrendingCardContainer from "./cardsContainers/TrendingCardContainer";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { City } from "../redux/slices/citySlice";
import { getAllCitiesThunk } from "../redux/thunks/cityThunk";
import { toast } from "react-toastify";
import { searchForHotels } from "../redux/thunks/searchBarThunk";
import { useNavigate } from "react-router-dom";

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
  const [adults, setAdults] = React.useState<number>(2);
  const [children, setChildren] = React.useState<number>(0);
  const [rooms, setRooms] = React.useState<number>(1);
  const [checkInDate, setCheckInDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [checkOutDate, setCheckOutDate] = React.useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [city, setCity] = React.useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useSelector((state: RootState) => state.city);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        await dispatch(getAllCitiesThunk());
      } catch (error) {
        console.log(error);
        toast.error("Can't get, something went wrong");
      }
    };

    fetchCities();
  }, [dispatch]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      await dispatch(
        searchForHotels({ city, checkInDate, checkOutDate, adults, children })
      ).unwrap();
      if (city) {
        navigate("/search-results");
      }
    } catch (error) {
      toast.error("Can't get, something went wrong");
    }
  };

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
          <div className="flex items-center gap-3  lg:w-[60%] w-full">
            <GrLocation size={35} />
            <Autocomplete label="Location" className="max-w-xs">
              {(cities as City[]).map((city: City) => (
                <AutocompleteItem
                  key={city.id}
                  value={city.name}
                  onClick={() => setCity(city.name)}
                >
                  {city.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex items-center lg:flex-row flex-col gap-10 w-full">
            <div className="flex items-center gap-3 w-full">
              <FaRegCalendarAlt size={27} />
              <Input
                type="date"
                className="shadow-lg"
                title="Check-In Date"
                placeholder="Check-In Date"
                label="Check-In Date"
                onChange={(e) => setCheckInDate(e.target.value)}
                value={checkInDate}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <FaRegCalendarAlt size={27} />
              <Input
                type="date"
                className="shadow-lg"
                title="Check-Out Date"
                placeholder="Check-Out Date"
                label="Check-Out Date"
                onChange={(e) => setCheckOutDate(e.target.value)}
                value={checkOutDate}
              />
            </div>
          </div>
          <div className="flex items-center lg:flex-row flex-col gap-10 w-full">
            <div className="flex items-center gap-3">
              <MdFamilyRestroom size={35} />
              <ChildrenModal
                setAdults={setAdults}
                setChildren={setChildren}
                setRooms={setRooms}
              />
            </div>
            <div className="flex items-center flex-col gap-1">
              <span>Adults: {adults}</span>
              <span>Children: {children}</span>
              <span>Rooms: {rooms}</span>
            </div>
            <Button color="primary" variant="shadow" onClick={handleSearch}>
              Search
            </Button>
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
