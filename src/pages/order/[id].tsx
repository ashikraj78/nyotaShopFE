import {  GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import React from "react";

interface User {
    _id: string;
    name: string;
    mobilenumber: string;
}
interface Product{
    _id: string;
    title: string;
    videoLink:string
}
interface UserInfo {
    name: string;
    motherName: string;
    fatherName: string;
    grandmotherName: string;
    grandfatherName: string;
}
interface Event{
    title: string;
    venue: string;
    time : string;
    date : string
}
interface FormData{
    _id: string;
    brideData: UserInfo;
    groomData : UserInfo;
    eventsData : [Event]
}

interface Order {
    _id:String;
    userId: User,
    productId: Product,
    formDataId: FormData,
    razorPayPaymentId: string,
    paidAmount: number,
    orderStatus: 'Received' | 'InProgress' | 'Delivered',
    createdAt?: string,
}

interface OrderProps{
    order : Order;
}

const OrderPage : NextPage<OrderProps> = ({order}) =>{
    let {_id, userId, productId, formDataId, razorPayPaymentId, paidAmount, orderStatus, createdAt} = order

    function formatDate(dateString :string) {
        let date = new Date(dateString);
    
        let day = date.getDate();
        let monthNumber = date.getMonth(); 
        let year = date.getFullYear(); 
    
        // Array of month names
        let monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        let monthName = monthNames[monthNumber];
    
        return `${day} ${monthName} ${year}`;
    }

    function addDays(dateString :string , days: number) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${monthName} ${year}`;
    }




    return(
        <div className="mx-36 mt-20" >
            <p>this is order details page</p>
            <div className="border-b-4 mb-6 pb-3">
                <p className="text-2xl">Order </p>
                <div className="flex">
                    <p>Order Status : </p>
                    <p className="ml-2">{orderStatus}</p>
                </div>
                <div className="flex justify-between">
                {createdAt ? (
                    <>
                        <p className="text-gray-500">Order Date : {formatDate(createdAt)}</p>
                        <p className="text-red-500">Delivery Date : {addDays(createdAt, 4)}</p>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500">Order Date : N/A</p>
                        <p className="text-red-500">Delivery Date : N/A</p>
                    </>
                )}
                </div>
            </div>
            <div className="border-b-4 mb-6 pb-3">
                <p className="text-2xl mb-2">Client </p>
                <div className="flex justify-between">
                    <p>Client Name: {userId?.name}</p>
                    <p>Client Mobile No. : +{userId?.mobilenumber}</p>
                </div>
            </div>
            <div className="border-b-4 mb-6 pb-3">
                <p className="text-2xl mb-2">Payment </p>
                <div className="flex justify-between">
                    <p>Payment Amount: ₹{paidAmount}</p>
                    <p>RazorPayment Id: {razorPayPaymentId}</p>
                </div>
            </div>
            <div>
                <p className="text-2xl mb-2">Data for Video </p>
                <div className="flex justify-between border-b-2 pb-2">
                    <div>
                        <p className="text-xl">Bride Info</p>
                        <p>Name : {formDataId?.brideData?.name}</p>
                        <p>Mother Name : {formDataId?.brideData?.motherName}</p>
                        <p>Father Name : {formDataId?.brideData?.fatherName}</p>
                        <p>Grand Mother Name : {formDataId?.brideData?.grandmotherName}</p>
                        <p>Grand Father Name : {formDataId?.brideData?.grandfatherName}</p>
                    </div>
                    <div>
                        <p className="text-xl">Groom Info</p>
                        <p>Name : {formDataId?.groomData?.name}</p>
                        <p>Mother Name : {formDataId?.groomData?.motherName}</p>
                        <p>Father Name : {formDataId?.groomData?.fatherName}</p>
                        <p>Grand Mother Name : {formDataId?.groomData?.grandmotherName}</p>
                        <p>Grand Father Name : {formDataId?.groomData?.grandfatherName}</p>
                    </div>
                </div>
                <div className="border-b-2 pb-2">
                    <p className="text-2xl">Events</p>
                    {formDataId?.eventsData.map((event, index:number) =>(
                        <div className="my-4" key={index}> 
                            <p className="text-xl">{event.title}</p>
                            <p>Venue : {event.venue}</p>
                            <p>Time: {event.time}</p>
                            <p>Date : {event.date}</p>
                        </div>
                    ))}
                </div>
                <div className="border-b-2 pb-2">
                    <p>Links for Photographs</p>
                    {/* provide the link for photos */}
                </div>
                <div className="border-b-2 pb-2">
                    <p className="text-2xl">Upload the Video</p>
                </div>
               
            </div>
        </div>
    )
}

export async function getServerSideProps(context : GetServerSidePropsContext): Promise<GetServerSidePropsResult<OrderProps>>{
    const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
    let id = "";
    if (context.params) {
      id = context.params.id as string;
    }
    const res = await fetch(`${backEndURI}/order/showOrder?id=${id}`);
    const order: Order = await res.json();

    return {props:{order}}
}


export default OrderPage