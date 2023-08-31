import Image from "next/image";
import React, { useEffect, useState } from "react";

function Process() {
  // const triangleCount = 64;

  const [triangleCount, setTriangleCount] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setTriangleCount(Math.floor(window.innerWidth / 30));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const renderTriangles = (inverted: boolean) => {
    const triangles = [];

    for (let i = 0; i < triangleCount; i++) {
      triangles.push(
        <div
          key={i}
          className={inverted ? "triangleInverted" : "triangle"}
        ></div>
      );
    }

    return triangles;
  };
  return (
    <div>
      <div className="flex mt-12 mb-4">{renderTriangles(false)}</div>
      <div className="h-56 md:h-72 primaryColor pt-8 ">
        <div className="w-9/12 md:w-full text-center ml-10 md:ml-0">
          <h3 className="text-center mb-8 secondaryTextColor text-xl md:text-2xl font-light">
            Our Process
          </h3>
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center">
                <div className="secondaryColor template_Circle flex justify-center  rounded-full items-center">
                  <div className="secondaryColor w-16 h-16 flex justify-center  rounded-full template">
                    <Image
                      src={"/nyota_template_icon.svg"}
                      width={32}
                      height={32}
                      alt="Mehandi Hand"
                    />
                  </div>
                </div>
                <div>
                  <Image
                    src={"/nyota_arrow_icon.svg"}
                    width={300}
                    height={12}
                    alt="Mehandi Hand"
                  />
                </div>
              </div>
              <p className="secondaryTextColor md:text-xl font-light mt-4 absolute top-16  template_text1">
                Choose a Template
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center ">
                <div className="secondaryColor  template_Circle flex justify-center  rounded-full items-center">
                  <div className="secondaryColor w-16 h-16 flex justify-center  rounded-full template">
                    <Image
                      src={"/nyota_customize_icon.svg"}
                      width={32}
                      height={32}
                      alt="Mehandi Hand"
                    />
                  </div>
                </div>
                <div>
                  <Image
                    src={"/nyota_arrow_icon.svg"}
                    width={300}
                    height={12}
                    alt="Mehandi Hand"
                  />
                </div>
                <p className="secondaryTextColor md:text-xl font-light mt-4 absolute top-16 template_text2">
                  Customize
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="secondaryColor template_Circle flex justify-center  rounded-full items-center">
                <div className="secondaryColor w-16 h-16 flex justify-center  rounded-full template">
                  <Image
                    src={"/nyota_download_icon.svg"}
                    width={32}
                    height={32}
                    alt="Mehandi Hand"
                  />
                </div>
              </div>
              <p className="secondaryTextColor template_text3 md:text-xl font-light mt-4 absolute top-16 w-44 template_text1">
                Pay and Download
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 mb-12=">{renderTriangles(true)}</div>
    </div>
  );
}

export default Process;
