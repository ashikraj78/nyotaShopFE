"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function ExploreDesign() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center items-center my-4 md:my-12">
        <Image
          src={"/nyota_flowertriangle_icon.svg"}
          width={50}
          height={70}
          alt="Flower triangle"
          className="w-6 md:w-12"
        />
        <p className="exploreTextColor text-2xl md:text-4xl mx-2 font-medium ">
          Explore Our Designs
        </p>
        <Image
          src={"/nyota_flowertriangle2_icon.svg"}
          width={50}
          height={70}
          alt="Flower triangle"
          className="w-6 md:w-12"
        />
      </div>
      <div className="mx-4 md:mx-36 flex flex-wrap justify-between">
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4 md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore1_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p
            className=" underline underline-offset-4 decoration-solid primaryTextColor cursor-pointer"
            onClick={() => router.push("/videoDetails")}
          >
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore2_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore1_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore2_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore1_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore2_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore1_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore2_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
        <div
          className="w-1/2 px-3 md:px-0 md:w-1/4  md:mx-10 mb-10 cursor-pointer"
          onClick={() => router.push("/videoDetails")}
        >
          <Image
            src={"/nyota_explore1_image.svg"}
            width={420}
            height={420}
            alt="Design Explore"
          />
          <div className="flex justify-between mt-4">
            <p className="exploreTextColor text-lg">
              Kalamkari wedding Invites
            </p>
            <p className="exploreTextColor text-xl">2500/-</p>
          </div>
          <p className=" underline underline-offset-4 decoration-solid primaryTextColor">
            View More
          </p>
          <div className="border border-slate-400 border-1 mt-4"></div>
          <div className="border border-slate-400 border-1 mt-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ExploreDesign;
