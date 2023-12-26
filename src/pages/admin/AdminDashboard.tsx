import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Input } from "@nextui-org/react";
import { styles } from "../../assets/styles/navStyle";
import { FaSearch } from "react-icons/fa";
import CityTable from "./CityTable";

const AdminDashboard = () => {
  const [searchParam, setSearchParam] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("cities");

  return (
    <div className="flex lg:flex-row flex-col gap-8 lg:px-20 px-5 pb-10 pt-[5.1rem] dark:bg-[#0e0e10] bg-[#d2d2d2] min-h-screen h-full">
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <section
        className={`flex flex-col w-full duration-400 ${
          showSidebar ? "lg:ml-[20rem]" : "pl-[4rem]"
        } `}
      >
        <div className="lg:w-[50%] flex self-center">
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
        </div>

        <CityTable />
      </section>
    </div>
  );
};

export default AdminDashboard;
