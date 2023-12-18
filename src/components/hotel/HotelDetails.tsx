import React from "react";
import { SearchedHotel } from "../../@types/hotel";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import image1 from "../../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import { HotelAmenity } from "../../pages/HotelPage";
import Loading from "../Loading";

interface HotelDetailsProps {
  hotel: SearchedHotel | null;
  loading: boolean;
}

const HotelDetails = ({ hotel, loading }: HotelDetailsProps) => {
  return (
    <article className="lg:sticky top-20 lg:max-w-[370px] min-w-[250px] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
      {loading ? (
        <Loading />
      ) : (
        <div>
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
          <div className="text-lg">
            Available Rooms: {hotel?.availableRooms}
          </div>
        </div>
      )}
    </article>
  );
};
const itemClasses = {
  base: "py-0 w-full",
  title: "font-normal text-medium",
  trigger:
    "px-2 py-0 data-[hover=true]:bg-default-200 rounded-lg h-12 flex items-center",
  indicator: "text-medium dark:text-white text-black",
  content: "text-small px-2 bg-default-100 rounded-xl",
};

export default HotelDetails;
