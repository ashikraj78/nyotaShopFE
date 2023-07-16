import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

function TopHeader() {
  const router = useRouter();
  return (
    <div className="primaryColor w-full h-24 px-10 flex justify-between  ">
      <Image
        src={"/nyota_logo.svg"}
        width={136}
        height={500}
        alt="Company logo"
        onClick={()=> router.push("/")}
        className="cursor-pointer"
      />
      <div className="relative w-40 h-40">
        <div className="absolute bg-white w-full h-full rounded-full top-3 z-0 "></div>
        <div className="flex items-start justify-center h-full">
          <Image
            src={"/nyota_header_icon.svg"}
            width={122}
            height={72}
            alt="Header Center Icon"
            className="pt-5 relative z-10"
          />
        </div>
      </div>
      <div className="flex my-auto">
        <AiOutlineShoppingCart
          color="#DDCEB8"
          style={{ width: "36px", height: "36px" }}
          className="mr-8"
        />
        <FaRegUser color="#DDCEB8" style={{ width: "30px", height: "30px" }} />
      </div>
    </div>
  );
}

export default TopHeader;
