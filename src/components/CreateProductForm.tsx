import { counterStates, setUserData } from "@/redux/counterReducer";
import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";

function CreateProductForm(){
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
            

        console.log({newUserData})
        } catch (error) {
            console.error(error);
        }

    };  
  
 
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4"  {...register('title', { required: true })} placeholder="Title" />
                {errors.title && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('subTitle', { required: true })} placeholder="Sub Title" />
                {errors.subTitle && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <textarea  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('description', { required: true })} placeholder="Description" />
                {errors.description && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('category', { required: true })} placeholder="Category" />
                {errors.category && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('videoLink', { required: true })} placeholder="Video Link" />
                {errors.videoLink && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('videoTheme', { required: true })} placeholder="Video Theme" />
                {errors.videoTheme && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" {...register('musicTheme', { required: true })} placeholder="Music Theme" />
                {errors.musicTheme && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" type="number" {...register('cost', { required: true })} placeholder="Cost" />
                {errors.cost && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input  className="buy_inputPlaceholder border-b-2 text-xl pb-2 mb-8  w-1/4" type="number" {...register('timeDuration', { required: true })} placeholder="Time Duration" />
                {errors.timeDuration && <span>This field is required</span>}
            </div>

            <div className="my-4 buy_inputPlaceholder text-xl pb-2 mb-8  w-1/4">
                <label>
                Photos Required:
                <input   type="checkbox" {...register('photosRequired', { required: true })} />
                </label>
                {errors.photosRequired && <span>This field is required</span>}
            </div>

            <div className="my-4">
                <input type="submit" className="border-2 px-4 py-2 rounded"/>
            </div>
        </form>
        
    )
    
}

export default CreateProductForm;

