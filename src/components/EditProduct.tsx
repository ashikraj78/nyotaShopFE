import { counterStates, setUserData } from "@/redux/counterReducer";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  setEditProduct: Dispatch<SetStateAction<boolean>>;
  productId: string;
  editProduct: boolean;
}
interface FormValues {
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

const EditProduct: React.FC<Props> = ({
  editProduct,
  setEditProduct,
  productId,
}) => {
  const { userData } = useSelector(counterStates);
  const dispatch = useDispatch();
  const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
  const [productData, setProcutData] = useState<FormValues | null>(null);

  useEffect(() => {
    // get the product details

    const fetchProductData = async (productId: string) => {
      const res = await fetch(
        `${backEndURI}/product/showProduct?id=${productId}`
      );
      const product = await res.json();
      setProcutData(product);
    };
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId, backEndURI]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const creatorId = userData?.user?._id;
    const finalData = { ...data, creatorId };
    const token = userData?.jwtToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_SIDE_URI}/product/updateProduct?id=${productId}`,
        {
          method: "PUT",
          body: JSON.stringify(finalData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Product updation is failed");
      }

      const responseData = await response.json();
      // getting update user information for redux updation
      const newUserResponse = await fetch(
        `${backEndURI}/user/showUser?id=${creatorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      const newUserData = await newUserResponse.json();

      dispatch(setUserData({ ...userData, user: newUserData?.user }));
      setEditProduct(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={editProduct}
      footer={null}
      onCancel={() => {
        setEditProduct(false);
      }}
      // className="modalEditForm"
      width={1000}
    >
      {!productData ? (
        <p>Please Wait...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 text-center p-4 rounded-lg "
        >
          <div className="my-4">
            <label>Title :</label>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
              className="buy_inputPlaceholder inline-block border-b-2 text-xl p-2 rounded-md  mb-2 shadow w-full"
              defaultValue={productData?.title}
            />
            {errors.title && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Sub Title :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-full"
              {...register("subTitle", { required: true })}
              placeholder="Sub Title"
              defaultValue={productData?.subTitle}
            />
            {errors.subTitle && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Description :</label>
            <textarea
              rows={10}
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-full"
              {...register("description", { required: true })}
              placeholder="Description"
              defaultValue={productData?.description}
            />
            {errors.description && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Category :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-full"
              {...register("category", { required: true })}
              placeholder="Category"
              defaultValue={productData?.category}
            />
            {errors.category && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Video Link :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow w-full"
              {...register("videoLink", { required: true })}
              placeholder="Video Link"
              defaultValue={productData?.videoLink}
            />
            {errors.videoLink && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Video Theme :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-full"
              {...register("videoTheme", { required: true })}
              placeholder="Video Theme"
              defaultValue={productData?.videoTheme}
            />
            {errors.videoTheme && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Music Theme :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow w-full"
              {...register("musicTheme", { required: true })}
              placeholder="Music Theme"
              defaultValue={productData?.musicTheme}
            />
            {errors.musicTheme && (
              <span className="text-red-500 block">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Cost :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-full"
              type="number"
              {...register("cost", { required: true })}
              placeholder="Cost"
              defaultValue={productData?.cost}
            />
            {errors.cost && (
              <span className="text-red-500 block ">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4">
            <label>Time Duration :</label>
            <input
              className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md mb-2 shadow  w-full"
              type="number"
              {...register("timeDuration", { required: true })}
              placeholder="Time Duration"
              defaultValue={productData?.timeDuration}
            />
            {errors.timeDuration && (
              <span className="text-red-500 block ">
                *This field is required
              </span>
            )}
          </div>

          <div className="my-4 buy_inputPlaceholder text-xl p-2 rounded-md  mb-2   w-full">
            <label>
              Photos Required:
              <input
                type="checkbox"
                {...register("photosRequired")}
                style={{ transform: "scale(1.8)" }}
                className="ml-2"
                checked={productData?.photosRequired}
              />
            </label>
          </div>

          <div className="my-4">
            <button
              type="submit"
              className="borderTemplate shadow px-4 py-2 text-xl rounded-md cursor-pointer"
            >
              Edit Product
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditProduct;
