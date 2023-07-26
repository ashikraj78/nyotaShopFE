import CreateProductForm from "@/components/CreateProductForm";
import { counterStates } from "@/redux/counterReducer";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Product(){
    const router = useRouter();
    const [createForm, setCreateForm] = useState<boolean>(false)
    const {userData} = useSelector(counterStates)
    const productsData = userData?.user?.myProducts;
    return(
        <div className="mx-36 mt-20">

            <div className="grid grid-cols-3 gap-4">
                {productsData.map((product: {id: string, title: string, cost: number}) => (
                <div 
                    key={product.id} 
                    className=" mx-10 mb-10 cursor-pointer" 
                    onClick={()=> router.push("/videoDetails")}
                >
                    <Image
                    src={"/nyota_explore1_image.svg"}
                    width={420}
                    height={420}
                    alt="Design Explore"
                    />
                    <div className="flex justify-between mt-4">
                    <p className="exploreTextColor text-lg">
                        {product.title}
                    </p>
                    <p className="exploreTextColor text-xl">{product.cost}/-</p>
                    </div>
                    <p 
                    className=" underline underline-offset-4 decoration-solid primaryTextColor cursor-pointer" 
                    onClick={()=> router.push("/videoDetails")} 
                    >
                    View More
                    </p>
                    <div className="border border-slate-400 border-1 mt-4"></div>
                    <div className="border border-slate-400 border-1 mt-1"></div>
                </div>
                ))}
            </div>


           <button className="border text-3xl font-medium px-8 py-4 rounded" onClick={()=> setCreateForm(!createForm)}>Create Product + </button>
           {createForm && (
            <CreateProductForm />
           )}
           
        </div>
    )
    
}

export default Product;

