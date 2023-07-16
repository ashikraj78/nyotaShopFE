import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function VideoInDetails(){
    const router = useRouter()
    return(
        <div className="mx-36 my-16 flex align-stretch">
            <Image
            src={"/nyota_videoImage_image.svg"}
            width={800}
            height={500}
            alt="Flower Br"
            className="videoWidth"
            />
            <div className="children1 ml-16 pr-8 border-r flex flex-col justify-between" >
                <div className="flex justify-between mb-8">
                    <div>
                    <h3 className="thirdTextColor font-normal text-3xl ">Kalamkari Wedding Invites</h3>
                    <p className="thirdTextColor font-light text-base mt-2">Subtle colours and soothing music </p>
                    </div>
                    <p className="text-2xl font-black thirdTextColor">2500/-</p>
                </div>
                <div className="flex my-8">
                    <p className="thirdTextColor w-4/12 border-b text-center text-xl py-2 font-black">Description</p>
                    <p className="thirdTextColor w-4/12 border-b border-l border-r text-center text-xl py-2 font-light">Features</p>
                    <p className="thirdTextColor w-4/12 border-b text-center text-xl py-2 font-light">Process</p>
                </div>
                <p className="text-base font-light thirdTextColor ">Subtle colours and soothing music makes this rhythmic wedding invitation a true classic. Buy this soft video personalised with your photos, text and       religious theme. It can be customised to include all the functions of your wedding.
                    Subtle colours and soothing music makes this rhythmic wedding invitation a true classic. Buy this soft video personalised with your photos, text and religious theme. It can be customised to include all the functions of your wedding.
                    Subtle colours and soothing music makes this rhythmic wedding invitation a true classic. Buy this soft video personalised with your photos, text and religious theme. It can be customised to include all the functions of your wedding.
                </p>
                <button className="h-12 w-full primaryColor py-auto text-xl secondaryTextColor mt-12 " onClick={()=> router.push("/buyNow")} >Buy Now</button>
            </div>
            <div className="children2 flex flex-col justify-between ml-6">
                <div className="flex flex-col items-center w-24">
                    <div className="mb-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 30C13.2311 30 10.5243 29.1789 8.22202 27.6406C5.91973 26.1022 4.12532 23.9157 3.06569 21.3576C2.00607 18.7994 1.72882 15.9845 2.26901 13.2687C2.80921 10.553 4.14258 8.05845 6.10051 6.10051C8.05845 4.14258 10.553 2.80921 13.2687 2.26901C15.9845 1.72882 18.7994 2.00607 21.3576 3.06569C23.9157 4.12532 26.1022 5.91973 27.6406 8.22202C29.1789 10.5243 30 13.2311 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30ZM16 4.00001C13.6266 4.00001 11.3066 4.70379 9.33316 6.02237C7.35977 7.34095 5.8217 9.21509 4.91345 11.4078C4.0052 13.6005 3.76756 16.0133 4.23058 18.3411C4.69361 20.6689 5.83649 22.8071 7.51472 24.4853C9.19295 26.1635 11.3312 27.3064 13.6589 27.7694C15.9867 28.2325 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16C28 12.8174 26.7357 9.76516 24.4853 7.51472C22.2349 5.26429 19.1826 4.00001 16 4.00001Z" fill="#274143"/>
                        <path d="M20.59 22L15 16.41V7H17V15.58L22 20.59L20.59 22Z" fill="#274143"/>
                    </svg>
                    </div>
                    
                    <p className="font-light text-base">120 Sec</p>
                    <p className="text-xs font-light">Duration</p>
                </div>

                <div className="flex flex-col items-center w-24">
                    <div className="mb-2">
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1667 18V28.6666H4.5V18H15.1667ZM16.5 2.66663L23.8333 14.6666H9.16667L16.5 2.66663ZM23.8333 17.3333C27.1667 17.3333 29.8333 20 29.8333 23.3333C29.8333 26.6666 27.1667 29.3333 23.8333 29.3333C20.5 29.3333 17.8333 26.6666 17.8333 23.3333C17.8333 20 20.5 17.3333 23.8333 17.3333Z" fill="#274143"/>
                    </svg>
                    </div>
                    
                    <p className="font-light text-base">Indian</p>
                    <p className="text-xs font-light">Theme</p>
                </div>

                <div className="flex flex-col items-center w-24">
                    <div className="mb-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22.6667C4 23.7276 4.42143 24.745 5.17157 25.4952C5.92172 26.2453 6.93913 26.6667 8 26.6667C9.06087 26.6667 10.0783 26.2453 10.8284 25.4952C11.5786 24.745 12 23.7276 12 22.6667C12 21.6059 11.5786 20.5885 10.8284 19.8383C10.0783 19.0882 9.06087 18.6667 8 18.6667C6.93913 18.6667 5.92172 19.0882 5.17157 19.8383C4.42143 20.5885 4 21.6059 4 22.6667ZM17.3333 22.6667C17.3333 23.7276 17.7548 24.745 18.5049 25.4952C19.2551 26.2453 20.2725 26.6667 21.3333 26.6667C22.3942 26.6667 23.4116 26.2453 24.1618 25.4952C24.9119 24.745 25.3333 23.7276 25.3333 22.6667C25.3333 21.6059 24.9119 20.5885 24.1618 19.8383C23.4116 19.0882 22.3942 18.6667 21.3333 18.6667C20.2725 18.6667 19.2551 19.0882 18.5049 19.8383C17.7548 20.5885 17.3333 21.6059 17.3333 22.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 22.6667V5.33337H25.3333V22.6667M12 10.6667H25.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>
                    
                    <p className="font-light text-base">Traditional</p>
                    <p className="text-xs font-light">Music</p>
                </div>

                <div className="flex flex-col items-center w-24">
                    <div className="mb-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3327 18.6667H19.9994V14.6667H23.9994V12H19.9994V8.00002H17.3327V12H13.3327V14.6667H17.3327V18.6667ZM10.666 24C9.93269 24 9.30468 23.7387 8.78202 23.216C8.25935 22.6934 7.99846 22.0658 7.99935 21.3334V5.33336C7.99935 4.60002 8.26068 3.97202 8.78335 3.44936C9.30602 2.92669 9.93357 2.6658 10.666 2.66669H26.666C27.3994 2.66669 28.0274 2.92802 28.55 3.45069C29.0727 3.97336 29.3336 4.60091 29.3327 5.33336V21.3334C29.3327 22.0667 29.0714 22.6947 28.5487 23.2174C28.026 23.74 27.3985 24.0009 26.666 24H10.666ZM5.33268 29.3334C4.59935 29.3334 3.97135 29.072 3.44868 28.5494C2.92602 28.0267 2.66513 27.3991 2.66602 26.6667V8.00002H5.33268V26.6667H23.9994V29.3334H5.33268Z" fill="black"/>
                    </svg>
                    </div>
                    
                    <p className="font-light text-base">3 Photos</p>
                    <p className="text-xs font-light">Gracefully</p>
                </div>
            </div>
        </div>
    )
}

export default VideoInDetails;