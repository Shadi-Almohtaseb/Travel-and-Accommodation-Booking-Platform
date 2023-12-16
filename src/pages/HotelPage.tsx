import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import React, { useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import Loading from "../components/Loading";
import image1 from "../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import image2 from "../assets/images/wallpaperflare.com_wallpaper (2).jpg";
import image3 from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import useAnimationInView from "../hooks/useAnimationInView";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getHotelById } from "../redux/thunks/searchBarThunk";
import { toast } from "react-toastify";

export type HotelAmenity = {
  name: string;
  description: string;
};

const HotelPage = () => {
  const images = [image1, image2, image3, image1, image2, image3];
  const { controls, ref } = useAnimationInView();
  const dispatch = useDispatch<AppDispatch>();
  const { hotel } = useSelector((state: RootState) => state.searchBar);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        await dispatch(getHotelById(1));
      } catch (error) {
        console.log(error);
        toast.error("Can't get, something went wrong");
      }
    };

    fetchHotel();
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] dark:bg-[#0e0e10] bg-[#eaeaea] min-h-screen h-full">
      <article className="lg:sticky top-20 lg:max-w-[420px] min-w-[250px] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <div className="flex justify-center items-center w-full">
          <Image
            src={hotel?.imageUrl || image1}
            alt="hotel image"
            className="mb-5 max-h-[250px] w-full rounded-xl"
          />
        </div>
        <span className="text-3xl">{hotel?.hotelName}</span>
        <div className="flex gap-2 my-5">
          <GrLocation size={30} />
          <span className="text-xl">{hotel?.location}</span>
        </div>
        <p className="mb-5">{hotel?.description}</p>
        <span className="text-lg font-semibold">Amenities:</span>
        <div className="mb-8">
          {hotel?.amenities && (
            <Accordion
              showDivider={false}
              className="p-2 flex flex-col gap-1 w-full my-2"
              variant="shadow"
              itemClasses={itemClasses}
            >
              {hotel.amenities.map((amenity: HotelAmenity) => (
                <AccordionItem
                  key={amenity.name}
                  aria-label={amenity.name}
                  title={amenity.name}
                >
                  {amenity.description}
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        <span className="flex items-center gap-2 text-xl mb-2">
          <span>Rating: </span>
          {hotel?.starRating}
          <FaStar className="text-[#f8e42a]" />
        </span>
        <div className="text-lg">Available Rooms: {hotel?.availableRooms}</div>
      </article>
      <article className="lg:max-w-[77%] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        {false ? (
          <Loading />
        ) : (
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
                {images && images.length > 0 ? (
                  images.map((imageURL) => (
                    <div className="flex items-center gap-10 px-2">
                      <Image
                        key={imageURL}
                        src={imageURL}
                        alt="hotel image"
                        className="mb-5 max-h-[350px] w-full rounded-xl"
                      />
                    </div>
                  ))
                ) : (
                  <p>No trending hotels available.</p>
                )}
              </Carousel>
            </div>
          </motion.div>
        )}

        <div className="mt-16">
          <span>Available Rooms</span>
        </div>
      </article>
    </div>
  );
};

const itemClasses = {
  base: "py-0 w-full",
  title: "font-normal text-medium",
  trigger:
    "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
  indicator: "text-medium",
  content: "text-small px-2",
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 2,
    slidesToSlide: 1,
  },
  smallTablet: {
    breakpoint: { max: 1200, min: 780 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 780, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default HotelPage;
