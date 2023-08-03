import Product from "@/components/product";
import OrderDashboard from "@/components/OrderDashboard";
import React, { useState } from "react";

function Dashboard(){
    const [product, setProduct] = useState<boolean>(false)
    const [order, setOrder] = useState<boolean>(true)
    const [payment, setPayment] = useState<boolean>(false)
    return(
        <div className="flex border-t">
            <div className="primaryColor box-border w-1/6 px-10 pt-10 text-white h-screen">
                <p 
                    className={`py-3 px-6 rounded-md cursor-pointer text-2xl my-3 ${product ? "bg-white text-red-900" : "hover:bg-white hover:text-red-900"}`} 
                    onClick={()=>{setProduct(true); setOrder(false); setPayment(false)}}
                >
                    Products
                </p>
                <p 
                    className={`py-3 px-6 rounded-md cursor-pointer text-2xl my-3 ${order ? "bg-white text-red-900" : "hover:bg-white hover:text-red-900"}`} 
                    onClick={()=>{setOrder(true); setPayment(false); setProduct(false)}}
                >
                    Orders
                </p>
                <p 
                    className={`py-3 px-6 rounded-md cursor-pointer text-2xl my-3 ${payment ? "bg-white text-red-900" : "hover:bg-white hover:text-red-900"}`} 
                    onClick={()=>{setPayment(true); setOrder(false); setProduct(false)}}
                >
                    Payments
                </p>
            </div>
            <div className="w-5/6 px-12 pt-20">
                {product && (
                    <Product  />
                )}
                {order && (
                    <OrderDashboard />
                )}
                {payment && (
                    <p>this is payment</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard;