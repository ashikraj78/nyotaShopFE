import {
  counterStates,
  logoutUser,
  setSignUpModal,
} from "@/redux/counterReducer";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiShoppingBag, BiLogOut, BiHelpCircle } from "react-icons/bi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SingUpModal from "./SignUpModal";
import { persistor } from "@/redux/store";

function TopHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector(counterStates);
  const [userBox, setUserBox] = useState(false);

  function handleNoUserClick() {
    if (!userData) {
      dispatch(setSignUpModal(true));
    }
  }

  function handleLogout() {
    dispatch(logoutUser());
    persistor.purge();
    setUserBox(false);
    router.push("/").then(() => window.location.reload());
  }

  function handleProductClick() {
    router.push("/dashboard");
    setUserBox(false);
  }

  function handleOrderClick() {
    router.push("/order");
    setUserBox(false);
  }

  return (
    <div className="primaryColor w-full h-24 px-10 flex justify-between  ">
      <Image
        src={"/nyota_logo.svg"}
        width={136}
        height={500}
        alt="Company logo"
        onClick={() => router.push("/")}
        className="cursor-pointer logoImage "
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
        {!userData ? (
          <div
            className="border-2 rounded-full h-9 w-9 flex justify-center items-center cursor-pointer relative"
            onClick={handleNoUserClick}
          >
            <div className="bg-red-400 rounded-full absolute top-0 left-6 dot"></div>
            <FaRegUser
              color="#DDCEB8"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        ) : (
          <div className="relative">
            <FaRegUser
              color="#DDCEB8"
              style={{ width: "30px", height: "30px" }}
              onClick={() => setUserBox(!userBox)}
              className="cursor-pointer"
            />

            {userBox && (
              <div className="absolute bg-white py-2 px-4 right-1 top-10 w-36 rounded shadow z-10">
                <div
                  className="flex  hover:bg-slate-200  cursor-pointer p-1 rounded items-center"
                  onClick={handleOrderClick}
                >
                  <BiShoppingBag
                    color="#7e223c"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p className="ml-2">Orders</p>
                </div>
                <div className="flex  hover:bg-slate-200  cursor-pointer p-1 rounded items-center">
                  <BiHelpCircle
                    color="#7e223c"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p className="ml-2">Help Desk</p>
                </div>
                {userData?.user?.isAdmin && (
                  <div
                    className="flex  hover:bg-slate-200  cursor-pointer p-1 rounded items-center"
                    onClick={handleProductClick}
                  >
                    <MdOutlineCreateNewFolder
                      color="#7e223c"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <p className="ml-2">Dashboard</p>
                  </div>
                )}

                <div
                  className="flex  hover:bg-slate-200  cursor-pointer p-1 rounded items-center"
                  onClick={handleLogout}
                >
                  <BiLogOut
                    color="#7e223c"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p className="ml-2">Logout</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <SingUpModal />
    </div>
  );
}

export default TopHeader;
