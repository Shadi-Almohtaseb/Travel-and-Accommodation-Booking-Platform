import React, { useEffect, useState } from "react";
import {
  Navbar,
  User as UserComponent,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useThemeSettings } from "../hooks/useThemeSettings";
import ThemeToggle from "./ToggleTheme";
import LogoImage from "../assets/images/image-removebg-preview (3).png";
import { Image } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { styles } from "../assets/styles/navStyle";
import { toast } from "react-toastify";
import { searchForHotels } from "../redux/thunks/homeThunk";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Log Out",
];

export default function App() {
  const { currentMode, toggleTheme } = useThemeSettings();
  const { User } = useSelector((state: RootState) => state.authUser);
  const [searchParam, setSearchParam] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("User");
    window.location.reload();
  };

  const dispatch = useDispatch<AppDispatch>();
  const { searchHotels } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    try {
      dispatch(searchForHotels(searchParam));
      console.log("searchHotels", searchHotels);
    } catch (error) {
      console.log(error);
      toast.error("cant search, Something went wrong");
    }
  }, [searchParam, dispatch]);

  return (
    <Navbar
      disableAnimation
      maxWidth="full"
      className="bg-transparent dark:bg-transparent shadow-none fixed py-1 z-50"
    >
      <NavbarContent className="sm:hidden text-black" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <Link href="/" className="hidden sm:flex cursor-pointer">
        <Image src={LogoImage} alt="Logo" className="w-[100px] lg:p-4 p-5" />
      </Link>
      {User && (
        <div className="flex items-center justify-center lg:w-[60%] gap-8">
          <NavbarContent justify="start" className="hidden md:flex gap-8">
            <NavbarItem isActive>
              <Link
                className="text-black dark:text-white text-lg font-semibold"
                href="#"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white text-lg font-semibold"
                href="#"
              >
                Rooms
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white text-lg font-semibold"
                href="#"
              >
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white text-lg font-semibold"
                href="#"
              >
                Hotels
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex flex-col">
            <Input
              label="Search"
              isClearable
              radius="lg"
              classNames={styles}
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              onClear={() => setSearchParam("")}
              placeholder="Search for hotels, cities..."
              startContent={
                <FaSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
            {/* {searchHotels && searchHotels.length > 0 && (
            <div className="absolute top-16 bg-default-100 p-2 rounded-xl">
              {searchHotels.map((hotel: any) => (
                <article
                  key={hotel.description}
                  className="flex items-center mb-1 gap-2 bg-default-200 hover:bg-default-50 rounded-xl py-2 px-4"
                >
                  <span className="font-semibold">{hotel.name}:</span>
                  <p>
                    {hotel.description.length > 40
                      ? `${hotel.description.slice(0, 40)}...`
                      : hotel.description}
                  </p>
                </article>
              ))}
            </div>
          )} */}
          </NavbarContent>
        </div>
      )}
      <NavbarContent justify="end">
        <ThemeToggle currentMode={currentMode} toggleTheme={toggleTheme} />
        {User ? (
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center gap-5 hover:bg-slate-400 py-2 pl-2 pr-4 backdrop-blur-lg hover:bg-opacity-30 duration-200 cursor-pointer rounded-full">
                <UserComponent
                  name={User?.userType}
                  description={
                    <Link href="#" size="sm">
                      @foothill.com
                    </Link>
                  }
                  avatarProps={{
                    src: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
                  }}
                />
                <FaChevronDown />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="profile">
                <div className="flex gap-2 items-center ">
                  <CgProfile />
                  <span>Profile</span>
                </div>
              </DropdownItem>
              <DropdownItem
                onClick={handleLogout}
                key="logout"
                className="text-danger"
                color="danger"
              >
                <div className="flex gap-2 items-center ">
                  <CgLogOut />
                  <span>Logout</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-4">
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/login"
                className="text-black dark:text-white text-xl font-semibold"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/login"
                variant="flat"
                className="text-black dark:text-white text-xl font-semibold"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-[#20243f] h-fit py-4 rounded-b-xl gap-5 mt-4 shadow-2xl z-50">
        <NavbarContent className="sm:hidden flex">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={styles}
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            onClear={() => setSearchParam("")}
            placeholder="Search for hotels, cities..."
            startContent={
              <FaSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </NavbarContent>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-white" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

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
