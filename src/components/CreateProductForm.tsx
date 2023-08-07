import { counterStates, setUserData } from "@/redux/counterReducer";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";

   
    interface Props {
        setCreateForm: Dispatch<SetStateAction<boolean>>;
      }

  const CreateProductForm: React.FC<Props> = ({setCreateForm}) => {
    const {userData} = useSelector(counterStates)
    const dispatch = useDispatch()
    const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI

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
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
    const onSubmit = async(data: FormValues) => {
        const creatorId = userData?.user?._id
        const finalData = {...data, creatorId}

        try {
            const response = await fetch(`${backEndURI}/product/createProduct`, {
            method: "POST",
            body: JSON.stringify(finalData),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            });
    
            const responseData = await response.json();
            // getting update user information for redux updation
            const  newUserResponse =  await fetch(`${backEndURI}/user/showUser?id=${creatorId}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
                mode: "cors",
            });

            const newUserData = await newUserResponse.json()
            
            dispatch(setUserData({...userData, user: newUserData?.user}))
            setCreateForm(false)
            
        } catch (error) {
            console.error(error);
        }

    };  
  
 
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 text-center p-4 rounded-lg">
            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow   w-1/2"  {...register('title', { required: true })} placeholder="Title" />
                {errors.title && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-1/2"  {...register('subTitle', { required: true })} placeholder="Sub Title" />
                {errors.subTitle && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <textarea  rows={4} className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-1/2" {...register('description', { required: true })} placeholder="Description" />
                {errors.description && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-1/2" {...register('category', { required: true })} placeholder="Category" />
                {errors.category && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow w-1/2" {...register('videoLink', { required: true })} placeholder="Video Link" />
                {errors.videoLink && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-1/2" {...register('videoTheme', { required: true })} placeholder="Video Theme" />
                {errors.videoTheme && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow w-1/2" {...register('musicTheme', { required: true })} placeholder="Music Theme" />
                {errors.musicTheme && <span className="text-red-500 block">*This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md  mb-2 shadow  w-1/2" type="number" {...register('cost', { required: true })} placeholder="Cost" />
                {errors.cost && <span className="text-red-500 block ">*This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl p-2 rounded-md mb-2 shadow  w-1/2" type="number" {...register('timeDuration', { required: true })} placeholder="Time Duration" />
                {errors.timeDuration && <span className="text-red-500 block ">*This field is required</span>}
            </div>

            <div className="my-4 buy_inputPlaceholder text-xl p-2 rounded-md  mb-2   w-full">
                <label>
                Photos Required:
                <input   type="checkbox" {...register('photosRequired')}  style={{transform: "scale(1.8)"}}  className="ml-2"/>
                </label>
            </div>

            <div className="my-4" >
                <input type="submit" className="borderTemplate shadow px-4 py-2 text-xl rounded-md cursor-pointer w-1/4"/>
            </div>
        </form>
        
    )
    
}

export default CreateProductForm;

