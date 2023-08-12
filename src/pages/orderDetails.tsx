import { counterStates } from "@/redux/counterReducer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface User {
  _id: string;
  name: string;
  mobilenumber: string;
}
interface Product {
  _id: string;
  title: string;
  videoLink: string;
}
interface BrideInfo {
  brideName: string;
  brideMotherName: string;
  brideFatherName: string;
  brideGrandMotherName: string;
  brideGrandFatherName: string;
}
interface GroomInfo {
  groomName: string;
  groomMotherName: string;
  groomFatherName: string;
  groomGrandMotherName: string;
  groomGrandFatherName: string;
}

interface Event {
  title: string;
  venue: string;
  time: string;
  date: string;
}
interface FormData {
  _id: string;
  brideData: BrideInfo;
  groomData: GroomInfo;
  eventsData: [Event];
}

interface Order {
  _id: String;
  userId: User;
  productId: Product;
  formDataId: FormData;
  razorPayPaymentId: string;
  paidAmount: number;
  orderStatus: "Received" | "InProgress" | "Delivered";
  createdAt?: string;
}

function OrderDetailsPage() {
  const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
  const { userData } = useSelector(counterStates);
  const token = userData?.jwtToken;

  const router = useRouter();
  const orderId = router.query.id;

  const [orderDetailsData, setOrderDetailsData] = useState<Order | null>(null);
  //   let {
  //     _id,
  //     userId,
  //     productId,
  //     formDataId,
  //     razorPayPaymentId,
  //     paidAmount,
  //     orderStatus,
  //     createdAt,
  //   } = orderDetailsData;

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch(`${backEndURI}/order/showOrder?id=${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrderDetailsData(data);
        setOrderStatusValue(data?.orderStatus);
      } catch (error) {
        console.error(error);
      }
    };
    if (orderId && token && backEndURI) {
      fetchOrderData();
    }
  }, [orderId, token, backEndURI]);

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

  const [orderStatusValue, setOrderStatusValue] = useState<
    Order["orderStatus"]
  >(orderDetailsData?.orderStatus || "Received");

  async function handleOrderStatusChange(value: string) {
    // update the order status
    setOrderStatusValue(value as Order["orderStatus"]);

    let orderInfo = { orderStatus: value };

    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_SIDE_URI}/order/updateOrder?id=${orderId}`,
      {
        method: "PUT",
        body: JSON.stringify(orderInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    );
  }

  return (
    <>
      {!orderDetailsData ? (
        <p>Please Wait ...</p>
      ) : (
        <div className="mx-36 mt-20">
          <p>this is order details page</p>
          <div className="border-b-4 mb-6 pb-3">
            <p className="text-2xl">Order </p>

            <div className="flex">
              <p>Order Status : </p>
              <select
                className="ml-2"
                value={orderStatusValue}
                onChange={(e) => handleOrderStatusChange(e.target.value)}
              >
                <option value="Received">Received</option>
                <option value="InProgress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="flex justify-between">
              {orderDetailsData?.createdAt ? (
                <>
                  <p className="text-gray-500">
                    Order Date : {formatDate(orderDetailsData?.createdAt)}
                  </p>
                  <p className="text-gray-500">
                    Order Time : {getTime(orderDetailsData?.createdAt)}
                  </p>
                  <p className="text-red-500">
                    Delivery Date : {addDays(orderDetailsData?.createdAt, 4)}
                  </p>
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
              <p>Client Name: {orderDetailsData?.userId?.name}</p>
              <p>
                Client Mobile No. : +{orderDetailsData?.userId?.mobilenumber}
              </p>
            </div>
          </div>
          <div className="border-b-4 mb-6 pb-3">
            <p className="text-2xl mb-2">Payment </p>
            <div className="flex justify-between">
              <p>Payment Amount: ₹{orderDetailsData?.paidAmount}</p>
              <p>RazorPayment Id: {orderDetailsData?.razorPayPaymentId}</p>
            </div>
          </div>
          <div>
            <p className="text-2xl mb-2">Data for Video </p>
            <div className="flex justify-between border-b-2 pb-2">
              <div>
                <p className="text-xl">Bride Info</p>
                <p>
                  Name : {orderDetailsData?.formDataId?.brideData?.brideName}
                </p>
                <p>
                  Mother Name :{" "}
                  {orderDetailsData?.formDataId?.brideData?.brideMotherName}
                </p>
                <p>
                  Father Name :{" "}
                  {orderDetailsData?.formDataId?.brideData?.brideFatherName}
                </p>
                <p>
                  Grand Mother Name :{" "}
                  {
                    orderDetailsData?.formDataId?.brideData
                      ?.brideGrandMotherName
                  }
                </p>
                <p>
                  Grand Father Name :{" "}
                  {
                    orderDetailsData?.formDataId?.brideData
                      ?.brideGrandFatherName
                  }
                </p>
              </div>
              <div>
                <p className="text-xl">Groom Info</p>
                <p>
                  Name : {orderDetailsData?.formDataId?.groomData?.groomName}
                </p>
                <p>
                  Mother Name :{" "}
                  {orderDetailsData?.formDataId?.groomData?.groomMotherName}
                </p>
                <p>
                  Father Name :{" "}
                  {orderDetailsData?.formDataId?.groomData?.groomFatherName}
                </p>
                <p>
                  Grand Mother Name :{" "}
                  {
                    orderDetailsData?.formDataId?.groomData
                      ?.groomGrandMotherName
                  }
                </p>
                <p>
                  Grand Father Name :{" "}
                  {
                    orderDetailsData?.formDataId?.groomData
                      ?.groomGrandFatherName
                  }
                </p>
              </div>
            </div>
            <div className="border-b-2 pb-2">
              <p className="text-2xl">Events</p>
              {orderDetailsData?.formDataId?.eventsData.map(
                (event, index: number) => (
                  <div className="my-4" key={index}>
                    <p className="text-xl">{event.title}</p>
                    <p>Venue : {event.venue}</p>
                    <p>Time: {event.time}</p>
                    <p>Date : {event.date}</p>
                  </div>
                )
              )}
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
      )}
    </>
  );
}

export default OrderDetailsPage;
