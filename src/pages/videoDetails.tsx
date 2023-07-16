import ExploreDesign from "@/components/ExploreDesign";
import Process from "@/components/Process";
import VideoInDetails from "@/components/VideoInDetails";
import Image from "next/image";
import React from "react";

function VideoDetails() {
  return (
    <div>
     <VideoInDetails />
      
      <div className="flex justify-center">
        <Image
          src={"/nyota_flower_break.svg"}
          width={500}
          height={700}
          alt="Flower Br"
          className="w-4/6"
        />
      </div>
      <Process />
      <div className="flex justify-center">
        <Image
          src={"/nyota_flower_break.svg"}
          width={500}
          height={700}
          alt="Flower Br"
          className="w-4/6"
        />
      </div>

      <ExploreDesign />
    </div>
  );
}

export default VideoDetails;
