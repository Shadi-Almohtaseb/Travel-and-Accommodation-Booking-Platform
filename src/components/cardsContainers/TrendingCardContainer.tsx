import React from "react";
import "react-multi-carousel/lib/styles.css";
import { trendingHotel } from "../../@types/hotel";
import Loading from "../../components/Loading";
import Carousel from "react-multi-carousel";
import TrendingCard from ".././homeCards/TrendingCard";

interface trendingCardContainerProps {
  trendingHotels: trendingHotel[];
  loading: boolean;
}

const TrendingCardContainer = ({
  trendingHotels,
  loading,
}: trendingCardContainerProps) => {
  return (
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
  );
};

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

export default TrendingCardContainer;
