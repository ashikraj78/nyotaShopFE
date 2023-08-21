import { counterStates, setThankModal } from "@/redux/counterReducer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuthRedirect from "@/utils/withAuthRedirect";
import OrderDetailsModal from "@/components/OrderDetailsModal";
function Order() {
  interface Order {
    _id: string;
    createdAt: string;
    paidAmount: number;
    orderStatus: any;
    productId: {
      title: string;
      videoLink: string;
    };
  }

  const dispatch = useDispatch();
  const { userData } = useSelector(counterStates);
  const orders: Order[] = userData?.user?.myOrders;

  useEffect(() => {
    dispatch(setThankModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [orderDetailsModal, setOrderDetailsModal] = useState<any>(false);

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

  return (
    <div className="mx-36 mt-20 min-h-50vh">
      <p className="text-3xl font-medium text-center">Your Orders</p>
      <div className="flex justify-center mb-10 mt-4">
        <Image
          src={"/nyota_flower_break.svg"}
          width={500}
          height={700}
          alt="Flower Br"
          className="w-4/6"
        />
      </div>

      {orders.length == 0 && (
        <>
          <p className="text-5xl font-bold text-center py-4 mb-10">
            Sorry, you don&apos;t have any order
          </p>
        </>
      )}

      {orders?.map((order: Order) => (
        <div className="my-10 bg-gray-100" key={order._id}>
          <div className="flex justify-between border rounded-t-lg p-6 secondaryColor">
            <div className="flex w-1/3 justify-between">
              <div>
                <p>ORDER PLACED</p>
                <p className="font-semibold"> {formatDate(order?.createdAt)}</p>
              </div>
              <div>
                <p>ORDER TIME</p>
                <p className="font-semibold"> {getTime(order?.createdAt)}</p>
              </div>
              <div>
                <p>AMOUNT</p>
                <p className="font-semibold ">₹ {order?.paidAmount}</p>
              </div>
            </div>
            <div>
              <p>ORDER ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>
          </div>
          <div className="p-6  border-x  border-b rounded-b-lg">
            <div className=" flex justify-between">
              <div>
                <div className="mt-4 flex justify-between">
                  <Image
                    src={"/nyota_explore1_image.svg"}
                    width={200}
                    height={100}
                    alt="Design Explore"
                    className="rounded-lg"
                  />
                  <div className="text-2xl ml-10 flex flex-col justify-between ">
                    <p>{order?.productId?.title}</p>
                    <button
                      className="border mt-10 block w-60 primaryColor text-white rounded-lg py-4 px-4 text-lg"
                      onClick={() => setOrderDetailsModal(order._id)}
                    >
                      Order Details
                    </button>
                    <p className="text-green-600 text-lg font-bold">
                      Arriving : {getTime(order?.createdAt)} ,{" "}
                      {addDays(order?.createdAt, 4)}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col justify-between">
                <button
                  className="border block w-60 primaryColor text-white rounded py-4 px-4 text-lg"
                  onClick={() => setOrderDetailsModal(order._id)}
                >
                  Edit or View Order
                </button>
              </div> */}
            </div>
          </div>
          {orderDetailsModal === order._id && (
            <OrderDetailsModal
              orderDetailsModal={orderDetailsModal}
              setOrderDetailsModal={setOrderDetailsModal}
              orderId={order._id}
            />
          )}
        </div>
      ))}

      <div className="flex justify-center mb-10  mt-4">
        <Image
          src={"/nyota_flower_break.svg"}
          width={500}
          height={700}
          alt="Flower Br"
          className="w-4/6"
        />
      </div>
    </div>
  );
}

export default withAuthRedirect(Order);
