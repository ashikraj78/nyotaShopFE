import Image from "next/image";
import { Inter } from "next/font/google";
import Process from "@/components/Process";
import ExploreDesign from "@/components/ExploreDesign";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const handleExploreClick = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main>
      <div>
        <div
          className="md:my-8 md:relative heroSection px-10"
          style={{ position: "relative" }}
        >
          <Image
            src={"/nyota_hero_image_mobile.png"}
            width={500}
            height={700}
            alt="Mehandi Hand"
            className="w-full md:w-9/12 md:absolute right-10 top-6 mt-8 md:mt-0 rounded-md"
          />
          <div className="hero_div md:absolute rounded md:p-8 md:left-10 md:top-1/2 md:transform md:-translate-y-1/2">
            <h3 className="hero-title">
              Create cherished memories with our beautifully crafted Wedding
              Invites to celebrate your special day.
            </h3>
            <p className="hero_paragraph ">
              We understand that capturing and preserving the beautiful moments
              of your special day is essential. Our platform offers a wide range
              of professionally designed templates that will transform your
              wedding footage into a breathtaking cinematic masterpiece.
            </p>
            <div className="mt-10 text-right hidden md:block">
              <button
                className="primaryColor text-white w-1/3 py-3 rounded text-2xl shadow"
                onClick={handleExploreClick}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={"/nyota_flower_break.svg"}
            width={500}
            height={700}
            alt="Flower Br"
            className="w-11/12 md:w-4/6"
          />
        </div>
        <Process />
        <div className="flex justify-center">
          <Image
            src={"/nyota_flower_break.svg"}
            width={500}
            height={700}
            alt="Flower Br"
            className=" w-11/12 md:w-4/6 mt-12"
          />
        </div>
        <div ref={exploreRef} id="explore"></div>
        <ExploreDesign />
      </div>
    </main>
  );
}
