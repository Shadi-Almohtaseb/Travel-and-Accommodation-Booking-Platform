import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { CgSelect } from "react-icons/cg";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SearchResultsCard from "../components/SearchResultsCard";
import Loading from "../components/Loading";
import { getHotels } from "../redux/thunks/searchBarThunk";

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useSelector((state: RootState) => state.searchBar);

  const [sortOption, setSortOption] = useState<string>(""); // State to track the selected sorting option

  useEffect(() => {
    try {
      dispatch(getHotels());
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch, sortOption]);

  const handleSort = (option: any) => {
    setSortOption(option.target.value);
  };

  let sortedResults: any[] = [];

  if (Array.isArray(searchResults)) {
    sortedResults = [...searchResults].sort((a, b) => {
      if (sortOption === "price") {
        console.log(a?.roomPrice, b?.roomPrice);
        return (b?.roomPrice || 0) - (a?.roomPrice || 0);
      } else if (sortOption === "rating") {
        return (b?.starRating || 0) - (a?.starRating || 0);
      }
      return 0;
    });
  }

  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] bg-[#eaeaea] dark:bg-[#0e0e10] min-h-screen h-full">
      <article className="lg:sticky top-20 lg:max-w-[420px] min-w-[250px] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <span className="text-2xl">Filters</span>
        <p className="mt-8">There is no Filters available yet :(</p>
      </article>
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
          {sortedResults && sortedResults?.length > 0 ? (
            sortedResults?.map((item: any) => (
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
    label: "Price",
    value: "price",
  },
  {
    label: "Rating",
    value: "rating",
  },
];

export default SearchResults;
