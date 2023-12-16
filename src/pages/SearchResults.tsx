import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CgSelect } from "react-icons/cg";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { searchResults as searchResultsFun } from "../redux/thunks/searchResultsThunk";
import { toast } from "react-toastify";
import SearchResultsCard from "../components/SearchResultsCard";
import Loading from "../components/Loading";

export interface searchResultType {
  name: string;
  description: string;
}
const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useSelector(
    (state: RootState) => state.searchResults
  );

  useEffect(() => {
    try {
      dispatch(searchResultsFun());
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] bg-[#eaeaea] dark:bg-[#0e0e10] min-h-screen h-full">
      <article className="lg:sticky top-20 lg:max-w-[420px] min-w-[250px] w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <Accordion
          showDivider={false}
          className="p-2 flex flex-col gap-1 w-full mt-4"
          variant="shadow"
          itemClasses={itemClasses}
        >
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            Filter 1
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            Filter 2
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            Filter 3
          </AccordionItem>
        </Accordion>
      </article>
      <article className="w-full dark:bg-default-100 bg-default-300 shadow-lg rounded-lg min-h-full h-full p-4">
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <span className="text-2xl">Title</span>
          </div>
          <Select
            label="Favorite Animal"
            placeholder="Select an animal"
            labelPlacement="outside"
            className="max-w-xs"
            color="default"
            variant="faded"
            disableSelectorIconRotation
            selectorIcon={<CgSelect />}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <aside className="flex flex-col gap-5 mt-5">
          {searchResults ? (
            searchResults.map((item: searchResultType) => (
              <SearchResultsCard key={item.name} item={item} />
            ))
          ) : (
            <Loading />
          )}
        </aside>
      </article>
    </div>
  );
};

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

export default SearchResults;
