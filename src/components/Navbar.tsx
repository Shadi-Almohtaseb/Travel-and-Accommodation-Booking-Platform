import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CgLogOut, CgProfile } from "react-icons/cg";

const styles = {
  label: "text-black/50 dark:text-white/90",
  input: [
    "bg-transparent",
    "text-black/90 dark:text-white/90",
    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "shadow-xl",
    "bg-default-100",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "focus-within:!bg-default-200",
    "dark:hover:bg-default/70",
    "dark:focus-within:!bg-default/60",
    "!cursor-text",
  ],
};

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

export default function App() {
  const { currentMode, toggleTheme } = useThemeSettings();
  const { User } = useSelector((state: RootState) => state.authUser);

  console.log(User);

  const handleLogout = () => {
    localStorage.removeItem("User");
    window.location.reload();
  };

  return (
    <Navbar
      disableAnimation
      maxWidth="full"
      className="bg-transparent dark:bg-transparent shadow-none fixed py-1 z-50"
    >
      <NavbarContent className="sm:hidden text-white" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <Link href="/" className="hidden sm:flex cursor-pointer">
        <Image src={LogoImage} alt="Logo" className="w-[100px] lg:p-4 p-5" />
      </Link>
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

        <NavbarContent className="hidden sm:flex">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={styles}
            placeholder="Type to search..."
            startContent={
              <FaSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </NavbarContent>
      </div>
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
          <div>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="#"
                className="text-black dark:text-white text-xl font-semibold"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="#"
                variant="flat"
                className="text-black dark:text-white text-xl font-semibold"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-[#20243f] h-fit py-4 rounded-b-xl gap-5 mt-4 shadow-2xl">
        <NavbarContent className="sm:hidden flex">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={styles}
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
