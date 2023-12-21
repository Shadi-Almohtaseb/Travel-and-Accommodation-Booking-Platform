import { Accordion, AccordionItem, Button, Image } from "@nextui-org/react";
import React from "react";
import image1 from "../../assets/images/wallpaperflare.com_wallpaper (1).jpg";
import { FaPeopleArrows } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { HotelAmenity } from "../../pages/HotelPage";
import { Hotel, Room } from "../../@types/hotel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItem, removeItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

interface RoomProps {
  room: Room | null;
}

const Rooms = ({ room }: RoomProps) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (room: any) => {
    const item = cart.find((item: any) => item.id === room.roomType);
    if (!item) {
      dispatch(addItem({ id: room.roomType, ...room }));
      toast.success("Added to cart");
    } else {
      dispatch(removeItem({ id: room.roomType, ...room }));
      toast.warn("Removed from cart");
    }
  };
  return (
    <div className="flex flex-col gap-4 bg-default-200 p-3 py-5 rounded-lg">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col items-center">
          <Image
            src={room?.roomPhotoUrl || image1}
            className="max-w-[25rem] w-full"
            alt="rooms image"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 w-full">
          {room?.roomAmenities && (
            <Accordion
              showDivider={false}
              className="p-2 flex flex-col gap-1 w-full"
              variant="shadow"
              itemClasses={itemClasses}
            >
              {room.roomAmenities.map((amenity: HotelAmenity) => (
                <AccordionItem
                  key={amenity.name}
                  aria-label={amenity.name}
                  title={amenity.name}
                >
                  {amenity.description}
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full mt-2 gap-8 text-lg">
          <div className="flex gap-2 items-center">
            <IoBed />
            Room Type: <span className="font-bold">{room?.roomType}</span>
          </div>
          <div>
            Room Number: <span className="font-bold">{room?.roomNumber}</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-3 text-lg my-2">
            <FaPeopleArrows size={25} />
            Max number of Adults:{" "}
            <span className="font-bold">{room?.capacityOfAdults}</span>
          </div>
          <div className="flex items-center gap-3 text-lg mt-2">
            <MdChildFriendly size={25} />
            Max number of Children:{" "}
            <span className="font-bold">{room?.capacityOfChildren}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl">
            Price:{" "}
            <span className="text-green-500 font-semibold">{room?.price}$</span>
          </p>
          <Button
            variant="flat"
            onClick={() => handleAddToCart(room)}
            className="text-white text-base bg-blue-500"
          >
            {cart.find((item: any) => item.id === room?.roomType)
              ? "Remove from cart"
              : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const itemClasses = {
  base: "py-0 w-full",
  title: "font-normal text-medium",
  trigger:
    "px-2 py-0 data-[hover=true]:bg-default-200 rounded-lg h-12 flex items-center",
  indicator: "text-medium dark:text-white text-black",
  content: "text-small px-2 bg-default-100 rounded-xl",
};

export default Rooms;
