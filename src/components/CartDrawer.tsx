import React from "react";
import Drawer from "react-modern-drawer";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Button, Image } from "@nextui-org/react";
import { removeItem } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
}

const CartDrawer = ({ isOpen, setIsOpen, toggleDrawer }: CartDrawerProps) => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRemoveItem = (item: any) => {
    dispatch(removeItem({ id: item.hotelName, ...item }));
    toast.warn("Removed from cart");
  };

  const handleCheckoutCart = () => {
    navigate("/checkout");
    toggleDrawer();
  };

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
                <div
                  key={item.id}
                  className="relative flex items-center gap-2 mb-8"
                >
                  <Image
                    src={item?.roomPhotoUrl}
                    alt="hotel image"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {item?.title || item?.cityName || item.roomType}
                    </span>
                    <span className="text-gray-400">
                      {item?.hotelName ||
                        (item?.roomNumber &&
                          `Room Number: ${item?.roomNumber}`)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {item?.finalPrice || item?.roomPrice || item.price}$
                    </span>
                    <span className="text-gray-400">Per night</span>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="absolute top-0 right-0 p-2 rounded-full bg-gray-200 dark:bg-[#ffffff19] hover:bg-default-300 dark:hover:bg-default-400 duration-250"
                  >
                    <AiOutlineClose size={10} />
                  </button>
                </div>
              ))}
            </div>
            <Button
              onClick={handleCheckoutCart}
              color="primary"
              variant="flat"
              className="bg-blue-600 text-xl text-white"
            >
              Checkout -{" "}
              {cart?.reduce(
                (acc: any, item: any) =>
                  acc + (item?.finalPrice || item?.roomPrice || item.price),
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
