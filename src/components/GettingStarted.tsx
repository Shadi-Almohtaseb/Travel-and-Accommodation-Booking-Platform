import React, { useEffect, useRef } from "react";
import ChildrenModal from "../components/modals/ChildrenModal";
import { Input } from "@nextui-org/react";
import { motion, useAnimation, useInView } from "framer-motion";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import Card from "../components/Card";
import { Hotel } from "../@types/hotel";
import Loading from "../components/Loading";
import useAnimationInView from "../hooks/useAnimationInView";

interface gettingStartedProps {
  hotels: Hotel[];
  loading: boolean;
}

const GettingStarted = ({ hotels, loading }: gettingStartedProps) => {
  const { controls, ref } = useAnimationInView();

  return (
    <section id="getting-started" className="min-h-screen h-full py-5">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 120 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1 }}
        ref={ref}
      >
        <div className="flex items-center gap-14 lg:mx-16 rounded-lg bg-slate-100 shadow-2xl dark:bg-slate-800 py-7 px-5 mt-16">
          <div className="flex items-center gap-3 w-full">
            <GrLocation size={35} />
            <Input type="text" label="Location" className="shadow-lg" />
          </div>
          <div className="flex items-center gap-3 w-full">
            <FaRegCalendarAlt size={27} />
            <Input type="date" className="shadow-lg" />
          </div>
          <div className="flex items-center gap-3 w-full">
            <MdFamilyRestroom size={35} />
            <ChildrenModal />
          </div>
        </div>
      </motion.div>
      <div className="lg:mx-10 mx-3 mt-14">
        <span className="text-3xl">Featured Deals</span>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex justify-center flex-wrap gap-10">
            {hotels?.map((hotel: Hotel, index: number) => {
              return <Card key={index} hotel={hotel} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default GettingStarted;
