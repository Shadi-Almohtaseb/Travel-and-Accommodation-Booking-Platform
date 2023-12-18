import React from "react";
import Drawer from "react-modern-drawer";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import "react-modern-drawer/dist/index.css";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
}

const CartDrawer = ({ isOpen, setIsOpen, toggleDrawer }: CartDrawerProps) => {
  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="relative p-2 rounded-full bg-gray-200 dark:bg-[#ffffff34] hover:bg-default-100 duration-250"
      >
        <span className="absolute -top-[6px] -right-[10px] bg-red-500 rounded-full w-6 h-6 text-white">
          4
        </span>
        <FaCartShopping size={23} />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="text-black dark:text-white relative"
        size={400}
      >
        <div className="bg-default-100 dark:bg-default-100 h-full w-full absolute" />
        <div className="z-50 absolute px-5 mt-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">Your Cart</span>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-full bg-gray-200 dark:bg-[#ffffff34] hover:bg-default-300 dark:hover:bg-default-400 duration-250"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
