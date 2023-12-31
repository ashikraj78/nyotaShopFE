import CreateProductForm from "@/components/CreateProductForm";
import { counterStates } from "@/redux/counterReducer";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProduct from "./EditProduct";

function Product() {
  const router = useRouter();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const { userData } = useSelector(counterStates);
  const productsData = userData?.user?.myProducts;
  return (
    <div className="box-border ">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-medium">Products</p>
        <button
          className="border text-xl text-white font-medium px-8 py-4 rounded primaryColor"
          onClick={() => setCreateForm(!createForm)}
        >
          Create Product +{" "}
        </button>
      </div>
      {createForm ? (
        <CreateProductForm setCreateForm={setCreateForm} />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {productsData?.map(
            (product: { _id: string; title: string; cost: number }) => (
              <div key={product._id} className="mb-10 cursor-pointer w-11/12">
                <Image
                  src={"/nyota_explore1_image.svg"}
                  width={400}
                  height={400}
                  alt="Design Explore"
                  onClick={() => router.push(`/product/${product._id}`)}
                />
                <div className="flex justify-between mt-4">
                  <p className="exploreTextColor text-lg">{product.title}</p>
                  <p className="exploreTextColor text-xl">{product.cost}/-</p>
                </div>
                <div className="flex justify-between">
                  <p
                    className=" underline underline-offset-4 decoration-solid primaryTextColor cursor-pointer"
                    onClick={() => router.push(`/product/${product._id}`)}
                  >
                    View More
                  </p>

                  <p
                    className=" underline underline-offset-4 decoration-solid primaryTextColor cursor-pointer text-2xl"
                    onClick={() => setEditProduct(!editProduct)}
                  >
                    Edit
                  </p>
                  {editProduct && (
                    <EditProduct
                      editProduct={editProduct}
                      setEditProduct={setEditProduct}
                      productId={product._id}
                    />
                  )}
                </div>

                <div className="border border-slate-400 border-1 mt-4"></div>
                <div className="border border-slate-400 border-1 mt-1"></div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Product;
