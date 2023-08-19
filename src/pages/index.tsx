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
          className="my-8 relative heroSection px-10"
          style={{ position: "relative", minHeight: "500px" }}
        >
          <Image
            src={"/nyota_hero_image.png"}
            width={500}
            height={700}
            alt="Mehandi Hand"
            className="w-full absolute right-10"
          />
          <div className="hero_div absolute p-8 left-10 top-1/2 transform -translate-y-1/2 rounded">
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
            <div className="mt-10 text-right">
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
            className="w-4/6 mt-12"
          />
        </div>
        <div ref={exploreRef} id="explore"></div>
        <ExploreDesign />
      </div>
    </main>
  );
}
