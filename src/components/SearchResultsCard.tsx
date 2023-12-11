import React from "react";
import cardImage from "../assets/images/wallpaperflare.com_wallpaper (3).jpg";
import { Button, Image } from "@nextui-org/react";
import { searchResultType } from "../pages/SearchResults";

interface SearchResultsCardProps {
  item: searchResultType;
}

const SearchResultsCard = ({ item }: SearchResultsCardProps) => {
  return (
    <article
      key={item.name}
      className="flex gap-5 dark:bg-default-200 bg-[#f5f5f5] p-5 rounded-xl shadow-2xl"
    >
      <Image src={cardImage} alt="hotel image" width={400} />
      <div className="flex flex-col justify-between gap-6 w-full">
        <div className="flex flex-col gap-4">
          <span className="text-3xl">{item.name}</span>
          <span>
            {item.description.length > 100
              ? item.description.slice(0, 100) + "..."
              : item.description}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Button
            color="primary"
            variant="flat"
            className="dark:text-white  text-base"
          >
            See more details...
          </Button>
          <Button variant="shadow" color="primary">
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SearchResultsCard;
