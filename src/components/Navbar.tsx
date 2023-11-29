import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useThemeSettings } from "../hooks/useThemeSettings";
import ThemeToggle from "./ToggleTheme";
import LogoImage from "../assets/images/image-removebg-preview (3).png";
import { Image } from "@nextui-org/react";

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
  const { currentMode, iconColor, toggleTheme } = useThemeSettings();

  return (
    <Navbar disableAnimation maxWidth="full" className="bg-[#20243f] py-2">
      <NavbarContent className="sm:hidden text-white" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <Link href="/" className="hidden sm:flex cursor-pointer">
        <Image src={LogoImage} alt="Logo" className="w-[100px] lg:p-4 p-5" />
      </Link>
      <div className="flex items-center justify-center lg:w-[60%] gap-8">
        <NavbarContent justify="start" className="hidden md:flex gap-8">
          <NavbarItem isActive>
            <Link className="text-white font-semibold" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white font-semibold" href="#">
              Rooms
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white font-semibold" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white font-semibold" href="#">
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-[#20243f] h-fit py-4 rounded-xl gap-5">
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
