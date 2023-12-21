import React, { useEffect, useState } from "react";
import { Select, SelectItem, Slider, Button } from "@nextui-org/react";
import { CgSelect } from "react-icons/cg";
import StarRatings from "react-star-ratings";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SearchResultsCard from "../components/SearchResultsCard";
import Loading from "../components/Loading";
import { getHotels } from "../redux/thunks/searchBarThunk";

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useSelector((state: RootState) => state.searchBar);

  const roomTypeList = searchResults?.map((item) => item.roomType) || [];

  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [starRating, setStarRating] = useState<number | undefined>(undefined);
  const [roomType, setRoomType] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      dispatch(getHotels());
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch, sortOption, priceRange, starRating]);

  const handleSort = (option: any) => {
    setSortOption(option.target.value);
  };

  const handleFilterByPriceRange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleFilterByStarRating = (rating: number) => {
    setStarRating(rating);
  };

  const handleFilterByRoomType = (type: string) => {
    setRoomType(type);
  };

  let filteredResults: any[] = [];

  if (Array.isArray(searchResults)) {
    filteredResults = [...searchResults]
      .filter((item) => {
        const itemPrice = item?.roomPrice || 0;
        return itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
      })
      .filter((item) => {
        const itemRating = item?.starRating || 0;
        return starRating === undefined || itemRating === starRating;
      })
      .filter((item) => {
        const itemRoomType = item?.roomType || "";
        return roomType === undefined || itemRoomType === roomType;
      })
      .sort((a, b) => {
        if (sortOption === "price") {
          return (b?.roomPrice || 0) - (a?.roomPrice || 0);
        } else if (sortOption === "rating") {
          return (b?.starRating || 0) - (a?.starRating || 0);
        }
        return 0;
      });
  }

  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] bg-[#eaeaea] dark:bg-[#0e0e10] min-h-screen h-full">
      {/* Filters Section */}
      <article className="lg:sticky top-20 lg:max-w-[420px] min-w-[250px] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <span className="text-2xl">Filters</span>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Price Range
          </label>
          <Slider
            step={50}
            maxValue={200}
            minValue={0}
            value={priceRange}
            onChange={(value) =>
              handleFilterByPriceRange(value as [number, number])
            }
            className="mt-1"
            aria-label="Price Range Slider"
          />
          <span className="text-sm">{`$${priceRange[0]} - $${priceRange[1]}`}</span>
        </div>
        <div className="mt-12">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Star Rating
          </label>
          <div className="mt-2">
            <StarRatings
              rating={starRating || 0}
              starRatedColor="#f8e42a"
              starHoverColor="#f8e42a"
              changeRating={(newRating: any) =>
                handleFilterByStarRating(newRating)
              }
              numberOfStars={5}
              starDimension="25px"
              starSpacing="2px"
            />
          </div>
        </div>
        <div className="mt-12">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Room Type
          </label>
          <Select
            label="Select room type"
            placeholder="Select an item"
            labelPlacement="outside"
            className="mt-1"
            color="default"
            variant="faded"
            disableSelectorIconRotation
            selectorIcon={<CgSelect />}
            value={roomType}
            onChange={(value: any) =>
              handleFilterByRoomType(value.target.value)
            }
          >
            {roomTypeList?.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-8">
          <Button
            color="primary"
            className="w-full"
            onClick={() => {
              setPriceRange([0, 200]);
              setStarRating(undefined);
              setRoomType(undefined);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </article>
      {/* Results Section */}
      <article className="w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <span className="text-2xl">Available Hotels</span>
          </div>
          <Select
            label="Sort by"
            placeholder="Select an item"
            labelPlacement="outside"
            className="max-w-xs"
            color="default"
            variant="faded"
            disableSelectorIconRotation
            selectorIcon={<CgSelect />}
            value={sortOption}
            onChange={(value: any) => handleSort(value)}
          >
            {sortList.map((listItem) => (
              <SelectItem key={listItem.value} value={listItem.value}>
                {listItem.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <aside className="flex flex-col gap-5 mt-5">
          {filteredResults && filteredResults?.length > 0 ? (
            filteredResults?.map((item: any) => (
              <SearchResultsCard key={item.cityName} item={item} />
            ))
          ) : (
            <p>No available hotels</p>
          )}
        </aside>
      </article>
    </div>
  );
};

const sortList = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Rating",
    value: "rating",
  },
];

export default SearchResults;
