import React from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { FaCity } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { MdOutlineBedroomChild } from "react-icons/md";

interface AdminSidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar = ({ showSidebar, setShowSidebar }: AdminSidebarProps) => {
  return (
    <div
      className={`lg:w-[350px] w-[300px] fixed top-20 ${
        !showSidebar ? "lg:-left-72 -left-60" : "left-0"
      }  min-h-[90vh] rounded-md pl-4 pr-3 left- bg-[#f0f0f0] dark:bg-default-100 duration-200 z-10`}
    >
      <div className="flex items-center justify-between text-2xl mt-5">
        <span>Dashboard</span>
        <span
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-default-200 rounded-full p-2 cursor-pointer hover:bg-default-300"
        >
          {showSidebar ? <CgArrowLeft /> : <CgArrowRight />}
        </span>
      </div>
      {showSidebar ? (
        <div>
          <div className="flex items-center gap-3 text-xl mt-10 hover:bg-default-200 py-4 px-3 rounded-xl cursor-pointer">
            <GiModernCity className="text-2xl" />
            <span>Manage Cities</span>
          </div>
          <div className="flex items-center gap-3 text-xl mt-5 hover:bg-default-200 py-4 px-3 rounded-xl cursor-pointer ">
            <FaCity className="text-2xl" />
            <span>Manage Hotels</span>
          </div>
          <div className="flex items-center gap-3 text-xl mt-5 hover:bg-default-200 py-4 px-3 rounded-xl cursor-pointer ">
            <MdOutlineBedroomChild className="text-2xl" />
            <span>Manage Rooms</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end w-full mt-16 gap-12">
          <div className="bg-default-200 rounded-full p-2 cursor-pointer hover:bg-default-300">
            <GiModernCity className="text-2xl" />
          </div>
          <div className="bg-default-200 rounded-full p-2 cursor-pointer hover:bg-default-300">
            <FaCity className="text-2xl" />
          </div>
          <div className="bg-default-200 rounded-full p-2 cursor-pointer hover:bg-default-300">
            <MdOutlineBedroomChild className="text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
