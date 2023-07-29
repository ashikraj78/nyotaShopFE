import ExploreDesign from "@/components/ExploreDesign";
import Process from "@/components/Process";
import VideoInDetails from "@/components/VideoInDetails";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import Image from "next/image";

// Define the type for the product
interface Product {
    _id: string;
     title: string;
    subTitle: string;
    description: string;
    category: string;
    videoLink: string;
    videoTheme: string;
    musicTheme: string;
    cost: number;
    timeDuration: number;
    photosRequired: boolean;
  }
  
  // Define the type for the props
  interface ProductProps {
    product: Product;
  }
  
  const ProductPage: NextPage<ProductProps> = ({ product }) => {
    let {_id,title, subTitle, description, category, videoLink, videoTheme, musicTheme, cost, timeDuration, photosRequired} = product
    return (
      <div>
        

        <VideoInDetails   
             id={_id}
             title={title}
             subTitle={subTitle}
             description={description}
             category={category}
             videoLink={videoLink}
             videoTheme={videoTheme}
             musicTheme={musicTheme}
             cost={cost}
             timeDuration={timeDuration}
             photosRequired={photosRequired}
        />

        <div className="flex justify-center">
            <Image
            src={"/nyota_flower_break.svg"}
            width={500}
            height={700}
            alt="Flower Br"
            className="w-4/6"
            />
        </div>
        <Process/>
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
  };
  
  // This function gets called on every request
  export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProductProps>> {
    const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
    // Fetch product data based on the id in the URL
    let id = "";
    if (context.params) {
      id = context.params.id as string;
    }
    const res = await fetch(`${backEndURI}/product/showProduct?id=${id}`);
    const product: Product = await res.json();
  
    // Pass product data to the page via props
    return { props: { product } };
  }
  
  export default ProductPage;
  