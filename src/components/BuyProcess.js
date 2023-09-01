import React from "react";

function BuyProcess({ page }) {
  return (
    <div className="hidden md:flex justify-center md:mx-36  mt-16 space-x-28">
      <div className="relative">
        <div className="flex flex-col items-center ">
          <div
            className={`rounded-full h-12 w-12 flex justify-center items-center buyProcessBorder font-normal text-2xl ${
              page === 1 ? "primaryColor text-white" : "primaryTextColor"
            }`}
          >
            <p className="text-2xl font-normal">1</p>
          </div>

          <p className="mt-2 text-2xl font-normal primaryTextColor">
            Details of People
          </p>
        </div>
        <div className=" primaryColor h-1 absolute w-full top-6 left-32 "></div>
      </div>

      <div className="relative">
        <div className="flex flex-col items-center ">
          <div
            className={`rounded-full h-12 w-12 flex justify-center items-center buyProcessBorder font-normal text-2xl ${
              page === 2 ? "primaryColor text-white" : "primaryTextColor"
            }`}
          >
            <p className="text-2xl font-normal">2</p>
          </div>
          <p className="mt-2 text-2xl font-normal primaryTextColor">
            Details of Events
          </p>
        </div>
        <div className=" primaryColor h-1 absolute w-full top-6 left-32 "></div>
      </div>

      <div className="relative">
        <div className="flex flex-col items-center ">
          <div
            className={`rounded-full h-12 w-12 flex justify-center items-center buyProcessBorder font-normal text-2xl ${
              page === 3 ? "primaryColor text-white" : "primaryTextColor"
            }`}
          >
            <p className="text-2xl font-normal">3</p>
          </div>
          <p className="mt-2 text-2xl font-normal primaryTextColor">
            Add Photos
          </p>
        </div>
        <div className=" primaryColor h-1 absolute w-full top-6 left-32 "></div>
      </div>

      <div className="flex flex-col items-center ">
        <div
          className={`rounded-full h-12 w-12 flex justify-center items-center buyProcessBorder font-normal text-2xl ${
            page === 4 ? "primaryColor text-white" : "primaryTextColor"
          }`}
        >
          <p className="text-2xl font-normal">4</p>
        </div>
        <p className="mt-2 text-2xl font-normal primaryTextColor">Payments</p>
      </div>
    </div>
  );
}

export default BuyProcess;
