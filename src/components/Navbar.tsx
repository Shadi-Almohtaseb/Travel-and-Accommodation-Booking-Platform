import React, { useEffect, useState } from "react";
import {
  Navbar as NavbarComponent,
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
import { SearchParams, searchForHotels } from "../redux/thunks/searchBarThunk";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Log Out",
];

const Navbar = () => {
  const { currentMode, toggleTheme } = useThemeSettings();
  const { User } = useSelector((state: RootState) => state.authUser);
  const [searchParam, setSearchParam] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("pass");
    window.location.reload();
  };

  const dispatch = useDispatch<AppDispatch>();
  const { searchedHotels } = useSelector((state: RootState) => state.searchBar);

  useEffect(() => {
    try {
      dispatch(searchForHotels({ city: searchParam }));
    } catch (error) {
      console.log(error);
      toast.error("cant search, Something went wrong");
    }
  }, [searchParam, dispatch]);

  return (
    <NavbarComponent
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
      {User && User.userType === "User" ? (
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

          <NavbarContent className="relative hidden sm:flex flex-col">
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
            {searchedHotels && searchedHotels.length > 0 && (
              <div className="absolute top-16 bg-default-100 p-2 rounded-xl w-full">
                {searchedHotels.map((hotel: any) => {
                  const concatenatedValue = (
                    hotel.latitude.toString() + hotel.longitude.toString()
                  ).replace(/\./g, "");
                  return (
                    <Link
                      href={`/hotel/${concatenatedValue}`}
                      key={hotel.latitude}
                      className="flex items-center cursor-pointer mb-1 gap-2 bg-default-200 hover:bg-default-50 rounded-xl py-2 px-4"
                    >
                      <Image
                        src={hotel.roomPhotoUrl}
                        className=""
                        alt="hotel"
                        width={50}
                        height={50}
                      />
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{hotel.cityName}:</span>
                        <p>{hotel.hotelName}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </NavbarContent>
        </div>
      ) : User && User.userType === "Admin" ? (
        // Code for user type "Admin"
        <div className="sm:flex hidden">
          <Button
            as={Link}
            href="/dashboard"
            variant="flat"
            color="primary"
            className="text-black dark:text-white text-lg font-semibold"
          >
            Dashboard
          </Button>
        </div>
      ) : null}
      <NavbarContent justify="end">
        <ThemeToggle currentMode={currentMode} toggleTheme={toggleTheme} />
        {User ? (
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center gap-5 hover:bg-slate-400 py-2 pl-2 pr-4 backdrop-blur-lg hover:bg-opacity-30 duration-200 cursor-pointer rounded-full">
                <UserComponent
                  name={User?.given_name + " " + User?.family_name}
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
    </NavbarComponent>
  );
};

export default Navbar;
