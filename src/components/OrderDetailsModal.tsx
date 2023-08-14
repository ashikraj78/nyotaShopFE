import { counterStates } from "@/redux/counterReducer";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { useForm } from "react-hook-form";

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

interface Props {
  setOrderDetailsModal: Dispatch<SetStateAction<boolean>>;
  orderDetailsModal: boolean;
  orderId: string;
}

const OrderDetailsModal: React.FC<Props> = ({
  orderDetailsModal,
  setOrderDetailsModal,
  orderId,
}) => {
  const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
  const { userData } = useSelector(counterStates);
  const token = userData?.jwtToken;
  const [orderDetailsData, setOrderDetailsData] = useState<Order | null>(null);
  console.log(orderDetailsData, "order details data");
  const [brideEditMode, setBrideEditMode] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm();

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

  useEffect(() => {
    if (brideEditMode && orderDetailsData?.formDataId?.brideData) {
      setValue("brideName", orderDetailsData.formDataId.brideData.brideName);
      setValue(
        "brideMotherName",
        orderDetailsData.formDataId.brideData.brideMotherName
      );
      setValue(
        "brideFatherName",
        orderDetailsData.formDataId.brideData.brideFatherName
      );
      setValue(
        "brideGrandMotherName",
        orderDetailsData.formDataId.brideData.brideGrandMotherName
      );
      setValue(
        "brideGrandFatherName",
        orderDetailsData.formDataId.brideData.brideGrandFatherName
      );
    }
  }, [brideEditMode, setValue, orderDetailsData]);
  const saveChanges = (data: any, formType: string) => {
    // Distinguishing actions based on form type
    if (formType === "bride") {
      setOrderDetailsData(
        (prevState) =>
          ({
            ...prevState,
            formDataId: {
              ...prevState?.formDataId,
              brideData: data,
            },
          } as Order)
      );
      console.log(data);
      // Handle bride form submission
    } else if (formType === "groom") {
      // Handle groom form submission
    }
    //... and so on for other form types

    setBrideEditMode(false);
  };

  const handleBrideChange = handleSubmit((data) => saveChanges(data, "bride"));

  return (
    <Modal
      visible={orderDetailsModal}
      onCancel={() => setOrderDetailsModal(false)}
      footer={null}
      width={1200}
    >
      <>
        {!orderDetailsData ? (
          <p>Please Wait ...</p>
        ) : (
          <div className="mt-10">
            <p>this is order details page modal</p>
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
                  <p className="text-gray-500">Order Time : N/A</p>\
                  <p className="text-red-500">Delivery Date : N/A</p>
                </>
              )}
            </div>
            <div className="border-b-4 mb-6 pb-3">
              <p className="text-2xl mb-2">Client </p>
              <div className="flex justify-between">
                <p>Client Name: {orderDetailsData?.userId?.name}</p>
                <p>Payment Amount: ₹{orderDetailsData?.paidAmount}</p>
                <p>
                  Client Mobile No. : +{orderDetailsData?.userId?.mobilenumber}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between border-b-2 pb-2">
                <div className="w-1/3">
                  <div className="flex justify-between">
                    <p className="text-xl">Bride Info</p>
                    <TbEdit
                      className="cursor-pointer ml-1 primaryTextColor"
                      onClick={() => setBrideEditMode(!brideEditMode)}
                    />
                  </div>

                  {brideEditMode ? (
                    <form onSubmit={handleBrideChange}>
                      <div className="flex mb-2">
                        <label>Name : </label>
                        <input {...register("brideName")} className=" border" />
                      </div>
                      <div className="flex mb-2">
                        <label>Mother Name : </label>
                        <input
                          {...register("brideMotherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Father Name : </label>
                        <input
                          {...register("brideFatherName")}
                          className=" border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Mother Name : </label>
                        <input
                          {...register("brideGrandMotherName")}
                          className="border ml-2 "
                        />
                      </div>
                      <div className="flex mb-2">
                        <label>Grand Father Name : </label>
                        <input
                          {...register("brideGrandFatherName")}
                          className="border ml-2"
                        />
                      </div>

                      <div className="text-right">
                        <button
                          type="submit"
                          className="border px-2 py-1 rounded"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p>
                        Name :{" "}
                        {orderDetailsData?.formDataId?.brideData?.brideName}
                      </p>
                      <p>
                        Mother Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideMotherName
                        }
                      </p>
                      <p>
                        Father Name :{" "}
                        {
                          orderDetailsData?.formDataId?.brideData
                            ?.brideFatherName
                        }
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
                    </>
                  )}
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
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default OrderDetailsModal;
