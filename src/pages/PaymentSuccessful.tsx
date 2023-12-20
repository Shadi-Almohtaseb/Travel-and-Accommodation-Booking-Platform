import { Image } from "@nextui-org/react";
import React from "react";
import successImage from "../assets/images/maximising-user-satisfaction-1-removebg-preview.png";

const PaymentSuccessful = () => {
  return (
    <div className="items-center flex  flex-col justify-center h-screen w-screen">
      <span className="text-4xl">Ordered Placed Successfully</span>
      <Image src={successImage} />
    </div>
  );
};

export default PaymentSuccessful;
