import { counterStates } from "@/redux/counterReducer";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OderDashboard() {
  const router = useRouter();
  const { userData } = useSelector(counterStates);
  const token = userData?.jwtToken;
  const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;

  interface Order {
    _id: string;
    createdAt: string;
    paidAmount: number;
    productId: string;
    razorPayPaymentId: string;
    formDataId: string;
    orderStatus: string;
    userId: {
      name: string;
    };
  }

  const [ordersData, setOrdersData] = useState<Order[] | null>(null);

  useEffect(() => {
    async function fetchAllOrders() {
      const allOrders = await fetch(`${backEndURI}/order/listOrder`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const allOrdersData = await allOrders.json();
      setOrdersData(allOrdersData);
    }
    if (token && backEndURI) {
      fetchAllOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(dateString: string) {
    let date = new Date(dateString);

    let day = date.getDate();
    let monthNumber = date.getMonth();
    let year = date.getFullYear();

    // Array of month names
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthName = monthNames[monthNumber];

    return `${day} ${monthName} ${year}`;
  }

  function addDays(dateString: string, days: number) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  }
  function getTime(dateString: string) {
    // Convert the ISO string to a Date object
    const date = new Date(dateString);

    // Adjust for the Indian Standard Time (IST) timezone, which is UTC+5:30
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + 330);

    // Extract the time
    const timeString = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }).format(date);

    return timeString;
  }

  const handleOrderDetails = (id: string) => {
    router.push({
      pathname: "/orderDetails",
      query: { id: id },
    });
  };

  return (
    <>
      <p className="text-3xl font-medium mb-8">Orders</p>

      {ordersData ? (
        ordersData?.map((order: Order) => (
          <div
            className=" box-border cursor-pointer "
            key={order._id}
            // onClick={() => router.push(`/order/${order._id}`)}
            onClick={() => handleOrderDetails(order._id)}
          >
            <div className="flex  border p-6 rounded-md shadow-md mb-4 ">
              <div className="mr-10">
                <Image
                  src={"/nyota_explore1_image.svg"}
                  width={300}
                  height={300}
                  alt="Design Explore"
                />
              </div>
              <div className="w-full grid gap-4">
                <div className="grid grid-cols-3 border-b">
                  <p className="text-xl pb-2 col-span-3">
                    Order Id : {order._id}
                  </p>
                </div>

                <div className="grid grid-cols-3 border-b">
                  <div className="text-sm">
                    <p className="text-gray-500">Order Date</p>
                    <p>{formatDate(order?.createdAt)}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Client Name</p>
                    <p>{order?.userId?.name || "No Name"}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Payment Id</p>
                    <p>{order?.razorPayPaymentId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b">
                  <div className="text-sm">
                    <p className="text-gray-500">Information</p>
                    <a className="underline underline-offset-4 text-blue-700 cursor-pointer">
                      Download
                    </a>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Order Time</p>
                    <p>{getTime(order?.createdAt)}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Last date for Submission</p>
                    <p className="text-red-700">
                      {addDays(order?.createdAt, 4)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="border bg-gray-400 rounded-md px-6 py-2 text-white">
                    Upload
                  </button>

                  <button
                    className={`border rounded-md px-6 py-2 text-white ${
                      order.orderStatus === "Received"
                        ? "bg-purple-400"
                        : order.orderStatus === "InProgress"
                        ? "bg-orange-400"
                        : "bg-green-400"
                    }`}
                  >
                    {order.orderStatus}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>please wait ...</p>
      )}
    </>
  );
}

export default OderDashboard;
