import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Input } from "@nextui-org/react";
import { styles } from "../assets/styles/navStyle";
import { FaSearch } from "react-icons/fa";

const AdminDashboard = () => {
  const [searchParam, setSearchParam] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mr-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-default-100 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-default-200 dark:border-default-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-default-200 dark:border-default-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-default-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
