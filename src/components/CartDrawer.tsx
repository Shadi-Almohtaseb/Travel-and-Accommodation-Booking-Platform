import React from "react";
import Drawer from "react-modern-drawer";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import "react-modern-drawer/dist/index.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Image } from "@nextui-org/react";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
}

const CartDrawer = ({ isOpen, setIsOpen, toggleDrawer }: CartDrawerProps) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="relative p-2 rounded-full bg-gray-200 dark:bg-[#ffffff34] hover:bg-default-100 duration-250"
      >
        <span className="absolute -top-[6px] -right-[10px] bg-red-500 rounded-full w-6 h-6 text-white">
          {cart?.length || 0}
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
        <div className="z-50 absolute px-5 mt-3 w-full h-full">
          <div className="flex items-center justify-between border-b border-gray-400 pb-4">
            <span className="text-2xl font-semibold">Your Cart</span>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-full bg-gray-200 dark:bg-[#ffffff34] hover:bg-default-300 dark:hover:bg-default-400 duration-250"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="mt-6 flex flex-col justify-between h-[90%]">
            <div>
              {cart?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-2 mb-8">
                  <Image
                    src={item?.roomPhotoUrl}
                    alt="hotel image"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {item?.title || item?.cityName}
                    </span>
                    <span className="text-gray-400">{item?.hotelName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {item?.finalPrice || item?.roomPrice}$
                    </span>
                    <span className="text-gray-400">Per night</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="flat" className="bg-blue-600 text-xl text-white">
              Checkout -{" "}
              {cart?.reduce(
                (acc: any, item: any) =>
                  acc + (item?.finalPrice || item?.roomPrice),
                0
              )}
              $
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
